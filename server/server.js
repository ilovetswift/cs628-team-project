import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import axios from 'axios'; // Added to send requests to the Ollama API

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

    app.post('/products', async (req, res) => {
      try {
        const newProduct = req.body;
        const result = await db.collection('products').insertOne(newProduct);
        res.status(201).json({ _id: result.insertedId, ...newProduct });
      } catch (err) {
        console.error('Error creating product', err);
        res.status(500).json({ error: 'Failed to create product' });
      }
    });

    // Update an existing product
    app.put('/products/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const updated = req.body;
        await db.collection('products').updateOne(
          { _id: new ObjectId(id) },
          { $set: updated }
        );
        res.json(updated);
      } catch (err) {
        console.error('Error updating product', err);
        res.status(500).json({ error: 'Failed to update product' });
      }
    });

    app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  });
    // Existing GET endpoint for products
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

    // Delete a product
    app.delete('/products/:id', async (req, res) => {
      try {
        const { id } = req.params;
        await db.collection('products').deleteOne({ _id: new ObjectId(id) });
        res.status(204).send();
      } catch (err) {
        console.error('Error deleting product', err);
        res.status(500).json({ error: 'Failed to delete product' });
      }
    });

    // New POST endpoint for chat with RAG + Ollama integration
    app.post('/chat', async (req, res) => {
      const userMessage = req.body.content || 'Please provide a message.';

      // Set headers for SSE (Server-Sent Events)
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders();

      try {
        // Query the products collection instead of records
        const products = await db
          .collection('products')
          .find({ $text: { $search: userMessage } })
          .limit(5)
          .toArray();

        // Build the context string with add-to-cart links
        const context = products
          .map((prod) =>
            `${prod.name}: ${prod.description} — Add to cart: /cart/add/${prod._id}`
          )
          .join('\n');

        const augmentedPrompt =
          `Context:\n${context}\n\n` +
          `User: ${userMessage}\n` +
          // Tell the model how to use the link
          `Bot (When suggesting a product, use the "Add to cart" link provided in the context rather than spelling out the URL):`;
        // Send the request to the Gemma 2:2b model via Ollama
        const axiosResponse = await axios({
          method: 'post',
          url: 'http://localhost:11434/api/generate',
          data: {
            model: 'gemma2:2b',
            prompt: augmentedPrompt,
          },
          responseType: 'stream',
        });

        // Stream the response from the model to the client
        axiosResponse.data.on('data', (chunk) => {
          const chunkStr = chunk.toString();
          // Ensure the chunk is not empty before sending it
          if (chunkStr.trim()) {
            res.write(`data: ${chunkStr}\n\n`);
          }
        });

        // Handle the end of the stream
        axiosResponse.data.on('end', () => {
          res.write('data: [DONE]\n\n');
          res.end();
        });

        // Handle any errors during streaming
        axiosResponse.data.on('error', (error) => {
          console.error('Error during streaming:', error);
          res.write('data: Error occurred during streaming\n\n');
          res.end();
        });
      } catch (error) {
        console.error('Error during RAG chat:', error);
        res.status(500).write('data: Internal Server Error\n\n');
        res.end();
      }
    });

    // Start listening
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error('Mongo connection error', err);
  }
}

start();
