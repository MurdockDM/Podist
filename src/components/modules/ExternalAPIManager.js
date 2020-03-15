import React from "react"
import ExternalAPIKey from "./ExternalAPIKey"

var myHeaders = new Headers();
myHeaders.append(`${ExternalAPIKey.myAPIKeyTitle}, ${ExternalAPIKey.myAPIKey}`);

var requestOptionsGet = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export default {
    getSearchWithGenresExplicit(searchTerms, genre_ids) {
        return fetch(`https://listen-api.listennotes.com/api/v2/search?q=${searchTerms}&sort_by_date=0&type=episode&offset=0&len_min=0&genre_ids=${genre_ids}&published_after=0&language=English&safe_mode=0`, requestOptionsGet)
        .then(response => response.json())
    },
    getGenres() {
        return fetch(`https://listen-api.listennotes.com/api/v2/genres`, requestOptionsGet)
        .then(resp => resp.json())
    }
}


  