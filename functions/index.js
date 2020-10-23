const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeIncidents = functions.https.onRequest(
  async (request, response) => {
    const { fullname, dni, location, description } = request.body;
    try {
      await db.collection("incidents").add({
        fullname,
        dni,
        location,
        description,
        userId: "",
        tagId: "",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      response.status(200).send({
        message:
          "El incidente fue registrado correctamente, nuestros técnicos se encargarán de solucionarlo en el menor tiempo posible"
      });
    } catch (err) {
      console.log(err);
      response.status(400).send({
        message: "El incidente no pudo ser registrado, inténtelo más tarde"
      });
    }
  }
);
