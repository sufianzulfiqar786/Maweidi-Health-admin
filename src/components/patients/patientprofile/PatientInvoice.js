import { Modal } from "antd";
import closeIcon from "../../../assets/images/common/close.svg";
import "../../../assets/css/patients/patientprofile/patientinvoice.scss";
import logo from "../../../assets/images/common/maweidi-logo.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("1", "Hospital Charges", 1, "KWD 215", "KWD 215"),
  createData("2", "Medicine", 1, "KWD 215", "KWD 215"),
  createData("3", "Special Visit Fee (Doctor)", 1, "KWD 215", "KWD 215"),
];

const PatientInvoice = ({ open, onClose }) => {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      className="invoice-modal"
      open={open}
      centered
      closable={false}
      onCancel={handleCancel}
      destroyOnClose={true}
      footer={null}
      width={735}
    >
      <div className="modal-content-wrapper">
        <div className="title-header">
          <div className="title">Patient Invoice</div>
          <img src={closeIcon} onClick={() => handleCancel()} />
        </div>
        <hr style={{ margin: "0px " }} />

        <div className="invoice-recipient">
          <img src={logo} />
          <div className="invoice-recipient-info">
            <div>
              <span className="title">Invoice no:</span>{" "}
              <span className="detail">MCR000345721</span>
            </div>
            <div>
              <span className="title">Email:</span>{" "}
              <span className="detail">janecoper789@gmail.com</span>
            </div>
            <div>
              <span className="title">Phone:</span>{" "}
              <span className="detail">03457672891</span>
            </div>
            <div>
              <span className="title">Patient Name:</span>{" "}
              <span className="detail">M. Ahmad Khan</span>
            </div>
          </div>
        </div>

        <hr style={{ margin: "0px " }} />

        <div className="department-timestamp">
          <div className="left">
            <div className="department">Department:</div>
            <div className="operate">Surgery (Gynecology)</div>
          </div>
          <div className="right mr-4">
            <div>
              {" "}
              <span className="title"> Issue Date: </span>{" "}
              <span className="detail"> 25th Sep,2023 </span>{" "}
            </div>
            <div>
              <span className="title"> Doctor Name:</span>
              <span className="detail">Dr. Calvin Carlo</span>
            </div>
          </div>
        </div>

        {/*  Invoice table */}

        <div className="table-parent table-border-remove-patient">
          <TableContainer component={Paper} className="invoice-table-scroll">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><span className='table-border-remove-patient-text-header'> No. </span></TableCell>
                  <TableCell align="left"><span className='table-border-remove-patient-text-header'>Item</span></TableCell>
                  <TableCell align="left"><span className='table-border-remove-patient-text-header'>Qty</span></TableCell>
                  <TableCell align="left"><span className='table-border-remove-patient-text-header'>Rate</span></TableCell>
                  <TableCell align="left"><span className='table-border-remove-patient-text-header'>Total</span></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <span className='table-border-remove-patient-text-header'> {row.name} </span>
                    </TableCell>
                    <TableCell align="left'">{row.calories}</TableCell>
                    <TableCell align="left'">{row.fat}</TableCell>
                    <TableCell align="left'">{row.carbs}</TableCell>
                    <TableCell align="left'">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className='d-flex justify-content-between'>
          <div></div>
          <div className='d-flex justify-content-between ' style={{width:"24%", marginRight:"9.3%"}}>
            <div className='mr-0'>
              <p className='mb-0 patient-modal-text-align'>Subtotal:</p>
              <p className='mb-0 patient-modal-text-align'>Taxes:</p>
              <p className='mb-0 patient-modal-text-align-bold'>Total:</p>
            </div>
            <div className=''>
              <p className='mb-0 patient-modal-text-align'>KWD 215</p>
              <p className='mb-0 patient-modal-text-align'>0</p>
              <p className='mb-0 patient-modal-text-align-bold'>KWD 215</p>
            </div>
          </div>
        </div>

        
      </div>
    </Modal>
  );
};

export default PatientInvoice;
