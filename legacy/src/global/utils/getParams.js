const GetParams = (search) => {
  const token = new URLSearchParams(search).get("parametros");
  return token;
};

export default GetParams;
