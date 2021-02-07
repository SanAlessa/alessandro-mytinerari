// Componente de los itinerarios que es llamado por el componente City. Cada itinerario creado de manera dinamica con sus propiedades.

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoneyBillAlt, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import {
  IconLookup,
  IconDefinition,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
import './FonAwesomIcons'
import { useState } from "react"
import Activity from './Activity'
import Comment from './Comment'
import { connect } from "react-redux"
import commentActions from "../redux/actions/commentActions"
import itinerariesActions from "../redux/actions/itinerariesActions"
import likeActions from "../redux/actions/likeActions"


const heartLookup: IconLookup = { prefix: 'far', iconName: 'heart' }
const heartIconDefinition: IconDefinition = findIconDefinition(heartLookup)

const Itinerary = (props) => {
  const [visible, setVisible] = useState(false)
  const { title, userPic, userName, hours, likes, price, hashtag, activities, comments, _id } = props.itinerary
  const [comment, setComment] = useState('')
  const [like, setLike] = useState(false)

  const sendComment = async (e) => {
    await props.addComment(comment, localStorage.getItem('token'), _id)
    props.getItineraries(props.id)
    document.getElementById('inputComment').value=''
  }

  const likeFunction =async()=> {
    setLike(!like)
    !like ? await props.like(_id, localStorage.getItem('token')) : await props.dislike(_id, localStorage.getItem('token'))
    props.getItineraries(props.id)
  }

  return (
  <div className="itinerary" style={{backgroundImage: 'url("../assets/simpleshiny.svg")'}}>
    <h3 style={{marginTop: '2vh'}}>{title}</h3>
    <div className="itineraryContent">
      <div className="userImg" style={{backgroundImage: `url(${userPic})`}}></div>
      <h5>{userName}</h5>
    </div>
    <div className="itineraryInfo">
      <button style={{marginRight: '1vw'}} onClick={likeFunction}>{like ? 'Dislike' : 'Like'}</button>
      <p className="likes">Likes: {likes.length ===0 
      ? <FontAwesomeIcon style={{color:  'rgba(202, 0, 0)'}} icon={heartIconDefinition}/> 
      : <FontAwesomeIcon style={{color: 'rgba(202, 0, 0)'}} icon={faHeart}/> } {likes.length}</p>
      <p style={{marginLeft: '1vw'}}>Duration: {hours} hours</p>
      {/* Metodo Array me permite crear un array de x cantidad de posiciones(indicadas en el param) que no tienen valor pero nos permite mapear por esa cierta cantidad de posiciones */}
      <p style={{marginLeft: '1vw'}}>Price:{[...Array(price)].map((m, i) => {
        return (<FontAwesomeIcon key={i} style={{marginLeft: '10px', color: 'green'}} icon={faMoneyBillAlt} />)})} </p>
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
      {comments.map(comments => {
        return <Comment key={comments.comment} comments={comments} id={_id} cityId={props.id}/>})}
      <div className="inputDiv">
        <FontAwesomeIcon className="enter" icon={faPaperPlane} id={_id} onClick={sendComment}/>
        <input type="text" id="inputComment" placeholder="You need to be logged to comment!" onChange={(e)=>setComment(e.target.value)}/>
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
    commentAdded: state.commentR.comment
  }
}


const mapDispatchToProps = {
  addComment: commentActions.addComment,
  getItineraries: itinerariesActions.getItineraries,
  like: likeActions.like,
  dislike: likeActions.dislike
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)