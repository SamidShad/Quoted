import CreatePost from "./CreatePost";
import Navbar from "../components/Navbar";
import TabButtons from "../components/TabButtons";
import Posts from "./Posts";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopularPosts from "./PopularPosts";
import DislikedPosts from "./DislikedPosts";
import Footer from "../components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer theme="dark" />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TabButtons />
              <Posts />
            </>
          }
        />
        <Route
          path="/popularposts"
          element={
            <>
              <TabButtons />
              <PopularPosts />
            </>
          }
        />
        <Route
          path="/hatedposts"
          element={
            <>
              <TabButtons />
              <DislikedPosts />
            </>
          }
        />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
