import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { UsingIntersectionObserver } from './component/UsingIntersectionObserver';
import { UsingReactWindow } from './component/UsingReactWindow';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <UsingIntersectionObserver /> */}
      <UsingReactWindow />
    </>
  );
}

export default App;
