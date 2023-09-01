import React,{useContext, useState} from 'react'

const PersonContext = React.createContext();

const ContextApi = ({children}) => {
    const[mode, setMode] = useState(false);
    const[token, setToken] = useState(localStorage.getItem('token') !== "" ?true:false);
   
    const getTokenStatus = (boolean) => {
      if(boolean){
        setToken(boolean)
      }else{
        setToken(boolean)
      }
    }
   
   
    const setModeStatus = (boolean) => {
        setMode(boolean)
    }
  return(
    <PersonContext.Provider value={{mode, setModeStatus, token, getTokenStatus}}>
        {children}
  </PersonContext.Provider>
  )
}

export const useGlobalContext = () => {
    return useContext(PersonContext)
}

export default ContextApi;