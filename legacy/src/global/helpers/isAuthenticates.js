const isAuthenticated = () => {
    return !!sessionStorage.token;
};
  
  export default isAuthenticated;


 