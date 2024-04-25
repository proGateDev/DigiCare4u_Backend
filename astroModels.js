//============= HOUSES =================================
const houses = {
  first: {
    sign: "aries",
    element: "fire",
    exaltation: "sun",
    debilitation: "saturn",
    gender: "male",
    keyword: ["ego", "consciousness", "oneself"],
  },
  second: {
    sign: "taurus",
    element: "fire",
    exaltation: "sun",
    debilitation: "saturn",
    gender: "male",
    keyword: ["ego", "consciousness", "oneself", "face structure"]
  },
};
//============= SIGNS =================================
const signs = {
  aries: {
    element: "fire",
    house: 1,
    lord: "mars",
    gender: "male",
    exaltation: "sun",
    debilitation: "saturn",
    direction: "east",
    bodyPart: "head",
    esotericMeanings: ["soul", "consciousness"],
    nakshatras: [
      {
        name: "ashwini",
        degree: "0-13.2 degree aries",
        kahani: ""
      },
      {
        name: "krittika",
        degree: "26-10 degree aries tauraus",
      },
      {
        name: "Ardra",
        degree: "26-10 degree aries tauraus",
      },
    ],
    square: ["cancer", "capricorn"],
    angularLordship: ["moon/cancer", "saturn/capricorn"],
    trine: ["leo", "sagittarius"],
    opp: "libra",
    words: ["me myself and I"],
    mode: ["changeable", "cardinal"],

  },

  taurus: {
    element: "fire",
    house: 1,
    lord: "mars",
    gender: "male",
    exaltation: "sun",
    debilitation: "saturn",
    direction: "east",
    bodyPart: "head",
    esotericMeanings: ["soul", "consciousness"],
    nakshatras: [
      {
        name: "ashwini",
        degree: "0-13.2 degree aries",
      },
      {
        name: "krittika",
        degree: "26-10 degree aries tauraus",
      },
      {
        name: "Ardra",
        degree: "26-10 degree aries tauraus",
      },
    ],
  },
  gemini: {
    element: "fire",
    house: 1,
    lord: "mars",
    gender: "male",
    exaltation: "sun",
    debilitation: "saturn",
    direction: "east",
    bodyPart: "head",
    esotericMeanings: ["soul", "consciousness"],
    nakshatras: [
      {
        name: "ashwini",
        degree: "0-13.2 degree aries",
      },
      {
        name: "krittika",
        degree: "26-10 degree aries tauraus",
      },
      {
        name: "Ardra",
        degree: "26-10 degree aries tauraus",
      },
    ],
  },
  cancer: {
    element: "fire",
    house: 1,
    lord: "mars",
    gender: "male",
    exaltation: "sun",
    debilitation: "saturn",
    direction: "east",
    bodyPart: "head",
    esotericMeanings: ["soul", "consciousness"],
    nakshatras: [
      {
        name: "ashwini",
        degree: "0-13.2 degree aries",
      },
      {
        name: "krittika",
        degree: "26-10 degree aries tauraus",
      },
      {
        name: "Ardra",
        degree: "26-10 degree aries tauraus",
      },
    ],
  },
  leo: {
    element: "fire",
    house: 1,
    lord: "mars",
    gender: "male",
    exaltation: "sun",
    debilitation: "saturn",
    direction: "east",
    bodyPart: "head",
    esotericMeanings: ["soul", "consciousness"],
    nakshatras: [
      {
        name: "ashwini",
        degree: "0-13.2 degree aries",
      },
      {
        name: "krittika",
        degree: "26-10 degree aries tauraus",
      },
      {
        name: "Ardra",
        degree: "26-10 degree aries tauraus",
      },
    ],
  },
  virgo: {
    element: "fire",
    house: 1,
    lord: "mars",
    gender: "male",
    exaltation: "sun",
    debilitation: "saturn",
    direction: "east",
    bodyPart: "head",
    esotericMeanings: ["soul", "consciousness"],
    nakshatras: [
      {
        name: "ashwini",
        degree: "0-13.2 degree aries",
      },
      {
        name: "krittika",
        degree: "26-10 degree aries tauraus",
      },
      {
        name: "Ardra",
        degree: "26-10 degree aries tauraus",
      },
    ],
  },
  libra: {
    element: "fire",
    house: 1,
    lord: "mars",
    gender: "male",
    exaltation: "sun",
    debilitation: "saturn",
    direction: "east",
    bodyPart: "head",
    esotericMeanings: ["soul", "consciousness"],
    nakshatras: [
      {
        name: "ashwini",
        degree: "0-13.2 degree aries",
      },
      {
        name: "krittika",
        degree: "26-10 degree aries tauraus",
      },
      {
        name: "Ardra",
        degree: "26-10 degree aries tauraus",
      },
    ],
  },
  scorpio: {
    element: "fire",
    house: 1,
    lord: "mars",
    gender: "male",
    exaltation: "sun",
    debilitation: "saturn",
    direction: "east",
    bodyPart: "head",
    esotericMeanings: ["soul", "consciousness"],
    nakshatras: [
      {
        name: "ashwini",
        degree: "0-13.2 degree aries",
      },
      {
        name: "krittika",
        degree: "26-10 degree aries tauraus",
      },
      {
        name: "Ardra",
        degree: "26-10 degree aries tauraus",
      },
    ],
  },
  saggitarius: {
    element: "fire",
    house: 1,
    lord: "mars",
    gender: "male",
    exaltation: "sun",
    debilitation: "saturn",
    direction: "east",
    bodyPart: "head",
    esotericMeanings: ["soul", "consciousness"],
    nakshatras: [
      {
        name: "ashwini",
        degree: "0-13.2 degree aries",
      },
      {
        name: "krittika",
        degree: "26-10 degree aries tauraus",
      },
      {
        name: "Ardra",
        degree: "26-10 degree aries tauraus",
      },
    ],
  },
  capricorn: {
    element: "fire",
    house: 1,
    lord: "mars",
    gender: "male",
    exaltation: "sun",
    debilitation: "saturn",
    direction: "east",
    bodyPart: "head",
    esotericMeanings: ["soul", "consciousness"],
    nakshatras: [
      {
        name: "ashwini",
        degree: "0-13.2 degree aries",
      },
      {
        name: "krittika",
        degree: "26-10 degree aries tauraus",
      },
      {
        name: "Ardra",
        degree: "26-10 degree aries tauraus",
      },
    ],
  },
  aquarius: {
    element: "fire",
    house: 1,
    lord: "mars",
    gender: "male",
    exaltation: "sun",
    debilitation: "saturn",
    direction: "east",
    bodyPart: "head",
    esotericMeanings: ["soul", "consciousness"],
    nakshatras: [
      {
        name: "ashwini",
        degree: "0-13.2 degree aries",
      },
      {
        name: "krittika",
        degree: "26-10 degree aries tauraus",
      },
      {
        name: "Ardra",
        degree: "26-10 degree aries tauraus",
      },
    ],
  },
  pisces: {
    element: "fire",
    house: 1,
    lord: "mars",
    gender: "male",
    exaltation: "sun",
    debilitation: "saturn",
    direction: "east",
    bodyPart: "head",
    esotericMeanings: ["soul", "consciousness"],
    nakshatras: [
      {
        name: "ashwini",
        degree: "0-13.2 degree aries",
      },
      {
        name: "krittika",
        degree: "26-10 degree aries tauraus",
      },
      {
        name: "Ardra",
        degree: "26-10 degree aries tauraus",
      },
    ],
  },
};
//============= PLANETS =================================
const planet = {
  sun: {
    signs: ["leo"],
    element: "fire",
    exaltation: "aries",
    debilitation: "libra",
    gender: "male",
    complexion: "blood-red",
    incarnation: "raam",
    cabinet: "king",
    varna: "kshatriya",
    malefic: true,
    guna: "satvik",
    people: ["king", "father", "authority"],
    keyword: ["ego", "soul", "joy", "pride"],
    planetBehavingInHouse: [
      {
        house: 1,
        description: "exalted ; own"
      },
      {
        house: 2,
        description: "value of exaltation"
      },
      {
        house: 3,
        description: "self-expression of exaltation"
      },
    ]
  },
  moon: {
    signs: ["cancer"],
    element: "water",
    exaltation: "taurus",
    debilitation: "scorpio",
    gender: "female",
    incarnation: "krishna",
    cabinet: "queen",
    varna: "vaishya",
    malefic: false,
    guna: "satvik",
    people: ["queen", "mother", "public"],
    keyword: ["emotion", "change"],
  },
  mercury: {
    signs: ["gemini", "virgo"],
    element: "earth",
    exaltation: "virgo",
    debilitation: "pisces",
    gender: "neuter",
    incarnation: "budhha",
    cabinet: "prince",
    varna: "vaishya",
    malefic: false,
    guna: "rajaasik",
    people: ["sisters", "bua", "siblings"],
    keyword: ["blame"],
  },

  venus: {
    signs: ["taurus", "libra"],
    element: "water",
    exaltation: "pisces",
    debilitation: "virgo",
    gender: "female",
    incarnation: "parashurama",
    cabinet: "ministers",
    varna: "brahmana",
    malefic: false,
    guna: "rajaasik",
    people: ["wife", "female"],
    keyword: ["shukra", "diplomacy", "balance"],
  },
  mars: {
    signs: ["aries", "scorpio"],
    element: "fire",
    exaltation: "capricorn",
    debilitation: "cancer",
    gender: "male",
    incarnation: "narasimha",
    cabinet: "ministers",
    varna: "kshatriya",
    malefic: true,
    guna: "tamasik",
    people: ["soldier", "police", "warrior", "brothers", "friends", "native"],
    keyword: ["vitality", "blood", "anger"],
  },
  jupiter: {
    signs: ["sagittarius", "pisces"],
    element: "aether",
    exaltation: "cancer",
    debilitation: "capricorn",
    gender: "male",
    incarnation: "vamana",
    cabinet: "ministers",
    varna: "brahmana",
    malefic: false,
    guna: "satvik",
    people: ["priest", "father", "teacher"],
    keyword: ["religion", "spirutal-warfare", "yellow-food"],
  },
  saturn: {
    signs: ["capricorn", "aquarius"],
    element: "air",
    exaltation: "libra",
    debilitation: "aries",
    gender: "neuter",
    incarnation: "kurma",
    cabinet: "servant",
    varna: "sudra",
    malefic: true,
    guna: "tamasik",
    people: ["servant", "labourer"],
    keywords: {
      nouns: ["Saturn", "Shani"],
      adverbs: [],
      adjectives: [],
    },
    keyword: [
      "Saturn",
      "Shani",
      "Karmic",
      "Discipline",
      "Restriction",
      "Responsibility",
      "Authority",
      "Hard work",
      "Delay",
      "Structure",
      "Patience",
      "Endurance",
      "Wisdom",
      "Maturity",
      "Longevity",
      "Practicality",
      "Prudence",
      "Duty",
      "Lessons",
      "Obstacles",
      "Suffering",
      "Karma",
      "Time",
      "Transformation",
      "Retribution",
      "Justice",
      "Perseverance",
      "Stability",
      "Serenity",
      "Steadfastness",
      "Conservation",
      "Realism",
      "Economy",
      "Frugality",
      "Detachment",
      "Austerity",
      "Sacrifice",
      "Self-discipline",
      "Spiritual growth",
      "Umbrella",
      "Black",
      "Old age",
      "Bones",
      "Hardship",
      "Serpent",
      "Mining",
      "Discipline",
      "Asceticism",
      "Silence",
      "Meditation",
      "Mountain",
      "Isolation",
      "Renunciation",
      "Authority figure",
      "Duty-bound",
      "Structure",
      "Frugality",
      "Purity",
      "Scepter",
      "Crown",
      "Limitations",
      "Boundaries",
      "Tenacity",
      "Labor",
      "Responsibility",
      "Authority",
      "Conservatism",
      "Diligence",
      "Integrity",
      "Contraction",
      "Wisdom",
      "Time",
      "Endurance",
      "Practicality",
      "Humility",
      "Retribution",
      "Karma",
      "Repression",
      "Longevity",
      "Maturity",
      "Tradition",
      "Patience",
      "Adversity",
      "Organization",
      "Sobriety",
      "Perseverance",
      "Resilience",
      "Transformation",
    ],
    functionalBeneficTo: ["taurus", "capricorn", "aquarius", "libra"],
    functionalMaleficTo: ["cancer", "leo", "sagittarius"],
  },
  rahu: {
    signs: ["virgo"],
    element: "fire",
    exaltation: "aries",
    debilitation: "libra",
    gender: "male",
    incarnation: "varaha",
    cabinet: "king",
    varna: "kshatriya",
    malefic: true,
    guna: "satvik",
    people: ["thief", "beggar"],
    keyword: ["illusion", "cheating"],
  },
  ketu: {
    signs: ["pisces"],
    element: "fire",
    exaltation: "scorpio-sagittarius",
    debilitation: "taurus-gemini",
    gender: "male",
    incarnation: "matsya",
    cabinet: "king",
    varna: "kshatriya",
    malefic: true,
    guna: "satvik",
    people: ["ascetic"],
    keyword: ["flag", "achieved"],
  },
};

