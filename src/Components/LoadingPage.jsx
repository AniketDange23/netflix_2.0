import React from 'react';
import {  BeatLoader } from 'react-spinners';
import Logo from '../image/logoLoading.png'
const LoadingPage = () => {
  return (
    <div className="flex flex-col mt-10  items-center justify-center  gap-4 text-white cover-img">
    <img src={Logo} alt="logos" style={{width:"600px"}} />
      <h1 className="text-xl lg:text-xl flex font-semibold  text-center  items-baseline gap-1  text-white">
Loading
<BeatLoader
size={10}
  color="#bc2222"
  margin={2}
/>
</h1>
      
    </div>
  );
};

export default LoadingPage;
