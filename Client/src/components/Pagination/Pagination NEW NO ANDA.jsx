// Estilos:
import style from "./Pagination.module.css";
const { container, contButton, button, buttonChosen, containerSec } = style;

const Pagination = (props) => {
    const { videogamePerPage, allVideogames, paginado, currentPage } = props;

    const pgNum = []
    const totPages = Math.ceil(allVideogames / videogamePerPage);
    for (let i = 0; i < totPages; i++) {
        pgNum.push(i + 1)
    }

    const HandlePage = (number) => {
        paginado(number);
    }

    const HandlePrev = () => {
        if (currentPage > 1) {
            paginado(currentPage - 1);
        }
    }

    const HandleNext = () => {
        if (currentPage < totPages) {
            paginado(currentPage + 1);
        }
    }

    console.log("totPages ", totPages);
    if (totPages < 1) {
        return (
            <div className={container}>
                <h2>No cards!</h2>
            </div>
        );

    } else if (totPages < 2) {
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
    } else {
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