import './TechnologiesCard.css';

const TechnologiesCard = () => {
    return (
        <>
            <div className="technologies-container">
                <div className="technologies-images">
                    <div className="render-box">
                        <img className="render-img" src="./assets/render.png" alt=""></img>
                    </div>
                    <div className="express-box">
                        <img src="./assets/express.png" alt=""></img>
                    </div>
                    <div className="python-box">
                        <img src="./assets/python.png" alt=""></img>
                    </div>
                    <div className="vercel-box">
                        <img src="./assets/vercel.png" alt=""></img>
                    </div>
                    <div className="react-box">
                        <img src="./assets/react.png" alt=""></img>
                    </div>
                </div>
                <p className="technologies-text">Technologies</p>
            </div>

        </>
    )
}

export default TechnologiesCard