import admin from "firebase-admin";
import serviceAccount from "./clone-cf5b3-firebase-adminsdk-fbsvc-cc6e666626.json" assert { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
