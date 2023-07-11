import "../../../assets/css/patients/addpatients/doctorslist.scss";
import doctor from "../../../assets/images/common/doctor.svg";

const DoctorsList = () => {
  const doctorDetail = [
    {
      id: 0,
      name: "Dr. Calvin Carlo",
      specialization: "Cardiologist",
      experience: "3 Years Experienced",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmNrB6xm4A-kgNDL3b0HdH5gJjEXaitUMhyQ&usqp=CAU',
    },
    {
      id: 1,
      name: "Dr. Ahmed Ali",
      specialization: "Dermatologist",
      experience: "5 Years Experienced",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSAtnUkIEy-y1xEjJXeQ1CWPbzYVdV-NkeBg&usqp=CAU',
    },
    {
      id: 2,
      name: "Dr. Sarah Khan",
      specialization: "Pediatrician",
      experience: "8 Years Experienced",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU9peU19b4L_nnfSCcVkrfUFQCnHDB--ZklA&usqp=CAU',
    },
    {
      id: 3,
      name: "Dr. Maria Rodriguez",
      specialization: "Gynecologist",
      experience: "10 Years Experienced",
      image: 'https://www.moh.gov.bh/Content/Upload/Image/636724319772210000-%D8%AF.-%D8%AE%D8%A7%D8%AA%D9%88%D9%86-%D9%83%D8%A7%D8%B8%D9%85.jpg',
    },
    {
      id: 4,
      name: "Dr. David Lee",
      specialization: "Orthopedic Surgeon",
      experience: "6 Years Experienced",
      image: 'https://media.licdn.com/dms/image/C5603AQEI3Tt3WdraKg/profile-displayphoto-shrink_800_800/0/1589050723715?e=2147483647&v=beta&t=YC8Q3yGuSV1C8S6-mbsRuzY67D7o2Tem0Np-Ku80EiY',
    },
    {
      id: 5,
      name: "Dr. Lisa Taylor",
      specialization: "Psychiatrist",
      experience: "4 Years Experienced",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQBCHvk76fOKkxNT0XVSChV_M3EhJTvlId9w&usqp=CAU',
    },
    {
      id: 6,
      name: "Dr. Robert Johnson",
      specialization: "Neurologist",
      experience: "9 Years Experienced",
      image: 'https://mazayaclinic4.com/wp-content/uploads/2020/06/Dr.-Karem.jpg',
    },
    {
      id: 7,
      name: "Dr. Emily Smith",
      specialization: "Ophthalmologist",
      experience: "7 Years Experienced",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYTkbcRukBWajdVTQW8IJaH0nzWdTLwgfAKw&usqp=CAU',
    },
    {
      id: 8,
      name: "Dr. Michael Brown",
      specialization: "ENT Specialist",
      experience: "12 Years Experienced",
      image: 'https://badralsamaahospitals.com/public/uploads/doctor/temp/2022/Jun/Dermatology_Dr_Riyas-removebg-preview1656349403429.png',
    },
    {
      id: 9,
      name: "Dr. Sophia Wilson",
      specialization: "Endocrinologist",
      experience: "11 Years Experienced",
      image: 'https://falaj.badralsamaahospitals.com/public/uploads/doctor/temp/2019/Sep/Dr_Sabiha_Akbar_Gynaecologis1568878154518.png',
    },
  ];
  ;

  return (
    <div className="doctors-list-wrapper">
      <div className="header">
        <div className="title">Doctors List</div>
        <hr
          style={{
            borderColor: "border: 1px solid #E4E3E4 !important",
            margin: "0px",
          }}
        />
      </div>

      <div className="doctors-list">
        {doctorDetail.map((doctor) => {
          return (
            <div className="doctor-container" key={doctor.id}>
              <div className="doctor-image-container">
              <img src={doctor.image} />
              </div>
              <div className="doctor-detail">
                <div className="name">{doctor.name}</div>
                <div className="specialization">{doctor.specialization}</div>
                <div className="experience">{doctor.experience}</div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="">All Doctors</button>
    </div>
  );
};

export default DoctorsList;
