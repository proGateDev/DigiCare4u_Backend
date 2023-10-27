const { default: axios } = require("axios");
const ephemeris = require("../constants/urls");
const { planetRulership, lagnaWisePlanetsRulership } = require("../astroMeta");
//=====================================================
kaalPurushaChartData = [
  { sign: "aries", icon: "♈", lord: "mars", house: 1 },
  { sign: "taurus", icon: "♉", lord: "venus", house: 2 },
  { sign: "gemini", icon: "♊", lord: "mercury", house: 3 },
  { sign: "cancer", icon: "♋", lord: "moon", house: 4 },
  { sign: "leo", icon: "♌", lord: "sun", house: 5 },
  { sign: "virgo", icon: "♍", lord: "mercury", house: 6 },
  { sign: "libra", icon: "♎", lord: "venus", house: 7 },
  { sign: "scorpio", icon: "♏", lord: "mars", house: 8 },
  { sign: "sagittarius", icon: "♐", lord: "jupiter", house: 9 },
  { sign: "capricorn", icon: "♑", lord: "saturn", house: 10 },
  { sign: "aquarius", icon: "♒", lord: "saturn", house: 11 },
  { sign: "pisces", icon: "♓", lord: "jupiter", house: 12 },
];
//=====================================================

/**
 * Retrieves zodiac sign data based on the provided icon or name.
 * @param {string} icon - The icon representing the zodiac sign.
 * @param {string} name - The name of the zodiac sign.
 * @returns {object|undefined} - The zodiac sign object if found, otherwise undefined.
 */
const getZodiacData = (icon, name) => {
  if (icon) {
    const foundByIcon = kaalPurushaChartData.find((x) => x.icon === icon);
    if (foundByIcon) {
      return foundByIcon;
    }
  } else if (name) {
    const foundByName = kaalPurushaChartData.find((x) => x.sign === name);
    if (foundByName) {
      return foundByName;
    }
  }
};

//=====================================================
const getEphemeris = async (value) => {
  const planets = await axios.post(ephemeris.ephemerisApi + "/planets", {
    value,
  });
  // console.log(planets.data.data);
  const houses = await axios.post(ephemeris.ephemerisApi + "/houses", {
    value,
  });
  return { planets, houses };
};
//=====================================================
const generateZodiacCycle = (lagnaIndex) => {
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

  const rotatedZodiacSigns = [
    ...zodiacSigns.slice(lagnaIndex),
    ...zodiacSigns.slice(0, lagnaIndex),
  ];
  const zodiacCycle = [];
  for (let i = 0; i < 12; i++) {
    zodiacCycle.push({
      name: rotatedZodiacSigns[i],
      house: i + 1,
    });
  }
  return zodiacCycle;
};
//=====================================================
const whereHouseLordIsDeposited = (
  planet,
  currentPlanetsPositions,
  newZodiacCycle
) => {
  let planetCurrentPosition = "";
  if (currentPlanetsPositions) {
    planetCurrentPosition =
      currentPlanetsPositions?.find((x) => {
        return x.name.toLowerCase() === planet.toLowerCase();
      }) ?? null;
  }

  let planetsCurrentTransitZodiacSign = getZodiacData(
    planetCurrentPosition?.position?.split(" ")[1]
  ); //--- extracting the symbol

  let houseNumber = newZodiacCycle.findIndex(
    (x) => x.name === planetsCurrentTransitZodiacSign?.sign
  );
  // ============================
  const getHouseLordDeposited = (
    planetName,
    currentPlanetsPositions,
    newZodiacCycle
  ) => {
    const planetCurrentPosition = currentPlanetsPositions.find(
      (x) => x.name.toLowerCase() === planetName.toLowerCase()
    );

    if (!planetCurrentPosition) {
      return null; // Return null if the planet's position is not found
    }

    const planetsCurrentTransitZodiacSign = getZodiacData(
      planetCurrentPosition.position.split(" ")[1]
    );

    if (!planetsCurrentTransitZodiacSign) {
      return null; // Return null if the zodiac sign data is not found
    }

    const houseNumber = newZodiacCycle.findIndex(
      (x) => x.name === planetsCurrentTransitZodiacSign.sign
    );

    return houseNumber + 1; // Adding 1 to match the house numbering (1-indexed)
  };

  // =============================
  return houseNumber + 1;
};
//=====================================================
const anyPlanetInTheHouse = (
  house,
  currentPlanetsPositions,
  newZodiacCycle
) => {
  let planetDeposited = [];
  planetDeposited = currentPlanetsPositions.filter(
    (x) =>
      x.position.split(" ")[1] ===
      getZodiacData(null, newZodiacCycle[house].name).icon
  );

  return planetDeposited;
};
//=====================================================
module.exports = {
  getNatal: async (value) => {
    // console.log('---------------- getNatal');

    const { houses, planets } = await getEphemeris(value); // for a given location and time
    // console.log(houses.data.data);
    const ascendant = houses?.data?.data[0]; //-------> only need the first house for Asc. calculation
    const lagnaIndex = ascendant.houseNumber;

    const currentPlanetsPositions = planets?.data?.data;

    // const ascSymbolData = getZodiacData(ascSymbol, null);
    const newZodiacCycle = generateZodiacCycle(lagnaIndex);

    //----------------------------------
    let userPlanets = [];

    const lagnaPlanets = lagnaWisePlanetsRulership?.find((x) => {
      if (x?.lagna === ascendant.name) {
        return x;
      }
    });
    for (let i = 0; i < currentPlanetsPositions.length; i++) {
      let lord = getZodiacData(null, newZodiacCycle[i].name);

      const { name, position } = currentPlanetsPositions[i];

      const rulerOf = lagnaPlanets?.planet?.find((x) => {
        if (x.name === name) {
          console.log("--------- x.name-------------------->", x);
          return x;
        }
      });

      longitude = position.degree + " " + position.sign + " " + position.minute;

      userPlanets.push({
        name: currentPlanetsPositions[i]?.name,
        longitude: longitude,
        rulerOf: rulerOf,
        isIn: lord.lord,
        landLord: lord.lord,
      });
    }
    console.log("--------- userPlanets -------------------->", userPlanets[0]);
    return userPlanets;
  },
};