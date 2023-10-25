import style from "./Card.module.css";
const { container, mainTitle, secondText, startButton, imgBack } = style;

const Card = (props) => {
    const { id, name, image, genre } = props;

    return (
        <div>
            <h2 className={style.container}>{name}</h2>
        </div>
    )
}

export default Card
