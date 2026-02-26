const isAuthenticated = () => {
  return localStorage.getItem("isAuth") === "true";
};

const loginUser = () => {
  localStorage.setItem("isAuth", "true");
};

const logoutUser = () => {
  localStorage.removeItem("isAuth");
};

module.exports = {
  isAuthenticated,
  loginUser,
  logoutUser,
};
