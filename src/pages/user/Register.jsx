import Input from "@/components/shared/Input";
import Password from "@/components/shared/Password";
import RequestLoader from "@/components/shared/RequestLoader";
import { useRegister } from "@/hooks";
import { images, userRouteLinks } from "@/services";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const { handleSubmit, isLoading } = useRegister();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <section className="h-screen overflow-hidden bg-white">
      <div className="h-full flex items-center">
        <div className="h-full px-4 py-6 sm:p-6 w-full flex items-center justify-center flex-wrap overflow-auto text-center relative no-scrollbar">
          <div className="w-full  max-w-[440px] mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <Link
                to={userRouteLinks.home.path}
                className="flex flex-col items-center gap-2"
              >
                <img src={images.LoginLogo} alt="" className="h-12 w-[138px]" />
              </Link>
              <div className="flex flex-col gap-2">
                <h4 className="self-stretch text-center justify-start text-black-300 text-3xl font-bold leading-9">
                  EasyBricks Super Admin
                </h4>
                <p className="self-stretch text-center justify-start text-gray-700 text-lg font-normal leading-snug w-[65%] mx-auto">
                  Set up your credentials to access full administrative control.
                </p>
              </div>
            </div>
            <form
              action="#"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <Input
                label="Username"
                labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
                type="name"
                placeholder="Enter your username"
                name="name"
                required
              />

              <Input
                label="Email"
                labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
                type="email"
                placeholder="Enter your email address"
                name="email"
                required
              />

              <Password
                label="Password"
                labelClass="self-stretch justify-start text-gray-700 text-base font-normal  leading-normal text-left"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Password
                label="Confirm Password"
                labelClass="self-stretch justify-start text-gray-700 text-base font-normal  leading-normal text-left"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <div className="mt-6">
                <button type="submit" className="btn_violet w-full max-w-none">
                  Register
                </button>
                <div className="flex items-center justify-center gap-1 mt-6">
                  <div className="text-gray-800">Already have an account?</div>
                  <Link
                    to={userRouteLinks.home.path}
                    className="self-stretch text-center justify-start text-main-600 font-bold text-base leading-snug cursor-pointer hover:text-text-600 transition_common"
                  >
                    Login
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center gap-1 mt-10">
                  <div className="text-gray-800">
                    By creating an account agree to our
                  </div>
                  <div className="text-gray-800 flex items-center justify-center gap-1">
                    <Link
                      to="/"
                      className="self-stretch text-center justify-start text-main-600 font-bold text-base leading-snug cursor-pointer hover:text-text-600 transition_common"
                    >
                      Terms of Service
                    </Link>
                    &
                    <Link
                      to="/"
                      className="self-stretch text-center justify-start text-main-600 font-bold text-base leading-snug cursor-pointer hover:text-text-600 transition_common"
                    >
                      Privacy Policy.
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isLoading && <RequestLoader />}
    </section>
  );
}

export default Register;
