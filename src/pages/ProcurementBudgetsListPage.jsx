import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import BudgetsLayer from "../components/BudgetsLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementBudgetsListPage = () => {
  usePageTitle('Budgets - Procurement');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Budgets' />
        <BudgetsLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementBudgetsListPage;

