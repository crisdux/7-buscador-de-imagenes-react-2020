import React from 'react';
import Imagen from './Imagen'
const ListadoImagenes = ({imagenes}) => {
    return (
        <div className="col-md-12 p-5 m row">
            {imagenes.map(imagen=>(
                <Imagen key={imagen.id} imagen={imagen}/>
            ))}
        </div>
    );
}

export default ListadoImagenes;
