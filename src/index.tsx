import { Component, render } from 'inferno'
import { BrowserRouter } from 'inferno-router'
import { Provider, inject, observer } from 'inferno-mobx'
import Cookies from 'universal-cookie'

import global from './store/globalStore'
import signin from './store/signinStore'
import item from './store/itemStore'

import App from './app';

const container = document.getElementById('app');
const cookies = new Cookies()
const stores = { global, signin, item }

@inject('global') @observer
class RootApp extends Component<any, any> {

	componentWillMount() {
		this.props.global.auth = {
			isLogged: (cookies.get("inf-il") || false),
			client: (cookies.get("inf-cn") || ''),
			firstname: (cookies.get("inf-fn") || ''),
			lastname: (cookies.get("inf-ln") || ''),
			email: (cookies.get("inf-em") || ''),
		}
	}

	render () {		
		return (
			<BrowserRouter><App /></BrowserRouter>
		)
	}
}

render(
	<Provider {...stores}>
		<RootApp />
	</Provider>, 
	container);
