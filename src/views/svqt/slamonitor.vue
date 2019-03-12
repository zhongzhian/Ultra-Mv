// 网管sla服务质量监控
<template>
  <div class="slamonitor">
    <div class="top">
      <div class="normal-panel fl top-left">
        <div class="normal-panel-content">
          <div class="normal-panel-title">客户SLA</div>
          <div id="contrastChart"></div>
        </div>
      </div>
      <div class="normal-panel fl top-right">
        <div class="normal-panel-content2">
          <div class="normal-panel-title">SLA电路TOP5</div>
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
        <div class="normal-panel-title">活动告警</div>
        <div class="query-condition">
          <label>省份：</label>
          <Select clearable style="width:150px">
            <Option :value="1" :key="1">1</Option>
            <Option :value="2" :key="2">2</Option>
          </Select>
          <Input class="query-key" placeholder="请输入查询内容" style="width: 300px" />
          <Button type="primary">查找</Button>
          <Button type="primary">导出</Button>
        </div>
        <b-table class="data-table" :columns="columns" :data="data" @page-data-change="getData" :pageData="pageData" pageSize="small"></b-table>
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
          total: 4,
          current: 1,
          pageSize: 10
        },
        columns: [{
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
        data: [{
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
      };
    },
    mounted() {
      this.kpiTop5();
      this.contrastChart();
    },
    methods: {
      getData() {

      },
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
        var data = [{
            kpi: "时延",
            time: "10:00",
            value: 30
          },
          {
            kpi: "丢包",
            time: "10:00",
            value: 10
          },
          {
            kpi: "抖动",
            time: "10:00",
            value: 20
          },
          {
            kpi: "时延",
            time: "10:30",
            value: 10
          },
          {
            kpi: "抖动",
            time: "10:30",
            value: 35
          },
          {
            kpi: "丢包",
            time: "10:30",
            value: 40
          },
          {
            kpi: "时延",
            time: "11:00",
            value: 25
          },
          {
            kpi: "丢包",
            time: "11:00",
            value: 45
          },
          {
            kpi: "抖动",
            time: "11:00",
            value: 10
          }
        ];
        var chart = new G2.Chart({
          container: "contrastChart",
          forceFit: true,
          height: 250,
          padding: ["auto", 48, 50, 48]
        });
        chart.source(data);
        chart.scale("value", {
          alias: ' ',
          max: 75,
          min: 0,
          tickCount: 6
        });
        chart.scale("percent", {
          alias: ' ',
          max: 75,
          min: 0,
          tickCount: 6
        });
        chart.axis("time", {
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
        chart.legend({
          position: "top-right",
          marker: "circle"
        });
        chart
          .line()
          .position("time*value")
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
        chart.render();
      },
    }
  };
</script>

<style lang="less">
  .slamonitor {
    .query-condition {
      /*background-color: #1A2440;*/
      height: 50px;
      text-align: left;
      line-height: 50px;
      /*border-top: solid 1px rgba(143, 205, 240, 0.25);
      border-bottom: solid 1px rgba(143, 205, 240, 0.25);*/
      label {
        margin-left: 15px;
      }
      .ivu-input-wrapper.query-key {
        margin-left: 30px;
        .ivu-input {
          border: 1px solid rgba(143, 205, 240, 0.25);
          height: 28px;
          background-color: #161941;
          color: #53c2f8;
          border-radius: 1px;
        }
        .ivu-input-icon {
          width: 28px;
          height: 28px;
          line-height: 28px;
          color: #53c2f8;
        }
      }
      .ivu-select {
        color: #53c2f8;
        .ivu-select-selection {
          height: 28px;
          border: 1px solid rgba(143, 205, 240, 0.25);
          background-color: #161941;
          border-radius: 1px;
        }
        .ivu-select-placeholder,
        .ivu-select-selected-value {
          height: 28px;
          line-height: 28px;
          color: #53c2f8;
          text-align: center;
        }
        .ivu-select-placeholder {
          color: #3175a4;
        }
        .ivu-icon {
          color: #53c2f8;
        }
      }
      .ivu-btn.ivu-btn-primary {
        height: 28px;
        line-height: 28px;
        color: #53c2f8;
        border: 1px solid rgba(143, 205, 240, 0.25);
        border-radius: 1px;
        background-color: #043171;
        padding: 0 15px;
        margin-left: 10px;
      }
    }
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
      width: 100%;
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
    .ivu-table-header {
      color: #9798b8;
    }
  }
</style>