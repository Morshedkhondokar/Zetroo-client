import { Outlet } from "react-router";
import DashboardSidebar from "../../components/Dashboard/sidebar/DashboardSidebar";
import Loading from "../../components/Loading/Loading";
import useRole from "../../components/hooks/useRole";

const Dashboard = () => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex">
      {/* sidebar */}
      <DashboardSidebar role={role} />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
