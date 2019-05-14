import { Component } from 'inferno'


export const baseUrl = 'http://localhost:1313/'

export function ucwords(str: string) {
    if (str != null) {
        str = str.toString();
        str = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });
    }
    return str;
}

export function number(str: string = '') {    
    const a = parseFloat(str.replace(/[^0-9.]/gi, ''))
    const t = isNaN(a) ? '' : a.toLocaleString('en-EN');
    console.log('a',a, t);
    return t
}

export function get(requestUrl: string, params: object, res: Function) {    
    const esc = encodeURIComponent
    const queryParams = "?" + Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&')
    fetch(baseUrl + requestUrl + queryParams, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        
    })
        .then(raw => raw.json())
        .then(response => res(response))    
}

export function post(requestUrl: string, params: object, res: Function) {
    fetch(baseUrl + requestUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    .then(raw => raw.json())
    .then(response => res(response))
}

export class MiniJsonTable extends Component<any, any> {

    componentWillMount () {
        this.props.json = []
    }

    render () {
        const { json, format } = this.props
        return (
            <div className="itabledet">
                <table>
                    <thead>
                        <tr>
                            {format.map((obj) => (
                                <th>
                                    <label>{obj.label}</label>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>                        
                        {json.map((row, i) => (
                            <tr key={i}>
                                {format.map(obj => (
                                    <td>{(obj.type === 'number') ? number(row[obj.field]) : row[obj.field] }</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}