<template>
  <div>
    <div style="height:70px;">
      <div
        v-for="(kpi,index) in row1kpis"
        v-bind:index="index"
        v-bind:key="kpi"
        class="normal-panel fl row5"
      >
        <div class="normal-panel-content" style="height:70px;">
          <img class="home-kpis-img" :src="kpi.img">
          <p class="home-kpis-p">{{kpi.label}}</p>
          <p class="home-kpis-pvalue" :class="{'alarm':index===0}">{{kpi.value}}</p>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:600px;">
      <div class="normal-panel fl" style="width:70%;height:600px;">
        <div class="normal-panel-content">
          <div class="normal-panel-title" style="text-align:center;">全国异常专线情况</div>
          <div id="mapChart" style="height:500px;"></div>
        </div>
      </div>
      <div class="normal-panel fl" style="width:30%;">
        <div class="normal-panel-content" style="height:290px;margin-bottom:20px;">
          <div class="normal-panel-title">指标TOP5</div>
          <!-- <switchtab :swtichDatas="top5Datas" :sindex="top5Index" @coms-switch-change="changeTop5"/> -->
          <div class="home-top5-switch">
            <Icon
              @click="top5switch=0"
              color="#50b5ec"
              size="25"
              style="vertical-align: top;line-height: 30px;position: absolute;left: 15px;cursor:pointer;"
              type="ios-arrow-back"
            />
            <table class="home-top5-switch-table" cellspacing="0" cellpadding="0">
              <tr v-if="top5switch === 0">
                <td
                  @click="changeTop5(s)"
                  v-for="s in top5Datas[0]"
                  :key="s.key"
                  :class="{'active':s.key === top5Index}"
                >{{s.name}}</td>
              </tr>
              <tr v-if="top5switch === 1">
                <td
                  @click="changeTop5(s)"
                  v-for="s in top5Datas[1]"
                  :key="s.key"
                  :class="{'active':s.key === top5Index}"
                >{{s.name}}</td>
              </tr>
            </table>
            <Icon
              @click="top5switch=1"
              color="#50b5ec"
              size="25"
              style="vertical-align: top;line-height: 30px;position: absolute;right: 15px;cursor:pointer;"
              type="ios-arrow-forward"
            />
          </div>
          <div id="kpiTop5Chart"></div>
        </div>
        <div class="normal-panel-content" style="height:290px;">
          <div class="normal-panel-title">告警统计</div>
          <div id="alarmChart"></div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:200px;">
      <div class="normal-panel fl" style="width:70%;height:200px;">
        <div class="normal-panel-content">
          <div class="normal-panel-title">各省份专线统计</div>
          <div id="proviceChart"></div>
        </div>
      </div>
      <div class="normal-panel fl" style="width:30%;">
        <div class="normal-panel-content" style="height:200px;">
          <div class="normal-panel-title">应用流量排名TOP5</div>
          <div id="appTop5Chart"></div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:350px;">
      <div class="normal-panel fl" style="width:100%;height:350px;">
        <div class="normal-panel-content">
          <div class="normal-panel-title" style="height:50px;line-height: 30px;">活动告警</div>
          <!-- <b-table :columns="columns1" :data="data1" :pageData="pageData"></b-table> -->
          <div class="home-table-condition">
            <ul class="home-table-condition-ul">
              <li>
                <comselect
                  @coms-select-change="alarmSelect"
                  :textLeft="true"
                  :selectDatas="alarmSelectData"
                  :selectValue="alarmSelectValue"
                />
              </li>
              <li>
                <span>
                  当前页：
                  <label class="alarmlabel">15</label>
                </span>
              </li>
              <li>
                <span>
                  总数：
                  <label class="alarmlabel">15</label>
                </span>
              </li>
              <li>
                <span class="home-table-condition-alarmpoint" style="background-color: #c4342b;"></span>
                <label class="home-table-condition-alarmlabel">3</label>
                <span class="home-table-condition-alarmpoint" style="background-color: #c16d01;"></span>
                <label class="home-table-condition-alarmlabel">3</label>
                <span class="home-table-condition-alarmpoint" style="background-color: #f9e265;"></span>
                <label class="home-table-condition-alarmlabel">3</label>
                <span class="home-table-condition-alarmpoint" style="background-color: #5dcbf1;"></span>
                <label class="home-table-condition-alarmlabel">3</label>
              </li>
            </ul>
          </div>
          <Table stripe height="300" :columns="alarmColumns" :data="alarmData"></Table>
        </div>
      </div>
    </div>
    <!-- <div id="chart"></div> -->
  </div>
</template>

<script>
import G2 from "@antv/g2";
// import L7 from '@antv/l7';
import { View } from "@antv/data-set";
import data from "./diamond.json";
// import switchtab from "@/components/SwitchTab.vue";
import comselect from "@/components/ComSelect.vue";

