import './App.css';
import { useState } from 'react';
function App() {
  let [item, setItem] = useState([
    { title: '남자 코트 추천', cnt: 0 },
    { title: '강남 우동 맛집', cnt: 0 },
    { title: '파이썬 독학', cnt: 0 },
  ]);
  let [modalShow, setModalShow] = useState(false);
  let [modalItem, setModalItem] = useState('');
  let [text, setText] = useState('');

  return (
    <div className="App">
      <div className="nav">
        <p>블로그</p>
      </div>
      <button
        onClick={() => {
          let tmp = [...item];
          tmp.sort((a, b) => (a.title > b.title ? 1 : -1));
          setItem(tmp);
        }}
      >
        정렬
      </button>
      {item.map((x, index) => {
        return (
          <div key={x.title} className="list">
            <div className="title">
              <p
                className="clickable"
                onClick={() => {
                  setModalItem(x);

                  x === modalItem
                    ? setModalShow(!modalShow)
                    : setModalShow(true);
                }}
              >
                {x.title}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    let tmp = [...item];
                    tmp[index].cnt += 1;
                    setItem(tmp);
                  }}
                >
                  👍{x.cnt}
                </span>
              </p>
              <button
                onClick={() => {
                  let tmp = [...item];
                  tmp.splice(index, 1);
                  setItem(tmp);
                }}
              >
                삭제
              </button>
            </div>

            <p>2월 17일 발행</p>
          </div>
        );
      })}
      <div>
        <button
          onClick={() => {
            let tmp = [...item];
            let index = tmp.map((d) => d.title)?.indexOf('남자 코트 추천');
            if (index > -1) {
              tmp[index].title = '여자 코트 추천';
              setItem(tmp);
            }
          }}
        >
          여자
        </button>
      </div>
      <div className="textbox-area">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          className="btn btn-blue"
          onClick={() => {
            let tmp = [...item];
            tmp.unshift({ title: text, cnt: 0 });
            setItem(tmp);
            setText('');
          }}
        >
          {' '}
          확인
        </button>
      </div>

      {modalShow ? (
        <Modal modalItem={modalItem} setModalItem={setModalItem} />
      ) : null}
    </div>
  );
}

const Modal = (props) => {
  return (
    <div className="modal">
      <p>{props.modalItem.title}</p>
      <p>날짜</p>
      <p>상세내용</p>
      <button
        onClick={() => {
          let tmp = { ...props.modalItem };
          tmp.title = '여자 코트 추천';
          props.setModalItem(tmp);
        }}
      >
        글수정
      </button>
    </div>
  );
};

export default App;
