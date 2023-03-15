import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
const AboutPage = () => {
  let [age, setAge] = useState(20);
  let [count, setCount] = useState(0);

  useEffect(() => {
    if (count !== 0 && count < 3) {
      setAge(age + 1);
    }
  }, [count]);
  return (
    <>
      <div>어바웃 페이지</div>

      <div>
        count {count}
        age {age}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
    </>
  );
};

export default AboutPage;
