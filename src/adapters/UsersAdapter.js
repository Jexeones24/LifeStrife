
export default class UsersAdapter {

  static createUser(user) {
    return fetch("http://localhost:3000/api/v1/users", {
      method: 'post',
      headers: headers(),
      body: JSON.stringify({user:user})
    })
    .then( resp => resp.json())
  }

}

let headers = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}
