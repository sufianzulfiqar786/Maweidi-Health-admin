import { Avatar, Divider, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// css
import "../../assets/css/dashboard.scss";

const App = () => {
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  // const loadMoreData = () => {
  //   if (loading) {
  //     return;
  //   }
  //   setLoading(true);
  //   fetch(
  //     "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
  //   )
  //     .then((res) => res.json())
  //     .then((body) => {
  //       setData([...data, ...body.results]);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // };
  // useEffect(() => {
  //   loadMoreData();
  // }, []);

  const data = [
    {
      hospital: "Al Sabah Hospital",
      doctor: "Dr. Ahmed Ali",
      link: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/07/2023",
      time: "12:34:02 PM",
      patient: "Sarah Ahmed",
    },
    {
      hospital: "Mubarak Al-Kabeer Hospital",
      doctor: "Dr. Fatima Hassan",
      link: "https://images.pexels.com/photos/9741487/pexels-photo-9741487.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "29/08/2023",
      time: "11:34:02 PM",
      patient: "Khalid Mansour",
    },
    {
      hospital: "Amiri Hospital",
      doctor: "Dr. Mohammed Saleh",
      link: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "30/08/2023",
      time: "10:34:02 PM",
      patient: "Layla Abdullah",
    },
    {
      hospital: "Chest Diseases Hospital",
      doctor: "Dr. Aisha Khalid",
      link: "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "25/08/2023",
      time: "09:34:02 PM",
      patient: "Ahmed Hassan",
    },
    {
      hospital: "Al-Razi Orthopedic Hospital",
      doctor: "Dr. Ali Mansoor",
      link: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "07:34:02 PM",
      patient: "Noura Khalid",
    },
    {
      hospital: "Ibn Sina Hospital",
      doctor: "Dr. Rana Hamad",
      link: "https://images.pexels.com/photos/534219/pexels-photo-534219.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Omar Ali",
    },
    {
      hospital: "Jaber Al-Ahmad Al-Sabah Hospital",
      doctor: "Dr. Yasmin Khalifa",
      link: "https://images.pexels.com/photos/2959588/pexels-photo-2959588.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Faisal Ahmed",
    },
    {
      hospital: "Al Jahra Hospital",
      doctor: "Dr. Abdullah Ibrahim",
      link: "https://images.pexels.com/photos/7314559/pexels-photo-7314559.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Aisha Mustafa",
    },
    {
      hospital: "Adan Hospital",
      doctor: "Dr. Nour Ibrahim",
      link: "https://images.pexels.com/photos/534219/pexels-photo-534219.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Ali Saleh",
    },
    {
      hospital: "Al-Adan Maternity Hospital",
      doctor: "Dr. Fatima Mansoor",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Rana Ahmed",
    },
    {
      hospital: "Al-Farwaniya Maternity Hospital",
      doctor: "Dr. Khalid Fahad",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Hadeel Ali",
    },
    {
      hospital: "Kuwait Cancer Control Center",
      doctor: "Dr. Hana Saad",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Nasser Abdullah",
    },
    {
      hospital: "Al-Razi Mental Health Hospital",
      doctor: "Dr. Salma Farouk",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Hassan Mahmoud",
    },
    {
      hospital: "Kuwait National Guard Hospital",
      doctor: "Dr. Jamal Nasser",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Rima Khalid",
    },
    {
      hospital: "Al-Mowasat Hospital",
      doctor: "Dr. Sara Hamza",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Ahmed Mohammed",
    },
    {
      hospital: "Al-Zahra Hospital",
      doctor: "Dr. Omar Mansoor",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Dana Khalid",
    },
    {
      hospital: "Sabah Al-Ahmad Urology Center",
      doctor: "Dr. Hisham Ali",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Laila Mansour",
    },
    {
      hospital: "Ibn Sina Oncology Center",
      doctor: "Dr. Leena Fahad",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Hassan Ibrahim",
    },
    {
      hospital: "Cancer Radiation Center",
      doctor: "Dr. Ahmed Mansoor",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Hadeel Abdullah",
    },
    {
      hospital: "Kuwait Heart Center",
      doctor: "Dr. Yasir Khalid",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Sara Mohammed",
    },
    {
      hospital: "Amiri Diabetic Center",
      doctor: "Dr. Reem Saad",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Ali Ahmed",
    },
    {
      hospital: "Kuwait Physical Medicine Center",
      doctor: "Dr. Youssef Farouk",
      link: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Nadia Khalifa",
    },
    {
      hospital: "Mubarak Al-Kabeer Chest Hospital",
      doctor: "Dr. Hana Mansoor",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Yousef Ali",
    },
    {
      hospital: "Sheikh Jaber Al-Ahmad Al-Sabah Neurosciences Center",
      doctor: "Dr. Samir Hassan",
      link: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Maya Khalid",
    },
    {
      hospital: "Ibn Sina Psychiatry Hospital",
      doctor: "Dr. Aisha Nasser",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Omar Mohammed",
    },
    {
      hospital: "Mubarak Al-Kabeer General Hospital",
      doctor: "Dr. Khalid Ibrahim",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Laila Ahmed",
    },
    {
      hospital: "Al-Razi Eye Hospital",
      doctor: "Dr. Omar Abdullah",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Sara Khalid",
    },
    {
      hospital: "Al-Amiri ENT Hospital",
      doctor: "Dr. Noura Ali",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Khaled Hassan",
    },
    {
      hospital: "Mubarak Al-Kabeer Maternity Hospital",
      doctor: "Dr. Fatima Khalid",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Aisha Saleh",
    },
    {
      hospital: "Chest Diseases Research Center",
      doctor: "Dr. Ahmed Mansoor",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Sara Abdullah",
    },
    {
      hospital: "Al-Razi Diabetes Center",
      doctor: "Dr. Mohammed Ali",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Khalid Ahmed",
    },
    {
      hospital: "Amiri Physiotherapy Center",
      doctor: "Dr. Layla Hassan",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Hassan Ali",
    },
    {
      hospital: "Al-Farwaniya Eye Center",
      doctor: "Dr. Rana Abdullah",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Noura Khalifa",
    },
    {
      hospital: "Al-Mowasat Dental Center",
      doctor: "Dr. Omar Fahad",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Mohammed Saleh",
    },
    {
      hospital: "Mubarak Al-Kabeer Orthopedic Center",
      doctor: "Dr. Aisha Mansoor",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Ahmed Hassan",
    },
    {
      hospital: "Kuwait Rehabilitation Center",
      doctor: "Dr. Khalid Ibrahim",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Lina Ahmed",
    },
    {
      hospital: "Ibn Sina Cardiology Center",
      doctor: "Dr. Sara Khalifa",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Yousef Mohammed",
    },
    {
      hospital: "Al-Sabah Dermatology Center",
      doctor: "Dr. Omar Hassan",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Layla Khalid",
    },
    {
      hospital: "Amiri Gastroenterology Center",
      doctor: "Dr. Noura Ali",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Ahmed Abdullah",
    },
    {
      hospital: "Mubarak Al-Kabeer Mental Health Center",
      doctor: "Dr. Fatima Khalid",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Nadia Ahmed",
    },
    {
      hospital: "Chest Diseases Respiratory Center",
      doctor: "Dr. Ahmed Mansoor",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Khalid Saleh",
    },
    {
      hospital: "Al-Farwaniya Nephrology Center",
      doctor: "Dr. Aisha Ahmed",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Sara Abdullah",
    },
    {
      hospital: "Al-Mowasat Rheumatology Center",
      doctor: "Dr. Mohammed Hassan",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Ahmed Khalid",
    },
    {
      hospital: "Mubarak Al-Kabeer ENT Center",
      doctor: "Dr. Layla Ali",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Noura Hassan",
    },
    {
      hospital: "Ibn Sina Allergy Center",
      doctor: "Dr. Omar Fahad",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Khaled Ahmed",
    },
    {
      hospital: "Kuwait Sports Medicine Center",
      doctor: "Dr. Rana Abdullah",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Lina Khalifa",
    },
    {
      hospital: "Al-Sabah Hematology Center",
      doctor: "Dr. Omar Hassan",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Yousef Khalid",
    },
    {
      hospital: "Amiri Pediatrics Center",
      doctor: "Dr. Noura Ali",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Nadia Abdullah",
    },
    {
      hospital: "Mubarak Al-Kabeer Diabetes Center",
      doctor: "Dr. Fatima Khalid",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Ahmed Ali",
    },
    {
      hospital: "Chest Diseases Asthma Center",
      doctor: "Dr. Ahmed Mansoor",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Khalid Saleh",
    },
    {
      hospital: "Al-Farwaniya Gynecology Center",
      doctor: "Dr. Aisha Ahmed",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Sara Abdullah",
    },
    {
      hospital: "Al-Mowasat Dermatology Center",
      doctor: "Dr. Mohammed Hassan",
      link: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Ahmed Khalid",
    },
    {
      hospital: "Mubarak Al-Kabeer Orthodontics Center",
      doctor: "Dr. Layla Ali",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Noura Hassan",
    },
    {
      hospital: "Ibn Sina Ophthalmology Center",
      doctor: "Dr. Omar Fahad",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Khaled Ahmed",
    },
    {
      hospital: "Kuwait Neurology Center",
      doctor: "Dr. Rana Abdullah",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Lina Khalifa",
    },
    {
      hospital: "Al-Sabah Radiology Center",
      doctor: "Dr. Omar Hassan",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Yousef Khalid",
    },
    {
      hospital: "Amiri Dental Center",
      doctor: "Dr. Noura Ali",
      link: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Nadia Abdullah",
    },
    {
      hospital: "Mubarak Al-Kabeer Pulmonology Center",
      doctor: "Dr. Fatima Khalid",
      link: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "28/08/2023",
      time: "12:34:02 PM",
      patient: "Ahmed Ali",
    },
  ];

  return (
    <>
      <div className="row  px-4 py-4 my-1 ">
        <div className="col-8 d-flex justify-content-start align-items-center">
          <p className="mb-0  appoinment-text">Latest Appoinment </p>
        </div>

        <div className="col-4 d-flex justify-content-end align-items-center">
          <p className="mb-0 appoinment-count-text">{data.length} Patients</p>
        </div>
      </div>

      {/* <div
        className="border-top mx-2 pt-3 remove-x-overflow-doc-list"
        id="scrollableDiv"
        style={{
          height: 401,
          overflow: "auto",
          padding: "0 8px",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <>
                <div className="row  py-1">
                  <div className="col-12">
                    <div className="d-flex appoinment-detail align-items-center">
                      <img
                        className="appoinment-detail-img cursor-pointer"
                        src={item.picture.large}
                        alt=""
                      />

                      <div className="appoinment-detail-text pl-4 d-flex justify-content-center flex-column">
                        <p className="mb-0 appoinment-detail-text-1">
                          {item.name.last}
                        </p>
                        <p className="mb-0 appoinment-detail-text-2">
                          Booking on 27th Nov, 2020
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          />
        </InfiniteScroll>
      </div> */}
      <div
        className="border-top mx-2 pt-3 remove-x-overflow-doc-list"
        id="scrollableDiv"
        style={{
          height: 375,
          overflowX: "hidden",
          padding: "0 8px",
        }}
      >

        {data.map((item) => <div className="row  py-1">
          <div className="col-12">
            <div className="d-flex appoinment-detail align-items-center">
              <img
                className="appoinment-detail-img cursor-pointer object-fit-cover"
                src={item.link}
                alt=""
              />

              <div className="appoinment-detail-text pl-4 d-flex justify-content-center flex-column">
                <p className="mb-0 appoinment-detail-text-1">
                  {item.hospital}
                </p>
                <p className="mb-0 appoinment-detail-text-2">
                  {item.doctor} booked by {item.patient}
                </p>
                <p className="mb-0 appoinment-detail-text-3">
                  {item.date} - {item.time}
                </p>
              </div>
            </div>
          </div>
        </div>
        )}

      </div>
    </>
  );
};
export default App;
