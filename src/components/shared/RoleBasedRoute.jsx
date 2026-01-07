import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { hasRouteAccess } from '@/services';
import UnauthorizedAccess from '@/pages/admin/UnauthorizedAccess';

// Component to protect routes based on user role
const RoleBasedRoute = ({ children, requiredActivePath, showUnauthorized = false }) => {
  const { userRole } = useSelector((state) => state.auth);
  
  // If no role is available, redirect to default route
  if (!userRole) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  // Check if user has access to this route
  const hasAccess = hasRouteAccess(userRole, requiredActivePath);
  
  if (!hasAccess) {
    if (showUnauthorized) {
      return <UnauthorizedAccess />;
    }
    // Redirect to dashboard if no access
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return children;
};

export default RoleBasedRoute;