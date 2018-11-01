<template>
    <div>
    <div class="chart-header">
      <div class="chart-title">
        TOP10商品各月占比一览图2
      </div>
      <div class="chart-filter">
        <el-dropdown trigger="click" @command="chooseDimension">
          <span class="el-dropdown-link">
            {{ dimension }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="销量">销量</el-dropdown-item>
            <el-dropdown-item command="销售额">销售额</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>        
        <ve-histogram :extend="chartExtend" height="600px" :data="chartData" :settings="chartSettings"></ve-histogram>
        <div style="margin-top:12px;">
            <el-tag :key="index" v-for="(val, index) in axisLabels" type="info" style="margin:4px 12px;">
                <span style="    font-weight: bold;">{{ index + 1}}</span>
                {{ val}}
            </el-tag>
        </div>    
    </div>
</template>

<script>
export default {
  props: {
    rawdata: {
      type: Array,
      default: function() {
        return [];
      },
      required: true
    },
    months: {
      type: Array,
      default: function() {
        return [];
      }
      // required: true
    }
  },
  computed: {
    chartData: function() {
      this.axisLabels = []; // x轴标签过长，以数字显示，在旁边标注
      var rows = [];
      var columns = ["goodstitle"];
      var monthtmp = {};
      for (var m of this.months) {
        columns.push(m);
      }
      for (var d of this.rawdata) {
        var row = {};
        row.goodstitle = d.goodstitle;
        this.axisLabels.push(row.goodstitle);
        for (var m of this.months) {
          if (typeof d.data[m] != "undefined") {
            row[m] = parseFloat(d.data[m]["monthSaleSum"]);
          } else {
            row[m] = 0;
          }
        }
        rows.push(row);
      }

    //   console.log(columns);
    //   console.log(rows);
      return {
        columns: columns,
        rows: rows
      };
    },
    chartSettings: function() {
      // console.log(products);
      return {};
    }
  },
  data() {
    return {
      axisLabels: [],
      legendVisable: true,
      chartExtend: {
        // title: {
        //   text: "TOP10商品各月销量一览图"
        // },
        // grid: {
        //   right: 480
        // },
        legend: {
          //   type: "scroll",
          //   orient: "vertical",
          //   right: 0,
          //   top:60,
          bottom: 0
        },
        series: {
          type: "bar",
          barMaxWidth: 40
        },
        xAxis: {
          axisLabel: {
            // rotate:80,
            formatter: function(value, index) {
              return index+1;
            }
          }
        }
      },

      dimension: "销量",
    };
  },
  methods: {
    chooseDimension(val) {
      this.dimension = val;
    }
  }
};
</script>