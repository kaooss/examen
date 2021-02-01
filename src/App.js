import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ImagenList from './components/ImagenList';
import ImageListCabecera from './components/ImageListCabecera';
import MiBuscador from './components/MiBuscador';
import AddFavoritos from './components/AddFavoritos';
import RemoverFavoritos from './components/RemoverFavoritos';

const App =() =>{

  const [photo, setPhoto] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [searchValue, setSearchValue] = useState('');

const getPhotoRequest = async (searchValue) =>{
  const url = `https://pixabay.com/api/?key=19825368-2507761a9d6937696279bcf27&q=${searchValue}&image_type=photo`;

  const response = await fetch(url);
  const responseJson = await response.json();

  if(responseJson.hits){
    setPhoto(responseJson.hits);
  }
  };

useEffect(()=>{
  getPhotoRequest(searchValue);
}, [searchValue]);

//leer desde local storage/////
useEffect(()=>{
  const imageFavoritos = JSON.parse(
    localStorage.getItem('local-escalab')
  );
  if (imageFavoritos){
    setFavoritos(imageFavoritos);
  }
  }, []);

const saveToLocalStorage = (items) => {
  localStorage.setItem('local-escalab', JSON.stringify(items));
}

const agregarFavoritosImage = (photo) => {
  const newFavoritoList = [...favoritos, photo];
  setFavoritos(newFavoritoList);
  saveToLocalStorage(newFavoritoList);
};


const removerFavoritosImage = (photo) =>{
  const newFavoritoList = favoritos.filter((favorito) => favorito.id !== photo.id);
  setFavoritos(newFavoritoList);
  saveToLocalStorage(newFavoritoList);
}


  return (
   <div className='container-fluid micontenedor'>
     <div className='row d-flex align-items-center'>
       <ImageListCabecera heading="Listado de Imagenes"/>
       <MiBuscador searchValue={searchValue} setSearchValue={setSearchValue}/>
     </div>
     <div className="row">
     <ImagenList photo={photo} handleFavoritosClick={agregarFavoritosImage} favoritosComponent={AddFavoritos} />
     </div>
     <div className='row d-flex align-items-center'>
       <ImageListCabecera heading="Imagenes Favoritas"/>
     </div>
     <div className="row">
     <ImagenList photo={favoritos} handleFavoritosClick={removerFavoritosImage} favoritosComponent={RemoverFavoritos} />
     </div>
     </div>
   
  )
}

export default App;
