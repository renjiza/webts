import { Component } from 'inferno'
import { Link } from 'inferno-router'
import { observer, inject } from 'inferno-mobx'
import Cookies from 'universal-cookie'

import { get, post } from './minilib'

const cookies = new Cookies()


@inject('global', 'signin') 
@observer
class Header extends Component<any, any> {
    
    constructor(props) {
        super(props)
    }	

    readonly state = {
        activeContextHeader: false,
    }

    componentWillMount () {
        get("auth", { token: cookies.get("inf-token") }, res => {
            if (res.status === true) {
                this.props.global.auth = res.content                
            } else {
                cookies.remove("inf-token");
                cookies.remove("inf-il");
                this.props.global.auth = {
                    isLogged: false,
                    token: null
                }
            }
        })
    }

    toggleActiveContextHeader = () => {
        this.setState({
            activeContextHeader: !this.state.activeContextHeader
        })
    }

    logOut = () => {
        post("auth/signout", {token: this.props.global.auth.token}, res => {
            cookies.remove("inf-token");
            cookies.remove("inf-il");
        })
        this.props.global.auth = {
            isLogged: false,
            token: null
        }
    }

    render () {
        const { global } = this.props
        return (
            <div className="itopheader" style={{ display: global.auth.isLogged ? 'block' : 'none' }}>
                <div className="text">
                    <Link to="/">
                        <h3 className="text-white">{global.auth.client}</h3>
                    </Link>
                </div>
                <div className="user text-white" onClick={this.toggleActiveContextHeader}>
                    <i className="fas fa-circle text-yellow"></i> {global.auth.email}
                <div onMouseLeave={this.toggleActiveContextHeader} style={{ display: (this.state.activeContextHeader ? 'block' : 'none'), top: '2.5em', right: '1em' }} className="context">
                        <Link to="/">
                            <div onClick={this.logOut} className="item">
                                {global.redirect('/', !global.auth.isLogged)}
                                <i className="far fa-power-off"></i> Out
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header