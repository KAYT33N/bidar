import { useRecoilState } from "recoil"
import dataAtom from "../../Atoms/dataAtom"
import spacer33 from "../../helpers/spacer33"
import motherAtom from "../../Atoms/motherAtom"
import { tab } from "@testing-library/user-event/dist/tab"

function Calc(){
    const [data, setData] = useRecoilState(dataAtom)
    const [mother, setMother] = useRecoilState(motherAtom);

    let tabs = data.records;
    let uneavens = [];
    const users = data.users

    users.forEach((i) => {
        uneavens[i.id] = [];
        users.forEach((j) => {
            uneavens[i.id][j.id] = 0
        })
    })

    if ( mother > -1 ) {
        tabs
        .filter(tab => tab.shakur != tab.sugar)
        .forEach((tab) => {
            uneavens[tab.shakur][mother] += tab.amount
            if ( tab.sugar != mother ){
                uneavens[mother][tab.sugar] += tab.amount
            }
        });
    }else{
        tabs
        .filter(tab => tab.shakur != tab.sugar)
        .forEach((tab) => {
            uneavens[tab.shakur][tab.sugar] += tab.amount
        });
    }

    let res = [];

    users.forEach(shakur => {
        users.forEach(sugar => {
            if ( uneavens[sugar.id][shakur.id] > 0 && sugar.id > shakur.id) {
                let r_amount = uneavens[shakur.id][sugar.id] - uneavens[sugar.id][shakur.id]
                r_amount = (r_amount>0) ? r_amount : -r_amount
                uneavens[sugar.id][shakur.id] = 0
                let r_sugar = (r_amount > 0) ? sugar.id : shakur.id
                let r_shakur = (r_amount > 0) ? shakur.id : sugar.id
                res.push(
                    <li key={"bedehi_"+users[r_shakur].name+"_be_"+users[r_sugar].name}>
                        <b>{users[r_shakur].name}</b> should ekh kone <b>{spacer33(parseInt(r_amount))}</b> toman be <b>{users[r_sugar].name}</b>
                    </li>
                )
            }
        })
    })

    return (<ul>{res}</ul>)

}

export default Calc