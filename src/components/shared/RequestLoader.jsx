function RequestLoader() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999999]">
      <div className="w-20 h-20 rounded-md flex items-center justify-center bg-white">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main-500 border-r-transparent"
          role="status"
        ></div>
      </div>
    </div>
  );
}

export default RequestLoader;
