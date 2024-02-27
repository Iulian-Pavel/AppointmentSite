import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import {Route, Routes} from "react-router-dom";
function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Register />}></Route>
      <Route path="login" element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default App
