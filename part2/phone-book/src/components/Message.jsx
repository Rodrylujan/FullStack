/* eslint-disable react/prop-types */
import "../styles/Message.css" 

export const Message = ({ bodyMessage }) => {
    if(bodyMessage===null){
        return null
    }
  return (
    <div className={bodyMessage.type}>added {bodyMessage.message}</div>
  )
}
