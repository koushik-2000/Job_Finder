import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const urlRef = useRef(null)
    const passwordRef = useRef(null)
    const [error, setError] = useState(null)
    const api_url = process.env.REACT_APP_API_URL

    useEffect(() => {
        if (localStorage.getItem('JOB-APP-DATA')) {
            navigate('/home')
        }
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setError(null)
        }, 2000)
        return () => {
            clearInterval(interval)
        }
    }, [error])


    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${api_url}/user/newUser`, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    profileUrl: urlRef.current.value,
                    password: passwordRef.current.value
                })
            }).then((response) => response.json())
            if (response.status === 'retry') {
                setError(response.message)
            }
            else {
                navigate('/')
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='container'>
            <div className='left_section'>
                <form className='inner_container' onSubmit={(e) => login(e)}>
                    <h1 className='header'>Create an account</h1>
                    <p className='desc'>Your personal job finder is here</p>
                    <input ref={nameRef} type='text' placeholder='Name' required className='inputBox' />
                    <input ref={emailRef} type='email' placeholder='Email' required className='inputBox' />
                    <input ref={urlRef} type='text' placeholder='Profile Url' required className='inputBox' />
                    <input ref={passwordRef} minLength={8} type='password' placeholder='Password' required className='inputBox' />
                    <button type='submit' className='signin_btn'>Create Account</button>
                    <p className='link_txt'>Already have an account? <Link to='/'>Sign In</Link></p>
                </form>
            </div>
            <div className='right_section'></div>
            <div className='error' style={{ bottom: error ? 10 : -200 }}>
                {error}
            </div>
        </div>
    )
}

export default SignUp
