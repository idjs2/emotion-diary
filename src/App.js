import './App.css';
import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.js';
import New from './pages/New.js';
import Edit from './pages/Edit.js';
import Diary from './pages/Diary.js';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it);
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


// dummy 데이터
const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date : 1768529158177
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date : 1768529158178,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date : 1768529158179,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date : 1768529158180,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date : 1768529158181,
  },
  {
    id: 6,
    emotion: 2,
    content: "오늘의 일기 6번",
    date : 1778529158181,
  },
]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  console.log(new Date().getTime());

  const dataId = useRef(0);
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE", data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      }
    })
  }


  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
