import React from 'react';
import '../Styles/Connect.css';
import '../Styles/Resume.css';



  

type ConnectProps = {
    text?: string;
}

export const Connect: React.FC<ConnectProps & React.HTMLProps<HTMLDivElement>> = () => { 

    const onDownload = () => {
        const pdfUrl = "aReillyDownload.pdf";
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "aReillyDownload.pdf"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div id='Connect'>
            <h1 className='connect-header'>Connect via Email, LinkedIn or GitHub.</h1>
            <div className='connect-links'>
                <a className='modern-link email' href='mailto:reillyamr@gmail.com' target="_blank"><img src="EmailIcon.png" /></a>
                <a className='modern-link linkedin' href='https://www.linkedin.com/in/alisonreilly/' target="_blank"><img src="In-White-96.png" /></a>
                <a className='modern-link github' href='https://github.com/Tsunamins' target="_blank"><img src="github-mark-white.svg" /></a>
                <div className='download' role='button' onClick={onDownload}><img src="TempDownloadIcon.png"/></div>
            </div>
        </div>
    ); 
} 