export default class DecisionsAdapter {

  static getDecisions(currentUser) {
    return fetch("http://localhost:3000/api/v1/decisions", {
      headers: headers()
    })
      .then( resp => resp.json())
        .then( decisions => {
          console.log("fetching decisions:", decisions)
          return decisions.filter((d) => d.user_id === currentUser.id)
        })
    }

  static createDecision(content){
    return fetch("http://localhost:3000/api/v1/decisions", {
      method: 'post',
      headers: headers(),
      body: JSON.stringify({
        content: content,
        user_id: 1,
      })
    })
    .then( resp => resp.json())
  }


  static showDecision(decisionId){
    return fetch(`http://localhost:3000/api/v1/decisions/${decisionId}`, {
      headers: headers()
    })
      .then(resp => resp.json())
  }




  static deleteDecision(id){
    return fetch(`http://localhost:3000/api/v1/decisions/${id}`, {
      method: 'delete',
      headers: headers(),
      body: JSON.stringify({
        id: `${id}`
      })
    })
    .then(resp => resp.json())
  }


  static editDecision(content, id){
    return fetch(`http://localhost:3000/api/v1/decisions/${id}`, {
      method: 'put',
      headers: headers(),
      body: JSON.stringify({
        content: `${content}`
      })
    })
    .then(resp => resp.json())
  }
}

let headers = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}
