import React, { useEffect, useRef , useState } from 'react';
import axios from 'axios';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import DoctorRoster from './doctorRoster';
import DoctorSlot from './doctorSlot';
import { useSelector, useDispatch } from "react-redux";
import { X } from 'react-bootstrap-icons';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './docRoster.css'
import './agGrid.css';


const useAsyncState = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const setter = x =>
        new Promise(resolve => {
            setValue(x);
            resolve(x);
        });
    return [value, setter];
}

const DoctorDataGrid = () => {
    const userData = useSelector(state => state)
    const email = userData?.loggedUser?.user?.user?.email
    const [openModal, setOpenModal] = useAsyncState(false);
    const [doctorData, setDoctorData] = useAsyncState();
    const [docSlot, setDocSlot] = useAsyncState(false);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const gridRef = useRef(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };



    React.useEffect(() => {
        const url = `http://localhost:5000/allDoctorData/${email}`
        axios.get(url).then(response => {
            console.log(response)
            setRowData(response.data.allDoctorData)
        })
    }, [])

  

    const modalChange = (state) => {
        setOpenModal(state)
    }

    const slotMOdalCLose = () => {
         setDocSlot(false)
    }

    const onSelectionChanged =async () => {
        let selectedRows =  gridRef.current.api.getSelectedNodes()
        let selectedData = selectedRows?.map(node => node.data);
        console.log(selectedData[0])
        await setDoctorData(selectedData[0])
    };


    const openDocDataModal = async () => {
        await onSelectionChanged()
        await setOpenModal(true)
    }

    const openDocSlotModal=async ()=>{
        await onSelectionChanged()
        setDocSlot(true)

    }

    const updateDocDataBtn = () => {
        return (
            <div>
            <button class="btn btn-primary" onClick={openDocDataModal}>Update</button>&nbsp;
            <button class="btn btn-primary" onClick={openDocSlotModal}>Open Slot</button>
            </div>
        )
    }

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
                        ref={gridRef}
                        rowData={rowData}
                        onGridReady={onGridReady}
                        onFirstDataRendered={onFirstDataRendered}
                        // onRowSelected={onSelectionChanged} 
                        rowSelection={'single'}
                        frameworkComponents={{
                            updateDocDataBtn: updateDocDataBtn,
                        }}
                    >
                        <AgGridColumn headerName="Doctor Name" field="fullName" />
                        <AgGridColumn headerName="Phone No." field="phoneNumber" />
                        <AgGridColumn headerName="Email" field="doctorEmail" />
                        <AgGridColumn headerName="Specilazation" field="specilzation" />
                        <AgGridColumn headerName="Experience" field="totalExperience" />
                        <AgGridColumn headerName="Department Name" field="departName" />
                        <AgGridColumn headerName="Research Description" field="researchDescription" />
                        <AgGridColumn headerName="Action" field="" cellRenderer='updateDocDataBtn'  />
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

            {docSlot ?
                <div className="overlay">
                    <div class="modalStyle">
                            <div className="header">
                                Book Doctor Slot
                            <span className="editHeader">
                                    <X color="white" onClick={() => slotMOdalCLose(false)} size={30} />
                                </span>
                            </div>
                            <div >
                                <DoctorSlot doctorData={doctorData}/>
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