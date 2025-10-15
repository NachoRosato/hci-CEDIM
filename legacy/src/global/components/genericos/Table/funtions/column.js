export const createColunmSize = (allColumn, totalLen) => {
    let len = totalLen / allColumn.length;
    allColumn = allColumn.map((element) => len);
    return allColumn;
  };