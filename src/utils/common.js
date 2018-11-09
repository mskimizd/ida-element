var utils = {};

var numberProcess = (inNum)=>{
    try{
        let outputNum = parseFloat(inNum);
        if(outputNum > 100000000){
            outputNum = (outputNum / 100000000).toFixed(2) + "亿";
        }else if(outputNum>10000){
            outputNum = (outputNum / 10000).toFixed(1) + "万";
        }
        return outputNum;
    }catch(err){
        return inNum;
    }
}

utils.numberProcess = numberProcess;

export default utils;