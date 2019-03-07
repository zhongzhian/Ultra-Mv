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
        </div>
      </div>
      <div class="normal-panel fl" style="width:30%;">
        <div class="normal-panel-content2" style="height:290px;margin-bottom:20px;">
          <div class="normal-panel-title">指标TOP5</div>
          <div class="normal-panel-switch">
            <Icon
              color="#50b5ec"
              size="25"
              style="vertical-align: top;line-height: 30px;"
              type="ios-arrow-back"
            />
            <table class="home-top5-switch-table" cellspacing="0" cellpadding="0">
              <tr>
                <td class="active">CPU</td>
                <td>内存</td>
                <td>端口出</td>
                <td>端口入</td>
                <td>带宽利用率</td>
              </tr>
            </table>
            <!-- <RadioGroup style="margin:0 10px;" v-model="button6" type="button" size="small">
              <Radio label="CPU"></Radio>
              <Radio label="内存"></Radio>
              <Radio label="端口出"></Radio>
              <Radio label="端口入"></Radio>
              <Radio label="带宽利用率"></Radio>
            </RadioGroup>-->
            <Icon
              color="#50b5ec"
              size="25"
              style="vertical-align: top;line-height: 30px;"
              type="ios-arrow-forward"
            />
          </div>
          <div id="kpiTop5Chart"></div>
        </div>
        <div class="normal-panel-content2" style="height:290px;">
          <div class="normal-panel-title">告警统计</div>
          <div id="alarmChart"></div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:200px;">
      <div class="normal-panel fl" style="width:70%;height:200px;">
        <div class="normal-panel-content2">
          <div class="normal-panel-title">各省份专线统计</div>
          <div id="proviceChart"></div>
        </div>
      </div>
      <div class="normal-panel fl" style="width:30%;">
        <div class="normal-panel-content2" style="height:200px;">
          <div class="normal-panel-title">应用流量排名TOP5</div>
          <div id="appTop5Chart"></div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:250px;">
      <div class="normal-panel fl" style="width:100%;height:250px;">
        <div class="normal-panel-content2">
          <div class="normal-panel-title" style="height:50px;line-height: 30px;">活动告警</div>
          <!-- <b-table :columns="columns1" :data="data1" :pageData="pageData"></b-table> -->
          <div class="home-table-condition">
            <ul class="home-table-condition-ul">
              <li>
                <Dropdown trigger="click">
                  <Button class="dropdown-btn" type="primary">下拉菜单</Button>
                  <Icon class="dropdown-icon" type="ios-arrow-down"></Icon>
                  <DropdownMenu class="dropdown-menu" slot="list">
                    <DropdownItem>驴打滚</DropdownItem>
                    <DropdownItem>炸酱面</DropdownItem>
                    <!-- <DropdownItem disabled>豆汁儿</DropdownItem> -->
                    <DropdownItem>冰糖葫芦</DropdownItem>
                    <DropdownItem>北京烤鸭</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <!-- <select>
                  <option>asdfasf</option>
                </select>-->
              </li>
              <li>
                <span>
                  当前页：
                  <label>15</label>
                </span>
              </li>
              <li>
                <span>
                  总数：
                  <label>15</label>
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
          <Table height="300" :columns="alarmColumns" :data="alarmData"></Table>
        </div>
      </div>
    </div>
    <!-- <div id="chart"></div> -->
  </div>
</template>

<script>
import G2 from "@antv/g2";
import { View } from "@antv/data-set";
import data from "./diamond.json";

export default {
  data() {
    return {
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
  },
  methods: {
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
        padding: ["auto", "auto", "auto", "auto"]
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
        padding: [20, 0, 20, 0]
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
        radius: 0.6
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
          lineWidth: 1,
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
        innerRadius: 0.9,
        radius: 1
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
          lineWidth: 1,
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
        padding: ["auto", "auto", "auto", "auto"]
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

<style lang="less">
.home-top5-switch-table {
  border-collapse: collapse;
  font-size: 12px;
  display: inline-block;
  border-radius: 2px;
  background-color: #161941;
  margin: 0 10px;
}
.home-top5-switch-table td {
  border: 1px solid #2a6893;
  border-collapse: collapse;
  padding: 4px 8px;
  color: #2a6893;
}
.home-top5-switch-table td.active {
  color: #50b5ec;
  font-weight: 600;
  background-color: #0e2b61;
}
.home-table-condition-alarmpoint {
  background-color: red;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
.home-table-condition-alarmlabel {
  margin-right: 20px;
}

.home-table-condition {
  position: absolute;
  right: 0;
  top: 0;
  left: 200px;
}
.home-table-condition-ul {
  list-style: none;
  font-size: 12px;
  width: 100%;
  height: 50px;
  padding: 10px;
}
.home-table-condition-ul li {
  float: left;
  margin-right: 30px;
  line-height: 30px;
}
.dropdown-btn {
  background-color: #161941;
  border: 1px solid #2a6893;
  font-size: 12px;
  color: #50b5ec;
  border-radius: 2px;
  padding: 4px 8px;
  text-align: left;
  width: 200px;
}
.dropdown-icon {
  font-size: 14px;
  color: #50b5ec;
  margin-left: -20px;
  vertical-align: middle;
}
.dropdown-menu{
  width:200px;
  left:0;
}
</style>
