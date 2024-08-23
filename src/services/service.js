const getUserDetails = () => {
  return localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;
};

const isLoggedIn = () => {
  return localStorage.getItem("userDetails") || false;
};

const logout = () => {
  localStorage.removeItem("userDetails");
};

export { getUserDetails, isLoggedIn, logout };
