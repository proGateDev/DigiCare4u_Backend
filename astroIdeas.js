


    user = {
        user_id: 'user_123',
        name: 'user1',
        dob: '25-09-2023',
        time: '11:48',
        location: 'location',
        planets: [
            {
                name: 'sun',
                longitude: '25 degree',
                nakshatras: 'dhanista',
                nakshatrasLord: 'mars',
                // rulerOf: [5, 10],
                rulerOf: 8,
                isIn: 6,
                // landLord: [5, 10],
                user_id: 'user_123',
                events: [
                    {
                        planetTransitingUserHouse: 1,
                        eventsRelated: [
                            {
                                planet: 'sun',
                                eventName: 'sun enters in capricorn',
                                ingressIn: 'aries',
                                date: '15-04-2023',
                                prediction: 'new light on the roots',
                                user_id: 'user_123',
                                planet_id: 'planet_123',
                            },
                            {
                                planet: 'venus',
                                eventName: 'venus enters in capricorn',
                                ingressIn: 'capricorn',
                                date: '15-04-2024',
                                prediction: 'new light on the roots',
                                planet_id: 'planet',
                            },

                        ]
                    },
                    {
                        planetTransitingUserHouse: 2,
                        eventsRelated: [
                            {
                                planet: 'sun',
                                eventName: 'sun enters in aquarius',
                                ingressIn: 'aquarius',
                                date: '15-04-2023',
                                prediction: 'new light on the roots',
                                user_id: 'user_123',
                            },
                        ]

                    }
                ],
            }
        ],
        houses: [
            {
                bhava: '1',
                residents: ['moon'],
                rashi: 'capricorn',
                owner: 'saturn',
                rashiMode: 'cardinal',
                gender: 'feminine',
                user_id: 'user_123',
                aspectedBy: {
                    user_id: 'user_123',
                    aspectedBy: ['mars', 'jupiter'],
                },
                houseAge: {
                    user_id: 'user_123',
                    age: [1, 13, 25, 38],
                }
            }
        ]
    }
//=======================================
planet = {
    name: 'venus',
    longitude: '25 degree',
    nakshatras: 'dhanista',
    nakshatrasLord: 'mars',
    rulerOf: [5, 10],
    isIn: 6,
    landLord: 'mercury',
    event_id: 'event_1',
    user_id: 'user_123'
}
house = {
    bhava: '1',
    residents: ['moon'],
    rashi: 'capricorn',
    owner: 'saturn',
    rashiMode: 'cardinal',
    gender: 'feminine',
    user_id: 'user_123'
}
//----------------------------------
// useCases : users whose moon is in the first in cancer 
planetEvent = {
    planet: 'sun',
    eventName: 'sun enters in aries',
    ingressIn: 'aries',
    date: '15-04-2023',
    userHouse: 4,
    prediction: 'new light on the roots',
    user_id: 'user_123'
}

houseAspect = {
    user_id: 'user_123',
    aspectedBy: ['mars', 'jupiter'],
}
houseAge = {
    user_id: 'user_123',
    house: 1,
    age: [1, 13, 25, 38],
}

// ====================================================
// -------------- Marketing Posts Ideas ----------------------
// ====================================================

const videos_clips_memes_ideas = [
    {
        link: "https://www.youtube.com/watch?v=f2rOCdHjqes&t=2s&ab_channel=FlyingBeast",
        timestamp: "23:33",
        description: "idea of how the idea of having an advantage of knowing things beforehand or  advantage of having an overview of EVENTS "
    }
]


const startupExpansionIdeas = [
    {
        idea: 'Astro Pedigree Social platform',
        requiredFeatures: 'familial connections + dynamics +  shared astrological influences(Transits).',
        description: "platform like FB, where a user's family member's insight will be shared among themselves, providing inter-related insights"
    },
    {
        idea: 'Tracking market story using the Atro + Blog out of it ',
        description: "To track the sentiment/emotion/intent behind the price action's so and so behaviour; just juxtapositioning the participant actions to that of the planetary combination/stories, thus will be able to create daily + weelky + monthly blogs/postingContent "
    }
]

'House-Planet Relationships:',// lord coming in the arena
    'Significance of Signs and Planets:',
    'Planet-House Relationships:'//house ruled by the planet 

// =========================================================================
//                          ASTRO_Logics
//             ( Insights into future events and their nature:)
// =========================================================================
// FLOW_OF_ENERGY ---> CHALLENGES ---> OPPORTUNITIES
//     |                    |               |
//    natural           obstructive       syncing
// =========================================================================



// HOUSE --> (ELEMENTS + MODALITIES) ---> SIGNS --> [PLANETS]


// Each Elements --> have all the modalities // THE_TRINE
// Each Modality --> have all the elements  //  THE_CROSS


// 4 Elements ------------------------------> 3 Modality Expression                 # eg : Fire     --> Cardinal ==> Mars --> [[Aries(aka 1st) | Hence aries is the male aspect of the mars]] || Aries = "Cardinal Fire" == FIRST_HOUSE
//                                                                                  # eg : Cardinal --> Fire     ==> Mars --> Aries(aka 1st)
// =========================================================================
// fire  : mars, sun, jupiter      [1,5,9]    ('cardinal','fixed','mutable')
// earth : venus, mercury, saturn  [2,6,10]   ('fixed','mutable','cardinal')
// air   : mercury, venus, saturn  [3,7,11]   ('mutable','cardinal','fixed')
// water : moon, mars, jupiter     [4,8,12]   ('cardinal','fixed','mutable')


// =========================================================================
// cardinals : ['mars','moon','venus','saturn']
// fixed     : ['venus','sun','mars','saturn']
// mutables  : ['mercury','mercury','jupiter','jupiter']
// =========================================================================

// ------- Planet's Energy & Expression  ------------------------

// sun       : 'fire + fixed',
// moon      : 'water + cardinal',
// mercury1  : 'air + mutable',
// mercury2  : 'earth + mutable',
// venus1    : 'earth + fixed',
// venus2    : 'air + cardinal',
// mars1     : 'fire + cardinal',
// mars2     : 'water + fixed',
// jupiter1  : 'fire + mutable',
// jupiter2  : 'water + mutable',
// saturn1   : 'earth + cardinal',
// saturn2   : 'air + fixed'

// =========================================================================


//house---planet___Natural Rulership--->Ownership(comfortable + natural)
//             |___Rulership Assigned Due To Transit(s)
//                 |___enemity/neutral/friends (Dignitaries) with the given
//                                                          |___house-->Directional Strength?
//                                                                  |___natural_elements_shifts['fire','earth','air','water'] --> due to :
//                                                                                                                                       |___signs  --> Gendered Part [Element + Mode]
//                                                                                                                                       |___planet --> brings the effect of their Gendered Part(s) [Element + Mode]
//
//
//



//                                  ______aries______
//                                 |                 |
//         (MARS)natal_static ---->|                 |----->(MARS)transit_dynamic
//                                 |_____scorpio_____|


// ==============================================================================================================
// ==============================================================================================================

// Elements --> intro
// Elements Ruler thus for the given Kona house--> intro
// Planet --> intro (which house rulership is assigned)