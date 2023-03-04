import { useState } from "react"
import { useRecoilState } from "recoil"
import dataAtom from "../../Atoms/dataAtom"
import Calc from "../Calc/Calc"
import Record from "../Record/Record"
import "./Home.css"

function Home() {
    const [data, setData] = useRecoilState(dataAtom)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const [newRecord,setNewRecord] = useState({sugar_id:0,shakur_id:0,amount:0,desc:""})

    function spacer33(num){
        let str = ""+num
        let res = ""
        let count = str.length;
        for (let i = 0; i < count; i++){
            if((count-i)%3 == 0 && i != 0){
                res+= "`"+str[i]
            }else{
                res+=str[i]
            }
        }
        return res
    }

    function passNewToFunc(){
        addRecord(
            newRecord.sugar_id,
            newRecord.shakur_id,
            newRecord.amount,
            newRecord.desc
        )
    }

    function addRecord(sugar_id, shakur_id, amount, desc) {
        setData(prev=>{
            var records = [...(prev.records)]
            let last_id = records[records.length -1]?.id ?? 0
            records.push({
                id: last_id+1,
                sugar: sugar_id,
                shakur: shakur_id,
                desc: desc,
                amount: amount,
                time: Date.now()
            })
            return {
                users: prev.users,
                records: records
            }
        })
    }

    function removeRecord(id) {
        setData(prev=>{
            return {
                users: prev.users,
                records: prev.records.filter(item => item.id != id)
            }
        })
    }

    const records_len = data.records.length-1 ;

    const options = data.users.map(user=><option value={user.id}>{user.name}</option>)

    return (
        <div>
            <div className="info">
                <div className="chart glass">
                    <Calc spacer33={spacer33}/>
                </div>
                <div className="controlls">
                    <div className="add glass" onClick={()=>{setIsAddModalOpen(true)}}>
                        <img src="svgs/add.svg"/>
                    </div>
                    <div className="setting glass">
                        <img src="svgs/gear.svg"/>
                    </div>
                </div>
            </div>
            <div className="records glass">
                {data.records.map((item, index) => <>
                    {(index === records_len) ? "" : <hr/>}
                    <Record 
                        key={item.id} 
                        record={item} 
                        sugar={data.users[item.sugar]} 
                        shakur={data.users[item.shakur]}
                        removeRecord={removeRecord}/>
                </>).reverse()}
            </div>
            <div className={"addModal " + (isAddModalOpen ? "open" : "hide")}>
                <div className="glass content">
                    <div className="form">
                        <label htmlFor="new_rec_sugar_id">sugar : </label>
                        <select 
                            id="new_rec_sugar_id"
                            onChange={(e)=>{setNewRecord(prev=>{
                                return {
                                    sugar_id: parseInt(e.target.value),
                                    shakur_id: prev.shakur_id,
                                    amount: prev.amount,
                                    desc: prev.desc
                                }
                            })}}
                            >{options}</select>
                        <label htmlFor="new_rec_sakur_id">shakur : </label>
                        <select 
                            id="new_rec_sakur_id"
                            onChange={(e)=>{setNewRecord(prev=>{
                                return {
                                    sugar_id: prev.sugar_id,
                                    shakur_id: parseInt(e.target.value),
                                    amount: prev.amount,
                                    desc: prev.desc
                                }
                            })}}
                            >{options}</select>
                        <label htmlFor="new_rec_amount">amount : {spacer33(newRecord.amount)} toman</label>
                        <input 
                            onChange={(e)=>{setNewRecord(prev=>{
                                return {
                                    sugar_id: prev.sugar_id,
                                    shakur_id: prev.shakur_id,
                                    amount: parseInt(e.target.value),
                                    desc: prev.desc
                                }
                            })}} 
                            type="number" 
                            step="5000" 
                            min="0"
                            id="new_rec_amount"/>
                        <label htmlFor="new_rec_desc">description : </label>
                        <textarea 
                            id="new_rec_desc" 
                            rows="4"
                            onChange={(e)=>{setNewRecord(prev=>{
                                return {
                                    sugar_id: prev.sugar_id,
                                    shakur_id: prev.shakur_id,
                                    amount: prev.amount,
                                    desc: e.target.value.trim()
                                }
                            })}} />
                    </div>
                    <div className="buttons">
                        <button className="sub" onClick={()=>{setIsAddModalOpen(false)}}>
                            cancel
                        </button>
                        <button className="add" onClick={()=>{passNewToFunc()}}>
                            add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home