import React, { useEffect, useState } from 'react';
import '../Styles/TextType.css'
  

type TextTypeProps = {
    text?: string;
    typeEffect?: 'typed-out' | 'type-backspace';
    removeCursor?: boolean;
}

export const TextType: React.FC<TextTypeProps & React.HTMLProps<HTMLDivElement>> = ({
    removeCursor, text, typeEffect, ...htmlProps}) => {    
        const [animationClass, setAnimationClass] = useState('typed-out');
        const [_text, setText] = useState(text);



        useEffect(() => {
            if(typeEffect === 'type-backspace'){
                setTimeout(() => {
                    setAnimationClass(typeEffect)
 
            }, 5000)
        }
            if(removeCursor){
                setTimeout(() => {
                    setAnimationClass('')
                    setText('')
 
            }, 8000)
        }
        }, [typeEffect, removeCursor])
    return (
        <>
            <div className="container">
                <div className={animationClass}>{_text}</div>
            </div>
        </>
    ); 
} 