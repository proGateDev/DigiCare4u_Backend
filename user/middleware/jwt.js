const express = require("express");
const app = express();
//=========================================================
const checkUserToken = (req, res, next) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({
      response: "Missing User Token in the headers",
    });
  }
  next();
};

module.exports = checkUserToken;
