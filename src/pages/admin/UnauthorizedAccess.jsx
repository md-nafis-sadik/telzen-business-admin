import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDefaultRoute, UnauthorizedIconSvg } from "@/services";

const UnauthorizedAccess = () => {
  const { userRole } = useSelector((state) => state.auth);
  const defaultRoute = getDefaultRoute(userRole);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <UnauthorizedIconSvg />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. Your current role (
            {userRole}) does not allow access to this resource.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to={defaultRoute}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Dashboard
          </Link>

          <p className="text-sm text-gray-500">
            If you believe this is an error, please contact your system
            administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
