import React, { useId, useState, useEffect } from "react";
import {
  Login,
  Signup,
  Logout,
  Logo,
  Button,
  Hamburger,
} from "../Components/components";
import { logoutUser } from "../Store/AuthSlice/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { auth } from "../Appwrite/Services/services";

function Header() {
  const loggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [scroll, setScroll] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
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
    },
    {
      name: "Login",
      show: loggedIn ? false : true,
      link: "/login",
    },
    {
      name: "My reviews",
      show: loggedIn ? true : false,
      link: "/myreviews",
    },
    {
      name: "Contact Us",
      show: true,
      link: "/contact",
    },
    {
      name: "About Us",
      show: true,
      link: "/about",
    },
    {
      name: "Logout",
      show: loggedIn ? true : false,
      action: logoutUser,
      link: "#",
    },
  ];
  return (
    <header
      className={`z-50 flex justify-between lg:justify-around  items-center flex-wrap top-0 w-full px-2 transition-all duration-500 bg-[#0a0a0a] border-b-2 2xl:px-20   ${
        scroll ? "bg-opacity-30" : "bg-opacity-100"
      } `}
    >
      <div className="flex justify-between items-center w-full md:max-w-prose md:mx-auto  lg:mx-0 lg:w-fit ">
        <div style={{ marginTop: "0.4rem", marginLeft: "0rem" }}>
          <Link to="/">
            <Logo className="" />
          </Link>
        </div>
        <Hamburger options={options} />
      </div>
      <ul className="lg:flex ml-auto gap-4 pr-10  text-theme hidden">
        {options.map((option) => {
          const id = useId();
          if (option.show == true) {
            return (
              <li key={id}>
                <Link to={option.link}>
                  <Button
                    children={option.name}
                    className="font-semibold tracking-wide hover:text-gray-300 transition-all duration-300"
                    onClick={
                      option.action &&
                      (async () => {
                        try {
                          await auth.logout();
                          dispatch(logoutUser());
                        } catch (error) {
                          console.log(error.message);
                        } finally {
                          setTimeout(() => {
                            navigate("/")
                          },1000)
                        }
                      })
                    }
                  />
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </header>
  );
}

export default Header;
