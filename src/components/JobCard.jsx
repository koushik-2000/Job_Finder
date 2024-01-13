import React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/useData'

const JobCard = ({ job }) => {
    const { data } = useData()
    const admin = process.env.REACT_APP_ADMIN
    return (
        <div className='job_card'>
            <div className='left_pane'>
                <img className='company_logo' src={job.logoUrl} width={40} height={40} alt="company_logo" />
                <div>
                    <h1>{job.jobPosition}</h1>
                    <div className='row1'>
                        <div>
                            <img src={require('../assets/icons/group.png')} alt="rupee" />
                            <p>11-50</p>
                        </div>
                        <div>
                            <p>₹ {job.salary}</p>
                        </div>
                        <div>
                            <img src={require('../assets/icons/india.png')} alt="rupee" />
                            <p>{job.location}</p>
                        </div>
                    </div>
                    <div className='row2'>
                        <p>{job.remote}</p>
                        <p>{job.jobType}</p>
                    </div>
                </div>
            </div>
            <div className='right_pane'>
                <div className='skills'>
                    {
                        job?.skillsRequired.map((item, index) => (
                            <div key={index} className='skill'>{item}</div>
                        ))
                    }
                </div>
                <div className='btns'>
                    {
                        data?.email === admin &&
                        <Link to={`/edit/${job._id}`}><div className='edit_btn'>Edit Details</div></Link>
                    }
                    <Link to={`/job/${job._id}`}><div className='view_btn'>View Details</div></Link>
                </div>
            </div>
        </div>
    )
}

export default JobCard