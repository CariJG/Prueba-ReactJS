import React, { Component } from 'react'
import './App.css'
import SVG from 'react-inlinesvg'
// data
import { empleados } from './todos.json'
// subcomponents
import EmpleadoForm from './components/EmpleadoForm'
import ConsumoApi from './components/ConsumoApi'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './main'
const MySwal = withReactContent(Swal)

class App extends Component {
  constructor() {
    super();
    this.state = {
      empleados
    }
    this.handleAddEmpleado = this.handleAddEmpleado.bind(this);
    this.handleEditEmpleado = this.handleEditEmpleado.bind(this);
  }

  removeEmpleado(index) { 
    MySwal.fire({
      icon: 'error',
      html:  <div className="font-weight-light">¿Deseas eliminar al empleado <span className="font-weight-bold">{this.state.empleados[index].nombre}</span>?</div>,
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      customClass:{
        confirmButton: 'btn btn-outline-danger btn-sm',
        cancelButton: 'btn btn-outline-primary btn-sm ml-4',
        popup: 'w-auto'
      }
    }).then((result) => {
      if (result.value) {
        this.setState({
          empleados: this.state.empleados.filter((e, i) => {
            return i !== index
          })
        })
      }
    })
  }

  editEmpleado(index) {
    var args = this.state.empleados[index];
    args.index = index;
    MySwal.fire({
      title: 'Modificar empleado', 
      html:  <EmpleadoForm empleado={args} onEditEmpleado={this.handleEditEmpleado} ></EmpleadoForm>,
      showConfirmButton: false,
      customClass:{
        popup: 'w-auto'
      }
    })
  }

  handleAddEmpleado(empleado) {
    MySwal.fire({
      icon: 'success',
      html:  <div className="font-weight-light">El empleado <span className="font-weight-bold">{empleado.nombre}</span> fue agregado</div>,
      showConfirmButton: false,
      timer: 1500,
      customClass:{
        popup: 'w-auto'
      }
    }).then((result) => {
      this.setState({
        empleados: [...this.state.empleados, empleado]
      })
    })
  }

  handleEditEmpleado(empleado) {
    MySwal.fire({
      icon: 'success',
      html:  <div className="font-weight-light">El empleado <span className="font-weight-bold">{empleado.nombre}</span> fue editado</div>,
      showConfirmButton: false,
      timer: 1500
    }).then((result) => {
      this.setState({
        empleados: this.state.empleados.filter((e, i) => {
          if (i === empleado.index) {
            e.nombre = empleado.nombre;
            e.telefono = empleado.telefono;
            e.rfc = empleado.rfc;
            e.nss = empleado.nss;
          }
          return e;
        })
      })
    })
  }

  render() {
    const empleados = this.state.empleados.map((empleado, i) => {
      return (
        <tr className="text-center" key={i}>
          <th scope="row">{i + 1}</th>
          <td>{empleado.nombre}</td>
          <td>{empleado.telefono}</td>
          <td>{empleado.nss}</td>
          <td>{empleado.rfc}</td>
          <th>
            <button type="button" className="btn btn-outline-success btn-sm p-1"
              onClick={this.editEmpleado.bind(this, i)} ><strong><i className="las la la-pencil font-size-lg"></i></strong></button>
            <button type="button" className="btn btn-outline-danger btn-sm ml-3 p-1"
              onClick={this.removeEmpleado.bind(this, i)}><strong><i className="las la la-trash font-size-lg"></i></strong></button>
          </th>
        </tr>
      )
    });
    // RETURN THE COMPONENT
    return (
      <div className="App">
        <header id="header" className="fixed-top d-flex align-items-center">
          <div className="container d-flex align-items-center">
            <div className="logo mr-auto">
              <h1>Sistema CRUD</h1>
            </div>
            <nav className="nav-menu  ">
              <ul>
                <li className="active"><a href="#header">Registro</a></li>
                <li><a href="#lista">Listado de empleados</a></li>
                <li><a href="#api">Consumo API</a></li>
              </ul>
            </nav> 
          </div>
        </header>
        <section id="empleado" className="d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex  flex-column justify-content-center">
                <h1 className="text-center" data-aos="fade-up">Registro</h1>
                <h2 className="pt-3 pb-3 text-center" data-aos="fade-up" data-aos-delay="400">Introduce los datos del nuevo empleado</h2>
                <EmpleadoForm onAddEmpleado={this.handleAddEmpleado}></EmpleadoForm>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 empleado-img text-right" data-aos="fade-left" data-aos-delay="200" >
                <div className="animated">
                  <SVG width="90%" height="90%" src={process.env.PUBLIC_URL+'/svg/addUser.svg'} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <main id="main">
          <section id="lista" className="lista section-bg">
            <div className="container">
              <div className="section-title" data-aos="fade-up">
                <h2>Empleados</h2>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="member" data-aos="fade-up" data-aos-delay="400">
                    <div className="member-info">
                      <h4>Listado de empleados</h4>
                      <span className="mb-3">{this.state.empleados.length} {this.state.empleados.length === 1? 'empleado registrado':'empleados registrados'} </span>
                      <table className="table table-responsive-sm table-hover">
                        <thead className="text-center">
                          <tr>
                            <th scope="col"><h4>NO.</h4></th>
                            <th scope="col"><h4>NOMBRE</h4></th>
                            <th scope="col"><h4>TELÉFONO</h4></th>
                            <th scope="col"><h4>NSS</h4></th>
                            <th scope="col"><h4>RFC</h4></th>
                            <th scope="col"><h4>OPCIONES</h4></th>
                          </tr>
                        </thead>
                        <tbody>
                          {empleados}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="api" className="lista pb-3">
            <div className="container">
              <div className="section-title pb-0" data-aos="fade-up">
                <h2>Consumo API</h2>
                <ConsumoApi/>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
export default App;
