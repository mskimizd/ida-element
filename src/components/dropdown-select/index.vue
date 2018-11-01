<template>
    <el-dropdown trigger="click" :hide-on-click="false" @visible-change="visibleChange">
        <span class="el-dropdown-link">
            {{ this.label }}
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item key="checkall">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </el-dropdown-item>
            <template v-for="opt in options">
                <el-dropdown-item :key="opt">
                    <el-checkbox-group v-model="checked" @change="handleCheckedChange">
                        <el-checkbox :label="opt" :key="opt">{{ opt }}</el-checkbox>
                    </el-checkbox-group>
                </el-dropdown-item>
            </template>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
      required: true
    },
    options: {
      type: Array,
      default: function() {
        return [];
      },
      required: true
    }
  },
  watch: {
    options(nv, ov) {
      console.log(nv);
      for(var v of nv){
         this.checked.push(v); 
      }
    }
  },
  data() {
    return {
      checkAll: true,
      isIndeterminate: false,
      checked:[]
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checked = val ? this.options : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checked.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.options.length;
    },
    visibleChange(value) {
      if (!value) {
        if(this.checked.length==0){ // 不允许全不选
          for(var v of this.options){
            this.checked.push(v); 
          }  
          this.checkAll = true;        
        }
        this.$emit("filter-change", this.checked);
      }
    }
  }
};
</script>

<style lang="less">
.el-dropdown-link {
  cursor: pointer;
  padding: 20px 0;
}
</style>