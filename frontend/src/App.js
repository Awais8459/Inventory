import Login from './login-jwt/login'
import Register from './login-jwt/register'
import Crud from './crud_tasks/crud'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path = "/register" element = {<Register/>}/>
    <Route exact path = "/login" element = {<Login/>}/>
    <Route exact path = "/" element = {<Crud/>}/>
    </Routes>
      </BrowserRouter>
  );
}

export default App;
