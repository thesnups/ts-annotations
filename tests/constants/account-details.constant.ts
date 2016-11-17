export const rawAccountDetails = {
    account: {
        details: {
            name: 'Testing123',
            age: 32,
            isAwesome: true,
            isSmelly: false,
            summary: {
                location: {
                    address: {
                        streetAddress: '150 Granby St',
                        city: 'Norfolk',
                        stateCode: 'VA',
                        zip_code: '23510',
                    },
                },
                cellPhone: '(999) 999-9999',
            },
        },
        facebook_profile_url: null,
        billing: {
            creditCard: {
                type: 'Visa',
                number: '1234567890123456',
                expiration: '09/20'
            }
        }
    },
    emailAddresses: [
        {
            address: 'someemail@yahoo.com',
            active: true,
        },
        {
            address: 'anotheremail@yahoo.com',
            active: false,
        }
    ],
    favoriteColors: [
        'blue',
        'orange',
    ],
};
