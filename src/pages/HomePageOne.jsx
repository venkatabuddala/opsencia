import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DashBoardLayerOne from "../components/DashBoardLayerOne";
import usePageTitle from "../hooks/usePageTitle";

const HomePageOne = () => {
  usePageTitle('Dashboard');
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='AI' />

        {/* DashBoardLayerOne */}
        <DashBoardLayerOne />
      </MasterLayout>
    </>
  );
};

export default HomePageOne;
