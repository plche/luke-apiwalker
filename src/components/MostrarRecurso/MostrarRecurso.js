const MostrarRecurso = props => {
    const {recursoDetalle} = props;

    return (
        <div style={{margin: "1rem"}}>
            <h1>{recursoDetalle[0][1]}</h1>
            <p>{recursoDetalle[1][0]}: {recursoDetalle[1][1]}</p>
            <p>{recursoDetalle[2][0]}: {recursoDetalle[2][1]}</p>
            <p>{recursoDetalle[3][0]}: {recursoDetalle[3][1]}</p>
            <p>{recursoDetalle[4][0]}: {recursoDetalle[4][1]}</p>
        </div>
    );
}

export default MostrarRecurso;
