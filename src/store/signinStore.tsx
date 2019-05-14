import { observable, action } from 'mobx'


class SigninStore {
    @observable input = {
        email: 'renji.izaki@gmail.com',
        password: '123'
    }    

    @observable notif = {}
}

const signin = new SigninStore()

export default signin