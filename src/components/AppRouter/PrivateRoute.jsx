import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import PageContainer from './PageContainer'
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component,signedIn, ...rest}) => {
    console.log(signedIn)
    return (
        <Route {...rest} render={props => (
            signedIn ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

// const mapStateToProps = state => {
//     return {
//         signedIn : state.signedIn
//     }
// }

export default connect(null,null)(PrivateRoute);