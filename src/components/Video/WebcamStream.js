import { useEffect, useRef } from "react";

const WebcamStream = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(error => console.error("Error accessing webcam: ", error));

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                let tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline style={{ width: "100%", border: "2px solid black" }} />
        </div>
    );
};

export default WebcamStream;