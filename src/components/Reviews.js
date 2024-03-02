import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';
import { reviewsRef , db} from '../firebase/firebase';
import { addDoc , doc ,updateDoc,query,where ,getDocs} from 'firebase/firestore';
import { TailSpin , ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';


const Reviews = ({id,prevRating, userRated}) => {
  const [rating, setRating] = useState(0);
  const [loading , setLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false)


  const sendReview = async () => {
     await addDoc(reviewsRef,{
        movieid: id,
        name: "Lokesh Chandel",
        rating: rating,
        thought: form,
        timestamp: new Date().getTime()
     })
       const ref = doc(db,'movies',id);
       await updateDoc(ref,{
         rating: prevRating + rating ,
        rated: userRated + 1
       })

      setRating(0);
      setForm("");
    swal({
      title: "Review sent",
      icon: "success",
      buttons: false,
      timer: 3000
    })
    setLoading(false)
  }

  // here we use useEffect hook to get the review of particular movie by using their id
    useEffect(() => {
          async function getData(){
            setReviewsLoading(true)
           let quer = query(reviewsRef, where('movieid', '==', id))
           const querySnapshot = await getDocs(quer);

           querySnapshot.forEach((doc) =>{
            setData((prev) => [...prev , doc.data()])
           })

            setReviewsLoading(false)
          }
          getData();
    },[])
  return (
    <div className='mt-4 border-t-2 border-gray-700 w-full'>
     <ReactStars
          size={30}
          half={true}
         // edit={false}
           value={rating}
          onChange={(rate) => setRating(rate)} // new rating return kar rha hai
         
          />
      <input value={form} onChange={(e) => setForm(e.target.value)} placeholder='Enter your thoughts...' className='w-full p-2 outline-none bg-black header' />
      <button onClick={sendReview}  className='bg-green-600 w-full p-2 flex justify-center '>{loading ? <TailSpin height={25} color='white'/> : 'share'}</button>
     
     {
      reviewsLoading ? <div className='mt-6 flex justify-center'><ThreeDots height={15} color='white'/></div> : <div>
        {
          data.map((e, i) => {
           return(
            <div className='bg-gray-900 border-b border-gray-600 p-2 w-full mt-2' key={i}>
              <div className='flex items-center'> 
              <p className='text-blue-500'>{e.name}</p>
              <p className='ml-3 text-xs'>{new Date(e.timestamp).toLocaleString()}</p>
              </div>
              <ReactStars 
              size={15}
              half={true}
              value={e.rating}
              edit={false}
          />
              <p>{e.thought}</p>
            </div>
           )
          })}
        
      </div>
     }

    </div>
  )
}


export default Reviews
