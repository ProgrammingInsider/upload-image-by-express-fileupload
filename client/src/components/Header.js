import React from 'react'
import { useGlobalContext } from '../context'
import dark from '../Icons/moon.png';
import bright from '../Icons/brightness.png';

const Header = () => {
    const {mode,setModeStatus,getTokenStatus} = useGlobalContext()
    const setDark = () => {  
      setModeStatus(false);
      localStorage.setItem('mode',false)      
      // console.log(false);
    }

    const setLight = () => {
      setModeStatus(true);
      localStorage.setItem('mode',true)      
      // console.log(true);
    }
  return <>
     <div className={mode?'light_header header':'dark_header header'}>
        <article className='logout' onClick={()=>{localStorage.setItem('token',"");getTokenStatus(false)}}>Logout</article>
        <div>
           {
               mode ? ( <img src={dark} className="Icon" onClick={setDark}/>) : (<img src={bright} className="Icon" onClick={setLight}/>)
           }
        </div>
     </div>
  </>
}

export default Header