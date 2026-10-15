import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton/Skeleton";
import { handleOnKeyDown } from "../helpers/handleOnnKeyDown";

const Specializations = ({specialization,handleSpecializationsClick}) => {

     const [isFullSpecializations,setIsFullSpecializations] = useState(false);
    const [specializationsData,setSpecializationsData] = useState([])
    const [loadingSpecializations, setLoadingSpecializations] = useState(true);
    const [errorSpecializations,setErrorSpecializations] = useState(null);

    const handleOpenFull = () => {
        setIsFullSpecializations(prev => !prev)
    }

    
    useEffect(()=> {
        const fetchSpecializations = async () => {
            setLoadingSpecializations(true);
            setErrorSpecializations(null);
            try {
                const response = await axios.get('https://api.yeatwork.ru/specializations', {
                    params:{
                        limit: 100,
                        
                    }
                });
                setSpecializationsData(response.data.data);

            } catch(err) {
                setErrorSpecializations(err);
            } finally {
                setLoadingSpecializations(false);
            }
        }

        fetchSpecializations();
    },[]);

    return (
        <div className="criteriaPanel__specializations specializations">
                <p className="specializations__description">Специализация</p>

                {loadingSpecializations ? 
                    <Skeleton count={5} type="item" />
                    : errorSpecializations ?
                    <p>Произошла ошибка при загрузке: {errorSpecializations.message}</p>
                    :
                    <ul className="specializations__list">
                        {specializationsData.slice(0,isFullSpecializations ? specializationsData.length : 5).map((item) => {
                            return  (
                                <li onClick={()=> handleSpecializationsClick(item.slug)} onKeyDown={(event)=>handleOnKeyDown(event,()=>handleSpecializationsClick(item.slug))}  key={item.id}  tabIndex={0} className={`specializations__item ${specialization === item.slug ? 'specializations__item--active' : ''}`}>
                                
                                {item.title}
                                </li>
                            )
                        })}
                    </ul>
                   
                }



                


                <p onClick={handleOpenFull} onKeyDown={(event)=>handleOnKeyDown(event,handleOpenFull)} tabIndex={0} className="specializations__open-all-specs">{isFullSpecializations ? 'Скрыть' : 'Посмотреть все'}</p>
        </div>
    );
};

export default Specializations;
