<template>
  <div class="normal-panel applylist">
    <div class="normal-panel-content">
      <div class="normal-panel-title">申请管理</div>
      <div class="query-condition">
        <label>申请时间区间：</label>
        <DatePicker type="daterange" placement="bottom-end" placeholder="请选择" style="width: 200px"></DatePicker>
        <label>申请类型：</label>
        <Select clearable style="width:100px">
          <Option :value="1" :key="1">1</Option>
          <Option :value="2" :key="2">2</Option>
        </Select>
        <Input class="query-key" placeholder="请输入查询内容" style="width: 300px" />
        <Button type="primary" @click="getData">查找</Button>
        <Button type="primary" @click="add">新增申请</Button>
        <Button type="primary" @click="edit">变更申请</Button>
        <Button type="primary" @click="itAdd">IT基础监控申请</Button>
      </div>
      <div class="query-condition2">
        <CheckboxGroup>
          <Checkbox label="已提交 15"></Checkbox>
          <Checkbox label="审批中 10"></Checkbox>
          <Checkbox label="已驳回 1"></Checkbox>
          <Checkbox label="已完结 20"></Checkbox>
        </CheckboxGroup>
        <a class="download" href="JavaScript: void(0)">采集探针下载</a>
      </div>
      <b-table class="data-table" :columns="columns" :data="data" @page-data-change="getData" :pageData="pageData"></b-table>
    </div>
  </div>
</template>

<script>
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
    mounted() {},
    methods: {
      getData() {

      },
      add() {
        this.$router.push({
          name: 'slmmapply',
          params: {}
        });
      },
      edit() {
        this.$router.push({
          name: 'editapply',
          params: {}
        });
      },
      itAdd() {
        this.$router.push({
          name: 'itapply',
          params: {}
        });
      }
    }
  };
</script>

<style lang="less">
  .applylist {
    width: 100%;
    .normal-panel-title {
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
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
          color: #53c2f8;
          border-radius: 1px;
          text-align: center;
        }
        .ivu-input-icon {
          width: 28px;
          height: 28px;
          line-height: 28px;
          color: #53c2f8;
        }
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
    .query-condition2 {
      background-color: #1A2440;
      margin-top: 20px;
      height: 50px;
      text-align: left;
      line-height: 50px;
      border-top: solid 1px rgba(143, 205, 240, 0.25);
      border-bottom: solid 1px rgba(143, 205, 240, 0.25);
      .ivu-checkbox-group {
        display: inline-block;
        margin-left: 25px;
        .ivu-checkbox-inner {
          margin-right: 5px;
          border: solid 1px rgba(143, 205, 240, 0.25);
          background-color: #1A2440;
        }
        .ivu-checkbox-group-item {
          margin-right: 15px;
        }
      }
      .download {
        float: right;
        margin-right: 30px;
        text-decoration: underline;
      }
    }
    .ivu-table-wrapper {
      margin-bottom: 20px;
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
    border: 4px solid #53c2f8;
    border-radius: 4px;
    -webkit-transform: rotate(0) scale(1);
    transform: rotate(0) scale(1);
  }
</style>