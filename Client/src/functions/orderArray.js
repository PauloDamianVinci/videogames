// Devuelvo el arry de objetos ordnado por la propiedad name:

const orderArray = (data) => {
    data.sort((a, b) => {
        const nombreA = a.name.toLowerCase();
        const nombreB = b.name.toLowerCase();
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    });
}

export default orderArray;