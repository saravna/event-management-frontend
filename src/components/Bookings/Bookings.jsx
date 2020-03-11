import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'
import './Bookings.css'
import {Link} from 'react-router-dom'
import { USER_SIGNED_IN } from '../../redux/action-types'

function Bookings(props) {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        fetchBookings()
    },[])

    const fetchBookings = () => {
        fetch("http://localhost:4000/getbookingsbyuser", {
            method : 'post',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({
                username : props.user
            })
        })
        .then(res=>res.json())
        .then(res=>setBookings(res))
    }

    const handleRemove = (id) => {
        console.log(bookings)
        fetch("http://localhost:4000/removebooking", {
            method : 'delete',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                username : props.user,
                eventId : id
            })
        })
        .then(res => res.json())
        .then(res => res===1?fetchBookings():'')
    }

    return (
        <div>
            <table style={{display : bookings.length>0?"":"none"}} className="bookings-table">
                <tr>
                    <td>S.No</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Venue</td>
                    <td>Action</td>
                </tr>
                {bookings.map((event,i) => {
                    return <tr>
                        <td>{i+1}.</td>
                        <td>{event.name}</td>
                        <td>{event.price}</td>
                        <td>{event.city.name}</td>
                        <td>
                            <Link to={`/event/?id=${event.id}`}><button>View Event</button></Link>
                            <button onClick={()=>handleRemove(event.id)}>Remove</button>
                        </td>
                    </tr>
                })}
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps,null)(Bookings)

