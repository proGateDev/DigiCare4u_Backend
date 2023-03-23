const model = require("../models/user");
const transitModel = require("../models/transit");
//==================================================
function generateZodiacCycle(lagnaSign) {
  const zodiacSigns = [
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpio",
    "sagittarius",
    "capricorn",
    "aquarius",
    "pisces",
  ];

  // Get the index of the lagna sign in the zodiac cycle
  const lagnaIndex = zodiacSigns.indexOf(lagnaSign);
  console.log("---->", lagnaIndex);

  // Rotate the zodiac cycle array so that the lagna sign is in the first position
  const rotatedZodiacSigns = [
    ...zodiacSigns.slice(lagnaIndex),
    ...zodiacSigns.slice(0, lagnaIndex),
  ];
  console.log("---->", rotatedZodiacSigns);
  // Generate an array of objects representing each house in the zodiac cycle
  const zodiacCycle = [];
  for (let i = 0; i < 12; i++) {
    zodiacCycle.push({
      name: rotatedZodiacSigns[i],
      house: i + 1,
    });
  }

  return zodiacCycle;
}
//==================================================
module.exports = {
  //===============  GET ====================================
  getUser: async (req, res) => {
    const data = await model.find({});
    res.status(200).json(data);
  },
  //===============  GET ====================================
  getUserById: async (req, res) => {
    const data = await model.findById(req.query.id);
    res.status(200).json(data);
  },
  //===============  POST ====================================
  postUser: async (req, res) => {
    const user = new model(req.body);

    user.save();
    res.status(201).json(user);
  },
  //===============  GET_USER_HOUSE_SIGNS ====================================
  getUserHouseSigns: async (req, res) => {
    const userId = req.query.id;
    const user = await model.findById(req.query.id);

    const userSigns = generateZodiacCycle(user.lagna);
    // console.log('cccccccccccc ',userSigns);

    user.userSignsHouse.push(userSigns);
    // console.log(data);
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
