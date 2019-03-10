<template>
  <div class="coms-switchtab">
    <Icon
      color="#50b5ec"
      size="25"
      style="vertical-align: top;line-height: 30px;"
      type="ios-arrow-back"
    />
    <!-- <table class="coms-switchtab-table" cellspacing="0" cellpadding="0">
      <tr>
        <td class="active">CPU</td>
        <td>内存</td>
        <td>端口出</td>
        <td>端口入</td>
        <td>带宽利用率</td>
      </tr>
    </table>-->
    <Carousel v-model="switchIndex" loop dots="none" arrow="always">
      <CarouselItem v-for="sd in swtichDatas" :key="sd">
        <table class="coms-switchtab-table" cellspacing="0" cellpadding="0">
          <tr>
            <td
              @click="tdClick(s)"
              v-for="s in sd"
              :key="s"
              :class="{'active':s.key === sindex}"
            >{{s.name}}</td>
          </tr>
        </table>
      </CarouselItem>
    </Carousel>
    <Icon
      color="#50b5ec"
      size="25"
      style="vertical-align: top;line-height: 30px;"
      type="ios-arrow-forward"
    />
  </div>
</template>

<script>
export default {
  props: ["swtichDatas", "sindex"],
  data() {
    return {
      switchIndex: 0
    };
  },
  methods: {
    tdClick(s) {
      this.$emit('coms-switch-change',s);
      // console.log('1');
      // this.sindex = s.key;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.coms-switchtab {
  &-table {
    border-collapse: collapse;
    font-size: 12px;
    display: inline-block;
    border-radius: 2px;
    background-color: #161941;
    margin: 0 10px;
    td {
      border: 1px solid #2a6893;
      border-collapse: collapse;
      padding: 4px 8px;
      color: #2a6893;
      cursor: pointer;
    }
    td.active {
      color: #50b5ec;
      font-weight: 600;
      background-color: #0e2b61;
    }
  }
}
// .coms-switchtab-table {
//   border-collapse: collapse;
//   font-size: 12px;
//   display: inline-block;
//   border-radius: 2px;
//   background-color: #161941;
//   margin: 0 10px;
// }
// .coms-switchtab-table td {
//   border: 1px solid #2a6893;
//   border-collapse: collapse;
//   padding: 4px 8px;
//   color: #2a6893;
// }
// .coms-switchtab-table td.active {
//   color: #50b5ec;
//   font-weight: 600;
//   background-color: #0e2b61;
// }
</style>
