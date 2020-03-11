import React,{useEffect} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Homepage from '../Homepage/Homepage'
import Signup from '../Signup/Signup' 
import Signin from '../Signin/Signin'
import Events from '../Events/Events'
import Event from '../Events/Event'
import Bookings from '../Bookings/Bookings'
import {connect} from 'react-redux'
import {toggleSignedIn, setCurrentUser} from '../../redux/actions'

import PrivateRoute from './PrivateRoute'

function AppRouter(props) {

    useEffect(() => {
        var token = localStorage.getItem("authToken")
        fetch(`http://localhost:4000/verifytoken/${token}`,{
            method : 'get'
        })
        .then(res => res.json())
        .then(res => {
            if(res.user){
                props.toggleSignedIn(true)
                props.setCurrentUser(res.user)
            }
        })
        console.log("top token",token)
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Switch>
                <Route signedIn={props.signedIn} path='/events' component={Events}/>
                <PrivateRoute signedIn={props.signedIn} path='/home' component={()=><h1>Home</h1>}/>
                <PrivateRoute signedIn={props.signedIn} path='/event' component={Event}/>
                <PrivateRoute signedIn={props.signedIn} path="/bookings" component={Bookings}/>
                {!props.signedIn ?
                <div> 
                    <Route path="/" exact component={Homepage} />
                    <Route path="/signup" component={Signup}/>
                    <Route path="/signin" component={Signin}/>
                </div> : <Redirect to="/events"/>}
                <Route render={() => <h3>Invalid Route</h3>} />
            </Switch>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        signedIn : state.signedIn,
        user : state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        toggleSignedIn: (value) => dispatch(toggleSignedIn(value)),
        setCurrentUser: (value) => dispatch(setCurrentUser(value))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppRouter)
