import './../assets/estilos/contenedor.css'

function Contenedor(prop){
    return(
        <section className="seccion_Contactos">
            
            <h1 className="seccion_Titulo">PRODUCTOS.</h1>
            <div className="section_contactos_datos"> 
                {prop.children}
            </div>

        </section>
    )
}
export default Contenedor

