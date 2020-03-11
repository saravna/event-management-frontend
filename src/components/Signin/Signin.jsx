import React, { useState } from 'react'
import './Signin.css'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleSignedIn, setCurrentUser } from '../../redux/actions'

function Signin(props) {
    const [ usernameOrMail, setUsernameOrMail ] = useState('')
    const [ password, setPassword ] = useState('')
    
    const handleSignin = () => {
        fetch("http://localhost:4000/signin", {
            method : "post",
            headers : { 'Content-Type' :'application/json'},
            body : JSON.stringify({
                username : usernameOrMail,
                password
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.authToken){
                fetch(`http://localhost:4000/verifytoken/${res.authToken}`,{
                    method :'get'
                })
                .then(res => res.json())
                .then(response => {
                    console.log("res",response)
                    if(!response.err){
                        localStorage.setItem("authToken",res.authToken)
                        console.log(response.user)
                        props.setCurrentUser(response.user)
                        props.toggleSignedIn(true)
                        props.history.push('/events')
                    }
                })
            }
            else
                alert("Not a valid User")
        })
    }
    
    return (
        <div className="signin">
            <h3>Signin</h3>
            <input type="text" placeholder="Username or Mail" onChange={(e)=> setUsernameOrMail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleSignin} >Signin</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin))
