import { LoadingContainer, Logo, Spinner, TextoCargando } from "./localStyle";

const Loading = ({ dataLoading, color, descripcion }) => {
  return (
    dataLoading && (
      <LoadingContainer>
        <Logo
          src={
            process.env.PUBLIC_URL + "/assets/images/empresa/LoadingLogo.png"
          }
          texto={descripcion}
          alt="Logo"
        />
        <TextoCargando className={`${color} rb18m `}>
          {descripcion}
        </TextoCargando>
        <Spinner size={120} delay={0} />
      </LoadingContainer>
    )
  );
};

export default Loading;