export default {
  components: { comselect },
  data() {
    return {
      top5Datas: [
        [
          {
            name: "CPU",
            key: "1"
          },
          {
            name: "内存",
            key: "2"
          },
          {
            name: "端口出",
            key: "3"
          },
          {
            name: "端口入",
            key: "4"
          },
          {
            name: "带宽利用率",
            key: "5"
          }
        ],
        [
          {
            name: "QOS",
            key: "6"
          },
          {
            name: "SLA",
            key: "7"
          },
          {
            name: "时延",
            key: "8"
          },
          {
            name: "抖动",
            key: "9"
          },
          {
            name: "丢包",
            key: "10"
          }
        ]
      ],
      top5switch: 0,
      top5Index: "2",
      row1kpis: [
        {
          img: "/static/images/paidan.png",
          label: "派单数量",
          value: 4
        },
        {
          img: "/static/images/shuliang.png",
          label: "专线省份数量",
          value: 23
        },
        {
          img: "/static/images/pingfen.png",
          label: "质量评分",
          value: 96.8
        },
        {
          img: "/static/images/zhuanxian.png",
          label: "新监控专线",
          value: 7
        },
        {
          img: "/static/images/zongjizhuanxian.png",
          label: "总计监控专线",
          value: 87
        }
      ],
      pageData: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      alarmColumns: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      alarmData: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      data111: [
        {
          value: 36,
          type: "处理中"
        },
        {
          value: 17,
          type: "未处理"
        }
      ],
      data222: [
        {
          value: 610,
          name: "重要告警"
        },
        {
          value: 434,
          name: "主要告警"
        },
        {
          value: 335,
          name: "次要告警"
        },
        {
          value: 250,
          name: "普通告警"
        }
      ],
      alarmSelectValue: "1",
      alarmSelectData: [
        {
          name: "驴打滚",
          value: "1"
        },
        {
          name: "炸酱面",
          value: "2"
        },
        {
          name: "冰糖葫芦",
          value: "3"
        },
        {
          name: "北京烤鸭",
          value: "4"
        }
      ]
    };
  },
  mounted() {
    // var _DataSet = DataSet,
    // DataView = _DataSet.DataView;// 通过 DataSet 计算百分比
    this.pieChart();
    this.kpiTop5();
    this.proviceChart();
    this.appTop5();
    this.tttss();
  },
  methods: {
    tttss() {
      var scene = new L7.Scene({
        id: "mapChart",
        mapStyle: "dark", // 样式URL
        center: [104.838088, 34.075889],
        pitch: 35,
        zoom: 4.88,
        rotation: 4.183582
      });
      window.scene = scene;
      // scene.on("loaded", function() {
      //   $.get(
      //     "https://gw.alipayobjects.com/os/rmsportal/oVTMqfzuuRFKiDwhPSFL.json",
      //     function(data) {
      //       scene
      //         .PointLayer({
      //           zIndex: 2
      //         })
      //         .source(data.list, {
      //           type: "array",
      //           x: "j",
      //           y: "w"
      //         })
      //         .shape("3d:circle")
      //         .size("t", function(level) {
      //           return [2, 2, level * 3 + 20];
      //         })
      //         .active(true)
      //         .color("t", [
      //           "#002466",
      //           "#105CB3",
      //           "#2894E0",
      //           "#CFF6FF",
      //           "#FFF5B8",
      //           "#FFAB5C",
      //           "#F27049",
      //           "#730D1C"
      //         ])
      //         .render();
      //     }
      //   );
      // });
    },
    alarmSelect(name) {
      console.log("do something");
    },
    changeTop5(s) {
      // console.log(s);
      this.top5Index = s.key;
    },
    kpiTop5() {
      var data = [
        {
          country: "13.32.32.10",
          population: 90
        },
        {
          country: "13.32.32.11",
          population: 76
        },
        {
          country: "13.32.32.12",
          population: 95
        },
        {
          country: "13.32.32.13",
          population: 78
        },
        {
          country: "13.32.32.14",
          population: 78
        }
      ];
      var chart = new G2.Chart({
        container: "kpiTop5Chart",
        forceFit: true,
        height: 230,
        padding: ["auto", "auto", 30, "auto"]
      });
      chart.source(data);
      chart.axis("country", {
        label: {
          offset: 12
        }
      });
      chart.coord().transpose();
      chart.interval().position("country*population");
      chart.render();
    },
    pieChart() {
      var dv = new View();
      dv.source(this.data111).transform({
        type: "percent",
        field: "value",
        dimension: "type",
        as: "percent"
      });
      var chart = new G2.Chart({
        container: "alarmChart",
        forceFit: true,
        height: 250,
        padding: [20, 0, 40, 0]
      });
      chart.source(dv, {
        percent: {
          formatter: function formatter(val) {
            val = (val * 100).toFixed(2) + "%";
            return val;
          }
        }
      });
      chart.coord("theta", {
        radius: 0.57
      });
      chart.tooltip({
        showTitle: false
      });
      // chart.legend(false);
      chart
        .intervalStack()
        .position("percent")
        .color("type", ["#234c8d", "#3778e7"])
        // .label("type", {
        //   offset: -10
        // })
        .tooltip("type*percent", function(item, percent) {
          percent = (percent * 100).toFixed(2) + "%";
          return {
            name: item,
            value: percent
          };
        })
        .select(false)
        .style({
          lineWidth: 0,
          stroke: "#fff"
        });

      chart.legend("type", false);
      chart.legend({
        position: "top", // 设置图例的显示位置
        // itemGap: 20, // 图例项之间的间距
        title: null, // 不展示图例的标题
        marker: "circle" // 设置图例 marker 的显示样式
      });
      var outterView = chart.view();
      var dv1 = new View();
      dv1.source(this.data222).transform({
        type: "percent",
        field: "value",
        dimension: "name",
        as: "percent"
      });
      outterView.source(dv1, {
        percent: {
          formatter: function formatter(val) {
            val = (val * 100).toFixed(2) + "%";
            return val;
          }
        }
      });
      outterView.coord("theta", {
        innerRadius: 0.88,
        radius: 0.9
      });
      outterView
        .intervalStack()
        .position("percent")
        .color("name", ["#db504d", "#c16d01", "#f9e265", "#5dcbf1"])
        // .label("name")
        .tooltip("name*percent", function(item, percent) {
          percent = (percent * 100).toFixed(2) + "%";
          return {
            name: item,
            value: percent
          };
        })
        .select(false)
        .style({
          lineWidth: 0,
          stroke: "#fff"
        });

      chart.render();
    },
    proviceChart() {
      var data = [
        {
          company: "设备总数",
          type: "北京",
          value: 40
        },
        {
          company: "已开通总数",
          type: "北京",
          value: 25
        },
        {
          company: "设备总数",
          type: "天津",
          value: 40
        },
        {
          company: "已开通总数",
          type: "天津",
          value: 25
        },
        {
          company: "设备总数",
          type: "上海",
          value: 40
        },
        {
          company: "已开通总数",
          type: "上海",
          value: 25
        }
      ];

      var chart = new G2.Chart({
        container: "proviceChart",
        forceFit: true,
        height: 200,
        padding: ["auto", "auto", 70, "auto"]
      });
      chart.source(data);
      chart.scale("value", {
        alias: "占比（%）",
        max: 50,
        min: 0,
        tickCount: 4
      });
      chart.axis("type", {
        label: {
          textStyle: {
            fill: "#aaaaaa"
          }
        },
        tickLine: {
          alignWithLabel: false,
          length: 0
        }
      });

      chart.axis("value", {
        label: {
          textStyle: {
            fill: "#aaaaaa"
          }
        },
        title: {
          offset: 50
        }
      });
      chart.legend({
        position: "top-right",
        marker: "circle"
      });
      chart
        .interval()
        .position("type*value")
        .color("company")
        .opacity(1)
        .adjust([
          {
            type: "dodge",
            marginRatio: 1 / 32
          }
        ]);
      chart.render();
    },
    appTop5() {
      var data = [
        {
          country: "13.32.32.10",
          population: 90
        },
        {
          country: "13.32.32.11",
          population: 76
        },
        {
          country: "13.32.32.12",
          population: 95
        },
        {
          country: "13.32.32.13",
          population: 78
        },
        {
          country: "13.32.32.14",
          population: 78
        }
      ];
      var chart = new G2.Chart({
        container: "appTop5Chart",
        forceFit: true,
        height: 170,
        padding: ["auto", "auto", 30, "auto"]
      });
      chart.source(data);
      chart.axis("country", {
        label: {
          offset: 12
        }
      });
      chart.coord().transpose();
      chart.interval().position("country*population");
      chart.render();
    }
  }
};
</script>

<style lang="less" scoped>
.home-top5-switch-table {
  border-collapse: collapse;
  font-size: 12px;
  display: inline-block;
  border-radius: 2px;
  background-color: #151740;
  margin: 0 10px;
  td {
    border: 1px solid #163e68;
    border-collapse: collapse;
    padding: 4px 8px;
    color: #2a6893;
    cursor: pointer;
  }
  td.active {
    color: #50b5ec;
    font-weight: 600;
    background-color: #02306f;
  }
}
// .home-table-condition {
//   position: absolute;
//   right: 0;
//   top: 0;
//   width: 700px;
//   &-ul {
//     list-style: none;
//     font-size: 12px;
//     width: 100%;
//     height: 50px;
//     padding: 10px;
//   }
//   &-ul > li {
//     float: left;
//     margin-right: 30px;
//     line-height: 30px;
//     label {
//       color: #50b5ec;
//     }
//   }
//   &-alarmpoint {
//     background-color: red;
//     width: 10px;
//     height: 10px;
//     border-radius: 50%;
//     display: inline-block;
//     margin-right: 5px;
//   }
//   &-alarmlabel {
//     margin-right: 20px;
//     font-size: 12px;
//     color:#ccc !important;
//   }
// }
</style>
