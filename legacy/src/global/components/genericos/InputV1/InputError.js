import "./InputV1.css";
const InputError = ({ errorStr, linkStr, onClickChangePassword }) => {
  return (
    <h5 className="rb12m c-danger" style={{ marginTop: 4 }}>
      <span style={{ float: "left" }}>{errorStr}</span>
      {linkStr && (
        //eslint-disable-next-line
        <a
          onClick={onClickChangePassword}
          className="rb14m c-latex30 pointer"
          id="ptur-login-password-linkStr"
          style={{ marginLeft: 6, float: "right" }}
        >
          <u>{linkStr}</u>
        </a>
      )}
    </h5>
  );
};
export default InputError;
