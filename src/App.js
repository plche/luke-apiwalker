import './App.css';
import FormularioRecurso from "./components/FormularioRecurso/FormularioRecurso";
import MostrarRecurso from "./components/MostrarRecurso/MostrarRecurso";
import axios from "axios";
import {useEffect, useState} from "react";
import MostrarError from "./components/MostrarError/MostrarError";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MostrarPeoplePorId from "./components/MostrarPeoplePorId/MostrarPeoplePorId";

const Home = props => {
    const {listaRecursos, handleOnSubmit, recursoDetalle, error} = props;

    return (
        <>
            <FormularioRecurso listaRecursos={listaRecursos} handleOnSubmit={handleOnSubmit} />
            {
                (recursoDetalle.length !== 0) ? <MostrarRecurso recursoDetalle={recursoDetalle} /> : <div></div>
            }
            {
                error ? <MostrarError /> : <div></div>
            }
        </>
    );
}

const App = () => {
    const recursoInicial = {nombre: '', id: ''};
    const [recurso, setRecurso] = useState(recursoInicial);
    const [listaRecursos, setListaRecursos] = useState([]);
    const [recursoDetalle, setRecursoDetalle] = useState([]);
    const [error, setError] = useState(false);
    const apiURL = 'https://swapi.dev/api/';

    const prepararRecursoDetalles = (recursoNombre, recursoData) => {
        if (recursoNombre === "people") {
            // get homeworld
            axios.get(recursoData.homeworld)
                .then(respuesta => {
                    const homeworld = respuesta.data.name;
                    const nuevoRecursoDetalle = {
                        "Name": recursoData.name,
                        "Height": recursoData.height,
                        "Hair Color": recursoData.hair_color,
                        "Birth Year": recursoData.birth_year,
                        "Homeworld": homeworld
                    }
                    setRecursoDetalle(recursoDetallePrev => Object.entries(nuevoRecursoDetalle));
                });
        }
        if (recursoNombre === "planets") {
            const nuevoRecursoDetalle = {
                "Name": recursoData.name,
                "Rotation Period": recursoData.rotation_period,
                "Climate": recursoData.climate,
                "Terrain": recursoData.terrain,
                "Population": recursoData.population
            }
            setRecursoDetalle(recursoDetallePrev => Object.entries(nuevoRecursoDetalle));
        }
        if (recursoNombre === "films") {
            const nuevoRecursoDetalle = {
                "Title": recursoData.title,
                "Opening Crawl": recursoData.opening_crawl,
                "Director": recursoData.director,
                "Producer": recursoData.producer,
                "Release Date": recursoData.release_date
            }
            setRecursoDetalle(recursoDetallePrev => Object.entries(nuevoRecursoDetalle));
        }
        if (recursoNombre === "species") {
            const nuevoRecursoDetalle = {
                "Name": recursoData.name,
                "Classification": recursoData.classification,
                "Skin Colors": recursoData.skin_colors,
                "Average Lifespan": recursoData.average_lifespan,
                "Language": recursoData.language
            }
            setRecursoDetalle(recursoDetallePrev => Object.entries(nuevoRecursoDetalle));
        }
        if (recursoNombre === "vehicles") {
            const nuevoRecursoDetalle = {
                "Name": recursoData.name,
                "Model": recursoData.model,
                "Manufacturer": recursoData.manufacturer,
                "Crew": recursoData.crew,
                "Vehicle Class": recursoData.vehicle_class
            }
            setRecursoDetalle(recursoDetallePrev => Object.entries(nuevoRecursoDetalle));
        }
        if (recursoNombre === "starships") {
            const nuevoRecursoDetalle = {
                "Name": recursoData.name,
                "Model": recursoData.model,
                "Manufacturer": recursoData.manufacturer,
                "Crew": recursoData.crew,
                "Starship Class": recursoData.starship_class
            }
            setRecursoDetalle(recursoDetallePrev => Object.entries(nuevoRecursoDetalle));
        }
        setError(false);
    }

    useEffect(() => {
        axios.get(apiURL)
            .then(respuesta => {
                setListaRecursos(listaRecursosPrev => Object.keys(respuesta.data));
                console.log("107: listaRecursos =", listaRecursos);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (recurso.nombre !== '' && recurso.id !== '') {
            axios.get(`https://swapi.dev/api/${recurso.nombre}/${recurso.id}`)
                .then(respuesta => prepararRecursoDetalles(recurso.nombre, respuesta.data))
                .catch(err => {
                    setRecursoDetalle([]);
                    setError(true)
                });
        }
    }, [recurso]);

    const handleOnSubmit = event => {
        event.preventDefault();
        console.log("125: event.target =", event.target);
        console.log("126: event.target.recursoNombre =", event.target.recursoNombre);
        console.log("127: event.target.recursoNombre.value =", event.target.recursoNombre.value);
        const nuevoRecurso = {nombre: event.target.recursoNombre.value, id: event.target.recursoId.value};
        setRecurso(recursoPrev => nuevoRecurso);
        console.log("130: recursoId =", recurso.id);
        console.log("131: recursoNombre =", recurso.nombre);
    }

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/:id" render={routeProps => <MostrarPeoplePorId {...routeProps} />} />

                    <Route path="/" render={() => <Home listaRecursos={listaRecursos} handleOnSubmit={handleOnSubmit}
                                                  recursoDetalle={recursoDetalle} error={error} />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
