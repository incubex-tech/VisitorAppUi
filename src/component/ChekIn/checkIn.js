import { useState, useCallback } from 'react'
import Modal from 'react-modal'
import logo from '../../whitelogo1.png'
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
  const [visitorName, setVisitorName] = useState('')
  const [address, setAddress] = useState('')
  const [phNo, setPhNo] = useState('')
  const [toCallOnWhom, setToCallOnWhom] = useState('')
  const [purpose, setPurpose] = useState('')
  const [otp, setOtp] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [wrongOtpMessage, setWrongOtpMessage] = useState('')
  // const [photo, setPhoto] = useState(undefined)
  const [error, setError] = useState('')

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
    if (visitorName !== '' & address !== '' & phNo !== '' & toCallOnWhom !== '' & purpose !== '') {
      getOtp()
    }
    else handleShowErrorMessage()

  }

  const handleShowErrorMessage = () => {
    setError('Please Fill All The Fields!!!!')
    setTimeout(() => {
      setError('')
    }, 2000)
  }

  const getOtp = useCallback((event) => {
    // event.preventDefault()
    //generateOtp
    const url = `http://127.0.0.1:8081/api/auth/generateOtp?phNo=+917892217829`
    fetch(url)
      .then((response) => {
        response.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    openModal()
  }, [])

  function AddVisitor(e) {
    //verifyOtp
    const url = `http://127.0.0.1:8081/api/auth/verifyOtp?otp=${otp}&phNo=+917892217829`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        // if resopnse === approved call post http://127.0.0.1:8081/api/auth/addVisitor

        if (data.message === 'OK') {
          const formData = new FormData()
          formData.append('visitorName', visitorName)
          formData.append('address', address)
          formData.append('phNo', phNo)
          formData.append('toCallOnWhom', toCallOnWhom)
          formData.append('purpose', purpose)
          // formData.append('photo', photo)
          console.log(visitorName, address, phNo, toCallOnWhom, purpose)
          const options = {
            method: 'POST',
            headers: {
              // 'Content-Type': 'multipart/form-data',
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ visitorName: visitorName, address: address, phNo: phNo, toCallOnWhom: toCallOnWhom, purpose: purpose }),
          }
          fetch('http://127.0.0.1:8081/api/auth/addVisitor', options)
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              setModalIsOpen(false)
              setOtp('')
              setVisitorName('')
              setAddress('')
              setPhNo('')
              setPurpose('')
              // setPhoto(undefined)
              setToCallOnWhom('')
              handleShowMessage()
              //hadle response
            })
            .catch((error) => {
              console.error('Error:', error)
            })
        } else {
          setWrongOtpMessage('Please enter the correct OTP')
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  function ResendOtp() {
    //generateOtp
    setOtp('')
    const url = `http://127.0.0.1:8081/api/auth/generateOtp?phNo=${phNo}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <div className="d-flex justify-content-center p-1">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="container d-flex justify-content-center ">
        <div className=" row form-control  border-green ">
          <div className="t-color fs-1 d-flex justify-content-center">
            <p>Please CheckIn</p>
          </div>
          <center>
            <form action="">
              <div className="m-4 form-group">
                <input
                  className=" col-sm-8 border border-success rounded"
                  type="text"
                  id="visitorName"
                  value={visitorName}
                  placeholder='Name'
                  required
                  autoComplete="off"
                  onChange={(event) => setVisitorName(event.target.value)}
                />
              </div>
              <div className="m-4 form-group">
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
              <div className="m-4 form-group">
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
              <div className="m-4 form-group">
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
              <div className="m-4 form-group">

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
            </form>
          </center>

          {/* <div className="m-4 form-group">
              <label className="col-sm-2" htmlFor="photo">
                photo
              </label>
              <input
                className=" col-sm-5 border border-success rounded"
                type="file"
                id="photo"
                autoComplete="off"
                name="photo"
                // value={photo}
                required
                onChange={(event) => setPhoto(event.target.files[0])}
              />
            </div> */}

          <div className=" form-group d-flex justify-content-center ">
            <button className=" btn btn-success p-2 " onClick={formValidation}>
              Send OTP
            </button>
          </div>
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
            <div className="col-sm-8">
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
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
export default CheckIn
