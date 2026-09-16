import { DIFFICULTY_RANGES } from "../constants/constants";


const RangeList = ({handleRangeClick,selectedRanges}) => {
    return (
        <div className="criteriaPanel__hardLvl hardLvl">
                <p className="hardLvl__description">Уровень сложности</p>
                <ul className="hardLvl__list">
                    {DIFFICULTY_RANGES.map((range) => { 
                        const isActive = selectedRanges.includes(range.id);

                        return (
                            <li 
                            key={range.id}
                            tabIndex={0}
                            onClick={()=> handleRangeClick(range.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                handleRangeClick(range.id);
                                }
                            }}
                            className={`hardLvl__item ${isActive ? 'hardLvl__item--active' : ''}`}
                             >
                                {range.id}
                             </li>
                        )
                    })}

                </ul>
            </div>
    );
};

export default RangeList;
