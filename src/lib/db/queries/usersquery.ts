'use server';

import clientPromise from "@/lib/db/mongodb";

export async function getUser(email: string) {
    const client = await clientPromise; 
    const db = client.db("bid");
    const user = await db.collection("credentials").findOne({ email });
    return user;
}