import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { authContext } from '../../store/AuthContext'


async function getItems() {


  // const navigate = useNavigate()

  const responseData = [];
  let user = JSON.parse(localStorage.getItem("user"))
  let token = localStorage.getItem("token")
  await axios.get(`http://localhost:8090/api/notes/`+user, { headers: { Authorization: "Bearer " + token } })
    .then((res) => {
     
        // console.log(res.data);
      if (!res.status === 200) {
        throw new Error("Something went wrong");
      }

      responseData.push(res.data);
    }

    )
.catch((err)=>{
  alert("Token is expired")
  localStorage.removeItem("token")
  localStorage.removeItem("user")
})
  console.log("Demeli", responseData);
  return responseData
}



export default getItems;