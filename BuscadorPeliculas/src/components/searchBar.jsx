import './../assets/estilos/searchBar.css';

function SearchBar({ searchTerm, handleSearchChange }) {
    return (
        <section className='box'>
            <input 
                type="text" 
                className='Buscador-Input' 
                placeholder='🔎 Buscar por nombre o género' 
                value={searchTerm} 
                onChange={handleSearchChange} 
            />
        </section>
    );
}

export default SearchBar;