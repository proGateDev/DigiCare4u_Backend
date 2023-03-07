// const admin = require("firebase-admin");
// const passport = require("passport");
// require("dotenv").config();
// //============================================
// const serviceAccount = require("../firebase/astrologics-92bd6-firebase-adminsdk-nckug-05411b91f7.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       // This function will be called when the user is authenticated successfully.
//       // You can access the user's profile information using the `profile` parameter.
//       console.log("USER_PROFILE ---->", profile);
//       return done(null, profile);
//     }
//   )
// );
// //==================================================
// module.exports = {
//   //===============  GET ====================================`
//   authUser: async (req, res) => {
//     (req, res) => {
//         const { email, password } = req.body;
      
//         firebase.auth().signInWithEmailAndPassword(email, password)
//           .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             // Do something with the user
//             res.status(200).send('Logged in successfully');
//           })
//           .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // Handle errors
//             res.status(401).send(errorMessage);
//           });
//       }
//   },
// };
// //==========================================
// // app.get(
// //   "/auth/google",
// //   passport.authenticate("google", { scope: ["profile"] })
// // );

// // app.get(
// //   "/auth/google/callback",
// //   passport.authenticate("google", { failureRedirect: "/login" }),
// //   function (req, res) {
// //     // Successful authentication, redirect home.
// //     res.redirect("/");
// //   }
// // );

// // const firebaseAuthMiddleware = (req, res, next) => {
// //   if (req.user) {
// //     admin
// //       .auth()
// //       .verifyIdToken(req.user.tokenId)
// //       .then(() => next())
// //       .catch(() => res.redirect("/login"));
// //   } else {
// //     res.redirect("/login");
// //   }
// // };

// // app.get("/profile", firebaseAuthMiddleware, function (req, res) {
// //   // Render the user's profile page.
// // });
