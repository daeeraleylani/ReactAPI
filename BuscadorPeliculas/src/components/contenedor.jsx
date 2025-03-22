import './../assets/estilos/contenedor.css'
import './../components/searchBar';
import SearchBar from './../components/searchBar';

function Contenedor(prop) {
    return (
        <section className="seccion_Contactos">
            
            <h1 className="seccion_Titulo">Encuentra tus películas favoritas aquí</h1>
            <div className="section_contactos_datos">
                {prop.children}
            </div>

        </section>
    )
}
export default Contenedor

