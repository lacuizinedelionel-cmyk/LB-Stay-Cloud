export function getRedirectPath(role) {
  switch (role) {
    case 'super_admin':
      return '/super-admin/dashboard'
    case 'admin':
    case 'owner':
      return '/admin/dashboard'
    case 'manager':
      return '/admin/dashboard'
    case 'cashier':
    case 'waiter':
      return '/pos'
    case 'chef':
      return '/kitchen'
    default:
      return '/admin/dashboard'
  }
}
