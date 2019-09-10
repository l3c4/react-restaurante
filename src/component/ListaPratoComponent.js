import React, { Component } from 'react';
import PratoDataService from '../service/PratoDataService';

class ListaPratoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pratos: [],
            message: null
        }
        this.refreshPratos = this.refreshPratos.bind(this)
        this.updatePratoClicked = this.updatePratoClicked.bind(this)
        this.addPratoClicked = this.addPratoClicked.bind(this)
    }

    componentDidMount() {
        this.refreshPratos();
    }

    refreshPratos() {
        PratoDataService.retrieveAllPratos()
            .then(
                response => {
                    this.setState({ pratos: response.data })
                }
            )
    }

    deletePratoClicked(pratoId) {
        PratoDataService.deletePrato(pratoId)
            .then(
                response => {
                    this.setState({ message: `Delete of prato ${pratoId} Successful` })
                    this.refreshPratos()
                }
            )

    }

    updatePratoClicked(pratoId) {
        this.props.history.push(`/prato/${pratoId}`)
    }

    addPratoClicked() {
        this.props.history.push(`/prato/-1`)
    }

    render() {
        return (
          <>
            <h3>Todos os Pratos</h3>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div>
                <button className="btn btn-success" onClick={this.addPratoClicked}>Novo</button>
            </div>
            <div >
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Prato</th>
                            <th>Restaurante</th>
                            <th>Preço</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                          {
                                this.state.pratos.map(
                                    prato =>
                                        <tr key={prato.pratoId}>
                                            <td>{prato.pratoId}</td>
                                            <td>{prato.pratoNome}</td>
                                            <td>{prato.restaurante.restauranteNome}</td>
                                            <td>{prato.pratoPreco}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updatePratoClicked(prato.pratoId)}>Editar</button><button className="btn btn-warning" onClick={() => this.deletePratoClicked(prato.pratoId)}>Excluir</button></td>
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

export default ListaPratoComponent
