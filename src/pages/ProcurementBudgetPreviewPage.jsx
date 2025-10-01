import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import BudgetPreviewLayer from "../components/BudgetPreviewLayer";
import usePageTitle from "../hooks/usePageTitle";
import { useParams } from "react-router-dom";

const ProcurementBudgetPreviewPage = () => {
  usePageTitle('Budget Preview - Procurement');
  const { id } = useParams();
  
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Budgets Preview' />
        <BudgetPreviewLayer budgetId={id} />
      </MasterLayout>
    </>
  );
};

export default ProcurementBudgetPreviewPage;

