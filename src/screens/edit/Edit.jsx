import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { useData } from '../../context/useData'

const Edit = () => {
    const { jobs, fetchJob } = useData()
    const [currJob, setCurrentJob] = useState({
        companyName: "",
        logoUrl: "",
        jobPosition: "",
        salary: "",
        duration: "",
        jobType: "",
        remote: "",
        location: "",
        description: "",
        about: "",
        skillsRequired: [],
        information: ""
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const api_url = process.env.REACT_APP_API_URL

    useEffect(() => {
        jobs.map(item => {
            if (item._id === id) {
                setCurrentJob(item)
            }
        })
    }, [id])

    const editJob = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${api_url}/job/editJob/${currJob._id}`, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currJob)
            }).then((response) => response.json())
            if (response.status === "ok") {
                fetchJob()
                navigate('/home')
            }
        }
        catch (e) {
            console.log(e)
        }
    }


    return (
        <div className='container'>
            <div className='left_section1'>
                <form className='inner_container1' onSubmit={(e) => editJob(e)}>
                    <h1 className='header'>Edit job description</h1>
                    <div className='row'>
                        <label>Company Name</label>
                        <input type='text' placeholder='Enter your company name here' required className='inputBox1' value={currJob?.companyName} onChange={(e) => setCurrentJob({ ...currJob, companyName: e.target.value })} />
                    </div>
                    <div className='row'>
                        <label>Add logo URL</label>
                        <input type='text' placeholder='Enter the link' required className='inputBox1' value={currJob?.logoUrl} onChange={(e) => setCurrentJob({ ...currJob, logoUrl: e.target.value })} />
                    </div>
                    <div className='row'>
                        <label>Job position</label>
                        <input type='text' placeholder='Enter job position' required className='inputBox1' value={currJob?.jobPosition} onChange={(e) => setCurrentJob({ ...currJob, jobPosition: e.target.value })} />
                    </div>
                    <div className='row'>
                        <label>Monthly salary</label>
                        <input type='text' placeholder='Enter Amount in rupees' required className='inputBox1' value={currJob?.salary} onChange={(e) => setCurrentJob({ ...currJob, salary: e.target.value })} />
                    </div>
                    <div className='row'>
                        <label>Job Type</label>
                        <select className='selectInput' value={currJob?.jobType} onChange={(e) => setCurrentJob({ ...currJob, jobType: e.target.value })}>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                        </select>
                    </div>
                    <div className='row'>
                        <label>Remote/office</label>
                        <select className='selectInput' value={currJob?.remote} onChange={(e) => setCurrentJob({ ...currJob, remote: e.target.value })}>
                            <option value="Remote">Remote</option>
                            <option value="Office">Office</option>
                        </select>
                    </div>
                    <div className='row'>
                        <label>Location</label>
                        <input className='inputBox1' type='text' placeholder='Enter Location' value={currJob?.location} onChange={(e) => setCurrentJob({ ...currJob, location: e.target.value })} />
                    </div>
                    <div className='row'>
                        <label>Job Description</label>
                        <textarea placeholder='Type the job description' value={currJob?.description} onChange={(e) => setCurrentJob({ ...currJob, description: e.target.value })} />
                    </div>
                    <div className='row'>
                        <label>About Company</label>
                        <textarea placeholder='Type about your company' value={currJob?.about} onChange={(e) => setCurrentJob({ ...currJob, about: e.target.value })} />
                    </div>
                    <div className='row'>
                        <label>Information</label>
                        <input className='inputBox1' type='text' placeholder='Enter the additional information' value={currJob?.information} onChange={(e) => setCurrentJob({ ...currJob, information: e.target.value })} />
                    </div>
                    <div className='btns'>
                        <Link to='/home'><div className='cancelBtn'>Cancel</div></Link>
                        <button type='submit' className='addBtn'>Edit Job</button>
                    </div>
                </form>
            </div>
            <div className='right_section1'></div>
        </div>
    )
}

export default Edit