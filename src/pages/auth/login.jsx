// import { ErrorMessage, Field, Form, Formik } from "formik";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { axiosOpen } from "../../api/axios";
import { companyLogo } from "../../assets";
import { ROUTESCONSTANTS } from "../../constants/Routes";
import { getLogedInUser } from "../../utils/utility";
const LOGIN_URL = "user/login";

const Login = () => {
  const logedInUser = getLogedInUser();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [visible, setVisible] = useState(false);

  console.log("logedInUser", logedInUser);

  // Initial form values
  const initialValues = {
    user_name: "",
    password: "",
  };

  // Define validation schema
  const validationSchema = Yup.object().shape({
    user_name: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is Required"),
  });

  // Form Submission
  const handleSubmit = async (values, { setSubmitting }) => {
    const requestPayload = {
      ...values,
    };

    if (rememberMe) {
      localStorage.setItem("user_name", values.user_name);
      secureLocalStorage.setItem("password", values.password);
    }

    try {
      const response = await axiosOpen.post(LOGIN_URL, requestPayload);

      if (response.data.status === "ok") {
        handleSuccess(response.data?.data);
      }

      if (response.data.status === "error") {
        handleFailure(response.data?.message);
      }
    } catch (error) {
      handleFailure("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuccess = (userInfo) => {
    const userDetails = {
      user: userInfo,
    };
    toast.success("Login Successfully");
    localStorage.userDetails = JSON.stringify(userDetails);
    // localStorage.setItem("userDetails", JSON.stringify(userInfo));
    navigate(ROUTESCONSTANTS.home);
  };

  const handleFailure = (errorMessage) => {
    toast.error(errorMessage);
  };

  // Handle Remember me
  const handleRememberMe = (e) => {
    if (!e.target.checked) {
      localStorage.removeItem("user_name");
      localStorage.removeItem("password");
    }
    setRememberMe(e.target.checked);
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("user_name");
    const savedPassword = secureLocalStorage.getItem("password");

    if (savedUsername && savedPassword) {
      setRememberMe(true);
      initialValues.user_name = savedUsername;
      initialValues.password = savedPassword;
    }
  }, []);

  // Redirect after login
  if (logedInUser) {
    return <Navigate to={ROUTESCONSTANTS.home} replace={true} />;
  }

  return (
    <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center">
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcom Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please login to your account
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <img src={companyLogo} className="h-[60px]" />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="relative">
                <label
                  htmlFor="user_name"
                  className="text-sm font-bold text-gray-700 tracking-wide"
                >
                  Username
                </label>
                <Field
                  className={`w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                    errors.user_name && touched.user_name ? "text-red-700" : ""
                  }`}
                  type="text"
                  id="user_name"
                  name="user_name"
                  placeholder="Enter your username"
                />
                <ErrorMessage
                  name="user_name"
                  component="div"
                  className="text-red-700"
                />
              </div>
              <div className="mt-8 content-center relative">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-gray-700 tracking-wide"
                >
                  Password
                </label>
                <Field
                  className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type={visible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-700"
                />

                {visible ? (
                  <AiOutlineEye
                    size={25}
                    onClick={() => setVisible(false)}
                    className="absolute top-8 right-0"
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={25}
                    onClick={() => setVisible(true)}
                    className="absolute top-8 right-0"
                  />
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    className="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-indigo-500 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
                >
                  Log in
                </button>
              </div>
              <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                <span>Dont have an account?</span>
                <Link
                  to="/register"
                  className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
                >
                  Register
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
