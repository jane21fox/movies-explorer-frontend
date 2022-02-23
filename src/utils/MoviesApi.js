import { BEATMOVIESAPI } from './constants';

const handleResponse = (res) => {
    return res.json().then(json => {
        return res.ok ? json : Promise.reject(json.message);
    });
}

export const getBeatMovies = () => {
    return fetch(`${BEATMOVIESAPI}/beatfilm-movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(handleResponse)
}
