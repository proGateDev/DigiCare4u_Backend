
//-----------------------------------------------------------
const details = [{

    lagna: "aries",
    planets: [{
        name: "mars",

        rulingHouses: [1, 8],
        planetInDifferentHouses: [
            {
                house: 1,
                sign: 'aries',
                description: 'mars in the first house in aries sign',
                houseRelation: 'own',
                signRelation: 'own',
                planetStrength: 'powerful',
                aspect: [{
                    aries: '1st only',
                    scorpio: '6th from',
                }],
            },
            {
                house: 2,
                sign: 'taurus',
                description: 'mars in the second house in taurus sign',
                houseRelation: 'neutral',
                signRelation: 'neutral',
                aspect: [{
                    aries: '2nd from',
                    scorpio: '7th from',
                }],
            },
            {
                house: 3,
                sign: 'gemini',
                description: 'mars in the third house in gemini sign',
                houseRelation: 'neutral',
                signRelation: 'neutral',
                aspect: {
                    aries: '3rd from',
                    scorpio: '8th from',
                },
            },
            {
                house: 9,
                sign: 'sagittarius',
                description: 'mars in the ninth house in sagittarius sign',
                houseRelation: 'enemy',
                signRelation: 'enemy',
                aspect: {
                    aries: '9th from',
                    scorpio: '2nd from',
                },
            },


        ]
    }],
},
{

    lagna: "capricorn",
    planets: [
        {
            name: "moon",

            rulingHouses: [7],
            planetInDifferentHouses: [
                {
                    house: 1,
                    sign: 'capricorn',
                    description: 'venus in the sixth house in gemini sign',
                    houseRelation: 'own',
                    signRelation: 'own',
                    planetStrength: 'strong',

                    cancer: {
                        placesAway: 7,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },


                },
                {
                    house: 2,
                    sign: 'aquarius',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',


                    cancer: {
                        placesAway: 8,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 3,
                    sign: 'pisces',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',


                    cancer: {
                        placesAway: 9,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 4,
                    sign: 'aries',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',


                    cancer: {
                        placesAway: 10,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 5,
                    sign: 'taurus',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',


                    cancer: {
                        placesAway: 11,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 6,
                    sign: 'gemini',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',


                    cancer: {
                        placesAway: 12,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 7,
                    sign: 'cancer',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',


                    cancer: {
                        placesAway: 1,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 8,
                    sign: 'leo',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',


                    cancer: {
                        placesAway: 2,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 9,
                    sign: 'virgo',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',


                    cancer: {
                        placesAway: 3,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 10,
                    sign: 'libra',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',


                    cancer: {
                        placesAway: 4,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 11,
                    sign: 'scorpio',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',


                    cancer: {
                        placesAway: 5,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },

                {
                    house: 12,
                    sign: 'sagittarius',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',


                    cancer: {
                        placesAway: 6,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },

            ]
        },
        {
            name: "sun",

            rulingHouses: [8],
            planetInDifferentHouses: [
                {
                    house: 1,
                    sign: 'capricorn',

                    description: 'venus in the sixth house in gemini sign',
                    houseRelation: 'own',
                    signRelation: 'own',
                    planetStrength: 'strong',
                    capricorn: {
                        placesAway: '1st',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    aquarius: {
                        placesAway: '12th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 2,
                    sign: 'aquarius',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',

                    capricorn: {
                        placesAway: '12th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    aquarius: {
                        placesAway: '1st',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },

            ]
        },
        {
            name: "mercury",

            rulingHouses: [6, 9],
            planetInDifferentHouses: [
                {
                    house: 1,
                    sign: 'capricorn',

                    description: 'venus in the sixth house in gemini sign',
                    houseRelation: 'own',
                    signRelation: 'own',
                    planetStrength: 'strong',
                    gemini: {
                        placesAway: '1st',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    virgo: {
                        placesAway: '12th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 2,
                    sign: 'aquarius',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',

                    gemini: {
                        placesAway: '1st',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    virgo: {
                        placesAway: '12th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 6,
                    sign: 'gemini',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',

                    gemini: {
                        placesAway: '1st',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    virgo: {
                        placesAway: '10th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 12,
                    sign: "sagittarius",

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',

                    gemini: {
                        placesAway: 7,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    virgo: {
                        placesAway: 4,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },


            ]
        },
        {
            name: "jupiter",

            rulingHouses: [1, 2],
            planetInDifferentHouses: [
                {
                    house: 1,
                    sign: 'capricorn',

                    description: 'venus in the sixth house in gemini sign',
                    houseRelation: 'own',
                    signRelation: 'own',
                    planetStrength: 'strong',
                    capricorn: {
                        placesAway: '1st',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    aquarius: {
                        placesAway: '12th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 2,
                    sign: 'aquarius',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',

                    capricorn: {
                        placesAway: '12th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    aquarius: {
                        placesAway: '1st',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },

            ]
        },
        {
            name: "mars",

            rulingHouses: [4, 11],
            planetInDifferentHouses: [
                {
                    house: 1,
                    sign: 'capricorn',

                    description: 'venus in the sixth house in gemini sign',
                    houseRelation: 'own',
                    signRelation: 'own',
                    planetStrength: 'strong',
                    capricorn: {
                        placesAway: '1st',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    aquarius: {
                        placesAway: '12th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 2,
                    sign: 'aquarius',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',

                    capricorn: {
                        placesAway: '12th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    aquarius: {
                        placesAway: '1st',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },

            ]
        },

        {
            name: "venus",

            rulingHouses: [5, 10],
            planetInDifferentHouses: [
                {
                    house: 6,
                    sign: 'gemini',

                    description: 'venus in the sixth house in gemini sign',
                    houseRelation: 'own',
                    signRelation: 'own',
                    planetStrength: 'strong',
                    taurus: {
                        placesAway: '2nd',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    libra: {
                        placesAway: '9th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 11,
                    sign: 'scorpio',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',

                    taurus: {
                        placesAway: 7,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    libra: {
                        placesAway: 2,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 12,
                    sign: 'sagittarius',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',

                    taurus: {
                        placesAway: 8,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    libra: {
                        placesAway: 3,
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },

            ]
        },
        {
            name: "saturn",

            rulingHouses: [1, 2],
            planetInDifferentHouses: [
                {
                    house: 1,
                    sign: 'capricorn',

                    description: 'venus in the sixth house in gemini sign',
                    houseRelation: 'own',
                    signRelation: 'own',
                    planetStrength: 'strong',
                    capricorn: {
                        placesAway: '1st',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    aquarius: {
                        placesAway: '12th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 2,
                    sign: 'aquarius',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',

                    capricorn: {
                        placesAway: '12th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    aquarius: {
                        placesAway: '1st',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },
                {
                    house: 3,
                    sign: 'pisces',

                    description: 'mars in the second house in taurus sign',
                    houseRelation: 'neutral',
                    signRelation: 'neutral',
                    planetStrength: 'strong',

                    capricorn: {
                        placesAway: '11 th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                    aquarius: {
                        placesAway: '12 th',
                        description: 'some story related of some kind',
                        reason: 'reason'
                    },
                },

            ]
        },



    ],
}
]

