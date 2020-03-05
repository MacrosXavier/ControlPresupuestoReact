import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';

function Formulario(props){

    const { guardarGasto, guardarCrearGasto} = props;

    // definimos el state
    const [nombreGasto, guardarNombreGasto] = useState('');
    const [cantidadGasto, guardarCantidadGasto] = useState(0);
    const [error, guardarError] = useState(false);

    const agregarGasto = e => {
        e.preventDefault();

        // validar gasto
        if( cantidadGasto < 1 || isNaN(cantidadGasto) || nombreGasto ===''){
            guardarError(true);
            return;
        }

        // construir un objeto gasto
        const gasto = {
            nombreGasto,
            cantidadGasto,
            id: shortid.generate()
        }

        // pasar el gasto al compenente principal
        guardarGasto(gasto)
        guardarCrearGasto(true)

        // eliminar alerta
        guardarError(false)

        // formatear el form
        guardarNombreGasto('')
        guardarCantidadGasto('')
    }

    return(
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus Gastos aquí</h2>

            {error ? <Error mensaje="Ambos campos son obligatorios o Presupesto Incorrecto" /> : null }

            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    onChange={ e => guardarNombreGasto( e.target.value )}
                    value={nombreGasto}
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    onChange={ e => guardarCantidadGasto( parseInt(e.target.value, 10) )}
                    value={cantidadGasto}
                />
            </div>

            <input type="submit" className="button-primary u-full-width" value="Agragar Gasto" />

        </form>
    )
}

export default Formulario;