<template>
  <div>
    <el-card class="box-card">
      <div style="display:flex;align-items: center;justify-content: space-between; color: #888;">
        <div style="font-size: 24px;font-weight: bold;">
          <span> 全品类分析 </span>
        </div>
        <div>
          <dropdown-select @filter-change="filterMonth" label="月份筛选" :options="monthsList"></dropdown-select>
        </div>
      </div>

    </el-card>
    <el-card class="box-card" style="margin-top:20px;">
      <class-pie :classdata="rawdata"></class-pie>
    </el-card>
    <el-card class="box-card" style="margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>品类地图表格</span>
      </div>
      <easy-table v-on:limit="limit" v-on:sort="sort" :rawdata="rawdata" :ydata="classcomb" :months="months" :fields="fields" :merge="mergeRow"></easy-table>
    </el-card>
  </div>
</template>

<script>
import easytable from "~/components/easytable/three";
import dropdownSelect from "~/components/dropdown-select";
import classPie from "~/components/easychart/classPie";

import Config from "~/config";

export default {
  data() {
    return {
      fields: [
        {
          key: "largeclass",
          name: "大类"
        },
        {
          key: "smallclass",
          name: "小类"
        }
      ],
      rawdata: [],

      months: [],
      monthsList: [],
      monthsInit: true,

      classcomb: [],
      cond: {
        key: "saleRoomTotal",
        type: "desc",
        limit: 100,
        table: "ind_industry",
        months: []
      },

      mergeRow: [] // 配置大类显示合并，
    };
  },
  watch: {
    $route: function() {
      if (this.$route.name == "industry-overview") {
        this.init();
      }
    }
  },
  mounted: function() {
    this.init();
  },
  methods: {
    init() {
      this.getClassData(this.cond);
    },
    sort(data) {
      this.cond.key = data.key;
      this.cond.type = data.type;
    },
    limit(num) {
      this.cond.limit = num;
    },
    filterMonth(months) {
      this.months = months;
      this.getClassData(this.cond);
    },
    getClassData(data) {
      this.$http
        .post(Config.backend+"/analysis/industry", {
          table: data.table,
          months: this.months.toString(),
          key: data.key,
          type: data.type,
          limit: data.limit
        })
        .then(
          response => {
            response.json().then(res => {
              if (res.code == 200) {
                this.rawdata = res.data.rawdata;
                this.classcomb = res.data.classcomb;
                this.months = res.data.months;
                this.cond.months = res.data.months;
                if (this.monthsInit) {
                  this.monthsList = res.data.months;
                  this.monthsInit = false;
                }

                // 配置大类显示合并
                var tmpStr = "";
                var tmpIndex = 0;
                var tmplength = 0;
                this.mergeRow = [];
                for (var index in res.data.rawdata) {
                  var cls = res.data.rawdata[index].largeclass;
                  if (cls !== tmpStr) {
                    if (tmplength > 0)
                      this.mergeRow.push([parseInt(tmpIndex), tmplength]);

                    tmpIndex = index;
                    tmplength = 1;
                    tmpStr = cls;
                  } else {
                    tmplength += 1;
                  }
                }
                this.mergeRow.push([parseInt(tmpIndex), tmplength]);
                //   console.log(this.mergeRow);
              }
            });
          },
          response => {}
        );
    }
  },
  components: {
    "easy-table": easytable,
    "dropdown-select": dropdownSelect,
    "class-pie": classPie
  }
};
</script>

<style lang="less">
</style>