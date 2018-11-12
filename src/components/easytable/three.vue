<template>
  <div>
    <el-table :span-method="arraySpanMethod" :data="rawdata" :summary-method="getSummaries" show-summary style="width: 100%">
      <el-table-column fixed :prop="fields[0].key" :label="fields[0].name" width="150">
      </el-table-column>
      <el-table-column fixed :prop="fields[1].key" :label="fields[1].name" width="120">
      </el-table-column>
      <el-table-column :key="month" v-for="month in months" :label="month | monthFormat" width="120">
        <el-table-column label="商品现价" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.data | fetchValue(month,"priceAvg") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="月销售" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.data | fetchValue(month,"monthSaleSum") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售额" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.data | fetchValue(month,"saleRoomSum") }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="priceAvg" label="商品现价汇总" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.priceAvg.toFixed(1) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="monthSaleTotal" label="月销售汇总" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.monthSaleTotal.toFixed(1) | numberFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="saleRoomTotal" label="销售额汇总" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.saleRoomTotal.toFixed(1) | numberFormat }}</span>
        </template>
      </el-table-column>
    </el-table>
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
    ydata: {
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
      },
      required: true
    },
    fields: {
      type: Array,
      default: ["", ""],
      required: true
    },
    merge: {
      type: Array,
      default: function() {
        return [];
      },
      required: true
    }
  },
  data() {
    return {
      limitNum: 10,
      limitNums: [10, 20, 50],
      sortKey: {
        key: "saleRoomTotal",
        name: "销售额汇总"
      },
      sortKeys: [
        {
          key: "saleRoomTotal",
          name: "销售额汇总"
        },
        {
          key: "monthSaleTotal",
          name: "月销售汇总"
        }
      ],
      sortType: {
        key: "desc",
        name: "降序"
      },
      sortTypes: [
        {
          key: "desc",
          name: "降序"
        },
        {
          key: "asc",
          name: "升序"
        }
      ],
      valueMonth: []
    };
  },
  watch: {
    $route() {}
  },
  created() {},
  mounted() {},
  filters: {
    numberFormat:(value)=>{
      return myutil.numberFormatter(value);
    },
    monthFormat:(value)=>{
      return myutil.monthFormatter(value);
    },     
    fetchValue: function(value, month, key) {
      var rtn = "";
      if (
        typeof value[month] !== "undefined" &&
        typeof value[month][key] !== "undefined"
      ) {
        rtn = value[month][key];
        rtn = myutil.numberFormatter(rtn);
      }
      return rtn;
    }
  },
  methods: {
    getSummaries: function(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
          // } else if (index > 1 && index < (columns.length-2) ) {
        } else if (index === 1) {
          sums[index] = "";
          return;
        } else if (column.label == "月销售" || column.label == "销售额" ) {
          // 从第4列开始，每两列为一个月份
          // console.log(index);
          var mIndex = parseInt((index - 2) / 3);
          var offset = (index - 3) % 3;
          var month = this.months[mIndex];
          var fkey = offset == 0 ? "monthSaleSum" : "saleRoomSum";

          var values = data.map(item => {
            var rtn = 0;
            if (typeof item.data[month] != "undefined") {
              rtn = parseFloat(item.data[month][fkey]);
            }
            return rtn;
          });
          if (!values.every(value => isNaN(value))) {
            sums[index] = values
              .reduce((prev, curr) => {
                const value = parseFloat(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0)
              .toFixed(1);
          } else {
            sums[index] = "N/A";
          }
          // console.log(sums[index]);
        }else if(column.label == "商品现价" ){
          var mIndex = parseInt((index - 2) / 3);
          var month = this.months[mIndex];     
          var values = data.map(item => {
            var rtn = 0;
            if (typeof item.data[month] != "undefined") {
              rtn = parseFloat(item.data[month]["priceAvg"]);
            }
            return rtn;
          });
          if (!values.every(value => isNaN(value))) {
            sums[index] = values
              .reduce((prev, curr) => {
                const value = parseFloat(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] = (sums[index] / data.length).toFixed(1);
          } else {
            sums[index] = "N/A";
          }
        } else {
          var values = data.map(item => item[column.property]);
          if (!values.every(value => isNaN(value))) {
            sums[index] = values
              .reduce((prev, curr) => {
                const value = parseFloat(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0)
              .toFixed(1);
          } else {
            sums[index] = "N/A";
          }

          if(column.property=="priceAvg"){
            sums[index] = (sums[index] / data.length).toFixed(1);
          }
        }

        sums[index] = myutil.numberFormatter(sums[index]);
      });
      return sums;
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      var tmpIndexes = this.merge.map(item => item[0]);
      var tmpLength = this.merge.map(item => item[1]);

// console.log(this.merge);
//       console.log(tmpIndexes);
//       console.log(tmpLength);

      if (columnIndex === 0) {
        var index = tmpIndexes.indexOf(rowIndex);
        if (index>-1) {
          var rowspan = tmpLength[index]
          return {
            rowspan: rowspan,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    KeySort(key) {
      this.sortKey = key;
      this.$emit("sort", {
        key: this.sortKey.key,
        type: this.sortType.key
      });
    },
    TypeSort(type) {
      this.sortType = type;
      this.$emit("sort", {
        key: this.sortKey.key,
        type: this.sortType.key
      });
    },
    numLimit(num) {
      this.limitNum = num;
      this.$emit("limit", this.limitNum);
    }
  }
};
</script>

<style lang="less">
</style>
