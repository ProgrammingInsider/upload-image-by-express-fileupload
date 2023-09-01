import React from 'react'
import './index.css';
import { useGlobalContext } from './context';

// Components
import SignupAndsignin from './components/Signup&signin';
import Header from './components/Header';
import Profile from './components/Profile';

const App = () => {
  const {token} = useGlobalContext();
  
 
     return<>
     <Header/>
     
     {
      token
      ?<Profile/>
      : <SignupAndsignin/>
     }
   
    
        
        
     </> 
}

export default App