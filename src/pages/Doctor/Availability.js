import { useState, useEffect, useRef } from "react";
import "../../assets/css/Availability.scss";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Availability = ({ setStartDateParent, setEndDateParent, setAppointmentDate, appointmentDate, slotData, setModal1Open, setValue, setErrorHanding }) => {

    console.log("slotData", slotData?.data)

    console.log("appointmentDate====>", appointmentDate)



    console.log("appointmentDate-->", appointmentDate.selected_date)

    // const emptySlotsData = slotData?.data.filter(item => item.slots.length === 0);

    const emptySlotsData = slotData?.data?.filter((dateObj) =>
        dateObj.slots.every((slot) => slot.is_available === 0)
    );

    console.log("emptySlotsData", emptySlotsData)

    const [slotsdate, setSlotsdate] = useState()
    const [totalDays, setTotalDays] = useState(30)

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

    // const handleDateChange = (date) => {

    //     console.log("dates", date)

    // };

    function isCustomDate(date) {

        const formattedDate = date.toLocaleDateString("en-GB");
        let mapedvalue = available.map((value) => {
            return value.date
        })

        return mapedvalue.includes(formattedDate)
    }

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);



    // const [formattedDate, setFormattedDate] = useState('');

    // const formatDate = (inputDate) => {
    //   const date = new Date(inputDate);
    //   const year = date.getFullYear();
    //   const month = String(date.getMonth() + 1).padStart(2, '0');
    //   const day = String(date.getDate()).padStart(2, '0');
    //   return `${year}-${month}-${day}`;
    // };



    useEffect(() => {
        // Set the default start date to the first day of the current month
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        setStartDate(firstDayOfMonth);

        // Set the default end date to the last day of the current month
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        setEndDate(lastDayOfMonth);

        // Log the start and end dates of the current month
        console.log('Start Date:', firstDayOfMonth);
        console.log('End Date:', lastDayOfMonth);
        console.log("currentDate", currentDate)



        // setAppointmentDate({ ...appointmentDate, 'selected_date': formattedDate })

        // console.log("appointmentDate.selected_date",formattedDate)


    }, []);




    useEffect(() => {
        // Set the default start date to the first day of the current month
        // Only if startDate is initially null
        if (!startDate) {
            const currentDate = new Date();
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            setStartDate(firstDayOfMonth);
            console.log('Start Date (Default):', firstDayOfMonth);
        }

        // Set the default end date to the last day of the current month
        // Only if endDate is initially null
        if (!endDate) {
            const currentDate = new Date();
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            setEndDate(lastDayOfMonth);
            console.log('End Date (Default):', lastDayOfMonth);
        }
    }, [startDate, endDate]);

    const handleDateChange = (dates) => {
        setSelectedDate(dates);
      
        const day = dates.getDate().toString().padStart(2, '0');
        const month = (dates.getMonth() + 1).toString().padStart(2, '0');
        const year = dates.getFullYear();
      
        // Concatenate the formatted day, month, and year.
        const formattedDate = `${year}-${month}-${day}`;
      
        setAppointmentDate({ ...appointmentDate, 'selected_date': formattedDate });
      
        setErrorHanding(formattedDate);
      
        const slotDataFind = slotData?.data?.find((item) => {
          return formattedDate === item.date;
        });
      
        if (slotDataFind) {
            console.log("slotDataFind",slotDataFind?.slots)
          setSlotsdate(slotDataFind.slots);
        } 
      
        const { start, end } = dates;
      
        // If the start date is changed, log the start date of the selected month
        if (start) {
          const startMonth = new Date(start);
          console.log('Start Date:', startMonth);
          setStartDate(startMonth);
        }
      
        // If the end date is changed, log the end date of the selected month
        if (end) {
          const endMonth = new Date(end);
          setEndDate(endMonth);
        }
      };
      
