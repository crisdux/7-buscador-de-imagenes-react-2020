import React, {useState, useEffect} from 'react'
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'
function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(5);

  useEffect(()=> {
    const consultarAPI = async () => {
      if(busqueda === '') return;
      const imagenesPorPagina =30;
      const key = `19353612-67e8da93449efc7d8d759413f`;
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
      const res = await fetch(url);
      const resultado = await res.json();
      guardarImagenes(resultado.hits);

      //calcular total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits /imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'})
    }
    consultarAPI();

  },[busqueda, paginaactual])

  //definir la pagina anteior 
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    console.log(nuevaPaginaActual);
    if(nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  }
  //definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if(nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario guardarBusqueda={guardarBusqueda}/>
      </div> 

      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes}/>

        {(paginaactual === 1) ? null : (
          <button type="button" className="btn btn-info mr-1" onClick={paginaAnterior}>
            &laquo; Anterior
          </button>
        )}

        {(paginaactual === totalpaginas) ? null : (
          <button type="button" className="btn btn-info mr-1" onClick={paginaSiguiente}>
            Siguiente &raquo; 
          </button>
        )}
      </div> 
    </div>
  );
}

export default App;
