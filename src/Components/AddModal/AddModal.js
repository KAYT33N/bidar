import spacer33 from "../../helpers/spacer33"
import { useState,  } from "react"
import { useRecoilState } from "recoil"
import dataAtom from "../../Atoms/dataAtom"
import "./AddModal.css"

function AddModal(props){
    const [newRecord, setNewRecord] = useState({sugar_id:0,shakurs:[],amount:0,desc:""})
    const [data, setData] = useRecoilState(dataAtom)

    function toggleAddShakur(id){
        setNewRecord(prev=>{
            if (prev.shakurs.includes(id)){
                return ({
                    sugar_id: prev.sugar_id,
                    shakurs: prev.shakurs.filter(item=>{ return item!=id}),
                    amount: prev.amount,
                    desc: prev.desc
                })
            }else{
                return ({
                    sugar_id: prev.sugar_id,
                    shakurs: [...prev.shakurs,id],
                    amount: prev.amount,
                    desc: prev.desc
                })
            }
        })
    }

    function selectAllShakurs(){
        setNewRecord(prev=>{
            if (prev.shakurs.length === data.users.length){
                return ({
                    sugar_id: prev.sugar_id,
                    shakurs: [],
                    amount: prev.amount,
                    desc: prev.desc
                })
            }else{
                return ({
                    sugar_id: prev.sugar_id,
                    shakurs: data.users.map(item=>item.id),
                    amount: prev.amount,
                    desc: prev.desc
                })
            }
        })
    }

    function passNewToFunc(){
        newRecord.shakurs.map(item=>{
            addRecord(
                newRecord.sugar_id,
                item,
                (newRecord.amount/(newRecord.shakurs.length)),
                newRecord.desc
            )
        })
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

    return (
        <div className="addModal">
            <div className="glass content">
                <div className="form">
                    <div className="table no-select">
                        <div>
                            <div>
                                sugar
                            </div>
                            {data.users.map((item) => {
                                return (
                                    <div
                                        key={"sugar_id_select_"+item.id}
                                        className={newRecord.sugar_id===item.id ? "selected" : ""} 
                                        onClick={()=>{setNewRecord(prev=>{
                                            return {
                                                sugar_id: item.id,
                                                shakurs: prev.shakurs,
                                                amount: prev.amount,
                                                desc: prev.desc
                                            }
                                        })}}>
                                        {item.name}
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <div 
                                onClick={()=>{selectAllShakurs()}}>
                                shakur(s)
                            </div>
                            {data.users.map((item) => {
                                return (
                                    <div
                                        key={"shakur_id_select_"+item.id}
                                        className={newRecord.shakurs.includes(item.id) ? "selected" : ""}
                                        onClick={(()=>{toggleAddShakur(item.id)})}>
                                        {item.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <label htmlFor="new_rec_amount">amount : {spacer33(newRecord.amount)} toman</label>
                    <input 
                        onChange={(e)=>{setNewRecord(prev=>{
                            return {
                                sugar_id: prev.sugar_id,
                                shakurs: prev.shakurs,
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
                                shakurs: prev.shakurs,
                                amount: prev.amount,
                                desc: e.target.value.trim()
                            }
                        })}} />
                </div>
                <div className="buttons">
                    <button className="cancel" onClick={()=>{props.closeModal(false)}}>
                        cancel
                    </button>
                    <button className="add" onClick={()=>{passNewToFunc()}}>
                        add
                    </button>
                </div>
            </div>
        </div>)
}

export default AddModal