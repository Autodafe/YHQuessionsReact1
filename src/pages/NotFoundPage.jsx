import { Link } from "react-router-dom";


const NotFoundPage = () => {
    return (
        <div>
            <h2>Ничего не найдено, возможно такой страницы не существует - вернитесь на главную</h2>
            <Link to="/">На Главную</Link>
            
        </div>
    );
};

export default NotFoundPage;