console.log("slotsdate",slotsdate)
    useEffect(() => {
        setAppointmentDate({ ...appointmentDate, 'selected_date': appointmentDate.start_date })
        const slotDataFind = slotData?.data?.find((item) => {
            if (appointmentDate.start_date == item.date) {
                return item?.slots
            }
        })
        
        setSlotsdate(slotDataFind?.slots)
    }, [slotData?.data?.length])

    const handleMonthChange = (date) => {
        // Log the start date of the current month when the month changes
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
        // setStartDateParent(startOfMonth)
        console.log('Start Date of Current Month:', startOfMonth);

        // Log the end date of the current month when the month changes
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0];
        // setEndDateParent(endOfMonth)
        console.log('End Date of Current Month:', endOfMonth);
        // setAppointmentDate({ ...appointmentDate, 'start_date': startOfMonth, 'end_date': endOfMonth })
    };

    const handleChange = (doctor_availability_slot_id, start_time, end_time) => {
        console.log("doctor_availability_slot_id, start_time, end_time", doctor_availability_slot_id, start_time, end_time)
        setAppointmentDate({ ...appointmentDate, 'start_slot': start_time.slice(0, 5), 'end_slot': end_time.slice(0, 5), "doctor_availability_slot_id": doctor_availability_slot_id })
        //    setValue('start_slot', start_time.slice(0, 5))
        //    setValue('end_slot', end_time.slice(0, 5))
    }

    useEffect(() => {
        logNext30Days()
        // setSelectedDate('')
    }, [])

    const logNext30Days = () => {
        const next30Days = [];
        const currentDate = new Date();

        for (let i = 0; i <= totalDays - 1; i++) {
            const nextDay = new Date(currentDate);
            nextDay.setDate(currentDate.getDate() + i);
            const formattedDate = `${nextDay.getFullYear()}-${(nextDay.getMonth() + 1).toString().padStart(2, '0')}-${nextDay.getDate().toString().padStart(2, '0')}`;
            next30Days.push(formattedDate);
        }

        console.log('Next 30 days:', next30Days[0], next30Days[totalDays - 1]);
        setAppointmentDate({ ...appointmentDate, 'start_date': next30Days[0], 'end_date': next30Days[totalDays - 1] })

    };

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + totalDays - 1);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const apiResponse = [
        { dateField: '2023-08-10' },
        { dateField: '2023-08-20' },
        // Add more objects with dateField values as needed
    ];


    const highlightDates = date => {
        const currentDate = new Date();
        const timeDiff = date.getTime() - currentDate.getTime();
        const diffDays = timeDiff / (1000 * 3600 * 24); // Calculate the difference in days



        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        if (emptySlotsData?.some(item => item.date === formattedDate)) {
            // Change the color of dates that are present in the apiResponse array to blue
            return 'special-date';
        } else if (diffDays >= -1 && diffDays < totalDays - 1) {
            // Dates within the next "totalDays" days from the current date
            return 'highlighted-dates';
        } else {
            // For other dates, apply different colors based on whether the date number is even or odd
            return date.getDate() % 2 === 0 ? 'even-dates' : 'odd-dates';
        }
    };

    const disabledDates = emptySlotsData?.map(item => new Date(item.date));
    console.log("highlightDates", highlightDates)
    console.log("slotsdate==>", slotsdate)

    return (<>
        <div className="Availbility-container w-100 d-flex flex-column flex-md-row">
            <div className="w-100  date-picker-availability" >
                <div className="w-100 " style={{ borderBottom: "1px solid #007bff" }}>
                    <h3 className="date-h3">Date</h3>
                    <p className="top-p" style={{ marginTop: '-1px' }}>Earliest available appointment 17 March 2018</p>
                </div>
                <div className=" w-100 " style={{ margin: "auto" }} >

                    <DatePicker
                        open
                        selected={selectedDate}
                        minDate={new Date()}
                        maxDate={maxDate}
                        format="YYYY-MM-DD" // Set the date format
                        className="custom-datepicker "
                        onChange={handleDateChange}
                        // dayClassName={date => (isCustomDate(date) ? 'availale-dates' : "not-availale-dates")}
                        onMonthChange={handleMonthChange}
                        // dayClassName={date => (highlightDates(date) ? 'highlighted-dates' : '')} // Add the custom class for highlighted dates
                        dayClassName={highlightDates}
                        excludeDates={disabledDates}
                    />
                </div>
            </div>


            <div className="w-100"  >
                <div style={{ borderBottom: "1px solid #007bff", paddingBottom: "37.5px" }}>
                    <h3 className="date-h3 ">Time</h3>

                </div>
                <div className="border pl-3 py-2 three-side-shadow-hover" style={{ marginTop: "50px", height: '14.3rem', overflowY: "scroll", borderRadius: '3px' }}>
                    {slotsdate?.length > 0 ? slotsdate?.map((slot,i) => {
                        const { start_time, end_time, doctor_availability_slot_id, is_available } = slot;
                        
                        return (
                            <div className="times-selector d-flex justify-content-between align-items-center " key={i}>
                            
                                <div className="d-flex align-items-center">
                                
                                    <div className="d-flex" style={{ width: '15px', height: "15px", marginBottom: "1.3rem" }}>
                                        <input id={doctor_availability_slot_id} disabled={!is_available} type="radio" name="time_slot" value={doctor_availability_slot_id} onChange={() => handleChange(doctor_availability_slot_id, start_time, end_time)} />
                                    </div>
                                    <p className="mb-0 pl-2" style={{ fontWeight: "700" }}>{start_time.slice(0, 5)} - {end_time.slice(0, 5)}</p>
                                </div>
                                {is_available != 1 ? (
                                    <div className="mt-2 pr-3 d-flex justify-content-end" style={{ width: "50%" }}>
                                        <h6 style={{ fontWeight: "500", color: 'red' }}>Not Available</h6>
                                    </div>
                                ) : (
                                    <div className="mt-2 mr-3 d-flex justify-content-end" style={{ width: "50%" }}>
                                        <h6 style={{ fontWeight: "700", color: 'green' }}>Available</h6>
                                    </div>
                                )}
                            </div>
                        );
                    }) : <div className="d-flex justify-content-center align-items-center h-100 w-100">Nothing to show for selected date.</div>}
                </div>
                <div className="w-100 d-flex justify-content-end mt-3">
                    <button className="common-btn " disabled={!appointmentDate?.doctor_availability_slot_id} style={{ height: '36.6px', width: '9em' }} onClick={() => {
                        setModal1Open(false)
                    }}>Submit</button>

                </div>
            </div>


        </div >
    </>)
}
export default Availability