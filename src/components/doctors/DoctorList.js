import { Avatar, Divider, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CorrectIcon from "../../assets/images/dashboard/CorrectIcon.svg";
import IncorrectIcon from "../../assets/images/dashboard/IncorrectIcon.svg";

// css
import "../../assets/css/dashboard.scss";
import useFetch from "../../customHook/useFetch";

const App = () => {
  const BaseURL = process.env.REACT_APP_BASE_URL;
  const GetDoctor = process.env.REACT_APP_GET_DOCTORS;
  const { data, isLoading, error } = useFetch(`${BaseURL}/${GetDoctor}`);

  const [loading, setLoading] = useState(false);
  const [docdata, setDocData] = useState([]);
  useEffect(() => {
    if (data) {
      setDocData(data?.data);
    }
  }, [data]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setDocData([...docdata, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <>
      <div className="row px-4 py-3 my-1 ">
        <div className="col-12 d-flex justify-content-start align-items-center">
          <p className="mb-0  appoinment-text">Doctors List </p>
        </div>
      </div>

      <div
        className="border-top pt-3 remove-x-overflow-doc-list"
        id="scrollableDiv"
        style={{
          width: "100%",
          height: 580,
          overflow: "auto",
          padding: "0 16px",
          overflowX: "hidden",
          // border: '1px solid rgba(0, 0, 0, 0)',
        }}
      >
        <InfiniteScroll
          dataLength={docdata?.length}
          next={loadMoreData}
          hasMore={docdata?.length < 50}
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
            dataSource={docdata}
            renderItem={(item) => (
              <>
                <div className="row  pt-1 pb-3">
                  <div className="col-12">
                    <div className="d-flex appoinment-detail align-items-center">
                      <img
                        className="add-doctor-detail-img cursor-pointer"
                        src="https://www.moh.gov.bh/Content/Upload/Image/636724319772210000-%D8%AF.-%D8%AE%D8%A7%D8%AA%D9%88%D9%86-%D9%83%D8%A7%D8%B8%D9%85.jpg"
                        alt=""
                      />

                      <div className="appoinment-detail-text pl-4 d-flex justify-content-center flex-column">
                        <p className="mb-0 add-doc-detail-text-1">
                          {item?.user?.name}
                        </p>
                        <p className="mb-0 add-doc-detail-text-2">
                          {item?.departments}
                        </p>
                        <p className="mb-0 add-doc-detail-text-2">
                          {item?.experience_years} Years Experienced
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              // <List.Item key={item.email}>
              //   <List.Item.Meta
              //     avatar={<Avatar src={item.picture.large} />}
              //     title={<a href="https://ant.design">{item.name.last}</a>}
              //     description={item.email}
              //   />
              //   <div>Content</div>
              // </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};
export default App;
