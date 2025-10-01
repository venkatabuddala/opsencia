import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementRequisitionViewLayer from "../components/ProcurementRequisitionViewLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementRequisitionViewPage = () => {
  usePageTitle('Procurement - Purchase Preview');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Procurement' subtitle='Purchase Preview' />
        <ProcurementRequisitionViewLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementRequisitionViewPage;
