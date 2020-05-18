export const isAdmin = (roles = []) => {
  return roles.includes('Admin');
};