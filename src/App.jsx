import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import SearchBar from './SearchBar'
import { collection, query, orderBy,where, getDocs } from "firebase/firestore";
import { db } from './firebase.config'
import Jobcard from './Jobcard';
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
     
  
      const jobRef = query(collection(db, "jobs"));
      const q = query(
        jobRef,
        where("type", "==", jobCriteria.type),
         where("title", "==", jobCriteria.title),
      
        
      
         where("exprience", "==", jobCriteria.exprience),
         orderBy("postedOn", "desc")
         
      );
  
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
    {
  
    
      jobs.map((job) => (
        <Jobcard key={job.id} {...job} />
      ))
}
  
  </div>
  
  )
}

export default App
