
let APP_ID = 
let token = null;
let uid = String(Math.floor(Math.random() * 100000));


let client;
let channel;
let audioStream;
let querryString = window.location.search
let urlParams = new URLSearchParams(querryString)
let roomId = urlParams.get('room')
let participantCount=1;





if(!roomId){
  window.location = "index.html"
}

let remoteName;
let localStream; // have local camera video and audio streams
let remoteStream; // have remote camera video and audio streams
let peerConnection; //store info btwn peers to conect 
let videoStream;


var server = {
  iceServers: [
      {
        urls: "stun:a.relay.metered.ca:80",
      },
      {
        urls: "turn:a.relay.metered.ca:80",
        username: "da00f07e0ec774c2883b5fb2",
        credential: "NHSgAgnGl/dU85Md",
      },
      {
        urls: "turn:a.relay.metered.ca:80?transport=tcp",
        username: "da00f07e0ec774c2883b5fb2",
        credential: "NHSgAgnGl/dU85Md",
      },
      {
        urls: "turn:a.relay.metered.ca:443",
        username: "da00f07e0ec774c2883b5fb2",
        credential: "NHSgAgnGl/dU85Md",
      },
      {
        urls: "turn:a.relay.metered.ca:443?transport=tcp",
        username: "da00f07e0ec774c2883b5fb2",
        credential: "NHSgAgnGl/dU85Md",
      },
  ],
};


let Name;
let QuerryString = window.location.search
let UrlParams = new URLSearchParams(QuerryString)
// Name = (UrlParams.get('input-name'))
// console.log(Name);


// This "init" function start everything
let init = async () => {
  client = await AgoraRTM.createInstance(APP_ID);
  await client.login({ uid, token });
  
  channel = client.createChannel(roomId);
  await channel.join();
  console.log(roomId);
  document.getElementById("RoomId").textContent = 'Room id : ' + roomId;
  console.log('Number of participant',participantCount);
  channel.on('MemberJoined', handleUserJoined);
  channel.on('MemberLeft', handleUserLeft);
  
  client.on('MessageFromPeer', handleMessageFromPeer);

  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });

const videoTracks = localStream.getVideoTracks();
if (videoTracks.length > 0) {
  const videoTrack = videoTracks[0];
  videoStream = new MediaStream([videoTrack]);
  // You now have the video stream and can use it as needed
  console.log(videoStream);
} else {
  console.log('No video tracks found in the local stream.');
}
document.getElementById('user-1').srcObject = videoStream

};

let handleUserLeft = async (MemberId) => {
  participantCount--;
  if(participantCount === 1){
    document.getElementById('user-2').style.display = "none";
    document.getElementById('user-1').classList.remove("smallFrame");
    // document.getElementById("RemoteName").style.display = "none";
    // removeRemoteDetails();
    // document.getElementById("RemoteName").style.display = "none"; 
  }
  console.log('Member just left');
  console.log('Number of participant',participantCount);
}

let handleMessageFromPeer = async (message, MemberId) => {
  message = JSON.parse(message.text)
  console.log('Message :', message);
   
  if(message.type === 'offer'){
    createAnswer(MemberId, message.offer)
  }
  if(message.type === 'answer'){
    addAnswer(message.answer)
  }  
  if(message.type === 'candidate'){
   if(peerConnection){
    peerConnection.addIceCandidate(message.candidate);
   }
  }
  // Check if the message is the participant count
  if (!isNaN(parseInt(message))) {
    participantCount = parseInt(message);
    console.log('Received participant count:', participantCount);
    if(participantCount>2)
    {
      alert("This room is full you can Create and Join Another room");
      window.location ="index.html"
    }
  }
 
  // if (message.type === 'name') {
  
  //   JSON.stringify(message, (key, value) => {
  //     if (key === 'type') {
  //       return undefined; // Exclude the 'type' property from the JSON string
  //     }
  //     remoteName = value.name;
  //   });
    

  //   console.log('RemoteName:', remoteName );
    
  // }
}

// let handleUserJoined = async (MemberId) => { 
  
//   user.textContent="user-2 has joined";
//   console.log("A New Member has joined", MemberId);
//   createOffer(MemberId);
// };
let handleUserJoined = async (MemberId) => {
  participantCount++;
  // addRemoteDetails();
  sendParticipantCount(MemberId);
  if (participantCount >2) {
    // addRemoteDetails();
    console.log('Number of participant',participantCount);
    console.log('Room is full. Cannot accept new participants.');
    return;
  }
  
  
  // addRemoteDetails();
  console.log('Number of participant',participantCount);
  console.log("A new member has joined", MemberId);
  createOffer(MemberId);
  // document.getElementById("RemoteName").style.display = "flex";
};

let sendParticipantCount = async (MemberId) => {
  try {
    await client.sendMessageToPeer({ text: participantCount.toString() }, MemberId);
    console.log('Participant count sent successfully');
  } catch (error) {
    console.log('Failed to send participant count:', error);
  }
};

