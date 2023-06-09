import Login from './login-jwt/login';
import Register from './login-jwt/register';
import Crud from './crud_tasks/crud';
import UploadCSV from './uploadcsv/uploadcsv';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Crud />} />
        <Route path="register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/uploadcsv" element={<UploadCSV />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
