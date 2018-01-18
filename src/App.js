import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Test from './components/Test';
import listStore from './components/testStore';
import { Provider } from 'mobx-react';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/test" exact component={Test} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
