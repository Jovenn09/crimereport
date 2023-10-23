import Welcome from "../components/Welcome";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Welcome />
    </div>
  );
};

export default Dashboard;
