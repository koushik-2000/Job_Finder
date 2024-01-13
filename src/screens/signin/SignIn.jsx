import React, { useEffect, useRef, useState } from 'react';
import "./signin.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/useData';

const SignIn = () => {
    const navigate = useNavigate()
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [error, setError] = useState(null)
    const { updateData } = useData()
    const api_url = process.env.REACT_APP_API_URL

    useEffect(() => {
        if (localStorage.getItem('JOB-APP-DATA') && localStorage.getItem('JOB-APP-DATA') !== "undefined") {
            navigate('/home')
        }
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setError(null)
            console.log('jello')
            clearInterval(interval);
        }, 2000)
        return () => {
            clearInterval(interval)
        }
    }, [error])


    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${api_url}/user/loginUser`, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                })
            }).then((response) => response.json())
            if (response.status === 'retry') {
                setError(response.message)
            }
            else {
                updateData(response.data)
                if (!localStorage.getItem('JOB-APP-DATA') && response.data !== "undefined") {
                    localStorage.setItem('JOB-APP-DATA', JSON.stringify(response.data))
                }
                navigate('/home')
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
                    <h1 className='header'>Already have an account?</h1>
                    <p className='desc'>Your personal job finder is here</p>
                    <input ref={emailRef} type='email' placeholder='Email' required className='inputBox' />
                    <input ref={passwordRef} minLength={8} type='password' placeholder='Password' required className='inputBox' />
                    <button type='submit' className='signin_btn'>Sign in</button>
                    <p className='link_txt'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                </form>
            </div>
            <div className='right_section'></div>
            <div className='error'
                style={{ bottom: error ? 10 : -200 }}
            >
                {error}
            </div>
        </div>
    )
}

export default SignIn