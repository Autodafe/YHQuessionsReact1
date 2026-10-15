import NotFound from "./NotFound/NotFound";
import Pagination from "./Pagination/Pagination";
import QuestionItem from "./QuestionItem";
import Skeleton from "./Skeleton/Skeleton";


const QuestionList = ({data,loading,error,setIsOpenCriteria,totalPages,currentPageNum,handleNextPage,handlePreviousPage,resetAllFilters,handleParamsChange}) => {


    return (
       
        <section className="questionList">
            <div className="questionList__title-wrapper">
                <h1 className="questionList__title">Вопросы React, JavaScript</h1>
                <div onClick={()=>setIsOpenCriteria(prev=> !prev)} className="questionList__criteria-open-button"></div>
            </div>

            {loading ? 
            <Skeleton count={10} type="item" />
            : error ? 
             <p>Произошла ошибка при загрузке: {error.message}</p>
            : data?.length > 0 ? (
                
                 <ul className="questionList__list">
                {data.map(item=> (
                    <QuestionItem key={item.id} id={item.id} title={item.title} description={item.description}  complexity={item.complexity} rate={item.rate} />
                ))}
            </ul> 
            ) : 
             
             <NotFound resetAllFilters={resetAllFilters} />
            }

           {
           totalPages > 1 &&
            <Pagination 
            totalPages={totalPages}
            currentPageNum={currentPageNum}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          
            handleParamsChange={handleParamsChange}
            
            />
            }
            
            
        </section>
    );
};

export default QuestionList;
