import { ContainerBox } from "./localStyle";

const ModalPreImpresion = ({ dissmiss, datos }) => {
    return (
        <>
            <ContainerBox>
                <div
                    dangerouslySetInnerHTML={{
                        __html: datos,
                    }}
                ></div>
            </ContainerBox>
        </>
    );
};

export default ModalPreImpresion;