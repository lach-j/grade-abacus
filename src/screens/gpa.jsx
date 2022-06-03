import React, { useState, useEffect } from 'react';
import DynamicFormTable from '../components/dynamicFormTable/dynamicFormTable';

const storageItem = 'gpa';

const GPA = () => {
  const [courseData, setCourseData] = useState([{ grade: 'C', units: '10' }]);

  const [gpa, setGpa] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedGPA = localStorage.getItem(storageItem);
    if (savedGPA) {
      setCourseData(JSON.parse(savedGPA));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageItem, JSON.stringify(courseData));
  }, [courseData]);

  const grades = {
    HD: 7,
    D: 6,
    C: 5,
    P: 4,
    UP: 4,
    F: 0,
  };

  const calculateGPA = () => {
    let totalMark = 0;
    let totalUnits = 0;
    let localError = false;
    courseData.forEach((course) => {
      if (course.grade === '' || course.units === '') {
        localError = true;
        return;
      }
      let grade = parseFloat(grades[course.grade]);
      let units = parseInt(course.units);
      totalMark += grade * units;
      totalUnits += units;
    });
    if (localError) {
      setError(true);
      return;
    }
    let calcGpa = Math.round((totalMark * 10) / totalUnits) / 10;
    setError(false);
    setGpa(calcGpa);
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center mt-24 mb-20">
      <h1 className="text-2xl mb-5">GPA Calculator</h1>
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
          {
            title: 'Grade',
            default: 'C',
            property: 'grade',
            type: 'select',
            options: Object.keys(grades),
          },
          { title: 'Units', default: 10, property: 'units', type: 'number' },
        ]}
        onChange={(data) => setCourseData(data)}
      />
      <div className="flex flex-col md:flex-row gap-5 mb-10 w-full px-8 justify-center">
        <button
          className="py-2 px-5 rounded-full text-white hover:opacity-70 transition-opacity bg-purple-500"
          onClick={() => calculateGPA()}
        >
          Calculate GPA
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
      </div>
      {gpa && !error && (
        <p>
          Calculated GPA: <span className="font-bold">{gpa}</span>
        </p>
      )}
      {error && (
        <p className="text-red-500">Please check that all required fields are not blank.</p>
      )}
    </div>
  );
};

export default GPA;
