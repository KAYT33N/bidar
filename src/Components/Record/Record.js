import "./Record.css"

function Record(props) {
    function removeThis(arg) {
        if(window.confirm("nakoni dare "+props.sugar.name+" bad-bakht !")){
            props.removeRecord(arg)
        }
    }

    return (
        <div onClick={()=>{removeThis(props.record.id)}}>
            {props.sugar.name}
            &nbsp;gave&nbsp;
            {props.record.amount}
            &nbsp;toman to&nbsp;
            {props.shakur.name}
            &nbsp;about&nbsp;
            {props.record.desc}
        </div>
    )
}

export default Record