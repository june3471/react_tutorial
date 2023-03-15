import { Container, Col, Row } from 'react-bootstrap';
import ShoesComponent from '../components/shoesComponent';
import { data } from '../asset/data';
import { useState } from 'react';
import axios from 'axios';

const MainPage = () => {
  let [items, setItem] = useState(data);
  let [btnShow, setBtnShow] = useState(true);
  let [moreLoading, setMoreLoading] = useState(false);
  return (
    <>
      <div className="main-bg"></div>
      <button
        onClick={() => {
          let tmp = [...items];
          tmp.sort((a, b) => (a.title > b.title ? 1 : -1));
          setItem(tmp);
        }}
      >
        {' '}
        정렬하기
      </button>
      <Container>
        <Row sm={2} md={3}>
          {items.map((data, i) => {
            return (
              <Col key={i}>
                <ShoesComponent data={data} />
              </Col>
            );
          })}
        </Row>
      </Container>
      <div className="d-flex justify-content-center">
        {btnShow ? (
          <button
            onClick={() => {
              let url =
                'https://codingapple1.github.io/shop/data' +
                String(parseInt(items.length / 3) + 1) +
                '.json';
              setMoreLoading(true);
              axios
                .get(url)
                .then((res) => {
                  if (res.status === 200) {
                    let tmp = [...items, ...res.data];
                    setItem(tmp);
                  }
                  setMoreLoading(false);
                })
                .catch(() => {
                  setBtnShow(false);
                  setMoreLoading(false);
                });
            }}
          >
            더보기
          </button>
        ) : (
          <></>
        )}
        {moreLoading && <div className="alert alert-info">로딩중</div>}
      </div>
    </>
  );
};

export default MainPage;
