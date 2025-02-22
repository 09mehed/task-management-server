const express = require('express')
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId, Timestamp } = require('mongodb');
const port = process.env.PORT || 3000;
const app = express()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.wt1dm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const usersCollection = client.db("TaskManagement").collection("users");
    const tasksCollection = client.db("TaskManagement").collection("tasks");

    // Store user details on first login
    app.post("/users", async (req, res) => {
      const user = req.body;
      const existingUser = await usersCollection.findOne({ id: user.id });
      if (!existingUser) {
        const result = await usersCollection.insertOne(user);
        res.send(result);
      } else {
        res.send({ message: "User already exists" });
      }
    });

    app.get("/users", async (req, res) => {
      const tasks = await usersCollection.find().toArray();
      res.send(tasks);
    });


    // Add a new task
    app.post("/tasks", async (req, res) => {
      const task = req.body;
      const result = await tasksCollection.insertOne(task);
      res.send(result);
    });

    // Retrieve all tasks
    app.get("/tasks", async (req, res) => {
      const tasks = await tasksCollection.find().toArray();
      res.send(tasks);
    });

    // Update a task
    app.put("/tasks/:id", async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updatedTask = req.body
      const task = {
        $set: {
          title: updatedTask.title,
          description: updatedTask.description,
          category: updatedTask.category,
          timestamp: updatedTask.timestamp
        }
      }
      const result = await tasksCollection.updateOne(filter, task, options)
      res.send(result);
    });

    // Delete a task
    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await tasksCollection.deleteOne(query);
      res.send(result);
    });


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Task Management system is running')
})

app.listen(port, () => {
  console.log(`Task Management system is running on port: ${port}`)
})