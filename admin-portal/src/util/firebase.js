import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAC8Zb7fQl2ubo7ZHuOCAzbBFDbm5jx2aA",
  authDomain: "aube-61c1c.firebaseapp.com",
  databaseURL: "https://aube-61c1c.firebaseio.com",
  projectId: "aube-61c1c",
  storageBucket: "aube-61c1c.appspot.com",
  messagingSenderId: "662872165907",
  appId: "1:662872165907:web:4fa1731e51f7f5992ab9e6",
  measurementId: "G-RL37XGF91S",
};

var initialized = false;

export function init() {
  if (!initialized) {
    firebase.initializeApp(firebaseConfig);
    initialized = true;
  }
}

export async function signIn(email, password, remember) {
  init();
  let persistence = remember
    ? firebase.auth.Auth.Persistence.LOCAL
    : firebase.auth.Auth.Persistence.SESSION;
  await firebase.auth().setPersistence(persistence);
  return await firebase.auth().signInWithEmailAndPassword(email, password);
}

export function auth() {
  init();
  return firebase.auth();
}
