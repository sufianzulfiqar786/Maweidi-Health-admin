import { Avatar, Divider, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CorrectIcon from "../../assets/images/dashboard/CorrectIcon.svg";
import IncorrectIcon from "../../assets/images/dashboard/IncorrectIcon.svg";

// css
import "../../assets/css/dashboard.scss";
import useFetch from "../../customHook/useFetch";
import { useSelector } from "react-redux";

const App = () => {
  const [page, setPage] = useState(1);

  const [docdata, setDocData] = useState([]);
  const { data, isLoading, error, fetchPaginatedData } = useFetch(
    `${process.env.REACT_APP_GET_DOCTORS}?per_page=10&page=${page}`
  );
  useEffect(() => {
    if (data?.data) {
      setDocData([...docdata, ...data?.data?.data]);
    }
  }, [data]);

  const loadMoreData = () => {
    if (isLoading) {
      return;
    }

    setPage(page + 1);
    fetchPaginatedData(
      `${process.env.REACT_APP_GET_DOCTORS}?per_page=10&page=${page + 1}`
    );
  };

  const specializationData = useSelector(
    (state) => state.specialization.specializationData
  );
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
          hasMore={docdata?.length < data?.data?.total}
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
            renderItem={(item) => {
              const matchingSpecialization = specializationData?.data?.find(
                (specialization) => specialization.id === item.specialization_id
              );
              return (
                <>
                  <div className="row  pt-1 pb-3">
                    <div className="col-12">
                      <div className="d-flex appoinment-detail align-items-center">
                        <img
                          className="add-doctor-detail-img cursor-pointer"
                          src={`${process.env.REACT_APP_IMAGE_URL}/${item?.user?.profile_pic}`}
                          alt=""
                        />

                        <div className="appoinment-detail-text pl-4 d-flex justify-content-center flex-column">
                          <p className="mb-0 add-doc-detail-text-1">
                            {item?.user?.name}
                          </p>
                          <p className="mb-0 add-doc-detail-text-2">
                            {matchingSpecialization
                              ? matchingSpecialization.name
                              : "Specialization not found"}
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
              );
            }}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};
export default App;
