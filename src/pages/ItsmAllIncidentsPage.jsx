import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { mockIncidents, priorityToBadge } from "../mock/itsmData";
import DataTable from "../components/common/DataTable";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const ItsmAllIncidentsPage = () => {
  usePageTitle('All Incidents');
  return (
    <MasterLayout>
      <Breadcrumb title='ITSM / All Incidents' />
      <div className='card'>
        <div className='card-header border-bottom-0 pb-0'>
          <h6 className='mb-0'>All Incidents</h6>
        </div>
        <div className='card-body p-20 pt-12'>
          <DataTable
            columns={[
              { 
                header: 'ID', 
                key: 'id', 
                sortable: true,
                width: '150px',
                render: (v, row) => (
                  <Link 
                    to={`/itsm/incidents/${row.id}/workbench`} 
                    className='text-primary-600 fw-semibold text-decoration-none'
                  >
                    {v}
                  </Link>
                )
              },
              { header: 'Title', key: 'title', sortable: true, width: '25%' },
              { header: 'Priority', key: 'prio', sortable: true, width: '100px', render: (v) => <span className={`badge ${priorityToBadge(v)}`}>{v}</span> },
              { header: 'Status', key: 'status', sortable: true, width: '120px' },
              { header: 'Assignee', key: 'assignee', sortable: true, width: '120px' },
              { header: 'Partner', key: 'partner', sortable: true, width: '15%' },
              { header: 'Client', key: 'client', sortable: true, width: '15%' },
              { header: 'Entity', key: 'entity', sortable: true, width: '15%' },
              { header: 'Opened', key: 'openedAt', sortable: true, width: '120px' },
              { header: 'Updated', key: 'updatedAt', sortable: true, width: '120px' },
            ]}
            data={mockIncidents}
            defaultSortKey='id'
            searchPlaceholder='Search all incidents...'
          />
        </div>
      </div>
    </MasterLayout>
  );
};

export default ItsmAllIncidentsPage;

