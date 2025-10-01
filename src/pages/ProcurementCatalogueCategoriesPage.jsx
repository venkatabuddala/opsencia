import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementCatalogueCategoriesLayer from "../components/ProcurementCatalogueCategoriesLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementCatalogueCategoriesPage = () => {
  usePageTitle('Procurement - Catalogue Categories');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Procurement' subtitle='Products and Services Categories' />
        <ProcurementCatalogueCategoriesLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementCatalogueCategoriesPage;






