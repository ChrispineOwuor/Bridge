//this ensures that only links based on the roles will appear in the side bar
export const LayoutProvision = function ({ children, userRole, linkRoles }) {
  return <>{linkRoles.includes(userRole) ? children : null}</>;
};

