import React, { useId, useState, useEffect } from "react";
import {
  Login,
  Signup,
  Logout,
  Logo,
  Button,
  Hamburger,
} from "../Components/components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const loggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [scroll, setScroll] = useState(false);

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
      name: "Logout",
      show: loggedIn ? true : false,
      link: "/logout",
    },
    {
      name: "My reviews",
      show: loggedIn ? true : false,
      link: "/myreviews",
    },
    {
      name: "About Us",
      show: true,
      link: "/about",
    },
    {
      name: "Contact Us",
      show: true,
      link: "/contact",
    },
  ];
  return (
    <header
      className={`z-50 flex justify-between items-center flex-wrap top-0 w-full px-2 transition-all duration-500 bg-[#0a0a0a] border-b-2 ${
        scroll ? "bg-opacity-30" : "bg-opacity-100"
      } `}
    >
      <div className="flex items-center w-full justify-between">
        <div style={{ marginTop: "0.4rem", marginLeft: "0.4rem" }}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <Hamburger options={options} />
      </div>
      <ul className="lg:flex mx-11 gap-4 hidden">
        {options.map((option) => {
          const id = useId();
          if (option.show == true) {
            return (
              <li key={id}>
                <Link to={option.link}>
                  <Button
                    children={option.name}
                    className="flex items-center gap-1 hover:text-neutral-400 transition-all duration-100"
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
