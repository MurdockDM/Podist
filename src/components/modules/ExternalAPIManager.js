import React from "react"
import ExternalAPIKey from "./ExternalAPIKey"

var myHeaders = new Headers();
myHeaders.append(`${ExternalAPIKey.myAPIKeyTitle}`, `${ExternalAPIKey.myAPIKey}`);

var requestOptionsGet = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export default {
    getSearchPodcastsWithOutGenresExplicit(searchTerms) {
        return fetch(`https://listen-api.listennotes.com/api/v2/search?q=${searchTerms}&sort_by_date=0&type=podcast&offset=0&len_min=0&published_after=0&language=English&safe_mode=0`, requestOptionsGet)
        .then(response => response.json())
    },
    getGenres() {
        return fetch(`https://listen-api.listennotes.com/api/v2/genres?top_level_only=1`, requestOptionsGet)
        .then(resp => resp.json())
    },
    getPodcastByAPIId(id) {
        return fetch(`https://listen-api.listennotes.com/api/v2/podcasts/${id}?sort=recent_first`, requestOptionsGet)
    }
}


  