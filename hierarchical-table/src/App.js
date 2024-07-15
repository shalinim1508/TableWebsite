// App.js

import React, { useState } from 'react';
import Table from './Table';
const data = {
  rows: [
    {
      id: 'electronics',
      label: 'Electronics',
      value: 1500,
      children: [
        {
          id: 'phones',
          label: '--Phones',
          value: 800
        },
        {
          id: 'laptops',
          label: '--Laptops',
          value: 700
        }
      ]
    },
    {
      id: 'furniture',
      label: 'Furniture',
      value: 1000,
      children: [
        {
          id: 'tables',
          label: '--Tables',
          value: 300
        },
        {
          id: 'chairs',
          label: '--Chairs',
          value: 700
        }
      ]
    }
  ]
};


const App = () => {
  const [tableData, setTableData] = useState(data);
  const handlePercentageAllocation = (rowId, percentage) => {
    const updatedData = updateRowByPercentage(tableData, rowId, percentage);
    setTableData(updatedData);
  };

  const handleValueAllocation = (rowId, newValue) => {
    const updatedData = updateRowByValue(tableData, rowId, newValue);
    setTableData(updatedData);
  };


const updateRowByPercentage = (data, rowId, percentage) => {
  return data.map(row => {
    if (row.id === rowId) {
      const originalValue = row.value;
      const increase = (originalValue * percentage) / 100;
      const newValue = originalValue + increase;
      return { ...row, value: newValue };
    } else if (row.children) {
      const updatedChildren = updateRowByPercentage(row.children, rowId, percentage);
      return { ...row, children: updatedChildren, value: calculateSubtotal(updatedChildren) };
    } else {
      return row;
    }
  });
};

const updateRowByValue = (data, rowId, newValue) => {
  return data.map(row => {
    if (row.id === rowId) {
      const originalValue = row.value;
      const change = newValue - originalValue;
      return { ...row, value: newValue };
    } else if (row.children) {
      const updatedChildren = updateRowByValue(row.children, rowId, newValue);
      return { ...row, children: updatedChildren, value: calculateSubtotal(updatedChildren) };
    } else {
      return row;
    }
  });
};

const calculateSubtotal = (children) => {
  if (!children || children.length === 0) {
    return 0;
  }
  return children.reduce((total, child) => total + parseFloat(child.value || 0), 0);
};


  return (
    <div className="App">
      <h1>Table</h1>
      <Table data={tableData} onPercentageAllocation={handlePercentageAllocation} onValueAllocation={handleValueAllocation} />
    </div>
  );
}

export default App;
