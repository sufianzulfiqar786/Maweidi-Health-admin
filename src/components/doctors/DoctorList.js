import { Avatar, Divider, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CorrectIcon from "../../assets/images/dashboard/CorrectIcon.svg";
import IncorrectIcon from "../../assets/images/dashboard/IncorrectIcon.svg";

// css
import "../../assets/css/dashboard.scss";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
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
        setData([...data, ...body.results]);
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
                <div className="row  pt-1 pb-3">
                  <div className="col-12">
                    <div className="d-flex appoinment-detail align-items-center">
                      <img
                        className="add-doctor-detail-img cursor-pointer"
                        src={item.picture.large}
                        alt=""
                      />

                      <div className="appoinment-detail-text pl-4 d-flex justify-content-center flex-column">
                        <p className="mb-0 add-doc-detail-text-1">
                          {item.name.last}
                        </p>
                        <p className="mb-0 add-doc-detail-text-2">
                          Cardiologist
                        </p>
                        <p className="mb-0 add-doc-detail-text-2">
                          3 Years Experienced
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
