import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Root from './containers/Root.js';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(reducer, applyMiddleware(thunk));
console.log('store init:==')
console.log(store.getState())

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <Root />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
