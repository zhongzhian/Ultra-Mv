<template>
  <div class="normal-panel slmmapplyinfo">
    <div class="normal-panel-content">
      <div class="normal-panel-title">专线监控申请</div>
      <div class="apply-name">
        <label>专线名称</label>
        <Input disabled class="query-key" placeholder="请输入专线名称" style="width: 300px" />
      </div>
      <Row class="select-input">
        <Col span="5">
        <label>监控线路</label>
        </Col>
      </Row>
      <div class="items">
        <div class="one-item">
          <Row class="title">
            <Col span="3">省份</Col>
            <Col span="4"><span class="red">*</span>电路编号</Col>
            <Col span="4"><span class="red">*</span>监控设备</Col>
            <Col span="4"><span class="red">*</span>子网掩码</Col>
            <Col span="3"><span class="red">*</span>SNMP版本</Col>
            <Col span="2">端口</Col>
            <Col span="2"><span class="red">*</span>共同体名称</Col>
            <Col span="2"></Col>
          </Row>
          <Row class="content">
            <Col span="3">
            <Input disabled placeholder="省份" style="width: 100px" />
            </Col>
            <Col span="4">
            <Input disabled style="width: 150px" />
            </Col>
            <Col span="4">
            <Input disabled style="width: 150px" />
            </Col>
            <Col span="4">
            <Input disabled style="width: 150px" />
            </Col>
            <Col span="3">
            <Select disabled clearable style="width:100px">
              <Option :value="1" :key="1">SNMP1</Option>
              <Option :value="2" :key="2">SNMP2</Option>
            </Select>
            </Col>
            <Col span="2">
            <Input disabled placeholder="请输入" style="width: 70px" />
            </Col>
            <Col span="2">
            <Input disabled placeholder="请输入" style="width: 100px" />
            </Col>
            <Col span="2">
            </Col>
          </Row>
        </div>
        <div class="one-item">
          <Row class="title">
            <Col span="3">省份</Col>
            <Col span="4"><span class="red">*</span>电路编号</Col>
            <Col span="4"><span class="red">*</span>监控设备</Col>
            <Col span="4"><span class="red">*</span>子网掩码</Col>
            <Col span="3"><span class="red">*</span>SNMP版本</Col>
            <Col span="2">端口</Col>
            <Col span="2"><span class="red">*</span>共同体名称</Col>
            <Col span="2"></Col>
          </Row>
          <Row class="content">
            <Col span="3">
            <Input disabled placeholder="省份" style="width: 100px" />
            </Col>
            <Col span="4">
            <Input disabled style="width: 150px" />
            </Col>
            <Col span="4">
            <Input disabled style="width: 150px" />
            </Col>
            <Col span="4">
            <Input disabled style="width: 150px" />
            </Col>
            <Col span="3">
            <Select disabled clearable style="width:100px">
              <Option :value="1" :key="1">SNMP1</Option>
              <Option :value="2" :key="2">SNMP2</Option>
            </Select>
            </Col>
            <Col span="2">
            <Input disabled placeholder="请输入" style="width: 70px" />
            </Col>
            <Col span="2">
            <Input disabled placeholder="请输入" style="width: 100px" />
            </Col>
            <Col span="2">
            </Col>
          </Row>
        </div>
      </div>
      <Row class="table-title">
        <label>ICMP发现协议</label>
      </Row>
      <Row class="icmp-content">
        <Col span="5">
        <label>ICMP PING包大小：</label>
        <Input disabled placeholder="PING包大小" style="width: 100px" value="32" />
        </Col>
        <Col span="5">
        <label>ICMP重复次数：</label>
        <Input disabled placeholder="ICMP重复次数" style="width: 100px" value="2" />
        </Col>
        <Col span="5">
        <label>超时时间毫秒：</label>
        <Input disabled placeholder="超时时间毫秒" style="width: 100px" value="380" />
        </Col>
      </Row>
      <Row class="table-title">
        <label>申请描述</label>
      </Row>
      <Row class="description">
        <Input disabled type="textarea" placeholder="请输入申请描述"></Input>
      </Row>
    </div>
    <p class="btns">
      <Button type="primary" @click="back">返回监控申请列表</Button>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    mounted() {},
    methods: {
      back() {
        this.$router.push({
          name: 'applylist',
          params: {}
        });
      }
    }
  };
</script>

<style lang="less">
  .slmmapplyinfo {
    .btns {
      .tip {
        color: #F4CCA8;
        position: absolute;
        left: 50%;
        margin-left: 120px;
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
    width: 100%;
    .description {
      padding: 15px 25px;
      background-color: #1A2440;
      border-bottom: solid 1px rgba(143, 205, 240, 0.25);
      margin-bottom: 20px;
      textarea {
        height: 120px;
        background-color: #161941;
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
    }
    .icmp-content {
      background-color: #1A2440;
      height: 60px;
      line-height: 60px;
      margin-bottom: 20px;
      border-bottom: solid 1px rgba(143, 205, 240, 0.25);
    }
    .normal-panel-title {
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
    }
    .apply-name {
      text-align: left;
      margin-left: 25px;
      label {
        margin-right: 15px;
      }
    }
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
    .select-input {
      background-color: #1A2440;
      height: 50px;
      text-align: left;
      line-height: 50px;
      border-top: solid 1px rgba(143, 205, 240, 0.25);
      border-bottom: solid 1px rgba(143, 205, 240, 0.25);
      padding-left: 25px;
      margin-top: 20px;
      .ivu-btn.ivu-btn-primary {
        border-radius: 1px;
        height: 28px;
        line-height: 28px;
        padding: 0 15px;
        margin-left: 10px;
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
    .items {
      min-height: 50px;
      padding: 25px;
      text-align: left;
      background-color: #1A2440;
      margin-bottom: 20px;
      border-bottom: solid 1px rgba(143, 205, 240, 0.25);
      .ivu-btn.ivu-btn-primary {
        height: 28px;
        line-height: 28px;
        color: #50b5ec;
        border: 1px solid rgba(143, 205, 240, 0.25);
        border-radius: 1px;
        background-color: #043171;
        padding: 0 15px;
        float: right;
      }
      .one-item {
        margin-bottom: 10px;
        .title {
          line-height: 28px;
        }
        .content {
          padding: 5px 0;
          .ivu-col>.ivu-icon {
            margin-top: 4px;
            margin-left: 10px;
          }
        }
      }
    }
    .red {
      color: red;
      font-weight: 800;
      margin-right: 3px;
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
  }
</style>