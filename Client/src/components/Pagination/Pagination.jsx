// hooks, routers, reducers:
import { useState, useEffect } from "react";
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

    //     <div className={containerSec}>
    //     <div className={currentPage > 1 ? contButton : contButtonDisabled} href="/">
    //         <button className={currentPage > 1 ? button : buttonDisabled} onClick={() => paginado(currentPage - 1)} >Prev.</button>
    //     </div>
    //     <div className={currentPage < totPages ? contButton : contButtonDisabled} href="/">
    //         <button className={currentPage < totPages ? button : buttonDisabled} onClick={() => paginado(currentPage + 1)} >Next</button>
    //     </div>
    // </div>

    // useEffect(() => {
    //     console.log("HANDLE");
    //     HandlePage(1);
    // }, []);


    const HandlePage = (number) => {
        //console.log("HandlePage ", number);
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

export default Pagination;
