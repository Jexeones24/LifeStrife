export default class OpinionsAdapter {

  static createOpinion(content, outcomeId, value){
    return fetch("http://localhost:3000/api/v1/opinions", {
      method: 'post',
      headers: headers(),
      body: JSON.stringify({
        content: `${content}`,
        outcome_id: `${outcomeId}`,
        value: `${value}`
      })
    })
    .then(resp => resp.json())
  }

  static getOpinions(id) {
    return fetch(`http://localhost:3000/api/v1/outcomes/${id}`, {
      headers: headers()
    })
      .then( resp => resp.json())
    }


  static deleteOpinion(id){
    return fetch(`http://localhost:3000/api/v1/opinions/${id}`, {
      method: 'delete',
      headers: headers(),
      body: JSON.stringify({
        id: `${id}`
      })
    })
    .then( resp => resp.json() )
  }

  static editOpinion(content, id){
    return fetch(`http://localhost:3000/api/v1/opinions/${id}`, {
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
