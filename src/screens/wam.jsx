import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import DynamicFormTable from '../components/dynamicFormTable/dynamicFormTable';

const WAM = () => {
  const [courseData, setCourseData] = useState([{ mark: '0', units: '10', level: '1000' }]);
  const [cookies, setCookie] = useCookies(['wam']);

  const [wam, setWam] = useState(null);
  const [error, setError] = useState(false);

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
    let localError = false;
    courseData.forEach((course) => {
      if (course.level === '' || course.mark === '' || course.units === '') {
        localError = true;
        return;
      }
      let mark = parseFloat(course.mark);
      mark = mark <= 44 ? 44 : mark;
      let weight = weightings[course.level];
      let units = parseInt(course.units);
      totalMark += mark * weight * units;
      totalWeight += weight * units;
    });
    if (localError) {
      setError(true);
      return;
    }
    let calcWam = Math.round((totalMark * 10) / totalWeight) / 10;
    setError(false);
    setWam(calcWam);
  };

  useEffect(() => {
    if (cookies.wam) {
      setCourseData(cookies.wam);
    }
  }, []);

  return (
    <div className="flex flex-col gap-5 justify-center items-center mt-24 mb-20">
      <h1 className="text-2xl mb-5">WAM Calculator</h1>
      <DynamicFormTable
        data={courseData}
        columns={[
          {
            placeholder: 'optional',
            title: 'Course Code',
            optional: true,
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
      <div className="flex flex-col md:flex-row gap-5 mb-10 w-full px-8 justify-center">
        <button
          className="py-2 px-5 rounded-full text-white hover:opacity-70 transition-opacity bg-purple-500"
          onClick={() => calculateWAM()}
        >
          Calculate WAM
        </button>
        <button
          className="py-2 px-5 rounded-full text-white hover:opacity-70 transition-opacity bg-red-500"
          onClick={() => {
            setCourseData([{ mark: '0', units: '10', level: '1000' }]);
            setError(false);
          }}
        >
          Clear
        </button>
        <button
          className={`py-2 px-5 rounded-full text-white hover:opacity-70 transition-opacity bg-green-500`}
          onClick={() => {
            setCookie('wam', courseData, { path: '/' });
            alert('Your marks have been saved!');
          }}
        >
          Save
        </button>
      </div>
      {wam && !error && (
        <p>
          Calculated WAM: <span className="font-bold">{wam}</span>
        </p>
      )}
      {error && (
        <p className="text-red-500">Please check that all required fields are not blank.</p>
      )}
    </div>
  );
};

export default WAM;
