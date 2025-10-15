import { useEffect, useRef, useState } from "react";

const useDictadoVoz = ({
  options,
  quillRef,
  setTextInput,
  setTextoDictado,
  quillPointerIndex,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef();
  const textAreaRef = useRef(null);
  const QuillDeltaToHtmlConverter = require("quill-delta-to-html");

  useEffect(() => {
    if (!(`webkitSpeechRecognition` in window)) {
      console.log("Browser not supported");
      return;
    }
    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.interimResults = options?.interimResults || true;
    recognition.lang = options?.lang || "es-ES";
    recognition.continuous = options?.continuous || false;

    if ("webkitSpeechGrammarList" in window) {
      const grammar =
        "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ; | : | ? | ! | ¡ | ¿ | - | () | [] | {} | `` | '' ;";
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text =
          text +
          event.results[i][0].transcript
            .replace(/punto y aparte/gi, ".\n\n")
            .replace(/punto y coma/gi, ";")
            .replace(/dos puntos/gi, ":")
            .replace(/signo de interrogación/gi, "?")
            .replace(/signo de exclamación/gi, "!")
            .replace(/abro paréntesis/gi, "(")
            .replace(/cierro paréntesis/gi, ")")
            .replace(/coma/gi, ",")
            .replace(/punto/gi, ".")
            .replace(/\s([.,?!:;])/g, "$1");
      }

      if (quillRef?.current) {
        setTextoDictado(text);
        const editor = quillRef?.current?.getEditor();
        const delta = editor.getContents();

        // Variables para dividir el Delta
        let accumulatedLength = 0;
        const beforeOps = [];
        const afterOps = [];

        for (const op of delta.ops) {
          const opLength = typeof op.insert === "string" ? op.insert.length : 0;
          if (accumulatedLength + opLength <= quillPointerIndex) {
            beforeOps.push(op);
          } else {
            if (accumulatedLength < quillPointerIndex) {
              // Split the operation
              if (typeof op.insert === "string") {
                beforeOps.push({
                  insert: op.insert.slice(
                    0,
                    quillPointerIndex - accumulatedLength
                  ),
                });
                afterOps.push({
                  insert: op.insert.slice(quillPointerIndex - accumulatedLength),
                });
              } else {
                beforeOps.push(op);
              }
            } else {
              afterOps.push(op);
            }
          }
          accumulatedLength += opLength;
        }

        // Insertar el texto dictado
        beforeOps.push({ insert: text });

        // Recombinar el Delta
        const newDelta = { ops: [...beforeOps, ...afterOps] };
        const converter = new QuillDeltaToHtmlConverter(newDelta.ops, {});
        const updatedHtml = converter.convert();
        setTextInput(updatedHtml);
      } else {
        setTextInput(text);
        setTextoDictado(text);
      }
    };

    recognition.onerror = (event) => {
      console.log("Speech recognition error", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript("");
    };

    return () => {
      recognition.stop();
    };
  }, [quillRef, quillPointerIndex]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting recognition:", error);
      }
    }
  };
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    textAreaRef,
  };
};

export default useDictadoVoz;
