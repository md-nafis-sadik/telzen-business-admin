import { wrong } from "@/services/images";

function SomethingWrong({
  wrapperClass = "",
  message = "Something Went Wrong",
}) {
  const handleReloadClick = () => {
    window.location.reload();
  };
  return (
    <section
      className={`w-full h-full flex items-center justify-center bg-white p-6 rounded-xl ${wrapperClass}`}
    >
      <div>
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
          <div className="w-full max-w-[440px] mx-auto">
            <img src={wrong} alt="" className="w-full" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">{message}</h2>
          <button
            type="button"
            className="px-6 py-3 rounded-full bg-white-200 hover:bg-white-200 border-secondaryColor hover:border-white-200 text-whiteHigh w-full max-w-max normal-case font-normal"
            onClick={handleReloadClick}
          >
            Reload Page
          </button>
        </div>
      </div>
    </section>
  );
}

export default SomethingWrong;
