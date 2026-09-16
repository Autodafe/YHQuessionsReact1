
import styles from "./styles.module.css"

const Pagination = ({totalPages,pageNum,handleNextPage,handlePreviousPage,handlePageClick}) => {

    const getPageNumbers = () => {
    const pages = [];
    const range = 2; 

    for (let i = 1; i <= totalPages; i++) {
      // Всегда показываем первую и последнюю страницу
      if (i === 1 || i === totalPages) {
        pages.push(i);
      }
      // Показываем страницы вокруг текущей в пределах диапазона (range)
      else if (i >= pageNum - range && i <= pageNum + range) {
        pages.push(i);
      }
      // Добавляем троеточие, если есть разрыв
      else if (i === pageNum - range - 1 || i === pageNum + range + 1) {
        pages.push("...");
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

    return (
        <div className={styles.pagination}>

            <button onClick={handlePreviousPage} className={styles.arrow} disabled={pageNum === 1}>{'<'}</button>

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
                                onClick={() => handlePageClick(page)}
                                className={`${styles.pageNumber} ${pageNum === page ? styles.pageNumberActive : ""}`}
                                key={page}
                                disabled={page === pageNum}
                            >
                             {page}
                            </button>
                        );
                })}

                
            </div>


            <button onClick={handleNextPage} className={styles.arrow} disabled={pageNum >= totalPages}>{'>'}</button>
        </div>
    );
};

export default Pagination;