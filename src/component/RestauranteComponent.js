import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import RestauranteDataService from '../service/RestauranteDataService';

class RestauranteComponent extends Component {

  constructor(props) {
      super(props)
      this.state = {
          restauranteId: this.props.match.params.restauranteId,
          restauranteNome: ''
      }

      this.onSubmit = this.onSubmit.bind(this)
      this.validate = this.validate.bind(this)

  }

  componentDidMount() {

    if (this.state.restauranteId === "-1") {
      return
    }

    RestauranteDataService.retrieveRestaurante(this.state.restauranteId)
      .then(response => this.setState({
        restauranteNome: response.data.restauranteNome
    }))
  }

    onSubmit(values) {
      let restaurante = {
          restauranteId: this.state.restauranteId,
          restauranteNome: values.restauranteNome
      }

      if (this.state.restauranteId === "-1") {
          RestauranteDataService.createRestaurante(restaurante)
              .then(() => this.props.history.push('/restaurante'))
      } else {
          RestauranteDataService.updateRestaurante(this.state.restauranteId, restaurante)
              .then(() => this.props.history.push('/restaurante'))
      }

    }

    validate(values) {
        let errors = {}
        if (!values.restauranteNome) {
            errors.restauranteNome = 'Entre com um Nome'
        } else if (values.restauranteNome.length < 5) {
            errors.restauranteNome = 'Enter atleast 5 Characters in Nome'
        }

        return errors

    }

      render() {

        let {restauranteNome, restauranteId} = this.state
        return (
          <>
            <div>
              <h3>Course</h3>
              <div className="container">
                <Formik initialValues={{restauranteNome:restauranteNome, restauranteId:restauranteId}}
                  onSubmit={this.onSubmit}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validate={this.validate}
                  enableReinitialize={true}>
                  {
                    (props) => (
                      <Form>
                      <ErrorMessage name="restauranteNome" component="div" className="alert alert-warning" />
                        <fieldset className="form-group">
                          <label>Restaurante Id</label>
                          <Field className="form-control" type="text" name="restauranteId" disabled />
                        </fieldset>
                        <fieldset className="form-group">
                          <label>Restaurante Nome</label>
                          <Field className="form-control" type="text" name="restauranteNome"/>
                        </fieldset>
                        <button className="btn btn-success" type="submit">Save</button>
                      </Form>
                    )
                  }
                </Formik>
              </div>
            </div>
          </>
        )
    }

}

export default RestauranteComponent
