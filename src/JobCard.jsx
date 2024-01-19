import React from 'react';
import dayjs from 'dayjs';

function Jobcard(props) {
//   const skills = ['reactjs', 'nodejs', 'nextjs'];
// console.log(props.postedOn);
  const date1 = dayjs(new Date());
  const diffInDays = date1.diff(props.postedOn, 'day');
//   console.log(diffInDays);

  return (
    <div className='mx-40 mb-4 mt-20 '>
        <div  className='flex justify-between item-center px-6 py-4 bg-zinc-300 rounded-md border border-black shadow-lg hover:border-blue-600 hover:translate-y-1 hover:scale-103'>
            <div className=' flex flex-col item-start gap-3'>
                <h1 className=' text-lg font-semibold'>{props.title} - {props.company}</h1>
                <p>{props.type} . {props.exprience} . {props.location}</p>
                <div className=' flex items-center gap-3'> 
                  {
                    props.skills.map((skill)=>(
                        <p key={skill} className=' text-gray-700 py-1 px-2 rounded-md border border-black'>{skill}</p>
                    ))
                  }

                </div>
            </div> 
            <div className=' flex items-center gap-2'>
                <p className=' text-gray-600'>Posted {diffInDays > 1 ?`${diffInDays} days` : `${diffInDays} day`} ago </p>
                <a href={props.job_link}>
                <button className=' text-blue-500 border border-blue-500 px-10 py-2 rounded-md'>Apply</button>
                </a>
            </div>

        </div>

    </div>

  )
}

export default Jobcard;
