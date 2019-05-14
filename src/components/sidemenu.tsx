import { Component } from 'inferno'
import { Link } from 'inferno-router'
import { observer, inject } from 'inferno-mobx'


const sidemenuRoute = [
    {
        path: '/home',
        label: 'Home',
        icon: 'far fa-home',
    },
    {
        path: '/user/view',
        label: 'User',
        icon: 'far fa-user',
    },
    {
        path: '/item/add',
        label: 'Item',
        icon: 'far fa-box',
    },
    {
        path: '/vendor/add',
        label: 'Supplier',
        icon: 'far fa-truck',
    }
];

@inject('global') 
@observer
class Sidemenu extends Component<any, any> {

    constructor(props) {
        super(props)
    }

    readonly state = {
        filter: '',
        sidemenuRoute: sidemenuRoute
    }    

    filterMenu = (e) => {
        this.setState({
            filter: e.target.value
        })
    }

    render() {
        const { global } = this.props
        const sidemenuRoute = this.state.sidemenuRoute.filter(o => {
            const regex = new RegExp(this.state.filter, "gi");
            return regex.test(o.label)
        })


        return (
            <div className="imenu" style={{ display: (global.currentPath === '/') ? 'none' : 'block' }}>
                <div className="search">
                    <input type="text" value={this.state.filter} onInput={this.filterMenu} placeholder="Cari Menu" />
                </div>
                <div className="scrollable">
                    {sidemenuRoute.map(o => {
                        return (
                            <div className={"item " + (o.path === global.currentPath ? "active" : "")}>
                                <Link to={`${o.path}`}>
                                    <i className={o.icon}></i> {o.label}
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <div className="footer">

                </div>
            </div>
        )
    }
}

export default Sidemenu