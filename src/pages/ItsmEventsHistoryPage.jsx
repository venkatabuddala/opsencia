import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";
import { mockEventsHistory, severityToBadge } from "../mock/itsmData";
import DataTable from "../components/common/DataTable";
import usePageTitle from "../hooks/usePageTitle";

const ItsmEventsHistoryPage = () => {
  usePageTitle('Events History');
  return (
    <MasterLayout>
      <Breadcrumb title='ITSM / Events History' />
      <div className='card'>
        <div className='card-header border-bottom-0 pb-0'>
          <h6 className='mb-0'>Events History</h6>
        </div>
        <div className='card-body p-20 pt-12'>
          <DataTable
            columns={[
              { header: 'ID', key: 'id', sortable: true, width: '100px' },
              { header: 'Incident ID', key: 'incidentId', sortable: true, width: '150px', render: (v, row) => (
                v ? (
                  <Link 
                    to={`/itsm/incidents/${v}/workbench`} 
                    className='text-primary-600 fw-semibold text-decoration-none'
                  >
                    {v}
                  </Link>
                ) : (
                  <span className='text-muted'>-</span>
                )
              )},
              { header: 'Severity', key: 'sev', sortable: true, width: '100px', render: (v) => <span className={`badge ${severityToBadge(v)}`}>{v}</span> },
              { header: 'Source', key: 'source', sortable: true, width: '120px' },
              { header: 'Message', key: 'message', sortable: true, width: '25%' },
              { header: 'Partner', key: 'partner', sortable: true, width: '12%' },
              { header: 'Client', key: 'client', sortable: true, width: '12%' },
              { header: 'Entity', key: 'entity', sortable: true, width: '12%' },
              { header: 'State', key: 'state', sortable: true, width: '100px' },
              { header: 'Ended', key: 'ended', sortable: true, width: '120px' },
            ]}
            data={mockEventsHistory}
            defaultSortKey='ended'
            defaultSortDir='desc'
            searchPlaceholder='Search history...'
          />
        </div>
      </div>
    </MasterLayout>
  );
};

export default ItsmEventsHistoryPage;

