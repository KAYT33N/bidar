export default function spacer33(num){
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