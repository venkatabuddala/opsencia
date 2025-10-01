import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementBidsLayer from "../components/ProcurementBidsLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementBidsPage = () => {
  usePageTitle('Procurement - Bids');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Procurement' subtitle='Bids' />
        <ProcurementBidsLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementBidsPage;




