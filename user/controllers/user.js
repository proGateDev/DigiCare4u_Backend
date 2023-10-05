const model = require("../models/user");
const planetModel = require("../models/planet");
const userCreationValidation = require("../../user/validation/user");
const { default: axios } = require("axios");
const astroUtils = require("../../utils/astro");
const ObjectId = require('mongodb').ObjectId;

//==================================================
module.exports = {
  //===============  GET ====================================
  getUser: async (req, res) => {
    try {
      console.log('-------- data ----------', model);
      const data = await model.findOne({})
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  //===============  GET_BY_ID ====================================
  getUserById: async (req, res) => {
    const data = await model.find({ _id: req.body._id });
    res.status(200).json(data);
  },
  //===============  POST ====================================
  createUser: async (req, res) => {
    try {
      // =========== VALIDATION ==================
      // return;
      const { error, value } = userCreationValidation.validate(req.body);
      // error=null
      //================== REQUEST_HANDLING ==========================
      if (error) {
        return res.status(400).json({
          response: error.details[0].message,
        });
      } else {
        // =========== NATAL ==================

        const data = await astroUtils.getNatal(value);
        const user = new model(req.body);
        // user.planets = user.planets + data;
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          const planet = new planetModel(element);
          planet.save()
          
          console.log(' planet ------->', planet.id);
          
          user.planets = user.planets.concat(planet.id)
          await user.save();
        }

        // for (let index = 0; index < 12; index++) {
        //   const planetData = data[index];

        //   let obj = planet.id

        //   user.planets = user.planets.push(obj);
        //   await user.save();

        // }
        return res.status(201).json(user);
      }
    } catch (error) {
      res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  },

  //=============== GET_USER_HOUSE_SIGNS ====================================
  getUserHouseSigns: async (req, res) => {
    const user = await model.findById(req.body.id);
    const userSigns = astroUtils.generateZodiacCycle(user.lagna);
    user.userSignsHouse.push(userSigns);
    await user.save();
    res.status(200).json(user);
  },
  getEph: async (req, res) => {
    var swisseph = require('swisseph');

    var date = { year: 2015, month: 1, day: 1, hour: 0 };

    var julday = swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL);
    res.status(200).json(julday);
  },

};
