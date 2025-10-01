import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { mockOpenEvents, severityToBadge } from "../mock/itsmData";
import DataTable from "../components/common/DataTable";
import usePageTitle from "../hooks/usePageTitle";

const ItsmEventsOpenPage = () => {
  usePageTitle('Open Events');
  return (
    <MasterLayout>
      <Breadcrumb title='ITSM / Open Events' />
      <div className='card'>
        <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
          <h6 className='mb-0'>Open Events</h6>
          <button type='button' className='btn btn-outline-primary-600 btn-sm'>
            <Icon icon='mdi:download' className='me-8' /> Export
          </button>
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
              { header: 'Message', key: 'message', sortable: true, width: '30%' },
              { header: 'Partner', key: 'partner', sortable: true, width: '15%' },
              { header: 'Client', key: 'client', sortable: true, width: '15%' },
              { header: 'Entity', key: 'entity', sortable: true, width: '15%' },
              { header: 'Time', key: 'time', sortable: true, width: '100px' },
            ]}
            data={mockOpenEvents}
            defaultSortKey='id'
            searchPlaceholder='Search events...'
          />
        </div>
      </div>
    </MasterLayout>
  );
};

export default ItsmEventsOpenPage;

