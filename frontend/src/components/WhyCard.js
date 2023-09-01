import './WhyCard.css';

const WhyCard = () => {
    return (
        <>
            <div className="why-container">
                <p className="why">Why?</p>
                <p className="why-text">
                    After <span className="colored-word">countless</span> hours of technical interview preparation, we found ourselves
                    <span className="colored-word"> unable to remember</span> specific shortcuts, memorization techniques, and other concepts.
                    As such, we decided to not leave these <span className="colored-word">gaps in our knowledge</span> up to combing through
                    our seemingly endless notes and instead build a <span className="colored-word">personalized assistant </span>
                        tailored for our notes. 
                </p>
            </div>
        </>
    )
}

export default WhyCard

