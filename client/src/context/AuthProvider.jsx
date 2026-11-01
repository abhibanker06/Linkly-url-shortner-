import {useState,useEffect} from 'react'
import AuthContext from './AuthContext'
import axios from 'axios';

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);

    const getUser = async()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_API}/user/details`,{withCredentials:true});
            setUser(response.data.user);
        }catch(error){
            setUser(null);
            console.log("Error fetching user details:", error.response?.data?.message || error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getUser();
    },[])

  return (
    <AuthContext.Provider value ={{user,setUser,getUser}}> 
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
