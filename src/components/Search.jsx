

const Search = ({inputTitle,setInputTitle}) => {
    return (
        <input 
            value={inputTitle} 
            onChange={(e)=> setInputTitle(e.target.value)} 
            className="criteriaPanel__input" 
            type="text" 
            placeholder="Введите запрос..." 
        />
    );
};

export default Search;
