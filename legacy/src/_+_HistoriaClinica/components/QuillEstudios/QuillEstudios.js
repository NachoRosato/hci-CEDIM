import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { ContainerEditor } from "./localStyle";

const QuillEstudios = ({
  editorName,
  heightCustom,
  informeName,
  startText,
  txtInfSelected,
  setTxtInfSelected,
  setContadorCarac,
  contadorCarac,
  contadorLimite,
  setAlertOnCopy,
  opcEditorTools,
  tipoEstudio,
  setTextoSinTags,
  txtEditado,
}) => {
  const quillRef = useRef(null); // Create a ref to hold the Quill instance
  const quillLimit = useRef(false);
  const [readOnly, setReadOnly] = useState(false);

  const modules = {
    toolbar: !opcEditorTools
      ? []
      : [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          [{ list: "ordered" }, { list: "bullet" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }], // add's image support
          ["clean"],
        ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "color",
    "image",
    "background",
    "align",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProcedureContentChange = (content) => {
    const doc = document.querySelector(".ql-editor");
    const editor = quillRef?.current?.getEditor();
    if (doc !== null) {
      setTextoSinTags(editor.root.innerHTML);
      calcularCarac();
    }
  };

  //valida carac iniciales
  useEffect(() => {
    if (startText) {
      if (quillRef.current && quillRef.current !== null) {
        quillRef.current.setEditorContents(
          quillRef.current.getEditor(),
          startText
        );
        validacionCarac();
      }
    }
  }, [quillRef.current]);

  //valida limite de carac apenas inicia el componente quill
  const validacionCarac = () => {
    if (contadorLimite > contadorCarac) {
      if (tipoEstudio === "Informes") {
        if (
          txtEditado !== null &&
          txtEditado.resultadosEstInf !== null &&
          txtEditado.resultadosEstInf !== undefined
        ) {
          if (
            contadorLimite - txtEditado.resultadosEstInf[0].resultado.length <=
            0
          ) {
            setContadorCarac(-1);
            setReadOnly(true);
            quillLimit.current = true;
          } else {
            setContadorCarac(
              contadorLimite - txtEditado.resultadosEstInf[0].resultado.length
            );
          }
        } else {
          setContadorCarac(0);
        }
      } else {
        if (
          txtEditado !== null &&
          txtEditado.resultadosLabo !== null &&
          txtEditado.resultadosLabo !== undefined
        ) {
          if (
            contadorLimite - txtEditado.resultadosLabo[0].resultado.length <=
            0
          ) {
            setContadorCarac(-1);
            setReadOnly(true);
            quillLimit.current = true;
          } else {
            setContadorCarac(
              contadorLimite - txtEditado.resultadosLabo[0].resultado.length
            );
          }
        } else {
          setContadorCarac(0);
        }
      }
    }
  };

  //funcion para copiar texto evolucion desde los botones o seleccionando
  useEffect(() => {
    const editor = quillRef?.current?.getEditor();
    if (
      txtInfSelected !== "" &&
      txtInfSelected !== null &&
      txtInfSelected !== undefined &&
      editor
    ) {
      // Detectar si el contenido es HTML
      const isHTML = /<[^>]*>/.test(txtInfSelected);

      if (isHTML) {
        // Si es HTML, usar dangerouslyPasteHTML para mantener el formato
        try {
          // Obtener la posición actual del cursor
          const range = editor.getSelection();
          const insertPosition = range ? range.index : editor.getLength();

          // Insertar el HTML usando dangerouslyPasteHTML
          editor.clipboard.dangerouslyPasteHTML(insertPosition, txtInfSelected);

          // Actualizar el estado del editor
          setTextoSinTags(editor.root.innerHTML);
          calcularCarac();
          setTxtInfSelected("");
        } catch (error) {
          console.error("Error al pegar HTML:", error);
          // Fallback: insertar como texto plano
          let largo = editor.getLength();
          let stringPaste = `${informeName}:\n ${txtInfSelected}`;
          if (
            contadorLimite - guardarStringTags().length >=
            stringPaste.length
          ) {
            editor.insertText(largo + 1, stringPaste);
            setTextoSinTags(editor.root.innerHTML);
            calcularCarac();
            setTxtInfSelected("");
          } else {
            setAlertOnCopy(true);
          }
        }
      } else {
        // Si no es HTML, usar el método original de insertText
        let largo = editor.getLength();
        let stringPaste = `${informeName}:\n ${txtInfSelected}`;
        if (contadorLimite - guardarStringTags().length >= stringPaste.length) {
          editor.insertText(largo + 1, stringPaste);
          setTextoSinTags(editor.root.innerHTML);
          calcularCarac();
          setTxtInfSelected("");
        } else {
          setAlertOnCopy(true);
        }
      }
    }
  }, [txtInfSelected]);

  const guardarStringTags = () => {
    let doc1 = document.querySelector(".ql-editor");
    if (!doc1) return "";

    doc1 = doc1.outerHTML.toString();
    doc1 = doc1.replaceAll('contenteditable="true"', "");
    doc1 = doc1.replaceAll('class="ql-editor"', "");
    doc1 = doc1.replaceAll('data-gramm="false"', "");
    doc1 = doc1.replaceAll("<div   >", "");
    doc1 = doc1.replaceAll("</div>", "");
    doc1 = doc1.replaceAll("<p><br></p>", ""); // Eliminar párrafos vacíos
    doc1 = doc1.replaceAll("<p></p>", ""); // Eliminar párrafos vacíos
    return doc1;
  };

  //calculo siempre los carac html
  const calcularCarac = () => {
    const editor = quillRef?.current?.getEditor();
    const text = editor?.getText();
    let doc1 = document.querySelector(".ql-editor");
    if (!doc1) return;

    doc1 = doc1.outerHTML.toString();
    doc1 = doc1.replaceAll('contenteditable="true"', "");
    doc1 = doc1.replaceAll('class="ql-editor"', "");
    doc1 = doc1.replaceAll('data-gramm="false"', "");
    /*     doc1 = doc1.replaceAll("<div   >", "");
    doc1 = doc1.replaceAll("</div>", "");
    doc1 = doc1.replaceAll("<p><br></p>", ""); // Eliminar párrafos vacíos
    doc1 = doc1.replaceAll("<p></p>", ""); // Eliminar párrafos vacíos */

    if (contadorLimite > doc1.length) {
      if (text.length > 1) {
        setContadorCarac(contadorLimite - doc1.length);
      } else {
        setContadorCarac(contadorLimite);
      }
    } else {
      setReadOnly(true);
      quillLimit.current = true;
      setContadorCarac(-1);
    }
  };

  //accion que habilita nuevamente la edicion una vez superado el limite
  useEffect(() => {
    const handleKeyDown = (event) => {
      window.addEventListener("keydown", function (event) {
        if (quillLimit.current) {
          if (event.key === "Backspace") {
            quillLimit.current = false;
            setReadOnly(false);
            quillRef.current.focus();
          }
        }
      });
      //suprimir lo eliminaria como evento.
      window.addEventListener("keydown", function (event) {
        if (quillLimit.current) {
          if (event.key === "Delete") {
            quillLimit.current = false;
            setReadOnly(false);
            quillRef.current.focus();
          }
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    // Limpieza: eliminar el listener cuando el componente se desmonte o el efecto se vuelva a ejecutar
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ContainerEditor heightCustom={heightCustom}>
      <ReactQuill
        id={editorName}
        className="quillText"
        theme="snow"
        modules={modules}
        ref={quillRef}
        formats={formats}
        readOnly={readOnly}
        onChange={(e) => handleProcedureContentChange(e)}
      />
    </ContainerEditor>
  );
};

export default QuillEstudios;
