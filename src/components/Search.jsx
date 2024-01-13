import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/useData'

const Search = ({ searchJob }) => {
    const { data } = useData()
    const clear = () => {
        const search = document.getElementById('search_input')
        search.value = ''
        searchJob('')
    }

    const admin = process.env.REACT_APP_ADMIN

    return (
        <div className='search_container'>
            <div className='search_box'>
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                    <path d="M21.3073 19.4279L27 25.1193L25.1193 27L19.4279 21.3073C17.3103 23.0049 14.6763 23.9282 11.9622 23.9244C5.35906 23.9244 0 18.5653 0 11.9622C0 5.35906 5.35906 0 11.9622 0C18.5653 0 23.9244 5.35906 23.9244 11.9622C23.9282 14.6763 23.0049 17.3103 21.3073 19.4279ZM18.6411 18.4417C20.3279 16.707 21.2699 14.3818 21.2661 11.9622C21.2661 6.82111 17.1019 2.65827 11.9622 2.65827C6.82111 2.65827 2.65827 6.82111 2.65827 11.9622C2.65827 17.1019 6.82111 21.2661 11.9622 21.2661C14.3818 21.2699 16.707 20.3279 18.4417 18.6411L18.6411 18.4417Z" fill="#9C9C9C" />
                </svg>
                <input id="search_input" type='text' className='search_input' placeholder="Type any job title" onChange={(e) => searchJob(e.target.value)} />
            </div>
            <div className='filter'>
                <div className='clearBtn' onClick={() => clear()}>clear</div>
                {
                    data?.email === admin &&
                    <Link className='addJobBtn' to='/new' >+Add Job</Link>
                }
            </div>
        </div>
    )
}

export default Search