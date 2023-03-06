import { useState } from "react"
import { useRecoilState } from "recoil"
import dataAtom from "../../Atoms/dataAtom"
import Calc from "../Calc/Calc"
import Record from "../Record/Record"
import "./Home.css"
import spacer33 from "../../helpers/spacer33"
import AddModal from "../AddModal/AddModal"

function Home() {
    const [data, setData] = useRecoilState(dataAtom)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    function removeRecord(id) {
        setData(prev=>{
            return {
                users: prev.users,
                records: prev.records.filter(item => item.id != id)
            }
        })
    }

    const records_len = data.records.length-1 ;

    return (
        <div>
            <div className="info">
                <div className="chart glass">
                    <Calc />
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
            {
                isAddModalOpen
                    ? <AddModal setIsAddModalOpen={setIsAddModalOpen}/>
                    : ""
            }
        </div>
    )
}

export default Home