// ! Devuelvo la fecha en el formato de salida correcto "YYYY/MM/DD":

const formatDate = (data) => {
    let fecha = data;
    let fechaFormateada;
    const dia = fecha.substring(8, 10);
    const mes = fecha.substring(5, 7);
    const anio = fecha.substring(0, 4);
    fechaFormateada = `${anio}-${mes}-${dia}`;
    return fechaFormateada;
}

export default formatDate;