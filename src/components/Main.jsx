import {   useState } from "react";
import CriteriaPanel from "./CriteriaPanel";
import QuestionList from "./QuestionList";
import { useFetchData } from "../hooks/useFetchData";
import { API_URL } from "../constants/constants";



const Main = () => {
    const [isOpenCriteria,setIsOpenCriteria] = useState(false);
    
    const {data,loading,error,pageNum,setPageNum,handleRateClick,selectedRates,handleRangeClick,selectedRanges,selectSkills,handleSkillsClick,selectSpecializations,handleSpecializationsClick,resetAllFilters,inputTitle,setInputTitle} = useFetchData(API_URL);


    const totalPages = data?.total && data?.limit ? Math.ceil(data.total / data.limit) : 1;
    
    
    
   
   
    const handleNextPage = () => {
        if(pageNum < totalPages) {
            setPageNum(prev => prev + 1)
        }
    }

    const handlePreviousPage = () => {
        if(pageNum > 1) {
            setPageNum(prev => prev - 1)
        }
    }

    const handlePageClick = (nubmerOfCurrentPage) => {
            setPageNum(nubmerOfCurrentPage)
    }
   

    return (
        <main className="main">

            <QuestionList 
            data={data.data} 
            loading={loading} 
            error={error}   
            setIsOpenCriteria={setIsOpenCriteria} 
            totalPages={totalPages} 
            pageNum={pageNum}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            handlePageClick={handlePageClick}
            resetAllFilters={resetAllFilters}
            />
            
            
            <CriteriaPanel 
            isOpenCriteria={isOpenCriteria} 
            setIsOpenCriteria={setIsOpenCriteria} 
            selectedRates={selectedRates} 
            handleRateClick={handleRateClick} 
            selectedRanges={selectedRanges}
            handleRangeClick= {handleRangeClick}
            selectSkills={selectSkills}
            handleSkillsClick={handleSkillsClick}
            selectSpecializations={selectSpecializations}
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
