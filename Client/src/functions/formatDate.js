// Devuelvo la fecha en el formato de salida correcto "YYYY/MM/DD":

const formatDate = (data) => {
    //fecha = new Date("2023-10-24T00:00:00.000Z");
    let fecha = data;
    let fechaFormateada;
    const dia = fecha.substring(8, 10);
    const mes = fecha.substring(5, 7);
    const anio = fecha.substring(0, 4);
    //fechaFormateada = `${dia}/${mes}/${anio}`;
    fechaFormateada = `${anio}-${mes}-${dia}`;
    return fechaFormateada;
}


export default formatDate;