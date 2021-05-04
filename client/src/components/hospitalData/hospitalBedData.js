import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './hospitalData.css'
import './agGrid.css'


const HospitalBed = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    React.useEffect(() => {
        getServerData()
    }, [])


    const getServerData = () => {
        const url = "http://localhost:5000/hospitalBedGet"
        axios.get(url)
            .then(response => {
                console.log(response)
                setRowData(response.data.hospitalData)
            })
    }

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    return (
        <React.Fragment>
            <div className="header">
                Total Hospital Bed
             </div>
            <div style={{ width: '100%', height: '100%' }}>
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
                    >
                        <AgGridColumn headerName="Hospital Name" field="hosName" />
                        <AgGridColumn headerName="State" field="hosState" />
                        <AgGridColumn headerName="District" field="hosDistrict" />
                        <AgGridColumn headerName="Pin Code" field="hosPinCode" />
                        <AgGridColumn headerName="Total COVID Bed" field="totBeds" />
                        <AgGridColumn headerName="Bed Occupied" field="ocupBeds" />
                        <AgGridColumn headerName="Bed Vacent"  field="vacBeds" />
                    </AgGridReact>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HospitalBed