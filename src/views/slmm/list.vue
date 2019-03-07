<template>
  <div>
    <div style="margin-top:20px;">
      <div class="normal-panel" style="width:100%;">
        <div class="normal-panel-content">
          <div class="normal-panel-title" style="height:50px;line-height: 30px;">专线列表</div>
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
          <b-table :columns="columns1" :data="data1" :pageData="pageData"></b-table>
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