//============= kaal_purusha =================================
const kaalPurushaChart = [
  {
    sign: "aries",
    icon: "♈",
    lord: "mars",

    planetRulerships: [
      {
        planet: "moon",
        rulingHouses: [4]
      },
      {
        planet: "sun",
        rulingHouses: [5]
      },
      {
        planet: "mercury",
        rulingHouses: [3, 6]
      },
      {
        planet: "venus",
        rulingHouses: [2, 7]
      },
      {
        planet: "mars",
        rulingHouses: [1, 8]
      },
      {
        planet: "jupiter",
        rulingHouses: [9, 12]
      },
      {
        planet: "saturn",
        rulingHouses: [10, 11]
      },
    ],

    naturalRulership: [
      {
        maleAspectHousedIn: 1,
        femaleAspectHousedIn: 8,
      },
      {
        femaleAspectHousedIn: 1,
        maleAspectHousedIn: 6,
      },

    ],

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

    planetRulerships: [
      {
        planet: "moon",
        rulingHouses: [7]
      },
      {
        planet: "sun",
        rulingHouses: [8]
      },
      {
        planet: "mercury",
        rulingHouses: [6, 9]
      },
      {
        planet: "venus",
        rulingHouses: [5, 10]
      },
      {
        planet: "mars",
        rulingHouses: [4, 11]
      },
      {
        planet: "jupiter",
        rulingHouses: [12, 3]
      },
      {
        planet: "saturn",
        rulingHouses: [1, 2]
      },
    ],

    naturalRulership: [
      {
        maleAspectHousedIn: 1,
        femaleAspectHousedIn: 12,
      },
      {
        femaleAspectHousedIn: 1,
        maleAspectHousedIn: 2,
      },

    ],

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


//============= CONCEPTS =================================
const sudarshanChakra = {
  lagna: {
    nature: "One's concept", // EARTH
  },
  moon: {
    nature: "How the event unfolds", // LORD OF THE NAKSHATRAS
  },
  sun: {
    nature: "Condition of the fullfilment of the concept/event", // RASHI-EFFECTS
  },
};

const concepts = [
  {
    name: "Chara karakas",
    description:
      "Planets assigned specific karakas based on their natural significations to determine important areas of life.",
    karakas: [
      {
        name: "Atmakaraka",
        description:
          "The planet with the highest degree in the natal chart, considered a significator of the soul or essence of the individual.",
      },
      {
        name: "Amatyakaraka",
        description:
          "The planet with the second highest degree in the natal chart, considered a significator of the career and profession.",
      },
      {
        name: "Bhratrukaraka",
        description:
          "The planet with the third highest degree in the natal chart, considered a significator of siblings and communication.",
      },
      {
        name: "Matrukaraka",
        description:
          "The planet with the fourth highest degree in the natal chart, considered a significator of the mother and emotional well-being.",
      },
      {
        name: "Putrakaraka",
        description:
          "The planet with the fifth highest degree in the natal chart, considered a significator of children and creativity.",
      },
      {
        name: "Pitrakaraka",
        description:
          "The blessings of the ancestors; the karamas of ones past ",
      },
      {
        name: "Gnatikaraka",
        description:
          "The planet with the sixth highest degree in the natal chart, considered a significator of enemies and obstacles.",
      },
      {
        name: "Darakaraka",
        description:
          "The planet with the seventh highest degree in the natal chart, considered a significator of spouse and partnerships.",
      },
    ],
  },

  {
    name: "Upapada",
    description:
      "A point calculated based on the position of the 12th house from the Ascendant, considered a significator of relationships and marital happiness.",
  },
  {
    name: "Jaimini Sutras",
    description:
      "A set of aphorisms dealing with deeper aspects of astrology such as spirituality and karma.",
  },
  {
    name: "Special aspects",
    description:
      "Unique planetary aspects used in Jaimini astrology to provide additional insights into the individual's life.",
  },
  {
    name: "Dashas",
    description:
      "Planetary cycles used for predictive purposes in Jaimini astrology. The dasha system used in Jaimini astrology is based on the position of the Atmakaraka planet in the natal chart. Some important dashas in Jaimini astrology include: \n\n- Chara dasha: This dasha system uses a fixed sequence of signs to determine the timing of events in an individual's life. \n- Karakamsa dasha: This dasha system is based on the position of the Atmakaraka planet in the Navamsa chart. \n- Mandooka dasha: This dasha system uses the position of the Moon and the Ascendant in the natal chart to determine the timing of events.",
  },
];

module.exports = { houses, signs, planet };

"Cancer, Capricorn and Pisces have fullwater content; Taurus, Sagittarius and Aquarius have half water
content; Aries, Libra and Scorpio have quarter water content; and
Gemini, Leo and Virgo have no water conten"




  ** Planetary Comparisons:**
    - Sun: Blood - red
      - Moon: Tawny
        - Mars: Blood - red
          - Mercury: Grass - like
            - Jupiter, Venus, Saturn: Tawny, variegated, dark

              ** Horoscope Notes:**
                - Complexion isn't determined by the Ascendant planet.
                  - Skin color is influenced by the Sun's position or Saturn.
                    - Darknesses are removable.

