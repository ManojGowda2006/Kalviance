import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-3/5 px-4 py-6 min-h-screen md:min-h-auto min-w-0">
        <div className="flex flex-col items-center border border-gray-400 rounded-lg py-6 px-4 bg-amber-50 shadow-lg w-full max-w-lg min-w-0 mx-auto">
          
          {/* Logo - increased size, same spacing */}
          <img 
            src="https://res.cloudinary.com/dyadcusix/image/upload/v1755081636/WhatsApp_Image_2025-08-13_at_14.33.37_339a255d-removebg-preview_2_vjhw62.png" 
            alt="kalvianpng" 
            className="bg-amber-50 w-32 h-auto m-1 border-2"
          />
          
          {/* Heading - same spacing */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-950 mt-1 mb-4 text-center pb-4">
            kalviance
          </h1>

          {/* Google OAuth button */}
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              console.log(credentialResponse);
              try {
                const res = await axios.post(
                  `${VITE_API_URL}/auth/google`,
                  {
                    token: credentialResponse.credential,
                  },
                  { withCredentials: true }
                );
                if (res.status === 200) {
                  console.log("Login Successful");
                  alert("Login Successful");
                  navigate("/achievements");

                }
              } catch (error) {
                console.error("Login Error:", error);
                alert("Your login attempt was unsuccessful. Access is restricted to users with a valid Kalvium Community email address. Please use your registered Kalvium email to continue.");
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            logo_alignment="left"
            className="w-full bg-blue-950 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
            size="large"
            ux_mode="popup"
            theme="outline"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex md:w-[40%] bg-blue-950 justify-center items-center p-4 min-w-0">
        <img
          src="https://res.cloudinary.com/dyadcusix/image/upload/v1755081155/WhatsApp_Image_2025-08-13_at_14.33.37_707340d1-removebg-preview_kvkr2c.png"
          alt="User login illustration"
          className="w-full h-150 bg-blue-950 object-contain"
        />
      </div>
    </div>
  );
};

export default Login;
