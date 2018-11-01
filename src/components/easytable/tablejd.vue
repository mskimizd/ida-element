<template>
  <div>

        <el-table border :span-method="arraySpanMethod" :data="rawdata" :summary-method="getSummaries" show-summary style="width: 100%">
            <el-table-column fixed prop="month" label="月度" width="150">
            </el-table-column>
            <el-table-column fixed prop="promotion" label="促销信息" width="120">
            </el-table-column>
            <el-table-column :key="cls" v-for="cls in goodclass" :label="cls" width="120">
                <template slot-scope="scope">
                    <span >{{ scope.row.data[cls] }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="saleRoomTotal" label="总计" width="120">
                <template slot-scope="scope">
                <span >{{ scope.row.saleRoomTotal.toFixed(2) }}</span>
                </template>            
            </el-table-column>        
        </el-table>
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
      },
      required: true
    },
    goodclass: {
      type: Array,
      default: function() {
        return [];
      },
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
      
    };
  },
  watch: {
    $route() {}
  },
  created() {},
  mounted() {},
  methods: {
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }else if(index === 1){
            sums[index] = 'N/A';
            return;
          }else if(index === (columns.length-1)){
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
          }else{
            var classx = this.goodclass[index-2];
            //const values = data.map(item => Number(item[column.property]));
            var values = data.map(item => {
              var rtn = 0;
              if (typeof classx != "undefined" && item.data[classx] !== undefined) {
                rtn = parseFloat(item.data[classx]);
              }
              return rtn;
            });          
            //console.log(values);
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0).toFixed(2);
              sums[index] += '';
            } else {
              sums[index] = 'N/A';
            }
          }
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

  }
};
</script>

<style lang="less">
</style>
