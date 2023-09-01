import {useState,useEffect} from 'react'
import { useGlobalContext } from '../context'
import {signupDB, signinDB} from '../connection/axios'

const SignupAndsignin= () => {
  const {mode,setModeStatus,getTokenStatus} = useGlobalContext()

    // Dialog Box
    const [messageBox, setMessageBox] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');

  // Dialog Box
    useEffect(()=>{ 
      const timeout = setTimeout(() => {
        setMessageBox(false)
      }, 5000);
      
      // timeout();
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      return ()=> clearTimeout(timeout)
  },[messageBox])

  // Sign up variables
  const[username, setUsername] = useState('');
  const[email, setEmail] = useState('');
  const[phonenumber,setPhonenumber]=useState('');
  const[password,setPassword]=useState('');
  const[confirmPassword,setConfirmPassword]=useState('');

  
  

  // Signup 
  const signup = async(e) => {
      e.preventDefault();
      if(username !== "" && email !== "" && phonenumber !== "" && password !== "" && confirmPassword !==""){
          if(password === confirmPassword){
            const sentData = {username,email,phonenumber,password}
            const {value,msg} = await signupDB(sentData)
            if(value !== null){
              setMessageType("success");
              setMessageBox(true);
              setMessage(msg)
              setUsername("");
              setEmail("");
              setPhonenumber("");
              setPassword("");
              setConfirmPassword("")
            }else{
              setMessageType("alert");
              setMessageBox(true);
              setMessage(msg)
            }
            
          }else{
            setMessageType("alert");
            setMessageBox(true);
            setMessage("Passwords do not match")
          }
      }else{
        setMessageType("alert");
        setMessageBox(true);
        setMessage("please fill out all input form")  
      }
  }


  // Signin Variables
  const[signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const signIn = async (e) => {
    e.preventDefault();

    if(signinEmail !== "" && signinPassword !== ""){
      const sentData = {email:signinEmail,password:signinPassword}
      const {value,msg} = await signinDB(sentData)

      if(value !== null){
        getTokenStatus(true)
        setMessageType("success");
        setMessageBox(true);
        setMessage(msg)
      }else{
        setMessageType("alert");
        setMessageBox(true);
        setMessage(msg) 
      }
 
    }else{
        setMessageType("alert");
        setMessageBox(true);
        setMessage("please fill out all input form") 
    }

  }
    
  return <>
    <div className={mode?'light_mode signup_container':'dark_mode signup_container'}>
    {
        messageBox && <div className={mode?`messageLight ${messageType}`:`messageDark ${messageType}`}>
                        <article className={`messageText`}>{message}</article>
                       </div>
      }
         <div className='form-container'>
            <h1 className='Title'>Sign Up</h1>
            <form className='form_input' onSubmit={signup}>
                <input type="text" placeholder='User Name' value={username} onChange={(e)=>setUsername(e.target.value)} className={mode?"light_input_form":'dark_input_form'} required/>
                <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className={mode?"light_input_form":'dark_input_form'} required/>
                <input type="text" placeholder='Phone Number' value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} className={mode?"light_input_form":'dark_input_form'} required/>
                <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className={mode?"light_input_form":'dark_input_form'} required/>
                <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className={mode?"light_input_form":'dark_input_form'} required/>
                <input type="submit" value="Sign Up" className={mode?'btn light_btn':'btn dark_btn'}/>
            </form>
         </div>

         <div className='form-container'>
            <h1 className='Title'>Sign In</h1>
            <form className='form_input' onSubmit={signIn}>
                <input type="email" placeholder='Email' value={signinEmail} onChange={(e)=>setSigninEmail(e.target.value)} className={mode?"light_input_form":'dark_input_form'} required/>
                <input type="password" placeholder='Password' value={signinPassword} onChange={(e)=>setSigninPassword(e.target.value)} className={mode?"light_input_form":'dark_input_form'} required/>
                <input type="submit" value="Sign In" className={mode?'btn light_btn':'btn dark_btn'}/>
            </form>
         </div>
    </div>
  </>
}

export default SignupAndsignin