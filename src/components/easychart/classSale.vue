<template>
  <div>
    <div class="chart-header">
      <div class="chart-title">
        各品类每月占比一览图
      </div>
    </div>
    <ve-histogram :extend="chartExtend" height="600px" :data="chartData" :settings="chartSettings"></ve-histogram>
  </div>
</template>

<script>
import myutil from "~/utils/common.js";

export default {
  props: {
    rawdata: {
      type: Array,
      default: function() {
        return [];
      },
      required: true
    },
    goodclass: {
      type: Array,
      default: function() {
        return [];
      },
      required: true
    }
  },
  watch: {
    rawdata(val) {
      var rows = [];
      var columns = ["月份"];

      columns.push(...this.goodclass);

      for(var d of this.rawdata){
          var mjson = {
              月份: d.month + "_" + d.promotion,
          }
          for(var dk in d.data){
              mjson[dk] = d.data[dk];
          }
          rows.push(mjson);
      }

      this.chartData = {
        columns: columns,
        rows: rows
      };
    }
  },
  computed: {
    chartSettings: function() {
      return {
        stack: { 品类: this.goodclass },
        yAxisType: ["KMB"],
      };
    }
  },
  data() {
    return {
      chartData: [],
      legendVisable: true,
      chartExtend: {
        grid: {
          right: 140
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 0,
          top: 60,
          bottom: 60
        },     
        tooltip : {
            // trigger: 'item',
            formatter: (value ,index) =>  {
              var str = myutil.monthFormatter(value[0].name.split("_")[0]) + " <br /> " ;
              for(var v of value){
                str += v.seriesName + ": ";
                if(v.value !== undefined){
                  str += myutil.numberFormatter(v.value) + " <br /> " ;            
                }else{
                  str += "0" + " <br /> " ;
                }
              }
              return str;
            }
        },            
        yAxis: {
          axisLabel:{
            formatter: (value ,index) =>  {
              return myutil.numberFormatter(value);
            }
          }
        },
        xAxis:{
            axisLabel:{
                formatter: function (value, index) {
                    var month = value.split("_")[0];
                    var promotion = value.split("_")[1];
                    return promotion+"\r\n \r\n "+ myutil.monthFormatter(month);
                }                
            }
        },
        series: {
          type: "bar",
          barMaxWidth: 40,         
        }
      },

    };
  },
  methods: {

  }
};
</script>