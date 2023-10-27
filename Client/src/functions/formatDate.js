// Devuelvo la fecha en el formato de salida correcto "DD/MM/YYYY" según el origen:
// 1: origen BD
// 2: origen API

const formatDate = (data, origen) => {
    let fecha;
    let fechaFormateada;
    if (origen === 1) { //BD
        //fecha = new Date("2023-10-24T00:00:00.000Z");
        fecha = data;
        const dia = fecha.substring(8, 10);
        const mes = fecha.substring(5, 7);
        const anio = fecha.substring(0, 4);
        fechaFormateada = `${dia}/${mes}/${anio}`;
    } else {
        //fecha = "2013-09-27";
        fecha = data;
        const dia = fecha.substring(8, 10);
        const mes = fecha.substring(5, 7);
        const anio = fecha.substring(0, 4);
        fechaFormateada = `${dia}/${mes}/${anio}`;
    }
    return fechaFormateada;
}

export default formatDate;