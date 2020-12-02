import React , {useState} from 'react';
import Error from './Error.js'
const Formulario = ({guardarBusqueda}) => {

    const [termino, guardarTermino] = useState('');
    const [error, guardarError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();
        //validar
        if(termino.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarBusqueda(termino);
    }
    return (
        <div>
            <form className="row" onSubmit={buscarImagenes}>
                <div className="form-group col-md-8">
                    <input type="text" 
                    className="form-control form-control-lg" 
                    placeholder="Busca una imagen..." 
                    onChange={e => guardarTermino(e.target.value)}
                    />
                </div>

                <div className="form-group col-md-4">
                    <input type="submit" className="btn btn-block btn-lg btn-outline-danger " placeholder="Busca una imagen..." />
                </div>
            </form>

            {error && <Error mensaje="El campo es requerido"/>}
        </div>
    );
}

export default Formulario;
