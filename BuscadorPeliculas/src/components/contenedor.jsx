import './../assets/estilos/contenedor.css';

function Contenedor(prop) {
    return (
        <section className="seccion_Contactos">
            <div className="section_contactos_datos">
                {prop.children}
            </div>
        </section>
    );
}

export default Contenedor;

