import { observable } from 'mobx'


class ItemStore {
    @observable input = {
        pieces: []
    }
    @observable ipieces = {}
}

const item = new ItemStore()

export default item