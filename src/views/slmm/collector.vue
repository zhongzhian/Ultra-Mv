<template>
  <div class="collector-home">
    <div class="content-wrapper">
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
                  <span>任务类型：
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
          </ul>
        </div>
        <div class="slmm-table-condition" style="margin-top:20px;">
          <ul class="slmm-table-condition-ul">
            <li>
              <div class="query-state">
                <Icon type="play" color="red" size="15"></Icon>
                <span>启动</span>
              </div>
            </li>
            <li>
              <div class="query-state">
                <Icon type="pause" color="red" size="15"></Icon>
                <span>暂停</span>
              </div>
            </li>
            <li>
              <div class="query-state" @click="isShowCreate = true">
                <Icon type="plus" color="red" size="15"></Icon>
                <span>添加</span>
              </div>
            </li>
            <li>
              <div class="query-state" @click="customDelete">
                <Icon type="android-delete" color="red" size="15"></Icon>
                <span>删除</span>
              </div>
            </li>
            <li>
              <div class="query-state">
                <Icon type="android-refresh" color="red" size="15"></Icon>
                <span>刷新</span>
              </div>
            </li>


              <!--后面两个是图例的展示-->
            <li class="li-right">
              <div class="query-state">
                <Icon type="play" color="red" size="15"></Icon>
                <span>停止</span>
              </div>
            </li>

            <li class="li-right">
              <div class="query-state">
                <Icon type="pause" color="red" size="15"></Icon>
                <span>运行</span>
              </div>
            </li>

          </ul>
        </div>
        <b-table
          @on-row-click=""
          :columns="columns1"
          :data="data1"
          :pageData="pageData"
          :pageSize="pageSize"
        ></b-table>
    </div>
    <div v-if="isShowCreate" class="normal-panel approval">
      <div class="mask"></div>
      <div class="normal-panel-content">
        <div class="normal-panel-title">新能SLA采集任务
          <Icon @click="isShowCreate = false" color="red"
                type="close-round" size="20" class="icon-right"></Icon></div>
        <Row class="table-title">
          <Col span="6"> <label>SLA任务采集名称</label></Col>
          <Col span="12"><Input placeholder="请输入采集任务名称"/></Col>
        </Row>
        <Row class="table-title">
          <label>选择SLA采集类型</label>
        </Row>
        <div class="table-content">
          <Row>
            <RadioGroup v-model="slaType" style="display: inline">
              <Col span="12" @click="selectShowTypes">
                <Tooltip content="各节点CE至对端PE段的SLA数据采集" placement="top-start">
                  <span @click="selectShowType = true">
                    <Radio label="1" >专线SAL采集</Radio></span></Tooltip>
              </Col>
              <Col span="12" @click="selectShowTypes">
                <Tooltip content="数据中心至其他专线SLA采集" placement="top">
                  <span @click="selectShowType = false">
                    <Radio label="2" >数据中心至其他专线SLA采集</Radio></span></Tooltip>
              </Col>
            </RadioGroup>
          </Row>
        </div>
        <!--不同的选择展现不同的内容-->
        <div class="special-line" v-if="selectShowType">
          <Row class="table-title">
            <label>选择门店/子公司CE</label>
          </Row>
          <div class="table-content">
            <Row class="device">
              <Col span="12">
                <p>
                  <label>选择省份：</label>
                  <comselect
                    @coms-select-change="alarmSelect"
                    :textLeft="true"
                    :selectDatas="alarmSelectData"
                    :selectValue="alarmSelectValue"
                    :selectName="alarmSelectName"
                  />
                </p>
              </Col>
              <Col span="8">
                <p>
                  <label>选择门店/子公司CE：</label>
                  <comselect
                    @coms-select-change="alarmSelect"
                    :textLeft="true"
                    :selectDatas="alarmSelectData"
                    :selectValue="alarmSelectValue"
                    :selectName="alarmSelectName"
                  />
                </p>
              </Col>

            </Row>
          </div>

          <Row class="table-title">
            <label>基础配置</label>
          </Row>
          <div class="table-content">
            <Row class="device">
              <Col span="12">
                <p>
                  <label>起始设备IP：</label>
                  <span> <Input placeholder="默认服务器IP"/></span>

                </p>
              </Col>
              <Col span="12">
                <p>
                  <label>采集周期</label>
                  <Select v-model="cycleValue" @on-change="selectOne" style="width:200px">
                    <Option v-for="item in cycle" :value="item.value" :key="item.value">{{item.name}} </Option>
                  </Select>
                </p>
              </Col>
              <Col span="12">
                <p>
                  <label>目的地CEIP</label>
                  <span><Input placeholder="通过选择专线自动带出" disabled v-model="aimCEIP"/></span>

                </p>
              </Col>
              <Col span="12">
                <p>
                  <label>目的地PEIP</label>
                  <span><Input placeholder="通过选择专线自动带出" disabled v-model="aimPEIP" /></span>
                </p>
              </Col>

            </Row>
          </div>
        </div>
        <div class="special-line" v-else>
          <Row class="table-title">
            <label>选择数据中心</label>
          </Row>
          <div class="table-content">
            <Row class="device">
              <Col span="8">
                <p>
                  <label>选择省份：</label>
                  <comselect
                    @coms-select-change="alarmSelect"
                    :textLeft="true"
                    :selectDatas="alarmSelectData"
                    :selectValue="alarmSelectValue"
                    :selectName="alarmSelectName"
                  />
                </p>
              </Col>
              <Col span="8">
                <p>
                  <label>选择数据中心CE：</label>
                  <comselect
                    @coms-select-change="alarmSelect"
                    :textLeft="true"
                    :selectDatas="alarmSelectData"
                    :selectValue="alarmSelectValue"
                    :selectName="alarmSelectName"
                  />
                </p>
              </Col>
              <Col span="8">
                <p>
                  <label>选择探针：</label>
                  <comselect
                    @coms-select-change="alarmSelect"
                    :textLeft="true"
                    :selectDatas="alarmSelectData"
                    :selectValue="alarmSelectValue"
                    :selectName="alarmSelectName"
                  />
                </p>
              </Col>
            </Row>
          </div>

          <Row class="table-title">
            <label>选择门店/子公司CE</label>
          </Row>
          <div class="table-content">
            <Row class="device">
              <Col span="12">
                <p>
                  <label>选择省份：</label>
                  <comselect
                    @coms-select-change="alarmSelect"
                    :textLeft="true"
                    :selectDatas="alarmSelectData"
                    :selectValue="alarmSelectValue"
                    :selectName="alarmSelectName"
                  />
                </p>
              </Col>
              <Col span="8">
                <p>
                  <label>选择门店/子公司CE：</label>
                  <comselect
                    @coms-select-change="alarmSelect"
                    :textLeft="true"
                    :selectDatas="alarmSelectData"
                    :selectValue="alarmSelectValue"
                    :selectName="alarmSelectName"
                  />
                </p>
              </Col>

            </Row>
          </div>

          <Row class="table-title">
            <label>基础配置</label>
          </Row>
          <div class="table-content">
            <Row class="device">
              <Col span="12">
                <p>
                  <label>起始设备IP：</label>
                  <span> <Input placeholder="默认服务器IP"/></span>

                </p>
              </Col>
              <Col span="12">
                <p>
                  <label>采集周期</label>
                  <Select v-model="cycleValue" @on-change="selectOne" style="width:200px">
                    <Option v-for="item in cycle" :value="item.value" :key="item.value">{{item.name}} </Option>
                  </Select>
                </p>
              </Col>
              <Col span="12">
                <p>
                  <label>目的地CEIP</label>
                  <span><Input placeholder="通过选择专线自动带出" disabled v-model="aimCEIP"/></span>

                </p>
              </Col>
              <Col span="12">
                <p>
                  <label>目的地PEIP</label>
                  <span><Input placeholder="通过选择专线自动带出" disabled v-model="aimPEIP" /></span>
                </p>
              </Col>

            </Row>
          </div>
        </div>

        <p class="btns">
          <Button type="primary" @click="isShowCreate = false">保存</Button>
          <Button type="primary" @click = "isShowCreate = false">取消</Button>
        </p>
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
        columns1: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "任务状态",
            key: "taskState"
          },
          {
            title: "任务名称",
            key: "taskName"
          },
          {
            title: "任务类型",
            key: "taskType"
          },
          {
            title: "电路编号",
            key: "circuitNumber"
          },
          {
            title: "周期",
            key: "cycle"
          },
          {
            title: "起始设备IP",
            key: "startIP"
          },
          {
            title: "目的设备IP",
            key: "endIP"
          }

        ],
        data1: [
          {
            taskState: "John Brown",
            taskName: 18,
            taskType: "New York No. 1 Lake Park",
            circuitNumber: "2016-10-03",
            cycle: "4M",
            startIP:"127.0.0.1",
            endIP: "255.255.255.255"
          },
        ],

        pageData: {
          total: 4,
          current: 1,
          pageSize: 10
        },
        pageSize: "small",
        isShowCreate: false,

        // 创建采集项中的属性
        slaType:'1',
        selectShowType:true,
        searchText:'',
        aimCEIP: '通过选择专线自动带出',
        aimPEIP: '通过选择专线自动带出',
        cycle:[
          {
          name: '5分钟',
          value:'5'
        },{
          name: '10分钟',
          value:'10'
        },{
          name: '15分钟',
          value:'15'
        },{
          name: '30分钟',
          value:'30'
        },{
          name: '60分钟',
          value:'60'
        },],
        cycleValue: '',


      };
    },
    mounted() {},
    methods: {

      selectOne(){
        console.log(this.cycleValue)
      },
      alarmSelect(){
        console.log("select funtion")
      },
      selectShowTypes(){
        console.log("nihao")
      },
      customDelete(){
        this.$Modal.confirm({
          title: '删除提示',
          content: '<p>确认删除所选的SLA采集任务吗？</p>',
          okText: '确认',
          cancelText: '取消',
          onOk:()=>{
            this.$Message.info("正在删除 ")
          }
        })
      }



    },

    computed:{

    }

  };
