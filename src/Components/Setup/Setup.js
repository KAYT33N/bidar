import { useState } from "react"
import { useRecoilState } from "recoil"
import dataAtom from "../../Atoms/dataAtom"
import "./Setup.css"

function Setup(props) {
    const [data, setData] = useRecoilState(dataAtom)
    const setShouldSetup = props.setShouldSetup
    const [count, setCount] = useState(1)

    let rows = []
    for (let i = 0; i<count; i++){
        rows.push(
            <input key={i} type="text" name={"name-"+i} placeholder={"user "+(i+1)+"'s name   "}/>
        )
    }

    function changeCount(how){
        if (count + how < 1){
            alert("users count cant be lower than 1")
        }else{
            setCount(prev=>prev+how)
        }
    }

    function validate() {
        let users = []
        for (let i = 0; i<count; i++){
            let val = document.getElementsByName("name-"+i)[0].value;
            if (val.trim().length < 1){
                alert("name-"+(i+1)+" is empty")
                return
            }
            users.push({id: i, name: val.trim()})
        }
        setData({users: users, records:[]})
        setShouldSetup(false)
    }

    return (
        <div id="setup">
            <h1>enter users</h1>
            <button className="change" onClick={()=>{changeCount(-1)}}>sub</button>
            <button className="change" onClick={()=>{changeCount(+1)}}>add</button>
            {rows}
            <button className="confirm" onClick={()=>{validate()}}>{setShouldSetup? "true" : "fasle"}</button>
        </div>
    )
}

export default Setup