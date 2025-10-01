import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Breadcrumb = ({ title, subtitle }) => {
  return (
    <div className='d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24'>
      <div>
        <h6 className='fw-semibold mb-0'>{title}</h6>
        {subtitle && <p className='text-muted mb-0 small'>{subtitle}</p>}
      </div>
      <ul className='d-flex align-items-center gap-2'>
        <li className='fw-medium'>
          <Link
            to='/index'
            className='d-flex align-items-center gap-1 hover-text-primary'
          >
            <Icon
              icon='solar:home-smile-angle-outline'
              className='icon text-lg'
            />
            Dashboard
          </Link>
        </li>
        <li> - </li>
        <li className='fw-medium'>{title}</li>
        {subtitle && (
          <>
            <li> - </li>
            <li className='fw-medium'>{subtitle}</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Breadcrumb;
