// Verifico que el link a la imagen exista, caso contrario devuelvo un link con la imagen de error.
// hooks, routers, reducers:
import { useState, useEffect } from "react";
// Variables de entorno:
const IMG_ERROR = import.meta.env.VITE_IMG_ERR_DETAIL || '/src/assets/NoPhoto.png';

const testLinkImage = (link) => {
    //let linkSalida = '';
    const [linkSalida, setLinkSalida] = useState('');

    const imageTest = new Image();
    imageTest.src = link;
    imageTest.onload = () => {
        setLinkSalida(imageTest.src);
    };
    imageTest.onerror = () => {
        setLinkSalida(IMG_ERROR);
    };

    console.log("TEST LINK: ", link, " - ", linkSalida);

    return linkSalida;
}

export default testLinkImage;