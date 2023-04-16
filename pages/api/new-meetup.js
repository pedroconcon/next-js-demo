// /api/new-meetup

// POST /api/new-meetup

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://teste123:teste123@nextjs-app.c2xljpg.mongodb.net/meetups"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({message: 'Meetup inserted!'});
  }

  
};

export default handler;
