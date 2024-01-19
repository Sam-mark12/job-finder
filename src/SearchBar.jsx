import React, { useState } from 'react'

function SearchBar(props) {
    const initialCriteria = {
      title: "",
      exprience: "",
      type: "",
    };
  
    const [jobCriteria, setJobCriteria] = useState(initialCriteria);
  
    const handelChange = (e) => {
      setJobCriteria((ps) => ({
        ...ps,
        [e.target.name]: e.target.value,
      }));
    };
  
    const search = async () => {
      await props.fetchJobsCustom(jobCriteria);
    };
  
    const clearFilter = () => {
      setJobCriteria(initialCriteria);
    };
    
  return (
    <div className=' flex gap-4 mt-10 justify-center px-10'>
        <select onChange={handelChange} name="title" value={jobCriteria.title} className=' w-52 py-3 pl-10  bg-zinc-200 font-semifold rounded-md'>
            <option value="" disabled> JOB ROLE</option>
            <option value="iOS Devaloper">iOS Devaloper</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Android Developer">Android Developer</option>
            <option value="Developer Advocate">Developer Advocate</option>
        </select>
      
        <select onChange={handelChange} name='type' value={jobCriteria.type} className=' w-52 py-3 pl-10  bg-zinc-200 font-semifold rounded-md'>
            <option value="" disabled > JOB Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
        </select>
        <select onChange={handelChange} name='exprience' value={jobCriteria.exprience} className=' w-52 py-3 pl-10  bg-zinc-200 font-semifold rounded-md'>
            <option value="" disabled> EXPRIENCE</option>
            <option value="Fresher">Fresher</option>
            <option value="Junior">Junior</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
        </select>
        <button onClick={search} className='w-52 bg-blue-400 text-white  font-bold py-3 rounded-md'>Search</button>
        <button
        onClick={clearFilter}
        className='w-52 bg-red-500 text-white font-bold py-3 rounded-md'
      >
        Clear Filter
      </button>
    </div>
  )
}

export default SearchBar