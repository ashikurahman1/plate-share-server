const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@plate-share.jsoauh9.mongodb.net/?appName=plate-share`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db('plate_share');
    const foodsCollection = db.collection('foods');
    const usersCollection = db.collection('users');

    // Root route (for testing)
    app.get('/', (req, res) => {
      res.send('🍽️ Plate Share Server is running successfully!');
    });

    // User API
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const email = req.body.email;
      const query = { email };
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: 'user already exists.' });
      }

      const result = await usersCollection.insertOne(newUser);
      res.status(200).send(result);
    });

    // Featured Foods API
    app.get('/featured-foods', async (req, res) => {
      try {
        const featuredFoods = await foodsCollection
          .find({ food_status: 'Available' })
          .sort({ food_quantity: -1 })
          .limit(6)
          .toArray();

        res.status(200).json(featuredFoods);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    // Food APIs
    app.get('/foods', async (req, res) => {
      try {
        const availableFoods = await foodsCollection
          .find({ food_status: 'Available' })
          .toArray();

        res.status(200).json(availableFoods);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    app.get('/foods/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const objectId = new ObjectId(id);
        const result = await foodsCollection.findOne({ _id: objectId });
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    app.post('/foods', async (req, res) => {
      try {
        const newFood = req.body;
        const result = await foodsCollection.insertOne(newFood);
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  } finally {
    // no need to close connection manually in serverless env
  }
}

run().catch(console.dir);


// app.listen(PORT, () => {
//   console.log(`Smart server is running on port: ${PORT}`);
// });

// ✅ Vercel এর জন্য export করতে হবে
module.exports = app;
