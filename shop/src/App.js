import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { createContext, useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { data } from './asset/data';

import { useQuery } from 'react-query';
import axios from 'axios';

const AboutPage = lazy(() => import('./pages/aboutPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const MainPage = lazy(() => import('./pages/mainPage'));
const DetailPage = lazy(() => import('./pages/detailPage'));

export let Context1 = createContext();

function App() {
  let nevigeate = useNavigate();
  let result = useQuery(
    '',
    () =>
      axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
        console.log('요청');
        return a.data;
      }),
    { staleTime: 2000 }
  );
  useEffect(() => {
    let watched = localStorage.getItem('watched');
    if (watched == null) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, []);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={() => nevigeate('/')}>Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                nevigeate('/');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                nevigeate('/detail');
              }}
            >
              detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                nevigeate('/about');
              }}
            >
              about
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                nevigeate('/cart');
              }}
            >
              cart
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {result.isLoading && '로딩중'}
            {result.isError && '에러'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path="/" element={<MainPage></MainPage>} />

          <Route path="/detail">
            <Route path=":id" element={<DetailPage></DetailPage>}></Route>
          </Route>
          <Route
            path="/about"
            element={
              <div>
                <AboutPage></AboutPage>
              </div>
            }
          >
            <Route path="member" element={<div>멤버 페이지</div>} />
            <Route path="location" element={<div>위치정보 페이지</div>} />
          </Route>
          <Route
            path="/event"
            element={
              <>
                <div>오늘의 이벤트</div>
                <Outlet></Outlet>
              </>
            }
          >
            <Route path="one" element={<>첫 주문시 양배추즙 서비스</>}></Route>
            <Route path="two" element={<>생일기념 쿠폰 받기</>}></Route>
          </Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>

          <Route path="*" element={<div>404 페이지</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
