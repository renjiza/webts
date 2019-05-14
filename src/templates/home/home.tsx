import { Component } from 'inferno'
import { inject, observer } from 'inferno-mobx';


@inject('global') 
@observer
class Home extends Component<any, any> {

    componentWillMount() {
        document.title = "Home - Play With Me"
    }

    render () {
        const { global } = this.props

        return (
            <div className="icontainer">
                <div className="font-14">
                    Halo <b className="font-14 bold">{global.auth.lastname}, {global.auth.firstname}</b> !
                </div>           
            </div>
        )
    }
}

export default Home
