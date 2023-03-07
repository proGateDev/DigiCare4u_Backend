const admin = require("firebase-admin");

//=============================================

const serviceAccount = require("../firebase/astrologics-92bd6-firebase-adminsdk-nckug-05411b91f7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


export const firebaseAuthMiddleware = (req, res, next) => {
    if (req.user) {
      admin
        .auth()
        .verifyIdToken(req.user.tokenId)
        .then(() => next())
        .catch(() => res.redirect("/login"));
    } else {
      res.redirect("/login");
    }
  };