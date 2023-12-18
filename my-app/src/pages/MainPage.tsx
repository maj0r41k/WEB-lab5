import './MainPage.css'
import Main from "../components/Main";


const MainPage = () => {

    return (
        <Main>
            <h1 className="main-page-heading">{process.env.REACT_APP_NAME}</h1>
            <p className="main-page-greeting">Hello!</p>
            <p className="main-page-greeting">Let`s go started!</p>
        </Main>


    );
};

export default MainPage;