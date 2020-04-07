const localBaseURL = "http://localhost:8088"

export default {
    getAllLists() {
        return fetch(`${localBaseURL}/listsSavedPodcasts?_expand=list&_expand=savedPodcast`)
            .then(resp => resp.json())
    },
    getListsForPodcasts() {
        return fetch(`${localBaseURL}/listsSavedPodcasts?_expand=list`)
            .then(resp => resp.json())
    },
    getSingleListById(id) {
        return fetch(`${localBaseURL}/lists/${id}?_embed=listsSavedPodcasts`)
            .then(resp => resp.json())
    },
    getSingleListByIdWithoutJoinTable(id) {
        return fetch(`${localBaseURL}/lists/${id}`)
            .then(resp => resp.json())
    },
    getOnlyBasicLists() {
        return fetch(`${localBaseURL}/lists?_embed=listsSavedPodcasts`)
            .then(resp => resp.json())
    },
    postSinglePodcast(podcastObject) {
        return fetch(`${localBaseURL}/savedPodcasts`, {
            method: "POST",
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
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listObject)
        }).then(resp => resp.json())
    },
    postNewUser(userObject) {
        return fetch(`${localBaseURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject)
        }).then(resp => resp.json())
    },
    postNewJoinList(listObject) {
        return fetch(`${localBaseURL}/listsSavedPodcasts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listObject)
        }).then(resp => resp.json())
    },
    deletePodcastById(id) {
        return fetch(`${localBaseURL}/savedPodcasts/${id}`, {
            method: "DELETE"
        }).then(resp => resp.json())
    },
    deleteMainListbyId(id) {
        return fetch(`${localBaseURL}/lists/${id}`, {
            method: "DELETE"
        }).then(resp => resp.json())
    },
    removePodcastFromListButNotDelete(id) {
        return fetch(`${localBaseURL}/listsSavedPodcasts/${id}`, {
            method: "DELETE"
        }).then(resp => resp.json())
    },
    updateList(listObject) {
        return fetch(`${localBaseURL}/lists/${listObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listObject)
        }).then(data => data.json());
    },
}


