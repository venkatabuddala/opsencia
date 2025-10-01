import { useMemo, useState } from "react";

/*
Props:
  - columns: Array<{
      header: string,
      key?: string,              // property name to read
      accessor?: (row) => any,   // optional accessor
      render?: (value, row) => JSX,
      sortable?: boolean,
      width?: string | number,   // column width (e.g., '100px', '10%', 150)
    }>
  - data: Array<any>
  - defaultSortKey?: string
  - defaultSortDir?: 'asc' | 'desc'
  - pageSizeOptions?: number[]
  - defaultPageSize?: number
  - searchPlaceholder?: string
  - searchKeys?: string[]        // keys to search across; defaults to all column keys
*/

const DataTable = ({
  columns,
  data,
  defaultSortKey,
  defaultSortDir = "asc",
  pageSizeOptions = [5, 10, 25, 50],
  defaultPageSize = 10,
  searchPlaceholder = "Search...",
  searchKeys,
}) => {
  const [sortKey, setSortKey] = useState(defaultSortKey || (columns.find(c => c.sortable)?.key ?? columns[0]?.key));
  const [sortDir, setSortDir] = useState(defaultSortDir);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const keysToSearch = useMemo(() => {
    if (searchKeys && searchKeys.length) return searchKeys;
    const fromColumns = columns.map(c => c.key).filter(Boolean);
    if (fromColumns.length) return fromColumns;
    return Object.keys(data?.[0] || {});
  }, [searchKeys, columns, data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(row => keysToSearch.some(k => String(k && row[k] !== undefined ? row[k] : "").toLowerCase().includes(q)));
  }, [data, query, keysToSearch]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const col = columns.find(c => c.key === sortKey);
    const accessor = col?.accessor || ((r) => (sortKey in r ? r[sortKey] : undefined));
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = accessor(a);
      const bv = accessor(b);
      if (av === bv) return 0;
      if (av === undefined || av === null) return sortDir === 'asc' ? -1 : 1;
      if (bv === undefined || bv === null) return sortDir === 'asc' ? 1 : -1;
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return copy;
  }, [filtered, sortKey, sortDir, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const pageRows = useMemo(() => sorted.slice(startIdx, startIdx + pageSize), [sorted, startIdx, pageSize]);

  const handleSort = (key, sortable) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const goto = (p) => setPage(Math.max(1, Math.min(totalPages, p)));

  return (
    <div>
      <div className='d-flex align-items-center justify-content-between mb-12'>
        <input
          className='form-control w-50'
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
        />
        <div className='d-flex align-items-center gap-2'>
          <span className='text-sm text-secondary-light'>Rows:</span>
          <select className='form-select w-auto' value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
            {pageSizeOptions.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='table-responsive'>
        <table className='table mb-0'>
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.header}
                  role={col.sortable ? 'button' : undefined}
                  onClick={() => handleSort(col.key, col.sortable)}
                  className={col.sortable ? 'user-select-none' : ''}
                  style={{ 
                    width: col.width,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  <span className='d-inline-flex align-items-center gap-1'>
                    {col.header}
                    {col.sortable && col.key === sortKey && (
                      <i className={`ri-arrow-${sortDir === 'asc' ? 'up' : 'down'}-s-line`} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, idx) => (
              <tr key={idx}>
                {columns.map(col => {
                  const value = col.accessor ? col.accessor(row) : col.key ? row[col.key] : undefined;
                  return (
                    <td key={col.header} style={{ 
                      width: col.width,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {col.render ? col.render(value, row) : String(value ?? '')}
                    </td>
                  );
                })}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className='text-center text-secondary-light'>No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='d-flex align-items-center justify-content-between mt-12'>
        <span className='text-sm text-secondary-light'>
          Showing {sorted.length ? startIdx + 1 : 0}-{Math.min(startIdx + pageSize, sorted.length)} of {sorted.length}
        </span>
        <div className='d-flex align-items-center gap-2'>
          <button className='btn btn-outline-primary-600 btn-sm' onClick={() => goto(1)} disabled={currentPage === 1}>First</button>
          <button className='btn btn-outline-primary-600 btn-sm' onClick={() => goto(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          <span className='text-sm'>Page {currentPage} / {totalPages}</span>
          <button className='btn btn-outline-primary-600 btn-sm' onClick={() => goto(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          <button className='btn btn-outline-primary-600 btn-sm' onClick={() => goto(totalPages)} disabled={currentPage === totalPages}>Last</button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

