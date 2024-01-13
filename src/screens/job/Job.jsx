import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useData } from '../../context/useData'
import Header from '../../components/Header'

const Job = () => {
    const { data, jobs } = useData()
    const [currJob, setCurrentJob] = useState()
    const { id } = useParams()
    const admin = process.env.REACT_APP_ADMIN

    useEffect(() => {
        jobs.map(item => {
            if (item._id === id) {
                setCurrentJob(item)
            }
        })
    })

    return (
        <div className='job_container'>
            <Header />
            <div className='job_description'>{currJob?.jobPosition} {currJob?.remote} job/internship at {currJob?.companyName}</div>
            <div className='job_templete'>
                <div className='job_period'>6 weeks ago . {currJob?.jobType}</div>
                <div className='row'>
                    <div className='job_title'>{currJob?.jobPosition}</div>
                    {
                        data?.email === admin &&
                        <Link className='editJobBtn' to={`/edit/${currJob?._id}`} >Edit Job</Link>
                    }
                </div>
                <div className="job_location">{currJob?.location}</div>
                <div className="job_stipend">
                    <div className='fragment'>
                        <div className='label'>
                            <img src={require('../../assets/icons/money.png')} alt="money" />
                            <p>Stipend</p>
                        </div>
                        <p className='desc'>Rs {currJob?.salary}/month</p>
                    </div>
                    <div className='fragment'>
                        <div className='label'>
                            <img src={require('../../assets/icons/calender.png')} alt="calender" />
                            <p>Duration</p>
                        </div>
                        <p className='desc'>{currJob?.duration}</p>
                    </div>
                </div>
                <div className="about_company">
                    <h1>About company</h1>
                    <p>
                        {currJob?.description}
                    </p>
                </div>
                <div className="about_job">
                    <h1>About the  job/internship</h1>
                    <p>
                        {currJob?.about}
                    </p>
                </div>
                <div className="skills_required">
                    <h1>Skill(s) required</h1>
                    <div className="skills">
                        {currJob?.skillsRequired.map((skill, index) => <div className='skill' key={index}>{skill}</div>)}</div>
                </div>
                <div className="additional_info">
                    <h1>Additional Information</h1>
                    <p>
                        {currJob?.information}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Job