import { Component } from 'inferno'
import { observer } from 'inferno-mobx'

import { ucwords, get } from '../components/minilib'

@observer
export default class View extends Component {
    readonly state = {
        data: []
    }

    constructor (props) {
        super(props)
    }    

    componentWillMount() {
        get('https://jsonplaceholder.typicode.com/photos', {}, (res) => {
            this.setState({ data: res })
        })
        document.title = `View ${ucwords('main')} - Play With Me`
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name] : value
        });
    }

    render () {
        const data = this.state.data;
        const format = [
            { label: "ID", field: "id", type: "string" },
            { label: "Album ID", field: "albumId", type: "string" },
            { label: "Title", field: "title", type: "string" },
            { label: "Url", field: "url", type: "string" },
            { label: "Thumbnail", field: "thumbnailUrl", type: "datetime" },

        ];
        return (
            <div>
                <div className="iheader">
                    <h2 className="text-white ucwords">title</h2>
                </div>   

                <DataList data={data} format={format} />
            </div>
        )
    }
}

const DataList = (prop) => {
    return (
        <div className="itable">
            <div className="itable-flexible">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <label>#</label>
                            </th>
                            {prop.format.map((obj, i) => (
                                <th key={i}>
                                    <label>{obj.label}</label>                            
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {prop.data.map((obj, i) => (
                            <DataRow data={obj} format={prop.format} no={i+1} key={i} />
                        ))}
                    </tbody>
                </table>        
            </div>
        </div>
    )
}

const DataRow = (prop) => (
    <tr>
        <td>{prop.no}</td>
        {prop.format.map((obj) => (
            <td>
                {prop.data[obj.field]}
            </td>        
        ))}
    </tr>        
)