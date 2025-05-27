import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ChatPage from "../pages/ChatPage";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/chatpage" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
