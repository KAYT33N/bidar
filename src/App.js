import { useEffect, useState } from 'react';
import Setup from './Components/Setup/Setup';
import './App.css';
import Home from './Components/Home/Home';
import { useRecoilState } from 'recoil';
import dataAtom from './Atoms/dataAtom';


function App() {
  const [shouldSetup, setShouldSetup] = useState(true)
  const [data,setData] = useRecoilState(dataAtom)

  useEffect(()=>{
    if (window.localStorage.getItem("data")) {
      let str = window.localStorage.getItem("data");
      if (JSON.parse(str)) {
        var tmp = JSON.parse(str);
        if (tmp.users && tmp.records) {
          setData(tmp)
          setShouldSetup(false)
        }
      }
    }
  },[])

  useEffect(()=>{
    if (data.users && data.records) {
      window.localStorage.setItem("data", JSON.stringify(data))
    }
  },[data])

  if (shouldSetup) {
    return (
      <Setup setShouldSetup={setShouldSetup}/>
    )
  }

  return (
    <Home />
  )
}

export default App
