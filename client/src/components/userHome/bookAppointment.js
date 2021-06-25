import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userHome.css';



function BookAppointment() {
    const [cardData, setCardData] = useState([]);
    const email = window.location.href.split("=")[1]

    useEffect(() => {
        const url = `http://localhost:5000/allDoctorData/${email}`
        axios.get(url).then(response => {
            console.log(response)
            setCardData(response.data.allDoctorData)
        })
    }, []);

    return (
        <React.Fragment>
            <h1>Book Appointment</h1>
            {cardData.map(data => {
                return (
                    <div class="cardDisplay">
                    <div className="row">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">{data.fullName}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">Department:{data.departName}</h6>
                                    <p class="card-text">Description:{data.docDescription}</p>
                                    <a class="card-link">Experience:{data.totalExperience}</a>
                                    <a class="card-link">Email:{data.doctorEmail}</a>
                                </div>
                                <button type="submit" className="btn btn-primary">Book Slot</button>
                            </div>
                        </div>
                    </div>
                   

                )
               
            })
            
            }
           
        </React.Fragment>
    )

}
export default BookAppointment