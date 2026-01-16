import { useEffect, useContext, useState } from 'react';
import { DiaryStateContext } from '../App';

import MyHeader from './../components/MyHeader.js';
import MyButton from './../components/MyButton.js';
import DiaryList from './../components/DiaryList.js';

const Home = () => {
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`

    useEffect(() => {
        if (diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),  // 현재 선택된 날짜의 연도
                curDate.getMonth(),  // // 현재 선택된 날짜의 월
                1  // 1일
            ).getTime();  // ms 구하기

            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,  // 선택된 날짜의 다음 달
                0  // 해당 월의 마지막 일
            ).getTime();

            setData(diaryList.filter((it) => firstDay<=it.date && it.date<=lastDay));
        }
    }, [diaryList, curDate]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()));
    }
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()));
    }


    
    return (
        <div>
            <MyHeader
                leftChild={<MyButton text={"<"} onClick={decreaseMonth}/>} 
                headText={headText}
                rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
            />
            <DiaryList diaryList={data} />
        </div>
    );
};

export default Home;