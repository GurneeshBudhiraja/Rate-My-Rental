import React, { useEffect } from "react";
import { Fade as HamburgerIcon } from "hamburger-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Store/AuthSlice/AuthSlice";
import { auth } from "../../Appwrite/Services/services";

function Hamburger() {
  const [isOpen, setOpen] = React.useState(false);
  const loggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [scroll, setScroll] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
      setOpen(false);
    });
    return () => {
      window.removeEventListener("scroll", window);
    };
  }, []);
  const options = [
    {
      name: "Sign Up",
      show: loggedIn ? false : true,
      link: "/signup",
      icon: <i class="fa-regular fa-user"></i>,
    },
    {
      name: "Login",
      show: loggedIn ? false : true,
      link: "/login",
      icon: <i class="fa-solid fa-users-viewfinder"></i>,
    },
    {
      name: "My reviews",
      show: loggedIn ? true : false,
      link: "/myreviews",
      icon: <i class="fa-regular fa-file"></i>,
    },
    {
      name: "Contact Us",
      show: true,
      link: "/contact",
      icon: <i class="fa-regular fa-id-badge"></i>,
    },
    {
      name: "About Us",
      show: true,
      link: "/about",
      icon: <i class="fa-solid fa-info"></i>,
    },
    {
      name: "Logout",
      show: loggedIn ? true : false,
      link: "#",
      action: logoutUser,
      icon: <i class="fa-solid fa-right-from-bracket"></i>,
    },
  ];

  return (
    <div className="lg:hidden">
      <HamburgerIcon
        toggled={isOpen}
        toggle={setOpen}
        size={18}
        duration={0.4}
        rounded
        color={isOpen ? "#3287ffd2" : "white"}
      />
      {isOpen && (
        <div
          className={`text-white fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 border-t-2 border-[#3287ffd2] bg-neutral-950 border-b min-h-[25%]`}
        >
          <ul
            className={`flex flex-col gap-2 mt-4 font-semibold max-w-prose mx-auto z-10 `}
          >
            {options.map((option, index) => {
              if (option.show) {
                return (
                  <li
                    key={index}
                    className={`border-2 p-2 items-center rounded-md border-[#3287ffd2]`}
                  >
                    <Link to={option.link}>
                      <button
                        className="flex items-center justify-between min-w-[98%] p-2"
                        onClick={
                          option.action &&
                          (async () => {
                            try {
                              await auth.logout();
                              dispatch(logoutUser());
                            } catch (error) {
                              console.log(error.message);
                            } finally{
                              setTimeout(() => {
                                navigate("/");
                              },1000)
                            }
                          })
                        }
                      >
                        <div className="flex items-center w-full justify-between">
                          <div>{option.name}</div>
                          <div className={`text-white`}>{option.icon}</div>
                        </div>
                      </button>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Hamburger;
