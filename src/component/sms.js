import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../whitelogo1.png'

function LoginForm() {
    if (localStorage.getItem('token') != null) {
        localStorage.removeItem('token')
    }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    let navigate = useNavigate()

    const routeChange = async () => {
        const url = `http://127.0.0.1:8081/api/auth/sendSms`
        fetch(url)
            .then((response) => response.json())
    }

    return (
        <>
            <div className=" d-flex justify-content-center">
                <img className="logo" src={logo} alt="" />
            </div>
            <div className=" d-flex justify-content-center ">
                <div className="row card">
                    <div className="col-sm-12">
                        <div className="col-sm-10 my-10 align-self-center ">
                            <div className="t-color fs-1">
                                <p>SignIn</p>
                            </div>
                            <label htmlFor="username">Username:</label>
                            <input
                                className="form-control border border-success rounded "
                                type="text"
                                id="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <br />
                            <label htmlFor="password ">Password:</label>
                            <input
                                className="form-control border border-success rounded"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <br />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <button className="btn btn-success p-2" onClick={routeChange}>
                                LOG IN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm
