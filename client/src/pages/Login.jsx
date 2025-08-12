import React from "react";
import LogoIcon from "../icons/LogoIcon";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-3/5 px-6 py-8 min-h-screen md:min-h-auto min-w-0">
        <div className="flex flex-col items-center border border-gray-400 rounded-lg py-8 px-6 bg-amber-50 shadow-lg w-full max-w-lg min-w-0 mx-auto">
          {/* Logo */}
          <img src="/logokalvian.png" alt="kalvianpng" className="bg-amber-50"/>
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 flex items-center gap-2 mb-8 pt-5 break-words">
            kalviance.
          </h1>

          {/* Google OAuth button */}
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            logo_alignment="left"
            className="w-full bg-blue-950 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
          />
        </div>
      </div>

      {/* Right Side - hidden on mobile, visible on md+ */}
      <div className="hidden md:flex md:w-2/5 bg-blue-950 justify-center items-center p-6 min-w-0">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
          alt="User login illustration"
          className="max-w-full w-[40vw] min-w-[150px]"
        />
      </div>
    </div>
  );
};

export default Login;
