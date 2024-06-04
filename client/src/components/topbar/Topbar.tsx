import React, { useState } from 'react';
import './Topbar.scss';

interface TopBarProps {
    onSelectSyllabus: (syllabus: string) => void;
}

const Topbar: React.FC<TopBarProps> = ({ onSelectSyllabus }) => {
    const [selectedSyllabus, setSelectedSyllabus] = useState<string>('ICSE');

    const syllabusOptions: string[] = ['ICSE', 'CBSE', 'STATE'];

    const handleSelectSyllabus = (syllabus: string) => {
        setSelectedSyllabus(syllabus);
        console.log('Selected syllabus:', syllabus);
        onSelectSyllabus(syllabus); // Call the prop function when syllabus is selected
    };

    return (
        
       <div className="container">

                {syllabusOptions.map((syllabus, index) => (
                    <div
                        key={index}

                        className={`topbar__menu-item ${selectedSyllabus === syllabus ? 'selected' : ''}`}
                        onClick={() => handleSelectSyllabus(syllabus)}
                    >
                        {syllabus}
                    </div>
                ))}
           
       </div>
        
    );
};

export default Topbar;
