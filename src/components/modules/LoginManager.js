const localAPIBaseURL = "http://localhost:8088";

export default {
  getUsers() {
    return fetch(`${localAPIBaseURL}/users`).then(resp => resp.json());
  },
  post(newUser) {
    return fetch(`${localAPIBaseURL}/users`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(resp => resp.json())
  }
};