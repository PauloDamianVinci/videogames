//! Componente que mapea los videojuegos y los muestra de a uno cargando el componente card. Llamado desde Home.
// Componentes:
import Card from "../Card/Card.jsx";
// Estilos:
import style from "./Cards.module.css";
const { container } = style;

const Cards = (props) => {
   const { currentGame, aux, setAux } = props;
   return (
      <div className={container}>
         {currentGame.map((el) => {
            return (
               <Card
                  aux={aux}
                  setAux={setAux}
                  id={el.id}
                  key={el.id}
                  name={el.name}
                  image={el.image}
                  genresV={el.Genres} />
            );
         })}
      </div>
   );
}

export default Cards;
