'use server';

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);

export async function getUser(email: string) {
    await client.connect();
    const db = client.db("bid");
    const user = await db.collection("credentials").findOne({ email });
    await client.close();
    return user;
}