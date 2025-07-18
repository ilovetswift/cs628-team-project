import fs      from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import csv     from 'csv-parser';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv  from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME   = 'pet_store';
const CSV_PATH  = join(__dirname, 'amazon_pet_supplies_dataset_sample.csv');

async function main() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  // Load reference collections
  const [cats, sups, whs] = await Promise.all([
    db.collection('categories').find().toArray(),
    db.collection('suppliers').find().toArray(),
    db.collection('warehouses').find().toArray()
  ]);
  const catIds = cats.map(c => c._id);
  const supIds = sups.map(s => s._id);
  const whIds  = whs.map(w => w._id);

  const products = [];
  let counter = 1;

  fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on('data', row => {
      const petType     = row.petType;
      const imageUrl    = row.images;
      const title       = row.title;
      const description = row.description || title;

      // SKU: PS-0001, PS-0002, etc.
      let s = String(counter++);
      while (s.length < 4) s = '0' + s;
      const sku = `PS-${s}`;

      // Pick random refs
      const cat = catIds[Math.floor(Math.random() * catIds.length)];
      const sup = supIds[Math.floor(Math.random() * supIds.length)];
      const wh  = whIds [Math.floor(Math.random() * whIds.length)];

      // Random price/stock
      const price   = Math.round((Math.random() * 45 + 5) * 100) / 100;
      const stock   = Math.floor(Math.random() * 200);
      const reorder = Math.floor(Math.random() * 50);

      products.push({
        pet_type:      petType,
        sku,
        name:          title,
        description,
        category_id:   cat,
        tags:          ['pet','supply', petType],
        variants: [{
          variant_id:   'default',
          attributes:   {},
          price,
          stock,
          warehouse_id: wh,
          image_url:    imageUrl
        }],
        supplier_ids:  [ sup ],
        reorder_level: reorder,
        created_at:    new Date(),
        updated_at:    new Date()
      });
    })
    .on('end', async () => {
      console.log(`Inserting ${products.length} products…`);
      await db.collection('products').insertMany(products);
      console.log('Done.');
      await client.close();
    });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
