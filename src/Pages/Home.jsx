import React from "react";
import { Button, Input } from "../Components/components";
import HomeMission from "./HomeMission";
import { auth } from "../Appwrite/Services/services";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logoutUser } from "../Store/AuthSlice/AuthSlice";
import {
  setSearchAddress,
  clearSearchAddress,
} from "../Store/AddressSlice/AddressSlice";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addressValue, setAddressValue] = React.useState("");
  const [error, setError] = React.useState("");
  const address = useSelector((state) => state.address);
  // Scroll to top function
  const top = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const addStoreAdress = () => {
    try {
      setError(false);
      dispatch(clearSearchAddress());
      if(!addressValue.trim()){
        setError("Enter a valid address");
        document.getElementById("addressInput").focus();
        return;
      }
      addressValue &&
        dispatch(setSearchAddress(addressValue.trim().toLowerCase()));
      navigate(`/reviews/${addressValue}`);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  React.useEffect(() => {
    const retrieveUser = async () => {
      try {
        const user = await auth.currentUser();
        const { name: userName, email: userEmail } = user;
        dispatch(setUser({ userName, userEmail }));
      } catch (error) {
        dispatch(logoutUser());
      }
    };
    retrieveUser();
  }, []);

  return (
    <div className="bg-black">
      <div className='bg-[url("./pictures/bg-house.webp")] h-[75vh] overflow-x-scroll bg-cover bg-repeat bg-center tracking-wider flex justify-center items-center'>
        <div className="flex flex-col justify-center items-center px-4 h-fit bg-black bg-opacity-30 py-5">
          <div className="flex flex-col items-center gap-5 max-w-prose mx-auto">
            <h4 className="font-bold text-4xl text-black">
              Rate My <span className="font-semibold text-white">Rental</span>
            </h4>
            <p className="text-gray-100 font-semibold tracking-widest ">
              Know before you rent
            </p>
            <div className="flex flex-col items-center w-full">
              {error && <span className="text-red-700  text-shadow-lg px-2 py-2 bg-white/5 backdrop-blur-3xl font-extrabold text-lg mb-2">{error}</span>}
              <input
                id="addressInput"
                type="text"
                autoFocus
                className={`outline-none w-full tracking-wide rounded-md border-2 font-semibold ${error?"border-rose-500":"border-[#0a0a0a]"} bg-gray-100 px-2 py-2 `}
                placeholder="Enter your full address..."
                value={addressValue}
                onChange={(e) => setAddressValue(e.currentTarget.value)}
                required
              />
            </div>
            <div className="flex flex-col tracking-wide gap-3 items-center">
              {/* Button Component */}
              <Button
                children="Search for Review"
                className="appearance-none bg-sky-400 px-2 py-1 rounded-full"
                onClick={addStoreAdress}
              />
              <Link to={"addreview"}>
                <Button
                  children="Add a Review"
                  className="bg-sky-400 px-2 py-1 rounded-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <HomeMission />
      {/* testimonial section */}
      <div className="w-full flex justify-center mt-1" onClick={top}>
        <Button
          children={<i class="fa-solid fa-angle-up"></i>}
          className="animate-bounce delay-1000 drop-shadow-sm bg-white/75 rounded-full w-fit text-center py-1 px-2"
        />
      </div>
      <hr className="border-[#3771d2] border my-4" />
    </div>
  );
}

export default Home;
