import spacer33 from "../../helpers/spacer33"
import { useState,  } from "react"
import { useRecoilState } from "recoil"
import dataAtom from "../../Atoms/dataAtom"

function AddModal(props){
    const [newRecord, setNewRecord] = useState({sugar_id:0,shakur_id:0,amount:0,desc:""})
    const [data, setData] = useRecoilState(dataAtom)

    function passNewToFunc(){
        addRecord(
            newRecord.sugar_id,
            newRecord.shakur_id,
            newRecord.amount,
            newRecord.desc
        )
    }

    const options = 
        data
            .users
            .map( user =>
                <option value={user.id}>{user.name}</option>
                )

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
        <div className={"addModal"}>
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
                    <button className="cancel" onClick={()=>{props.setIsAddModalOpen(false)}}>
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