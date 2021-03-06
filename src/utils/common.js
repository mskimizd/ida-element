import moment from 'moment'

var utils = {};

var numberFormatter = (inNum)=>{
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

var monthFormatter = (inDate)=>{
    try{
        return moment(inDate+"01").year()+"年"+ (moment(inDate+"01").month()+1)+"月";
    }
    catch(err){
        return inDate;
    }
}

utils.numberFormatter = numberFormatter;
utils.monthFormatter = monthFormatter;

export default utils;