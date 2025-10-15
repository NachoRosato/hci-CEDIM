import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { ContainerEditor } from "./localStyle";
import {
  BarContainerEF,
  ContainerContadorCaracEF,
  ProgressBarEF,
} from "../ExamenFisico/localStyle";

const QuillExFisico = ({
  editorName,
  heightCustom,
  contadorLimite,
  opcEditorTools,
  onChangeInput,
  startText,
}) => {
  const [value, setValue] = useState("");
  const [contadorCarac, setContadorCarac] = useState(0);
  const quillRef = useRef(null); // Create a ref to hold the Quill instance

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
  const handleProcedureContentChange = () => {
    const editor = quillRef?.current?.getEditor();
    const text = editor.getText();
    if (text.length <= contadorLimite + 1) {
      setValue(editor.root.innerText);
      //guarda donde tiene que guardar
      onChangeInput({ target: { value: editor.root.innerText } });
    } else {
      // Si se excede al tipear, cortamos el texto
      editor.deleteText(contadorLimite, text.length);
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
        const editor = quillRef?.current?.getEditor();
        setValue(editor.root.innerText);
        //guarda por fuera
        onChangeInput({ target: { value: editor.root.innerText } });
      }
    }
  }, [quillRef.current]);

  const handleKeyDown = (e) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const text = editor.root.innerText;
      const currentLength = text.length;
      // Permitir siempre Backspace y Delete para que el usuario pueda borrar
      if (
        currentLength >= contadorLimite &&
        e.key !== "Backspace" &&
        e.key !== "Delete"
      ) {
        e.preventDefault();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedText = e.clipboardData.getData("text");
    const editor = quillRef.current.getEditor();

    const currentTextLength = editor.getText().trim().length;
    const pastedLength = pastedText.length;

    if (currentTextLength + pastedLength <= contadorLimite) {
      const selection = editor.getSelection();
      if (selection) {
        editor.insertText(selection.index, pastedText);
      }
    } else {
      alert("No se puede pegar: excede el límite de caracteres.");
    }
  };
  //calculo siemrpe los carac html
  const calcularCarac = () => {
    const editor = quillRef.current.getEditor();
    if (contadorLimite > editor.root.innerText.length) {
      if (editor.root.innerText.length > 1) {
        setContadorCarac(contadorLimite - editor.root.innerText.length);
      } else {
        setContadorCarac(contadorLimite);
      }
    } else {
      setContadorCarac(-1);
    }
  };

  useEffect(() => {
    if (value) {
      calcularCarac();
    }
  }, [value]);

  return (
    <>
      <ContainerEditor heightCustom={heightCustom}>
        <ReactQuill
          id={editorName}
          className="quillText"
          theme="snow"
          modules={modules}
          ref={quillRef}
          formats={formats}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onChange={(e) => handleProcedureContentChange(e)}
        />
      </ContainerEditor>
      <ContainerContadorCaracEF>
        <BarContainerEF>
          <ProgressBarEF
            progress={(contadorCarac / contadorLimite) * 100}
          ></ProgressBarEF>
        </BarContainerEF>
      </ContainerContadorCaracEF>
    </>
  );
};

export default QuillExFisico;
