import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeName, ChangeAge } from '.././store/userSlice';
import {
  memo,
  useState,
  useTransition,
  startTransition,
  useDeferredValue,
} from 'react';
import {
  IncreasCounter,
  DeleteStock,
  DecreaseCounter,
} from '.././store/stockSlice';

const CartPage = () => {
  let store = useSelector((state) => state);
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);
  let [name, setName] = useState('');
  let [isPending, startTransition] = useTransition();
  let state = useDeferredValue(name);
  let a = new Array(10000).fill(0);

  return (
    <>
      <Child></Child>

      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <div>
        <input
          className="border"
          type="text"
          onChange={(e) => startTransition(() => setName(e.target.value))}
        ></input>
        {isPending ? '로딩중' : a.map((x, i) => <div key={i}>{state}</div>)}
      </div>
      <div className="mx-10 mt-10">
        <div className="text-lg font-bold mb-2">
          {store.user.name}장바구니 항목 {store.user.age}
          <button
            onClick={() => {
              dispatch(ChangeAge());
            }}
          >
            +
          </button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
              <th>변경하기</th>
              <th>삭제하기</th>
            </tr>
          </thead>
          <tbody>
            {store.stock.map((stock) => (
              <tr key={stock?.id}>
                <td>{stock?.id}</td>
                <td>{stock?.title}</td>
                <td>{stock?.price}</td>
                <td>{stock?.count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(IncreasCounter(stock.id));
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch(DecreaseCounter(stock.id));
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(DeleteStock(stock.id));
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

const Child = memo(() => {
  console.log(1);
  return <div>자식임</div>;
});
export default CartPage;
