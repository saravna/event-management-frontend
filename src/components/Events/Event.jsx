import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import './Event.css'

function Event(props) {
    const [event, setEvent] = useState([])

    useEffect(() => {
        var query = new URLSearchParams(props.location.search)
        var id = parseInt(query.get('id'))
        console.log(`http://localhost:4000/geteventbyid/${id}`)
        fetch(`http://localhost:4000/geteventbyid/${id}`,{
            method :'get'
        })
        .then(res => res.json())
        .then(res=> {
            console.log(res)
            return setEvent(res)
        })
        //eslint-disable-next-line
    },[])

    console.log(event.city)
    return (
        <div>
        {event.name!==undefined?
            <div className="event-div">
            <img src={event.image} alt=""/>
            <table className="event-table">
                <tbody>
                    <tr>
                        <td>Name :</td>
                        <td>{event.name}</td>
                    </tr>
                    <tr>
                        <td>Description :</td>
                        <td>{event.description}</td>
                    </tr>
                    <tr>
                        <td>City :</td>
                        <td>{event.city.name}</td>
                    </tr>
                    <tr>
                        <td>Price :</td>
                        <td>{event.price===0?"Free":event.price}</td>
                    </tr>
                    <tr>
                        <td>Schedule :</td>
                        <td style={{padding:"0px"}}>
                            <table style={{ width:"100%"}}> 
                                    {event.schedules && event.schedules.map(schedule => {
                                        return <tr>
                                            <td>{schedule.timing}</td>
                                            <td>{schedule.description}</td>
                                            <td><a href={schedule.mentor.linkedIn}>{schedule.mentor.name}</a></td>
                                        </tr>
                                    })}
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mentor-grid">
                {event.schedules && event.schedules.map(schedule => {
                    return <div className="ib">
                        <a href={schedule.mentor.linkedIn}>
                            <div>
                                <img src={schedule.mentor.image} alt="" width={100} height={100}/>
                                <p>{schedule.mentor.name}</p>
                            </div>
                        </a>
                    </div>
                })}
            </div> 
            </div>
            :<div></div>
            }
            </div>
    )
}

export default withRouter(Event)
