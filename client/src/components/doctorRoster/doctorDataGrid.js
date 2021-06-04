import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import DoctorRoster from './doctorRoster';
import { useSelector, useDispatch } from "react-redux";
import { X} from 'react-bootstrap-icons';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './docRoster.css'
import './agGrid.css';

const DoctorDataGrid = () => {
    const userData = useSelector(state => state)
    const email = userData?.loggedUser?.user?.user?.email
    const [openModal, setOpenModal]=useState(false);
    const [doctorData, setDoctorData]=useState(null)
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const modalChange = (state) => {
        setOpenModal(state)
    }

    const onSelectionChanged = () => {
        let selectedRows = gridApi.getSelectedRows();
        setDoctorData(selectedRows[0])
            selectedRows.length>0?setOpenModal(true):setOpenModal(false)
      };

    React.useEffect(()=>{
        const url=`http://localhost:5000/allDoctorData/${email}`
        axios.get(url).then(response=>{
            console.log(response)
            setRowData(response.data.allDoctorData)
        })
    },[])

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    return (
        <React.Fragment>
            <div className="header">
               All Hospital Doctor
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
                        onRowSelected={onSelectionChanged} 
                    >
                        <AgGridColumn headerName="Doctor Name" field="fullName" />
                        <AgGridColumn headerName="Phone No." field="phoneNumber" />
                        <AgGridColumn headerName="Email" field="doctorEmail" />
                        <AgGridColumn headerName="Specilazation" field="specilzation" />
                        <AgGridColumn headerName="Experience" field="totalExperience" />
                        <AgGridColumn headerName="Department Name" field="departName" />
                        <AgGridColumn headerName="Research Description"  field="researchDescription" />
                        <AgGridColumn headerName="Update Doctor Data" field="" checkboxSelection={true} />
                    </AgGridReact>
                </div>
            </div>
             {openModal ?
                <div className="overlay">
                    <div class="modalStyle">
                            <div className="header">
                                Update Doctor Data
                            <span className="editHeader">
                                    <X color="white" onClick={() => modalChange(false)} size={30} />
                                </span>
                            </div>
                            <div >
                                <DoctorRoster doctorData={doctorData} />
                            </div>
                    </div>
                </div>
                : ""}       
            <div>

            </div>
        
        </React.Fragment>
    )
}

export default DoctorDataGrid