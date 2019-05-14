import { Redirect } from 'inferno-router'
import { observable, action } from 'mobx'


class GlobalStore {
    @observable currentPath = '/'
    @observable params = {}
    @observable auth = {}    

    @action redirect = (path: string, state: boolean) => {
        if (state && path !== this.currentPath) {
            return <Redirect to={path} />
        }
        return false
    }
}

const global = new GlobalStore()

export default global