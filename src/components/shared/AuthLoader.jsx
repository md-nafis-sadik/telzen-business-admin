import { images } from "@/services";

function AuthLoader() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white flex items-center justify-center z-[999]">
      <div className="rounded-md flex items-center justify-center bg-white">
        <div className="w-full">
          <img
            src={images.logoIcon}
            alt="Logo"
            className="w-32 mx-auto mb-4 animate-bounce"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthLoader;
