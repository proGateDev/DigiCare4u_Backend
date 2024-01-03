
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
    landLord: [5, 10],
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
        description: "platform like FB, where a user's family member's insight will be shared among themselves, providing inter-related insights"
    },
    {
        idea: 'Tracking market story using the Atro + Blog out of it ',
        description: "To track the sentiment/emotion/intent behind the price action's so and so behaviour; just juxtapositioning the participant actions to that of the planetary combination/stories, thus will be able to create daily + weelky + monthly blogs/postingContent "
    }
]