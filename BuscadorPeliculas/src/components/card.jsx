import './../assets/estilos/card.css';
import Swal from 'sweetalert2';
import axios from 'axios';

function Card({ id, name, imagen, overview, releaseDate, voteAverage, genreIds, allGenres }) {
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

    const fetchCredits = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                }
            });

            const cast = response.data.cast.slice(0, 10).map(person => ({
                name: person.name,
                character: person.character,
                image: person.profile_path 
                    ? `https://image.tmdb.org/t/p/w200${person.profile_path}` 
                    : "https://via.placeholder.com/100"
            }));

            let castHtml = `
                <div style="
                    display: grid; 
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); 
                    gap: 15px; 
                    justify-content: center;
                    padding: 10px;
                ">
                    ${cast.map(actor => `
                        <div style="
                            display: flex; 
                            flex-direction: column; 
                            align-items: center;
                            text-align: center;
                        ">
                            <img src="${actor.image}" 
                                alt="${actor.name}" 
                                width="100" height="100" 
                                style="
                                    border-radius: 10px;
                                    object-fit: contain;
                                    max-width: 100px;
                                    max-height: 100px;
                                ">
                            <strong style="font-size: 12px; margin-top: 5px;">${actor.name}</strong>
                            <span style="font-size: 10px; color: gray;">(${actor.character})</span>
                        </div>
                    `).join("")}
                </div>
            `;

            Swal.fire({
                title: `Créditos de ${name}`,
                html: castHtml || "<p>No hay créditos disponibles</p>",
                position: "center",
                showConfirmButton: true,
                width: 600,
            });

        } catch (error) {
            console.error("Error al obtener los créditos:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudieron cargar los créditos.",
                position: "center",
                showConfirmButton: true,
            });
        }
    };

    return (
        <div className="card">
            <img 
                src={imagen ? imagen : "https://via.placeholder.com/200"} 
                alt={name || "Imagen no disponible"} 
                className="card-image"
                onClick={handlerClick}
            />
            <h2 className="card-title">{name}</h2>
            <div className="card-content">
                <p className="card-description">
                    <strong>Descripción:</strong> {overview || "No disponible"}
                </p>
                <p><strong>Fecha de estreno:</strong> {releaseDate || "No disponible"}</p>
                <p><strong>Calificación:</strong> ⭐ {voteAverage ? voteAverage + "/10" : "No disponible"}</p>
                <p><strong>Géneros:</strong> {genresList}</p>
            </div>
            <button className="btn-ver-creditos" onClick={fetchCredits}>
                Ver Créditos
            </button>
        </div>
    );
}

export { Card };
