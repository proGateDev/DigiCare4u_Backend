const model = require("../models/user");
const transitModel = require("../models/transit");
const userCreationValidation = require("../../user/validation/user");
const { default: axios } = require("axios");
const astroUtils = require("../../utils/astro");

//==================================================
module.exports = {
  //===============  GET ====================================
  getUser: async (req, res) => {
    try {
      const data = await model.find({});
      console.log('-------- data ----------', data);
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
      console.log("------------------------------>", req.body);
      // =========== VALIDATION ==================
      // return;
      const { error, value } = userCreationValidation.validate(req.body);

      //================== REQUEST_HANDLING ==========================
      if (error) {
        return res.status(400).json({
          response: error.details[0].message,
        });
      } else {
        // =========== NATAL ==================

        const data = await astroUtils.getNatal(value);
        const user = new model(req.body);
        user.natal = [...user.natal, ...data];
        await user.save();
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
  //===============  GET_USER_HOUSE_SIGNS ====================================
  getUserTransit: async (req, res) => {
    const userId = req.query.id;
    const user = await model.findById(req.query.id);
    const transit = await transitModel.find({});

    console.log(transit);
    return;
    const userSigns = generateZodiacCycle(user.lagna);
    // console.log('cccccccccccc ',userSigns);

    user.userSignsHouse.push(userSigns);
    // console.log(data);
    await user.save();

    res.status(200).json(user);
  },
};
