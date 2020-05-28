export const isAdmin = (roles = []) => {
  return roles.includes('Admin');
};

export const isClient = (roles = []) => {
  return roles.includes('Client');
};
