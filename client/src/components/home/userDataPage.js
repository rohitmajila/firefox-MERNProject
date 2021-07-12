import React, { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useHistory } from "react-router-dom";
import UpdateBedData from './editBedData'
import {CovidBedData} from '../../actions/action'
import { X} from 'react-bootstrap-icons';
import './home.css'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './agGrid.css'


function UserDataPage() {
    const dispatch=useDispatch();
    const history=useHistory();
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [openModal, setOpenModal]=useState(false);
    const [alertBox, setAlertBox]=useState(false);
    const [flag, setFlag]=useState(false);
    const userData=useSelector(state=>state)
    const [hosBed, setHosBed] = useState({
        email: null,
        hosName: null,
        totBeds: 0,
        ocupBeds: 0,
        vacBeds: 0,
        hosState: null,
        hosDistrict: null,
        hosPinCode: null,
        phoneNo:null
    })

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }
    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    const onSelectionChanged = () => {
        let selectedRows = gridApi.getSelectedRows();
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
                console.log(response)
                if (response.status == 200) {
                    setHosBed({
                        email: response?.data?.hospitalBedData?.email,
                        hosName: response?.data?.hospitalBedData?.hosName,
                        totBeds: response?.data?.hospitalBedData?.totBeds? response.data.hospitalBedData.totBeds:0,
                        ocupBeds: response?.data?.hospitalBedData?.ocupBeds?response.data.hospitalBedData.ocupBeds:0,
                        vacBeds: response?.data?.hospitalBedData?.vacBeds?response.data.hospitalBedData.vacBeds:0,
                        hosState: response?.data?.hospitalBedData?.hosState,
                        hosDistrict: response?.data?.hospitalBedData?.hosDistrict,
                        hosPinCode: response?.data?.hospitalBedData?.hosPinCode,
                        phoneNo:response?.data?.hospitalBedData?.phoneNo
                    })
                    dispatch(CovidBedData(response.data))
                    let dataArray = []
                    dataArray.push(response.data.hospitalBedData)
                    dataArray.length>0?setFlag(true):setFlag(false)
                    setRowData(dataArray)
                }
                else{
                    setFlag(false)
                }

            })
    }, [])

    
    const alertModalClose=()=>{
        setFlag(false)
        history.push('/userHomePage')
    }
   
    
    return (      
        <React.Fragment>
            {flag?
            <div>
            <h1 className="welcomeHeader">Welcome {hosBed?.hosName}</h1> 
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-9">
                    <div className="gridHeader">
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
                            <h5 class="card-header cardHeader">Contact Details</h5>
                            <div >
                                <h6>Hospital Name :{hosBed.hosName}</h6>
                                <h6>Address :{hosBed.hosDistrict}, {hosBed.hosState}, {hosBed.hosPinCode}</h6>
                                <h6>Email :{hosBed.email}</h6>
                                <h6>Phone Number :{hosBed.phoneNo}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                
                <div class="row">
                    <div class="col-md-9">
                        <div className="gridHeader">
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
                    <div class="bedModalStyle">
                        <div class="modal-content">
                            <div className="gridHeader">
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
            </div>
           :
           <div>
                <div className="overlay">
                    <div class="alertStyle">
                        <div class="modal-content">
                            <div className="gridHeader">
                               Alert
                            <span className="editHeader">
                                    <X color="white" onClick={alertModalClose} size={30} />
                                </span>
                            </div>
                            <div >
                            <p>No data to display. First complete the vacent bed data.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </React.Fragment>
    )

}
export default UserDataPage