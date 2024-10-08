import React, { useEffect, useState } from 'react';
import { NavItem } from '../../constants/dataConstants';
import '../../Styles/MobileNav.css';
import '../../Styles/GlassDropdown.css';
import { Link } from 'react-router-dom';

  
interface MobileNavItemProps {
    isOpen: boolean;
    navName?: string;
    navSubItems?: NavItem[];
    navHref?: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export const MobileNavItem: React.FC<MobileNavItemProps & React.HTMLProps<HTMLDivElement>> = ({
    isOpen,
    navHref, 
    navName, 
    navSubItems,
    setIsOpen,
}) => { 
    const [isSubOpen, setIsSubOpen] = useState<boolean>(false);

    // styling concerns:
    const firstLIID = !navSubItems ? 'mobile-li-no-subs' : '';
    const hasSubItems = navSubItems ? 'has-mobile-sub-items' : '';

    const handleClick = () => {
        setIsSubOpen(!isSubOpen)
        if (!navSubItems) {
            setIsOpen(!isOpen)
        }
    }
    
    return (
        <li id={firstLIID} key={firstLIID} className='mobile-li' onClick={handleClick}>
            <Link className='mobile-a modern-link' to={navHref ? navHref : ''}>
                <span id={hasSubItems} className='bracket'>[ </span>
                <span id={hasSubItems} className='bracket-text'>{navName}</span>
            </Link>
            {navSubItems && isSubOpen && navSubItems.map((sn, k) => 
                <ul className='flexcolumn'>
                    <li id='mobile-sub-item' className='mobile-li sub bracket-wrapper' onClick={() => setIsOpen(!isOpen)}>
                        <Link className='modern-link mobile-sub' to={sn.href!}>
                            <span className='bracket'>- </span>
                            <span className='bracket-text'>{sn.name}</span>
                        </Link>
                    </li>
                </ul>
            )}
        </li>
    ); 
} 