import React, { useRef, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useHistory } from "react-router-dom";
import DoctorRoster from './doctorRoster';
import DoctorSlot from './doctorSlot';
import { useSelector } from "react-redux";
import axios from 'axios';
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
    const history = useHistory();
    const userData = useSelector(state => state)
    const email = userData?.loggedUser?.user?.user?.email
    const [openModal, setOpenModal] = useAsyncState(false);
    const [doctorData, setDoctorData] = useAsyncState();
    const [docSlot, setDocSlot] = useAsyncState(false);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [flag, setFlag] = useState(false);
    const gridRef = useRef(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };



    React.useEffect(() => {
        const url = `http://65.2.74.12:5000/allDoctorData/${email}`
        axios.get(url).then(response => {
            if (response.data.status == 200) {
                setRowData(response.data.allDoctorData)
                response.data.allDoctorData.length > 0 ? setFlag(true) : setFlag(false)
            }
            else {
                setFlag(false)
            }
        })
    }, [])



    const modalChange = (state) => {
        setOpenModal(state)
    }

    const slotMOdalCLose = () => {
        setDocSlot(false)
    }

    const onSelectionChanged = async () => {
        let selectedRows = gridRef.current.api.getSelectedNodes()
        let selectedData = selectedRows?.map(node => node.data);
        console.log(selectedData[0])
        await setDoctorData(selectedData[0])
    };


    const openDocDataModal = async () => {
        await onSelectionChanged()
        await setOpenModal(true)
    }

    const openDocSlotModal = async () => {
        await onSelectionChanged()
        setDocSlot(true)

    }

    const updateDocDataBtn = () => {
        return (
            <div>
                <button class="btn btn-primary btnRosterDocColor" onClick={openDocDataModal}>Update</button>&nbsp;
                <button class="btn btn-primary btnRosterDocColor" onClick={openDocSlotModal}>Open Slot</button>
            </div>
        )
    }

    const alertModalClose = () => {
        setFlag(false)
        history.push('/doctorRoster')
    }

    return (
        <React.Fragment>
            {flag ?
                <div >
                    <div className="docRosterheader">
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
                                <AgGridColumn headerName="Action" field="" cellRenderer='updateDocDataBtn' />
                            </AgGridReact>
                        </div>
                    </div>
                    {openModal ?
                        <div className="overlay">
                            <div class="modalDocRosterStyle">
                                <div className="docHeader">
                                    Update Doctor Details
                                    <span className="editHeader">
                                        <X color="white" onClick={() => modalChange(false)} size={30} />
                                    </span>
                                </div>
                                <div >
                                    <DoctorRoster doctorData={doctorData} header={true} />
                                </div>
                            </div>
                        </div>
                        : ""}

                    {docSlot ?
                        <div className="overlay">
                            <div class="modalDocRosterStyle">
                                <div className="docHeader">
                                    Book Doctor Slot
                                    <span className="editHeader">
                                        <X color="white" onClick={() => slotMOdalCLose(false)} size={30} />
                                    </span>
                                </div>
                                <div >
                                    <DoctorSlot doctorData={doctorData} />
                                </div>
                            </div>
                        </div>
                        : ""}
                    <div>

                    </div>
                </div>
                :

                <div>
                    <div className="overlay">
                        <div class="alertGirdStyle">
                            <div class="modal-content">
                                <div className="gridAlertHeader">
                                    Alert
                                    <span className="editHeader">
                                        <X color="white" onClick={alertModalClose} size={30} />
                                    </span>
                                </div>
                                <div >
                                    <p>No Data to display. Please add doctor first</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default DoctorDataGrid