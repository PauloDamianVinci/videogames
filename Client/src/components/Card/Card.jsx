import style from "./Card.module.css";
const { container, mainTitle, secondText, startButton, imgBack } = style;

const Card = (props) => {
    const { id, name, image, genre, rating } = props;

    return (
        <div>
            <h2 className={style.container}>{name} - {rating} </h2>
        </div>
    )
}

export default Card
