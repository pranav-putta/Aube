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
      return { result: !response.empty, message: "success" };
    })
    .catch((err) => {
      return { result: false, message: err };
    });
});

exports.newDoctor = functions.https.onCall((data, context) => {
  data.status = [{ action: "created", time: Date.now().toString() }];
  return admin
    .firestore()
    .collection("doctors")
    .add(data)
    .then((ref) => {
      return { success: true, id: ref.id, message: "updated successfully." };
    })
    .catch((err) => {
      return { success: false, id: "", message: err };
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
      return { success: true, message: "updated successfully." };
    })
    .catch((err) => {
      return { success: false, message: err };
    });
});

exports.getFields = functions.https.onCall((data, context) => {
  let col = data.collection;
  return admin
    .firestore()
    .collection(col)
    .doc("fields")
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return {
          success: true,
          message: "couldn't find document",
          data: { fields: [] },
        };
      } else {
        return { success: true, message: "successful", data: doc.data() };
      }
    })
    .catch((err) => {
      return { success: false, message: err, data: null };
    });
});
