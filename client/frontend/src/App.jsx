import Users from "./Users"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getUser } from "./redux/userSlice"
import CreateUser from "./CreateUser"
import UpdateUser from "./UpdateUser"

function App() {

  const dispatch = useDispatch()

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      dispatch(getUser(response.data));
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/edit/:id' element={<UpdateUser />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
