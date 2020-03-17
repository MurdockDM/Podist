const localBaseURL = "http://localhost:8088"

export default {
    getAllLists() {
        return fetch(`${localBaseURL}/listsSavedPodcasts?_expand=list&_expand=savedPodcast`)
        .then(resp => resp.json())
    }
}


