<template>
    <div>
        <el-card class="box-card" shadow="never">
            <div style="display:flex;align-items: center;justify-content: space-between; color: #888;">
                <div style="font-size: 24px;font-weight: bold;">
                    <span> 竞品总览 </span>
                </div>
                <div>
                    <dropdown-select @filter-change="filterMonth" label="月份筛选" :options="monthsList"></dropdown-select>
                </div>
            </div>

        </el-card>
        <el-card class="box-card" shadow="never" style="margin-top:20px;">
            <comp-sale :monthdata="monthdata"></comp-sale>
        </el-card>
    </div>
</template>

<script>
// import compSale from "~/components/easychart/compSale";
import compSale from "~/components/easychart/comSale";
import dropdownSelect from "~/components/dropdown-select";

import Config from "~/config";

export default {
  data() {
    return {
      monthdata: [],
      months: [],
      monthsList: [],
      monthsInit: true
    };
  },
  mounted: function() {
    this.getOverview();
  },
  watch: {
    $route: function() {
      if (this.$route.name == "competitor-overview") {
        this.getOverview();
      }
    }
  },  
  filters: {},
  methods: {
    filterMonth(months) {
      this.months = months;
      this.getOverview();
    },
    getOverview() {
      this.$http
        .post(Config.backend+"/analysis/overview", {
          months: this.months.toString()
        })
        .then(
          response => {
            response.json().then(res => {
              if (res.code == 200) {
                this.monthdata = res.data.monthData;
                this.months = res.data.monthList;
                if (this.monthsInit) {
                  this.monthsList = res.data.monthList;
                  this.monthsInit = false;
                }
              }
            });
          },
          response => {}
        );
    }
  },
  components: {
    "comp-sale": compSale,
    "dropdown-select": dropdownSelect
  }
};
</script>

<style lang="less">
</style>