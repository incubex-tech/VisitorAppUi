import React, { useEffect, useState, useRef } from 'react';

function Camera() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [photo, setPhoto] = useState(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } catch (err) {
            setErrorMsg
                (err);
        }
    };

    const takePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPhoto(dataUrl);
    };

    useEffect(() => {
        let ignore = false;

        if (!ignore) startCamera()
        return () => { ignore = true; }
    }, []);

    return (
        <div>
            <button onClick={takePhoto}>Take Photo</button>
            {errorMsg && <p>{errorMsg.message}</p>}
            {/* {photo && <img src={photo} alt='img' />} */}
            <video ref={videoRef} style={{ display: 'none' }} autoPlay={true}
                playsInline={true}
            ></video>
            <div className='p-2' >
                <canvas ref={canvasRef} style={{ display: 'block', width: '180px', height: '170px' }}></canvas>
            </div>
        </div>
    );
}

export default Camera;
// import React, { useRef } from 'react';

// function Camera() {
//     const videoRef = useRef(null);

//     const handleStart = () => {
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then(stream => {
//                 videoRef.current.srcObject = stream;
//                 videoRef.current.play();
//             })
//             .catch(errorMsg => {
//                 console.log(errorMsg);
//             });
//     }

//     return (
//         <div>
//             <button onClick={handleStart}>Start Camera</button>
//             <video ref={videoRef} />
//         </div>
//     );
// }
// export default Camera;


