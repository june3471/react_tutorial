import { useNavigate } from 'react-router-dom';

const ShoesComponent = (props) => {
  let nevigate = useNavigate();

  return (
    <>
      <img
        src={props.data.img}
        className="clickable"
        onClick={() => nevigate('/detail/' + props.data.id)}
        width="80%"
      ></img>
      <h4>{props.data.title}</h4>
      <p>{props.data.price}</p>
      <p>{props.data.content}</p>
    </>
  );
};

export default ShoesComponent;
