import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../../components/Skeleton/Skeleton";

const CurrentQuestion = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);

    const [isActive,setIsActive] = useState(false);


    

    const handleGoBack = () => {
        navigate(-1);
    }

    const handleNextQuestion = () => {
        const nextId = Number(id) + 1;
        navigate(`/question/${nextId}`);
    }

    const handlePreviousQuestion = () => {
        const prevId = Number(id) - 1;
        navigate(`/question/${prevId}`);
    }

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try{
                const response = await axios.get(`https://api.yeatwork.ru/questions/public-questions/${id}`, { 
                    signal: abortController.signal
                })
                setData(response.data);
                setLoading(false);
                
               
            } catch(err) {
              if(!axios.isCancel(err)) {
                setError(err);
                setLoading(false);
               
              }
            }

        }
        fetchData();

        return () => {
          abortController.abort();
        }
       
    },[id]);



    return (
        

            
            
        
        <div className={styles.wrapper }>
            <div className={styles.buttonBack} onClick={handleGoBack}> {'<'}Назад</div>
            {loading ? (
            <Skeleton count={10} type="item" />
            ): error ? (
             <p>Произошла ошибка при загрузке: {error.message}</p>
            ): data ? (

           
            <div className={styles.contentWrapper} style={{marginBottom:'130px'}}>
                <div className={`${styles.wrapper} ${styles.flex2}`}>
                    <div className={`${styles.container} ${styles.titleWrapper}`}>
                        <div>
                            <h2>{data.title}</h2>
                            <p>{data.description}</p>
                        </div>
                        <button onClick={()=> setIsActive(prev =>!prev)}></button>
                        
                    </div>
                    <div className={`${styles.container} ${styles.nextBackButtons}`}>
                        <div className={styles.nextButton} onClick={handlePreviousQuestion}>{'<'} Предыдущий</div>
                        <div className={styles.backButton} onClick={handleNextQuestion}>Следущий {'>'}</div>
                    </div>
                    
                   
                    <div className={styles.container}>
                        <h3>Краткий ответ</h3>
                        <div dangerouslySetInnerHTML={{ __html: data?.shortAnswer }} />
                    </div>

                    

                    <div className={styles.container}>
                        <h3>Развернутый ответ</h3>
                       
                        <div dangerouslySetInnerHTML={{ __html: data?.longAnswer }} />
                    </div>
                    
                </div>

                {/* panel */}

                <div className={styles.flex1}>
                    <div className={`${styles.container} ${styles.panelWrapper} ${isActive ? styles.openPanel : ''}`}>
                        <button onClick={()=> setIsActive(prev => !prev)} type="button" className={styles.closeButton}></button>
                        <div>
                            <h3>Уровень:</h3>
                            <div className="questionItem__helpers-wrapper">
                                <div className="questionItem__helper"> 
                                    <p>Рейтинг:</p>
                                    <span>{data.rate}</span>
                                </div>
                                <div className="questionItem__helper">
                                    <p>Сложность: </p>
                                    <span>{data.complexity}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                        <h3>Навыки:</h3>
                        <ul className="skills__list">
                        {data?.questionSkills?.map((item) => {
                            
                            return  (
                                <li  key={item.id}  className={`skills__item  skills__item--active`}>
                                <img src="/images/WireframingSkills.svg" alt="" />
                                <p>{item.title}</p>
                                </li>
                            )
                        })}
                        </ul>
                        </div>

                        <div>
                            <h3>Ключевые слова:</h3>
                            <ul className={styles.keywordList}>
                                {data?.keywords?.map((keyword) => {
                                    return (
                                        <li key={keyword}>#{keyword}</li>
                                    )
                                    
                                })
                                
                            }
                            </ul>

                        </div>

                        <p>Автор: {data?.createdBy?.username} </p>
                        
                        
                        </div>
                    <div className={`${styles.container} ${styles.authorWrapper}`}>
                        <div style={{display:'flex',gap:'8px'}}>
                            <img className={styles.authorImage} src="/images/Ruslan.png" alt="Mentor Avatar" />
                            <div>
                                <p>Руслан Куянец</p>
                                <span>Python Guru</span>
                            </div>
                            
                        </div>
                        <p>Guru – это эксперты YeaHub, которые помогают развивать комьюнити.</p>
                        <ul className={styles.socList}>
                            <li>
                                <img className={styles.socImage} src="/images/TelegramPerp.svg" alt="" />
                            </li>
                            <li>
                                <img className={styles.socImage} src="/images/YoutubePerp.svg" alt="" />
                            </li>
                            <li>
                                <img className={styles.socImage} src="/images/ProfilePerp.svg" alt="" />
                            </li>
                        </ul>
                    </div>
                </div>


                
                
            </div>
              
        
      ): console.log(data)}
      </div>
    );
};

export default CurrentQuestion;
