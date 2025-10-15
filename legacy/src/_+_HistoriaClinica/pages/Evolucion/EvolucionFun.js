export const setEvoInitialData = () => {
  let ListNData = {
    labo: {
      grupoEstudiosUsuario: null,
      grupoEstudios: null,
      itemsOrdenHc: null,
      labNomenclador: null,
    },
    diagnostico: {
      data: null,
    },
    paciente: {
      estudiosPac: null,
      informesPac: null,
      laboHisInformes: null,
    },
    datosComplementarios: {
      enfermedades: null,
    },
    vademecum: {
      data: null,
    },
    medicamentos: {
      data: null,
    },
    grupoEstudiosPrac: {
      data: null,
    },
  };
};

export const setLocalDataList = (
  grupoEstudiosUsuario,
  grupoEstudios,
  itemsOrdenHc,
  labNomenclador,
  data,
  estudiosPac,
  informesPac,
  laboHisInformes,
  enfermedades,
  vademecum,
  medicamentos,
  grupoEstudiosPrac,
  examenFisico,
  ordenXMed,
  ordenXUsr
) => {
  let ListNData = {
    labo: {
      grupoEstudiosUsuario: grupoEstudiosUsuario,
      grupoEstudios: grupoEstudios,
      itemsOrdenHc: itemsOrdenHc,
      labNomenclador: labNomenclador,
    },
    diagnostico: {
      data: data,
    },
    paciente: {
      estudiosPac: estudiosPac,
      informesPac: informesPac,
      laboHisInformes: laboHisInformes,
    },
    datosComplementarios: {
      enfermedades: enfermedades,
    },
    vademecum: {
      data: vademecum,
    },
    medicamentos: {
      data: medicamentos,
    },
    grupoEstudiosPrac: {
      data: grupoEstudiosPrac,
    },
    examenFisico: {
      data: examenFisico,
    },
    ordenXMed: {
      data: ordenXMed,
    },
    ordenXUsr: {
      data: ordenXUsr,
    },
  };
  return ListNData;
};

export const checkLocalDataEvoTEST = (data) => {
  let flgCheck = false;
  if (data !== undefined) {
    for (let clave in data.ListNData.labo) {
      if (data.ListNData.labo[clave] === null) {
        flgCheck = true;
      }
    }
    for (let clave in data.ListNData.data) {
      if (data.ListNData.data[clave] === null) {
        flgCheck = true;
      }
    }
    for (let clave in data.ListNData.paciente) {
      if (data.ListNData.paciente[clave] === null) {
        flgCheck = true;
      }
    }
    for (let clave in data.ListNData.datosComplementarios) {
      if (data.ListNData.datosComplementarios[clave] === null) {
        flgCheck = true;
      }
    }
    for (let clave in data.ListNData.vademecum) {
      if (data.ListNData.vademecum[clave] === null) {
        flgCheck = true;
      }
    }
    for (let clave in data.ListNData.medicamentos) {
      if (data.ListNData.medicamentos[clave] === null) {
        flgCheck = true;
      }
    }
    for (let clave in data.ListNData.grupoEstudiosPrac) {
      if (data.ListNData.grupoEstudiosPrac[clave] === null) {
        flgCheck = true;
      }
    }
    for (let clave in data.ListNData.examenFisico) {
      if (data.ListNData.examenFisico[clave] === null) {
        flgCheck = true;
      }
    }
    for (let clave in data.ListNData.ordenXMed) {
      if (data.ListNData.ordenXMed[clave] === null) {
        flgCheck = true;
      }
    }
    for (let clave in data.ListNData.ordenXUsr) {
      if (data.ListNData.ordenXUsr[clave] === null) {
        flgCheck = true;
      }
    }
  } else {
    flgCheck = true;
  }

  return flgCheck;
};

export const createIndexDB = () => {
  // Open or create a database
  const request = indexedDB.open("dbHC", 1);
  // Handle database creation and version changes
  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    // Create an object store (similar to a table in a relational database)
    const objectStore = db.createObjectStore("storeHC", { keyPath: "id" });

    // Define the structure of the data
    objectStore.createIndex("id", "id", { unique: true });
    db.close();
  };
};

