import { RouterProvider } from "react-router-dom";
import AuthLoader from "./components/shared/AuthLoader";
import useAuthCheck from "./hooks/useAuthCheck";
import { routes } from "./routes/Router";
import NotifyContainer from "./services/toastify";

function App() {
  const Router = routes;
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <AuthLoader />
  ) : (
    <div className="font-inter bg-white-500">
      <RouterProvider router={Router} />
      <NotifyContainer />

      {/* <AuthRequireModal /> */}
    </div>
  );
}

export default App;
