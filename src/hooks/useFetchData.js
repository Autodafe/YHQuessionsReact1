import axios from "axios";
import { useEffect,  useState } from "react"
import { DIFFICULTY_RANGES } from "../constants/constants";
import { useDebounce } from "./useDebounce";
import { useSearchParams } from "react-router-dom";

// DIFFICULTY_RANGES


export const useFetchData = (apiUrl) => {
    

    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);





    

  


    //Search Params
    const [searchParams, setSearchParams] = useSearchParams();

    //Текущая страиница
    const currentPageNum = Number(searchParams.get('page') || 1);
    //Специализации
    const specialization = searchParams.get('specialization') || '';

    //Скиллы
    const searchSkills = searchParams.get('skills');
    const skills = searchSkills ? searchSkills.split(",").map(Number) : [];

    //Уровень сложности
    const searchRanges = searchParams.get('ranges');
    const ranges = searchRanges ? searchRanges.split(",") : [];

    //Рейтинг
    const searchRates = searchParams.get('rates');
    const rates = searchRates ? searchRates.split(",").map(Number) : [];

    //Тайлт инпута
    const inputText = searchParams.get('title') || '';


     // Стейт для поиска тайтла в инпуте 
    const [inputTitle, setInputTitle] = useState(inputText);





  

  

     



    //Функция замены параметров Search Params 'параметр', значение
    const handleParamsChange = (paramOrObject, value) => {
    setSearchParams((prevSearchParams) => {
        const newParams = new URLSearchParams(prevSearchParams);

        if (typeof paramOrObject === 'object' && paramOrObject !== null) {
            Object.entries(paramOrObject).forEach(([key, val]) => {
                newParams.set(key, val);
            });
        } else {
            newParams.set(paramOrObject, value);
        }

        return newParams;
    });
};

 
 // Функция для обработки клика по кнопкам диапазонов (Уровень сложности)
        const handleRangeClick = (rangeId) => {

        const currentRanges = ranges;
        let updatedRanges;

        if(currentRanges.includes(rangeId)) {
          updatedRanges = currentRanges.filter((item) => item !== rangeId);
        } else {
          updatedRanges = [...currentRanges,rangeId];
        }

        handleParamsChange({'page': 1,'ranges':updatedRanges.join(",")});

    };


 


  //  Функция для обработки клика по кнопке Рейтигна
    const handleRateClick = (rate) => {
      
        const currentRates = rates;
        let updatedRates;


        if(currentRates.includes(rate)) {
          updatedRates = currentRates.filter((item) => item !== rate);
        } else {
          updatedRates = [...currentRates,rate]
        }

        handleParamsChange({'page': 1,'rates':updatedRates.join(",")});
  };

 



   //  Функция для обработки клика по кнопке скилла
    const handleSkillsClick  = (id) => {

        const currentSkills = skills;
        let updatedSkills;
        
        if(currentSkills.includes(id)) {
          updatedSkills = currentSkills.filter((item) => item !== id);
        } else {
          updatedSkills = [...currentSkills,id]
        }
        handleParamsChange({'page': 1,'skills':updatedSkills.join(",")});
    };

 

  //  Функция для обработки клика по кнопке специализации
    const handleSpecializationsClick = (slug) => {
 
        if(specialization === slug) {
          handleParamsChange({'page': 1,'specialization':''});
        } else {
          handleParamsChange({'page': 1,'specialization':slug});
        }    
  };

  //Обработка инпута и дебаунс
  const debouncedInputTitle = useDebounce(inputTitle,1000); 

  useEffect(()=> {   

     if (debouncedInputTitle === inputText) {
        return; 
      }
    

      handleParamsChange({'page': 1,'title':debouncedInputTitle});
  },[debouncedInputTitle]);



  //Reset all filters
  const resetAllFilters = () => {

    setInputTitle('');

    handleParamsChange(
      {
        'page': 1,
        'skills':[],
        'specialization':'',
        'rates': [],
        'ranges': [],
        'title': '',
      }
    );
  }


   
// ------------------------------------------
    useEffect(() => {

        const abortController = new AbortController();

        const fetchData = async () => {

             const difficultyParams = [];
            DIFFICULTY_RANGES.forEach((range) => {
                if (ranges.includes(range.id)) {
                for (let i = range.min; i <= range.max; i++) {
                     difficultyParams.push(i);
                }
            }
         });



            setLoading(true);
            setError(null);
            try {
                
                const response = await axios.get(apiUrl , {

                    signal: abortController.signal,

                    params:{
                        page: currentPageNum,
                        rate: rates,
                        complexity:difficultyParams,
                        title: inputText,
                        specializationSlug: specialization,
                        skills: skills
                        
                       
                    }
                });
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


    },[apiUrl,searchParams])

    return {data,loading,error,currentPageNum,handleRateClick,
        rates,handleRangeClick,ranges,skills,
        handleSkillsClick,specialization,handleSpecializationsClick,resetAllFilters,inputTitle,setInputTitle,handleParamsChange
    }
}