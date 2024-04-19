import React from "react";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Button } from "../Components/components";
import HomeMission from "./HomeMission";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { auth } from "../Appwrite/Services/services";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logoutUser } from "../Store/AuthSlice/AuthSlice";
import {
  setSearchAddress,
  clearSearchAddress,
} from "../Store/AddressSlice/AddressSlice";
import { NavLink, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasSuggestions, setHasSuggestions] = React.useState(false);
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
      if (!addressValue.trim()) {
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
        document.querySelector("#addressInput").focus();
      } catch (error) {
        dispatch(logoutUser());
      }
    };
    retrieveUser();
  }, []);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    setAddressValue(results[0]["formatted_address"]);
  };

  return (
    <div className="bg-[#0a0a0]">
      <Analytics />
      <SpeedInsights/> 
      <div className='bg-[url("./pictures/bg-house.webp")] h-[75vh] overflow-x-scroll bg-cover bg-repeat bg-center tracking-wider flex justify-center items-center brightness-90 '>
        <div className="flex flex-col justify-center items-center px-4 h-fit bg-black/45  backdrop-blur-lg py-5 backdrop-brightness-105 rounded-xl max-w-prose mx-auto lg:w-full md:w-full  ">
          <div className="flex flex-col items-center justify-center gap-5 max-w-prose mx-auto  md:w-[80%]">
            <h4 className="font-bold text-4xl text-black">
              Rate My <span className="font-semibold text-white">Rental</span>
            </h4>
            <p className="text-gray-100 font-semibold tracking-widest ">
              Know before you rent
            </p>
            <div className="flex flex-col w-full">
              <PlacesAutocomplete
                value={addressValue}
                onChange={setAddressValue}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div className="relative">
                    <input
                      {...getInputProps({
                        placeholder: "Enter full address...",
                        className: `outline-none w-full tracking-wide rounded-md border font-semibold border-2 ${
                          error
                            ? "border-rose-500 caret-rose-500"
                            : "border-[#0a0a0a] "
                        } bg-gray-100 px-2 py-2`,
                        id: "addressInput",
                        onFocus: () => setHasSuggestions(true),
                      })}
                    />
                    <div className="absolute left-0 w-full z-10">
                      {hasSuggestions && suggestions.length > 0 && (
                        <div className=" border border-gray-300 rounded-md shadow-md mt-2 overflow-auto h-[25vh] bg-[#000] ">
                          {suggestions.map((suggestion) => {
                            const style = {
                              backgroundColor: suggestion.active
                                ? "#4071d0"
                                : "#0a0a0a",
                              color: "white",
                              border: "1px solid #4071d0",
                            };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  style,
                                })}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                              >
                                {suggestion.description}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              {error && <span className="text-red-500 text-sm ">{error}</span>}
            </div>
            <div className="flex flex-col justify-center tracking-wide gap-3 items-center">
              {/* Button Component */}
              <Button
                children="Search for Review"
                classProps="bg-gray-950/70 text-gray-50 tracking-wider border border-gray-50 px-2 py-2 rounded-md w-full cursor-pointer hover:shadow-inner   transition-all duration-300  hover:shadow-gray-200 "
                onClick={addStoreAdress}
              />
              <NavLink to={"addreview"}>
                <Button
                  children="Add a Review"
                  classProps="bg-gray-950/70 text-gray-50 tracking-wider border border-gray-50 px-2 py-2 rounded-md w-full cursor-pointer hover:shadow-inner   transition-all duration-300  hover:shadow-gray-200 "
                />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <HomeMission />
      {/* testimonial section */}
      <div className="w-full flex justify-center mt-1" onClick={top}>
        <Button
          children={<i class="fa-solid fa-angle-up"></i>}
          classProps="animate-bounce delay-1000 cursor-pointer drop-shadow-sm bg-white/75 rounded-full w-fit text-center py-1 px-2"
        />
      </div>
      <hr className="border-[#3771d2] border my-4" />
    </div>
  );
}

export default Home;
