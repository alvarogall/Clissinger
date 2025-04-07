import * as Realm from "realm-web";

const app = new Realm.App({ id: "appcli-malcduv" }); // ID de tu App en MongoDB Realm

async function loginAndFetch() {
  const credentials = Realm.Credentials.anonymous(); // o email/password
  const user = await app.logIn(credentials);

  const mongo = user.mongoClient("mongodb-atlas");
  const collection = mongo.db("nombreBD").collection("usuarios");

  const usuarios = await collection.find();
  console.log(usuarios);
}