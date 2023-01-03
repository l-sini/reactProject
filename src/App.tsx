import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { UsingIntersectionObserver } from './component/UsingIntersectionObserver';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UsingIntersectionObserver />
    </>
  );
}

export default App;
