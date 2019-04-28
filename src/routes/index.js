import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux'
import AllComponents from '../containers';
import routesConfig from './config';
import BuildingTable from '../components/table/BuildingTable';
import UnitTable from '../components/table/UnitTable';
import RoomTable from '../components/table/RoomTable';
import RoomInfoForm from '../components/form/RoomInfoForm'

@connect(
    state=>state
)
class Routes extends React.Component {
    render() {
        const { type } = this.props.auth
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key =>
                        routesConfig[type].map(r => {
                            if (type !== key) {
                                return false
                            }
                            const route = r => {
                                const Component = AllComponents[r.component];
                                return (
                                    <Route
                                        key={r.route || r.key}
                                        exact
                                        path={r.route || r.key}
                                        render={() => {
                                            return (
                                                <DocumentTitle title={r.title}>
                                                    <Component />
                                                </DocumentTitle>
                                            )
                                        }}
                                    />
                                )
                            }
                            return r.component ? route(r) : r.subs.map(r => route(r));
                        })
                    )
                }
                <Route exact path='/admin/house/building/:id' component={BuildingTable} />
                <Route exact path='/admin/house/unit/:id' component={UnitTable} />
                <Route exact path='/admin/house/room/:id' component={RoomTable} />
                <Route exact path='/admin/house/roominfoform/:id' component={RoomInfoForm} />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}
export default Routes
