import { useEffect } from "react"
import { useRecoilState } from "recoil"
import dataAtom from "../../Atoms/dataAtom"

function Calc(props){
    const [data, setData] = useRecoilState(dataAtom)

    const userCount = data.users.length

    let uneavens = [];
    for (let i = 0; i < userCount; i++) {
        for (let j = 0; j < userCount; j++) {
            if( i != j ){
                let talab_i_az_j = data.records
                    .filter(item=>{
                        return item.sugar == i && item.shakur == j
                    })
                    .reduce((a,b)=> a+b.amount , 0)
                let bedehi_i_be_j = data.records
                    .filter(item=>{
                        return item.sugar == j && item.shakur == i
                    })
                    .reduce((a,b)=> a+b.amount , 0)
                uneavens.push({i:i, j:j, amount:(bedehi_i_be_j - talab_i_az_j)})
            }
        }
    }

    return (
        <ul>
            {uneavens
            .filter(item=> item.amount>0)
            .map(item=>{
                return (<>
                    <li>
                        <b>{data.users[item.i].name}</b> should ekh kone <b>{props.spacer33(item.amount)}</b> toman be <b>{data.users[item.j].name}</b>
                    </li>
                </>)
            })}
        </ul>
    )
}

export default Calc