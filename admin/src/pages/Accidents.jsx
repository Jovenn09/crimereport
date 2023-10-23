import Accident from "../components/Accident";
import Sidebar from "../components/Sidebar";

const Accidents = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Accident />
    </div>
  );
};

export default Accidents;
