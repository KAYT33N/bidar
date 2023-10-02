import { useRecoilState } from "recoil";
import motherAtom from "../../Atoms/motherAtom";
import dataAtom from "../../Atoms/dataAtom";

function SelectMother(props) {
    const [data, setData]       = useRecoilState(dataAtom)
    const [mother, setMother]   = useRecoilState(motherAtom)

    function changeTo(id) {
        setMother(id)
    }

    return (
        <div className="glass selectMother">
            <h4>
                select mother pay
            </h4>
            <ul>
                <li 
                onClick={()=>(changeTo(-1))} 
                className={mother === -1 ? "isMother" : "" }>
                    Free For All
                </li>
                {data.users.map(item => 
                    <li 
                    key={item.id}
                    onClick={()=>(changeTo(item.id))} 
                    className={mother === item.id ? "isMother" : "" }>
                        {item.name}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default SelectMother