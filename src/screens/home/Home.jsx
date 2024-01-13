import React, { useEffect, useState } from 'react'
import "./home.scss";
import Search from '../../components/Search';
import { useData } from '../../context/useData';
import JobCard from '../../components/JobCard';
import Header from '../../components/Header';

const Home = () => {

    const { jobs, isLoading } = useData()
    const [jobData, setJobData] = useState(jobs)

    useEffect(() => {
        setJobData(jobs)
    }, [jobs])

    const searchJob = (term) => {
        if (term !== "") {
            const filteredJobs = jobs.filter((job) =>
                job.jobPosition.toLowerCase().includes(term.toLowerCase())
            );
            setJobData(filteredJobs);
        }
        else {
            setJobData(jobs)
        }
    };


    return (
        <div className='home_container'>
            <Header />
            <Search searchJob={searchJob} />
            <div className='jobs'>
                {
                    isLoading ? (
                        <img src={require("../../assets/icons/spinner.gif")} alt="spinner" width={35} />
                    ) : (
                        jobData?.length > 0 ? (
                            jobData?.map(item => (
                                <JobCard job={item} key={item._id} />
                            ))
                        ) : (
                            <div>Sorry!! No Jobs</div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Home