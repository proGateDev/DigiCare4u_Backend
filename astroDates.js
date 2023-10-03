const dates = [
    {
        event_id: "sun in "
    }
]

//=========================================

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
            // event_id: [
            //     {
            //         planet: 'sun',
            //         eventName: 'sun enters in aries',
            //         ingressIn: 'aries',
            //         date: '15-04-2023',
            //         userHouse: 4,
            //         prediction: 'new light on the roots',
            //         user_id: 'user_123'
            //     }

            // ],
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
            user_id: 'user_123'
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
    age: [1, 13, 25, 38],
}