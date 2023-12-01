import React, { useState } from 'react';
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';
import './dynamicFormTable.module.css';
import { isNullOrUndefined } from '../../util/null-helper';

interface CommonColumnDefinition<K, T> {
  property: K;
  title: string;
  default?: T;
  optional?: boolean;
  placeholder?: string;
}

type Option<T> = {
  label: string;
  value: T;
};

interface SelectColumnDefinition<K extends keyof T, T> extends CommonColumnDefinition<K, T[K]> {
  type: 'select';
  options: (Option<T[K]> | T[K])[];
}

interface InputColumnDefinition<K extends keyof T, T> extends CommonColumnDefinition<K, T[K]> {
  type: 'text';
}

interface NumberColumnDefinition<K extends keyof T, T> extends CommonColumnDefinition<K, T[K]> {
  type: 'number';
  min?: number;
  max?: number;
}

type ColumnDefinition<T> = {
  [K in keyof T]:
    | InputColumnDefinition<K, T>
    | NumberColumnDefinition<K, T>
    | SelectColumnDefinition<K, T>;
}[keyof T];

interface DynamicFormTableProps<T> {
  data: T[];
  onChange?: (data: T[]) => void;
  isValid?: (isValid: boolean) => void;
  columns: ColumnDefinition<T>[];
}

const DynamicFormTable = <T,>({ data, onChange, isValid, columns }: DynamicFormTableProps<T>) => {
  const [invalidEntries, setInvalidEntries] = useState<Map<number, Set<string>>>(new Map());

  const validateData = (data: T[]) => {
    const newInvalidEntries = new Map<number, Set<string>>();
    data.forEach((item, index) => {
      columns.forEach((col) => {
        if (!col.optional && (isNullOrUndefined(item[col.property]) || item[col.property] === '')) {
          if (!newInvalidEntries.has(index)) newInvalidEntries.set(index, new Set());
          newInvalidEntries.get(index)!.add(col.property.toString());
        }
      });
    });
    setInvalidEntries(newInvalidEntries);
    isValid && isValid(![...newInvalidEntries.values()].some((set) => set.size > 0));
  };

  React.useEffect(() => {
    validateData(data);
  }, [data, columns]);

  const handleInputChange = (col: ColumnDefinition<T>, value: any, index: number) => {
    const list = [...data];

    let parsedValue = value;

    if (col.type === 'number') {
      parsedValue = parseInt(value);
      if (col.max && parsedValue > col.max) return;
      if (col.min && parsedValue < col.min) return;
    }
    list[index][col.property] = parsedValue;
    onChange && onChange(list);
  };

  const handleAddRow = () => {
    let pairs = columns.map((col) => {
      return { [col.property]: !isNullOrUndefined(col?.default) ? col.default : '' };
    });

    let blank = Object.assign({}, ...pairs);
    onChange && onChange([...data, blank]);
  };

  const handleRemoveRow = (index: number) => {
    if (data.length <= 1) return;
    const list = [...data];
    list.splice(index, 1);
    onChange && onChange(list);
  };

  const isOption = <T,>(option: T | Option<T>): option is Option<T> => {
    return (option as Option<T>).value !== undefined && (option as Option<T>).label !== undefined;
  };

  const renderField = (col: ColumnDefinition<T>, x: T, i: number) => {
    const isInvalid = invalidEntries.get(i)?.has(col.property.toString());
    if (col.type === 'select') {
      return (
        <select
          name={col.property.toString()}
          value={x[col.property]?.toString()}
          onChange={(e) => {
            const selectedValue = col.options.find((option) =>
              isOption(option)
                ? option.value?.toString() === e.target.value
                : option?.toString() === e.target.value,
            );
            const actualValue = isOption(selectedValue) ? selectedValue.value : selectedValue;
            handleInputChange(col, actualValue, i);
          }}
          {...{ className: isInvalid ? 'outline-red' : undefined }}
        >
          {col.options.map((option) => {
            if (isOption(option)) {
              return <option value={option?.value?.toString()}>{option.label}</option>;
            } else {
              return <option value={option?.toString()}>{option?.toString()}</option>;
            }
          })}
        </select>
      );
    }
    if (col.type === 'number') {
      return (
        <input
          {...{ placeholder: col.placeholder }}
          type="number"
          name={col.property?.toString()}
          value={x[col.property]?.toString()}
          onChange={(e) => handleInputChange(col, e.target.value, i)}
          {...{ className: isInvalid ? 'outline-red' : undefined }}
          min={col.min}
          max={col.max}
        />
      );
    }

    return (
      <input
        {...{ placeholder: col.placeholder }}
        type={col.type}
        name={col.property?.toString()}
        value={x[col.property]?.toString() || ''}
        onChange={(e) => handleInputChange(col, e.target.value, i)}
        {...{ className: isInvalid ? 'outline-red' : undefined }}
      />
    );
  };

  return (
    <table className="text-left w-full md:w-auto">
      <thead>
        <tr>
          <th></th>
          {columns.map((col) => {
            return (
              <th className={col.optional ? 'hidden md:table-cell' : undefined}>{col.title}</th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((x, i) => {
          return (
            <tr className="transition-colors duration-200 hover:bg-purple-200">
              <td className="flex-auto items-center justify-center rounded-l-full">
                <button
                  className="block"
                  onClick={() => (data.length !== 1 ? handleRemoveRow(i) : null)}
                >
                  <IoIosRemoveCircle
                    size={20}
                    className={`${data.length !== 1 ? 'text-red-500' : 'text-gray-500'}`}
                  />
                </button>
              </td>
              {columns.map((col, j) => {
                return (
                  <td
                    className={`${col.optional ? 'hidden md:table-cell' : null} ${
                      j === columns.length - 1 && 'rounded-r-full'
                    }`}
                  >
                    {renderField(col, x, i)}
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
