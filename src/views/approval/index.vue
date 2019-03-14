<template>
  <div class="normal-panel approval-list">
    <div class="normal-panel-content">
      <div class="normal-panel-title">审批管理</div>
      <div class="query-condition">
        <label>时间区间：</label>
        <DatePicker type="daterange" placement="bottom-end" placeholder="请选择" style="width: 200px"></DatePicker>
        <label>申请类型：</label>
        <Select clearable style="width:100px">
          <Option :value="1" :key="1">1</Option>
          <Option :value="2" :key="2">2</Option>
        </Select>
        <Input class="query-key" placeholder="请输入查询内容" style="width: 300px" />
        <Button type="primary" @click="getData">查找</Button>
      </div>
      <div class="query-condition2">
        <CheckboxGroup>
          <Checkbox label="待审核 15"></Checkbox>
          <Checkbox label="已驳回 1"></Checkbox>
          <Checkbox label="已完结 32"></Checkbox>
        </CheckboxGroup>
      </div>
      <b-table class="data-table" @on-row-click="approval" :columns="columns" :data="data" @page-data-change="getData" :pageData="pageData" pageSize="small"></b-table>
    </div>
    <div v-if="isshowApproval" class="normal-panel approval">
      <div class="mask"></div>
      <div class="normal-panel-content">
        <div class="normal-panel-title">审批管理<Icon @click="isshowApproval = false" type="close-round"></Icon></div>
        <Row class="table-title">
          <label>申请基本信息</label>
        </Row>
        <div class="table-content">
          <Row>
            <Col span="12">
            <label>申请客户：</label>
            <span>万科</span>
            </Col>
            <Col span="12">
            <label>申请类型：</label>
            <span>新增专线监控</span>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <label>申请人：</label>
            <span>胡玩玩</span>
            </Col>
            <Col span="12">
            <label>申请时间：</label>
            <span>2019-10-23</span>
            </Col>
          </Row>
          <Row class="desc">
            <Col span="24">
            <label>申请描述：</label>
            <span>申请描述申请描述申请描述申请描述申请描述申请描述申请描述申请描述申请描述申请描述申请描述申请描述申请描述申请描述申请描述申请描述申请描述</span>
            </Col>
          </Row>
        </div>
        <Row class="table-title">
          <label>申请监控设备</label>
        </Row>
        <div class="table-content">
          <Row class="device">
            <Col span="8">
            <p>
              <label>设备区域：</label>
              <span>深圳</span>
              <label class="">设备IP：</label>
              <span>123.4.3.2</span>
            </p>
            </Col>
            <Col span="8">
            <p>
              <label>设备区域：</label>
              <span>深圳</span>
              <label class="">设备IP：</label>
              <span>123.4.3.2</span>
            </p>
            </Col>
            <Col span="8">
            <p>
              <label>设备区域：</label>
              <span>深圳</span>
              <label class="">设备IP：</label>
              <span>123.4.3.2</span>
            </p>
            </Col>
            <Col span="8">
            <p>
              <label>设备区域：</label>
              <span>深圳</span>
              <label class="">设备IP：</label>
              <span>123.4.3.2</span>
            </p>
            </Col>
            <Col span="8">
            <p>
              <label>设备区域：</label>
              <span>深圳</span>
              <label class="">设备IP：</label>
              <span>123.4.3.2</span>
            </p>
            </Col>
          </Row>
        </div>
        <Row class="table-title">
          <label>审批建议</label>
        </Row>
        <div class="table-content description">
          <Input type="textarea" placeholder="请输入审批建议"></Input>
        </div>
        <p class="btns">
          <Button type="primary">通过</Button>
          <Button type="primary">驳回</Button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isshowApproval: false,
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
    mounted() {},
    methods: {
      getData() {

      },
      approval() {
        this.isshowApproval = true;
      }
    }
  };
</script>

