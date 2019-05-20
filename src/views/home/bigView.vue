<template>
  <div class="view-container">
    <div class="view-header">
      <div style="padding-top:5px;">广东联通MPLS VPN 智能网管</div>
      <div style="font-size:14px;opacity:0.7;line-height:14px;"><Icon style="margin-right:10px;" type="ios-clock-outline" /><Time :time="nowtime" type="datetime" :interval="1"/></div>
    </div>
    <div class="view-content">
      <table class="view-table" cellspacing="0" cellpadding="0">
        <tr>
          <td class="view-td1">
            <div class="view-tddiv" style="height:40%;">
              <div class="view-tddiv-title">性能指标TOP5</div>
              <div class="view-tddiv-content">
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
            </div>
            <div class="view-tddiv" style="height:60%;">
              <div class="view-tddiv-title">SLA电路TOP5</div>
              <div class="view-tddiv-content"></div>
            </div>
          </td>
          <td class="view-td2">
            <div class="view-tddiv" style="height:60%;">
              <div class="view-tddiv-title">万科专线分布情况</div>
              <div class="view-tddiv-content"></div>
            </div>
            <div class="view-tddiv" style="height:40%;">
              <div class="view-tddiv-title">告警类型数量</div>
              <div class="view-tddiv-content">
                <div id="proviceChart"></div>
              </div>
            </div>
          </td>
          <td class="view-td3">
            <div class="view-tddiv" style="height:45%;">
              <div class="view-tddiv-title">告警统计</div>
              <div class="view-tddiv-content">
                <div id="alarmChart"></div>
                <div style="top:170px;" class="map-panel-mainkpis">
                  <div class="leftdiv">
                    <div class="leftdiv-name">告警总数</div>
                    <div class="leftdiv-value">{{alarmCount.total}}</div>
                    <!-- 活动
                    <span style="font-size:20px;color:#73fbfd;margin-left:20px;">{{alarmCount.total}}</span> -->
                  </div>
                  <div class="rightdiv">
                    <div class="leftdiv-name">告警总数</div>
                    <div class="leftdiv-value">{{alarmCount.paidan}}</div>
                    <!-- 已派单
                    <span style="font-size:20px;color:#eb3223;margin-left:20px;">{{alarmCount.paidan}}</span> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="view-tddiv" style="height:55%;">
              <div class="view-tddiv-title">数据流量</div>
              <div class="view-tddiv-content"></div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import API from "@/api";
import G2 from "@antv/g2";
import { View } from "@antv/data-set";
import mapKey from "./mapKey.json";
import comselect from "@/components/ComSelect.vue";
import dateformat from "@/utils/dateformat.js";

// 开始使用 G2 绘制地图
var provinceChart = void 0;

