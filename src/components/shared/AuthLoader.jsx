import { images } from "@/services";
import Lottie from "react-lottie";

function AuthLoader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: images.splash_loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white flex items-center justify-center z-[999]">
      <div className="rounded-md flex items-center justify-center bg-white">
        <div className="w-full">
          <Lottie options={defaultOptions} height={500} width={500} />
        </div>
      </div>
    </div>
  );
}

export default AuthLoader;
