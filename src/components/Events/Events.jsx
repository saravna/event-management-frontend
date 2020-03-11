import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

function Events(props) {
    const [eventsData , setEventsData] =useState([])
    const [city, setCityData] = useState([])
    const [bookingResponse,setBookingResponse] = useState('')
    const [bookingModalVisible,setBookingModalVisiblity] = useState(false)

    useEffect(() => {
        console.log("Hit")
        fetchAllEvents()
        fetchCities()
    },[])

    const fetchCities = () => {
        fetch("http://localhost:4000/getcities",{
            method : 'get'
        })
        .then(res => res.json())
        .then(res => setCityData(res))
    }

    const fetchAllEvents = () => {
        return fetch("http://localhost:4000/getallevents", {
            method : 'get'
        })
        .then(res => res.json())
        .then(res => {
            console.log("events",res)
            return setEventsData(res)
        })
    }

    const handleEventBook = (id) => {
        console.log({
            username : props.user,
            id
        })
        fetch("http://localhost:4000/addbooking",{
            method : 'post',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({
                username : props.user,
                eventId :id
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.id){
                setBookingResponse("Booking Successful")
            } else {
                setBookingResponse("Booking UnSuccessfuk")
            }
            return setBookingModalVisiblity(true)
        })
    }

    const generateOptions = (data) => {
        console.log("city",data)
        return data.map(item => <option value={item.id}>{item.name}</option>)
    }
    
    const handleCityChange = (id) => {
        console.log(id)
        if(id>0) {
            fetch(`http://localhost:4000/geteventsbycity/${id}`,{
                method : 'get'
            })
            .then(res => res.json())
            .then(res => setEventsData(res)) 
        } else {
            fetchAllEvents()
        }
    }

    return (
        <div className="events">
            <div className="booking-model" style={{position:"fixed",top:"50%", left:"50%",transform:"translate(-50%,-50%)",zIndex:"11111",display:bookingModalVisible?"block":"none",width:"500px",height:"300px",backgroundColor:"white"}}>
                <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
                    <div style={{margin:"10px"}}>
                        {bookingResponse}
                    </div>
                    <button style={{padding:"5px 20px",position:"relative",top:"40%"}} onClick={()=>setBookingModalVisiblity(false)}>OK</button>
                </div>
            </div>
            <div>
                <select style={{width :"200px",height:"30px",padding:"0px 0px 0px 60px", outline:"none",border:"none",boxShadow:"0px 0px 3px 2px gray"}} onChange={(e)=>handleCityChange(e.target.value)}>
                    <option value={-1}>All events</option>
                    {generateOptions(city)}
                </select>
            </div>
            {eventsData.map((event,i) => {
                return <div className="event" style={{display:"inline-block"}}>
                    {event.price===0?<p style={{position:"relative",top:"-35px",left:"90%",backgroundColor:"red",color:"white",width:"10%",padding:"5px 8px"}}>Free</p>:<p></p>}
                    <Link key={i} style={{display:"inline-block",cursor:"pointer",textDecoration:"none", color:"inherit",marginTop:event.price===0?"-50px":""}}to={`/event/?id=${event.id}`}>
                        <img src={event.image} alt="" width={250} height={150}/>
                        <h2>{event.name}</h2>
                        
                    </Link>
                    <div style={{width:"100%"}}>
                        {props.signedIn?<button style={{display:"block",width:"30%",marginLeft:"65%",padding:"5px"}} onClick={()=>handleEventBook(event.id)}>Book</button>:''}
                    </div>
                </div>
            })}        
        </div>
    )
}

const mapStateToProps = state => {
    return {
        signedIn : state.signedIn,
        user : state.user
    }
}

export default connect(mapStateToProps,null)(Events)
