import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementAuctionsLayer from "../components/ProcurementAuctionsLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementAuctionsPage = () => {
  usePageTitle('Procurement - Auctions');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Procurement' subtitle='Auctions' />
        <ProcurementAuctionsLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementAuctionsPage;




