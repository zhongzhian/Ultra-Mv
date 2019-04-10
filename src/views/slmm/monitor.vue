<template>
  <div>
    <div style="margin-top:20px;height:258px;">
      <div class="normal-panel fl" style="width:50%;height:258px;">
        <div class="normal-panel-content">
          <div class="normal-panel-title">专线基本信息</div>
          <div class="normal-div">
            <table class="normal-div-table" cellspacing="0" cellpadding="0">
              <tr>
                <td class="leftTd">顾客名称</td>
                <td colspan="3"></td>
              </tr>
              <tr>
                <td class="leftTd">机构名称</td>
                <td></td>
                <td class="leftTd leftBorder">机构等级</td>
                <td></td>
              </tr>
              <tr>
                <td class="leftTd">路由协议</td>
                <td></td>
                <td class="leftTd leftBorder">电路代号</td>
                <td></td>
              </tr>
              <tr>
                <td class="leftTd">电路类型</td>
                <td></td>
                <td class="leftTd leftBorder">路由协议</td>
                <td></td>
              </tr>
              <tr>
                <td class="leftTd">装机地址</td>
                <td></td>
                <td class="leftTd leftBorder">电路类型</td>
                <td></td>
              </tr>
              <tr>
                <td class="leftTd">CE地址</td>
                <td></td>
                <td class="leftTd leftBorder">装机地址</td>
                <td></td>
              </tr>
              <tr>
                <td class="leftTd"></td>
                <td></td>
                <td class="leftTd leftBorder"></td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="normal-panel fl" style="width:50%;">
        <div class="normal-panel-content" style="height:258px;">
          <div class="normal-panel-title">带宽利用率</div>
          <div id="daikuanChart"></div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:168px;">
      <div class="normal-panel fl" style="width:100%;height:168px;">
        <div class="normal-panel-content">
          <div class="normal-panel-title">QOS</div>
          <table class="normal-div-table" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th>省份</th>
                <th>门店</th>
                <th>门店类型</th>
                <th>设备名称</th>
                <th>IP</th>
                <th>接口名称</th>
                <th>长途电路编号</th>
                <th>带宽</th>
                <th>DSCP名称/Qos等级/对列贷款(M)</th>
                <th>利用率/当前使用带宽</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="3">北京</td>
                <td rowspan="3">北京海淀</td>
                <td rowspan="3">店铺</td>
                <td rowspan="3">北京海淀CE设备</td>
                <td rowspan="3">10.142.3.4</td>
                <td rowspan="3">GIS</td>
                <td rowspan="3">10.255.1.23/24</td>
                <td rowspan="3" class="leftBorder">2</td>
                <td class="leftBorder">dscp 金(50%) 1</td>
                <td class="leftBorder" style="width: 220px;">
                  <Progress style="float:left;width:150px;" :percent="25"/>
                  <span style="color:red;">0.07Mbps</span>
                </td>
              </tr>
              <tr>
                <td class="leftBorder">dscp 金(50%) 1</td>
                <td class="leftBorder" style="width: 220px;">
                  <Progress style="float:left;width:150px;" :percent="55"/>
                  <span style="color:red;">0.07Mbps</span>
                </td>
              </tr>
              <tr>
                <td class="leftBorder">dscp 金(50%) 1</td>
                <td class="leftBorder" style="width: 220px;">
                  <Progress style="float:left;width:150px;" :percent="85"/>
                  <span style="color:red;">0.07Mbps</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:300px;">
      <div class="normal-panel fl" style="width:100%;height:300px;">
        <div class="normal-panel-content">
          <div class="normal-panel-title">SLA</div>
          <div style="padding: 0 10px;">
            <table class="slmm-sla-table" cellspacing="0" cellpadding="0">
              <tr>
                <td style="width:33%;">
                  <div class="normal-panel-content2">
                    <div class="normal-panel-title2">专线基本信息</div>
                    <div class="slmm-sla-chart-div">
                      <div id="slachart1"></div>
                    </div>
                  </div>
                </td>
                <td style="width:33%;">
                  <div class="normal-panel-content2">
                    <div class="normal-panel-title2">专线基本信息</div>
                    <div class="slmm-sla-chart-div">
                      <div id="slachart2"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="normal-panel-content2">
                    <div class="normal-panel-title2">专线基本信息</div>
                    <div class="slmm-sla-chart-div">
                      <div id="slachart3"></div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:135px;">
      <div class="normal-panel fl" style="width:100%;height:135px;">
        <div class="normal-panel-content">
          <div class="normal-panel-title">基本信息</div>
          <div class="normal-div">
            <table class="normal-div-table" cellspacing="0" cellpadding="0">
              <tr>
                <td class="leftTd">机构名称</td>
                <td></td>
                <td class="leftTd leftBorder">机构等级</td>
                <td></td>
                <td class="leftTd leftBorder">机构等级</td>
                <td></td>
              </tr>
              <tr>
                <td class="leftTd">路由协议</td>
                <td></td>
                <td class="leftTd leftBorder">电路代号</td>
                <td></td>
                <td class="leftTd leftBorder">机构等级</td>
                <td></td>
              </tr>
              <tr>
                <td class="leftTd">电路类型</td>
                <td></td>
                <td class="leftTd leftBorder">路由协议</td>
                <td></td>
                <td class="leftTd leftBorder">机构等级</td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:300px;">
      <div class="normal-panel fl" style="width:100%;height:300px;">
        <div class="normal-panel-content">
          <div class="normal-panel-title">性能KPI</div>
          <div style="padding: 0 10px;">
            <table class="slmm-sla-table" cellspacing="0" cellpadding="0">
              <tr>
                <td style="width:50%;">
                  <div class="normal-panel-content2">
                    <div class="normal-panel-title2">专线基本信息</div>
                    <div class="slmm-sla-chart-div">
                      <div id="slachart4"></div>
                    </div>
                  </div>
                </td>
                <td style="width:50%;">
                  <div class="normal-panel-content2">
                    <div class="normal-panel-title2">专线基本信息</div>
                    <div class="slmm-sla-chart-div">
                      <div id="slachart5"></div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:360px;">
      <div class="normal-panel fl" style="width:100%;height:360px;">
        <div class="normal-panel-content">
          <div class="normal-panel-title" style="height:50px;line-height: 30px;">接口(6-空闲-3)</div>
          <div class="home-table-condition" style="width:400px;">
            <ul class="home-table-condition-ul">
              <li>
                <span>
                  <Input
                    v-model="searchText"
                    size="small"
                    placeholder="请输入查询内容"
                    style="width: 200px"
                  />
                </span>
              </li>
              <li>
                <span>
                  <Button size="small" class="condition-btn">查询</Button>
                </span>
              </li>
            </ul>
          </div>
          <Table stripe height="300" :columns="alarmColumns" :data="alarmData"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
export default {
  data() {
    return {
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
      ]
    };
  },
  mounted() {
    this.daikuan();
    this.slaChart("slachart1");
    this.slaChart("slachart2");
    this.slaChart("slachart3");
    this.slaChart("slachart4");
    this.slaChart("slachart5");
  },
  methods: {
    daikuan() {
      let _color = "orange";
      var Shape = G2.Shape;
      Shape.registerShape("point", "pointer", {
        drawShape: function drawShape(cfg, group) {
          var point = cfg.points[0];
          var center = this.parsePoint({
            x: 0,
            y: 0
          });
          var target = this.parsePoint({
            x: point.x,
            y: 0.7
          });
          var dir_vec = {
            x: center.x - target.x,
            y: center.y - target.y
          };
          //normalize
          var length = Math.sqrt(dir_vec.x * dir_vec.x + dir_vec.y * dir_vec.y);
          dir_vec.x *= 1 / length;
          dir_vec.y *= 1 / length;
          //rotate dir_vector by -90 and scale
          var angle1 = -Math.PI / 2;
          var x_1 = Math.cos(angle1) * dir_vec.x - Math.sin(angle1) * dir_vec.y;
          var y_1 = Math.sin(angle1) * dir_vec.x + Math.cos(angle1) * dir_vec.y;
          //rotate dir_vector by 90 and scale
          var angle2 = Math.PI / 2;
          var x_2 = Math.cos(angle2) * dir_vec.x - Math.sin(angle2) * dir_vec.y;
          var y_2 = Math.sin(angle2) * dir_vec.x + Math.cos(angle2) * dir_vec.y;
          //polygon vertex
          var path = [
            ["M", target.x + x_1 * 0, target.y + y_1 * 0],
            ["L", center.x + x_1 * 6, center.y + y_1 * 6],
            ["L", center.x + x_2 * 6, center.y + y_2 * 6],
            ["L", target.x + x_2 * 0, target.y + y_2 * 0],
            ["Z"]
          ];
          group.addShape("path", {
            attrs: {
              path: path,
              fill: _color
            }
          });
          var tick = group.addShape("circle", {
            attrs: {
              x: center.x,
              y: center.y,
              r: 3,
              stroke: _color,
              lineWidth: 6,
              fill: _color
            }
          });
          return tick;
        }
      });

      var data = [
        {
          type: "上行利用率",
          value: 42
        },
        {
          type: "下行利用率",
          value: 68
        }
      ];
      var chart = new G2.Chart({
        container: "daikuanChart",
        forceFit: true,
        height: 250,
        padding: ["-20", "auto", "50", "auto"]
      });
      chart.source(data);
      chart.coord("polar", {
        startAngle: (-10 / 8) * Math.PI,
        endAngle: (2 / 8) * Math.PI,
        radius: 0.75
      });
      chart.scale("value", {
        min: 0,
        max: 100,
        nice: false,
        ticks: [20, 40, 60, 80]
      });
      chart.axis("1", false);
      chart.axis("value", {
        zIndex: 2,
        line: null,
        label: {
          offset: -10,
          formatter: function formatter(val) {
            if (val === "20") {
              return "差";
            } else if (val === "40") {
              return "中";
            } else if (val === "60") {
              return "良";
            }

            return "优";
          },
          textStyle: {
            fontSize: 14,
            textAlign: "center",
            fill: "#50b5ec"
          }
        },
        tickLine: null,
        grid: null
      });

      chart.facet("rect", {
        fields: ["type"],
        showTitle: false,
        eachView: function eachView(view, facet) {
          var data = facet.data[0];
          //指针
          view
            .point()
            .position("value*1")
            .shape("pointer")
            .color("#d8d8d8")
            .active(false);
          //仪表盘背景
          view.guide().arc({
            zIndex: 0,
            top: false,
            start: [0, 1],
            end: [100, 1],
            style: {
              stroke: "#CBCBCB",
              lineWidth: 10
            }
          });

          // 绘制仪表盘刻度线
          view.guide().line({
            start: [30, 0.94],
            end: [30.05, 0.82],
            lineStyle: {
              stroke: "#19AFFA", // 线的颜色
              lineDash: null, // 虚线的设置
              lineWidth: 2
            }
          });
          view.guide().line({
            start: [50, 0.94],
            end: [50, 0.82],
            lineStyle: {
              stroke: "#19AFFA", // 线的颜色
              lineDash: null, // 虚线的设置
              lineWidth: 2
            }
          });

          view.guide().line({
            start: [70, 0.94],
            end: [70.05, 0.82],
            lineStyle: {
              stroke: "#19AFFA", // 线的颜色
              lineDash: null, // 虚线的设置
              lineWidth: 2
            }
          });

          //仪表盘前景
          view.guide().arc({
            zIndex: 1,
            start: [0, 1],
            end: [data.value, 1],
            style: {
              stroke: "#1890ff",
              lineWidth: 10
            }
          });
          //仪表盘信息
          var percent = parseInt(data.value);
          view.guide().html({
            position: ["50%", "85%"],
            html:
              '<div class="g2-guide-html"><p class="value">' +
              percent +
              '%</p><p class="title">' +
              data.type +
              "</p></div>"
          });
        }
      });
      chart.render();
    },
    slaChart(divid) {
      var data = [
        {
          year: "1991",
          value: 3
        },
        {
          year: "1992",
          value: 4
        },
        {
          year: "1993",
          value: 3.5
        },
        {
          year: "1994",
          value: 5
        },
        {
          year: "1995",
          value: 4.9
        },
        {
          year: "1996",
          value: 6
        },
        {
          year: "1997",
          value: 7
        },
        {
          year: "1998",
          value: 9
        },
        {
          year: "1999",
          value: 13
        }
      ];
      var chart = new G2.Chart({
        container: divid,
        forceFit: true,
        height: 200,
        padding: ["auto", "auto", "auto", "auto"]
      });
      chart.source(data);
      chart.scale("value", {
        min: 0
      });
      chart.scale("year", {
        range: [0, 1]
      });
      chart.tooltip({
        crosshairs: {
          type: "line"
        }
      });
      chart.line().position("year*value");
      chart
        .point()
        .position("year*value")
        .size(4)
        .shape("circle")
        .style({
          stroke: "#fff",
          lineWidth: 1
        });
      chart.render();
    }
  }
};
</script>

<style lang="less">
.normal-div-table {
  width: 100%;
  // border-bottom: solid 1px rgba(143, 205, 240, 0.25);
  th {
    height: 30px;
    line-height: 30px;
  }
  tbody {
    background-color: #161941;
  }
  td {
    border-top: solid 1px rgba(143, 205, 240, 0.25);
    height: 30px;
    line-height: 30px;
  }
  td.leftTd {
    background-color: #161941;
    color: #50b5ec;
    width: 80px;
    border-right: solid 1px rgba(143, 205, 240, 0.25);
  }
  td.leftBorder {
    border-left: solid 1px rgba(143, 205, 240, 0.25);
  }
}

.g2-guide-html {
  width: 80px;
  height: 80px;
  vertical-align: middle;
  text-align: center;
  line-height: 40px;
}

.g2-guide-html .title {
  font-size: 14px;
  color: #50b5ec;
  font-weight: 500;
}

.g2-guide-html .value {
  font-size: 26px;
  color: #fff;
  font-weight: bold;
}

.slmm-sla-table {
  width: 100%;
  td {
    padding: 10px;
  }
  td.leftTd {
    background-color: #161941;
    color: #50b5ec;
    width: 80px;
    border-right: solid 1px rgba(143, 205, 240, 0.25);
  }
  td.leftBorder {
    border-left: solid 1px rgba(143, 205, 240, 0.25);
  }
}
.slmm-sla-chart-div {
  padding: 0 10px;
  background-color: #18203e;
  height: 200px;
  border-top: solid 1px #163e68;
}
</style>
