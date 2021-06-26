import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './agGrid.css';


const DoctorSlot = (props) => {
    const [fullName, setFullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [doctorEmail, setdoctorEmail] = useState(null)
    const [slotDate, setSlotDate] = useState(null)
    const [slotTimeFrom, setSlotTimeFrom] = useState(null)
    const [slotTimeTo, setSlotTimeTo] = useState(null)
    const [rowData, setRowData] = useState(null);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [showGrid, setShowGrid]=useState(false)

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    useEffect(() => {
        setFullName(props?.doctorData?.fullName)
        setEmail(props?.doctorData?.email)
        setdoctorEmail(props?.doctorData?.doctorEmail)

        const url=`http://localhost:5000/getDoctorSlot/${props?.doctorData?.doctorEmail}`
        axios.get(url).then(response=>{
            console.log(response)
            if(response.data.status==200 && response.data.doctorSlotData.length>0){
                setRowData(response.data.doctorSlotData)
                setShowGrid(true)
            }
            else{
                setShowGrid(false)
            }
        });

    }, [])

   const submitData=(event)=>{
        event.preventDefault();
        let today = new Date(slotDate);
        let year = today.getFullYear();
        let mon = today.getMonth()+1;
        let day = today.getDate();
        const todayDate=year+"-"+mon+"-"+day
        const data={
            email:email,
            fullName:fullName,
            doctorEmail:doctorEmail,
            slotDate:todayDate,
            slotTimeFrom:slotTimeFrom,
            slotTimeTo:slotTimeTo,
            bookStatus:"open"
        }
        console.log(data)
        const url="http://localhost:5000/doctorSlotData";
        const headers = {'Content-Type': 'application/json'}
        const body=JSON.stringify(data)
        axios.post(url,body,{ headers: headers }).then(response=>{
            console.log(response)
        })
   }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label htmlFor="firstName">Doctor Name</label>
                            <input type="text" class="form-control" value={fullName} disabled/>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label htmlFor="firstName">Doctor Email</label>
                            <input type="text" class="form-control" value={doctorEmail} disabled/>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label htmlFor="firstName">Slot Date</label>
                            <input type="date" class="form-control" onChange={(e) => setSlotDate(e.target.value)} />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label htmlFor="firstName">Slot Time From</label>
                            <input type="time" class="form-control" onChange={(e) => setSlotTimeFrom( e.target.value)}/>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label htmlFor="firstName">Slot Time To</label>
                            <input type="time" class="form-control" onChange={(e) => setSlotTimeTo(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary" onClick={submitData} >Submit</button>
                </div>
            </div>
            {showGrid?
            
            <div>
            <div className="header">
            Doctor Slot
         </div>
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
                            floatingFilter: true,
                            resizable: true,
                        }}
                     
                        rowData={rowData}
                        onGridReady={onGridReady}
                        onFirstDataRendered={onFirstDataRendered}
                    >
                        <AgGridColumn headerName="Doctor Name" field="fullName" />
                        <AgGridColumn headerName="Email" field="doctorEmail" />
                        <AgGridColumn headerName="Slot Date" field="slotDate" />
                        <AgGridColumn headerName="Slot Time From" field="slotTimeFrom" />
                        <AgGridColumn headerName="Slot Time To" field="slotTimeTo" />
                        <AgGridColumn headerName="Booking Status" field="bookStatus" />
                    </AgGridReact>
                </div>
            </div>
            </div>
           :""}
        </React.Fragment>
    )
}

export default DoctorSlot