export const checkIfDBExists = (dbName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);
    // Si la base de datos se abre con éxito, significa que existe
    request.onsuccess = () => {
      resolve(true); // La base de datos existe
      request.result.close(); // Cerramos la conexión
    };

    // Si ocurre un error al abrir la base de datos, significa que no existe
    request.onerror = () => {
      reject(false); // La base de datos no existe
    };
  });
};

export const checkIfObjectStoreExists = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    // Si la base de datos se abre con éxito, verificamos los object stores
    request.onsuccess = (event) => {
      const db = event.target.result;

      // Verificamos si el object store "storeHC" existe
      if (db.objectStoreNames.contains(storeName)) {
        db.close(); // Cerramos la conexión
        resolve(true); // El object store existe
      } else {
        db.close(); // Cerramos la conexión
        reject(false); // El object store no existe
      }
    };

    // Si ocurre un error al abrir la base de datos, significa que no existe
    request.onerror = () => {
      reject(false); // Error al intentar abrir la base de datos
    };
  });
};

export const openDBAndEnsureStoreHC = (dbName) => {
  return new Promise((resolve, reject) => {
    let request = indexedDB.open(dbName);

    request.onsuccess = (event) => {
      let db = event.target.result;

      // Si el objectStore "storeHC" ya existe, simplemente resolvemos
      if (db.objectStoreNames.contains("storeHC")) {
        resolve(db);
        return;
      }

      // Cerrar la conexión actual antes de cambiar la versión
      db.close();

      // Abrimos la base de datos con una versión superior para poder modificarla
      let newVersion = db.version + 1;
      let upgradeRequest = indexedDB.open(dbName, newVersion);

      upgradeRequest.onupgradeneeded = (event) => {
        let upgradedDB = event.target.result;

        // Creamos el object store si no existe
        if (!upgradedDB.objectStoreNames.contains("storeHC")) {
          let objectStore = upgradedDB.createObjectStore("storeHC", {
            keyPath: "id",
          });
          objectStore.createIndex("id", "id", { unique: true });
        }
      };

      upgradeRequest.onsuccess = (event) => {
        resolve(event.target.result);
      };

      upgradeRequest.onerror = (e) => {
        reject(e);
      };
    };

    request.onerror = (e) => {
      reject(e);
    };
  });
};

//solo de prueba
export const deleteStoreHC = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("dbHC");

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Si el objectStore "storeHC" no existe, no es necesario eliminarlo
      if (!db.objectStoreNames.contains("storeHC")) {
        db.close();
        resolve(false);
        return;
      }

      // Cerrar la conexión antes de cambiar la versión
      db.close();

      // Abrimos la base de datos en una nueva versión para eliminar el objectStore
      const deleteRequest = indexedDB.open("dbHC", db.version + 1);

      deleteRequest.onupgradeneeded = (event) => {
        const upgradedDB = event.target.result;

        // Eliminamos el objectStore "storeHC"
        upgradedDB.deleteObjectStore("storeHC");
      };

      deleteRequest.onsuccess = (event) => {
        event.target.result.close();
        resolve(true);
      };

      deleteRequest.onerror = (e) => {
        console.error("Error al eliminar el object store 'storeHC':", e);
        reject(false);
      };
    };

    request.onerror = (e) => {
      console.error("Error al abrir la base de datos:", e);
      reject(false);
    };
  });
};

// export const createIndexDB = () => {
//   // Abrimos o creamos la base de datos "dbHC" en versión 1.
//   const request = indexedDB.open("dbHC", 1);

//   // Si la base de datos es nueva o se ha cambiado la versión, se ejecuta este callback.
//   request.onupgradeneeded = (event) => {
//     const db = event.target.result;
//     // Verificamos si el object store "storeHC" no existe, para crearlo solo una vez.
//     if (!db.objectStoreNames.contains("storeHC")) {
//       const storeHC = db.createObjectStore("storeHC", { keyPath: "id" });
//       // Creamos un índice en el campo "id" para garantizar la unicidad.
//       storeHC.createIndex("id", "id", { unique: true });
//       console.log("Se creó el object store 'storeHC'.");
//     }
//   };

