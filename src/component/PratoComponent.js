import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PratoDataService from '../service/PratoDataService';
import RestauranteDataService from '../service/RestauranteDataService'


class PratoComponent extends Component {

  constructor(props) {
      super(props)
      this.state = {
          pratoId: this.props.match.params.pratoId,
          pratoNome: '',
          pratoPreco: '',
          restaurante:{
            restauranteId: '',
            restauranteNome: ''
          },
          restaurantes:[]

      }

      this.onSubmit = this.onSubmit.bind(this)
      this.validate = this.validate.bind(this)

  }

  componentDidMount() {
    this.refreshRestaurantes();

    if (this.state.pratoId === "-1") {
      return
    }

    PratoDataService.retrievePrato(this.state.pratoId)
      .then(response => this.setState({
        pratoNome: response.data.pratoNome,
        pratoPreco: response.data.pratoPreco,
        restaurante: response.data.restaurante
    }))
  }

  refreshRestaurantes() {
      RestauranteDataService.retrieveAllRestaurantes()
          .then(
              response => {
                  this.setState({ restaurantes: response.data })
              }
          );
          console.log(this.state.restaurantes);
  }

    onSubmit(values) {

      let prato = {
          pratoId: this.state.pratoId,
          pratoNome: values.pratoNome,
          pratoPreco: values.pratoPreco,
          restaurante: values.restaurante
      }

      console.log(prato)

      if (this.state.pratoId === "-1") {
          PratoDataService.createPrato(prato)
              .then(() => this.props.history.push('/prato'))
      } else {
          PratoDataService.updatePrato(this.state.pratoId, prato)
              .then(() => this.props.history.push('/prato'))
      }

    }

    validate(values) {
        let errors = {}
        if (!values.pratoNome) {
            errors.pratoNome = 'Entre com um Nome'
        } else if (values.pratoNome.length < 5) {
            errors.pratoNome = 'Enter atleast 5 Characters in Nome'
        }

        return errors

    }

      render() {

        let {pratoNome, pratoId, pratoPreco, restaurante} = this.state;
        return (
          <>
            <div>
              <h3>Course</h3>
              <div className="container">
                <Formik initialValues={{pratoNome:pratoNome, pratoId:pratoId, pratoPreco:pratoPreco, restaurante: restaurante}}
                  onSubmit={this.onSubmit}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validate={this.validate}
                  enableReinitialize={true}>
                  {
                    (props) => (
                      <Form>
                      <ErrorMessage name="pratoNome" component="div" className="alert alert-warning" />
                        <fieldset className="form-group">
                          <label>Prato Id</label>
                          <Field className="form-control" type="text" name="pratoId" disabled />
                        </fieldset>
                        <fieldset className="form-group">
                          <label>Restaurante Id</label>
                          <Field className="form-control" component="select" name="restaurante.restauranteId">
                            <option value="">Selecionar</option>
                            {
                                  this.state.restaurantes.map(
                                      restaurante =>
                                        <option key={restaurante.restauranteId} value={restaurante.restauranteId}>{restaurante.restauranteNome}</option>
                                  )
                              }

                          </Field>
                        </fieldset>
                        <fieldset className="form-group">
                          <label>Prato Nome</label>
                          <Field className="form-control" type="text" name="pratoNome"/>
                        </fieldset>
                        <fieldset className="form-group">
                          <label>Preço</label>
                          <Field className="form-control" type="text" name="pratoPreco"/>
                        </fieldset>
                        <button className="btn btn-success" type="submit">Save</button>
                      </Form>
                    )
                  }
                </Formik>
              </div>
            </div>
<script src="https://unpkg.com/react/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom/dist/react-dom.min.js"></script>
<script src="https://unpkg.com/react-input-mask/dist/react-input-mask.min.js"></script>
          </>
        )
    }

}

export default PratoComponent
