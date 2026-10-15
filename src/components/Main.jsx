import {   useState } from "react";
import CriteriaPanel from "./CriteriaPanel";
import QuestionList from "./QuestionList";
import { useFetchData } from "../hooks/useFetchData";
import { API_URL } from "../constants/constants";



const Main = () => {
    const [isOpenCriteria,setIsOpenCriteria] = useState(false);
    
    const {data,loading,error,currentPageNum,handleRateClick,rates,
        handleRangeClick,ranges,skills,handleSkillsClick,specialization,
        handleSpecializationsClick,resetAllFilters,inputTitle,setInputTitle,handleParamsChange} = useFetchData(API_URL);


    const totalPages = data?.total && data?.limit ? Math.ceil(data.total / data.limit) : 1;
    
    
    
   
   
    const handleNextPage = () => {
        if(currentPageNum < totalPages) {
            handleParamsChange('page',currentPageNum + 1)
        }
    }

    const handlePreviousPage = () => {
        if(currentPageNum > 1) {
            handleParamsChange('page',currentPageNum - 1)
        }
    }

   

    return (
        <main className="main">

            <QuestionList 
            data={data.data} 
            loading={loading} 
            error={error}   
            setIsOpenCriteria={setIsOpenCriteria} 
            totalPages={totalPages} 
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            resetAllFilters={resetAllFilters}
            currentPageNum={currentPageNum}
            handleParamsChange={handleParamsChange}
            />
            
            
            <CriteriaPanel 
            isOpenCriteria={isOpenCriteria} 
            setIsOpenCriteria={setIsOpenCriteria} 
            rates={rates} 
            handleRateClick={handleRateClick} 
            ranges={ranges}
            handleRangeClick= {handleRangeClick}
            skills={skills}
            handleSkillsClick={handleSkillsClick}
            specialization={specialization}
            handleSpecializationsClick={handleSpecializationsClick}
            inputTitle={inputTitle}
            setInputTitle={setInputTitle}
            
            />
            
            {/* Технический консоль лог для подсмотра данных */}
            {/* {loading ? console.log('Грузится в Main.js') : console.log(data)} */}
            

        </main>
        
    );
};

export default Main;
