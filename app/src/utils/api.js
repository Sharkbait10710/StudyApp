import { readfromStream } from './utility'

export const makePost = (serverUrl, jsonData) => {
    fetch(serverUrl, {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
    .then((response) => {
        readfromStream(response);
    })
};