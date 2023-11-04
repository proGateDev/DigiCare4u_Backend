const { default: axios } = require("axios");
const ephemeris = require("../constants/urls");
const { planetRulership, lagnaWisePlanetsRulership } = require("../astroMeta");
//=====================================================
kaalPurushaChartData = [
  {
    sign: "aries",
    icon: "♈",
    lord: "mars",
    house: 1,
    rashiMode: "cardinal",
    gender: "male",
  },
  {
    sign: "taurus",
    icon: "♉",
    lord: "venus",
    house: 2,
    rashiMode: "fixed",
    gender: "female",
  },
  {
    sign: "gemini",
    icon: "♊",
    lord: "mercury",
    house: 3,
    rashiMode: "mutable",
    gender: "trans",
  },
  {
    sign: "cancer",
    icon: "♋",
    lord: "moon",
    house: 4,
    rashiMode: "cardinal",
    gender: "female",
  },
  {
    sign: "leo",
    icon: "♌",
    lord: "sun",
    house: 5,
    rashiMode: "fixed",
    gender: "male",
  },
  {
    sign: "virgo",
    icon: "♍",
    lord: "mercury",
    house: 6,
    rashiMode: "mutable",
    gender: "female",
  },
  {
    sign: "libra",
    icon: "♎",
    lord: "venus",
    house: 7,
    rashiMode: "cardinal",
    gender: "male",
  },
  {
    sign: "scorpio",
    icon: "♏",
    lord: "mars",
    house: 8,
    rashiMode: "fixed",
    gender: "female",
  },
  {
    sign: "sagittarius",
    icon: "♐",
    lord: "jupiter",
    house: 9,
    rashiMode: "mutable",
    gender: "trans",
  },
  {
    sign: "capricorn",
    icon: "♑",
    lord: "saturn",
    house: 10,
    rashiMode: "cardinal",
    gender: "trans",
  },
  {
    sign: "aquarius",
    icon: "♒",
    lord: "saturn",
    house: 11,
    rashiMode: "fixed",
    gender: "male",
  },
  {
    sign: "pisces",
    icon: "♓",
    lord: "jupiter",
    house: 12,
    rashiMode: "mutable",
    gender: "female",
  },
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
    let rulingPlanet = kaalPurushaChartData.find((x) => {
      if (x.sign === rotatedZodiacSigns[i]) {
        return x;
      }
    });

    zodiacCycle.push({
      name: rotatedZodiacSigns[i],
      house: i + 1,
      ruler: rulingPlanet.lord,
      rashiMode: kaalPurushaChartData.find((x) => {
        if (x.sign === rotatedZodiacSigns[i]) {
          return x;
        }
      }).rashiMode,
      gender: kaalPurushaChartData.find((x) => {
        if (x.sign === rotatedZodiacSigns[i]) {
          return x;
        }
      }).gender,
    });
  }
  // console.log(" zodiacCycle", zodiacCycle);
  return zodiacCycle;
};
//=================  IsIn  ====================================

const whereHouseLordIsDeposited = (position, newZodiacCycle) => {
  let planetSign = position.name;

  let wherePlanetIsAt = newZodiacCycle.find((x) => {
    if (x.name === planetSign) {
      return x;
    }
  });

  return wherePlanetIsAt.house;
};

//=================  landLord  ====================================

const landLord = (position) => {
  let planetSign = position.name;
  let bhavOwner = kaalPurushaChartData.find((x) => {
    // console.log('====================================', x);
    if (x.sign === planetSign) {
      return x;
    }
  });

  return bhavOwner.lord;
};
//=====================================================
const anyPlanetInTheHouse = (
  house,
  currentPlanetsPositions,
  newZodiacCycle
) => {
  let planetDeposited = currentPlanetsPositions.filter((x) => {
    if (x.position.name === newZodiacCycle[house].name) {
      return x;
    }
  });
  return planetDeposited.map((x) => x.name);
};
//=====================================================
module.exports = {
  getNatal: async (value) => {
    const { houses, planets } = await getEphemeris(value); // for a given location and time
    const ascendant = houses?.data?.data[0];
    const lagnaIndex = ascendant.houseNumber - 1;

    const currentPlanetsPositions = planets?.data?.data;
    const newZodiacCycle = generateZodiacCycle(lagnaIndex);

    //----------------------------------
    let userPlanets = [];
    let userHouses = [];
    // console.log("---------  userHouses -------------------->", userHouses);

    const lagnaPlanets = lagnaWisePlanetsRulership?.find((x) => {
      if (x?.lagna === ascendant.name) {
        return x;
      }
    });

    for (let i = 0; i < currentPlanetsPositions.length; i++) {
      const { name, position } = currentPlanetsPositions[i];
      let wherePlanetIsIn = whereHouseLordIsDeposited(position, newZodiacCycle);
      let bhavowner = landLord(position, newZodiacCycle);

      const rulerOf = lagnaPlanets?.planet?.find((x) => {
        if (x.name === name) {
          return x?.rulingHouse;
        }
      });

      longitude = position.degree + " " + position.sign + " " + position.minute;

      userPlanets.push({
        name: currentPlanetsPositions[i]?.name,
        longitude: longitude,
        rulerOf: rulerOf.rulingHouse,
        isIn: wherePlanetIsIn,
        landLord: bhavowner,
      });
    }
    for (let i = 0; i < newZodiacCycle.length; i++) {
      let residents = anyPlanetInTheHouse(
        i,
        currentPlanetsPositions,
        newZodiacCycle
      );
      userHouses.push({
        bhava: i + 1,
        residents: residents,
        rashi: newZodiacCycle[i]["name"],
        owner: newZodiacCycle[i]["ruler"],
        rashiMode: newZodiacCycle[i]["rashiMode"],
        gender: newZodiacCycle[i]["gender"],
      });
    }

    return { userPlanets, userHouses };
  },
};
