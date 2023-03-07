import { useState } from "react"
import { useRecoilState } from "recoil"
import dataAtom from "../../Atoms/dataAtom"
import "./Settings.css"

function Settings(props){
    const [openJob, setOpenJob] = useState("")
    const [newUsersName, setNewUsersName] = useState("")
    const [newData, setNewData] = useState("")
    const [data, setData] = useRecoilState(dataAtom)

    function toggle(str){
        setOpenJob(prev => {
            if (prev === str){
                return ""
            }
            return str
        })
    }

    function importData(){
        let tmp = JSON.parse(newData)
        if (tmp.users && tmp.records){
            if(window.confirm("mot-ma-ennnnnniiii namosan ?")){
                setData(tmp)
                alert("update shod")
                return
            }
            alert("khodet tokhm kardi")
            return
        }
        alert("Err: invalid json data !")
    }

    function addUser(){
        if(newUsersName.trim().length < 1){
            alert("khalie ke !")
            return
        }
        if(window.confirm(newUsersName + " ham angaleton shode ?")){
            setData(prev=>{
                alert("done")
                let last_user_id = prev.users[prev.users.length -1].id
                return ({
                    users: [...prev.users, {id:(last_user_id+1), name:newUsersName.trim()}],
                    records: prev.records
                })
            })
        }else{
            alert("khodet tokhm kardi")
        }
    }

    return (
        <div className="setModal">
            <div className="glass content">
                <div 
                    className="close"
                    onClick={()=>{props.closeModal(false)}}>
                    &times;
                </div>
                <hr/>
                <div className="jobs">
                    <div className={"export "+(openJob === "export" ? "open" : "")}>
                        <h4 onClick={()=>{toggle("export")}}>
                            <span>&gt;</span>
                            Export data
                        </h4>
                        <h5>
                            copy and save this in a file
                        </h5>
                        <textarea rows="4.5">
                            {window.localStorage.getItem("data")}
                        </textarea>
                    </div>
                    <div className={"import "+(openJob === "import" ? "open" : "")}>
                        <h4 onClick={()=>{toggle("import")}}>
                            <span>&gt;</span>
                            Import data
                        </h4>
                        <textarea
                            onChange={(e)=>{setNewData(e.target.value)}}>
                        </textarea>
                        <button
                            onClick={()=>{importData()}}>
                            import
                        </button>
                    </div>
                    <div className={"addUser "+(openJob === "addUser" ? "open" : "")}>
                        <h4 onClick={()=>{toggle("addUser")}}>
                            <span>&gt;</span>
                            Add user
                        </h4>
                        <input
                        type="text"
                            onChange={(e)=>{setNewUsersName(e.target.value)}}>
                        </input>
                        <button
                            onClick={()=>{addUser()}}>
                            add new user
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings