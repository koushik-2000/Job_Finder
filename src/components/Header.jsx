import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/useData';

const Header = () => {
    const { data } = useData();
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear('JOB-APP-DATA')
        navigate('/')
    }

    return (
        <div className="header">
            <h1 className='header_text'>Jobfinder</h1>
            <div className='row'>
                <div className='logout_btn' onClick={() => logout()}>Logout</div>
                <div className='row'>
                    <h1 style={{ textTransform: "capitalize" }}>Hello {data?.name}</h1>
                    <Link to='/update'><img src={data?.profileUrl} className='profile_img' alt="profile" /></Link>
                </div>
            </div>
        </div>
    )
}

export default Header