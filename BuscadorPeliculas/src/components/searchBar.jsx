import React, { useRef, useEffect } from 'react';
import './../assets/estilos/searchBar.css';

function SearchBar({ searchTerm, handleSearchChange }) {
    const inputRef = useRef(null); // Referencia para el input del buscador

    // Efecto para ajustar el ancho del input según el texto
    useEffect(() => {
        if (inputRef.current) {
            const input = inputRef.current;
            const textWidth = getTextWidth(searchTerm, input.style.font);
            input.style.width = `${textWidth + 20}px`; // +20 para el espacio a los lados
        }
    }, [searchTerm]);

    // Función para calcular el ancho del texto
    const getTextWidth = (text, font) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font || getComputedStyle(inputRef.current).font;
        return context.measureText(text).width;
    };

    return (
        <section className='box'>
            <input 
                type="text" 
                className='Buscador-Input' 
                placeholder='🔎' 
                value={searchTerm} 
                onChange={handleSearchChange} 
                ref={inputRef}
                style={{ minWidth: '100px', padding: '0 10px', boxSizing: 'border-box' }} // Estilos iniciales
            />
        </section>
    );
}

export default SearchBar;
