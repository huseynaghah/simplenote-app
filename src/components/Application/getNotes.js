import axios from "axios";
import { useContext } from "react";
import { authContext } from '../../store/AuthContext'


async function getItems(){

  
const {currentuser} = useContext(authContext)


    const responseData =[];
    const response = await axios.get(`http://localhost:8090/api/notes/640b1861953d4a7402486432`)
    .then((res)=>{
        
        // console.log(res.data);
        if (!res.status===200) {
            throw new Error("Something went wrong");
          }
          
          responseData.push(res.data);
        }
    
   ) 
        console.log("Demeli", responseData);
        return responseData
}
      

  
  export default getItems;