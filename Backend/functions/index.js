const functions = require("firebase-functions");
const admin = require("firebase-admin");

const app = admin.initializeApp();

/**
 * server function to validate that the user is real
 * checks the inputted phone number to collection of users
 */
exports.verifySalesUser = functions.https.onCall((data, context) => {
  // phone number to verify
  const phoneNumber = data.phoneNumber;

  return admin
    .firestore()
    .collection("sales-reps")
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
    .database()
    .ref("doctors")
    .push(data)
    .then((ref) => {
      return { success: true, id: ref.id, message: "updated successfully." };
    })
    .catch((err) => {
      return { success: false, id: "", message: err };
    });
});

exports.updateDoctor = functions.https.onCall((data, context) => {
  return admin
    .database()
    .ref("doctors/" + data.uid)
    .set(data)
    .then((ref) => {
      return { success: true, id: ref.id, message: "updated successfully." };
    })
    .catch((err) => {
      return { success: false, id: "", message: err };
    });
});

exports.updateSalesRep = functions.https.onCall((data, context) => {
  return admin
    .database()
    .ref("sales-reps/" + data.uid)
    .set(data)
    .then((ref) => {
      return { success: true, id: ref.id, message: "updated successfully." };
    })
    .catch((err) => {
      return { success: false, id: "", message: err };
    });
});

exports.updateAllSalesReps = functions.https.onCall((data, context) => {
  var updates = {};
  data.data.forEach((element) => {
    updates["sales-reps/" + element.uid] = element;
  });
  return admin
    .database()
    .ref()
    .update(updates)
    .then((ref) => {
      return { success: true, id: ref.id, message: "updated successfully." };
    })
    .catch((err) => {
      return { success: false, id: "", message: err };
    });
});

exports.newSalesRep = functions.https.onCall((data, context) => {
  data.status = [{ action: "created", time: Date.now().toString() }];
  data.campaigns = [];
  return admin
    .database()
    .ref("sales-reps")
    .push(data)
    .then((ref) => {
      return { success: true, id: ref.id, message: "updated successfully." };
    })
    .catch((err) => {
      return { success: false, id: "", message: err };
    });
});

exports.newReport = functions.https.onCall((data, context) => {
  data.status = [{ action: "created", time: Date.now().toString() }];
  data.campaigns = [];
  return admin
    .database()
    .ref("reports")
    .push(data)
    .then((ref) => {
      return { success: true, id: ref.id, message: "updated successfully." };
    })
    .catch((err) => {
      return { success: false, id: "", message: err };
    });
});

exports.updateFields = functions.https.onCall((data, context) => {
  let col = data.collection;
  return app
    .database()
    .ref("/fields/" + col)
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
  return app
    .database()
    .ref("/fields/" + col)
    .once("value")
    .then((snap) => {
      let val = snap.val();
      if (val === "" || val === null) {
        val = [];
      }
      return { success: true, data: val };
    });
});

exports.getAll = functions.https.onCall((data, context) => {
  return admin
    .database()
    .ref(data.collection)
    .once("value")
    .then((snapshot) => {
      // convert into a list
      let val = snapshot.val();
      let sanitizedData = [];
      for (var key in val) {
        sanitizedData.push(Object.assign({ uid: key }, val[key]));
      }
      return {
        success: true,
        message: "successful",
        data: sanitizedData,
        raw: val,
      };
    })
    .catch((err) => {
      return { success: false, message: err, data: null };
    });
});

/*
exports.getAllReports = functions.https.onCall((data, context) => {
  return admin
    .database()
    .ref("reports")
    .once("value")
    .then((snapshot) => {
      // convert into a list
      let val = snapshot.val();
      let sanitizedData = [];
      for (var key in val) {
        sanitizedData.push(Object.assign({ uid: key }, val[key]));
      }
      return {
        success: true,
        message: "successful",
        data: sanitizedData,
      };
    })
    .catch((err) => {
      return { success: false, message: err, data: null };
    });
});
exports.getAllSalesReps = functions.https.onCall((data, context) => {
  return admin
    .database()
    .ref("sales-reps")
    .once("value")
    .then((snapshot) => {
      // convert into a list
      let val = snapshot.val();
      let sanitizedData = [];
      for (var key in val) {
        sanitizedData.push(Object.assign({ uid: key }, val[key]));
      }
      return {
        success: true,
        message: "successful",
        data: sanitizedData,
      };
    })
    .catch((err) => {
      return { success: false, message: err, data: null };
    });
});*/

exports.deleteDoctor = functions.https.onCall((data, context) => {
  let id = data.uid;
  let col = data.collection;
  return admin
    .database()
    .ref(col + "/" + id)
    .remove()
    .then((response) => {
      return { success: true, message: "deleted" };
    })
    .catch((response) => {
      return { success: false, message: "couldn't delete" };
    });
});

/*
exports.deleteSalesRep = functions.https.onCall((data, context) => {
  let id = data.uid;
  return admin
    .database()
    .ref("sales-reps/" + id)
    .remove()
    .then((response) => {
      return { success: true, message: "deleted" };
    })
    .catch((response) => {
      return { success: false, message: "couldn't delete" };
    });
});

exports.deleteReport = functions.https.onCall((data, context) => {
  let id = data.uid;
  return admin
    .database()
    .ref("reports/" + id)
    .remove()
    .then((response) => {
      return { success: true, message: "deleted" };
    })
    .catch((response) => {
      return { success: false, message: "couldn't delete" };
    });
});*/

exports.getSalesRep = functions.https.onCall((data, context) => {
  return admin
    .database()
    .ref("sales-reps/" + data.uid)
    .once("value")
    .then((snapshot) => {
      // convert into a list
      return {
        success: true,
        message: "successful",
        data: snapshot.val(),
      };
    })
    .catch((err) => {
      return { success: false, message: err, data: null };
    });
});
