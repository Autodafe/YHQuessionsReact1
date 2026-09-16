import RangeList from "./RangeList";
import Rating from "./Rating";
import Search from "./Search";
import Skills from "./Skills";
import Specializations from "./Specializations";


const CriteriaPanel = ({isOpenCriteria,setIsOpenCriteria,handleRateClick,selectedRates,handleRangeClick,selectedRanges,selectSkills,handleSkillsClick,selectSpecializations,handleSpecializationsClick,inputTitle,setInputTitle}) => {
    return (
        <aside className={`criteriaPanel ${isOpenCriteria? 'open' : ''}`} >
            <button onClick={()=> setIsOpenCriteria(prev => !prev)} type="button" className="criteriaPanel__close-button"></button>
            
            
            <Search inputTitle={inputTitle} setInputTitle={setInputTitle} />
            
            {/* specializations */}

             <Specializations 
             selectSpecializations={selectSpecializations}
             handleSpecializationsClick={handleSpecializationsClick}
             />
            
            {/* skills */}

            <Skills 
            selectSkills={selectSkills}
            handleSkillsClick={handleSkillsClick}
             />

           
               
            <RangeList 
            selectedRanges={selectedRanges}
            handleRangeClick= {handleRangeClick} 
            />

         
            
            <Rating selectedRates={selectedRates} handleRateClick={handleRateClick} />




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
