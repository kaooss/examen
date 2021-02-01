import React from 'react';

const ImagenList = (props) =>{
    const FavoritosComponent = props.favoritosComponent;
   return(
        <>
          {props.photo.map((photo, index)=>(
          <div className="imagen-container">
              <img className="d-flex justify-content-start m-2" src={photo.webformatURL} alt={photo.tags} width='250px' height='185px'></img>
              <div 
              onClick={() => props.handleFavoritosClick(photo)}
              className="overlay d-flex align-items-center justify-content">
                  <FavoritosComponent />
              </div>
              </div>
              ))}
        </>
    )
}

export default ImagenList;