export const checkLocalDataAud = (data) => {
  let flgCheck = false;
  if (data !== undefined) {
    if (data.ListDataAud.auditSnomed.tableList === null) {
      flgCheck = true;
    }
  } else {
    flgCheck = true;
  }

  return flgCheck;
};

export const setLocalDataAud = (tableList) => {
  let ListDataAud = {
    auditSnomed: {
      tableList: tableList,
    },
  };
  return ListDataAud;
};
