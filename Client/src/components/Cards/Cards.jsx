// Componentes:
import Card from "../Card/Card.jsx";
// Estilos:
import style from "./Cards.module.css";

const Cards = (props) => {
   const { currentGame } = props;
   const { container } = style;
   return (
      <div className={container}>
         {currentGame.map((el) => {
            return (
               <Card
                  id={el.id}
                  key={el.id}
                  name={el.name}
                  image={el.image}
                  genresV={el.Genres}
                  rating={el.rating} />
            );
         })}
      </div>
   );
}

export default Cards
