import axios from "axios"
import { createContext } from "react"
import { useContext } from "react";
import {useNavigate} from "react-router-dom"
import {useUser,useAuth} from "@clerk/clerk-react"
import {toast} from 'react-hot-toast'
import { useState,useEffect } from "react";

axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();
export const AppProvider =({children})=>{

    const currency=import.meta.env.VITE_CURRENCY||"$";
    const navigate=useNavigate();
    const {user}=useUser();
    const {getToken}=useAuth()

    const [isOwner,setIsOwner]=useState(false);
    const [showHotelReg,setShowHotelReg]=useState(false);
    const [searchedCities,setSearchedCities]=useState([]);
    const [rooms,setRooms]=useState([]);

    const fetchRooms =async()=>{
        try{
            const { data }=await axios.get('/api/rooms')
            if(data.success){
                setRooms(data.rooms)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    const fetchUser = async()=>{
        try{
            console.log("Fetching User Details");
            const token = await getToken();
            console.log("Clerk Token:", token); // Add this line

            if (!token) {
            toast.error("No token found. Are you signed in?");
            return;
            }
            const {data}=await axios.get('/api/user',{headers:{Authorization:`Bearer ${token}`}})
            if(data.success){
                console.log("User Details Fetched Successfully");
                setIsOwner(data.role==="hotelOwner");
                setSearchedCities(data.recentSearchedCities)
            }
            else{
                // Retry Fetching User Details after 5 seconds
                setTimeout(()=>{
                    fetchUser()
                },5000000)
            }
        }catch(error){
            console.log("Error in AppContext");
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user){
            fetchUser();
        }
    },[user])

    useEffect(()=>{
        fetchRooms();
    })

  // ✅ Axios Interceptor to attach token automatically
  useEffect(() => {
    const attachToken = async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    };

    const interceptor = axios.interceptors.request.use(attachToken);

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [getToken]);


    const value={
        currency,navigate,user,getToken,isOwner,setIsOwner,axios,showHotelReg,setShowHotelReg,searchedCities,setSearchedCities,rooms,setRooms
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>useContext(AppContext)