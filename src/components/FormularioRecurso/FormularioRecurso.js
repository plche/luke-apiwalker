const FormularioRecurso = props => {
    const {handleOnSubmit, listaRecursos} = props;
    console.log("listaRecursos =", listaRecursos);

    return (
        <form onSubmit={event => handleOnSubmit(event)}>
            <label htmlFor="buscarRecurso">Search for: </label>
            <select name="recursoNombre" id="recursoNombre">
                {
                    listaRecursos.map((recurso, index) => <option key={'recurso_' + index} value={recurso}>
                        {recurso.charAt(0).toUpperCase() + recurso.slice(1)}</option>)
                }
            </select>
            <label htmlFor="id"> Id: </label>
            <input type="text" name="recursoId" id="recursoId" />
            <button type="submit">Search</button>
        </form>
    );
}

export default FormularioRecurso;