<style lang="less">
  .approval-list {
    width: 100%;
    .approval {
      .btns {
        margin-bottom: 20px;
        line-height: 50px;
        text-align: center;
        .ivu-btn.ivu-btn-primary {
          border-radius: 1px;
          height: 28px;
          line-height: 28px;
          padding: 0 15px;
          margin-left: 30px;
        }
      }
      .description {
        padding: 15px 25px;
        textarea {
          height: 120px;
          background-color: #161941;
        }
      }
      .ivu-input {
        border: 1px solid rgba(143, 205, 240, 0.25);
        height: 28px;
        background-color: #161941;
        color: #50b5ec;
        border-radius: 1px;
      }
      .table-title {
        height: 50px;
        text-align: left;
        padding-left: 25px;
        border-top: solid 1px rgba(143, 205, 240, 0.25);
        border-bottom: solid 1px rgba(143, 205, 240, 0.25);
        background-color: #1A2440;
        line-height: 50px;
      }
      .table-content {
        background-color: #1A2440;
        margin-bottom: 20px;
        border-bottom: solid 1px rgba(143, 205, 240, 0.25);
        .ivu-row {
          text-align: left;
          line-height: 40px;
          label {
            display: inline-block;
            width: 150px;
            text-align: right;
          }
        }
        .device {
          text-align: center;
          label {
            width: auto;
            padding-left: 8px;
          }
          .ivu-col {
            padding: 10px 0;
          }
        }
        .ivu-row>.ivu-col>span,
        .ivu-row.device>.ivu-col>p>span {
          display: inline-block;
          width: 150px;
          text-align: left;
          color: #50b5ec;
        }
        .ivu-row.device>.ivu-col>p {
          display: inline-block;
          background-color: #161941;
        }
        .ivu-row.device>.ivu-col>p>span:nth-of-type(1) {
          width: auto;
          min-width: 40px;
        }
        .ivu-row.device>.ivu-col>p>span:nth-of-type(2) {
          width: 100px;
          padding-right: 8px;
        }
        .ivu-row.desc {
          label {
            float: left;
          }
          span {
            width: 50%;
            line-height: 20px;
            padding-top: 10px;
          }
        }
      }
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      z-index: 98;
      padding: 20px 15%;
      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.6;
        z-index: 99;
      }
      .normal-panel-content {
        background-color: rgba(33, 41, 72);
        height: 100%;
        z-index: 100;
        overflow: auto;
      }
    }
    .normal-panel-title {
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      .ivu-icon {
        float: right;
        font-size: 20px;
        color: red;
        margin-top: 15px;
        cursor: pointer;
      }
    }
    .query-condition {
      background-color: #1A2440;
      height: 50px;
      text-align: left;
      line-height: 50px;
      border-top: solid 1px rgba(143, 205, 240, 0.25);
      border-bottom: solid 1px rgba(143, 205, 240, 0.25);
      label {
        margin-left: 25px;
      }
      .ivu-date-picker {
        display: inline-block;
        .ivu-input {
          border: 1px solid rgba(143, 205, 240, 0.25);
          height: 28px;
          background-color: #161941;
          color: #50b5ec;
          border-radius: 1px;
          text-align: center;
        }
        .ivu-input-icon {
          width: 28px;
          height: 28px;
          line-height: 28px;
          color: #50b5ec;
        }
      }
      .ivu-input-wrapper.query-key {
        margin-left: 30px;
        .ivu-input {
          border: 1px solid rgba(143, 205, 240, 0.25);
          height: 28px;
          background-color: #161941;
          color: #50b5ec;
          border-radius: 1px;
        }
        .ivu-input-icon {
          width: 28px;
          height: 28px;
          line-height: 28px;
          color: #50b5ec;
        }
      }
      .ivu-select {
        color: #50b5ec;
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
          color: #50b5ec;
          text-align: center;
        }
        .ivu-select-placeholder {
          color: #3175a4;
        }
        .ivu-icon {
          color: #50b5ec;
        }
      }
      .ivu-btn.ivu-btn-primary {
        height: 28px;
        line-height: 28px;
        color: #50b5ec;
        border: 1px solid rgba(143, 205, 240, 0.25);
        border-radius: 1px;
        background-color: #043171;
        padding: 0 15px;
        margin-left: 10px;
      }
    }
    .query-condition2 {
      background-color: #1A2440;
      margin-top: 20px;
      height: 50px;
      text-align: left;
      line-height: 50px;
      border-top: solid 1px rgba(143, 205, 240, 0.25);
      border-bottom: solid 1px rgba(143, 205, 240, 0.25);
      .download {
        float: right;
        margin-right: 30px;
        text-decoration: underline;
      }
    }
    .ivu-checkbox-group {
      display: inline-block;
      margin-left: 25px;
      .ivu-checkbox-group-item {
        margin-right: 15px;
      }
    }
    .ivu-checkbox-inner {
      margin-right: 5px;
      border: solid 1px rgba(143, 205, 240, 0.25);
      background-color: #1A2440;
    }
    .ivu-table-wrapper {
      margin-bottom: 20px;
      .ivu-checkbox-inner {
        margin-right: 0;
      }
    }
     ::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: #3175a4;
    }
     :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #3175a4;
    }
     ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #3175a4;
    }
     :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #3175a4;
    }
    .data-table {
      margin-bottom: 20px;
    }
  }
  
  .ivu-checkbox-checked .ivu-checkbox-inner:after {
    width: 0;
    height: 0;
    top: 2px;
    left: 2px;
    border: 4px solid #50b5ec;
    border-radius: 4px;
    -webkit-transform: rotate(0) scale(1);
    transform: rotate(0) scale(1);
  }
</style>