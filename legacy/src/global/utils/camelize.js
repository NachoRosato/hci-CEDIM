const camelize = (string) => {
  //Pascal case renombrar
  if (string !== undefined) {
    return string.replace(/\w\S*/g, function (t) {
      return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
    });
  } else {
    return "";
  }
};

export default camelize;
