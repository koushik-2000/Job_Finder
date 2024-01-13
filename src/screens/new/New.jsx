import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './new.scss'
import { useData } from '../../context/useData'

const New = () => {
    const { fetchJob } = useData()
    const navigate = useNavigate()
    const [jobData, setJobData] = useState({
        id: Math.floor(Math.random() * 10000),
        companyName: null,
        logoUrl: null,
        jobPosition: null,
        salary: null,
        duration: null,
        jobType: null,
        remote: null,
        location: null,
        description: null,
        about: null,
        skillsRequired: [],
        information: null,
    })
    const api_url = process.env.REACT_APP_API_URL

    const addNewJob = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${api_url}/job/newJob`, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData)
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

    const [individualSkillsSet] = useState([
        'Java',
        'Python',
        'C++',
        'JavaScript',
        'HTML',
        'CSS',
        'React.js',
        'Angular',
        'Vue.js',
        'Node.js',
        'Express.js',
        'Django',
        'Flask',
        'Ruby on Rails',
        'SQL',
        'MongoDB',
        'Git',
        'GitHub',
        'Web Accessibility (a11y)',
        'Responsive Web Design',
        'RESTful APIs',
        'GraphQL',
        'WebSockets',
        'JSON',
        'XML',
        'CI/CD',
        'Docker',
        'Kubernetes',
        'AWS',
        'Azure',
        'Google Cloud',
        'Machine Learning',
        'Data Science',
        'Blockchain',
        'Cybersecurity',
        'Agile Methodology',
        'Scrum',
        'DevOps',
        'Shell Scripting',
        'Linux/Unix',
        'UI/UX Design',
        'Adobe Creative Suite',
        'TensorFlow',
        'Natural Language Processing (NLP)',
        'Computer Vision',
        'Internet of Things (IoT)',
        'Unity',
        'Augmented Reality (AR)',
        'Virtual Reality (VR)',
    ])

    const [skillSet, setSkillSet] = useState([])

    useEffect(() => {
        const options = individualSkillsSet.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
        ));

        setSkillSet(options);
    }, []);

    const handleSelectChange = (e) => {
        if (!jobData.skillsRequired.includes(e.target.value)) {
            setJobData({ ...jobData, skillsRequired: [...jobData.skillsRequired, e.target.value] });
        }
    };

    return (
        <div className='container'>
            <div className='left_section1'>
                <div className='inner_container1'>
                    <h1 className='header'>Add job description</h1>
                    <form onSubmit={(e) => addNewJob(e)}>
                        <div className='row'>
                            <label>Company Name</label>
                            <input type='text' placeholder='Enter your company name here' required className='inputBox1' onChange={(e) => setJobData({ ...jobData, companyName: e.target.value })} />
                        </div>
                        <div className='row'>
                            <label>Add logo URL</label>
                            <input type='text' placeholder='Enter the link' required className='inputBox1' onChange={(e) => setJobData({ ...jobData, logoUrl: e.target.value })} />
                        </div>
                        <div className='row'>
                            <label>Job position</label>
                            <input type='text' placeholder='Enter job position' required className='inputBox1' onChange={(e) => setJobData({ ...jobData, jobPosition: e.target.value })} />
                        </div>
                        <div className='row'>
                            <label>Duration</label>
                            <input type='text' placeholder='Enter Duration' required className='inputBox1' onChange={(e) => setJobData({ ...jobData, duration: e.target.value })} />
                        </div>
                        <div className='row'>
                            <label>Monthly salary</label>
                            <input type='text' placeholder='Enter Amount in rupees' required className='inputBox1' onChange={(e) => setJobData({ ...jobData, salary: e.target.value })} />
                        </div>
                        <div className='row'>
                            <label>Job Type</label>
                            <select className='selectInput' required onChange={(e) => setJobData({ ...jobData, jobType: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                            </select>
                        </div>
                        <div className='row'>
                            <label>Remote/office</label>
                            <select className='selectInput' required onChange={(e) => setJobData({ ...jobData, remote: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Remote">Remote</option>
                                <option value="Office">Office</option>
                            </select>
                        </div>
                        <div className='row'>
                            <label>Location</label>
                            <input className='inputBox1' required type='text' placeholder='Enter Location' onChange={(e) => setJobData({ ...jobData, location: e.target.value })} />
                        </div>
                        <div className='row'>
                            <label>Job Description</label>
                            <textarea placeholder='Type the job description' required onChange={(e) => setJobData({ ...jobData, description: e.target.value })} />
                        </div>
                        <div className='row'>
                            <label>About Company</label>
                            <textarea placeholder='Type about your company' required onChange={(e) => setJobData({ ...jobData, about: e.target.value })} />
                        </div>
                        <div className='row'>
                            <label>Skills Required</label>
                            <select id="skillSet" className='selectInput1' required multiple onChange={(e) => handleSelectChange(e)}>
                                {skillSet}
                            </select>
                        </div>
                        <div className='row'>
                            <label>Information</label>
                            <input className='inputBox1' required type='text' placeholder='Enter the additional information' onChange={(e) => setJobData({ ...jobData, information: e.target.value })} />
                        </div>
                        <div className='btns'>
                            <Link to='/home'><div className='cancelBtn'>Cancel</div></Link>
                            <button type='submit' className='addBtn'>+ Add Job</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='right_section1'></div>
        </div>
    )
}

export default New