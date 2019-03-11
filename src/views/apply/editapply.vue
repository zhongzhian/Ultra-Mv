<template>
  <div class="normal-panel editapply">
    <div class="normal-panel-content">
      <div class="normal-panel-title">监控变更申请</div>
      <Row class="table-title first">
        <label class="title">选择变更类型</label>
        <RadioGroup value="专线变更申请1">
          <Radio label="专线变更申请1"></Radio>
          <Radio label="专线变更申请2"></Radio>
        </RadioGroup>
      </Row>
      <Row class="table-title">
        <label class="title">选择监控线路</label>
        <label>选择省份：</label>
        <Select clearable style="width:100px">
          <Option :value="1" :key="1">1</Option>
          <Option :value="2" :key="2">2</Option>
        </Select>
        <label>选择电路编号：</label>
        <Select clearable style="width:150px">
          <Option :value="1" :key="1">1</Option>
          <Option :value="2" :key="2">2</Option>
        </Select>
      </Row>
      <Row class="table-content">
        <Row class="one-item">
          <div class="normal-panel-content">
            <p>
              <Icon type="android-delete" size="20" color="#bbb"></Icon>
              <Icon color="green" size="20" type="checkmark-circled"></Icon>
              专线名称：重庆MV60006
              <span><Icon type="chevron-up"></Icon>收起</span>
            </p>
            <div class="item-content">
              <Row>
                <Col span="12">原线路信息</Col>
                <Col span="12">变更后线路信息</Col>
              </Row>
              <Row>
                <Col span="12">
                <label><span class="red">*</span>选择监控设备：</label>
                <span>12.3.4.1</span>
                </Col>
                <Col span="12">
                <label><span class="red">*</span>选择监控设备：</label>
                <Input value="12.3.4.1" disabled style="width: 150px" />
                </Col>
              </Row>
              <Row>
                <Col span="12">
                <label><span class="red">*</span>子网掩码：</label>
                <span>255.255.255.0</span>
                </Col>
                <Col span="12">
                <label><span class="red">*</span>子网掩码：</label>
                <Input value="255.255.255.0" disabled style="width: 150px" />
                </Col>
              </Row>
              <Row>
                <Col span="12">
                <label><span class="red">*</span>SNMP版本：</label>
                <span>snmpv1</span>
                </Col>
                <Col span="12">
                <label><span class="red">*</span>SNMP版本：</label>
                <Input value="snmpv1" placeholder="请输入SNMP版本" style="width: 150px" />
                </Col>
              </Row>
              <Row>
                <Col span="12">
                <label>端口：</label>
                <span>123</span>
                </Col>
                <Col span="12">
                <label>端口：</label>
                <Input value="123" placeholder="请输入端口" style="width: 150px" />
                </Col>
              </Row>
              <Row>
                <Col span="12">
                <label><span class="red">*</span>共同体名称：</label>
                <span>共同体1</span>
                </Col>
                <Col span="12">
                <label><span class="red">*</span>共同体名称：</label>
                <Input value="共同体1" placeholder="请输入共同体名称" style="width: 150px" />
                </Col>
              </Row>
            </div>
          </div>
        </Row>
        <Row class="one-item">
          <div class="normal-panel-content">
            <p>
              <Icon type="android-delete" size="20" color="#bbb"></Icon>
              <Icon color="red" size="20" type="close-circled"></Icon>
              专线名称：重庆MV60006
              <span><Icon type="chevron-down"></Icon>展开</span>
            </p>
          </div>
        </Row>
      </Row>
    </div>
    <p class="btns">
      <Button type="primary">保存草稿</Button>
      <Button type="primary" class="notcheched">提交</Button>
      <span class="tip">所有设备经NMS测试，均可连接，才能提交至下一步</span>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    mounted() {},
    methods: {}
  };
</script>

<style lang="less">
  .editapply {
    .ivu-select {
      color: #53c2f8;
      margin-right: 25px;
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
    .btns {
      .tip {
        color: #F4CCA8;
        position: absolute;
        left: 50%;
        padding-left: 120px;
      }
      margin-top: 10px;
      line-height: 50px;
      text-align: center;
      .ivu-btn.ivu-btn-primary {
        border-radius: 1px;
        height: 28px;
        line-height: 28px;
        padding: 0 15px;
        margin-left: 30px;
      }
      .notcheched {
        background-color: #A0A2B5;
        border: #A0A2B5;
      }
    }
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
    .table-content {
      background-color: #161941;
      padding: 15px 20px;
      border-bottom: solid 1px rgba(143, 205, 240, 0.25);
      margin-bottom: 20px;
      .one-item {
        background-color: #212D52;
        padding: 10px;
        border-bottom: 1px dotted rgba(143, 205, 240, 0.25);
        p {
          height: 35px;
          line-height: 35px;
          border-bottom: solid 1px rgba(143, 205, 240, 0.25);
          .ivu-icon-android-delete {
            float: left;
            margin-left: 10px;
            margin-top: 7px;
          }
          .ivu-icon-checkmark-circled,
          .ivu-icon-close-circled {
            display: inline-block;
            position: absolute;
            left: 50%;
            top: 8px;
            margin-left: -150px;
          }
          span {
            float: right;
            margin-right: 10px;
            color: #9BCFFD;
            .ivu-icon {
              margin-right: 5px;
            }
          }
        }
        .item-content {
          padding-bottom: 10px;
          .ivu-row {
            height: 40px;
            line-height: 40px;
            label {
              display: inline-block;
              width: 150px;
              text-align: right;
            }
          }
          .ivu-row>.ivu-col>span {
            display: inline-block;
            width: 150px;
            text-align: left;
          }
        }
      }
      .one-item:last-child {
        border-bottom: none;
      }
    }
    .table-title {
      height: 50px;
      text-align: left;
      padding-left: 25px;
      border-top: solid 1px rgba(143, 205, 240, 0.25);
      border-bottom: solid 1px rgba(143, 205, 240, 0.25);
      background-color: #161941;
      line-height: 50px;
      label.title {
        display: inline-block;
        height: 50px;
        padding-right: 25px;
        border-right: solid 1px rgba(143, 205, 240, 0.25);
        margin-right: 25px;
      }
      .ivu-radio-group {
        .ivu-radio-wrapper {
          margin-right: 25px;
        }
      }
    }
    .table-title.first {
      margin-bottom: 20px;
    }
    .red {
      color: red;
      font-weight: 800;
      margin-right: 3px;
    }
  }
</style>