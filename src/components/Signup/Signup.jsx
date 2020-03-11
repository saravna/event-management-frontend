import React, { useState } from 'react'
import './Signup.css'

function Signup() {
    const [ username, setUsername ] = useState('')
    const [ mail, setMail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const handleSignup = () => {
        if(
            password !== confirmPassword || 
            username.trim().length === 0 ||
            mail.trim().length === 0 ||
            password.trim().length === 0
        ){
            console.log("hut")
            return
        }
             
        fetch("http://localhost:4000/signup", {
            method : "POST",
            headers : { 'Content-Type' : 'application/json'},
            body : JSON.stringify({
                username,
                mail,
                password,
                role : "USER"
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.authToken)
                localStorage.setItem("authToken",res.authToken)
            res.authToken ? alert('User Registered') : alert('Not Registered')
        })
    }

    return (
        <div className="signup">
            <h3>Signup</h3>
            <input type="text" placeholder="Username" onChange={(e)=> setUsername(e.target.value)} />
            <input type="text" placeholder="Mail" onChange={(e) => setMail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" placeholder="Confirm Password" onChange={(e)=> setConfirmPassword(e.target.value)}/>
            {password.length!==0 && confirmPassword.length!==0 ?
                <span style={{margin : "5px 0px"}}>{password === confirmPassword ? "Password Matched" : "Password Did Not Match"}</span> :
                ''
            }
            <button onClick={handleSignup}>Signup</button>
        </div>
    )
}
export default Signup
