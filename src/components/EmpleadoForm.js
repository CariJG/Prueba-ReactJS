import React, { Component } from 'react';
var msgSuccess = "Valor correcto";
//const regex_tel = "/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})" +"\" +"2([0-9]{4})"
class Empleados extends Component {
  constructor(args) {
    super(args);
    //Atributos del empleado 
    this.state = {
      nombre: '',
      telefono: '',
      nss: '',
      rfc: ''
    };
    if (args.empleado) {
      args.empleado.edit = true;
      this.state = args.empleado;
    }
    //Registrar métodos
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Evento a ejecutar al enviar formulario
  handleSubmit(e) {
    var empleado = this.state;
    e.preventDefault();
    if (/[a-z,A-Z,á,é,í,ó,ú,â,ê,ô,ã,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô,Ã,Õ,Ç,ü,ñ,Ü,Ñ,' ']+/.test(empleado.nombre) &&
      /^^(\d{10})$/.test(empleado.telefono) &&
      /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/.test(empleado.rfc) &&
      /^(\d{2})(\d{2})(\d{2})\d{5}$/.test(empleado.nss)) {
      if (this.state.edit) {
        this.props.onEditEmpleado(empleado);
      }
      else {
        this.props.onAddEmpleado(empleado); 
        this.setState({
          nombre: '',
          telefono: '',
          nss: '',
          rfc: ''
        });
      }
    }
  }
  //Evento a ejecutar al escribir texto
  handleInputChange(e) {
    const { value, name } = e.target; 
    this.setState({
      [name]: value
    });
  }
  //Actualizar html
  render() {
    let agregar =
      <button className="btn btn-outline-primary col-sm-6 col-md-6 mt-2" type="submit"><strong>Agregar</strong></button >;
    let modificar =
      <button className="btn btn-outline-primary col-sm-6 col-md-6 mt-2" type="submit"><strong>Modificar</strong></button >;
    let msgModificar = <h6 className="pt-3 text-center ">Escribe los nuevos datos</h6>;
    let line = <hr />;
    return (
      <form onSubmit={this.handleSubmit} data-aos="fade-up" data-aos-delay="600" className="was-validated needs-validation m-0" noValidate>
        {this.state.edit ? msgModificar : ""}
        {this.state.edit ? line : ""}
        <div className="form-row col-sm-12 p-0">
          <div className="form-group col-md-6">
            <label htmlFor="validar_nombre"><strong>Nombre</strong></label>
            <input className="form-control form-control-sm" id="validar_nombre" name="nombre" type="text"
              pattern="[a-z,A-Z,á,é,í,ó,ú,â,ê,ô,ã,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô,Ã,Õ,Ç,ü,ñ,Ü,Ñ,' ']+" value={this.state.nombre}
              onChange={this.handleInputChange} maxLength="30" required />
            <div className="valid-feedback msgValidation">  {msgSuccess} </div>
            <div className="invalid-feedback msgValidation">Incorrecto. Ej. Luis López</div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="validar_telefono text-left"><strong>Teléfono</strong></label>
            <input className="form-control form-control-sm" id="validar_telefono" name="telefono" type="text"
              pattern="^(\d{10})$" value={this.state.telefono}
              onChange={this.handleInputChange} maxLength="10" required />
            <div className="valid-feedback msgValidation">  {msgSuccess} </div>
            <div className="invalid-feedback msgValidation">Incorrecto. Ej. 1234567890</div>
          </div>
        </div>
        <div className="form-row col-sm-12 p-0">
          <div className="form-group col-md-6">
            <label htmlFor="validar_rfc"><strong>RFC</strong></label>
            <input className="form-control form-control-sm" id="validar_rfc" name="rfc" type="text"
              pattern="^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$" value={this.state.rfc}
              onChange={this.handleInputChange} maxLength="13" required />
            <div className="valid-feedback msgValidation">  {msgSuccess} </div>
            <div className="invalid-feedback msgValidation">Incorrecto. Ej. ABCD001122ABC</div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="validar_nss"><strong>NSS</strong></label>
            <input className="form-control form-control-sm" id="validar_nss" name="nss" type="text" value={this.state.nss}
              pattern="^(\d{2})(\d{2})(\d{2})\d{5}$"
              onChange={this.handleInputChange} maxLength="11" required />
            <div className="valid-feedback msgValidation">  {msgSuccess} </div>
            <div className="invalid-feedback msgValidation">Incorrecto. Ej. 12345678901</div>
          </div>
        </div>
        <div className="text-center" data-aos="fade-up" data-aos-delay="600">
          {this.state.edit ? modificar : agregar}
        </div>
      </form>
    )
  }
}

export default Empleados;
