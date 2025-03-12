import './../assets/estilos/card.css';
import Swal from 'sweetalert2';

function Card({ name, imagen, descripcion, precio }) {
    const handlerClick = () => {
        Swal.fire({
            icon: "success",
            title: name,
            
            position: "center",
            imageWidth: 200,
            imageUrl: imagen,
            showConfirmButton: false,
            timer: 3000,
        });
    };

    return (
        <div className="image">
            <img src={imagen ? imagen : "https://via.placeholder.com/200"} alt="No Disponible" />
            <h2 className='Nombre'>{name}</h2>

            <div className="descripcion">
                
                <br />
                <span className='Titulo'>{precio ? `$${precio}` : ''}</span>
                
            </div>
        </div>
    );
}

export { Card };
