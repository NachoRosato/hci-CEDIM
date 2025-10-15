const GetToken = (search) => {
  const token = new URLSearchParams(search).get("token");
  return token;
};

export default GetToken;
