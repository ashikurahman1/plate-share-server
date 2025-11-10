const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

const PORT = process.env.PORT || 5100;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://ashikurahmantuhin_db_user:Bangladesh71@plate-share.jsoauh9.mongodb.net/?appName=plate-share`;

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

    // User Related API
    // app.get('/users', async (req, res) => {
    //   const cursor = usersCollection.find();
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const email = req.body.email;
      const query = { email: email };
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        res.send({ message: 'user already exist.' });
      } else {
        const result = await usersCollection.insertOne(newUser);
        res.status(200).send(result);
      }
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

    // Food Related API
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
        // const query = { _id: new ObjectId(id) };
        const result = await foodsCollection.findOne({ _id: objectId });
        res.status(200).json(result);
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
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Smart server is running on port: ${PORT}`);
});
