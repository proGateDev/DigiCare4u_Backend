const mongoose = require("mongoose");

const planetStrengthSchema = new mongoose.Schema({
  shadbala: Number,
  chestabala: Number,
  digbala: Number,
  drikbala: Number,
  horabala: Number,
  kendrabala: Number,
  naisargikabala: Number,
  ochchabala: Number,
  pakshabala: Number,
  saptavargajabala: Number,
  sthanabala: Number,
});

const positionSchema = new mongoose.Schema({
  sign: String,
  longitude: String,
});

const houseSchema = new mongoose.Schema({
  name: Number,
  isItsOwnHouse: Boolean,
  houseAngle: [String],
  houseLordNature: [String],
  lord: String,
});

const depositedAtSchema = new mongoose.Schema({
  house: houseSchema,
  sign: {
    name: String,
    element: String,
    mode: String,
    isItsMooltrikona: Boolean,
    isItsOwnHouse: Boolean,
  },
});

const planetAspectingSchema = new mongoose.Schema({
  planet: String,
  house: String,
  friend: Boolean,
  enemy: Boolean,
  malefic: Boolean,
  benefic: Boolean,
  aspect: [String],
});

const natalOrTransitingSchema = new mongoose.Schema({
  position: positionSchema,
  depositedAt: depositedAtSchema,
  placesAway: Number,
  housesInAspect: Number,
  aspectedByPlanets: [planetAspectingSchema],
  planetAspecting: [planetAspectingSchema],
});

const eventSchema = new mongoose.Schema({
  type: String,
  lord: String,
  isRetrograde: Boolean,
  assignedHouseLordship: Number,
  planetStrength: planetStrengthSchema,
  planetInNavamsha: {
    sign: String,
    house: Number,
  },
  nakshatrasIn: {
    name: String,
    lord: String,
  },
  isPlanetBeneficOrMalefic: [String],
  isPlanetDebilatedOrExalted: [String],
  planetAvastha: [String],
  natal: natalOrTransitingSchema,
  transiting: natalOrTransitingSchema,
  from: Date,
  to: Date,
});

const EventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  eventName: String,
  event: eventSchema,
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event
