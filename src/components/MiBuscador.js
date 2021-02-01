import React from 'react';

const MiBuscador = (props) =>{
    return(
        <div className="col col-sm-4">
            <input className="form-control"
            value={props.value}
            onChange={(event)=> props.setSearchValue(event.target.value)}
            placeholder="Buscar la Imagen que quieras...">
            </input>
        </div>
    )
}

export default MiBuscador;