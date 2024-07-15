import React, { useState, useEffect } from 'react';

const Row = ({ row, onPercentageAllocation, onValueAllocation }) => {
  const [inputValue, setInputValue] = useState('');
  const [variance, setVariance] = useState(0);

  useEffect(() => {
    const originalValue = row.value;
    const currentValue = parseFloat(inputValue);
    if (!isNaN(currentValue) && currentValue !== originalValue) {
      const change = currentValue - originalValue;
      const variancePercentage = (change / originalValue) * 100;
      setVariance(variancePercentage.toFixed(2));
    } else {
      setVariance(0);
    }
  }, [row.value, inputValue]);

  const updateRowByPercentage = (data, rowId, percentage) => {
    return data.map(row => {
      if (row.id === rowId) {
        const originalValue = row.value;
        const increase = (originalValue * percentage) / 100;
        const newValue = originalValue + increase;
        return { ...row, value: newValue };
      } else if (row.children && row.children.length > 0) {
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
        return { ...row, value: newValue };
      } else if (row.children && row.children.length > 0) {
        const updatedChildren = updateRowByValue(row.children, rowId, newValue);
        return { ...row, children: updatedChildren, value: calculateSubtotal(updatedChildren) };
      } else {
        return row;
      }
    });
  };

  const handlePercentageChange = () => {
    const percentage = parseFloat(inputValue);
      updateRowByPercentage([row], row.id, percentage);
      setInputValue('');
    
  };

  const handleValueChange = () => {
    const newValue = parseFloat(inputValue);
    
      updateRowByValue([row], row.id, newValue);
      setInputValue('');
    
  };

  const calculateSubtotal = (children) => {
    if (!children || children.length === 0) return 0;
    return children.reduce((subtotal, child) => subtotal + child.value, 0);
  };

  return (
    <>
      <tr>
        <td>{row.label}</td>
        <td>{row.value}</td>
        <td><input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} /></td>
        <td><button onClick={handlePercentageChange}>Allocation %</button></td>
        <td><button onClick={handleValueChange}>Allocation Val</button></td>
        <td>{variance}%</td>
      </tr>
      {row.children && row.children.length > 0 && (
        row.children.map(child => (
          <Row
            key={child.id}
            row={child}
            onPercentageAllocation={onPercentageAllocation}
            onValueAllocation={onValueAllocation}
          />
        ))
      )}
    </>
  );
};

export default Row;
