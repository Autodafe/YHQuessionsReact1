import styles from "./styles.module.css"

const NotFound = ({resetAllFilters}) => {
    return (
        <div className={styles.wrapper}>
            <img className={styles.img} src="/images/notFound.png" alt="FileIcon" />
            <p className={styles.title}>К сожалению, по запросу ничего не найдено.</p>
            <p className={styles.subtitle}>Попробуйте изменить запрос или воспользуйтесь нашими категориями.</p>
            <button onClick={resetAllFilters} className={styles.resetButton} type="button">Сбросить фильтр</button>
        </div>
    );
};

export default NotFound;
