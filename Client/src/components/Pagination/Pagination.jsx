// ! Encargado de mostrar la paginación. Llamado desde Home.
// Estilos:
import style from "./Pagination.module.css";
const { mainText, container, contButton, button, buttonChosen, containerSec } = style;

const Pagination = (props) => {
    const { videogamePerPage, allVideogames, paginado, currentPage } = props;
    const pgNum = []
    const totPages = Math.ceil(allVideogames / videogamePerPage);
    for (let i = 0; i < totPages; i++) {
        pgNum.push(i + 1)
    }

    const HandlePage = (number) => { // página actual
        if (number > totPages) {
            paginado(1);
        } else {
            paginado(number);
        }
    }

    const HandlePrev = () => { // página previa
        if (currentPage > 1) {
            paginado(currentPage - 1);
        }
    }

    const HandleNext = () => { // página siguiente
        if (currentPage < totPages) {
            paginado(currentPage + 1);
        }
    }

    // La barra de paginación muestra distinta info, dependiendo de la cantidad de páginas que haya.
    if (totPages < 1) { // No hay páginas por mostrar
        return (
            <div className={container}>
                <h2 className={mainText}>No cards to play! 😥</h2>
            </div>
        );
    } else if (totPages < 2) { // Es una sola página. No muestro botones Prev ni Next
        return (
            <div className={container}>
                <ul className={containerSec}>
                    {pgNum.map((number) => {
                        return (
                            <li key={number}>
                                <div className={contButton}>
                                    <button onClick={() => HandlePage(number)} className={number === currentPage ? buttonChosen : button}>
                                        {number}
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div >
        );
    } else { // Hay más de una página. Se muestran todos los controles disponibles
        return (
            <div className={container}>
                <ul className={containerSec}>
                    <div className={contButton} href="/">
                        <button className={button} onClick={() => HandlePrev()} >Prev.</button>
                    </div>
                    <div className={contButton} href="/">
                        <button className={button} onClick={() => HandleNext()} >Next</button>
                    </div>
                    {pgNum.map((number) => {
                        return (
                            <li key={number}>
                                <div className={contButton}>
                                    <button onClick={() => HandlePage(number)} className={number === currentPage ? buttonChosen : button}>
                                        {number}
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div >
        );
    }

}

export default Pagination;