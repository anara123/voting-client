import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from 'react-router';
import io from 'socket.io-client';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { persistState } from 'redux-devtools';

import remoteActionMiddleware from './remote-action-middleware';
import reducer from './reducer';
import { setState } from './action-creators';


import DevTools from './DevTools';
import App from './App';
import {ResultsContainer} from './components/Results';
import {VotingContainer} from './components/Voting';



const socket = io(`${location.protocol}//${location.hostname}:8090`);

const createStoreWithMiddleware = compose(
	
	applyMiddleware(
		remoteActionMiddleware(socket)
	),

	DevTools.instrument(),

	// Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  	persistState(getDebugSessionKey())

)(createStore);

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./reducer', () =>
      store.replaceReducer(require('./reducer')/*.default if you use Babel 6+ */)
    );
  }

  return store;
}

const store = configureStore();

socket.on('state', state => {
	store.dispatch(setState(state));
});


const routes = (
	<Router>
		<Route component={App}>
			<Route path="/" component={VotingContainer} />
			<Route path="/results" component={ResultsContainer} />
		</Route>
	</Router>
);

ReactDOM.render(
	<Provider store={store}>
		<div>
			{routes}
			<DevTools />
		</div>
	</Provider>,
	document.getElementById('app')
);