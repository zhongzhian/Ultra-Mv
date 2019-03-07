<template>
  <div>
    <div style="margin-top:20px;height:200px;">
      <div class="normal-panel fl" style="width:50%;height:200px;">
        <div class="normal-panel-content2">
          <div class="normal-panel-title">专线基本信息</div>
          <div id="proviceChart"></div>
        </div>
      </div>
      <div class="normal-panel fl" style="width:50%;">
        <div class="normal-panel-content2" style="height:200px;">
          <div class="normal-panel-title">带宽利用率</div>
          <div id="appTop5Chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
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
.dropdown-menu {
  width: 200px;
  left: 0;
}
</style>
