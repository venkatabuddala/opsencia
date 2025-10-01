import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ItsmDashboardLayer from "../components/ItsmDashboardLayer";
import usePageTitle from "../hooks/usePageTitle";

const ItsmDashboardPage = () => {
  usePageTitle('ITSM Dashboard');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='ITSM' />
        <ItsmDashboardLayer />
      </MasterLayout>
    </>
  );
};

export default ItsmDashboardPage;

