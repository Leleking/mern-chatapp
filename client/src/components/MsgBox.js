import React from 'react'

export default function MsgBox({msg, user_id}) {
    console.log(msg)
    const { sender_id } = msg
    return (
        <>
            {
                (sender_id != user_id)
                ?
                (
                <div className="incoming_msg" style={{paddingTop: 30}}>
                    {/* <div className="incoming_msg_img">
                        SN
                    </div> */}
                    <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{msg.message}</p>
                        {/* <span className="time_date"> 11:01 AM | June 9</span> */}
                    </div>
                </div>
            </div>
                )
                :
                (
                    <div className="outgoing_msg">
                        <div className="sent_msg">
                            <p>{msg.message}</p>
                           {/*  <span className="time_date"> 11:01 AM | June 9</span>{" "} */}
                        </div>
                    </div>
                )
            }
            
           
        </>
    )
}
