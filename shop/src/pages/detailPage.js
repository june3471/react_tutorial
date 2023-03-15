import { data } from '../asset/data.js';
import { useEffect, useState, startTransition, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import '../css/Detail.module.css';
import { Nav } from 'react-bootstrap';
import { flushSync } from 'react-dom';

import { UpdateStock } from '../store/stockSlice';

import { Context1 } from './../App';
import { useDispatch } from 'react-redux';

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg === 'blue' ? 'white' : null)};
  padding: 10px;
`;

const DetailPage = () => {
  let a = useContext(Context1);

  let [count, setCount] = useState(0);

  const { id } = useParams();
  let [items] = useState(data);
  let item = items.filter((x) => x.id === Number(id))[0];
  let [alertShow, setAlertShow] = useState(true);
  let [text, setText] = useState('');
  let [numberWarning, setNumberWarning] = useState(false);
  let [tabIndex, setTabIndex] = useState(0);
  let [initAnimation, setInitAnimation] = useState('');

  let dispatch = useDispatch();

  useEffect(() => {
    SetLocalStorage(id);
  }, []);

  useEffect(() => {
    let a = setTimeout(() => {
      setAlertShow(false);
    }, 2000);

    let b = setTimeout(() => {
      setInitAnimation('transition duration-1000 opacity-100');
    }, 10);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      //useEffect가 동작 전에 실행되는 부분
      //clean up 할 때 사용함 (기존 꺼 다 지우고 새로 할 때)
      //unmount 될 때도 사용함
    };
    //서버에서 데이터 가져올 때, 어려운 연산, 타이머 부착 등 useEffect 사용
  }, []);

  useEffect(() => {
    //서버에 데이터 요청(2초 정도 걸림)
    let numberWarningTime = setTimeout(() => {
      setNumberWarning(false);
    }, 2000);
    if (isNaN(+text)) {
      setNumberWarning(true);
      setText('');
    }
    return () => {
      clearTimeout(numberWarningTime);
      //2초 사이에 재 렌더링 하면 충돌 발생
      //여기에 기존 요청은 삭제 해주세요.
    };
  }, [text]);

  if (typeof item === 'undefined') {
    return <>아이템 없음</>;
  }
  return (
    <div className={'opacity-0 ' + initAnimation}>
      {alertShow ? (
        <div className="alert alert-warning text-center">
          2초 이내 구매시 할인
        </div>
      ) : (
        <></>
      )}
      <YellowBtn
        bg="yellow"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        state변경
      </YellowBtn>
      {count}
      <YellowBtn bg="orange">안녕</YellowBtn>
      <YellowBtn bg="blue">안녕</YellowBtn>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img className="clickable" src={item?.img} width="100%" />
          </div>
          <div className="col-md-6">
            {numberWarning ? (
              <div className="alert alert-danger">숫자만 입력 하세요</div>
            ) : (
              <></>
            )}
            <input
              className="border-2"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
            <h4 className="pt-5">{item?.title}</h4>
            <p>{item?.content}</p>
            <p>{item?.price}</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(UpdateStock(item));
              }}
            >
              주문하기
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row row-col-4 justify-content-center text-center">
          <div
            className={`col border rounded-4 hover:bg-blue-100 clickable ${
              tabIndex === 0 && 'bg-blue-200'
            }`}
            onClick={() => {
              setTabIndex(0);
            }}
          >
            tab1
          </div>
          <div
            className={`col border rounded-4 hover:bg-blue-100 clickable ${
              tabIndex === 1 && 'bg-blue-200'
            }`}
            onClick={() => {
              setTabIndex(1);
            }}
          >
            tab2
          </div>
          <div
            className={`col border rounded-4 hover:bg-blue-100 clickable ${
              tabIndex === 2 && 'bg-blue-200'
            }`}
            onClick={() => {
              setTabIndex(2);
            }}
          >
            tab3
          </div>
          <div
            className={`col border rounded-4 hover:bg-blue-100 clickable ${
              tabIndex === 3 && 'bg-blue-200'
            }`}
            onClick={() => {
              setTabIndex(3);
            }}
          >
            tab4
          </div>
        </div>
      </div>
      <div className="container text-center">
        <TabContent tabIndex={tabIndex}></TabContent>
      </div>
    </div>
  );
};

const TabContent = ({ tabIndex }) => {
  let [animation, setAnimation] = useState('');
  useEffect(() => {
    let a = setTimeout(() => {
      setAnimation('transition duration-1000 scale-100');
    }, 10);
    return () => {
      clearTimeout(a);
      setAnimation('');
    };
  }, [tabIndex]);
  return (
    <div className={'scale-0 ' + animation}>
      {
        [<div></div>, <div>tab2</div>, <div>tab3</div>, <div>tab4</div>][
          tabIndex
        ]
      }
    </div>
  );
};

const SetLocalStorage = (id) => {
  let watched = JSON.parse(localStorage.getItem('watched'));
  watched?.push(id);

  localStorage.setItem('watched', JSON.stringify([...new Set(watched)]));
};

export default DetailPage;
