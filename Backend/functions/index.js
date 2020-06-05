const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * server function to validate that the user is real
 * checks the inputted phone number to collection of users
 */
exports.verifySalesUser = functions.https.onCall((data, context) => {
  // phone number to verify
  const phoneNumber = data.phoneNumber;

  return admin
    .firestore()
    .collection("sales-users")
    .where("phoneNumber", "==", phoneNumber)
    .get()
    .then((response) => {
      return { result: !response.empty, error: null };
    })
    .catch((err) => {
      return { result: false, error: err };
    });
});

exports.newDoctor = functions.https.onCall((data, context) => {
  data.status = [{ action: "created", time: Date.now().toString() }];
  return admin
    .firestore()
    .collection("doctors")
    .add(data)
    .then((ref) => {
      return { success: true, id: ref.id };
    })
    .catch((err) => {
      return { success: false, id: "", error: err };
    });
});

exports.updateFields = functions.https.onCall((data, context) => {
  let col = data.collection;
  return admin
    .firestore()
    .collection(col)
    .doc("fields")
    .set(data.data)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { success: false, error: err };
    });
});
