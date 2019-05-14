import { Component } from 'inferno'


export default class Vendor extends Component<any, any> {
    constructor (props) {
        super(props)
        this.state = {
            code: '',
            name: ''
        }
    }

    componentWillMount() {
        document.title = "Supplier - INF App"
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name] : value
        });
    }

    create = () => {
        fetch('http://localhost:1313/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.input)
        })
    }

    render () {
        return (
            <div>
                <form>
                    <div className="iheader">
                        <h2>Supplier</h2>
                    </div>
                    <div className="grid">
                        <div className="row">
                        
                            <input width="desktop-30 tab-30 mobile-100 small-100"
                                name="code" value={this.state.code} onInput={this.handleInputChange} />                            

                            <input width="desktop-40 tab-50 mobile-100 small-100"
                                name="name" value={this.state.name} onInput={this.handleInputChange} />                            

                            <div className="desktop-30 tab-20 mobile-100 small-100">
                                <div onClick={this.create} className="ibutton input circle back-blue">
                                    <i className="far fa-check fa-lg text-white"></i>
                                </div>                           
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

