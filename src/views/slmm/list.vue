<template>
  <div>
    <div style="margin-top:20px;">
      <div class="normal-panel" style="width:100%;">
        <div class="normal-panel-content">
          <div class="normal-panel-title" style="height:50px;line-height: 30px;">专线列表</div>
          <div class="slmm-table-condition">
            <ul class="slmm-table-condition-ul">
              <li>省份：
                <comselect
                  @coms-select-change="alarmSelect"
                  :textLeft="true"
                  :selectDatas="alarmSelectData"
                  :selectValue="alarmSelectValue"
                  :selectName="alarmSelectName"
                />
              </li>
              <li>
                <span>状态：
                  <comselect
                    @coms-select-change="alarmSelect"
                    :textLeft="true"
                    :selectDatas="alarmSelectData"
                    :selectValue="alarmSelectValue"
                    :selectName="alarmSelectName"
                  />
                </span>
              </li>
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
                  <Button size="small" class="condition-btn">查找</Button>
                </span>
              </li>
              <li>
                <span>
                  <Button size="small" class="condition-btn">导出</Button>
                </span>
              </li>
            </ul>
          </div>
          <div class="slmm-table-condition" style="margin-top:20px;">
            <ul class="slmm-table-condition-ul">
              <li>
                <Checkbox v-model="isDaishenhe">待审核 15</Checkbox>
              </li>
              <li>
                <Checkbox v-model="isYibohui">已驳回 1</Checkbox>
              </li>
              <li>
                <Checkbox v-model="isYiwanjie">已完结 32</Checkbox>
              </li>
            </ul>
          </div>
          <b-table
            @on-row-click="monitor"
            :columns="columns1"
            :data="data1"
            :pageData="pageData"
            :pageSize="pageSize"
          ></b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comselect from "@/components/ComSelect.vue";

export default {
  components: { comselect },
  data() {
    return {
      isDaishenhe:false,
      isYibohui:false,
      isYiwanjie:false,
      alarmSelectValue: "1",
      alarmSelectName: "驴打滚",
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
      ],
      searchText: "",
      daishenhe: false,
      yibohui: false,
      yiwanjie: false,
      pageData: {
        total: 4,
        current: 1,
        pageSize: 10
      },
      pageSize: "small",
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
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
  methods: {
    alarmSelect(name) {
      // console.log(name);
      this.alarmSelectValue = name;
      let aa = _.find(this.alarmSelectData, function(d) {
        return d.value === name;
      });
      this.alarmSelectName = aa.name;
    },
    monitor(item, index) {
      // this.isshowApproval = true;
      this.$router.push({
        name: "slmonitor",
        params: {}
      });
    }
  }
};
</script>

<style lang="less" scoped>
.slmm-table-condition {
  position: relative;
  border-top: solid 1px #2a6893;
  border-bottom: solid 1px #2a6893;
  &-ul {
    list-style: none;
    font-size: 12px;
    width: 100%;
    height: 50px;
    padding: 10px 20px;
  }
  &-ul > li {
    float: left;
    margin-right: 30px;
    line-height: 30px;
  }
  &-alarmpoint {
    background-color: red;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
  }
  &-alarmlabel {
    margin-right: 20px;
    font-size: 12px;
    color: #ccc !important;
  }
}
</style>
