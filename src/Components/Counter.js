import { useSelector } from "react-redux";

const Counter = () => {
    const count = useSelector((state) => state.counter);
    return (
      <div>
        <h1>{count}</h1>
      </div>
    );
  };
  
  export default Counter;
  