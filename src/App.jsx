import { useState } from 'react'
import {Login} from "./components/Login"
import { PageRoutes } from './routes'

import './App.css'

function App() {
  const [isLogged, setIsLogged] = useState(false)

  return (<>
   {/* {!isLogged && <Login/>} */}
   <PageRoutes/>
   </>
  )
}

export default App
