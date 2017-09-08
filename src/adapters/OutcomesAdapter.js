

export default class OutcomesAdapter {

  static showOutcomes(decisionId) {
    return fetch("http://localhost:3000/api/v1/outcomes", {
      headers: headers()
    })
      .then( resp => resp.json())
        .then( outcomes => {
          console.log("fetching outcomes:", outcomes)
          return outcomes.filter((outcome) => outcome.decision_id === decisionId)
        })
    }

  static createOutcome(content, decision_id){
    return fetch("http://localhost:3000/api/v1/outcomes", {
      method: 'post',
      headers: headers(),
      body: JSON.stringify({
        content: content,
        decision_id: decision_id
      })
    })
    .then(resp => resp.json())
  }

  static deleteOutcome(id){
    return fetch(`http://localhost:3000/api/v1/outcomes/${id}`, {
      method: 'delete',
      headers: headers(),
      body: JSON.stringify({
        id: `${id}`
      })
    })
    .then(resp => resp.json())
  }

  static editOutcome(content, id){
    return fetch(`http://localhost:3000/api/v1/outcomes/${id}`, {
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
