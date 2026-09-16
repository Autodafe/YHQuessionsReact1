import axios from "axios";
import { useEffect, useState } from "react"
import { DIFFICULTY_RANGES } from "../constants/constants";
import { useDebounce } from "./useDebounce";

// DIFFICULTY_RANGES


export const useFetchData = (apiUrl) => {
    

    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [pageNum,setPageNum] = useState(1);
    // Хранение рейтинга
    const [selectedRates, setSelectedRates] = useState([]);
    // Стейт для кнопок-диапазонов 
    const [selectedRanges, setSelectedRanges] = useState([]);
    // Стейт для кнопок-навыков
    const [selectSkills, setSelectSkills] = useState([]);
    // Стейт для кнопок-специализаций
    const [selectSpecializations, setSelectSpecializations] = useState(null);
     // Стейт для поиска тайтла в инпуте
    const [inputTitle, setInputTitle] = useState('');

    //  Функция для обработки клика по кнопке сложности
    const handleRateClick = (rate) => {
        setPageNum(1);
        setSelectedRates((prevRates) => {
      if (prevRates.includes(rate)) {
        return prevRates.filter((item) => item !== rate);
      } else {
        return [...prevRates, rate];
      }
    });
  };

  // Функция для обработки клика по кнопкам диапазонов
        const handleRangeClick = (rangeId) => {
        setPageNum(1);
        setSelectedRanges((prev) => 
        prev.includes(rangeId) ? prev.filter((id) => id !== rangeId) : [...prev, rangeId]
        );
    };


     //  Функция для обработки клика по кнопке скилла
    const handleSkillsClick  = (id) => {
        setPageNum(1);
        setSelectSkills((prevRates) => {
      if (prevRates.includes(id)) {
        return prevRates.filter((item) => item !== id);
      } else {
        return [...prevRates, id];
      }
    });
  };

  //  Функция для обработки клика по кнопке специализации
    const handleSpecializationsClick = (slug) => {
        setPageNum(1);

        setSelectSpecializations((prevSpec) => {
      if (prevSpec===slug) {
        return null;
      } else {
        return slug;
      }
    });
  };

  const resetAllFilters = () => {
    setPageNum(1);
    setSelectedRates([]);
    setSelectedRanges([]);
    setSelectSkills([]);
    setSelectSpecializations(null);
    setInputTitle('')
  }


  const debouncedInputTitle = useDebounce(inputTitle,1000);
   
// ------------------------------------------
    useEffect(() => {
        const fetchData = async () => {

             const difficultyParams = [];
            DIFFICULTY_RANGES.forEach((range) => {
                if (selectedRanges.includes(range.id)) {
                for (let i = range.min; i <= range.max; i++) {
                     difficultyParams.push(i);
                }
            }
         });



            setLoading(true);
            setError(null);
            try {
                
                const response = await axios.get(apiUrl , {
                    params:{
                        page: pageNum,
                        rate: selectedRates,
                        complexity:difficultyParams,
                        title: debouncedInputTitle,
                        specializationSlug: selectSpecializations,
                        skills: selectSkills
                        
                       
                    }
                });
                setData(response.data);

                
            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
                
            }
        }
        fetchData();
    },[apiUrl,pageNum,selectedRates,selectedRanges,selectSkills,selectSpecializations,debouncedInputTitle])

    return {data,loading,error,pageNum,setPageNum,handleRateClick,
        selectedRates,handleRangeClick,selectedRanges,selectSkills,
        handleSkillsClick,selectSpecializations,handleSpecializationsClick,resetAllFilters,inputTitle,setInputTitle
    }
}