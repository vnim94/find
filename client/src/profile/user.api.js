const loginRequest = (email, password) => `
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

const registerRequest = (email, password) => `
    mutation {
        register(email: "${email}", password: "${password}") {
            ... on User {
                id
                email
            }
            ... on UserExists {
                message
                email
            }
            ... on InvalidUserInput {
                message
                errors {
                    email
                    password
                }
            }
        }
    }
`

const checkEmailRequest = (email) => `
    {
        user(email: "${email}") {
            ... on User {
                id
            }
            ... on NotFound {
                message
            }
        }
    }
`

const getUserRequest = (token) => `
    {
        user(token: "${token}") {
            ... on User {
                id
                firstName
                lastName
                fullName
                email
                location
                phone
            }
            ... on NotFound {
                message
            }
        }
    }
`

export const request = async (query, variables={}) => {
    const response = await fetch(process.env.REACT_APP_API, { 
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        }) 
    });
    const data = await response.json();
    return data;
}

export const login = async (email, password) => {
    return await request(loginRequest(email, password));
}

export const register = async (email, password) => {
    return await request(registerRequest(email, password));
}

export const checkEmail = async (email) => {
    return await request(checkEmailRequest(email));
}

export const getUser = async (token) => {
    return await request(getUserRequest(token));
}