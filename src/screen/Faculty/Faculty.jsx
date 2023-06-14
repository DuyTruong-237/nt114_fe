import React from "react";
import TopHeader from '../../components/top_header/TopHeader';
import Faculty from '../../components/faculty/Faculty';

export default function Faculty_src(){
    return (
    <div className='homeScreen_js'>
      <div className='Header'>
        <TopHeader/>
      </div>
      <div className='Body'> 
        <Faculty/>
        </div>        
    </div>
    )
}