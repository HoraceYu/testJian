<template>
  <div id="app">
    <div id="list-demo" class="demo">
    <button v-on:click="add">插入一个元素</button>
    <button v-on:click="remove">移除一个元素</button>
    <transition-group name="list" tag="p">
      <span v-for="item in items" v-bind:key="item" class="list-item">
        {{ item }}
      </span>
    </transition-group>
  </div>
  </div>
</template>
 
<script>
export default {
  name: 'App',
  data: function(){
    return {
      items: [1,2,3,4,5,6,7,8,9],
      nextNum: 10
    }
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
  }
}
</script>
 
<style>
  /** 方块元素的样式 **/
  .list-item {
    display: inline-block;
    margin-right: 10px;
    background-color: orange;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
  }
  /** 插入过程 **/
  .list-enter-active{
    transition: all 1s;
  }
  /** 移除过程 **/
  .list-leave-active {
    transition: all 1s;
  }
  /*** 开始插入、移除结束的位置变化 ***/
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>