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
      return {result: !response.empty, error: null};
    }).catch((err) => {
      return {result: false, error: err};
    });

});
