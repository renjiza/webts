import { Component } from 'inferno'
import { inject, observer } from 'inferno-mobx'

import { get, post, ucwords, number, MiniJsonTable } from '../../components/minilib'

@inject('global', 'item') 
@observer
class Item extends Component<any, any> {
    constructor(props) {
        super(props)  
        this.input = this.input.bind(this)
        this.inputPieces = this.inputPieces.bind(this)
    }

    formatPieces = [
        { label: "Satuan", field: "name", type: "string" },
        { label: "Rasio", field: "ratio", type: "string" },
        { label: "Harga Jual", field: "price", type: "number" },
    ]

    componentWillMount() {
        document.title = "Item - INF App"
        const params = this.props.global.params
        if (params.type === 'update') {
            get(`item/${params.id}`, {}, res => {
                console.log('get res',res)
                this.props.item.input = res.content
            })
        }
    }

    input = (e) => {
        this.props.item.input[e.target.name] = e.target.value
    } 

    inputPieces = (e) => {
        if (typeof e.target.attributes['data-number'] !== 'undefined') {
            return this.props.item.ipieces[e.target.name] = number(e.target.value)
        } else {
            return this.props.item.ipieces[e.target.name] = e.target.value
        }
    } 

    addPiece = () => {
        this.props.item.ipieces.ratio = (this.props.item.ipieces.ratio).replace(/[^0-9.]/gi, '')
        this.props.item.ipieces.price = (this.props.item.ipieces.price).replace(/[^0-9.]/gi, '')
        this.props.item.input.pieces.push(this.props.item.ipieces)
        this.props.item.ipieces = {}
    }

    create = () => {
        post("item", this.props.item.input, res => {
            if (res.status) {

            }
        })
    }

    render() {
        const { global, item } = this.props
        return (
            <div className="icontainer">
                <div className="inside">
                    <div className="iheader nopadding-top sticky-top back-white bold">
                            {ucwords(global.params.type)} Item
                            <div onClick={this.create} className="ibutton back-transparent text-blue float-right" style={{ margin: '-10px 0 0 0'}}>
                                <i className="far fa-check text-blue"></i> Simpan
                            </div>                                                
                    </div>
                    <div className="grid">

                        <div className="row">
                            <div className="iinput desktop-30 tab-30 mobile-100 small-100">
                                <label>Kategori *</label>
                                <select name="categoryid" value={item.input.categoryid} onChange={this.input}>
                                    <option value=""></option>
                                    <option value="1">Sabun</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="iinput desktop-25 tab-25 mobile-100 small-100">
                                <label>Barcode Item *</label>
                                <input type="text" name="barcode" value={item.input.barcode} onInput={this.input} spellCheck={false} />
                            </div>

                            <div className="iinput desktop-25 tab-25 mobile-100 small-100">
                                <label>No. Item *</label>
                                <input type="text" name="number" value={item.input.number} onInput={this.input} spellCheck={false} />
                            </div>

                            <div className="iinput desktop-50 tab-50 mobile-100 small-100">
                                <label>Nama Item *</label>
                                <input type="text" name="nama" value={item.input.nama} onInput={this.input} spellCheck={false} />
                            </div>

                            <div className="iinput desktop-100 tab-100 mobile-100 small-100">
                                <label>Deskripsi</label>
                                <textarea name="desc" value={item.input.desc} onInput={this.input} rows={3} spellCheck={false} />
                            </div>

                            <div className="desktop-100 tab-100 mobile-100 small-100">
                                <h3>
                                    Satuan
                                </h3>
                            </div>

                            <div className="iinput desktop-40 tab-40 mobile-100 small-100">
                                <label>Nama Satuan *</label>
                                <input type="text" name="name" value={item.ipieces.name} onInput={this.inputPieces} spellCheck={false} />
                            </div>

                            <div className="iinput desktop-20 tab-20 mobile-100 small-100">
                                <label>Ratio / Jml Terkecil *</label>
                                <input type="text" name="ratio" data-number value={item.ipieces.ratio} onInput={this.inputPieces} spellCheck={false} />
                            </div>

                            <div className="iinput desktop-30 tab-30 mobile-100 small-100">
                                <label>Harga Jual *</label>
                                <input type="text" name="price" data-number value={item.ipieces.price} onInput={this.inputPieces} spellCheck={false} />
                            </div>

                            <div className="desktop-10 tab-10 mobile-100 small-100">
                                <div onClick={this.addPiece} className="ibutton border input back-transparent border-blue text-green">
                                    <i className="far fa-plus text-green"></i> Add
                                </div>
                            </div>

                            <div className="desktop-100 tab-100 mobile-100 small-100">
                                <MiniJsonTable json={item.input.pieces} format={this.formatPieces} />
                            </div>                                                        
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Item