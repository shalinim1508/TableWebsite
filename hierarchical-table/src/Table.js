
import React from 'react';
import Row from './Row';

const Table = ({ data, onPercentageAllocation, onValueAllocation }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Value</th>
          <th>Variance%</th>
        </tr>
      </thead>
      <tbody>
        {data.rows.map(row => (
          <Row key={row.id} row={row} onPercentageAllocation={onPercentageAllocation} onValueAllocation={onValueAllocation} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
