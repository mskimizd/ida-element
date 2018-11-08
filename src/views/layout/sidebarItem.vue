<template>
  <div v-if="!item.hidden&&item.children">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)">
        <i :class="onlyOneChild.meta.icon"></i>
        <span slot="title">{{onlyOneChild.meta.cname}}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span>{{item.meta.cname}}</span>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item v-if="child.children&&child.children.length>0" :item="child" :key="child.path" :base-path="resolvePath(child.path)"
        />

        <el-menu-item v-else-if="!child.dynamic" :index="resolvePath(child.path)" :key="child.name">
          <i :class="child.meta.icon"></i>
          <span slot="title">{{child.meta.cname}}</span>
        </el-menu-item>
        <template v-else-if="child.dynamic">
          <el-menu-item v-for="dm in dynamicMenus" :key="dm.upSrcId" :index="resolvePathDynamic(child.path, dm.upSrcKey)">
            <i :class="child.meta.icon"></i>
            <span  slot="title">{{dm.upSrcName}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-submenu>
  </div>
</template>

<script>
  import Path from 'path'

  export default {
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      basePath: {
        type: String,
        default: ''
      },
      dynamicMenus:{
        type: Array,
        default: function() {
          return [];
        },
        required: true        
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    methods: {
      hasOneShowingChild(children, parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      },
      resolvePath(routePath) {
        return Path.resolve(this.basePath, routePath)
      },
      resolvePathDynamic(routePath, param) {
        return Path.resolve(this.basePath, routePath.replace(":param",param))
        // return Path.resolve(this.basePath, routePath)
      }
    }
  }
</script>

<style lang="less">
.el-menu-item i{
  color:#eee;
  font-size:16px;
}

.el-submenu__title i {
  color:#eee;
}

</style>