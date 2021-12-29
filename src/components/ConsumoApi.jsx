import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SVG from 'react-inlinesvg'
const MySwal = withReactContent(Swal)

class ConsumoApi extends Component {
    state = {
        pokemonList:[],
        pokemonInfo:[]
    }

    componentDidMount = () => {
        this.getPokemonList()
    }

    getPokemonList = () => {
        axios.get('https://pokeapi.co/api/v2/pokemon').then(
            (response) => {
                const { data } = response;
                let { pokemonList } = this.state
                pokemonList = data.results
                this.setState({
                    pokemonList
                });
            },
            (error) => {
                console.log("Ocurrio un error");
            }
        );
    };
    getInfoPoxemon = (key) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${key}`).then(
            (response) => {
                const { data } = response;
                this.setState({
                    pokemonInfo: data
                });
                this.infoSwal()
            },
            (error) => {
                console.log("Ocurrio un error");
            }
        );
    }
    listArray(array, type) {
        let aux = [];
        array.forEach((element) => {
            aux.push(this.capitalizeFirstLetter(element[type].name))
        })
        let result = ''
        for (let i = 0; i < aux.length; i++) {
            if (i < aux.length - 1) {
                result += aux[i] + ', '
            } else {
                result += aux[i]
            }
        }
        let text = ''
        if (aux.length === 1){
            text = result
        } else {
            var strReplacedWith = " y ";
            var currentIndex = result.lastIndexOf(",");
            result = result.substring(0, currentIndex) + strReplacedWith + result.substring(currentIndex + 1, result.length);
            text = result
        }
        return text
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    infoSwal (){
        const { pokemonInfo } = this.state
        MySwal.fire({
            html:  <div>
                <SVG width="30%" height="30%" loader={<span className="text-secondary font-weight-light font-size-lg">Cargando imagen</span>} src={pokemonInfo.sprites.other.dream_world.front_default} />
                <div className="px-3">
                    <table className="table table-vertical-center font-size-lg mb-0">
                        <thead>
                            <tr>
                                <th scope="col" colSpan="2" className="text-black text-capitalize border-0">{pokemonInfo.name}</th>
                            </tr>
                        </thead>
                        <tbody className="font-size-sm">
                            <tr>
                                <td className="font-weight-bold text-dark p-1">Habilidades</td>
                                <td className="p-1">
                                    <div className="w-max-content mx-auto text-justify">
                                        {this.listArray(pokemonInfo.abilities, 'ability')}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold text-dark p-1">Tipos</td>
                                <td className="p-1">
                                    <div className="w-max-content mx-auto text-justify">
                                        {this.listArray(pokemonInfo.types, 'type')}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold text-dark p-1">Experiencia</td>
                                <td className="p-1">{pokemonInfo.base_experience}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold text-dark p-1">Altura</td>
                                <td className="p-1">{pokemonInfo.height}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold text-dark p-1">Peso</td>
                                <td className="p-1">{pokemonInfo.weight}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>,
            showConfirmButton: false,
            customClass: { popup: 'w-24em', content:'p-0' },
        })
    }
    render() {
        const { pokemonList } = this.state
        return (
            <>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="member" data-aos="fade-up" data-aos-delay="400">
                            <div className="member-info">
                                <h4>Lista de pokemones</h4>
                                    <span className="mb-3">{pokemonList.length} pokemones obtenidos </span>
                                <table className="table table-responsive-sm table-hover mb-0">
                                    <thead className="text-center">
                                        <tr>
                                            <th className="w-20"><h4>NO.</h4></th>
                                            <th className="w-40"><h4>NOMBRE</h4></th>
                                            <th className="w-40"><h4>MÁS INFORMACIÓN</h4></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            pokemonList.map((pokemon, key)=>{
                                                return(
                                                    <tr key = { key }>
                                                        <td>{key+1}</td>
                                                        <td className="text-capitalize">{pokemon.name}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-outline-primary btn-sm p-1" onClick={() => { this.getInfoPoxemon(key+1) }}>
                                                                <i className="las la la-search font-size-lg"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ConsumoApi;