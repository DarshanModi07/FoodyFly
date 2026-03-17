import {useState,useEffect} from "react"
import axios from "axios"
const BASE_URL = import.meta.env.BASE_URL

export const useRestroMenu = (id) => {
    
    const index = parseInt(id);
    const num = index

    const[ data, setData] = useState([]);

    useEffect(()=>{
        const getData = async()=>{
        try{
            console.log(index)
            const res = await axios.get(BASE_URL+"resInfo?id="+num)
            console.log(res)
            setData(res.data)
        }
        catch(err){
            console.log(err);
        }
    }
        getData()
    },[])

    return data;
}