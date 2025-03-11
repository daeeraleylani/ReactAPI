import './../assets/estilos/card.css'
import Swal from 'sweetalert2'
//import noDisponible from "./../assets/imagenes/nodis.png"


function Card(prop){
    const handlerClick=()=>{
        Swal.fire({
            icon: "success",
            
            title: prop.name,
            footer:"as comprado este producto",
            position: "Center",
            imageWidth: 200,
            imageUrl: prop.imagen,
            showConfirmButton: false,
            timer:3000,
        });
    }
    return(
        <div className="image">
            <img src={
                prop.imagen?prop.imagen:noDisponible}
                 alt="No Disponible" />
            <h2 className='Nombre'>{
            prop.name
            }</h2>

            <div className="descripcion">
                <span className='precio_anterior'>
                    {
                        prop.precio_ant
                    }
                    <br />
                </span>
                <span className='Titulo'>
                    {
                        prop.precio
                    }
                </span>
                <p className='buton'>
                    <button onClick={handlerClick}>Comprar</button>
                </p>
            </div>

        </div>
    )
}
export {Card}
