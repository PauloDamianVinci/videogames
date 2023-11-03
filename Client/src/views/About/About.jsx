import axios from 'axios';
// hooks, routers, reducers:
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetails } from "../../redux/actions";
import { Link } from 'react-router-dom'
// Variables de entorno:
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/videogames';
const VG_BACK = import.meta.env.VITE_VG_VER_BACK || '/versionback';
const VG_VER_BACK = API_URL_BASE + VG_BACK;
const IMG_ABOUT = import.meta.env.VITE_IMG_ABOUT || '/src/assets/Face.jpg';
const IMG_LINK = import.meta.env.VITE_IMG_LINKEDIN || '/src/assets/linkedin.svg';
const IMG_GIT = import.meta.env.VITE_IMG_GITHUB || '/src/assets/github.svg';
const MY_LNK = import.meta.env.MY_LINKEDIN || 'https://www.linkedin.com/in/paulo-damian-vinci/';
const MY_GIT = import.meta.env.MY_GITHUB || 'https://github.com/PauloDamianVinci/videogames';

// Estilos:
import style from "./About.module.css";
const { container, containerData, containerImgAbout, info, imgGit, containerImg, img, imgLink, description, mainText, secondText, contButton, button } = style;
import packageJson from '../../../package.json';

const About = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const versionFront = packageJson.version;
    const [isLoading, setIsLoading] = useState(true);
    const [versionBack, setVersionBack] = useState('');

    useEffect(() => {
        setIsLoading(true);
        const endpoint = VG_VER_BACK;
        axios(endpoint)
            .then(({ data }) => {
                if (data.version) {
                    setVersionBack(data.version);
                } else {
                    window.alert("Error while obtaining backend version");
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
            .catch((error) => {
            });
    }, []);

    function handleBack() {
        dispatch(clearDetails()); // limpio la posible consulta previa
        navigate(-1);
    }
    const redirectToExternalSite = (site) => {
        window.open(site, '_blank');
    };

    return (
        <div className={container}>
            <div className={containerData}>
                <div className={containerImgAbout}>
                    <img className={img} src={IMG_ABOUT} alt="" />
                </div>
                <div className={containerImg}>
                    <Link to={MY_LNK} target='_blank'                    >
                        <img className={imgLink} src={IMG_LINK} style={{ cursor: 'pointer' }} />
                    </Link>

                    <Link to={MY_GIT} target='_blank'                    >
                        <img className={imgGit} src={IMG_GIT} style={{ cursor: 'pointer' }} />
                    </Link>
                </div>
                <div className={description}>
                    <p className={mainText}>
                        Hi! I'm Paulo Vinci. This is PI Video Games. PI is part of the Henry FullStack course. It allows fetching all video games from a public API, plus the ability to add new games and save them in a PostgresSQL database. We were not allowed to use any other libraries than those detailed in the requirements.
                    </p>
                </div>
                <div className={info}>
                    <p className={secondText}>
                        Versions:
                    </p>
                    <p className={secondText}>
                        Frontend: {versionFront} -  Backend: {versionBack}
                    </p>
                </div>
                <div className={contButton}>
                    <button className={button} onClick={() => handleBack()}>Back</button>
                </div>

            </div>
        </div>
    )
};
export default About;

