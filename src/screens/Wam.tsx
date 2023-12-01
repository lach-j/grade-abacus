import React, { useState, useEffect } from 'react';
import DynamicFormTable from '../components/DynamicFormTable/DynamicFormTable';
import { download } from '../util/download-helper';
import FileUploadButton from '../components/FileUploadButton';
import { formattedDateTime } from '../util/date-helper';
import Button from '../components/Button';
import { IoMdDownload } from 'react-icons/io';

const storageItem = 'wam';

interface CourseInfo {
  mark: number;
  units: number;
  level: 1000 | 2000 | 3000 | 4000 | 5000 | 6000;
  courseCode?: string;
}

const WAM = () => {
  const [courseData, setCourseData] = useState<CourseInfo[]>([{ mark: 0, units: 10, level: 1000 }]);

  const [wam, setWam] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedWam = localStorage.getItem(storageItem);
    if (savedWam) {
      setCourseData(JSON.parse(savedWam));
    }
  }, []);

  useEffect(() => {
    if (error) return;
    localStorage.setItem(storageItem, JSON.stringify(courseData));
    calculateWAM();
  }, [courseData, error]);

  const weightings = {
    1000: 1,
    2000: 2,
    3000: 3,
    4000: 4,
    5000: 4,
    6000: 4,
  };

  const downloadData = () => {
    download(courseData, `wam-data_${formattedDateTime()}.json`);
  };

  const isValidCourseInfo = (obj: any): obj is CourseInfo => {
    if (typeof obj !== 'object' || obj === null) return false;
    if (typeof obj.mark !== 'number') return false;
    if (typeof obj.units !== 'number') return false;
    if (![1000, 2000, 3000, 4000, 5000, 6000].includes(obj.level)) return false;
    if (obj.courseCode !== undefined && typeof obj.courseCode !== 'string') return false;

    return true;
  };

  const uploadFile = (file?: File) => {
    if (!file || file.type !== 'application/json') {
      alert('File could not be read - invalid type');
      return;
    }
    const fr = new FileReader();
    fr.onload = (e) => {
      if (e.target?.readyState != 2) return;
      if (e.target?.error) {
        alert('Error while reading file - read error');
        return;
      }

      if (!e.target.result) return;

      const data = JSON.parse(e.target.result.toString());
      if (!Array.isArray(data)) {
        alert('Error while reading file - non array');
        return;
      }

      if (data.some((x) => !isValidCourseInfo(x))) {
        alert('Error while reading file - invalid obj');
        return;
      }

      setCourseData(data);
    };

    fr.readAsText(file);
  };

  const calculateWAM = () => {
    if (error) return;
    let totalMark = 0;
    let totalWeight = 0;
    courseData.forEach((course) => {
      let mark = course.mark;
      mark = mark <= 44 ? 44 : mark;
      let weight = weightings[course.level];
      let units = course.units;
      totalMark += mark * weight * units;
      totalWeight += weight * units;
    });
    let calcWam = Math.round((totalMark * 10) / totalWeight) / 10;
    setWam(calcWam);
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
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
            default: '',
          },
          { title: 'Mark', default: 0, min: 0, max: 100, property: 'mark', type: 'number' },
          { title: 'Units', default: 10, min: 0, property: 'units', type: 'number' },
          {
            title: 'Level',
            default: 1000,
            property: 'level',
            type: 'select',
            options: [1000, 2000, 3000, 4000, 5000, 6000],
            optional: false,
          },
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
          Calculated WAM: <span className="font-bold">{wam}</span>
        </p>
      )}
      <div className="flex flex-col md:flex-row gap-5 mt-10 w-full px-8 justify-center">
        <Button onClick={() => downloadData()} icon={<IoMdDownload />}>
          Download
        </Button>
        <FileUploadButton accept={['.json']} onChange={(files) => uploadFile(files?.[0])}>
          Upload Marks
        </FileUploadButton>
        <Button
          onClick={() => {
            setCourseData([{ mark: 0, units: 10, level: 1000 }]);
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

export default WAM;
