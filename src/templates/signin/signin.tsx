import { Component } from 'inferno'
import { inject, observer } from 'inferno-mobx'
import Cookies from 'universal-cookie'
import { post } from '../../components/minilib';

const cookies = new Cookies()


@inject('global', 'signin') 
@observer
class Signin extends Component<any, any> {
    
    constructor(props) {
        super(props)
        this.input = this.input.bind(this)
    }
    
    readonly state = {
        redirect: false
    }

    componentWillMount() {
        document.title = "Masuk - Play With Me"
    }   

    input = (e) => {
        this.props.signin.input[e.target.name] = e.target.value
    }

    auth = () => {
        post("auth", this.props.signin.input, res => {
            if (res.status === true) {
                cookies.set("inf-il", true)
                cookies.set("inf-token", res.content.token)
                this.props.global.auth = res.content
                this.setState({
                    redirect: true
                })
            } else {
                this.props.signin.notif = res
            }
        })
    }    

    render() {
        const { global, signin } = this.props

        return (
            <div className="boxlogin">
                <div className="logo">
                </div>               
                <div className="inputform">
                    <input type="text" name="email" value={signin.input.email} onInput={this.input} placeholder="Email" />
                </div>
                <div className="inputform">
                    <input type="password" name="password" value={signin.input.password} onInput={this.input} placeholder="Password" />
                </div>
                <div className="notification" style={{ display: (signin.notif ? 'block' : 'none')}}>
                    <div className="header text-red"></div>
                    <div className="content text-red">{signin.notif.content}</div>
                </div>
                <div className="buttonlogin">
                    {global.redirect('/home', global.auth.isLogged)}
                    <button onClick={this.auth} class="ibutton circle back-white text-blue border-blue" type="button"> 
                        Masuk <i className="far fa-sign-in text-blue"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Signin