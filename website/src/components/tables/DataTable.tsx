import React from 'react';

interface DataTableProps {
  headers: string[];
  data: any[][];
  sortable?: boolean;
  onRowClick?: (rowIndex: number) => void;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  headers,
  data,
  sortable = false,
  onRowClick,
  className = ''
}) => {
  const [sortColumn, setSortColumn] = React.useState<number | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const [sortedData, setSortedData] = React.useState<any[][]>(data);

  React.useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleHeaderClick = (columnIndex: number) => {
    if (!sortable) return;

    if (sortColumn === columnIndex) {
      // Toggle direction if same column
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);
      sortData(columnIndex, newDirection);
    } else {
      // New column, default to ascending
      setSortColumn(columnIndex);
      setSortDirection('asc');
      sortData(columnIndex, 'asc');
    }
  };

  const sortData = (columnIndex: number, direction: 'asc' | 'desc') => {
    const newData = [...sortedData].sort((a, b) => {
      const valueA = a[columnIndex];
      const valueB = b[columnIndex];

      // Handle different data types
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        const strA = String(valueA).toLowerCase();
        const strB = String(valueB).toLowerCase();
        return direction === 'asc' 
          ? strA.localeCompare(strB) 
          : strB.localeCompare(strA);
      }
    });

    setSortedData(newData);
  };

  return (
    <div className={`data-table-container ${className}`}>
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th 
                key={index}
                className={sortable ? 'sortable-header' : ''}
                onClick={() => handleHeaderClick(index)}
              >
                {header}
                {sortable && (
                  <span className="sort-icon">
                    {sortColumn === index ? (
                      sortDirection === 'asc' ? ' ▲' : ' ▼'
                    ) : ' '}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(rowIndex)}
              className={onRowClick ? 'clickable-row' : ''}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