//   // Cuando la base de datos se abre correctamente.
//   request.onsuccess = (event) => {
//     const db = event.target.result;

//     // Iniciamos una transacción en modo 'readonly' para consultar el contenido de "storeHC".
//     const transaction = db.transaction("storeHC", "readonly");
//     const store = transaction.objectStore("storeHC");
//     const countRequest = store.count();

//     countRequest.onsuccess = () => {
//       if (countRequest.result === 0) {
//         console.log(
//           "El object store 'storeHC' está vacío. Se procederá a crear el objeto por defecto."
//         );

//         // Si no hay registros, iniciamos una transacción en modo 'readwrite' para insertar el objeto.
//         const transactionWrite = db.transaction("storeHC", "readwrite");
//         const storeWrite = transactionWrite.objectStore("storeHC");

//         // Aquí defines el objeto a insertar. Ajusta la estructura según tus necesidades.
//         const defaultObject = { id: 1, data: "Valor por defecto" };

//         const addRequest = storeWrite.add(defaultObject);
//         addRequest.onsuccess = () => {
//           console.log("Objeto por defecto agregado a 'storeHC'.");
//         };
//         addRequest.onerror = (e) => {
//           console.error("Error al agregar el objeto por defecto:", e);
//         };
//       } else {
//         console.log(
//           "El object store 'storeHC' ya contiene objetos. No se agregará nada."
//         );
//       }
//     };

//     countRequest.onerror = (e) => {
//       console.error("Error al contar objetos en 'storeHC':", e);
//     };

//     // Cerramos la base de datos una vez que terminamos (opcional).
//     db.close();
//   };

//   request.onerror = (event) => {
//     console.error("Error al abrir la base de datos:", event);
//   };
// };

export const addItemIndexDB = (id, name, data) => {
  function addItem() {
    return new Promise((resolve, reject) => {
      let value = null;
      // Open or create a database
      const request = indexedDB.open("dbHC");
      // Handle successful database open
      request.onsuccess = (event) => {
        const db = event.target.result;
        // Perform operations with the database
        const transaction = db.transaction("storeHC", "readwrite");
        const objectStore = transaction.objectStore("storeHC");

        let obj = {
          id: id,
        };
        obj[name] = data;
        // Add data to the object store
        objectStore.add(obj);
        // Close the transaction when you're done
        transaction.oncomplete = () => {
          value = true;
          resolve(value);
        };
        db.close();
      };
      // Handle errors
      request.onerror = (event) => {
        reject(event);
      };
    });
  }
  return addItem();
};

export const getItemIndexDB = (key) => {
  function getItem() {
    return new Promise((resolve, reject) => {
      let value;
      // Open or create a database
      const request = indexedDB.open("dbHC");
      // Handle successful database open
      request.onsuccess = (event) => {
        const db = event.target.result;
        // Perform operations with the database
        const transaction = db.transaction("storeHC", "readwrite");
        const objectStore = transaction.objectStore("storeHC");
        // Retrieve data from the object store
        const getRequest = objectStore.get(key);
        getRequest.onsuccess = (event) => {
          const result = event.target.result;
          value = result;
        };
        // Close the transaction when you're done
        transaction.oncomplete = () => {
          resolve(value);
        };
        db.close();
      };
      // Handle errors
      request.onerror = (event) => {
        reject(event);
      };
    });
  }
  return getItem();
};

export const updateEvoEditIndexDB = (key, ref, item) => {
  function updateItem() {
    return new Promise((resolve, reject) => {
      // Abro BD
      const request = indexedDB.open("dbHC");

      // Manejo de errores
      request.onerror = (event) => {
        reject(event);
      };

      // operar en la BD
      request.onsuccess = (event) => {
        const db = event.target.result;
        // realizo acciones
        const transaction = db.transaction("storeHC", "readwrite");
        const objectStore = transaction.objectStore("storeHC");
        // Obtengo el ítem por clave
        const getRequest = objectStore.get(key);

        getRequest.onsuccess = (event) => {
          let itemOnChange = event.target.result;

          if (itemOnChange) {
            itemOnChange.ListEditEvo[`${ref}`] = item;
            // Creo una solicitud para actualizar
            const updateRequest = objectStore.put(itemOnChange);
            updateRequest.onsuccess = () => {
              resolve(itemOnChange);
            };

            updateRequest.onerror = (event) => {
              reject(event);
            };
          } else {
            reject("Item no encontrado");
          }
        };

        getRequest.onerror = (event) => {
          reject(event);
        };
        // Cierro la transacción al completar
        transaction.oncomplete = () => {
          db.close();
        };
      };
    });
  }
  return updateItem();
};

