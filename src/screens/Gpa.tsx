import React, { useState, useEffect } from 'react';
import DynamicFormTable from '../components/DynamicFormTable/DynamicFormTable';
import Button from '../components/Button';

const storageItem = 'gpa';

interface GpaCourseData {
  grade: 'HD' | 'D' | 'C' | 'P' | 'UP' | 'F';
  units: number;
  courseCode?: string;
}

const GPA = () => {
  const [courseData, setCourseData] = useState<GpaCourseData[]>([{ grade: 'C', units: 10 }]);

  const [gpa, setGpa] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedGPA = localStorage.getItem(storageItem);
    if (savedGPA) {
      setCourseData(JSON.parse(savedGPA));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageItem, JSON.stringify(courseData));
    calculateGPA();
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
    if (error) return;
    let totalMark = 0;
    let totalUnits = 0;
    courseData.forEach((course) => {
      let grade = grades[course.grade];
      let units = course.units;
      totalMark += grade * units;
      totalUnits += units;
    });
    let calcGpa = Math.round((totalMark * 10) / totalUnits) / 10;
    setGpa(calcGpa);
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center mb-20 h-full">
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
            options: ['HD', 'D', 'C', 'P', 'UP', 'F'],
          },
          { title: 'Units', default: 10, property: 'units', type: 'number' },
        ]}
        onChange={(data) => {
          setCourseData(data);
        }}
        isValid={(isValid) => setError(!isValid)}
      />
      {error ? (
        <p className="text-red-500">Please check that all required fields are not blank.</p>
      ) : (
        <p>
          Calculated GPA: <span className="font-bold">{gpa}</span>
        </p>
      )}
      <div className="flex flex-col md:flex-row gap-5 mt-10 w-full px-8 justify-center">
        <Button onClick={() => calculateGPA()}>Calculate GPA</Button>
        <Button
          onClick={() => {
            setCourseData([{ grade: 'C', units: 10 }]);
            setError(false);
          }}
          color="secondary"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default GPA;
