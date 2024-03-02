import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'; // it is used to accces the data from the database using the parameter taht we had given
import { getDoc } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import { db } from '../firebase/firebase';
import { doc } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import Reviews from './Reviews';


const Details = () => {
   
   const {id} = useParams();
   const [data,setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating: 0 ,
    rated: 0
   })
     
    const[loading, setLoading] = useState(false);
   
    useEffect(() => {
         
     
          async function getData() {
            setLoading(true);
           const _doc = doc(db, "movies", id);
           const _data = await getDoc(_doc);
           setData(_data.data());
           setLoading(false)
          }
          getData();

         

    },[])
  return (
    <div className='p-4 flex flex-col md:flex-row items-center md:items-start  w-full justify-center'>
    {   loading ? <div className='h-96 justify-center content-center mt-48'><TailSpin height={60} color='white' /></div> :
               <>
        <img className='h-96 block md:sticky top-24 mt-3' src={data.image} />
        <div className='md:ml-4 ml-0 w-full md:w-1/2 mt-1'>
             <h1 className='text-2xl font-bold text-gray-400'>{data.title}<span className='text-xl'>{data.year}</span></h1>
             <ReactStars 
              size={20}
              half={true}
              value={data.rating/data.rated}
              edit={false}
          />
             <p className='mt-2'>{data.description}</p>
               
             <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>
        </div>
        </>
    }
    </div>
  )
}

export default Details
