import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementAuctionViewLayer from "../components/ProcurementAuctionViewLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementAuctionViewPage = () => {
  usePageTitle('Procurement - View Auction');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Procurement' subtitle='View Auction' />
        <ProcurementAuctionViewLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementAuctionViewPage;




