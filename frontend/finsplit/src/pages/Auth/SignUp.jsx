import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import AuthLayout from '../../components/layouts/AuthLayout';
import { UserContext } from '../../context/UserContext';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';
import uploadImage from '../../utils/uploadImage';


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext); 
  const navigate = useNavigate();

  // handle sign up form submit
  const handleSignUp = async (e) => { 
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName){
      setError("Please enter your name");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email adress");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

    // signup api call
    try {

      // upload profile picture if provided
      if (profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user); // Assuming updateUser is a function to set user context
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message || "Sign up failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-10 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />


          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Capuccino Asasino"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="WelcomeUser@iitk.ac.in"
              type="text"
            />
            <div className='col-span-2'>
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Minimum 8 Characters"
                type="password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
