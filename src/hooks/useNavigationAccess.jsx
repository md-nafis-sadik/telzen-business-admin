import { useSelector } from 'react-redux';
import { hasRouteAccess } from '@/services';

export const useNavigationAccess = () => {
  const { userRole } = useSelector((state) => state.auth);

  const hasAccess = (activePath) => {
    return hasRouteAccess(userRole, activePath);
  };

  const canAccessDashboard = () => hasAccess('dashboard');
  const canAccessPayments = () => hasAccess('payments');
  const canAccessBrickList = () => hasAccess('brickList');
  const canAccessBrickStock = () => hasAccess('brickStock');
  const canAccessBrickField = () => hasAccess('brickField');
  const canAccessOrders = () => hasAccess('orders');
  const canAccessStaff = () => hasAccess('staff');
  const canAccessCustomers = () => hasAccess('customers');
  const canAccessProfile = () => hasAccess('profile');

  return {
    hasAccess,
    canAccessDashboard,
    canAccessPayments,
    canAccessStaff,
    canAccessCustomers,
    canAccessProfile,
    canAccessBrickList,
    canAccessBrickStock,
    canAccessBrickField,
    canAccessOrders,
    userRole
  };
};

export default useNavigationAccess;