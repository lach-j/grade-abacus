import React, { useState } from 'react';
import DynamicFormTable from '../components/dynamicFormTable';

const WAM = () => {
  const [courseData, setCourseData] = useState([{ mark: '0', units: '10', level: '1000' }]);
  const [wam, setWam] = useState(null);

  const weightings = {
    1000: 1,
    2000: 2,
    3000: 3,
    4000: 4,
    5000: 4,
    6000: 4,
  };

  const calculateWAM = () => {
    let totalMark = 0;
    let totalWeight = 0;
    courseData.forEach((course) => {
      let mark = parseFloat(course.mark);
      mark = mark <= 44 ? 44 : mark;
      let weight = weightings[course.level];
      let units = parseInt(course.units);
      totalMark += mark * weight * units;
      totalWeight += weight * units;
    });
    let calcWam = Math.round((totalMark * 10) / totalWeight) / 10;
    setWam(calcWam);
  };

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
      <button onClick={() => calculateWAM()}>Calculate WAM</button>
      {wam && <p>Calculated WAM: {wam}</p>}
    </>
  );
};

export default WAM;
