import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = {
    termino : '',
    imagenes : [],
    pagina : ''
  }

  paginaAnterior = () => {
    
    let pagina = this.state.pagina;

    if(pagina === 1) return null;

    pagina -=1;

    this.setState({
      pagina
    }, () => {
      this.consultarApi();
    });

    //console.log(pagina);
  }
  paginaSiguiente = () => {

    let pagina = this.state.pagina;

    pagina +=1;

    this.setState({
      pagina
    }, () =>{
      this.consultarApi();
    });

    //console.log(pagina);
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=22472382-e0a4ad91a2567afea28af95c8&q=${termino}&per_page=30&page=${pagina}`;

    console.log(url);
    fetch(url)
    .then(respuesta => respuesta.json() )
    .then(resultado => this.setState({ imagenes : resultado.hits }) )
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
           <Resultado
             imagenes={this.state.imagenes}
             paginaAnterior={this.paginaAnterior}
             paginaSiguiente={this.paginaSiguiente}
           />
        </div>
      </div>
    );
  }
}

export default App; 