export const deleteItemIndexDB = (key) => {
  function deleteItem() {
    return new Promise((resolve, reject) => {
      let value;
      // Abro BD
      const request = indexedDB.open("dbHC");
      // operar en la BD
      request.onsuccess = (event) => {
        const db = event.target.result;
        // realizo acciones
        const transaction = db.transaction("storeHC", "readwrite");
        const objectStore = transaction.objectStore("storeHC");
        // elimino un item de la bd por clave
        const getRequest = objectStore.delete(key);
        getRequest.onsuccess = (event) => {
          const result = event.target.result;
          value = result;
        };
        //cierro la transaccion
        transaction.oncomplete = () => {
          resolve(true);
        };
        db.close();
      };
      // Manejo de errores
      request.onerror = (event) => {
        reject(event);
      };
    });
  }
  return deleteItem();
};

export const deleteIndexDB = () => {
  function deleteDB() {
    return new Promise((resolve, reject) => {
      // ELIMINO LA BD
      const request = indexedDB.deleteDatabase("dbHC");
      // operar en la BD
      request.onsuccess = (event) => {
        resolve(event);
      };
      // Handle errors
      request.onerror = (event) => {
        reject(event);
      };
    });
  }
  return deleteDB();
};

export const deleteIndexDBXNueva = () => {
  function deleteDB() {
    return new Promise((resolve, reject) => {
      // ELIMINO LA BD
      const request = indexedDB.deleteDatabase("dbHC");
      // operar en la BD
      request.onsuccess = (event) => {
        resolve(event);
        //testing fix 20/8
        recargarTablaAgenda();
        window.close();
      };
      // Handle errors
      request.onerror = (event) => {
        reject(event);
      };
    });
  }
  return deleteDB();
};

export const solicitudLaboDescOld = (array) => {
  let nomencladoresLabo = [];

  array.forEach((item, index, array) => {
    const valoresLabo = [];

    item.listGrupoEstudioItem.forEach((item1, index, array) => {
      valoresLabo.push(item1.idlabnomenclador_desc);
    });
    const descripcionConcatenada = valoresLabo.join(" | ");
    let newObj = {
      id: 0,
      idevolucion: 0,
      descripcion: descripcionConcatenada,
    };
    nomencladoresLabo.push(newObj);
  });

  return nomencladoresLabo;
};

export const solicitudLaboDesc = (array) => {
  let auxArr = array.map((item) => {
    const valoresLabo = [];

    item.listGrupoEstudioItem.forEach((item1) => {
      valoresLabo.push(item1.idlabnomenclador_desc);
    });
    const descripcionConcatenada = valoresLabo.join(" | ");

    return {
      ...item,
      descripcion: descripcionConcatenada, // nueva propiedad `descripcion`
    };
  });
  return auxArr;
};

export const solicitudPracDesc = (array) => {
  const practicasSolicitadas = [];
  array.forEach((item, index, array) => {
    let newObj = {
      descripcion: item.descripcion,
      id: "",
      idEstudioSolicitado: "",
      idEvolucion: 0, //lo mando en cero por mas que sea nuevo
      manual: "1", //revisar que significa manual
      nuevo: null, //aunque sea de una edicion lo deja en 0
    };
    practicasSolicitadas.push(newObj);
  });
  return practicasSolicitadas;
};

const recargarTablaAgenda = () => {
  let config = localStorage.getItem("config");
  let agendaURL = JSON.parse(config).URL_AGENDA;
  // Verificar si la referencia de la ventana principal está disponible
  if (window.opener) {
    // Enviar el mensaje directamente a la ventana origen
    window.opener.postMessage("enviarFlag", agendaURL);
  } else {
    console.error("No se pudo obtener la referencia de la ventana original.");
  }
};
