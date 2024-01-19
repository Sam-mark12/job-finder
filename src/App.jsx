import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import SearchBar from './SearchBar'
import Jobcard from './Jobcard'
import { collection, query, orderBy,where, getDocs } from "firebase/firestore";
// import { doc } from "firebase/firestore";
import { db } from './firebase.config'
function App() {
   const [jobs, setJobs ] = useState([]);
   const [customSearch,setCustomSearch] = useState(false)
   const fetchJobs = async() => {
    setCustomSearch(false);
    const jobRef = query(collection(db, "jobs"))
    const q = query(jobRef, orderBy("postedOn","desc"))
    const req = await getDocs(q);
    const tempJobs = [];
    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn : job.data().postedOn.toDate(),
      })
    });
    setJobs(tempJobs);
   }
   const fetchJobsCustom = async (jobCriteria) => {
    try {
      setCustomSearch(true);
      const tempJobs = [];
      // console.log('Job Criteria:', jobCriteria);
  
      const jobRef = query(collection(db, "jobs"));
      const q = query(
        jobRef,
        where("type", "==", jobCriteria.type),
         where("title", "==", jobCriteria.title),
      
        
      
         where("exprience", "==", jobCriteria.exprience),
         orderBy("postedOn", "desc")
         
      );
 
      // console.log('Query:', q);
  
      const req = await getDocs(q);
      
  
      req.forEach((job) => {
        tempJobs.push({
          ...job.data(),
          id: job.id,
          postedOn: job.data().postedOn.toDate(),
        });
      });
  
      console.log('Fetched Jobs:', tempJobs);
  
      setJobs(tempJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  useEffect(() => {
     fetchJobs();
   }, [])
   

  return (  
    <div>
    <Navbar />
    <Header />
    <SearchBar fetchJobsCustom={fetchJobsCustom} />
  
    {customSearch && (
      <div className='flex justify-start mb-2 ml-4'>
        <button onClick={fetchJobs} className='bg-blue-500 px-10 py-2 rounded-md text-white'>
          Clear Filter
        </button>
      </div>
    )}
  
    {jobs.length === 0 ? (
      <p className="text-center text-red-500">No jobs match the criteria.</p>
    ) : (
      jobs.map((job) => (
        <Jobcard key={job.id} {...job} />
      ))
    )}
  </div>
  
  )
}

export default App