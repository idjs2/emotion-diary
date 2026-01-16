const DiaryItem = ({id, emotion, content, date}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";
    
    return (<div className="DiaryItem">
        <div className='emotion_img_wrapper'>
            <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}/>
        </div>
        <div></div>
        <div></div>
    </div>
    );
};

export default DiaryItem;