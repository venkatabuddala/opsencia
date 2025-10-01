import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementRequisitionsListLayer from "../components/ProcurementRequisitionsListLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementRequisitionsListPage = () => {
  usePageTitle('Procurement - Purchase Requests');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Procurement' subtitle='Purchase Requests' />
        <ProcurementRequisitionsListLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementRequisitionsListPage;


