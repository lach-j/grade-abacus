import React from 'react';
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';

const DynamicFormTable = ({ data, onChange, columns }) => {
  const handleInputChange = (e, index) => {
    let { name, value } = e.target;
    const list = [...data];
    list[index][name] = value;
    onChange(list);
  };

  const handleAddRow = () => {
    let pairs = columns.map((col) => {
      return { [col.property]: col.default ? col.default : '' };
    });
    // Add new entry with default data
    let blank = Object.assign({}, ...pairs);
    onChange([...data, blank]);
  };

  const handleRemoveRow = (index) => {
    if (data.length <= 1) return;
    const list = [...data];
    list.splice(index, 1);
    onChange(list);
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {columns.map((col) => {
            return <th>{col.title}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((x, i) => {
          return (
            <tr>
              <td>
                <button
                  className="block"
                  onClick={() => (data.length !== 1 ? handleRemoveRow(i) : null)}
                >
                  <IoIosRemoveCircle
                    size={20}
                    className={`text-${data.length !== 1 ? 'red-500' : 'gray-500'}`}
                  />
                </button>
              </td>
              {columns.map((col, j) => {
                return (
                  <td>
                    {col.type === 'select' ? (
                      <select
                        name={col.property}
                        value={x[col.property]}
                        onChange={(e) => handleInputChange(e, i)}
                      >
                        {col.options.map((k) => {
                          return <option value={k}>{k}</option>;
                        })}
                      </select>
                    ) : (
                      <input
                        type={col.type}
                        name={col.property}
                        value={x[col.property]}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
        <tr>
          <td>
            <button onClick={handleAddRow}>
              <IoIosAddCircle size={20} className="text-green-500" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DynamicFormTable;
