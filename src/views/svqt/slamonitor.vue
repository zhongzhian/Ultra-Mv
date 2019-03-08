// sla服务质量监控
<template>
  <div class="slamonitor">
    <div class="top">
      <div class="normal-panel fl top-left">
        <div class="normal-panel-content">
          <div class="normal-panel-title">客户SLA服务质量</div>
          <div id="contrastChart"></div>
        </div>
      </div>
      <div class="normal-panel fl top-right">
        <div class="normal-panel-content2">
          <div class="normal-panel-title">指标TOP5</div>
          <div class="normal-panel-switch">
            <table class="top5-switch-table" cellspacing="0" cellpadding="0">
              <tr>
                <td class="active">抖动</td>
                <td>时延</td>
                <td>丢包</td>
              </tr>
            </table>
          </div>
          <div id="kpiTop5Chart"></div>
        </div>
      </div>
    </div>
    <div class="normal-panel fl bottom">
      <div class="normal-panel-content2">
        <div class="normal-panel-title" style="height:50px;line-height: 30px;">活动告警</div>
        <Table></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import G2 from "@antv/g2";

  export default {
    data() {
      return {};
    },
    mounted() {
      this.kpiTop5();
      this.contrastChart();
    },
    methods: {
      kpiTop5() {
        var data = [{
            key: "客户电路名称1",
            value: 90
          },
          {
            key: "客户电路名称2",
            value: 76
          },
          {
            key: "客户电路名称3",
            value: 95
          },
          {
            key: "客户电路名称4",
            value: 78
          },
          {
            key: "客户电路名称5",
            value: 78
          }
        ];
        var chart = new G2.Chart({
          container: "kpiTop5Chart",
          forceFit: true,
          height: 200,
          padding: ["auto", "auto", "auto", "auto"]
        });
        chart.source(data);
        chart.axis("key", {
          label: {
            offset: 12
          }
        });
        chart.coord().transpose();
        chart.interval().position("key*value").style({
          fill: 'l(0) 0:#346ee4 1:#5ecde6'
        });
        chart.render();
      },
      contrastChart() {
        var data1 = [{
            kpi: "时延",
            name: "客户名称1",
            value: 30
          },
          {
            kpi: "丢包",
            name: "客户名称1",
            percent: 10
          },
          {
            kpi: "时延",
            name: "客户名称2",
            value: 10
          },
          {
            kpi: "丢包",
            name: "客户名称2",
            percent: 40
          },
          
          {
            kpi: "时延",
            name: "客户名称3",
            value: 25
          },
          {
            kpi: "丢包",
            name: "客户名称3",
            percent: 45
          }
        ];
        var data2 = [{
            kpi: "抖动",
            name: "客户名称1",
            value: 20
          },
          {
            kpi: "抖动",
            name: "客户名称2",
            value: 35
          },
          {
            kpi: "抖动",
            name: "客户名称3",
            value: 10
          }
        ];

        var chart = new G2.Chart({
          container: "contrastChart",
          forceFit: true,
          height: 250,
          padding: ["auto", 48, 50, 48]
        });
        chart.scale("value", {
          alias: ' ',
          max: 75,
          min: 0,
          tickCount: 6
        });
        chart.scale("percent", {
          alias: ' ',
          max: 50,
          min: 0,
          tickCount: 6
        });
        chart.axis("name", {
          label: {
            textStyle: {
              fill: "#aaaaaa"
            },
            autoRotate: true
          },
          tickLine: {
            alignWithLabel: false,
            length: 0
          }
        });
        chart.axis("value", {
          position: "left",
          label: {
            textStyle: {
              fill: "#aaaaaa"
            }
          },
          title: {
            offset: 50
          }
        });
        chart.axis("percent", {
          position: "right",
          label: {
            textStyle: {
              fill: "#aaaaaa"
            },
            formatter(text) {
              return text + '%';
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
        var view1 = chart.view();
        view1.source(data1);
        view1
          .interval()
          .position("name*value")
          .color('kpi', (cValue) => {
            let color = '';
            switch(cValue) {
              case '时延':
                color = '#2387E6';
                break;
              case '丢包':
                color = '#22D0B1';
                break;
              case '抖动':
                color = '#FEF36B';
                break;
            }
            return color;
          })
          .opacity(1)
          .adjust([{
            type: "dodge",
            marginRatio: 1 / 32
          }]);
        var view2 = chart.view();
        view2.source(data1);
        view2
          .interval()
          .position("name*percent")
          .color('kpi', (cValue) => {
            let color = '';
            switch(cValue) {
              case '时延':
                color = '#2387E6';
                break;
              case '丢包':
                color = '#22D0B1';
                break;
              case '抖动':
                color = '#FEF36B';
                break;
            }
            return color;
          })
          .opacity(1)
          .adjust([{
            type: "dodge",
            marginRatio: 1 / 32
          }]);
        var view3 = chart.view();
        view3.source(data2);
        view3
          .line()
          .position("name*value")
          .color('kpi', (cValue) => {
            return '#FEF36B';
          })
          .opacity(1)
          .adjust([{
            type: "dodge",
            marginRatio: 1 / 32
          }]);
        chart.render();
      },
    }
  };
</script>

<style lang="less">
  .slamonitor {
    .top {
      height: 280px;
      .top-left {
        height: 280px;
        width: 70%;
      }
      .top-right {
        height: 280px;
        width: 30%;
      }
    }
    .bottom {
      margin: 20px 0;
      height: 500px;
    }
    .top5-switch-table {
      border-collapse: collapse;
      font-size: 12px;
      display: inline-block;
      border-radius: 2px;
      background-color: #161941;
      margin: 0 10px;
    }
    .top5-switch-table td {
      border: 1px solid #2a6893;
      border-collapse: collapse;
      padding: 4px 8px;
      color: #2a6893;
      min-width: 50px;
    }
    .top5-switch-table td.active {
      color: #50b5ec;
      font-weight: 600;
      background-color: #0e2b61;
    }
  }
</style>