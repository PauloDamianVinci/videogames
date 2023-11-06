// ! Vista con información del programa y del desarrollador. Obtiene y la versión del backend.
import axios from 'axios';
// hooks, routers, reducers:
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginacionPendiente } from "../../redux/actions";
// Variables de entorno:
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/videogames';
const VG_BACK = import.meta.env.VITE_VG_VER_BACK || '/versionback';
const VG_VER_BACK = API_URL_BASE + VG_BACK;
const IMG_ABOUT = import.meta.env.VITE_IMG_ABOUT || '/src/assets/Face.jpg';
const IMG_LINK = import.meta.env.VITE_IMG_LINKEDIN || '/src/assets/LINKEDIN.PNG';
const IMG_GIT = import.meta.env.VITE_IMG_GITHUB || '/src/assets/GIT.PNG';
const MY_LNK = import.meta.env.VITE_MY_LINKEDIN || 'https://www.linkedin.com/in/paulo-damian-vinci/';
const MY_GIT = import.meta.env.VITE_MY_GITHUB || 'https://github.com/PauloDamianVinci/videogames';
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