import React, { useState, useEffect } from 'react'
import { blockUser, unblockUser } from '../services'

export default function ChatPerson({user, onClick, activeUserId, joinUser}) {
  const [blockedStatus, setBlockedStatus] = useState(false)

  useEffect(() => {
    var status = checkBlockedStatus()
    console.log("status: "+ status)
    setBlockedStatus(status)
  }, [])
  const getAuthUser = () => {
    var _user = JSON.parse(localStorage.getItem('user'));
    var temp = _user.user
    return temp
  }

  const checkBlockedStatus = () => {
    var _user = getAuthUser()
    var blocks = _user.blocks
    if(blocks.includes(user._id)) {
      return true
    } else {
      return false
    }
  }

  const updateAuthUser = (user_info) => {
    //console.log(user_info)
    var _user = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem("user", JSON.stringify({..._user, user: user_info }))
    joinUser({...user_info, room: 'all'})
    var status = checkBlockedStatus()
    setBlockedStatus(status)
  }
 
   
    const blockUserAsync = async () => {
      try {
        var auth = getAuthUser()
        var result = await blockUser({blocked_by: auth._id, blocked_id: user._id})
        updateAuthUser(result.data.user)
        //console.log(result.data.user)
        alert(`You have blocked ${user.name}`)
      } catch (error) {
        
      }
    }

    const unblockUserAsync = async () => {
      console.log("unblocking")
      try {
        var auth = getAuthUser()
        var result = await unblockUser({blocked_by: auth._id, blocked_id: user._id})
        updateAuthUser(result.data.user)
        //console.log(result.data.user)
        alert(`You have unblocked ${user.name}`)
      } catch (error) {
        
      }
    }
    
    
    return (
            <div className={`chat_list  ${activeUserId == user._id ? ' active_chat': ''}`}  >
                  <div className="chat_people">
                    {/* <div className="chat_img">
                        
                    </div> */}
                    <div className="chat_ib">
                      <h5>
                        {user.name || 'unknown'}
                      </h5>
                      <div className="row">
                        <div className="col-md-6">
                          Online
                        </div>
                        <div className="col-md-3">
                          <button onClick={() => onClick(user)} className="btn btn-sm btn-success">Chat</button>
                        </div>
                        <div className="col-md-3">
                          {
                            blockedStatus
                            ?
                            (
                              <button onClick={() => unblockUserAsync()} className="btn btn-sm btn-warning">Unblock</button>

                            )
                            :
                            (
                              <button onClick={() => blockUserAsync()} className="btn btn-sm btn-warning">Block</button>

                            )
                          }
                        </div>
                      </div>
                      <p>
                      </p>
                    </div>
                  </div>
                </div>
    )
}
