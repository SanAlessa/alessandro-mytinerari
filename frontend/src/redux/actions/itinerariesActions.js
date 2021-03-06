import axios from 'axios'
import toast from 'react-hot-toast'


const itinerariesActions = {
  getItineraries: (id) => {
    return async (dispatch, getState) => {
      try {
        const response = await fetch('https://alessandro-mytinerary.herokuapp.com/api/itineraries/'+id)
        const data = await response.json()
        dispatch({type: 'GET_ITINERARIES', payload: data.response})
      }catch(error){
        toast.error('Oops something went wrong, try again later!')
      }
    }
  },


  addComment: (comment, token, id) => {
    return async (dispatch, getState) => {
      console.log('en comment llega el :' +token)
      getState()
      try {
        const response = await axios.post('https://alessandro-mytinerary.herokuapp.com/api/comments', {comment, id} , {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch({type: 'COMMENT', payload: response.data})
        console.log(response.data)
      }catch(error){
        console.log(error)
        toast.error('Oops something went wrong, try again later!')
      }
    }
  },

  updateComment: (comment, idComment, idItinerary, token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.put('https://alessandro-mytinerary.herokuapp.com/api/comments/update', {comment, idComment, idItinerary}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch({type: 'COMMENT', payload: response.data})
      }
      catch(error){
        toast.error('Oops something went wrong, try again later!')
      }
    }
  },

  deleteComment: (idComment, idItinerary, token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.put('https://alessandro-mytinerary.herokuapp.com/api/comments', {idComment, idItinerary}, {
          headers: {
            Authorization: 'Bearer '+ token
          }
        })
        dispatch({type: 'COMMENT', payload: response.data})
      }
      catch(error){
        toast.error('Oops something went wrong, try again later!')
      }
    }
  },

  like: (id, token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post('https://alessandro-mytinerary.herokuapp.com/api/likes', {id}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch({type: 'LIKE', payload: response.data})
      }catch(error){
        toast.error('Oops something went wrong, try again later!')
      }
    }
  },

  dislike: (id, token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post('https://alessandro-mytinerary.herokuapp.com/api/dislike', {id}, {
          headers: {
            Authorization: 'Bearer ' +token
          }
        })
        dispatch({type: 'LIKE', payload: response.data})
      }catch(error){
        toast.error('Oops something went wrong, try again later!')
      }
    }
  }
}

export default itinerariesActions