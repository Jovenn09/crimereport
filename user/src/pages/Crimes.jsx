import Crime from "../components/Crime";
import Sidebar from "../components/Sidebar";

const Crimes = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Crime />
    </div>
  );
};

export default Crimes;
