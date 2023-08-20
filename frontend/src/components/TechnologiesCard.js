import './TechnologiesCard.css';

const TechnologiesCard = () => {
    return (
        <>
            <div class="technologies-container">
                <div class="technologies-images">
                    <div class="render-box">
                        <img class="render-img" src="./assets/render.png" alt=""></img>
                    </div>
                    <div class="express-box">
                        <img src="./assets/express.png" alt=""></img>
                    </div>
                    <div class="python-box">
                        <img src="./assets/python.png" alt=""></img>
                    </div>
                    <div class="vercel-box">
                        <img src="./assets/vercel.png" alt=""></img>
                    </div>
                    <div class="react-box">
                        <img src="./assets/react.png" alt=""></img>
                    </div>
                </div>
                <p class="technologies-text">Technologies</p>
            </div>

        </>
    )
}

export default TechnologiesCard