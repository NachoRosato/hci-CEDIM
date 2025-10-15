import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ContainerEditor } from "./localStyle";
import { useEffect, useRef, useState } from "react";

const Quill = ({
  editorName,
  heightCustom,
  insertText,
  informeName,
  startText,
  setSavedQuill,
  activeSaveQuill,
  updateText,
  valueBuscador,
  setContadorCarac,
  contadorCarac,
  contadorLimite,
  setAlertOnCopy,
  setQuillState,
  setTextInput,
  dictado,
  setValorSeleccionado,
  setQuillPointerIndex,
  quillPointerIndex,
}) => {
  const quillRef = useRef();
  const quillLimit = useRef(false);
  const [readOnly, setReadOnly] = useState(false);
  let datosEdicion = JSON.parse(localStorage.getItem("editandoEvo"));
  let config = localStorage.getItem("config");
  let opcEditorTools = JSON.parse(config).opcEditorTextoHerramientas;

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
    "bullet",
    "link",
    "color",
    // "image",
    "background",
    "align",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProcedureContentChange = (content) => {
    const doc = document.querySelector(".ql-editor");
    const editor = quillRef?.current?.getEditor();
    if (doc !== null) {
      if (editorName === "editor1") {
        localStorage.setItem(
          "editandoEvo",
          JSON.stringify({
            motivoConsulta: valueBuscador,
            evolucion: editor?.editor.delta.ops,
            evoHTML: guardarStringTags(),
          })
        );
        setTextInput(quillRef.current.value);
      }
      calcularCarac();
    }
  };

  const validacionCarac = () => {
    if (contadorLimite > contadorCarac) {
      if (
        datosEdicion !== null &&
        datosEdicion.evoHTML !== null &&
        datosEdicion.evoHTML !== undefined
      ) {
        if (contadorLimite - datosEdicion.evoHTML.length <= 0) {
          setContadorCarac(-1);
          setReadOnly(true);
          quillLimit.current = true;
        } else {
          setContadorCarac(contadorLimite - datosEdicion.evoHTML.length);
        }
      } else {
        setContadorCarac(0);
      }
    }
  };

  //funcion para copiar texto evolucion.
  useEffect(() => {
    const editor = quillRef?.current?.getEditor();
    if (
      insertText !== "" &&
      insertText !== null &&
      insertText !== undefined &&
      editor
    ) {
      let largo = editor.getLength();
      // estoy aca
      let stringPaste = `${informeName}:\n ${insertText}`;
      if (contadorLimite - guardarStringTags().length >= stringPaste.length) {
        editor.insertText(largo + 1, stringPaste);
        calcularCarac();
        setValorSeleccionado("");
      } else {
        setAlertOnCopy(true);
      }
    }
  }, [insertText]);

  useEffect(() => {
    if (Array.isArray(startText)) {
      const editor = quillRef?.current?.getEditor();
      editor.setContents(startText);
      validacionCarac();
    }
  }, [quillRef.current]);

  //disparador de guardado 2do editor en cuestion.
  useEffect(() => {
    const editor = quillRef?.current?.getEditor();
    if (
      activeSaveQuill &&
      activeSaveQuill !== null &&
      activeSaveQuill !== undefined
    ) {
      let dtoSavedQuill = {
        savedQuill: editor.getContents(),
        evoHTML: guardarStringTags(),
      };
      setSavedQuill(dtoSavedQuill);
    }
  }, [activeSaveQuill]);

  //seteo el contenido proveniente de otro editor
  useEffect(() => {
    const editor = quillRef?.current?.getEditor();
    if (
      updateText !== "" &&
      updateText !== null &&
      updateText !== undefined &&
      editor
    ) {
      let largo = editor.getLength();
      editor.deleteText(0, largo + 1);
      editor.setContents(updateText);
      calcularCarac();
    }
  }, [updateText]);

  const guardarStringTags = () => {
    let doc1 = document.querySelector(".ql-editor");
    doc1 = doc1.outerHTML.toString();
    doc1 = doc1.replaceAll('contenteditable="true"', "");
    doc1 = doc1.replaceAll('class="ql-editor"', "");
    doc1 = doc1.replaceAll('data-gramm="false"', "");
    doc1 = doc1.replaceAll("<div   >", "");
    doc1 = doc1.replaceAll("</div>", "");
    return doc1;
  };

  //calculo siemrpe los carac html
  const calcularCarac = () => {
    const editor = quillRef?.current?.getEditor();
    const text = editor?.getText();
    let doc1 = document.querySelector(".ql-editor");
    doc1 = doc1.outerHTML.toString();
    doc1 = doc1.replaceAll('contenteditable="true"', "");
    doc1 = doc1.replaceAll('class="ql-editor"', "");
    doc1 = doc1.replaceAll('data-gramm="false"', "");
    doc1 = doc1.replaceAll("<div   >", "");
    doc1 = doc1.replaceAll("</div>", "");
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
    if (setQuillState) {
      setQuillState(quillRef);
    }
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

  const handleSelectionChange = (range) => {
    if (range && quillPointerIndex !== undefined) {
      setQuillPointerIndex(range.index);
    }
  };

  return (
    <ContainerEditor dictado={dictado} heightCustom={heightCustom}>
      <ReactQuill
        id={editorName}
        className="quillText"
        theme="snow"
        modules={modules}
        ref={quillRef}
        formats={formats}
        readOnly={readOnly}
        onChange={(e) => handleProcedureContentChange(e)}
        onChangeSelection={(e) => handleSelectionChange(e)}
      />
    </ContainerEditor>
  );
};
export default Quill;
