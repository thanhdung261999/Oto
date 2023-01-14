import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import EditCar from "./EditCar";
import PostCar from "./PostCar";
const ManageCar = (props) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Manage car</Tab>
        <Tab>Post Car</Tab>
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
