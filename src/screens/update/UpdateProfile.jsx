import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../../context/useData'

const UpdateProfile = () => {
    const navigate = useNavigate()
    const { data, updateData } = useData()
    const api_url = process.env.REACT_APP_API_URL
    const [user, setUser] = useState(data)

    const updateProfile = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${api_url}/user/updateUser/${user._id}`, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }).then((response) => response.json())
            if (response.status === "ok") {
                updateData(response.data)
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
                <form className='inner_container' onSubmit={(e) => updateProfile(e)}>
                    <h1 className='header'>Edit Profile</h1>
                    <p className='desc'>Your personal job finder is here</p>
                    <input type='text' placeholder='Name' required className='inputBox' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    <input type='email' placeholder='Email' value={user.email} required className='inputBox' onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <input type='text' placeholder='Profile Url' value={user.profileUrl} required className='inputBox' onChange={(e) => setUser({ ...user, profileUrl: e.target.value })} />
                    <input type='text' placeholder='Password' value={user.password} required className='inputBox' onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    <div className='btnset'>
                        <Link to='/home'><div className='cancelBtn'>Cancel</div></Link>
                        <button type='submit' className='updateBtn'>Edit Job</button>
                    </div>
                </form>
            </div>
            <div className='right_section'></div>
        </div>
    )
}

export default UpdateProfile