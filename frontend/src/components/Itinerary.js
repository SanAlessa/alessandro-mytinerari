// Componente de los itinerarios que es llamado por el componente City. Cada itinerario creado de manera dinamica con sus propiedades.

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoneyBillAlt, faHeart, faPaperPlane, faClock, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {
  IconLookup,
  IconDefinition,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
import './FonAwesomIcons'
import { useEffect, useState } from "react"
import Activity from './Activity'
import Comment from './Comment'
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import toast from "react-hot-toast"

const heartLookup: IconLookup = { prefix: 'far', iconName: 'heart' }
const heartIconDefinition: IconDefinition = findIconDefinition(heartLookup)

const Itinerary = (props) => {
  const [visible, setVisible] = useState(false)
  const { title, userPic, userName, hours, likes, price, hashtag, activities, comments, _id } = props.itinerary
  const [comment, setComment] = useState('')
  const [liked, setLiked] = useState('')


  useEffect(()=> {
    if(props.loggedUser){
      setLiked(props.loggedUser.response.id)
    }
  },[props.loggedUser])

  const sendComment = (e) => {
    if(comment.trim().length >0){
      comments.push({userPic:props.loggedUser.response.pic, 
        userName: props.loggedUser.response.username, comment: comment, _id:props.loggedUser.response.id})
      props.addComment(comment, props.loggedUser.response.token, _id)
      setComment('')
    }
  }

  const keyPress=(e)=>{
    e.key==='Enter' && sendComment()
  }

  const addLike =async ()=> {
   props.like(_id, props.loggedUser.response.token)
  }
  const dislike =()=> {
     props.dislike(_id, props.loggedUser.response.token)
  }

  return (
  <div className="itinerary" style={{backgroundImage: 'url("../assets/simpleshiny.svg")'}}>
    <h3 style={{marginTop: '2vh'}}>{title}</h3>
    <div className="itineraryContent">
      <div className="userImg" style={{backgroundImage: `url(${userPic})`}}></div>
      <h5>{userName}</h5>
    </div>

    <div className="itineraryInfo">
      <p className="likes">
      {likes.includes(liked) 
      ?<FontAwesomeIcon onClick={props.loggedUser && dislike} style={{color: 'rgba(202, 0, 0)', marginRight: '5px'}} icon={faHeart}/> 
      :<FontAwesomeIcon onClick={props.loggedUser ? addLike : ()=>toast((t)=> (
        <div style={{display: 'flex', alignItems: 'center'}}><span style={{marginRight: '1vw'}}>You must be logged <br/> to send a comment!</span>
        <FontAwesomeIcon style={{color: 'red', fontSize: '2rem', cursor: 'pointer'}} icon={faTimesCircle} onClick={() => toast.dismiss(t.id)} /></div>))}
      style={{color:  'rgba(202, 0, 0)', marginRight: '5px'}} icon={heartIconDefinition}/>}{likes.length}</p>
      <p style={{marginLeft: '1vw'}}><FontAwesomeIcon icon={faClock} /> {hours} hours</p>
      {/* Metodo Array me permite crear un array de x cantidad de posiciones(indicadas en el param) que no tienen valor pero nos permite mapear por esa cierta cantidad de posiciones */}
      <p style={{marginLeft: '1vw'}}>Price:{[...Array(price)].map((m, i) => {
        return (<FontAwesomeIcon key={i} style={{marginLeft: '10px', color: 'lightgreen'}} icon={faMoneyBillAlt} />)})} </p>
    </div>
    {hashtag.map(hasthag => { return <p key={hasthag}>{hasthag}</p>})}
    {visible && (
      <div className="btnContent">
      <h4>Activities!</h4> 
      <div className="activities">
        {activities.map(activity => {
          return <Activity key={activity.title} activity={activity}/>
        })}
      </div>
      <h4>Leave a comment!</h4>
      <div className="comments">
      {comments.map(comment => {
        return <Comment key={comment._id} comment={comment} id={_id} cityId={props.id}/>})}
      <div className="inputDiv">
        {/* <FontAwesomeIcon className="enter" icon={faPaperPlane} id={_id} onClick={props.loggedUser ? sendComment :()=>toast.error('You must be logged to send a comment')}/> */}
        <FontAwesomeIcon className="enter" icon={faPaperPlane} id={_id} onClick={props.loggedUser ? sendComment :()=>toast((t)=> (
          <div style={{display: 'flex', alignItems: 'center'}}><span style={{marginRight: '1vw'}}>You must be logged <br/> to send a comment!</span>
          <FontAwesomeIcon style={{color: 'red', fontSize: '2rem', cursor: 'pointer'}} icon={faTimesCircle} onClick={() => toast.dismiss(t.id)} /></div>))}/>
        <input type="text" id="inputComment" onKeyPress={keyPress} placeholder={!props.loggedUser ? "You need to be logged to comment!" : "Leave your comment"} 
        value={comment}disabled={!props.loggedUser && true} autoComplete="off" onChange={(e)=>setComment(e.target.value)}/>
      </div>
      </div>
    </div>
    )}
    <button className="btnItinerary"onClick={()=> setVisible(!visible)} >{!visible ? 'View All' : 'View Less'}</button>
  </div>
  )
}

const mapStateToProps = state => {
  return {
    loggedUser: state.userR.userLogged,
    itineraries: state.itinerariesR.itineraries
  }
}


const mapDispatchToProps = {
  addComment: itinerariesActions.addComment,
  getItineraries: itinerariesActions.getItineraries,
  like: itinerariesActions.like,
  dislike: itinerariesActions.dislike
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)