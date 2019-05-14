import { Component } from 'inferno'
import { observer, inject } from 'inferno-mobx'

import { ucwords } from './components/minilib'


const LoadingIndicator = () => (
    <div>Loading..</div>
)

const PageNotFound = () => (
    <div>Page Not Found (404)</div>
)

@inject('global') 
@observer
class AsyncTemplate extends Component<any, any> {    
    constructor(props: any) {
        super(props);
        this.state = {
            Module: null
        }
    }

    async componentWillMount () {
        const param = this.props.param.params;
        this.props.global.currentPath = this.props.param.url
        this.props.global.params = param
        switch (true) {
            case (typeof param.module === 'undefined'):
                await import(`./templates/signin/signin`)
                    .then(Module => this.setState({ Module: Module.default }))
                    .catch((e) => {console.log(e); this.setState({ Module: PageNotFound })})
            break;
            case (typeof param.type === 'undefined'):
                await import(`./templates/${param.module}/${param.module}`)
                    .then(Module => this.setState({ Module: Module.default }))
                    .catch((e) => { console.log(e); this.setState({ Module: PageNotFound }) })
            break;
            case (param.type === "view"):
                await import(`./templates/viewtable`)
                    .then(Module => this.setState({ Module: Module.default }))
                    .catch((e) => { console.log(e); this.setState({ Module: PageNotFound }) })
            break;
            case (param.type === "add" || param.type === "update"):
                await import(`./templates/${param.module}/${param.module}Input`)
                    .then(Module => this.setState({ Module: Module.default }))
                    .catch((e) => { console.log(e); this.setState({ Module: PageNotFound }) })
            break;
            default:
                await import(`./templates/${param.module}/${param.module}${ucwords(param.type)}`)
                    .then(Module => this.setState({ Module: Module.default }))
                    .catch((e) => { console.log(e); this.setState({ Module: PageNotFound }) })
        }
    }

    public render () {
        const { Module } = this.state;
        return (
            <>{Module ? <Module /> : <LoadingIndicator />}</>
        )
    }
}

export default AsyncTemplate