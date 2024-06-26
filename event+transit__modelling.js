const userEventList = [
    {
        'userId': 369,
        'planetInConcern': 'jupiter',
        'transiting': 'taurus',
        'transitingHouse': 5,
        'transitingOn': '01-05-2024',
        'rulerOf': [3, 12],
        'planetConcernedTo': [
            {
                'planet': 'mars',
                'rulerOf': [4, 11],
                'placesAway': 6,
            }
        ],

    }
]


let events = [
    {
        userId: '66601fcb5eb070396fbf300e',
        eventName: 'Sun entering Cancer',

        event: {
            type: 'dharmic',
            lord: 'sun',
            isRetrograde: false,
            assignedHouseLordship: 8,
            planetStrength: {
                shadbala: 5,
                chestabala: 4,
                digbala: 1,
                drikbala: 1,
                horabala: 3,
                kendrabala: 3,
                naisargikabala: 1,
                ochchabala: 8,
                pakshabala: 8,
                saptavargajabala: 4,
                sthanabala: 4,
            },
            planetInNavamsha: {
                sign: 'gemini',
                house: 3,
            },
            nakshatrasIn: {
                name: 'ashwini',
                lord: 'sun',
            },
            isPlanetBeneficOrMalefic: ['benefic', 'malefic'],
            isPlanetDebilatedOrExalted: ['exaltation', 'deblitation'],
            planetAvastha: ['avastha1', 'avastha2', 'avastha3'],
            natal: {
                position: {
                    sign: 'aries',
                    longitude: '26 degree 15 minutes',
                },
                depositedAt: {
                    house: {
                        name: 6,
                        isItsOwnHouse: false,
                        houseAngle: ['kendra', 'upachaya', 'trikona'],
                        houseLordNature: ['friend', 'enemy'],
                        lord: 'mercury',
                    },
                    sign: {
                        name: 'gemini',
                        element: 'air',
                        mode: 'mutable',
                        isItsMooltrikona: false,
                        isIntsOwnHouse: false,
                    },
                },
                placesAway: 11,
                housesInAspect: 12,
                aspectedByPlanets: [
                    {
                        planet: 'moon',
                        friend: true,
                        enemy: false,
                        malefic: true,
                        benefic: false,
                        aspect: ['conjunction', 'sextile', 'square', 'trine', 'opposition']
                    }
                ],
                planetAscpecting: [
                    {
                        planet: 'moon',
                        house: '1',
                        friend: true,
                        enemy: false,
                        malefic: true,
                        benefic: false,
                        aspect: ['conjunction', 'sextile', 'square', 'trine', 'opposition']
                    }
                ],

            },
            transiting: {
                position: {
                    sign: 'aries',
                    longitude: '26 degree 15 minutes',
                },
                depositedAt: {
                    house: {
                        name: 6,
                        isItsOwnHouse: false,
                        houseAngle: ['kendra', 'upachaya', 'trikona'],
                        houseLordNature: ['friend', 'enemy'],
                        lord: 'mercury',
                    },
                    sign: {
                        name: 'gemini',
                        element: 'air',
                        mode: 'mutable',
                        isItsMooltrikona: false,
                        isIntsOwnHouse: false,
                    },
                },
                placesAway: 11,
                housesInAspect: 12,
                aspectedByPlanets: [
                    {
                        planet: 'moon',
                        friend: true,
                        enemy: false,
                        malefic: true,
                        benefic: false,
                        aspect: ['conjunction', 'sextile', 'square', 'trine', 'opposition']
                    }
                ],
                planetAscpecting: [
                    {
                        planet: 'moon',
                        house: '1',
                        friend: true,
                        enemy: false,
                        malefic: true,
                        benefic: false,
                        aspect: ['conjunction', 'sextile', 'square', 'trine', 'opposition']
                    }
                ],

                from: '2024-16-06',
                to: '2024-15-07',
            },

        },
    }
]
let planetEvents = [
    // --------- Mundane ---------------
    {
        'userId': null,
        'planet': 'mars',
        'rulerOf': [1, 8],
        'originallyPlacedIn': null,
        'transiting': 'taurus',
        'transitingHouse': 2,
        'transitingOn': '01-07-2024'
    },

    // --------- Personal ---------------
    {
        'userId': 369,
        'planet': 'mars',
        'rulerOf': [4, 11],
        'originallyPlacedIn': 9,
        'transiting': 'taurus',
        'transitingHouse': 5,
        'transitingOn': '01-07-2024'
    }
]


// ==============================================

//Either  API or Functions

// getUserTransitData 
const request = {
    'planet': 'Jupiter',
    'transiting': 'taurus',
}

// getHouseFromZodiacSign_v1
const request1 = {
    'zodiac': 'taurus',
    'lagna': 'capricorn'
}

// getHouseFromZodiacSign_v2 
const request2 = {
    'zodiac': 'taurus',
    'lagna': 'capricorn',
    'planet': 'mars',
    'originallyPlacedIn': 9
}







// Stocks       RulingPlanets
// ---------------------------
// NIFTY      - jupiter
// BANK_NIFTY - venus
const angles = [
    11.25,
    22.5,
    33.75,
    45,
    56.25,
    60,
    67.5,
    78.75,
    90,
    101.25,
    112.5,
    120,
    123.375,
    135,
    146.25,
    157.5,
    168.75,
    180,
    191.25,
    202.5,
    213.75,
    225,
    236.25,
    240,
    247.5,
    258.75,
    270,
    281.25,
    292.15,
    300,
    303.75,
    315,
    326.25,
    337.5,
    348.75,
    360
];



// phasePercentages =[12.5 %, 25%, 33.3%, 37.5%, 50%, 62.5%, 66.6%,75%, 87.5% ]

// EXAMPLE: the high of 436.75
// 436.75 x 8 = 3494, divide 3494 by 360 = 9.7056 (subtract the whole number 9) and
// multiply the remainder by 360 (.7056 x 360 = 254).
// 254 = 14 degrees Sagittarius.

325.22
86.46