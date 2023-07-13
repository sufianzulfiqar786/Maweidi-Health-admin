import Chevron from "../../../assets/images/common/chevron-right.svg";
import "../../../assets/css/laboratory/bloodtest/testcartdetails.scss";
import CartDetailTable from "../../../components/common/CartDetailTable";
import labIcon from "../../../assets/images/laboratory/bloodtest/lab.svg";

const TestCartDetails = () => {
  const rows = [
    {
      number: "1",
      name: "ABSOLUTE EOSINO",
      test: "Haematology",
      price: "Price",
      counter: "counter",
      total: "KWD 510.00",
      LabName: "Chughtai Lab",
      Address: "opposite Chand Pan Shop, Block B Model Town, Gujranwala",
      type: "Home sample"
    },
    {
      number: "2",
      name: "ABSOLUTE EOSINO",
      test: "Haematology",
      price: "Price",
      counter: "counter",
      total: "KWD 510.00",
      LabName: "Chughtai Lab"
      ,
      Address: "opposite Chand Pan Shop, Block B Model Town, Gujranwala"
      ,
      type: "Onsite"
    },
    {
      number: "3",
      name: "ABSOLUTE EOSINO",
      test: "Haematology",
      price: "Price",
      counter: "counter",
      total: "KWD 510.00",
      LabName: "Chughtai Lab"
      ,
      Address: "opposite Chand Pan Shop, Block B Model Town, Gujranwala"
      ,
      type: "Home sample"
    },
    {
      number: "4",
      name: "ABSOLUTE EOSINO",
      test: "Haematology",
      price: "Price",
      counter: "counter",
      total: "KWD 510.00",
      LabName: "Chughtai Lab"
      ,
      Address: "opposite Chand Pan Shop, Block B Model Town, Gujranwala"
      ,
      type: "Onsite"
    },
  ];

  return (
    <>
      <div className="row pl-3 pr-2 pt-4 testcartdetails-tab mb-5">
        <div className="col-12">
          <p className="mb-0 testcartdetails-heading">Test Cart Details</p>
        </div>

        <div className="col-12 my-4">
          <div className="row ">
            <div className="col-md-12">
              <p className="testcartdetails-breadcrumb">
                <span>DASHBOARD</span>
                <img src={Chevron} />
                <span> LABORATORY</span>
                <img src={Chevron} />
                <span className="current-tab"> TEST CART DETAILS</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-8">
          <CartDetailTable rows={rows} testIcon={labIcon} />
        </div>

        <div className="col-4 d-flex justify-content-end ">
          <div className="test-cart-container" style={{marginTop:"0"}}>
            <div className="sub-total">
              <div>Subtotal</div>
              <div>KWD 2190</div>
            </div>
            <div className="taxes">
              <div>Taxes</div>
              <div>KWD 2190</div>
            </div>
            <div className="total">
              <div>Total</div>
              <div>KWD 2190</div>
            </div>
            <div className="credit-info">
              <div className="left">
                <div>Payment</div>
                <div>Debit Card</div>
              </div>
              <div className="right">Paid</div>
            </div>

            <div className="accept-cancel-buttons">
              <button className="accept">Accept</button>
              <button className="cancel">Decline</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestCartDetails;
