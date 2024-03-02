import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

const Header = () => {

  const useAppstate = useContext(Appstate)
  return (
    <div className=' sticky z-10 top-0 header text-3xl flex justify-between items-center italic text-red-500 font-bold p-3 border-b-2 border-grey-500'><Link to={'/'}><span>Film<span className='text-white italic'>Fusion</span></span> </Link>
    {
        useAppstate.login ? 
    <Link to={'/addmovie'}>
       <h1 className='text-lg text-white'> <Button className='text-white'><AddIcon className='mr-1 color-secondary'/> <span className='text-white'>Add New</span></Button> </h1>
       </Link>
       :
       <Link to={'/login'}>
       <h1 className='text-lg rounded text-white bg-green-500 cursor-pointer flex items-center'> <Button className='text-white '><span className='text-white font-medium capitalize'>Login</span></Button> </h1>
       </Link>
    }
    </div>
  )
}

export default Header
