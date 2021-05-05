import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import UpdateBedData from './editBedData'
import {CovidBedData} from '../../actions/action'
import { X} from 'react-bootstrap-icons';
import './home.css'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../hospitalData/agGrid.css'


function UserDataPage() {
    const dispatch=useDispatch();
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [openModal, setOpenModal]=useState(false);
   
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);

    }
   const userData=useSelector(state=>state)
    const [hosBed, setHosBed] = useState({
        email: null,
        hosName: null,
        totBeds: null,
        ocupBeds: null,
        vacBeds: null,
        hosState: null,
        hosDistrict: null,
        hosPinCode: null
    })

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    const onSelectionChanged = () => {
        var selectedRows = gridApi.getSelectedRows();
            selectedRows.length>0?setOpenModal(true):setOpenModal(false)
      };

    const modalChange = (state) => {
        setOpenModal(state)
    }

    React.useEffect(() => {
        
        const email = userData?.loggedUser?.user?.user?.email
        const url = `http://localhost:5000/getHospDataByEmailId/${email}`
        axios.get(url)
            .then(response => {
                if (response.status == 200) {
                    console.log(response)
                    setHosBed({
                        email: response?.data?.hospitalBedData?.email,
                        hosName: response?.data?.hospitalBedData?.hosName,
                        totBeds: response?.data?.hospitalBedData?.totBeds,
                        ocupBeds: response?.data?.hospitalBedData?.ocupBeds,
                        vacBeds: response?.data?.hospitalBedData?.vacBeds,
                        hosState: response?.data?.hospitalBedData?.hosState,
                        hosDistrict: response?.data?.hospitalBedData?.hosDistrict,
                        hosPinCode: response?.data?.hospitalBedData?.hosPinCode,
                    })
                    dispatch(CovidBedData(response.data))
                    let dataArray = []
                    dataArray.push(response.data.hospitalBedData)
                    setRowData(dataArray)


                }

            })
    }, [])

    return (
        <React.Fragment>
            <h1>Welcome {hosBed?.hosName}</h1> 
            <div>
                <div class="row">
                    <div class="col-md-9">
                    <div className="header">
                        Hospital Dashboard
                    </div>
                        <div
                            style={{
                                height: '22vh',
                            }}
                            className="ag-theme-alpine"
                        >
                            <AgGridReact
                                defaultColDef={{
                                    filter: 'agTextColumnFilter',
                                    floatingFilter: true,
                                    resizable: true,
                                    autoHeight: true,
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
                                <AgGridColumn headerName="Bed Vacent" field="vacBeds" />
                            </AgGridReact>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div class="card">
                            <h5 class="card-header">Contact Details</h5>
                            <div >
                                <h6>{hosBed.hosName}</h6>
                                <h6>{hosBed.hosDistrict}, {hosBed.hosState}, {hosBed.hosPinCode}</h6>
                                <h6>{hosBed.email}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div class="row">
                    <div class="col-md-9">
                        <div className="header">
                            Vacent COVID Beds
                    </div>
                        <div
                            style={{
                                height: '15vh',
                            }}
                            className="ag-theme-alpine"
                        >
                            <AgGridReact
                                defaultColDef={{
                                    resizable: true,
                                    autoHeight: true,
                                }}
                                rowSelection={'single'}
                                rowData={rowData}
                                onGridReady={onGridReady}
                                onFirstDataRendered={onFirstDataRendered}  
                                onRowSelected={onSelectionChanged} 
                            >
                                <AgGridColumn headerName="Vacent COVID Bed" field="vacBeds" />
                                <AgGridColumn headerName="ICU COVID Beds" field="icuBeds" />
                                <AgGridColumn headerName="Oxygen COVID Bed" field="oxygenBed" />
                                <AgGridColumn headerName="Normal COVID Bed" field="normalBed" />
                                <AgGridColumn headerName="Update Vacent Bed Data" field="" checkboxSelection={true} />
                            </AgGridReact>
                        </div>
                    </div>


                </div>
            </div>

            {openModal ?
                <div className="overlay">
                    <div class="modalStyle">
                        <div class="modal-content">
                            <div className="header">
                                Update Bed Data
                            <span className="editHeader">
                                    <X color="white" onClick={() => modalChange(false)} size={30} />
                                </span>
                            </div>
                            <div >
                                <UpdateBedData  />
                            </div>
                        </div>
                    </div>
                </div>
                : ""}

        </React.Fragment>
    )

}
export default UserDataPage