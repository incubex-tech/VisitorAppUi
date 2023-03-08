import { useState, useCallback, useEffect, useRef } from 'react'
import Modal from 'react-modal'
import logo from '../../whitelogo1.png'
import Camera from '../Cam/Camera'
// require('dotenv').config()

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '9999',
  },
}

function CheckIn() {
  const [visitorfName, setVisitorfName] = useState('')
  const [visitorlName, setVisitorlName] = useState('')
  const [address, setAddress] = useState('')
  const [phNo, setPhNo] = useState('')
  const [toCallOnWhom, setToCallOnWhom] = useState('')
  const [purpose, setPurpose] = useState('')
  const [otp, setOtp] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [wrongOtpMessage, setWrongOtpMessage] = useState('')
  const [error, setError] = useState('')
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [imgDisplay, setimgDisplay] = useState('none')

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

  const takePhoto = (event) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const video = videoRef.current;
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setPhoto(dataUrl);
    setimgDisplay('block')
  };
  const clearPhoto = () => {
    setPhoto(null)
    reset()
  }

  useEffect(() => {
    let ignore = false;

    if (!ignore) startCamera()
    return () => { ignore = true; }
  }, []);

  const handleShowMessage = () => {
    setMessage('Thank You!!')
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  function openModal() {
    setOtp('')
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  function formValidation() {
    if (visitorfName !== '' & visitorlName !== '' & address !== '' & phNo !== '' & toCallOnWhom !== '' & purpose !== '' && photo !== null) {
      // getOtp()
      openModal()
    }
    else handleShowErrorMessage()

  }

  const handleShowErrorMessage = () => {
    setError('Please Fill All The Fields!!!!')
    setTimeout(() => {
      setError('')
    }, 2000)
  }

  // const getOtp = useCallback((event) => {
  //   // event.preventDefault()
  //   //generateOtp
  //   const url = `http://127.0.0.1:8081/api/auth/generateOtp?phNo=+917892217829`
  //   fetch(url)
  //     .then((response) => {
  //       response.json()
  //     })
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error)
  //     })
  //   openModal()
  // }, [])

  function AddVisitor(e) {
    const formData = new FormData()
    formData.append('visitorfName', visitorfName)
    formData.append('visitorlName', visitorlName)
    formData.append('address', address)
    formData.append('phNo', phNo)
    formData.append('toCallOnWhom', toCallOnWhom)
    formData.append('purpose', purpose)
    formData.append('photo', photo)
    console.log(visitorfName, visitorlName, address, phNo, toCallOnWhom, purpose, photo)
    const options = {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ visitorfName: visitorfName, visitorlName: visitorlName, address: address, phNo: phNo, toCallOnWhom: toCallOnWhom, purpose: purpose, photo: photo }),
    }
    fetch('http://127.0.0.1:8081/api/auth/addVisitor', options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setModalIsOpen(false)
        setOtp('')
        setVisitorfName('')
        setVisitorlName('')
        setAddress('')
        setPhNo('')
        setPurpose('')
        setPhoto(null)
        setToCallOnWhom('')
        handleShowMessage()
        //hadle response
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const reset = () => {
    setPhoto(null)
    setVisitorfName('')
    setVisitorlName('')
    setAddress('')
    setPhNo('')
    setPurpose('')
    setToCallOnWhom('')
    closeModal()
  }
  //verifyOtp
  // const url = `http://127.0.0.1:8081/api/auth/verifyOtp?otp=${otp}&phNo=+917892217829`
  // fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data)

  //     // if resopnse === approved call post http://127.0.0.1:8081/api/auth/addVisitor

  //     if (data.message === 'OK') {
  //       const formData = new FormData()
  //       formData.append('visitorfName', visitorfName)
  //       formData.append('visitorlName', visitorlName)
  //       formData.append('address', address)
  //       formData.append('phNo', phNo)
  //       formData.append('toCallOnWhom', toCallOnWhom)
  //       formData.append('purpose', purpose)
  //       formData.append('photo', photo)
  //       console.log(visitorfName, visitorlName, address, phNo, toCallOnWhom, purpose, photo)
  //       const options = {
  //         method: 'POST',
  //         headers: {
  //           // 'Content-Type': 'multipart/form-data',
  //           'Content-Type': 'application/json',
  //           'x-access-token': localStorage.getItem('token')
  //         },
  //         body: JSON.stringify({ visitorfName: visitorfName, visitorlName: visitorlName, address: address, phNo: phNo, toCallOnWhom: toCallOnWhom, purpose: purpose, photo: photo }),
  //       }
  //       fetch('http://127.0.0.1:8081/api/auth/addVisitor', options)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log(data)
  //           setModalIsOpen(false)
  //           setOtp('')
  //           setVisitorfName('')
  //           setVisitorlName('')
  //           setAddress('')
  //           setPhNo('')
  //           setPurpose('')
  //           // setPhoto(undefined)
  //           setToCallOnWhom('')
  //           handleShowMessage()
  //           //hadle response
  //         })
  //         .catch((error) => {
  //           console.error('Error:', error)
  //         })
  //     } else {
  //       setWrongOtpMessage('Please enter the correct OTP')
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error)
  //   })
  // }

  // function ResendOtp() {
  //   //generateOtp
  //   setOtp('')
  //   const url = `http://127.0.0.1:8081/api/auth/generateOtp?phNo=${phNo}`
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error)
  //     })
  // }

  return (
    <>
      <div className="d-flex justify-content-center">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="container d-flex justify-content-center ">
        <div className=" row form-control  border-green ">
          <div className="t-color fs-5 d-flex justify-content-center">
            <p>Please CheckIn</p>
          </div>
          <center>
            {/* <form action=""> */}
            <div className="m-2 form-group">
              <input
                className=" col-sm-8 border border-success rounded"
                type="text"
                id="visitorfName"
                value={visitorfName}
                placeholder='First Name'
                required
                autoComplete="off"
                onChange={(event) => setVisitorfName(event.target.value)}
              />
            </div>
            <div className="m-2 form-group">
              <input
                className=" col-sm-8 border border-success rounded"
                type="text"
                id="visitorlName"
                value={visitorlName}
                placeholder='Last Name'
                required
                autoComplete="off"
                onChange={(event) => setVisitorlName(event.target.value)}
              />
            </div>
            <div className="m-2 form-group">
              <input
                className=" col-sm-8 border border-success rounded"
                type="text"
                id="address"
                value={address}
                placeholder='Address'
                autoComplete="off"
                required
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="m-2 form-group">
              <input
                className=" col-sm-8 border border-success rounded"
                type="text"
                id="phNo"
                placeholder="10 digit phone number"
                pattern="[0-9]{10}"
                maxLength="10"
                autoComplete="off"
                value={phNo}
                required
                onChange={(event) => setPhNo(event.target.value)}
              />
            </div>
            <div className="m-2 form-group">
              <input
                className=" col-sm-8 border border-success rounded"
                type="text"
                id="toCallOnWhom"
                autoComplete="off"
                value={toCallOnWhom}
                placeholder='To Call On Whom / Dept.'
                required
                onChange={(event) => setToCallOnWhom(event.target.value)}
              />
            </div>
            <div className="m-2 form-group">
              <input
                className=" col-sm-8 border border-success rounded"
                type="text"
                id="purpose"
                autoComplete="off"
                placeholder='Purpose'
                value={purpose}
                required
                onChange={(event) => setPurpose(event.target.value)}
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="m-2 form-group">
              <button className='col-sm-5 m-1 p-1 border border-success rounded' onClick={takePhoto} >Take Photo</button>
              <button className='col-sm-2 p-1  border border-success rounded fit' onClick={clearPhoto} >Clear</button>
              {errorMsg && <p>{errorMsg.message}</p>}

              <video ref={videoRef} style={{ display: 'none' }} autoPlay={true} playsInline={true}
              ></video>
              <div className=' col-sm-8 m-2 p-2 '>
                <canvas ref={canvasRef} style={{ display: 'none', width: '180px', height: '160px' }}></canvas>
                {photo && <img src={photo} alt='img' />}
              </div>
            </div>
            <div className=" form-group d-flex justify-content-center ">
              <button type='submit' className=" btn btn-success p-2 " onClick={formValidation}>
                Submit
              </button>

            </div>
            {/* </form> */}
          </center>

          <div className="d-flex justify-content-center t-color bg-secondary fs-1 m-2">
            {message}
          </div>
        </div>
        <Modal
          className="bg-secondary card  border-green "
          id="root"
          isOpen={modalIsOpen}
          style={customStyles}
        >
          <div className=" row ">
            <div className='col-sm-4'>
              <label htmlFor="fname">Firt Name:</label> <p id='fname'>{visitorfName}</p>
            </div>
            <div className='col-sm-4'>
              <label htmlFor="lname">Last Name:</label>
              <p id='lname'>{visitorlName}</p>
            </div>
            <div className='row'>
              <div className='col-sm-4'>
                <label htmlFor="fname">Address:</label>
                <p>{address}</p>
              </div>
              <div className='col-sm-4'>
                <label htmlFor="fname">Phone No:</label>
                <p>{phNo}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-4  '>
                <label htmlFor="fname">To Call On Whom:</label>
                <p>{toCallOnWhom}</p>
              </div>
              <div className='col-sm-4'>
                <label htmlFor="fname">Purpose:</label>
                <p>{purpose}</p>
              </div>
            </div>
            <div className='col-sm-9'>
              {photo && <img src={photo} alt='img' />}
            </div>
            <button
              type="submit"
              className=" btn  btn-success m-3 p-1"
              onClick={AddVisitor}
            >
              Check In
            </button>
            <button
              type="submit"
              className=" btn  btn-success m-3 p-1"
              onClick={reset}
            >
              Cancel
            </button>

            {/* <div className="col-sm-8">
              <div className="t-color fs-5">
                <p>Please enter the OTP sent to {phNo}</p>
              </div>
              <input
                className=" col-sm-3 border border-success rounded"
                type="tel"
                id="otp"
                pattern="[0-9]{4}"
                maxLength="4"
                autoComplete="off"
                required
                value={otp}
                onChange={(event) => {
                  setOtp(event.target.value)
                  setWrongOtpMessage('')
                }}
              />
            </div>
            <div className="d-flex justify-content-center redColor bg-secondary">
              {wrongOtpMessage}
            </div>
            <div className="col-sm-5">
              <button className="astext" onClick={ResendOtp}>
                Resend OTP
              </button>
            </div>
            <div className="">
              <button className=" btn  btn-success p-1" onClick={closeModal}>
                Back
              </button>
              <button
                type="submit"
                className=" btn  btn-success m-3 p-1"
                onClick={AddVisitor}
              >
                Check In
              </button>
            </div> */}

          </div>
        </Modal>
      </div>
    </>
  )
}
export default CheckIn
