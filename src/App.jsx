
import "./App.css";
import { Route, RouterProvider, Routes, BrowserRouter } from "react-router-dom";
import {
  Layout,
  Login,
  Signup,
} from "./Components/components.js";
import {
  Home,
  AboutUs,
  ContactUs,
  ShowReviews,
  AddReview,
  MyReviews,
  NotFound,
} from "./Pages/pages.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/reviews/:addressValue" element={<ShowReviews />} />
          <Route path="addreview" element={<AddReview />} />
          <Route path="/myreviews" element={<MyReviews />} />
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
