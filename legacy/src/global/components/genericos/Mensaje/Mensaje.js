import "./Mensaje.css";

const Mensaje = ({ textoNegrita, texto }) => {
  return (
    <>
      {(texto || textoNegrita) && (
        <div className="ptur-modalBody-mensaje">
          {textoNegrita && (
            <h3 className="rb16m c-latex10">
              {textoNegrita === "" ? "Error inesperado." : textoNegrita}
            </h3>
          )}
          {texto &&
            (typeof texto === "object" ? (
              <div>
                {Array.isArray(texto.props.children) ? (
                  texto.props.children.map((child, index) => (
                    <p key={index}>{child.props.children}</p>
                  ))
                ) : (
                  <p>{texto.props.children.props.children}</p>
                )}
              </div>
            ) : (
              <h3 className="rb16t c-latex10">{texto === "" ? "" : texto}</h3>
            ))}
        </div>
      )}
    </>
  );
};

export default Mensaje;
