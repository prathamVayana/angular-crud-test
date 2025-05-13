export function getNowTime():string{
    let nowTime:Date = new Date()
    return nowTime.toLocaleTimeString()
}