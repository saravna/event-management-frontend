import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { toggleSignedIn, setCurrentUser } from '../../redux/actions'
import './Topbar.css'
import { withRouter } from 'react-router-dom'

function Topbar(props) {
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

    console.log("props",props.signedIn)
    return (
        <div className="topbar">
            <h1>Event Manager</h1>
            {!props.signedIn 
            ?   <div className="button-div">
                    <button id="signin-button" onClick={()=> {
                        // props.toggleSignedIn()
                        props.history.push('/signin')
                    }}>signin</button>
                    <button id="signup-button" onClick={() => {
                        props.history.push('/signup')
                    }}>signup</button>
                    <button onClick={()=>props.history.push('/events')}>All Events</button>
                </div>
            : <div className="button-div">
                <span style={{marginRight:"5px"}}>{props.user}</span>
                <button id="logout-button" onClick={() => {
                    props.toggleSignedIn(false)
                    props.setCurrentUser(null)
                    localStorage.removeItem("authToken")
                    return props.history.push('/signin')
                }}>logout</button>
                <button onClick={()=> props.history.push('/bookings')}>
                    My Bookings
                </button>
                <button onClick={()=>props.history.push('/events')}>All Events</button>
            </div>
            } 
            
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Topbar))