// -----------send name-----------
// let sendName = async (MemberId) => {
//   try {
//     client.sendMessageToPeer({text:JSON.stringify({'type':'name','name': Name})},MemberId)
//     console.log('Name sent successfully',);
//   } catch (error) {
//     console.log('Failed to send name:', error);
//   }
// };


let createPeerConnection = async (MemberId) =>{
  peerConnection = new RTCPeerConnection(server);
  remoteStream = new MediaStream();
  console.log('remote :',remoteStream);
  // // sendName(MemberId);
  // addRemoteDetails();
  document.getElementById('user-2').srcObject = remoteStream;
  document.getElementById('user-2').style.display='inline';
  document.getElementById('user-1').classList.add("smallFrame");
  if (!localStream) {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    document.getElementById("user-1").srcObject = videoStream;
  }
  
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });
 
  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };
  let audioTrack = localStream.getTracks().find((track) => track.kind === "audio");
  console.log(audioTrack)
  console.log(audioTrack.enabled)

  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      client.sendMessageToPeer({text:JSON.stringify({'type':'candidate','candidate':event.candidate})},MemberId) 
    }
  }
  // sendName(MemberId);
}


let createOffer = async (MemberId) => {
  await createPeerConnection(MemberId)
  let offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  client.sendMessageToPeer({text:JSON.stringify({'type':'offer','offer':offer})},MemberId)

};

let createAnswer = async (MemberId, offer) => {
  await createPeerConnection(MemberId)
  await peerConnection.setRemoteDescription(offer)
  let answer = await peerConnection.createAnswer()
  await peerConnection.setLocalDescription(answer)
  client.sendMessageToPeer({text:JSON.stringify({'type':'answer','answer':answer})},MemberId)


}

let addAnswer = async (answer) => {
  if(!peerConnection.currentRemoteDescription){
      peerConnection.setRemoteDescription(answer)
  }
}
 
let leaveChannel = async () => {
  await channel.leave();
  await client.logout();
}

let toggleCamera = async () => {
  let videoTrack = localStream.getTracks().find((track) => track.kind === "video");
   console.log(videoTrack)
  if (videoTrack.enabled) {
    videoTrack.enabled = false;
    document.getElementById('user-1').srcObject = null
    document.getElementById("camera").src ="icons/mute-camera.png";
    document.getElementById("camera-btn").style.backgroundColor =
    "rgb(255, 80, 80)";
  } else {
    videoTrack.enabled = true;
    document.getElementById('user-1').srcObject = videoStream
    document.getElementById("camera").src ="icons/camera.png";
    document.getElementById("camera-btn").style.backgroundColor = "transparent";
  }
};

let toggleMic = async () => {
  let audioTrack = localStream.getTracks().find((track) => track.kind === "audio");
  console.log(audioTrack)
  console.log(audioTrack.enabled)
  if (audioTrack.enabled) {
    audioTrack.enabled = false;
  
    document.getElementById("mic").src ="icons/mute-mic.png";
    document.getElementById("mic-btn").style.backgroundColor ="rgb(255, 80, 80)";
    console.log(audioTrack.enabled)
    document.getElementById("mic-btn").style.boxShadow ="3px 3px 15px -1px rgba(0,0,0,0.77) ";
  } else {
    audioTrack.enabled = true;
    document.getElementById("mic").src ="icons/mic.png";
    document.getElementById("mic-btn").style.boxShadow ="";
    console.log(audioTrack.enabled)
    document.getElementById("mic-btn").style.backgroundColor =
      "transparent";
  }
};
document.getElementById("camera-btn").addEventListener("click", toggleCamera);
document.getElementById("mic-btn").addEventListener("click", toggleMic);

let addRemoteDetails = async() => {
 
  document.getElementById("RemoteName").textContent = 'Remote user:'+ remoteName;
}
let removeRemoteDetails = async() => {
 
  document.getElementById("RemoteName").textContent = "";
}

let videoFrames = document.getElementsByClassName('video-player')
videoFrames.forEach(Frame => {
  Frame.addEventListener('click', handleClick);
});
function handleClick(event) {
    if (videoFrames[0] === event.target) {
      videoFrames[1].classList.add("smallFrame");
      videoFrames[0].classList.remove("smallFrame");
    } else {
      videoFrames[0].classList.add("smallFrame");
      videoFrames[1].classList.remove("smallFrame");
    }
  
}

// --- copy room id------
document.getElementById("remote-details").addEventListener("click",() => {
navigator.clipboard.writeText(roomId).then(() => {
  console.log('Content copied to clipboard');
  /* Resolved - text copied to clipboard successfully */
  alert("Room Id copied successfully");
},() => {
  console.error('Failed to copy');
  /* Rejected - text failed to copy to the clipboard */
});
});

window.addEventListener('beforeunload', leaveChannel)

init();
