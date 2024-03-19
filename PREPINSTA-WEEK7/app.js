const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const port = 3000;


const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'student_tasks';
let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Failed to connect  MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  db = client.db(dbName);
});


app.use(bodyParser.json());

app.post('/courses/:courseId/tasks', (req, res) => {
  const { courseId } = req.params;
  const { taskName, dueDate, additionalDetails } = req.body;

  const tasksCollection = db.collection('tasks');

  tasksCollection.insertOne({
    courseId,
    taskName,
    dueDate,
    additionalDetails
  }, (err, result) => {
    if (err) {
      console.error('Error adding task:', err);
      res.status(500).json({ message: 'Failed to add task' });
      return;
    }
    console.log('Task added successfully');
    res.status(200).json({ message: 'Task added successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});