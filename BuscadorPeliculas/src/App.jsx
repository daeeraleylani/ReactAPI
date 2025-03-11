
import './assets/estilos/App.css'
import Contenedor from './components/contenedor'
import { Card } from './components/card'
import data from './contactos.json'

function App() {

  return (
    
    <>
      <Contenedor>
        {
          data.map(productos=>
            <Card
            key={productos.id}
            imagen={productos.imagen}
            precio_ant={productos.precio_ant}
            name={productos.nombre}
            precio={productos.precio}            
            />
            
            )
        }

        
      </Contenedor>

    </>
  )
}
export default App
