import nProgress from 'nprogress';
import { useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EditCar from './EditCar';
import PostCar from './PostCar';
const ManageCar = (props) => {
  useEffect(() => {
    nProgress.start();
    setTimeout(() => {
      nProgress.done();
    }, 1000);
  }, []);
  return (
    <Tabs>
      <TabList>
        <Tab
          onClick={() => {
            nProgress.start();
            setTimeout(() => {
              nProgress.done();
            }, 1000);
          }}
        >
          Manage car
        </Tab>
        <Tab
          onClick={() => {
            nProgress.start();
            setTimeout(() => {
              nProgress.done();
            }, 1000);
          }}
        >
          Post Car
        </Tab>
      </TabList>
      <TabPanel>
        <EditCar />
      </TabPanel>
      <TabPanel>
        <div className="postcar-container">
          <PostCar />
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default ManageCar;
