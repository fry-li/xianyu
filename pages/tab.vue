<template>
  <div style="padding-left:60px;margin-bottom:20px;">
    <div class="tab">
      <span
        v-for="(item,index) in ['体育','娱乐','生活']"
        :key="index"
        @click="handleClick(index)"
        :class="{ active: current === index }"
      >{{item}}</span>
    </div>
    <div v-show="current === 0">
      <ul>
        <li>科比退役</li>
        <li>科比退役</li>
        <li>科比退役</li>
      </ul>
    </div>
    <div v-show="current ===1">
      <ul>
        <li>周柏豪中山演唱会临时取消</li>
        <li>周柏豪中山演唱会临时取消</li>
        <li>周柏豪中山演唱会临时取消</li>
      </ul>
    </div>
    <div v-show="current ===2">
      <ul>
        <li>中秋将至</li>
        <li>中秋将至</li>
        <li>中秋将至</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {
    handleClick(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="less" scope>
.tabs {
  margin-bottom: 20px;

  span {
    cursor: pointer;
  }
}

.active {
  color: red;
}
</style>