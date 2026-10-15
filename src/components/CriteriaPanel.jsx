import RangeList from "./RangeList";
import Rating from "./Rating";
import Search from "./Search";
import Skills from "./Skills";
import Specializations from "./Specializations";


const CriteriaPanel = ({isOpenCriteria,setIsOpenCriteria,handleRateClick,rates,handleRangeClick,ranges,skills,handleSkillsClick,specialization,handleSpecializationsClick,inputTitle,setInputTitle}) => {
    return (
        <aside className={`criteriaPanel ${isOpenCriteria? 'open' : ''}`} >
            <button onClick={()=> setIsOpenCriteria(prev => !prev)} type="button" className="criteriaPanel__close-button"></button>
            
            
            <Search inputTitle={inputTitle} setInputTitle={setInputTitle} />
            
            {/* specializations */}

             <Specializations 
             specialization={specialization}
             handleSpecializationsClick={handleSpecializationsClick}
             />
            
            {/* skills */}

            <Skills 
            skills={skills}
            handleSkillsClick={handleSkillsClick}
             />

           
               
            <RangeList 
            ranges={ranges}
            handleRangeClick= {handleRangeClick} 
            />

         
            
            <Rating rates={rates} handleRateClick={handleRateClick} />




            <div className="criteriaPanel__status status">
                <p className="status__description">Статус</p>
                <ul className="status__list">
                    <li tabIndex={0} className="status__item">
                        Изученные
                    </li>
                    <li tabIndex={0} className="status__item">
                        Не изученные
                    </li>
                    <li tabIndex={0} className="status__item status__item--active">
                        Все
                    </li>
                    
                </ul>
            </div>


            



        </aside>
    );
};

export default CriteriaPanel;
