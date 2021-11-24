import React, { useState } from 'react';
import DynamicFormTable from '../components/dynamicFormTable';

const WAM = () => {
  const [courseData, setCourseData] = useState([{ mark: '0', units: '10', level: '1000' }]);
  return (
    <>
      <h1>WAM Calculator</h1>
      <DynamicFormTable
        data={courseData}
        columns={[
          {
            title: 'Course Code',
            property: 'courseCode',
            type: 'text',
          },
          { title: 'Mark', default: '0', property: 'mark', type: 'number' },
          { title: 'Units', default: 10, property: 'units', type: 'number' },
          {
            title: 'Level',
            default: 1000,
            property: 'level',
            type: 'select',
            options: [1000, 2000, 3000, 4000, 5000],
          },
        ]}
        onChange={(data) => setCourseData(data)}
      />
    </>
  );
};

export default WAM;
