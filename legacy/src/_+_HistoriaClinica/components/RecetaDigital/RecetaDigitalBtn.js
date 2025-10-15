import {
  BoxBtnRecetaDigital,
  BtnAsignarReceta,
  BtnRctaDigitalIcon,
} from "./localStyle";
import TooltipV2 from "global/components/genericos/TooltipV2/TooltipV2";
import RecetaDigitalIcon from "global/assets/generico/RecetaDigitalIcon";

const RecetaDigitalBtn = ({ clickRecetaDigital }) => {
  return (
    <>
      <BoxBtnRecetaDigital>
        <BtnAsignarReceta
          onClick={clickRecetaDigital}
          className={`rb16b c-white bgc-primary pointer`}
        >
          Receta Digital
        </BtnAsignarReceta>
        <div className="qMarkClass pointer">
          <TooltipV2
            csBoxWidth={289}
            csRadius={16}
            children={
              <BtnRctaDigitalIcon
                onClick={clickRecetaDigital}
                className={`rb16b c-white bgc-primary pointer`}
              >
                <RecetaDigitalIcon
                  color={"var(--color-white)"}
                  size={24}
                ></RecetaDigitalIcon>
              </BtnRctaDigitalIcon>
            }
            detalle={
              <p className="rb12tl" style={{ textAlign: "left", padding: 5 }}>
                Presione este botón si desea generar una receta digital
              </p>
            }
          />
        </div>
      </BoxBtnRecetaDigital>
    </>
  );
};

export default RecetaDigitalBtn;
