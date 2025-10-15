export const textoAyuda = (name) => {
  if (name === "Perfil") {
    return (
      <>
        <p>
          Estos perfiles le permitirán imprimir sus recetas con distintos
          encabezados, distintas firmas y diferentes configuraciones de receta.
          Es como tener múltiples talonarios impresos para diferentes
          instituciones o consultorios.
        </p>
        <p>
          Debe tener al menos un perfil configurado. Puede agregar más perfiles
          desde su Cuenta.
        </p>
      </>
    );
  } else if (name === "Cobertura") {
    return (
      <>
        <p>
          Aquí encontrarás una extensa lista con las coberturas médicas las
          cuales laboramos, seleccionando una de ellas podrás ingresar nombre
          del plan y número de afiliado del paciente.
        </p>
        <p>
          Puedes agregar las diferentes coberturas médicas que posee el
          paciente.
        </p>
      </>
    );
  } else if (name === "FechaEmision") {
    return (
      <>
        <p>
          Esta es la fecha de emisión de la receta. Si se modifica puede cambiar
          la fecha en la que se emite la receta. No cumple la misma
          funcionalidad que fechas postadatadas.
        </p>
      </>
    );
  } else if (name === "Fecha") {
    return (
      <>
        <p>
          Esta es la fecha de prescripción de la receta. Si añade múltiples
          fechas, se generará una receta por cada fecha que agregue, ideal para
          emitir varias copias de esta receta con diferentes fechas cada una.
          Útil para tratamientos prolongados o crónicos que necesitan varias
          recetas en el año.
        </p>
      </>
    );
  }
};
