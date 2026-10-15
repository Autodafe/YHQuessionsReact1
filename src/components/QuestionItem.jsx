import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


const QuestionItem = ({id,title,description,complexity,rate}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState('0px')
    const contentRef = useRef(null);

    useEffect(()=> {
        if(contentRef.current) {
            setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    },[isOpen])

    const toggleAccordion = () => {
        setIsOpen((prev) => !prev);
    }

    return (
        <li className="questionList__item questionItem" >
            <div className="questionItem__title-wrapper" onClick={toggleAccordion}>
                <h2 className="questionItem__title">{title}</h2>
                    <svg 
                        width="16" 
                        height="10" 
                        viewBox="0 0 16 10" 
                        fill="none" 
                        xmlns="http://w3.org"
                         style={{ 
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                          transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)', 
                           flexShrink: 0, 
                          marginLeft: '10px'
                            }}
                            >
                        <path 
                          d="M1.5 1.5L8 8L14.5 1.5" 
                          stroke="#6A0BFF"         
                          strokeWidth="2.0"        
                          strokeLinecap="round"    
                          strokeLinejoin="round"    
                        />
                    </svg>
            </div>

            

            <div
                 style={{
                 maxHeight: height, 
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out',
                }}
            >
                <div className="questionItem__content" ref={contentRef} style={{ paddingTop: '12px', color: '#555', lineHeight: '1.6' }}>
                    
                    <div className="questionItem__topinfo-wrapper">
                        <div className="questionItem__helpers-wrapper">
                            <div className="questionItem__helper"> 
                                <p>Рейтинг:</p>
                                 <span>{rate}</span>
                            </div>
                            <div className="questionItem__helper">
                                <p>Сложность: </p>
                                <span>{complexity}</span>
                            </div>
                        </div>
                        <button type="button" className="kebab-button">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>



                  <p>{description}</p>

                  <div className="questionItem__moreInfo">
                     
                     <Link to={`/question/${id}`} className="questionItem__moreInfoText">Подробнее </Link>
                    </div>
                    
                
                </div>
            </div>


        </li>
    );
};

export default QuestionItem;