</script>

<style lang="less" scoped>
  .collector-home{
    .content-wrapper{
      padding: 10px 20px;
      height: 100%;
      width: 100%;
      overflow: auto;
      position: relative;
      .slmm-table-condition {
        position: relative;
        border-top: solid 1px #2a6893;
        border-bottom: solid 1px #2a6893;
        &-ul {
          list-style: none;
          font-size: 15px;
          width: 100%;
          height: 50px;
          padding: 10px 20px;
        }
        &-ul > li {
          float: left;
          margin-right: 30px;
          line-height: 30px;
          .query-state{
            font-size: 15px;
            width: 50px;
          }
        }
        &-ul > li.li-right {
          float: right;
          margin-right: 30px;
          line-height: 30px;
          .query-state{
            font-size: 15px;
            width: 50px;
          }
        }
      }
    }
    .approval {
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
        .normal-panel-title{
          height: 50px;
          width: 100%;
          line-height: 50px;
          font-size: 20px;
          text-align: center;
          .icon-right{
            float: right;
            padding-top: 10px;
          }
        }
        .table-title {
          height: 50px;
          text-align: left;
          padding-left: 25px;
          border-top: solid 1px rgba(143, 205, 240, 0.25);
          border-bottom: solid 1px rgba(143, 205, 240, 0.25);
          background-color: #1A2440;
          line-height: 50px;
          display: flex;
        }
      }
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
          width: 198px;
          height: 24px;
          text-align: left;
          color: #50b5ec;
          .ivu-input-wrapper.ivu-input{
            padding: 0px 7px;
            height: 24px;
          }
        }
        .ivu-row.device>.ivu-col>p {
          display: inline-block;
          background-color: #161941;
        }
        /*.ivu-row.device>.ivu-col>p>span:nth-of-type(1) {
          width: auto;
          min-width: 40px;
        }
        .ivu-row.device>.ivu-col>p>span:nth-of-type(2) {
          width: 100px;
          padding-right: 8px;
        }*/
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

    }
  }



</style>
