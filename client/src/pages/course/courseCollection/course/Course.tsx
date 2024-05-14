// Course.tsx
import React, { useState } from 'react';
import './Course.scss'
import ClassList from '../../../../components/course/ClassList'
import Topbar from '../../../../components/topbar/Topbar';
import Navbar from '../../../../components/navbar/Navbar';

const Course: React.FC = () => {
    const [selectedSyllabus, setSelectedSyllabus] = useState<string>('ICSE');

    const handleSelectSyllabus = (syllabus: string) => {
        setSelectedSyllabus(syllabus);
    };

    return (
         <div className='course-page'>
            <div className="navbar">

        <Navbar />
            </div>
            <div className="topbar">

                <Topbar onSelectSyllabus={handleSelectSyllabus} />
            </div>
            <div className='content-wrapper'>
                <ClassList selectedSyllabus={selectedSyllabus} />
            </div>
       </div>
     );
};
export default Course;
