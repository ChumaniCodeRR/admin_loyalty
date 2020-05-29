export const isAdmin = (roles = []) => {
  return roles.includes('Admin');
};

export const isClient = (roles = []) => {
  return roles.includes('Client');
};

export const isManager = (roles = []) => {
  return roles.includes('Manager');
};
