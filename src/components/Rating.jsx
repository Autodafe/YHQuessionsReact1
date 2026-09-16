

const Rating = ({selectedRates,handleRateClick}) => {
    
    return (
        <div className="criteriaPanel__rating rating">
                <p className="rating__description">Рейтинг</p>
                <ul className="rating__list">
                    {[1,2,3,4,5].map((value) => {
                        const isSelected = selectedRates.includes(value);
                        return  <li key={value} tabIndex={0} onClick={()=>handleRateClick(value)} className={`rating__item ${isSelected? 'rating__item--active' : ''}`}>{value}</li>
                    })}
                    
                </ul>
        </div>
    );
};

export default Rating;
