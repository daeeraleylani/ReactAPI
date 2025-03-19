import './../assets/estilos/card.css';
import Swal from 'sweetalert2';

function Card({ name, imagen, overview, releaseDate, voteAverage, genreIds, allGenres }) {
    const genresList = genreIds.map(id => allGenres.find(genre => genre.id === id)?.name).join(", ") || "No disponible";

    const handlerClick = () => {
        Swal.fire({
            icon: "info",
            title: name,
            text: overview || "No hay descripción disponible",
            position: "center",
            imageUrl: imagen,
            imageWidth: 200,
            showConfirmButton: false,  
            timer: 4000,
        });
    };

    return (
        <div className="image" onClick={handlerClick}>
            <img 
                src={imagen ? imagen : "https://via.placeholder.com/200"} 
                alt={name || "Imagen no disponible"} 
            />
            <h2 className='Nombre'>{name}</h2>

            <div className="descripcion">
                <p><strong>Descripción:</strong> {overview || "No disponible"}</p>
                <p><strong>Fecha de estreno:</strong> {releaseDate || "No disponible"}</p>
                <p><strong>Calificación:</strong> ⭐ {voteAverage ? voteAverage + "/10" : "No disponible"}</p>
                <p><strong>Géneros:</strong> {genresList}</p>
            </div>
        </div>
    );
}

export { Card };
