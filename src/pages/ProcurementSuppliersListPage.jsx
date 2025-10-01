import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementSuppliersListLayer from "../components/ProcurementSuppliersListLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementSuppliersListPage = () => {
  usePageTitle('Procurement - Suppliers List');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Procurement' subtitle='Suppliers' />
        <ProcurementSuppliersListLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementSuppliersListPage;
