import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementCatalogueManageLayer from "../components/ProcurementCatalogueManageLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementCatalogueManagePage = () => {
  usePageTitle('Procurement - Manage Catalogue');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Procurement' subtitle='Products and Services' />
        <ProcurementCatalogueManageLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementCatalogueManagePage;






