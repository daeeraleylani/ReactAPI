import React, { useRef, useEffect, useState } from 'react';
import './../assets/estilos/searchBar.css';

function SearchBar({ searchTerm, handleSearchChange }) {
    const inputRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (inputRef.current) {
            const input = inputRef.current;
            
            if (!isHovered) {
                const textWidth = getTextWidth(searchTerm, input.style.font);
                const newWidth = searchTerm.length > 0 
                    ? Math.max(textWidth + 40, 70)
                    : 70;
                
                input.style.width = `${newWidth}px`;
                input.style.borderRadius = searchTerm.length > 0 ? '10px' : '50px';
            }
        }
    }, [searchTerm, isHovered]);

    const getTextWidth = (text, font) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font || getComputedStyle(inputRef.current).font;
        return context.measureText(text).width;
    };

    return (
        <section 
            className='box' 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <input 
                type="text" 
                className='Buscador-Input' 
                placeholder='🔎' 
                value={searchTerm} 
                onChange={handleSearchChange} 
                ref={inputRef}
                style={{ textAlign: 'center' }}
            />
        </section>
    );
}

export default SearchBar;
