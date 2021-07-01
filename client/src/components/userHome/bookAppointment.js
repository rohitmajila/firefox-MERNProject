import React, { useEffect, useState, useRef } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { X } from 'react-bootstrap-icons';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './agGrid.css';
import './userHome.css';




function BookAppointment() {
    const [cardData, setCardData] = useState([]);
    const [showModal, setShowModal] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [msg, setMsg] = useState(null);
    const gridRef = useRef(null);

    const email = window.location.href.split("=")[1]



    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        const url = `http://localhost:5000/allDoctorData/${email}`
        axios.get(url).then(response => {
            console.log(response)
            setCardData(response.data.allDoctorData)
        })
    }, []);


    const getDoctorSlotData = (doctorEmail) => {
        const url = `http://localhost:5000/getDoctorSlot/${doctorEmail}`
        axios.get(url).then(response => {
            console.log(response)
            if (response.data.status == 200 && response.data.doctorSlotData.length > 0) {
                setRowData(response.data.doctorSlotData)
                setShowModal(true)
            }
            else {
                setMsg("No appointment slot is available. Please check for other doctor")
                setShowModal(false)
            }
        })
    }

    const submitSelectedRow = () => {
        let rows = gridRef.current.api.getSelectedNodes();
        let selectedRows = rows?.map(node => node.data);
        let data = {
            "email": selectedRows[0].email,
            "fullName": selectedRows[0].fullName,
            "doctorEmail": selectedRows[0].doctorEmail,
            "slotDate": selectedRows[0].slotDate,
            "slotTimeFrom": selectedRows[0].slotTimeFrom,
            "slotTimeTo": selectedRows[0].slotTimeTo,
            "bookStatus": "booked",
            "_id": selectedRows[0]._id
        }

        const headers = { 'Content-Type': 'application/json' }
        const body = JSON.stringify(data)
        const url = `http://localhost:5000/updateDoctorSlotData/${selectedRows[0]._id}`
        axios.post(url, body, { headers: headers }).then(response => {
            console.log(response)
        })

        console.log(body)

    }

    const updateDocDataBtn = () => {
        return (
            <div>
                <button class="btn btn-primary" onClick={submitSelectedRow}>Book Slot</button>
            </div>
        )
    }

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
                                <button type="submit" className="btn btn-primary btnHospitalColor" onClick={() => { getDoctorSlotData(data.doctorEmail) }}>Book Slot</button>
                            </div>
                        </div>
                    </div>
                )
            })
            }

            {showModal ?
                <div className="overlay">
                    <div class="modalStyle">
                        <div className="header">
                            Doctor Slot
                            <span className="editHeader">
                                <X color="white" size={30} onClick={closeModal} />
                            </span>
                        </div>
                        <div>

                            <div style={{ width: '100%', height: '100%' }}>
                                <div
                                    style={{
                                        height: '50vh',
                                        width: '100%',
                                    }}
                                    className="ag-theme-alpine"
                                >
                                    <AgGridReact
                                        defaultColDef={{
                                            filter: 'agTextColumnFilter',
                                            resizable: true,
                                        }}
                                        ref={gridRef}
                                        rowSelection={'single'}
                                        rowData={rowData}
                                        onFirstDataRendered={onFirstDataRendered}
                                        frameworkComponents={{
                                            updateDocDataBtn: updateDocDataBtn,
                                        }}
                                    >
                                        <AgGridColumn headerName="Doctor Name" field="fullName" />
                                        <AgGridColumn headerName="Email" field="doctorEmail" />
                                        <AgGridColumn headerName="Slot Date" field="slotDate" />
                                        <AgGridColumn headerName="Slot Time From" field="slotTimeFrom" />
                                        <AgGridColumn headerName="Slot Time To" field="slotTimeTo" />
                                        <AgGridColumn headerName="Booking Status" field="bookStatus" />
                                        <AgGridColumn headerName="Action" field="" cellRenderer='updateDocDataBtn' />
                                    </AgGridReact>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                ""
            }<br /><br />

            {showModal == false ?

                <div >{msg}</div>

                : ""}

        </React.Fragment>
    )

}
export default BookAppointment