export const can = (user_permission, permissions = []) => {
  return permissions.includes(user_permission);
};
