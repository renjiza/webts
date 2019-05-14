import { Component } from 'inferno'
import { Switch, Route } from 'inferno-router'

import Signin from '../templates/signin/signin'
import AsyncTemplate from '../asynctemplate'


class Router extends Component<any, any> {
    render () {
        return (
            <Switch>
                <Route path="/:module?/:type?/:id?" component={(props: any) => <AsyncTemplate param={props.match} />} />
            </Switch>
        )
    }
}

export default Router