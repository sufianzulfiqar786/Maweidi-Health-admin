import { useState, useEffect } from "react";
import "../../assets/css/Availability.scss";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Availability = () => {
    const [thisMonthDates, setthisMonthDates] = useState([]);
    let arr = [

        "10:00 - 11:00",
        "11:00 - 12:00",
        "13:00 - 14:00",
        "14:00 - 15:00",
        "16:00 - 17:00"

    ]
    let replacements = ["Friday", "Choose", ","];
    let available = [
        {
            date: "11/07/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
        {
            date: "18/07/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
        {
            date: "26/07/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
        {
            date: "24/07/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
        {
            date: "23/07/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
        {
            date: "30/07/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
        {
            date: "30/06/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
    ]
    const handleDateChange = (date) => {


    };


    function isCustomDate(date) {

        const formattedDate = date.toLocaleDateString("en-GB");
        let mapedvalue = available.map((value) => {
            return value.date
        })
   
        return mapedvalue.includes(formattedDate)
    }

    return (<>
        <div className="Availbility-container d-flex">
            <div style={{ width: "50%", marginRight: "2%" }} >
                <div style={{ borderBottom: "1px solid #007bff", }}>
                    <h3 className="date-h3">Date</h3>
                    <p className="top-p">Earliest available appointment 17 March 2018</p>

                </div>
                <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }} >

                    <DatePicker
                        open

                        format="DD/MM/YYYY" // Set the date format
                        className="custom-datepicker"

                        onChange={handleDateChange}
                        dayClassName={date => (isCustomDate(date) ? 'availale-dates' : "not-availale-dates")}

                    />
                </div>
            </div>
            <div style={{ width: "50%", marginLeft: "5%", }} >
                <div style={{ borderBottom: "1px solid #007bff", paddingBottom: "40px" }}>
                    <h3 className="date-h3">Time</h3>


                </div>
                <div style={{ marginTop: "40px", }} >
                    {
                        arr.map((value, index) => {
                            return <>
                                <div style={{}} className="times-selector " >
                                    <div className="d-flex" style={{ alignItems: 'center', paddingLeft: "30px", }}>
                                        <div style={{ marginRight: "20%" }}>
                                            <input type="radio" id="html" name="fav_language" value="HTML" />
                                            <label for="html" style={{ fontWeight: "700" }}>{value}</label>
                                        </div>
                                        {
                                            index !== 3 ?
                                                < div style={{ width: "50%" }}>
                                                    <h6 style={{ fontWeight: "700", color: 'red' }}>Full</h6>
                                                </div> :
                                                < div style={{ width: "50%" }}>
                                                    <h6 style={{ fontWeight: "700", color: 'green' }}>Available</h6>
                                                </div>
                                        }
                                    </div>
                                </div >

                            </>
                        })
                    }


                </div>
            </div>


        </div >
    </>)
}
export default Availability