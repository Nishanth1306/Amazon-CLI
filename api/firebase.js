import admin from "firebase-admin";
import serviceAccount from "./clone-cf5b3-firebase-adminsdk-fbsvc-890e183b8d.json" assert { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
