import env from 'react-dotenv';

const loginQuery = (email, password) => `
    mutation {
        login(email: "${email}", password: "${password}") {
            ... on AuthPayload {
                token
                user {
                    id
                    firstName
                    lastName
                    email
                    location
                    phone
                }
            }
            ... on InvalidCredentials {
                message
            }
        }
    }
`

const registerQuery = (firstName, lastName, email, location, password, phone) => `
    mutation {
        createUser(firstName: "${firstName}", lastName: "${lastName}", email: "${email}", location: "${location}", password: "${password}", phone: "${phone}") {
            ... on User {
                id
                firstName
                lastName
                email
                location
                phone
            }
            ... on UserExists {
                message
                email
            }
            ... on InvalidUserInput {
                message
                errors {
                    firstName
                    lastName
                    email
                    location
                    password
                    phone
                }
            }
        }
    }
`

export const login = async (email, password) => {
    const response = await fetch(env.API, { 
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: loginQuery(email, password)
        }) 
    });
    const data = await response.json();
    return data;
}