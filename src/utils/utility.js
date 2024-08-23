export const getLogedInUser = () =>
  localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails")).user
    : null;
