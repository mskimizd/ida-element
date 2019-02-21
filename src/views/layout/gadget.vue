<template>
    <transition name="slide-fade">
      <div v-if="gadgetShow" class="gadget">
        <!-- <div class="conf-one">
          <div class="conf-title">
            设置系统显示数据的时间范围
          </div>
          <div class="conf-panel">
              <el-row>
                <el-col :span="12"><el-radio v-model="month" :label="3">3个月</el-radio></el-col>
                <el-col :span="12"><el-radio v-model="month" :label="6">6个月</el-radio></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-radio v-model="month" :label="12">一年</el-radio></el-col>
                <el-col :span="12"><el-radio v-model="month" :label="0">全部数据</el-radio></el-col>                     
              </el-row>     
          </div>
        </div> -->
        <div class="conf-two">
          <el-row>
            <el-col :span="18">
              <div class="conf-title">
                <span >显示数据表格</span>
                <span style="font-size:12px;">数据表格比较消耗资源,隐藏可以提高页面流畅度,</span>
              </div>              
            </el-col>
            <el-col :span="6">
              <div class="conf-panel">
                <el-switch
                  v-model="tableShow"
                  @change="tableShowChange"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </div>                             
            </el-col>
          </el-row>
        </div>        
      </div>
    </transition>
</template>

<script>

  export default {
    data() {
      return {
        month: 6,
        tableShow:this.$store.state.tableShow,
      };
    },
    computed: {
      gadgetShow () {
        return this.$store.state.gadgetShow
      },
      tmp(){
        return this.$store.state.tableShow
      }
    },     
    methods: {
      tableShowChange(){
        console.log(11111);
        this.$store.commit('collapseTable', this.tableShow);
      }
    },
    components: {

    },    
  }
</script>

<style lang="less">
    .gadget{
        height:100%;
        width:240px;
        position: fixed;
        right: 0;
        z-index: 98;
        background: #222d32;
        padding: 80px 12px 60px 12px;
        color:#fff;
    }


    .slide-fade-enter-active {
      transition: all .5s ease    
    }
    .slide-fade-leave-active {
      transition: all .5s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to{
      transform: translateX(320px);
    }      

    .conf-one{
      .conf-title{
        padding: 0 12px;
      }
      .conf-panel{
        padding:12px 24px;
      }
      .el-radio {
        color:#fff;  
        padding: 8px 0;
      }
    }

    .conf-two{
      .conf-title{
        padding: 0 8px;
        span{
          display: inline-block;
        }
      }
      .conf-panel{
        margin-top: 4px;
        padding: 0 8px;
      }      
    }




</style>