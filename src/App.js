import './style.css'
import React, {  useState, useEffect } from 'react';
import AgoraRTM, { RtmClient } from 'agora-rtm-sdk'
let options = {
	uid: '',
	token: ''
};  
const appID = '3c5af93861df4e259d770cc1f56787b5';
options.token =
	"0063c5af93861df4e259d770cc1f56787b5IAC2oeaNoVFcYKXerksBuXNChZHwUf385GWpDBOs7kt8PKPg45sAAAAAEACWiMFpfasdYgEA6AMNaBxi"
;
const client = AgoraRTM.createInstance(appID, );
  let channel = client.createChannel('demoChannel');

const App = props => {    
  const [userID, setUserID ] = useState('1234')  

    client.on('MessageFromPeer', function(message, peerId) {
              const log = document.getElementById('log') 
              const reciever = document.createElement('li');
              reciever.classList.add('reciever') 
              log.appendChild(reciever).append(message.text)
    });
// Display connection state changes
client.on('ConnectionStateChanged', function(state, reason) {
console.log('State changed To: ' + state + ' Reason: ' + reason)
}); 
 
 
// channel.on('ChannelMessage', (message, memberId)=> { 
//   const log = document.getElementById('log') 
//   const reciever = document.createElement('li');
//   reciever.classList.add('reciever') 
//   log.appendChild(reciever).append(message.text)

// });

channel.on('MemberJoined', (memberId)=> {
  console.log(`${memberId} Joined the channel`)
});


channel.on('MemberLeft', (memberId)=> {
   console.log(`${memberId} left the channel`)


});  
 
  
 


// Button behavior
useEffect(()=> 
    {
       async function login() {
        options.uid = userID
        await  client.login(options);
          join()
      }; 
      login()


        async function join() {
        await channel.join().then(() => {
        console.log('You have successfully joined channel ' + channel.channelId)
        });
      };  
       
   
         	// send peer-to-peer message
        document.getElementById('send_peer_message').onclick = async function() {
          let peerMessage = document.getElementById('peerMessage').value.toString();
        let peerId= '12345678';
          await client.sendMessageToPeer({ text: peerMessage },peerId ,{ enableHistoricalMessaging: true, enableOfflineMessaging: true}).then(sendResult => {
            if (sendResult.hasPeerReceived) { 
                    const log = document.getElementById('log') 
                    const sender = document.createElement('li');
                    sender.classList.add('sender') 
                    log.appendChild(sender).append(peerMessage)
            } else {
                    const log = document.getElementById('log') 
                    const sender = document.createElement('li');
                    sender.classList.add('sender') 
                    log.appendChild(sender).append(peerMessage)
            }
          });
        };
  
       
       
    
      // document.getElementById('send_channel_message').onclick = async function() {
      //   let channelMessage = document.getElementById('channelMessage').value.toString();

      //   if (channel != null) {
      //     await channel.sendMessage({ text: channelMessage}).then(() => {
      //         const log = document.getElementById('log') 
      //         const sender = document.createElement('li');
      //         sender.classList.add('sender') 
      //         log.appendChild(sender).append(channelMessage)
      //     });
      //   }
      // };
    }, []

) 
 
return (
 <>  
  <div className='chat'>
    <div className='chat_header'>
      <p className='heading'> <i className="fa-solid fa-comment-medical status"></i>Demo Patient</p>
    </div>
      <div className='messages' id="log"></div>
  <div className="input-field">
    <input className='sendMessage' type="text" placeholder="send message" id="peerMessage"></input>
    <button className='send_button' type="button" id="send_peer_message"><i className="fa-solid fa-paper-plane send_icon"></i></button>
  </div>
  </div>
 
 </>   

    
  )
};

export default App;
