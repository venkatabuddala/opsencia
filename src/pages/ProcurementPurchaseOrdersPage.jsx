import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementPurchaseOrdersLayer from "../components/ProcurementPurchaseOrdersLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementPurchaseOrdersPage = () => {
  usePageTitle('Procurement - Purchase Orders');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Procurement' subtitle='Purchase Orders' />
        <ProcurementPurchaseOrdersLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementPurchaseOrdersPage;




