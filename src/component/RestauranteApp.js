import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from 'react-bootstrap';

import ListaRestauranteComponent from './ListaRestauranteComponent';
import RestauranteComponent from './RestauranteComponent';
import ListaPratoComponent from './ListaPratoComponent';
import PratoComponent from './PratoComponent';
import NavbarComponent from './NavbarComponent';

class RestauranteApp extends Component {
    render() {
        return (

          <Router>
          <Container>
            <NavbarComponent />
              <>

                <Switch>
                  <Route path="/" exact component={ListaRestauranteComponent} />
                  <Route path="/restaurante" exact component={ListaRestauranteComponent} />
                  <Route path="/restaurante/:restauranteId" component={RestauranteComponent} />
                  <Route path="/prato" exact component={ListaPratoComponent} />
                  <Route path="/prato/:pratoId" component={PratoComponent} />
                </Switch>
              </>
            </Container>
          </Router>
        )
    }
}

export default RestauranteApp
