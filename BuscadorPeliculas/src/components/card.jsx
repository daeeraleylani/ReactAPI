import './../assets/estilos/card.css';
import Swal from 'sweetalert2';

function Card({ name, imagen, precio_ant, precio }) {
    const handlerClick = () => {
        Swal.fire({
            icon: "success",
            title: name,
            footer: "Has comprado este producto",
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
                <span className='precio_anterior'>{precio_ant ? `$${precio_ant}` : ''}</span>
                <br />
                <span className='Titulo'>{precio ? `$${precio}` : ''}</span>
                <p className='buton'>
                    <button onClick={handlerClick}>Comprar</button>
                </p>
            </div>
        </div>
    );
}

export { Card };
