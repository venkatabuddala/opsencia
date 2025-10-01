import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementBidViewLayer from "../components/ProcurementBidViewLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementBidViewPage = () => {
  usePageTitle('Procurement - View Bid');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Procurement' subtitle='View Bid' />
        <ProcurementBidViewLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementBidViewPage;




