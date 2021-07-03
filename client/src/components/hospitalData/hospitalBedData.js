import React, { useState } from 'react'
import axios from 'axios';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import './hospitalData.css'
import './agGrid.css'


const HospitalBed = () => {
    const [hosPinCode, setHosPinCode] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [showGrid, setShowGrid] = useState(false);
    const [msg, setMsg] = useState("");



    const getServerData = () => {
        const url = `http://15.206.186.179:5000/doctorDataByHosPin/${hosPinCode}`
        // const url = `http://localhost:5000/hospitalBedGet`
        axios.get(url)
            .then(response => {
                console.log(response)
                if (response.data.status == 200 && response.data.hospitalData.length > 0) {
                    setRowData(response.data.hospitalData)
                    setShowGrid(true)
                }
                else {
                    setShowGrid(false)
                    setMsg("No hospital for this Pin Code")
                }
            })
    }

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    return (
        <React.Fragment>

            <div class="container register">
                <div class="row">
                    <div class="col-md-4 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h3>Welcome</h3>
                        <p>To find nearest COVID hospital in your Region. Search by your Postal Pin Code</p>
                    </div>
                    <div class="col-md-7 rgisterDown">
                        <h3 class="register-heading text-light">Search Hospital by Pin Code</h3>
                        <div class="row register-form">
                            <input class="form-control" type="number" placeholder="Search Hospital by Pin Code"
                                type="search" onChange={((e) => setHosPinCode(e.target.value))} value={hosPinCode} aria-label="Search" /><br /><br />
                            <div className="text-light">
                                {!showGrid ? msg : ""}
                            </div>
                        </div>

                    </div>
                    <div class="rgisterDown1">
                        <button class="btn btn-primary" type="submit" onClick={getServerData}>Search</button>
                    </div>
                </div>

                {showGrid ?
                    <div style={{ width: '100%', height: '100%' }}>
                        <div
                            style={{
                                height: '47vh',
                                width: '100%',
                            }}
                            className="ag-theme-material"
                        >
                            <AgGridReact
                                defaultColDef={{
                                    filter: 'agTextColumnFilter',
                                    floatingFilter: true,
                                    resizable: true,
                                }}
                                rowData={rowData}
                                onFirstDataRendered={onFirstDataRendered}
                            >
                                <AgGridColumn headerName="Hospital Name" field="hosName" />
                                <AgGridColumn headerName="State" field="hosState" />
                                <AgGridColumn headerName="District" field="hosDistrict" />
                                <AgGridColumn headerName="Pin Code" field="hosPinCode" />
                                <AgGridColumn headerName="Total COVID Bed" field="totBeds" />
                                <AgGridColumn headerName="Bed Occupied" field="ocupBeds" />
                                <AgGridColumn headerName="Bed Vacent" field="vacBeds" />
                            </AgGridReact>
                        </div>
                    </div>
                    : ""}
            </div>



        </React.Fragment>
    )
}

export default HospitalBed