
import styles from "./styles.module.css"

const Pagination = ({totalPages,currentPageNum,handleNextPage,handlePreviousPage,handleParamsChange}) => {

    const getPageNumbers = () => {
    const pages = [];
    const range = 2; 

    for (let i = 1; i <= totalPages; i++) {
      // Всегда показываем первую и последнюю страницу
      if (i === 1 || i === totalPages) {
        pages.push(i);
      }
      // Показываем страницы вокруг текущей в пределах диапазона (range)
      else if (i >= currentPageNum - range && i <= currentPageNum + range) {
        pages.push(i);
      }
      // Добавляем троеточие, если есть разрыв
      else if (i === currentPageNum - range - 1 || i === currentPageNum + range + 1) {
        pages.push("...");
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

    return (
        <div className={styles.pagination}>

            <button onClick={handlePreviousPage} className={styles.arrow} disabled={currentPageNum === 1}>{'<'}</button>

            <div className={styles.list}>

                {pageNumbers.map((page, index) => {
                        if (page === "...") {
                        return (
                        <span key={`dots-${index}`} className={styles.dots}>
                                ...
                        </span>
                         );
                        }

                        return (
                            <button
                                onClick={() => handleParamsChange('page',page)}
                                className={`${styles.pageNumber} ${currentPageNum === page ? styles.pageNumberActive : ""}`}
                                key={page}
                                disabled={page === currentPageNum}
                            >
                             {page}
                            </button>
                        );
                })}

                
            </div>


            <button onClick={handleNextPage} className={styles.arrow} disabled={currentPageNum >= totalPages}>{'>'}</button>
        </div>
    );
};

export default Pagination;