import React from 'react';
import './Loader.css';
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className='loader_div'>
      <CircularProgress />
    </div>
  )
}

export default Loader