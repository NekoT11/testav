import { Route, Routes } from "react-router-dom"
import { Reg } from "./components/register.jsx"
import { Log } from "./components/log.jsx"
import { Profile } from "./components/profile.jsx"


function App() {

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Reg />} />
        <Route path="/log" element={<Log />}/>
        <Route path="/profile" element={<Profile />}/>

      </Routes>

    </>
  )
}

export default App
