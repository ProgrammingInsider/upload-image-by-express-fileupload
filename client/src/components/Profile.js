import React,{useState, useEffect} from 'react'
import { useGlobalContext } from '../context'
import { viewProfile, updateProfile} from '../connection/axios';

import camera_dark from '../Icons/camera_dark.png';
import camera_light from '../Icons/camera_light.png';
import edit_dark from '../Icons/edit_dark.png';
import edit_light from '../Icons/edit_light.png';
import save_dark from '../Icons/save_dark.png';
import save_light from '../Icons/save_light.png';



const Profile = () => {
  const {mode,setModeStatus,getTokenStatus} = useGlobalContext()

  // Buttons Toggle
  const [changePassword, setChangePassword] = useState(false);
  const [enableNameEdit, setEnableNameEdit] = useState(false);
  const [enableBioEdit, setEnableBioEdit] = useState(false);
  const [enableEmailEdit, setEnableEmailEdit] = useState(false);
  const [enablePhoneEdit, setEnablePhoneEdit] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(true);
  const [deleteBox, setDeleteBox] = useState(false)

  

  // Dialog Box Variables
  const [messageBox, setMessageBox] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState(''); 

 
  // Dialog Box
  useEffect(()=>{ 
    setTimeout(() => {
      setMessageBox(false)
    }, 5000);
    
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
},[messageBox])


// Fetch Data
const [personalInfo, setPersonalInfo] = useState([])

// Information Input Variables
const [id,setId] = useState();
const[inputUsername, setInputUsername] = useState("");
const[inputBio, setInputBio] = useState("");
const[inputEmail, setInputEmail] = useState("");
const[inputPhonenumber, setInputPhonenumber] = useState("");
const[inputPassword, setInputPassword] = useState("");
const[profilePicImage, setProfilePicImage] = useState("")
const[profilepicName, setProfilePicName] = useState("")
const[newPassword, setNewPassword] = useState("");
const[confirmPassword, setConfirmPassword] = useState("");
const[previousPassword, setPreviousPassword] = useState("");

useEffect(()=>{
  const getPersonalInfo = async()=>{
    const {value} = await viewProfile();

    setPersonalInfo([value])
   
  }
  
  getPersonalInfo();
},[])


// Assign fetched data to variables
useEffect(()=>{
    if(personalInfo.length>0 && personalInfo[0] !== null && personalInfo[0] !== undefined){
       const{_id,username,email,bio,password,phonenumber,profilepic} = personalInfo[0];
        
       setId(_id);
       profilepic?setProfilePicName(profilepic):setProfilePicName("")
       username ? setInputUsername(username): setInputUsername("");
       email? setInputEmail(email) : setInputEmail("");
       phonenumber ? setInputPhonenumber(phonenumber) : setInputPhonenumber("");
       password? setInputPassword(password): setInputPassword("")
       
    }
},[personalInfo])

// Selecte Image
const selectedImage = (e) => {
  const file = e.target.files[0];
  setProfilePicImage(file)
  setMessageBox(true);
  setMessageType('success');
  setMessage("click Save button to save it")

}
// Save button

const submitProfile = async(e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("id",id);
  formData.append("profilepic",profilePicImage);

  const {value} = await updateProfile(formData);
  setPersonalInfo([{...value}])
  setMessageBox(true);
  setMessageType('update');
  setMessage("Your personal information is updated");
}



  const bioPlaceholder = "Ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non erat finibus, tincidunt leo ut, viverra tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus dignissim, odio vel dapibus ullamcorper, ante quam pharetra enim, in imperdiet neque ex a lorem. Donec nec semper est. Sed convallis vulputate velit, tincidunt gravida est tempus nec. Nam gravida, ipsum sagittis aliquet lacinia, elit metus vulputate sapien, ut."
  return <>
  {
   
      <div className={mode?'light_mode':'dark_mode'}>
     {
        messageBox && <div className={mode?`messageLight ${messageType}`:`messageDark ${messageType}`}>
                        <article className={`messageText`}>{message}</article>
                       </div>
      }
     
      <form className='profile-form' onSubmit={submitProfile}>
            <label htmlFor='changeProfile' className='changeProfileContainer'>
            <div className={mode?'profilepic_dark':'profilepic_light'}>
              {
                profilepicName
                ?<img src={require("../../../server/uploads/"+profilepicName)} className="Profile_Pic"/>
                :<img src={mode?camera_dark:camera_light} className="Profile_Icon"/>
              }
              
            </div>
              <input type='file' name='profilepic' id='changeProfile' onChange={(e)=>{setEnableSubmit(false);selectedImage(e)}}/>
            </label>

            <div className='profile_container'>
               <article className='profile_info_status'>User Name</article>
               <div className='profile_info'>
                <input type="text" name='username'  className={mode?'light_input_form':'dark_input_form'} disabled={!enableNameEdit} value={inputUsername} onChange={(e)=>{setEnableSubmit(false);setInputUsername(e.target.value)}}/> &nbsp;
                <div className='iconsContainer'>
                  {
                    enableNameEdit 
                    ?<img src={mode?save_dark:save_light} className="Profile_Info_Icon" onClick={()=>setEnableNameEdit(!enableNameEdit)}/>
                    :<img src={mode?edit_dark:edit_light} className="Profile_Info_Icon" onClick={()=>setEnableNameEdit(!enableNameEdit)}/>
                  }
                </div>
               </div>
               <article className='profile_info_status'>Bio</article>
               <div className='profile_info'>
                 <textarea cols="60" rows="10" name='bio' disabled={!enableBioEdit} maxLength={70} className={mode?'bio light_input_form':'bio dark_input_form'} placeholder={bioPlaceholder} value={inputBio} onChange={(e)=>{setEnableSubmit(false);setInputBio(e.target.value)}}></textarea>
                 <br/><div className='iconsContainer'>
               {
                 enableBioEdit 
                 ?<img src={mode?save_dark:save_light} className="Profile_Info_Icon" onClick={()=>setEnableBioEdit(!enableBioEdit)}/>
                 :<img src={mode?edit_dark:edit_light} className="Profile_Info_Icon" onClick={()=>setEnableBioEdit(!enableBioEdit)}/>
                }
               </div>
               </div>
               <article className='profile_info_status'>Email</article>
               <div className='profile_info'>
                <input type="email" name='email' className={mode?'light_input_form':'dark_input_form'} disabled={!enableEmailEdit} value={inputEmail} onChange={(e)=>{setEnableSubmit(false);setInputEmail(e.target.value)}}/> &nbsp;
                <div className='iconsContainer'>
                  {
                    enableEmailEdit 
                    ?<img src={mode?save_dark:save_light} className="Profile_Info_Icon" onClick={()=>setEnableEmailEdit(!enableEmailEdit)}/>
                    :<img src={mode?edit_dark:edit_light} className="Profile_Info_Icon" onClick={()=>setEnableEmailEdit(!enableEmailEdit)}/>
                  }
                </div>
               </div>
               <article className='profile_info_status'>Phone number</article>
               <div className='profile_info'>
                <input type="text" name='phonenumber' className={mode?'light_input_form':'dark_input_form'} disabled={!enablePhoneEdit} value={inputPhonenumber} onChange={(e)=>{setEnableSubmit(false); setInputPhonenumber(e.target.value)}}/> &nbsp;
                <div className='iconsContainer'>
                  {
                    enablePhoneEdit 
                    ?<img src={mode?save_dark:save_light} className="Profile_Info_Icon" onClick={()=>setEnablePhoneEdit(!enablePhoneEdit)}/>
                    :<img src={mode?edit_dark:edit_light} className="Profile_Info_Icon" onClick={()=>setEnablePhoneEdit(!enablePhoneEdit)}/>
                  }
                </div>
               </div>
               <div className={mode?'btn light_btn':'btn dark_btn'} onClick={()=>setChangePassword(!changePassword)}>Change Password</div>
               {
                changePassword && (<div className='changePassword form_input'>
                <input type="password" placeholder='Previous Password' value={previousPassword} onChange={(e)=>setPreviousPassword(e.target.value)} className={mode?"light_input_form":'dark_input_form'} required/>
                 <input type="password" placeholder='New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className={mode?"light_input_form":'dark_input_form'} required />
                 <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className={mode?"light_input_form":'dark_input_form'} required/>
                 <div className={mode?'btn light_btn':'btn dark_btn'}>Change</div>
             </div>)
               }

            <div className='btn-container'>
            {
              enableSubmit
              ?<button type='submit' className={mode?'btn light_btn submit_profile disabled_btn':'btn dark_btn submit_profile disabled_btn'} disabled={enableSubmit}>Save</button>
              :<button type='submit' className={mode?'btn light_btn submit_profile active_btn':'btn dark_btn submit_profile active_btn'} disabled={enableSubmit}>Save</button>
            }
              <div onClick={()=>setDeleteBox(true)} className={mode?'btn light_btn submit_profile delete_btn':'btn dark_btn submit_profile delete_btn'}>Delete</div>
            </div>
            </div>
            {
              deleteBox && (
              <div className='deleteAuthBg'>
                  <div className='deleteAuth'>
                      <h2 className='deleteAuthText'>Are you sure to delete this profile?</h2>
                      <div className='deleteAuth_btns'>
                          <button type='submit' className={mode?'btn light_btn submit_profile auth_btn':'btn dark_btn submit_profile auth_btn'}>Yes</button>
                          <button onClick={()=>setDeleteBox(false)} className={mode?'btn light_btn submit_profile auth_btn':'btn dark_btn submit_profile auth_btn'}>No</button>    
                      </div>
                  </div>
                </div>
              )
            }
          
            
            </form>
     </div>
  }
     
  </>
}

export default Profile