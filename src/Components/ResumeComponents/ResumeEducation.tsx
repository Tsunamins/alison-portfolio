import React from 'react';
// import { ProfileHeader } from '../Components/ProfileHeader';
// import { NavBar } from '../Components/Navigation/NavBar';
import '../../Styles/Resume.css';
import { Education } from '../../constants/dataConstants';
// import { MobileNav } from '../Components/Navigation/MobileNavUL';
  

interface EduProps {
    text?: string;
}

export const ResumeEducation: React.FC<EduProps & React.HTMLProps<HTMLDivElement>> = () => { 
    return (
        <div id='Experience'>
            {Education.map((r, i) => 
                <div className='entry' key={`resume-edu-${i}`}>
                    <div className='org-details'>
                        <div className='single-line job-title left'>{r.title}</div>
                        <div className='org single-line company'>{r.organization}</div>
                    </div>
                    <div className='supplementary'>
                        <div className='single-line date left'>{r.date}</div>
                        <div className='single-line location'>{r.location}</div>
                    </div>
                    <div className='desc-summary-edu'>{r.description}</div>       
                    <ul className='bullets experience-details whole-grid'>{r.achieved && r.achieved.map((a, i) => 
                        <li key={`resume-details-edu-${i}`}>{a}</li>
                    )}
                    </ul>
                    
                    <ul className='skills whole-grid'>{r.skills && r.skills.map((s, i) => 
                        <li key={`resume-skills-edu-${i}`} className='each-skill single-line'>{s}</li>
                    )}
                    </ul>
                </div>
            )}
        </div>
    ); 
} 