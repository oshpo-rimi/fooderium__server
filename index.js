const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 5000;
const app = express();
require('dotenv').config();

app.use(cors());

app.get('/',(req,res) => {
    res.send("Hellow from fooderium server")
})



const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.9yhjfro.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
   

    const mealsCategoryCollection = client.db("fooderium_db_user").collection("mealsCategory");
    const drinksCategoryCollection = client.db("fooderium_db_user").collection("drinksCategory");
    const mealsCollection = client.db("fooderium_db_user").collection("meals");


    app.get("/meals-collection", async (req, res) => {
        const query = {};
        const mealsCategory = await mealsCategoryCollection.find(query).toArray();
        res.send(mealsCategory);


    });

    app.get("/drinks-collection", async (req, res) => {
        const query = { type: req.query.type };
        const drinksCategory = await drinksCategoryCollection.find(query).toArray();
        res.send(drinksCategory);
    });

    app.get("/category-meals", async (req, res) => {
        const query = { categoryId: req.query.categoryId };
        const meals = await mealsCollection.find(query).toArray();
        res.send(meals);


    });
  } finally {
    
  }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log("Server is running on port :", port);
})