const planetRulership = [
    {
        planet: 'saturn',

        houseRule: {
            house: 10,
            sign: 'capricorn',
            otherHouse: 11,
            sign: 'aquarius',

        },
    },
    {
        planet: 'jupiter',
        houseRule: [9, 12]
    },
]


const lagnaWisePlanetsRulership = [
    {
        lagna: 'capricorn',

        planet: [{
            name: "moon",
            rulingHouse: [7]
        },

        {
            name: "sun",
            rulingHouse: [8]
        },

        {
            name: "mercury",
            rulingHouse: [6, 9]
        },

        {
            name: "venus",
            rulingHouse: [5, 10]
        },

        {
            name: "mars",
            rulingHouse: [4, 11]
        },

        {
            name: "jupiter",
            rulingHouse: [3, 12]
        },

        {
            name: "saturn",
            rulingHouse: [1, 2]
        }]
    }
]
module.exports = planetRulership, lagnaWisePlanetsRulership