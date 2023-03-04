import { useEffect, useState } from 'react';
import './App.css';
import { useRecoilState } from 'recoil';
import dataAtom from './Atoms/dataAtom';


function App() {
  const [shouldSetup, setShouldSetup] = useState(true)
  const [data,setData] = useRecoilState(dataAtom)

  return (
    <h1>new app</h1>
  );
}

export default App
