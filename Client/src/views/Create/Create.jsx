// hooks, routers, reducers:
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getPlatforms } from "../../redux/actions";
// Funciones:
import validator from "./validations";
// Estilos: 
import style from "./Create.module.css";
const { container, mainTitle, secondText, startButton, imgBack } = style;

const Create = () => {

    let genres = useSelector((state) => state.genres);
    let platforms = useSelector((state) => state.platforms);

    useEffect(() => {
        // Cargo las plataformas. Ya tengo los géneros desde antes.
        setIsLoading(true);
        dispatch(getPlatforms());
        setIsLoading(false);
    }, []);

    const [GameData, setGameData] = useState({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: "",
        genre: [],
        platform: [],
    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: "",
        genre: [],
        platform: [],
    });


    const handleChange = (e) => {
        // const property = e.target.name;
        // const value = e.target.value;
        // setUserData({ ...userData, [property]: value })
        // setErrors(Validation({ ...userData, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (event) => {
        // event.preventDefault();
        // login(userData);
    }
    return (
        <form className={container} onSubmit={handleSubmit}>
            <div className={container}>
                <div className={container}>
                    <label htmlFor="name">Name:</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="name"
                        value={GameData.name}
                        onChange={handleChange}
                        id="name"
                    />
                    {errors.e1 ? (
                        <span className={container}>{errors.e1}</span>
                    ) : errors.e2 ? (
                        <span className={container}>{errors.e2}</span>
                    ) : (
                        <span className={container}>{errors.e3}</span>
                    )}
                </div>

                <div className={container}>
                    <label htmlFor="description">description:</label>
                    <input
                        name="description"
                        type="text"
                        placeholder="description"
                        value={GameData.description}
                        onChange={handleChange}
                        id="description"
                    />
                    {errors.e1 ? (
                        <span className={container}>{errors.e1}</span>
                    ) : errors.e2 ? (
                        <span className={container}>{errors.e2}</span>
                    ) : (
                        <span className={container}>{errors.e3}</span>
                    )}
                </div>
                <div className={container}>
                    <label htmlFor="image">image:</label>
                    <input
                        name="image"
                        type="text"
                        placeholder="image"
                        value={GameData.image}
                        onChange={handleChange}
                        id="image"
                    />
                    {errors.e1 ? (
                        <span className={container}>{errors.e1}</span>
                    ) : errors.e2 ? (
                        <span className={container}>{errors.e2}</span>
                    ) : (
                        <span className={container}>{errors.e3}</span>
                    )}
                </div>
                <div className={container}>
                    <label htmlFor="released">released:</label>
                    <input
                        name="released"
                        type="text"
                        placeholder='YYYY/MM/DD'
                        value={GameData.released}
                        onChange={handleChange}
                        id="released"
                    />
                    {errors.e1 ? (
                        <span className={container}>{errors.e1}</span>
                    ) : errors.e2 ? (
                        <span className={container}>{errors.e2}</span>
                    ) : (
                        <span className={container}>{errors.e3}</span>
                    )}
                </div>
                <div className={container}>
                    <label htmlFor="rating">rating:</label>
                    <input
                        name="rating"
                        type="number"
                        placeholder='0'
                        value={GameData.rating}
                        onChange={handleChange}
                        id="rating"
                    />
                    {errors.e1 ? (
                        <span className={container}>{errors.e1}</span>
                    ) : errors.e2 ? (
                        <span className={container}>{errors.e2}</span>
                    ) : (
                        <span className={container}>{errors.e3}</span>
                    )}
                </div>

                <div className={container}>
                    <label className={style.labelStyle} htmlFor="genre">Genre</label>
                    <select className={style.selectGenre}
                        name="genre"
                        multiple
                        value={GameData.genre}
                        onChange={handleSelectGenre}
                    >
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.name}>
                                {genre.name}
                            </option>
                        ))}
                    </select>

                    <div className={style.arrayGenresStyle}>
                        Selected Genre(s)::{" "}
                        {input.genre.map((genre) => (
                            <span key={genre}>
                                {genre}
                                <button
                                    className={style.removeButton}
                                    onClick={() => handleRemoveGenre(genre)}
                                >
                                    X
                                </button>
                            </span>
                        ))}
                    </div>

                    <p className={style.arrayError}>{errors.genre}</p>
                </div>
                <div className={container}>
                    <label className={style.labelStyle} htmlFor="platform">Genre</label>
                    <select className={style.selectGenre}
                        name="platform"
                        multiple
                        value={GameData.platform}
                        onChange={handleSelectPlatform}
                    >
                        {platforms.map((plat) => (
                            <option key={plat.id} value={plat.name}>
                                {plat.name}
                            </option>
                        ))}
                    </select>

                    <div className={style.arrayGenresStyle}>
                        Selected Platform(s)::{" "}
                        {input.platform.map((platform) => (
                            <span key={platform}>
                                {platform}
                                <button
                                    className={style.removeButton}
                                    onClick={() => handleRemovePlatform(platform)}
                                >
                                    X
                                </button>
                            </span>
                        ))}
                    </div>

                    <p className={style.arrayError}>{errors.platform}</p>
                </div>



                <p className={container} href="/">
                    <button className={container} type="submit">Login</button>
                </p>
            </div>
        </form >
    )
}

export default Create;
