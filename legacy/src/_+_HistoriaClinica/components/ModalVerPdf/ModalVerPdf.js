import { ContainerBox } from "./localStyle";

const ModalVerPdf = ({ pdfPaciente }) => {
  return (
    <>
      <ContainerBox>
        <div style={{ marginTop: "20px" }}>
          <iframe
            src={pdfPaciente}
            title="Visor PDF"
            style={{
              width: "100%",
              height: "600px",
              border: "1px solid #cbd5e0",
              borderRadius: "8px",
            }}
          />
        </div>
      </ContainerBox>
    </>
  );
};

export default ModalVerPdf;
