import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Layout, Login, Signup } from "./Components/components.js";
import {
  Home,
  AboutUs,
  ContactUs,
  ShowReviews,
  AddReview,
  MyReviews,
  NotFound,
} from "./Pages/pages.js";
import LoggedIn from "./utils/LoggedIn";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/reviews/:addressValue" element={<ShowReviews />} />
            <Route path="addreview" element={<AddReview />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<LoggedIn />}>
              <Route path="/myreviews" element={<MyReviews />} />
            </Route>
          </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
