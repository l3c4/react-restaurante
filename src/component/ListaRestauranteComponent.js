import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col } from 'react-bootstrap';

import RestauranteDataService from '../service/RestauranteDataService';

class ListaRestauranteComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            restaurantes: [],
            message: null,
            restauranteNome: ''
        }
        this.refreshRestaurantes = this.refreshRestaurantes.bind(this)
        this.updateRestauranteClicked = this.updateRestauranteClicked.bind(this)
        this.addRestauranteClicked = this.addRestauranteClicked.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.refreshRestaurantes();
    }

    refreshRestaurantes() {
        RestauranteDataService.retrieveAllRestaurantes()
            .then(
                response => {
                    this.setState({ restaurantes: response.data })
                }
            )
    }

    deleteRestauranteClicked(restauranteId) {
        RestauranteDataService.deleteRestaurante(restauranteId)
            .then(
                response => {
                    this.setState({ message: `Delete of restaurante ${restauranteId} Successful` })
                    this.refreshRestaurantes()
                }
            )

    }

    updateRestauranteClicked(restauranteId) {
        this.props.history.push(`/restaurante/${restauranteId}`)
    }

    addRestauranteClicked() {
        this.props.history.push(`/restaurante/-1`)
    }

    onSubmit(values) {
      let restauranteNome = values.restauranteNome;
      RestauranteDataService.retrieveAllRestaurantesByRestauranteNome(restauranteNome)
          .then(
              response => {
                  this.setState({ restaurantes: response.data })
              }
          )
    }

    render() {
      let {restauranteNome} = {restauranteNome: this.state.restauranteNome}
        return (
          <>
            <h3>Todos os Restaurantes</h3>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <Container>
              <Row>
                <Col sm={3}>
                  <button className="btn btn-success" onClick={this.addRestauranteClicked}>Novo</button>
                </Col>
                <Col>
                  <Formik initialValues={{restauranteNome: restauranteNome}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}>
                      {
                        (props) => (
                          <Form>
                            <Row>
                              <Col>
                                <Field className="form-control" type="text" name="restauranteNome" />
                              </Col>
                              <Col>
                                <button className="btn btn-success" type="submit">Pesquisar</button>
                              </Col>
                            </Row>
                          </Form>
                        )
                      }
                  </Formik>
                </Col>
              </Row>
            </Container>
            <div >
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                          {
                                this.state.restaurantes.map(
                                    restaurante =>
                                        <tr key={restaurante.restauranteId}>
                                            <td>{restaurante.restauranteId}</td>
                                            <td>{restaurante.restauranteNome}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateRestauranteClicked(restaurante.restauranteId)}>Editar</button><button className="btn btn-warning" onClick={() => this.deleteRestauranteClicked(restaurante.restauranteId)}>Excluir</button></td>
                                        </tr>
                                )
                            }

                    </tbody>
                </table>
            </div>
          </>
        )
    }
}

export default ListaRestauranteComponent
