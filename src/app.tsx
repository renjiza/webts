import { Component } from 'inferno'

import Header from './components/header'
import Sidemenu from './components/sidemenu'
import Router from './components/router'

import './assets/inf.less';

export default class App extends Component<any, any> {

    constructor(props) {
        super(props)
    }	     

    render () {        
        return (
            <div className="app">
                <Header />
                <div className="igroup">
                    <div className="igroupbackground"></div>
                    <Sidemenu />                    
                    <div className="icontent">                        
                        <Router />
                    </div>
                </div>
            </div>
        )
    }
}