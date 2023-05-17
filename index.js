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
    // await client.connect();
    const db = client.db("users-db")

    const usersCollection = db.collection('index-users-collection');

    const indexKeys = {bio:1,name:1}
    const indexOptions = {name:"bio-search"}

    const result = await usersCollection.createIndex(indexKeys,indexOptions)

    //signle field indexes==> db.teachers.createIndex({"age":1})
    //Compound indexes==> db.teachers.createIndex({"age":1,"gender":1}) ==> order matteres.prothome age dia sorting hobe tarpor gender dia.

    //db.teachers.createIndex({age:1},{partialFilterExpression:{age:{$gt:22}}}) ==>> shodhomatro 22 bochor er oporer age golor khtre indexing hobe.

    
        //text indexing

        //single text index per collection
        //tokenization and stemming
        //relevance score
        //db.students.createIndex({bio:"text"})
        //db.students.createIndex({name:"text",bio:"text"}) ==>> zekono ekta field a pailei hobe.

            //==> db.teachers.find({$text:{$search:"youtuber"}}) //==> case insensitive



    app.get('/users', async (req, res) => {
        //single field indexes
        // const result = await usersCollection.find({age:{$lte:30}}).toArray()
    //   const result = await usersCollection.find({age:{$lte:30}}).explain('executionStats')
    //   const result = await usersCollection.find({age:{$lte:30}}).explain(); 



    //compound indexes
    // const result = await usersCollection.find({age:{$gte:27},gender:"male"}).explain('executionStats') //==>> index scan hobe
    // const result = await usersCollection.find({age:{$gte:27}}).explain('executionStats') //==>> index scan hobe
        // const result = await usersCollection.find({gender:"male"}).explain('executionStats') //==>> index scan hobe na karon age dara sorted hoi prothome

        //indexing also helps in sorting.jeheto indexing korle data sort hoiya thake tai ar noton kore sort korar dorkar nai sort() method er maddhome.
        // const result = await usersCollection.find({age:{$lte:27}}).toArray()


        //text indexing

        // const result = usersCollection.find( { $text: { $search: "vegitable" } } ).toArray()
      
        

        
      const searchText = "Emma";
      const result = await usersCollection.find({
        $or:[
          {bio:{$regex:searchText,$options:"i"}},
          {name:{$regex:searchText,$options:"i"}},
        ]
      }).toArray()




        
        

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