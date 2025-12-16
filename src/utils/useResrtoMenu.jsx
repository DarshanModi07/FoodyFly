import {useState,useEffect} from "react"
import restroInfo from "../../public/restroInfo.json";

export const useRestroMenu = (id) => {
    
    const index = parseInt(id); 

    const[ data, setData] = useState(restroInfo[index]);

    useEffect(() => {
        setData(restroInfo[index]);
        console.log(data);
    },[index]);

    return data;
}