const authenticated = () => {
  let authentication = false;
  const token = localStorage.token;
  if (token) {
    authentication = true;
  }
  return authentication;
};

export default authenticated;