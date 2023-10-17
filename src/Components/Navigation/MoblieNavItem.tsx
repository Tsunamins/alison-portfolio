import React, { useEffect, useState } from 'react';
import { MainNavItems, NavItem } from '../../dataConstants';
import '../../Styles/MobileNav.css';
import { Link } from 'react-router-dom';

  

type MobileNavItemProps = {

    navName?: string;
    navSubItems?: NavItem[];
    navHref?: string;

}


export const MobileNavItem: React.FC<MobileNavItemProps & React.HTMLProps<HTMLDivElement>> = ({
    navHref, navName, navSubItems, ...htmlProps}) => { 
    const [isSubOpen, setIsSubOpen] = useState<boolean>(false);

    useEffect(() => {

    }, [])
    
    return (
        <li className='mobile-li' onClick={() => setIsSubOpen(!isSubOpen)}>
            {/* <Link id='main-name' className='modern-link' to={i.href ? i.href  : ''}>{i.name}</Link> */}
            <Link className='mobile-a modern-link' to={navHref ? navHref : ''}>
                <span className='bracket'>[</span>
                <span className='bracket-text'>{navName}</span>
            </Link>
            {navSubItems && isSubOpen && navSubItems.map((sn, k) => 
                <ul className={`flexcolumn`} >
                    <li className='mobile-li sub'>
                        <span className='bracket'>- </span>
                        <span className='bracket-text'>{sn.name}</span>
                    </li>
                </ul>
            )}
        </li>
    ); 
} 