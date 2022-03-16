import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Chat from "./Chat";
import Login from "./Login";
import Sidebar from "./Sidebar";
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, ] = useStateValue();
  console.log(user)
  return user && (
   <BrowserRouter>
     <div className="app">
      <div className="app__body">
        <Sidebar />
      <Routes>
            <Route path="/rooms/:roomId" element={<Chat />} />
            <Route path="/" element={<Chat />} />
            <Route path="*" element={<>NOt FOund</>} />
      </Routes>
      </div>
    </div>
   </BrowserRouter>
  ) || (<Login />)
}

export default App;
