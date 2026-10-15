import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton/Skeleton";
import { handleOnKeyDown } from "../helpers/handleOnnKeyDown";


const Skills = ({skills,handleSkillsClick}) => {
    const [isFullSkills,setIsFullSkills] = useState(false);
    const [skillsData,setSkillsData] = useState([])
    const [loadingSkills, setLoadingSkills] = useState(true);
    const [errorSkills,setErrorSkills] = useState(null);

    const handleOpenFull = () => {
        setIsFullSkills(prev => !prev)
    }

    
    useEffect(()=> {
        const fetchSkills = async () => {
            setLoadingSkills(true);
            setErrorSkills(null);
            try {
                const response = await axios.get('https://api.yeatwork.ru/skills', {
                    params:{
                        limit: 100,
                        
                    }
                });
                setSkillsData(response.data.data);

            } catch(err) {
                setErrorSkills(err);
            } finally {
                setLoadingSkills(false);
            }
        }

        fetchSkills();
    },[]);

// !loadingSkills && console.log(skillsData)


    return (
        <div className="criteriaPanel__skills skills">
                <p className="skills__description">Навыки</p>

                {loadingSkills ? 
                    <Skeleton count={5} type="item" />
                    : errorSkills ?
                    <p>Произошла ошибка при загрузке: {errorSkills.message}</p>
                    :
                    <ul className="skills__list">
                        {skillsData.slice(0,isFullSkills ? skillsData.length : 5).map((item) => {
                            const isActive = skills.includes(item.id);
                            return  (
                                <li onClick={()=> handleSkillsClick(item.id)} onKeyDown={(event)=>handleOnKeyDown(event,()=>handleSkillsClick(item.id))} key={item.id}  tabIndex={0} className={`skills__item ${isActive ? 'skills__item--active' : ''}`}>
                                <img src="/images/WireframingSkills.svg" alt="" />
                                <p>{item.title}</p>
                                </li>
                            )
                        })}
                    </ul>
                   
                }
                <p onClick={handleOpenFull} onKeyDown={(event)=>handleOnKeyDown(event,handleOpenFull)} tabIndex={0} className="skills__open-all-specs">{isFullSkills ? 'Скрыть' : 'Посмотреть все'}</p>
            </div>
    );
};

export default Skills;
