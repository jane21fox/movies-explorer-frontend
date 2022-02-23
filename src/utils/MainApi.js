import { BASE_URL } from './constants';

const handleResponse = (res) => {
    return res.json().then(json => {
        return res.ok ? json : Promise.reject(json.message);
    });
}

export const register = (name, password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password, email })
    })
        .then(handleResponse);
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(handleResponse)
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(handleResponse)
}

export const setUserInfo = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, email })
    })
        .then(handleResponse)
}

export const saveMovie = (movie) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(movie)
    })
        .then(handleResponse)
}

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(handleResponse)
}

export const deleteMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(handleResponse)
}


