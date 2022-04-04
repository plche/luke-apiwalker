import {useEffect, useState} from "react";
import axios from "axios";
import MostrarError from "../MostrarError/MostrarError";

const MostrarPeoplePorId = props => {
    const {id} = props.match.params;
    const [peopleDetalle, setPeopleDetalle] = useState([]);
    const [error, setError] = useState(false);

    const prepararPeopleDetalles = peopleData => {
        // get homeworld
        axios.get(peopleData.homeworld)
            .then(respuesta => {
                const homeworld = respuesta.data.name;
                const nuevoPeopleDetalle = {
                    "Name": peopleData.name,
                    "Height": peopleData.height,
                    "Hair Color": peopleData.hair_color,
                    "Birth Year": peopleData.birth_year,
                    "Homeworld": homeworld
                }
                setPeopleDetalle(recursoDetallePrev => Object.entries(nuevoPeopleDetalle));
            });
        setError(false);
    }

    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/${id}`)
            .then(respuesta => prepararPeopleDetalles(respuesta.data))
            .catch(err => {
                setPeopleDetalle([]);
                setError(true)
            });
    }, []);

    return (
        <div style={{margin: "1rem"}}>
            {
                (peopleDetalle.length !== 0)
                    ? <>
                        <h1>{peopleDetalle[0][1]}</h1>
                        <p>{peopleDetalle[1][0]}: {peopleDetalle[1][1]}</p>
                        <p>{peopleDetalle[2][0]}: {peopleDetalle[2][1]}</p>
                        <p>{peopleDetalle[3][0]}: {peopleDetalle[3][1]}</p>
                        <p>{peopleDetalle[4][0]}: {peopleDetalle[4][1]}</p>
                    </>
                    : <div></div>
            }
            {
                error ? <MostrarError /> : <div></div>
            }
            <div>
                <br />
                <a href="/">Home</a>
            </div>
        </div>
    );
}

export default MostrarPeoplePorId;