// 当前聚焦的区域
var currentAreaNode = void 0;
export default {
  components: { comselect },
  data() {
    return {
      nowtime:new Date(),
      top5Datas: [
        [
          {
            name: "CPU",
            key: "1",
            api: "/queryCpuTop5"
          },
          {
            name: "内存",
            key: "2",
            api: "/queryMemoryTop5"
          },
          {
            name: "端口出",
            key: "3",
            api: "/queryPortOutTop5"
          },
          {
            name: "端口入",
            key: "4",
            api: "/queryPortInTop5"
          },
          {
            name: "带宽利用率",
            key: "5",
            api: "/queryDaiKuanRateTop5"
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
      top5Chart: null,

      alarmCount: {
        total: 0,
        paidan: 0
      },
    };
  },
  mounted() {
    // this.setRow1Kpis();
    this.pieChart();
    this.kpiTop5();
    this.proviceChart();
    // this.appTop5();
    // this.alarmShow();
    // this.setProvinceColor();
  },
  methods: {
    proviceChart() {
      var data = [];

      this.axios.get(`${API.index.queryLinksPro}`).then(result => {
        let maxValue = 0;
        for (var r of result) {
          // console.log("r",r)
          data.push({
            company: "已开通",
            type: r.province,
            value: r.monitornums
          });
          data.push({
            company: "未开通",
            type: r.province,
            value: r.nomonitornums
          });
          maxValue = Math.max(r.monitornums, r.monitornums, maxValue);
        }
        var chart = new G2.Chart({
          container: "proviceChart",
          forceFit: true,
          height: 200,
          padding: ["auto", "auto", 70, "auto"]
        });
        chart.source(data);
        chart.scale("value", {
          alias: "占比（%）",
          max: maxValue,
          min: 0,
          tickCount: 4
        });
        chart.axis("type", {
          label: {
            textStyle: {
              fill: "#9798b8"
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
              fill: "#9798b8"
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
      });
    },
    changeTop5(s) {
      // console.log(s);
      this.top5Index = s.key;
      this.kpiTop5();
    },
    kpiTop5() {
      // top5Index 是1-10的字符串
      let url = API.index.cpuTop5,
        top5IndexInt = parseInt(this.top5Index) - 1;
      url = this.top5Datas[parseInt(top5IndexInt / 5)][top5IndexInt % 5].api;

      this.axios.get(`${API.basePath + url}`).then(result => {
        if (this.top5Chart) {
          this.top5Chart.changeData(result);
        } else {
          var chart = new G2.Chart({
            container: "kpiTop5Chart",
            forceFit: true,
            height: 160,
            padding: ["auto", "auto", "auto", "auto"]
          });
          chart.source(result);
          chart.axis("ip", {
            label: {
              offset: 12,
              textStyle: {
                fill: "#9798b8" // 文本颜色
              }
            }
          });
          chart.axis("value", {
            label: {
              textStyle: {
                fill: "#9798b8" // 文本颜色
              }
            }
          });
          // chart.tooltip("ip*value", function(item, percent) {
          //   return {
          //     name: item,
          //     value: value
          //   };
          // })
          chart.coord().transpose();
          chart.interval().position("ip*value");
          chart.render();
          this.top5Chart = chart;
        }
      });
    },
    pieChart() {
      this.axios.get(`${API.index.alarmCount}`).then(result => {
        // console.log(`--------------${API.index.alarmCount}`,result);
        // console.log(result);
        // [
        //   {
        //     "alnum1": null,
        //     "alnum2": null,
        //     "alnum3": null,
        //     "alnum4": null,
        //     "total": null,
        //     "paidan": 0
        //   }
        // ]
        let resultData = result[0];
        // let resultData = {
        //   "alnum1": 10,
        //   "alnum2": 43,
        //   "alnum3": 23,
        //   "alnum4": 5,
        //   "total": 81,
        //   "paidan": 38
        // }
        this.alarmCount = {
          total: resultData.total,
          paidan: resultData.paidan
        };
        let paidanData = [
          {
            value: resultData.total - resultData.paidan,
            type: "未派单"
          },
          {
            value: resultData.paidan,
            type: "已派单"
          }
        ];
        let alarmCount = [
          {
            value: resultData.alnum1,
            name: "严重告警"
          },
          {
            value: resultData.alnum2,
            name: "主要告警"
          },
          {
            value: resultData.alnum3,
            name: "次要告警"
          },
          {
            value: resultData.alnum4,
            name: "普通告警"
          }
        ];
        var dv = new View();
        dv.source(paidanData).transform({
          type: "percent",
          field: "value",
          dimension: "type",
          as: "percent"
        });
        var chart = new G2.Chart({
          container: "alarmChart",
          forceFit: true,
          height: 220,
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
        // dv1.source(alarmCount).transform({
        //   type: "percent",
        //   field: "value",
        //   dimension: "name",
        //   as: "percent"
        // });
        // outterView.source(dv1, {
        //   percent: {
        //     formatter: function formatter(val) {
        //       val = (val * 100).toFixed(2) + "%";
        //       return val;
        //     }
        //   }
        // });
        outterView.source(alarmCount);
        outterView.coord("theta", {
          innerRadius: 0.88,
          radius: 0.9
        });
        outterView
          .intervalStack()
          .position("value")
          .color("name", ["#db504d", "#c16d01", "#f9e265", "#5dcbf1"])
          // .label("value",{offset: 5,textStyle: {
          //     fill: '#9798b8'
          //   }
          // })
          // .tooltip("name*percent", function(item, percent) {
          //   percent = (percent * 100).toFixed(2) + "%";
          //   return {
          //     name: item,
          //     value: percent
          //   };
          // })
          .select(false)
          .style({
            lineWidth: 0,
            stroke: "#fff"
          });

        chart.render();
      });
    },
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
.map-panel-mainkpis {
  // position: absolute;
  // left: 20px;
  // right: 20px;
  // top: 40px;
  height: 40px;
    text-align: center;
    font-size: 13px;
    color: #9798b8;
    position: absolute;
    left: 20px;
    right: 20px;
}

.map-panel-mainkpis .leftdiv {
  position: absolute;
  left: 10%;
  text-align: right;
  width: 80px;
}

.leftdiv-name,.leftdiv-value{
  text-align: center;
}
.leftdiv-value{
  background: url("/static/images/value-s.png") no-repeat;
  background-size: 100% 100%;
  font-weight: 700;
  font-size: 18px;
}

.map-panel-mainkpis .rightdiv {
  position: absolute;
  right: 10%;
  /* width: 150px; */
  margin-left: 20px;
  text-align: left;
  width: 80px;
}

.view-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: url("/static/images/bj.png");
  background-size: 100%;
}
.view-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: url("/static/images/view-head.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  font-size: 30px;
}
.view-content {
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 20px;
  padding: 0 0 20px;
}
.view-table {
  width: 100%;
  /* margin-top:50px; */
  position: relative;
  height: 100%;
}
.view-table td {
  height: 100%;
}
.view-td1 {
  padding: 10px 10px 0 20px;
  width: 30%;
}
.view-td2 {
  padding: 20px 10px 0 10px;
  width: 40%;
}
.view-td3 {
  padding: 10px 20px 0 10px;
  width: 30%;
}
.view-tddiv {
  /* height: 300px; */
  padding-top: 20px;
  background: url("/static/images/div1.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  margin-top: 20px;
}
.view-tddiv-title {
  text-align: center;
  width: 50%;
  background: url("/static/images/divtitle.png") no-repeat center;
  background-size: 100%;
  position: absolute;
  top: 5px;
  left: 15px;
  line-height: 20px;
  height: 20px;
}
.view-tddiv-content {
  text-align: center;
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  height: 40%;
}
</style>
