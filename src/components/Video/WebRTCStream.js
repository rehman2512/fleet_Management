import { useEffect, useRef } from "react";

const WebRTCStream = () => {
    const videoRef = useRef(null);
    const peerRef = useRef(null); 

    useEffect(() => {
        peerRef.current = new RTCPeerConnection();

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                stream.getTracks().forEach(track => {
                    peerRef.current.addTrack(track, stream);
                });
            })
            .catch(error => console.error("Error accessing webcam: ", error));

        const ws = new WebSocket("ws://localhost:8080");
        

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.sdp) {
                peerRef.current.setRemoteDescription(new RTCSessionDescription(message.sdp))
                    .then(() => {
                        if (message.sdp.type === "offer") {
                            return peerRef.current.createAnswer();
                        }
                    })
                    .then(answer => {
                        if (answer) {
                            return peerRef.current.setLocalDescription(answer);
                        }
                    })
                    .then(() => {
                        if (peerRef.current.localDescription) {
                            ws.send(JSON.stringify({ sdp: peerRef.current.localDescription }));
                        }
                    })
                    .catch(error => console.error("Error setting remote description: ", error));
            } else if (message.candidate) {
                peerRef.current.addIceCandidate(new RTCIceCandidate(message.candidate))
                    .catch(error => console.error("Error adding ICE candidate: ", error));
            }
        };

        peerRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                ws.send(JSON.stringify({ candidate: event.candidate }));
            }
        };

        return () => {
            if (peerRef.current) {
                peerRef.current.close();
            }
            if (ws) {
                ws.close(); 
            }
        };
    }, []);

    const handleFullscreen = () => {
        if (videoRef.current) {
          if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
          } else if (videoRef.current.mozRequestFullScreen) { // Firefox
            videoRef.current.mozRequestFullScreen();
          } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            videoRef.current.webkitRequestFullscreen();
          } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
            videoRef.current.msRequestFullscreen();
          }
        }
      }; 

    return (
        <div>
            <video aria-valuenow={50} ref={videoRef}  autoPlay playsInline style={{ width: "150px", border: "2px solid black" }}  onClick={handleFullscreen} />
        </div>
    );
};

export default WebRTCStream;