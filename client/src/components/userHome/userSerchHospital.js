import React, { useState } from 'react';
import axios from 'axios'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Redirect } from "react-router";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './agGrid.css';
import './userHome.css';


function SearchHospital() {
    const [bookDoctorPage, setBookDoctorPage] = useState(false);
    const [viewGrid, setViewGrid] = useState(false);
    const [hosPinCode, setHosPinCode] = useState(null);
    const [hosEmail, setHosEmail] = useState(null);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);


    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const postDataToApi = (event) => {
        event.preventDefault();
        const url = `http://localhost:5000/doctorDataByHosPin/${hosPinCode}`
        axios.get(url).then(response => {
            console.log(response)
            if (response.data.status == 200) {
                setRowData(response.data.hospitalData)
                setViewGrid(true)
            }
        })
    }




    const onSelectionChanged = () => {
        let selectedRows = gridApi.getSelectedRows();
        setHosEmail(selectedRows[0]?.email)
        selectedRows ? setBookDoctorPage(true) : setBookDoctorPage(false)
    };

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    if (bookDoctorPage) {
        return <Redirect to={`/bookDoctorAppointment?email=${hosEmail}`} />
    }



    return (
        <React.Fragment>
            <h1 className="userHomeHeader">Search Hospital</h1>
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-5 offset-md-1">
                    <input class="form-control me-2" type="number" placeholder="Search by Pin Code"
                     onChange={((e) => setHosPinCode(e.target.value))} value={hosPinCode} type="search"  aria-label="Search" />
                </div>
                <div className="col-md-2">
                    <button class="btn btn-primary btnHospitalColor" type="submit" onClick={postDataToApi}>Search</button>
                </div>
            </div>
            <br />
            {viewGrid ?

                <div style={{ width: '100%', height: '100%' }}>
                    <div className="header">
                        Hospital @{hosPinCode}
                    </div>
                    <div
                        style={{
                            height: '100vh',
                            width: '100%',
                        }}
                        className="ag-theme-alpine"
                    >
                        <AgGridReact
                            defaultColDef={{
                                filter: 'agTextColumnFilter',
                                floatingFilter: true,
                                resizable: true,
                            }}
                            rowData={rowData}
                            onGridReady={onGridReady}
                            onFirstDataRendered={onFirstDataRendered}
                            onRowSelected={onSelectionChanged}
                        >
                            <AgGridColumn headerName="Hospital Name" field="hosName" />
                            <AgGridColumn headerName="Hospital State" field="hosState" />
                            <AgGridColumn headerName="Phone No." field="phoneNo" />
                            <AgGridColumn headerName="Email" field="email" />
                            <AgGridColumn headerName="Hospital District" field="hosDistrict" />
                            <AgGridColumn headerName="Book Appointment" field="" checkboxSelection={true} />
                        </AgGridReact>
                    </div>
                </div>
                : ""}
                </div>
        </React.Fragment>
    )

}
export default SearchHospital