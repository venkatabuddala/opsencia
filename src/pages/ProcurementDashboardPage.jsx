import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementDashboardLayer from "../components/ProcurementDashboardLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementDashboardPage = () => {
  usePageTitle('Procurement Dashboard');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Procurement' />
        <ProcurementDashboardLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementDashboardPage;

