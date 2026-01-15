import Input from "@/components/shared/Input";
import Password from "@/components/shared/Password";
import RequestLoader from "@/components/shared/RequestLoader";
import AutoLoginRedirect from "@/components/shared/AutoLoginRedirect";
import { useLogin } from "@/hooks";
import { images, userRouteLinks } from "@/services";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function Login() {
  const { handleSubmit, isLoading } = useLogin();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const location = useLocation();
  
  // Check if there's a token in URL (auto-login scenario)
  const searchParams = new URLSearchParams(location.search);
  const hasToken = searchParams.get("token");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";

  const slides = [
    {
      image: images.LoginImage,
      title: "Welcome to Telzen Dashboard",
      description:
        "Take control of your business, track sales, deliveries, and performance efficiently.",
    },
    {
      image: images.LoginImage2,
      title: "Manage Your Business",
      description:
        "Streamline operations and boost productivity with our comprehensive admin tools.",
    },
  ];

  // If auto-login is happening, just show the redirect component
  if (hasToken) {
    return <AutoLoginRedirect />;
  }

  return (
    <>
      <AutoLoginRedirect />
      <section className="h-screen overflow-hidden  bg-main-700 flex flex-col justify-center md:justify-start p-4">
      {/* <div className="w-full md:w-1/2 h-max md:h-full p-8">
        <div className="flex items-center md:items-start justify-center md:justify-start">
          <Link to={userRouteLinks.home.path}>
            <img
              src={images.LoginLogo}
              alt="Telzen Logo"
              className="w-[149px]"
            />
          </Link>
        </div>
        <div className="h-full flex items-center justify-center">
          <div className="w-full max-w-[440px] flex flex-col gap-4 md:gap-8">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-gray-700 text-xl md:text-3xl font-bold leading-tight tracking-wide text-center md:text-left">
                Login to Telzen
              </h1>
              <p className="text-gray-600 text-sm md:text-base font-normal leading-relaxed text-center max-w-[300px]">
                Manage orders, track commissions, and grow your income with
                Telzen.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 md:gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="text-text-700 text-sm font-bold">
                  Username
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your username"
                  name="email"
                  className="input"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-text-700 text-sm font-bold">
                  Password
                </label>
                <Password
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleInputChange}
                  value={formData.password}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className="w-full disabled:bg-neutral-200 bg-main-700 disabled:text-neutral-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Login
              </button>

            </form>
          </div>
        </div>
      </div> */}
      <div className="flex items-center md:items-start justify-center md:justify-start">
        <Link to={userRouteLinks.home.path}>
          <img src={images.whiteLogo} alt="Telzen Logo" className="w-[149px]" />
        </Link>
      </div>
      <div className="w-full h-full relative items-center justify-center flex">
        <div className="w-full max-w-[576px] mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet custom-bullet",
              bulletActiveClass:
                "swiper-pagination-bullet-active custom-bullet-active",
            }}
            loop={true}
            speed={800}
            effect="slide"
            className="w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center text-center text-white">
                  <div className="w-full mb-8 rounded-lg overflow-hidden">
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-[344px] object-contain"
                      onError={(e) => {
                        console.error("Image failed to load:", e.target.src);
                      }}
                      // onLoad={() => {
                      //   console.log("Image loaded successfully:", slide.image);
                      // }}
                    />
                    {/* <img
                      src={images.ellipse}
                      alt={`Slide ${index + 1}`}
                      className="absolute bottom-[82px] left-9 w-max h-max object-contain -z-10"
                      onError={(e) => {
                        console.error("Image failed to load:", e.target.src);
                      }}
                      // onLoad={() => {
                      //   console.log("Image loaded successfully:", slide.image);
                      // }}
                    /> */}

                    <div
                      className="absolute bottom-[70px] left-5 -z-10 w-16 h-16 rounded-full 
                        bg-[radial-gradient(circle_at_30%_30%,#CCFFF0_0%,#2AF2B6_25%,#00D6A0_55%,#00C896_75%,#006B4F_100%)]
                      "
                    ></div>
                  </div>

                  <div className="max-w-full px-4">
                    <h2 className="text-2xl font-bold mb-4 text-white font-inter">
                      {slide.title}
                    </h2>
                    <p className="text-white text-sm leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {isLoading && <RequestLoader />}
    </section>
    </>
  );
}

export default Login;
