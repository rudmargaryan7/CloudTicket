// // async function listDatabases(client) {
// //   let databasesList = await client.db().admin().listDatabases();

// import * as mongoDB from "mongodb";
// 8;
// //   console.log("Databases:");
// //   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// // }

// export async function connectDb(client: any) {
//   try {
//     await client.connect();
//     // console.log(await listDatabases(client));
//     console.log("Connected !");
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function getUserCollection() {
//   return mongoClient.db("Magazine").collection("users");
// }
