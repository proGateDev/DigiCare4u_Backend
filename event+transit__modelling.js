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