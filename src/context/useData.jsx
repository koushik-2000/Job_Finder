import { createContext, useContext, useEffect, useState } from "react"

const Context = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({})
    const [jobs, setJobs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const api_url = process.env.REACT_APP_API_URL

    const fetchJob = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${api_url}/job/getJob`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.json())
            setJobs(response.jobs)
        }
        catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        try {
            const storedData = localStorage.getItem('JOB-APP-DATA');
            if (storedData && storedData !== "undefined") {
                setData(JSON.parse(storedData));
            }
        } catch (error) {
            console.error(error);
        } finally {
            fetchJob()
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            fetchJob()
        }, 180000)
        return () => {
            clearInterval(interval)
        }
    }, [])


    const updateData = (newData) => {
        setData(newData)
    }

    return (
        <Context.Provider value={{ data, jobs, updateData, fetchJob, isLoading }} >
            {children}
        </Context.Provider>
    )
}

export const useData = () => {
    return useContext(Context)
}
