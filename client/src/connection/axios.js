import axios from 'axios';

export const signupDB = async(sentData) => {
    const resp = await axios.post("http://localhost:5000/send",sentData)
    const {value,msg} = resp.data

    return {value,msg}
}

export const signinDB = async(sentData) => {
    const resp = await axios.post("http://localhost:5000/signin",sentData);

    const {value,msg} = resp.data

    if(value!== null){
       localStorage.setItem('token',value);   
    }
    
    return {value,msg}
}

// Fetch Data and sending token through authorization request header

export const viewProfile = async()=>{
    const token = localStorage.getItem('token');

    if(token !== null){
        const resp = await axios.get("http://localhost:5000/profile",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        var {value,msg} = resp.data

       
    }

    return {value,msg}
}

// Update Profile
export const updateProfile = async(sentData) => {
    const resp = await axios.put("http://localhost:5000/update",sentData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    });

    const {value} = resp.data;

    
  return {value}
}
