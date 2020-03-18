const localBaseURL = "http://localhost:8088"

export default {
    getAllLists() {
        return fetch(`${localBaseURL}/listsSavedPodcasts?_expand=list&_expand=savedPodcast`)
        .then(resp => resp.json())
    },
    postSinglePodcast(podcastObject) {
        return fetch(`${localBaseURL}/savedPodcasts`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(podcastObject)
        }).then(resp => resp.json())
    },
    getAllSavedPodcasts() {
        return fetch(`${localBaseURL}/savedPodcasts`)
        .then(resp => resp.json())
    },
    getSavedPodcastById(id) {
        return fetch(`${localBaseURL}/savedPodcasts/${id}`)
        .then(resp => resp.json())
    },
    postNewList(listObject) {
        return fetch(`${localBaseURL}/lists`, {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listObject)
        }).then(resp => resp.json())
    },
    postNewJoinList(listObject) {
        return fetch(`${localBaseURL}/listsSavedPodcasts`, {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listObject)
        }).then(resp => resp.json())
    }
}


