import './WhyCard.css';

const WhyCard = () => {
    return (
        <>
            <div class="why-container">
                <p class="why">Why?</p>
                <p class="why-text">
                    After <span class="colored-word">countless</span> hours of technical interview preparation, we found ourselves
                    <span class="colored-word">unable to remember</span> specific shortcuts, memorization techniques, and other concepts.
                    As such, we decided to not leave these <span class="colored-word">gaps in our knowledge</span> up to combing through
                    our seemingly endless notes and instead build a <span class="colored-word">personalized assistant</span>
                        tailored for our notes. 
                </p>
            </div>
        </>
    )
}

export default WhyCard

