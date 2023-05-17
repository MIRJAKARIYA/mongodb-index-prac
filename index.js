const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());





const uri = "mongodb+srv://index-user:FSQOi8zX04o1Z2uS@cluster0.t4eg4tt.mongodb.net/?retryWrites=true&w=majority";
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

    const usersCollection = client.db('users-db').collection('index-users-collection');


    app.get('/users', async (req, res) => {
        const result = await usersCollection.find({age:{$lte:30}}).toArray()
    //   const result = await usersCollection.find({age:{$lte:30}}).explain('executionStats')
    //   const result = await usersCollection.find({age:{$lte:30}}).explain(); 
      res.send(result);
    })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('john is busy shopping')
})

app.listen(port, () => {
  console.log(`ema john server is running on port: ${port}`);
})