import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const uri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json()); 

if (!uri) {
  console.error('Missing MONGO_URI environment variable');
  process.exit(1);
}

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function start() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('pet_store');
    app.get('/products', async (req, res) => {
      try {
        const filter = {};
        if (req.query.petType) {
          filter.pet_type = req.query.petType;
        }

        const products = await db
          .collection('products')
          .find(filter)
          .limit(50)
          .toArray();
        res.json(products);
      } catch (err) {
        console.error('Error fetching products', err);
        res.status(500).json({ error: 'Failed to fetch products' });
      }
    });

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error('Mongo connection error', err);
  }
}

start();
