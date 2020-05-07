import React, { Component } from 'react';

import './App.css';

// data
import { empleados } from './todos.json';

// subcomponents
import EmpleadoForm from './components/EmpleadoForm';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import './main'; 
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
      title: '¿Deseas eliminar a ' + this.state.empleados[index].nombre + '?',
      showConfirmButton: true,
      confirmButtonText: 'Continuar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      customClass:{
        confirmButton: 'btn btn-outline-danger btn-sm m-4',
        cancelButton: 'btn btn-outline-primary btn-sm m-4',
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
      showConfirmButton: false
    })

  }

  handleAddEmpleado(empleado) {
    MySwal.fire({
      icon: 'success',
      title: empleado.nombre + ' fue agregado',
      showConfirmButton: false,
      timer: 1500
    }).then((result) => {
      this.setState({
        empleados: [...this.state.empleados, empleado]
      })
    })
  }

  handleEditEmpleado(empleado) {

    MySwal.fire({
      icon: 'success',
      title: empleado.nombre + ' fue editado',
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
            <button type="button" className="btn btn-outline-success btn-sm "
              onClick={this.editEmpleado.bind(this, i)} ><strong><i className="fa fa fa-pencil"></i></strong></button>
            <button type="button" className="btn btn-outline-danger btn-sm ml-3"
              onClick={this.removeEmpleado.bind(this, i)}><strong><i className="fa fa-trash-o"></i></strong></button>
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
              <h1>Empleados</h1>
            </div>

            <nav className="nav-menu  ">
              <ul>
                <li className="active"><a href="#header">Registro</a></li>
                <li><a href="#lista">Listado</a></li>
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


              <div className="col-lg-6 order-1 order-lg-2 empleado-img" data-aos="fade-left" data-aos-delay="200" >
                <img src="form.png" className="img-fluid animated center_img" alt="" />
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
                <div className="col-sm-12  ">
                  <div className="member" data-aos="fade-up" data-aos-delay="400">
                    <div className="member-info">
                      <h4>INEIN Infraestructura e Interiores</h4>
                      <span className="mb-3">{this.state.empleados.length} empleados registrados</span>

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

        </main>


      </div>
    );
  }

}



export default App;
