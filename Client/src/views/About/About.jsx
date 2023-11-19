// ! Vista con información del programa y del desarrollador. Obtiene la versión del backend.
import axios from 'axios';
// hooks, routers, reducers:
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginacionPendiente } from "../../redux/actions";
// Variables de entorno:
import useParamsEnv from "../../hooks/useParamsEnv.js";
const { VG_VER_BACK, IMG_ABOUT, IMG_LINK, IMG_GIT, MY_LNK, MY_GIT } = useParamsEnv();
// Estilos:
import style from "./About.module.css";
const { container, containerData, containerNet, imgGit, img, imgLink, mainText, secondText, contButton, button } = style;
import packageJson from '../../../package.json';

const About = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const versionFront = packageJson.version;
    const [versionBack, setVersionBack] = useState('');

    useEffect(() => {
        const endpoint = VG_VER_BACK;
        axios(endpoint)
            .then(({ data }) => {
                if (data.version) {
                    setVersionBack(data.version);
                } else {
                    window.alert("Error while obtaining backend version");
                }
            })
            .catch((error) => {
            });
    }, []);

    function handleBack() {
        dispatch(paginacionPendiente(true)); // para conservar la página actual en home
        navigate(-1);
    }

    return (
        <div className={container}>
            <div className={containerData}>
                <img className={img} src={IMG_ABOUT} alt="" />
                <div className={containerNet}>
                    <Link to={MY_GIT} target='_blank'                    >
                        <img className={imgGit} src={IMG_GIT} style={{ cursor: 'pointer' }} />
                    </Link>
                    <Link to={MY_LNK} target='_blank'                    >
                        <img className={imgLink} src={IMG_LINK} style={{ cursor: 'pointer' }} />
                    </Link>
                </div>
            </div>
            <p className={mainText}>Hi! I'm Paulo Vinci. This is PI Video Games. PI is part of the Henry FullStack course. It allows fetching all video games from a public API, plus the ability to add new games and save them in a PostgresSQL database. We were not allowed to use any other libraries than those detailed in the requirements.</p>
            <p className={secondText}>Version Frontend: {versionFront} - Version Backend: {versionBack}</p>
            <div className={contButton}>
                <button className={button} onClick={() => handleBack()}>Back</button>
            </div>
        </div >
    )
};

export default About;