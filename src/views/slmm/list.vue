<template>
  <div>
    <div style="margin-top:20px;">
      <div class="normal-panel" style="width:100%;">
        <div class="normal-panel-content">
          <div class="normal-panel-title" style="height:50px;line-height: 30px;">专线列表</div>
          <div class="slmm-table-condition">
            <ul class="slmm-table-condition-ul">
              <li>
                省份：
                <comselect
                  @coms-select-change="provinceSelect"
                  :textLeft="true"
                  :selectDatas="provinceSelectData"
                  :selectValue="provinceSelectValue"
                  :selectName="provinceSelectName"
                />
              </li>
              <li>
                <span>
                  监控状态：
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
                  <Button @click="getTableDatas" size="small" class="condition-btn">查找</Button>
                </span>
              </li>
              <!-- <li>
                <span>
                  <Button size="small" class="condition-btn">导出</Button>
                </span>
              </li>-->
            </ul>
          </div>
          <div class="slmm-table-condition" style="margin-top:20px;">
            <ul class="slmm-table-condition-ul">
              <li @click="addDedicate" style="cursor:pointer;">
                <Icon
                  size="20"
                  color="#03a9f4"
                  type="android-add"
                  style="vertical-align: top;line-height: 30px;cursor:pointer;margin-right:5px;"
                />添加
              </li>
              <li @click="editDedicate" style="cursor:pointer;">
                <Icon
                  size="20"
                  color="#03a9f4"
                  type="edit"
                  style="vertical-align: top;line-height: 30px;cursor:pointer;margin-right:5px;"
                />修改
              </li>
              <li @click="delDedicate" style="cursor:pointer;">
                <Icon
                  size="20"
                  color="#03a9f4"
                  type="android-delete"
                  style="vertical-align: top;line-height: 30px;cursor:pointer;margin-right:5px;"
                />删除
              </li>
              <li @click="importDedicate" style="cursor:pointer;">
                <Icon
                  size="20"
                  color="#03a9f4"
                  type="ios-cloud-upload"
                  style="vertical-align: top;line-height: 30px;cursor:pointer;margin-right:5px;"
                />导入
              </li>
              <li @click="exportDedicate" style="cursor:pointer;">
                <Icon
                  size="20"
                  color="#03a9f4"
                  type="ios-cloud-download"
                  style="vertical-align: top;line-height: 30px;cursor:pointer;margin-right:5px;"
                />导出
              </li>
            </ul>
          </div>
          <!-- <b-table
            @on-row-click="monitor"
            :columns="columns1"
            :data="data1"
            :pageData="pageData"
            :pageSize="pageSize"
          ></b-table>-->
          <f-table
            @on-select="rowSelect"
            @on-row-click="rowClick"
            :columns="columns1"
            :dataSource="data1"
          ></f-table>
        </div>
      </div>
    </div>

    <div v-if="showAddNew" class="normal-panel alarmDetail-modal">
      <div class="mask"></div>
      <div class="normal-panel-content">
        <Form ref="formValidate" :model="newDedicateObj" :rules="ruleValidate" :label-width="85">
          <div class="normal-panel-title">
            添加专线资源
            <Icon @click="showAddNew = false" type="close-round"></Icon>
          </div>
          <Row class="table-title">
            <label>选择添加资源类型</label>
          </Row>
          <div class="table-content">
            <Row>
              <Col span="24">
                <RadioGroup v-model="templateType">
                  <Radio label="联通专线"></Radio>
                  <Radio label="内网设备"></Radio>
                </RadioGroup>
              </Col>
            </Row>
          </div>
          <Row class="table-title">
            <label>基础属性</label>
          </Row>
          <div class="table-content">
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="客户名称">
                    <Input
                      v-model="newDedicateObj.CUSTOMERADDRESS"
                      size="small"
                      style="width: 400px"
                    />
                  </FormItem>
                </li>
              </ul>
            </div>
            <div v-if="templateType === '联通专线'" class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="产品编号">
                    <Input
                      v-model="newDedicateObj.PRODUCTNUMBER"
                      size="small"
                      style="width: 150px"
                    />
                  </FormItem>
                </li>
                <li>
                  <FormItem label="电路编号" prop="CIRCURTSTATE">
                    <Input v-model="newDedicateObj.CIRCURTSTATE" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
              </ul>
            </div>
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="国家" prop="COUNTRY">
                    <Select
                      v-model="newDedicateObj.COUNTRY"
                      @on-change="countryChange('add')"
                      placeholder="请选择"
                      size="small"
                      :style="{'width':cswidth?cswidth:'200px'}"
                    >
                      <Option v-for="item in newCountrys" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="省份" prop="PROVINCE">
                    <Select
                      v-model="newDedicateObj.PROVINCE"
                      @on-change="provinceChange('add')"
                      placeholder="请选择"
                      size="small"
                      :style="{'width':cswidth?cswidth:'200px'}"
                    >
                      <Option v-for="item in newProvinces" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="地市" prop="CITY">
                    <Select
                      v-model="newDedicateObj.CITY"
                      @on-change="cityChange('add')"
                      placeholder="请选择"
                      size="small"
                      :style="{'width':cswidth?cswidth:'200px'}"
                    >
                      <Option v-for="item in newCitys" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                  </FormItem>
                </li>
              </ul>
            </div>
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="装机地址" prop="INSTALLADDRESS">
                    <Input
                      v-model="newDedicateObj.INSTALLADDRESS"
                      size="small"
                      style="width: 400px"
                    />
                  </FormItem>
                </li>
              </ul>
            </div>
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul" style="height:80px;">
                <li>
                  <FormItem label="备注">
                    <Input
                      v-model="newDedicateObj.NOTE"
                      style="width: 400px;vertical-align: top;"
                      type="textarea"
                      :autosize="{minRows: 3,maxRows: 5}"
                    ></Input>
                  </FormItem>
                </li>
              </ul>
            </div>
          </div>

          <Row class="table-title">
            <label>网络属性</label>
          </Row>
          <div class="table-content">
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="SNMP版本" prop="SNMPVER">
                    <Select
                      v-model="newDedicateObj.SNMPVER"
                      placeholder="请选择"
                      size="small"
                      :style="{'width':cswidth?cswidth:'200px'}"
                    >
                      <Option
                        v-for="item in snmpVersions"
                        :value="item"
                        :key="item"
                      >{{ item }}</Option>
                    </Select>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="共同体名" prop="COMMUNITY">
                    <Input v-model="newDedicateObj.COMMUNITY" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
              </ul>
            </div>
          </div>

          <Row class="table-title">
            <label>设备属性</label>
          </Row>
          <div class="table-content">
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="A设备IP" prop="A_DEV_IP">
                    <Input v-model="newDedicateObj.A_DEV_IP" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="A设备类型">
                    <comselect
                      @coms-select-change="provinceSelect"
                      :textLeft="true"
                      :isdisabled="true"
                      :selectDatas="aDevs"
                      :selectValue="newDedicateObj.A_DEV_TYPE"
                      :selectName="newDedicateObj.A_DEV_TYPE"
                      :cswidth="cswidth"
                    />
                  </FormItem>
                </li>
              </ul>
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="A设备端口" prop="A_DEV_PORT">
                    <Input v-model="newDedicateObj.A_DEV_PORT" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="A设备掩码" prop="A_DEV_MASK">
                    <Input v-model="newDedicateObj.A_DEV_MASK" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
              </ul>
            </div>
            <div v-if="templateType === '联通专线'" class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="Z设备IP">
                    <Input v-model="newDedicateObj.Z_DEV_IP" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="Z设备类型">
                    <comselect
                      @coms-select-change="provinceSelect"
                      :textLeft="true"
                      :isdisabled="true"
                      :selectDatas="zDevs"
                      :selectValue="newDedicateObj.Z_DEV_TYPE"
                      :selectName="newDedicateObj.Z_DEV_TYPE"
                      :cswidth="cswidth"
                    />
                  </FormItem>
                </li>
              </ul>
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="Z设备端口">
                    <Input v-model="newDedicateObj.Z_DEV_PORT" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="Z设备掩码">
                    <Input v-model="newDedicateObj.Z_DEV_MASK" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
              </ul>
            </div>
          </div>
          <p class="btns">
            <Button type="primary" @click="handleSubmit('formValidate','add')">保存</Button>
            <Button type="primary" @click="showAddNew = false">返回</Button>
          </p>
        </Form>
      </div>
    </div>

    <div v-if="showEditType === 'single'" class="normal-panel alarmDetail-modal">
      <div class="mask"></div>
      <div class="normal-panel-content">
        <Form ref="editValidate" :model="dedicateObj" :rules="ruleValidate" :label-width="85">
          <div class="normal-panel-title">
            修改专线资源
            <Icon @click="showEditType = ''" type="close-round"></Icon>
          </div>
          <Row class="table-title">
            <label>基础属性</label>
          </Row>
          <div class="table-content">
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="客户名称">
                    <Input
                      v-model="dedicateObj.CUSTOMERADDRESS"
                      size="small"
                      style="width: 400px"
                    />
                  </FormItem>
                </li>
              </ul>
            </div>
            <div
              v-if="dedicateObj.RESOURCETYPE === '联通专线'"
              class="slmm-table-condition normal-form-div"
            >
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="产品编号">
                    <Input
                      v-model="dedicateObj.PRODUCTNUMBER"
                      size="small"
                      style="width: 150px"
                    />
                  </FormItem>
                </li>
                <li>
                  <FormItem label="电路编号" prop="CIRCURTSTATE">
                    <Input v-model="dedicateObj.CIRCURTSTATE" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
              </ul>
            </div>
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="国家" prop="COUNTRY">
                    <Select
                      v-model="dedicateObj.COUNTRY"
                      @on-change="countryChange('edit')"
                      placeholder="请选择"
                      size="small"
                      :style="{'width':cswidth?cswidth:'200px'}"
                    >
                      <Option v-for="item in editCountrys" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="省份" prop="PROVINCE">
                    <Select
                      v-model="dedicateObj.PROVINCE"
                      @on-change="provinceChange('edit')"
                      placeholder="请选择"
                      size="small"
                      :style="{'width':cswidth?cswidth:'200px'}"
                    >
                      <Option v-for="item in editProvinces" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="地市" prop="CITY">
                    <Select
                      v-model="dedicateObj.CITY"
                      @on-change="cityChange('edit')"
                      placeholder="请选择"
                      size="small"
                      :style="{'width':cswidth?cswidth:'200px'}"
                    >
                      <Option v-for="item in editCitys" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                  </FormItem>
                </li>
              </ul>
            </div>
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="装机地址" prop="INSTALLADDRESS">
                    <Input v-model="dedicateObj.INSTALLADDRESS" size="small" style="width: 400px"/>
                  </FormItem>
                </li>
              </ul>
            </div>
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul" style="height:80px;">
                <li>
                  <FormItem label="备注">
                    <Input
                      v-model="dedicateObj.NOTE"
                      style="width: 400px;vertical-align: top;"
                      type="textarea"
                      :autosize="{minRows: 3,maxRows: 5}"
                    ></Input>
                  </FormItem>
                </li>
              </ul>
            </div>
          </div>
          <Row class="table-title">
            <label>网络属性</label>
          </Row>
          <div class="table-content">
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="SNMP版本" prop="SNMPVER">
                    <Select
                      v-model="dedicateObj.SNMPVER"
                      placeholder="请选择"
                      size="small"
                      :style="{'width':cswidth?cswidth:'200px'}"
                    >
                      <Option
                        v-for="item in snmpVersions"
                        :value="item"
                        :key="item"
                      >{{ item }}</Option>
                    </Select>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="共同体名" prop="COMMUNITY">
                    <Input v-model="dedicateObj.COMMUNITY" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
              </ul>
            </div>
          </div>

          <Row class="table-title">
            <label>设备属性</label>
          </Row>
          <div class="table-content">
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="A设备IP" prop="A_DEV_IP">
                    <Input v-model="dedicateObj.A_DEV_IP" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="A设备类型">
                    <comselect
                      :textLeft="true"
                      :isdisabled="true"
                      :selectDatas="aDevs"
                      :selectValue="dedicateObj.A_DEV_TYPE"
                      :selectName="dedicateObj.A_DEV_TYPE"
                      :cswidth="cswidth"
                    />
                  </FormItem>
                </li>
              </ul>
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="A设备端口" prop="A_DEV_PORT">
                    <Input v-model="dedicateObj.A_DEV_PORT" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="A设备掩码" prop="A_DEV_MASK">
                    <Input v-model="dedicateObj.A_DEV_MASK" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
              </ul>
            </div>
            <div
              v-if="dedicateObj.RESOURCETYPE === '联通专线'"
              class="slmm-table-condition normal-form-div"
            >
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="Z设备IP">
                    <Input v-model="dedicateObj.Z_DEV_IP" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="Z设备类型">
                    <comselect
                      :textLeft="true"
                      :isdisabled="true"
                      :selectDatas="zDevs"
                      :selectValue="dedicateObj.Z_DEV_TYPE"
                      :selectName="dedicateObj.Z_DEV_TYPE"
                      :cswidth="cswidth"
                    />
                  </FormItem>
                </li>
              </ul>
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="Z设备端口">
                    <Input v-model="dedicateObj.Z_DEV_PORT" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="Z设备掩码">
                    <Input v-model="dedicateObj.Z_DEV_MASK" size="small" style="width: 150px"/>
                  </FormItem>
                </li>
              </ul>
            </div>
          </div>
          <p class="btns">
            <Button type="primary" @click="handleSubmit('editValidate','edit')">保存</Button>
            <Button type="primary" @click="showEditType = ''">返回</Button>
          </p>
        </Form>
      </div>
    </div>

    <div v-if="showEditType === 'mul'" class="normal-panel alarmDetail-modal">
      <div class="mask"></div>
      <div class="normal-panel-content">
        <Form ref="muleditValidate" :model="dedicateObj" :rules="ruleValidate" :label-width="85">
          <div class="normal-panel-title">
            修改专线资源
            <Icon @click="showEditType = ''" type="close-round"></Icon>
          </div>
          <Row class="table-title">
            <label>修改对象</label>
          </Row>
          <div class="table-content">
            <div class="slmm-table-condition normal-form-div">
              <table class="slmm-list-table" cellspacing="0" cellpadding="0">
                <tr v-for="(kpi,index) in selection" v-bind:index="index" v-bind:key="kpi">
                  <td
                    class="slmm-list-td1"
                  >{{kpi.RESOURCETYPE === '联通专线' ? kpi.PRODUCTNUMBER:kpi.A_DEV_IP}}</td>
                  <td
                    class="slmm-list-td1"
                  >{{kpi.RESOURCETYPE === '联通专线' ? kpi.PRODUCTNUMBER:kpi.A_DEV_IP}}</td>
                </tr>
              </table>
            </div>
          </div>
          <Row class="table-title">
            <label>基本属性</label>
          </Row>
          <div class="table-content">
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="产品编号">
                    <Input
                      v-model="mulDedicateObj.PRODUCTNUMBER"
                      size="small"
                      style="width: 150px"
                    />
                  </FormItem>
                </li>
              </ul>
            </div>
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="国家" prop="COUNTRY">
                    <Select
                      v-model="mulDedicateObj.COUNTRY"
                      @on-change="countryChange('mul')"
                      placeholder="请选择"
                      size="small"
                      :style="{'width':cswidth?cswidth:'200px'}"
                    >
                      <Option v-for="item in mulCountrys" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="省份" prop="PROVINCE">
                    <Select
                      v-model="mulDedicateObj.PROVINCE"
                      @on-change="provinceChange('mul')"
                      placeholder="请选择"
                      size="small"
                      :style="{'width':cswidth?cswidth:'200px'}"
                    >
                      <Option v-for="item in mulProvinces" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                  </FormItem>
                </li>
                <li>
                  <FormItem label="地市" prop="CITY">
                    <Select
                      v-model="mulDedicateObj.CITY"
                      @on-change="cityChange('mul')"
                      placeholder="请选择"
                      size="small"
                      :style="{'width':cswidth?cswidth:'200px'}"
                    >
                      <Option v-for="item in mulCitys" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                  </FormItem>
                </li>
              </ul>
            </div>
          </div>

          <p class="btns">
            <Button type="primary" @click="handleSubmit('muleditValidate','muledit')">保存</Button>
            <Button type="primary" @click="showEditType = ''">返回</Button>
          </p>
        </Form>
      </div>
    </div>

    <div v-if="showImport" class="normal-panel alarmDetail-modal">
      <div class="mask"></div>
      <div class="normal-panel-content">
        <Form ref="formValidate" :model="newDedicateObj" :rules="ruleValidate" :label-width="85">
          <div class="normal-panel-title">
            数据导入
            <Icon @click="showImport = false" type="close-round"></Icon>
          </div>
          <Row class="table-title">
            <label>说明</label>
          </Row>
          <div class="table-content">
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul" style="height:100px;">
                <li style="text-align:left;">
                  <p class="normal-form-p">1：请依据需要导入的资源类型下载导入模板</p>
                  <p class="normal-form-p">2：依据模板要求完善资源内容，注意：模板文件名称不可修改！</p>
                  <p class="normal-form-p">3：在本页面选择导入文件实现资源批量导入</p>
                </li>
              </ul>
            </div>
          </div>
          <Row class="table-title">
            <label>资源导入</label>
          </Row>
          <div class="table-content">
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="模版下载">
                    <RadioGroup v-model="downloadType">
                      <Radio label="联通专线导入模板"></Radio>
                      <Radio label="内网设备导入模板"></Radio>
                    </RadioGroup>
                  </FormItem>
                </li>
                <li>
                  <!-- @click="downloadTemplate" -->
                  <a
                    v-bind:href="'http://39.104.229.21:58055/dedicate/downTemplate?name='+downloadTypeMap[downloadType]"
                  >
                    <Button size="small" class="condition-btn">下载</Button>
                  </a>
                </li>
              </ul>
            </div>
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul" style="height:200px;">
                <li style="width:80%;">
                  <FormItem label="资源导入">
                    <Upload
                      multiple
                      type="drag"
                      :action="uploadAction"
                      :before-upload="baforeUpload"
                      :data="uploadData"
                      :on-success="uploadSuccess"
                    >
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或者拖拽上传</p>
                      </div>
                    </Upload>
                  </FormItem>
                </li>
              </ul>
            </div>
          </div>
          <p class="btns">
            <!-- <Button type="primary" @click="importSubmit()">导入</Button> -->
            <Button type="primary" @click="showImport = false">返回</Button>
          </p>
        </Form>
      </div>
    </div>

    <div v-if="showExport" class="normal-panel alarmDetail-modal">
      <div class="mask"></div>
      <div class="normal-panel-content">
        <Form ref="formValidate" :model="newDedicateObj" :rules="ruleValidate" :label-width="85">
          <div class="normal-panel-title">
            数据导出
            <Icon @click="showExport = false" type="close-round"></Icon>
          </div>
          <Row class="table-title">
            <label>说明</label>
          </Row>
          <div class="table-content">
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul" style="height:100px;">
                <li style="text-align:left;">
                  <p class="normal-form-p">1、模板:资源导入模板</p>
                  <p class="normal-form-p">2、全部:自身及子类对象数据</p>
                  <p class="normal-form-p">3、导出数据不能多于5000条</p>
                </li>
              </ul>
            </div>
          </div>
          <Row class="table-title">
            <label>配置</label>
          </Row>
          <div class="table-content">
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="基本属性">
                    <CheckboxGroup v-model="exportCols1">
                      <Checkbox label="专线编号"></Checkbox>
                      <Checkbox label="专线名称"></Checkbox>
                      <Checkbox label="装机地址"></Checkbox>
                      <Checkbox label="省份"></Checkbox>
                      <Checkbox label="地市"></Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                </li>
              </ul>
            </div>
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="网络属性">
                    <CheckboxGroup v-model="exportCols2">
                      <Checkbox label="SNMP版本"></Checkbox>
                      <Checkbox label="共同体名"></Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                </li>
              </ul>
            </div>
            <div class="slmm-table-condition normal-form-div">
              <ul class="slmm-table-condition-ul normal-form-ul">
                <li>
                  <FormItem label="设备属性">
                    <CheckboxGroup v-model="exportCols3">
                      <Checkbox label="CE设备IP"></Checkbox>
                      <Checkbox label="CE设备端口"></Checkbox>
                      <Checkbox label="PE设备端口"></Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                </li>
              </ul>
            </div>
          </div>
          <p class="btns">
            <Button type="primary" @click="exportSubmit()">导出</Button>
            <Button type="primary" @click="showExport = false">返回</Button>
          </p>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api";
import G2 from "@antv/g2";
import mapKey from "../home/mapKey.json";
import { View } from "@antv/data-set";
import comselect from "@/components/ComSelect.vue";
import dateformat from "@/utils/dateformat.js";

export default {
  components: { comselect },
  data() {
    return {
      alarmSelectValue: "",
      alarmSelectName: "",
      alarmSelectData: ["全部", "已监控", "申请中", "未监控"],
      provinceSelectValue: "",
      provinceSelectName: "",
      provinceSelectData: [],
      searchText: "",
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "电路编号",
          key: "CIRCURTSTATE"
        },
        {
          title: "店铺名称",
          key: "SHOPNAME"
        },
        {
          title: "地市",
          width: 80,
          key: "CITY"
        },
        {
          title: "装机地址",
          key: "INSTALLADDRESS"
        },
        {
          title: "带宽",
          width: 60,
          key: "BANDWIDTH"
        },
        {
          title: "监控状态",
          width: 90,
          key: "MONTIORSTATE"
        },
        {
          title: "最近修改时间",
          key: "datetime"
        },
        {
          title: "CE端口及类型",
          key: "A_DEV_PORT"
        },
        {
          title: "PE端口互联IP地址",
          key: "A_DEV_IP"
        },
        {
          title: "备注",
          key: "NOTE"
        }
      ],
      data1: [],
      selection: [],
      showAddNew: false,
      showEditType: "", // single,mul
      showImport: false,
      showExport: false,
      snmpVersions: ["V1", "V2", "V3"],
      newCountrys: [],
      newProvinces: [],
      newCitys: [],
      editCountrys: [],
      editProvinces: [],
      editCitys: [],
      mulCountrys: [],
      mulProvinces: [],
      mulCitys: [],
      aDevs: [
        "CE",
        "PE",
        "数据库",
        "防火墙",
        "中间件",
        "交换机",
        "路由器",
        "服务器"
      ],
      zDevs: ["PE"],
      cswidth: "150px",
      templateType: "联通专线",
      newDedicateObj: {
        // "RESOURCETYPE": "联通专线",
        CUSTOMERADDRESS: "",
        PRODUCTNUMBER: "",
        CIRCURTSTATE: "",
        COUNTRY: "",
        PROVINCE: "",
        CITY: "",
        INSTALLADDRESS: "",
        NOTE: "",
        SNMPVER: "",
        COMMUNITY: "",
        A_DEV_IP: "",
        A_DEV_TYPE: "CE",
        A_DEV_PORT: "",
        A_DEV_MASK: "",
        Z_DEV_IP: "",
        Z_DEV_TYPE: "PE",
        Z_DEV_PORT: "",
        Z_DEV_MASK: ""
      },
      dedicateObj: null,
      mulDedicateObj: {
        PRODUCTNUMBER: "",
        COUNTRY: "",
        PROVINCE: "",
        CITY: ""
      },
      ruleValidate: {
        CIRCURTSTATE: [
          { required: true, message: "请输入电路编号", trigger: "blur" }
        ],
        COUNTRY: [{ required: true, message: "请选择国家", trigger: "change" }],
        PROVINCE: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        CITY: [{ required: true, message: "请选择地市", trigger: "change" }],
        INSTALLADDRESS: [
          { required: true, message: "请输入电路编号", trigger: "blur" }
        ],
        SNMPVER: [{ required: true, message: "请选择国家", trigger: "change" }],
        COMMUNITY: [
          { required: true, message: "请输入电路编号", trigger: "blur" }
        ],
        A_DEV_IP: [
          { required: true, message: "请输入电路编号", trigger: "blur" }
        ],
        A_DEV_PORT: [
          { required: true, message: "请输入电路编号", trigger: "blur" }
        ],
        A_DEV_MASK: [
          { required: true, message: "请输入电路编号", trigger: "blur" }
        ]
      },
      downloadType: "联通专线导入模板",
      downloadTypeMap:{
        "联通专线导入模板":"unicom_dedicatedLine",
        "内网设备导入模板":"intranet_equipment"
      },
      uploadAction: API.index.importExcel,
      uploadData: {
        filename: null
      },
      exportMap: {
        专线编号: "PRODUCTNUMBER",
        专线名称: "PRODUCTNUMBER",
        装机地址: "INSTALLADDRESS",
        省份: "PROVINCE",
        地市: "CITY",

        SNMP版本: "SNMPVER",
        共同体名: "COMMUNITY",

        CE设备IP: "A_DEV_IP",
        CE设备端口: "A_DEV_PORT",
        PE设备端口: "Z_DEV_PORT"
      },
      exportCols1: [],
      exportCols2: [],
      exportCols3: []
    };
  },
  mounted() {
    this.getCUSTOMERADDRESS();
    this.setProvince();
    this.getTableDatas();
    this.getCountry();
  },
  methods: {
    getCUSTOMERADDRESS(){
      this.newDedicateObj.CUSTOMERADDRESS = "万科集团";
    },
    handleSubmit(name, type) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (type === "add") {
            this.addSubmit();
          }
          if (type === "edit") {
            this.singleEditSubmit();
          }
          if (type === "muledit") {
            this.mulEditSubmit();
          }
        } else {
          this.$Message.error("请输入所有必填项");
        }
      });
    },
    addDedicate() {
      this.showAddNew = true;
    },
    addSubmit() {
      // newDedicateObj
      let params = "",
        paramarr = [];

      paramarr.push("templateType=" + this.templateType);
      if (this.templateType === "联通专线") {
        //TODO 电路编号必填
        paramarr.push("CIRCURTSTATE=" + this.newDedicateObj.CIRCURTSTATE);
        paramarr.push("Z_DEV_TYPE=" + this.newDedicateObj.Z_DEV_TYPE);

        if (this.newDedicateObj.PRODUCTNUMBER) {
          paramarr.push("PRODUCTNUMBER=" + this.newDedicateObj.PRODUCTNUMBER);
        }
        if (this.newDedicateObj.Z_DEV_IP) {
          paramarr.push("Z_DEV_IP=" + this.newDedicateObj.Z_DEV_IP);
        }
        if (this.newDedicateObj.Z_DEV_PORT) {
          paramarr.push("Z_DEV_PORT=" + this.newDedicateObj.Z_DEV_PORT);
        }
        if (this.newDedicateObj.Z_DEV_MASK) {
          paramarr.push("Z_DEV_MASK=" + this.newDedicateObj.Z_DEV_MASK);
        }
      }

      paramarr.push("COUNTRY=" + this.newDedicateObj.COUNTRY);
      paramarr.push("PROVINCE=" + this.newDedicateObj.PROVINCE);
      paramarr.push("CITY=" + this.newDedicateObj.CITY);
      paramarr.push("INSTALLADDRESS=" + this.newDedicateObj.INSTALLADDRESS);
      paramarr.push("SNMPVER=" + this.newDedicateObj.SNMPVER);
      paramarr.push("COMMUNITY=" + this.newDedicateObj.COMMUNITY);
      paramarr.push("A_DEV_IP=" + this.newDedicateObj.A_DEV_IP);
      paramarr.push("A_DEV_TYPE=" + this.newDedicateObj.A_DEV_TYPE);
      paramarr.push("A_DEV_PORT=" + this.newDedicateObj.A_DEV_PORT);
      paramarr.push("A_DEV_MASK=" + this.newDedicateObj.A_DEV_MASK);

      if (this.newDedicateObj.CUSTOMERADDRESS) {
        paramarr.push("CUSTOMERADDRESS=" + this.newDedicateObj.CUSTOMERADDRESS);
      }
      if (this.newDedicateObj.NOTE) {
        paramarr.push("NOTE=" + this.newDedicateObj.NOTE);
      }

      if (paramarr.length > 0) {
        params = "?" + paramarr.join("&");
      }
      this.axios.get(`${API.index.addDedicateLine + params}`).then(result => {
        console.log(API.index.addDedicateLine + params, result);
        if (result.result === "success") {
          this.$Message.success("添加成功");
          this.showAddNew = false;
          this.newDedicateObj= {
            CUSTOMERADDRESS: "",
            PRODUCTNUMBER: "",
            CIRCURTSTATE: "",
            COUNTRY: "",
            PROVINCE: "",
            CITY: "",
            INSTALLADDRESS: "",
            NOTE: "",
            SNMPVER: "",
            COMMUNITY: "",
            A_DEV_IP: "",
            A_DEV_TYPE: "CE",
            A_DEV_PORT: "",
            A_DEV_MASK: "",
            Z_DEV_IP: "",
            Z_DEV_TYPE: "PE",
            Z_DEV_PORT: "",
            Z_DEV_MASK: ""
          }
          this.getTableDatas();
        } else {
          this.$Message.error("添加失败");
        }
      });
    },
    singleEditSubmit() {
      if (!this.dedicateObj) {
        this.$Message.error("未找到");
        return;
      }
      let params = "",
        paramarr = [];

      paramarr.push("templateType=" + this.dedicateObj.RESOURCETYPE);
      paramarr.push("id=" + this.dedicateObj.id);
      if (this.dedicateObj.RESOURCETYPE === "联通专线") {
        //TODO 电路编号必填
        // paramarr.push("CIRCURTSTATE=" + this.dedicateObj.CIRCURTSTATE);
        // paramarr.push("Z_DEV_TYPE=" + this.dedicateObj.Z_DEV_TYPE);
        if (this.dedicateObj.CIRCURTSTATE) {
          paramarr.push("CIRCURTSTATE=" + this.dedicateObj.CIRCURTSTATE);
        }
        if (this.dedicateObj.Z_DEV_TYPE) {
          paramarr.push("Z_DEV_TYPE=" + this.dedicateObj.Z_DEV_TYPE);
        }

        if (this.dedicateObj.PRODUCTNUMBER) {
          paramarr.push("PRODUCTNUMBER=" + this.dedicateObj.PRODUCTNUMBER);
        }
        if (this.dedicateObj.Z_DEV_IP) {
          paramarr.push("Z_DEV_IP=" + this.dedicateObj.Z_DEV_IP);
        }
        if (this.dedicateObj.Z_DEV_PORT) {
          paramarr.push("Z_DEV_PORT=" + this.dedicateObj.Z_DEV_PORT);
        }
        if (this.dedicateObj.Z_DEV_MASK) {
          paramarr.push("Z_DEV_MASK=" + this.dedicateObj.Z_DEV_MASK);
        }
      }

      paramarr.push("COUNTRY=" + this.dedicateObj.COUNTRY);
      paramarr.push("PROVINCE=" + this.dedicateObj.PROVINCE);
      paramarr.push("CITY=" + this.dedicateObj.CITY);
      paramarr.push("INSTALLADDRESS=" + this.dedicateObj.INSTALLADDRESS);
      paramarr.push("SNMPVER=" + this.dedicateObj.SNMPVER);
      paramarr.push("COMMUNITY=" + this.dedicateObj.COMMUNITY);
      paramarr.push("A_DEV_IP=" + this.dedicateObj.A_DEV_IP);
      paramarr.push("A_DEV_TYPE=" + this.dedicateObj.A_DEV_TYPE);
      paramarr.push("A_DEV_PORT=" + this.dedicateObj.A_DEV_PORT);
      paramarr.push("A_DEV_MASK=" + this.dedicateObj.A_DEV_MASK);

      if (this.dedicateObj.NOTE) {
        paramarr.push("NOTE=" + this.dedicateObj.NOTE);
      }

      if (paramarr.length > 0) {
        params = "?" + paramarr.join("&");
      }
      this.axios.get(`${API.index.editDedicateLine + params}`).then(result => {
        console.log(API.index.editDedicateLine + params, result);
        if (result.result === "success") {
          this.$Message.success("修改成功");
          this.showEditType = '';
          this.getTableDatas();
        } else {
          this.$Message.error("修改失败");
        }
      });
    },
    mulEditSubmit() {
      if (this.selection.length < 2) {
        this.$Message.error("未找到");
        return;
      }
      let params = "",
        paramarr = [],
        ids = [];
      ids = this.selection.map(s => s.id);

      paramarr.push("id=" + ids.join(","));
      if (this.mulDedicateObj.PRODUCTNUMBER) {
        paramarr.push("PRODUCTNUMBER=" + this.mulDedicateObj.PRODUCTNUMBER);
      }

      paramarr.push("COUNTRY=" + this.mulDedicateObj.COUNTRY);
      paramarr.push("PROVINCE=" + this.mulDedicateObj.PROVINCE);
      paramarr.push("CITY=" + this.mulDedicateObj.CITY);

      if (paramarr.length > 0) {
        params = "?" + paramarr.join("&");
      }
      this.axios.get(`${API.index.editDedicateLine + params}`).then(result => {
        console.log(API.index.editDedicateLine + params, result);
        if (result.result === "success") {
          this.$Message.success("修改成功");
          this.showEditType = '';
          this.mulDedicateObj = {
            PRODUCTNUMBER: "",
            COUNTRY: "",
            PROVINCE: "",
            CITY: ""
          }
          this.getTableDatas();
        } else {
          this.$Message.error("修改失败");
        }
      });
    },
    editDedicate() {
      this.showEditType = "";
      if (this.selection.length > 1) {
        this.mulDedicateObj = {
          PRODUCTNUMBER: "",
          COUNTRY: "",
          PROVINCE: "",
          CITY: ""
        };
        this.showEditType = "mul";
      } else if (this.selection.length === 1) {
        this.showEditType = "single";
        this.dedicateObj = this.selection[0];
        if (this.dedicateObj.COUNTRY) {
          this.countryChange("edit");
        }
        if (this.dedicateObj.PROVINCE) {
          this.provinceChange("edit");
        }
      }else{
        this.$Message.error("请先选择要编辑的专线");
        return;
      }
    },
    delDedicate() {
      if (this.selection.length < 1) {
        this.$Message.error("请先选择要删除的专线");
        return;
      }
      let params = "",
        paramarr = [],
        ids = [];
      ids = this.selection.map(s => s.id);

      paramarr.push("id=" + ids.join(","));
      if (paramarr.length > 0) {
        params = "?" + paramarr.join("&");
      }
      this.axios.get(`${API.index.delDedicateLine + params}`).then(result => {
        console.log(API.index.delDedicateLine + params, result);
        if (result.result === "success") {
          this.$Message.success("删除成功");
          this.getTableDatas();
        } else {
          this.$Message.error("删除失败");
        }
      });
    },
    baforeUpload(file) {
      console.log("baforeUpload-file", file);
      this.uploadData.filename = file;
    },
    uploadSuccess(res, file) {
      console.log("uploadSuccess-file", file);
      this.$Message.success("导入成功");
    },
    importDedicate() {
      this.showImport = true;
    },
    exportDedicate() {
      this.showExport = true;
    },
    exportSubmit() {
      console.log("exportCols1", this.exportCols1);
      console.log("exportCols2", this.exportCols2);
      console.log("exportCols3", this.exportCols3);
      // newDedicateObj
      let params = "",
        _this = this,
        paramarr = [];

      paramarr.push("flag=1");
      paramarr.push("state=已监控");
      _.forEach(this.exportCols1, c => {
        paramarr.push(_this.exportMap[c] + "=" + c);
      });
      _.forEach(this.exportCols2, c => {
        paramarr.push(_this.exportMap[c] + "=" + c);
      });
      _.forEach(this.exportCols3, c => {
        paramarr.push(_this.exportMap[c] + "=" + c);
      });

      if (paramarr.length > 0) {
        params = "?" + paramarr.join("&");
      }

      this.axios.get(`${API.index.dedicateExport + params}`).then(result => {
        console.log(API.index.dedicateExport + params, result);
        if(result){
          var url = `${API.domainport + result.result}`;
          console.log("url", url);
          let iframe = document.createElement('iframe')
          iframe.style.display = 'none'
          iframe.src = url
          iframe.onload = function () {
            document.body.removeChild(iframe)
          }
          document.body.appendChild(iframe)
          this.$Message.success("导出成功");
        }
      });
    },
    setProvince() {
      let provinceSelectData = ["全部"];
      for (var p in mapKey) {
        provinceSelectData.push(p);
      }
      this.provinceSelectData = provinceSelectData;
    },
    getTableDatas() {
      let params = "",
        paramarr = [];
      if (this.provinceSelectValue && this.provinceSelectValue != "全部") {
        paramarr.push("province=" + this.provinceSelectValue);
      }
      if (this.alarmSelectValue && this.alarmSelectValue != "全部") {
        paramarr.push("state=" + this.alarmSelectValue);
      }
      let serachText = _.trim(this.searchText);
      if (serachText) {
        paramarr.push("modeQuery=" + serachText);
      }
      if (paramarr.length > 0) {
        params = "?" + paramarr.join("&");
      }
      this.axios.get(`${API.index.queryDedicateLine + params}`).then(result => {
        console.log(API.index.queryDedicateLine + params, result);
        this.data1 = result;
      });
    },
    provinceSelect(name) {
      this.provinceSelectValue = name;
      this.provinceSelectName = name;
      // this.getTableDatas();
    },
    downloadTemplate() {
      if (this.downloadType) {
        let params = "?name=" + this.downloadTypeMap[this.downloadType];
        this.axios.get(`${API.index.downTemplate + params}`).then(result => {
          var blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
          var url = window.URL.createObjectURL(blob);
          var aLink = document.createElement("a");
          aLink.style.display = "none";
          aLink.href = url;
          aLink.setAttribute("download", this.downloadTypeMap[this.downloadType]+".xlsx");
          document.body.appendChild(aLink);
          aLink.click();
          document.body.removeChild(aLink); //下载完成移除元素
          window.URL.revokeObjectURL(url); //释放掉blob对象

          // console.log(API.index.downTemplate + params, result);
          // if (result.result === "success") {
          //   this.$Message.success("删除成功");
          // } else {
          //   this.$Message.error("删除失败");
          // }
        });
      }
    },
    rowSelect(selection, row) {
      // console.log("selection",selection);
      this.selection = selection;
    },
    alarmSelect(name) {
      // console.log(name);
      this.alarmSelectValue = name;
      let aa = _.find(this.alarmSelectData, function(d) {
        return d.value === name;
      });
      this.alarmSelectName = aa.name;
    },
    rowClick(item, index) {
      // this.isshowApproval = true;
      this.dedicateObj = item;
      // this.$router.push({
      //   name: "slmonitor",
      //   params: {}
      // });
    },
    getCountry() {
      this.axios.get(`${API.index.getcountry}`).then(result => {
        let countrys = result.map(c => c.value);
        this.newCountrys = countrys;
        this.editCountrys = countrys;
        this.mulCountrys = countrys;
      });
    },
    countryChange(type) {
      let p = "";
      if (type === "add") {
        p = this.newDedicateObj.COUNTRY;
      }
      if (type === "edit") {
        p = this.dedicateObj.COUNTRY;
      }
      if (type === "mul") {
        p = this.mulDedicateObj.COUNTRY;
      }
      let params = "?country=" + p;
      this.axios.get(`${API.index.getprovince + params}`).then(result => {
        console.log(API.index.getprovince + params, result);
        let provinces = result.map(c => c.value);
        if (type === "add") {
          this.newProvinces = provinces;
        }
        if (type === "edit") {
          this.editProvinces = provinces;
        }
        if (type === "mul") {
          this.mulProvinces = provinces;
        }
      });
    },
    provinceChange(type) {
      let p = "";
      if (type === "add") {
        p = this.newDedicateObj.PROVINCE;
      }
      if (type === "edit") {
        p = this.dedicateObj.PROVINCE;
      }
      if (type === "mul") {
        p = this.mulDedicateObj.PROVINCE;
      }
      let params = "?province=" + p;
      this.axios.get(`${API.index.getcity + params}`).then(result => {
        console.log(API.index.getcity + params, result);
        let citys = result.map(c => c.value);
        if (type === "add") {
          this.newCitys = citys;
        }
        if (type === "edit") {
          this.editCitys = citys;
        }
        if (type === "mul") {
          this.mulCitys = citys;
        }
      });
    },
    cityChange(type) {
      // if(type === 'add'){
      //   this.newDedicateObj.COUNTRY
      // }
    }
  }
};
</script>
<style>
.ivu-upload-drag{
  background: transparent;
}
</style>

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

.alarmDetail-modal {
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
    background-color: #1a2440;
    line-height: 50px;
  }
  .table-content {
    background-color: #1a2440;
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
    .ivu-row > .ivu-col > span,
    .ivu-row.device > .ivu-col > p > span {
      display: inline-block;
      width: 150px;
      text-align: left;
      color: #50b5ec;
    }
    .ivu-row.device > .ivu-col > p {
      display: inline-block;
      background-color: #161941;
    }
    .ivu-row.device > .ivu-col > p > span:nth-of-type(1) {
      width: auto;
      min-width: 40px;
    }
    .ivu-row.device > .ivu-col > p > span:nth-of-type(2) {
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
}
.normal-form-label {
  display: inline-block;
  width: 75px;
  text-align: right;
}
.normal-form-div {
  padding-top: 5px;
  border: 0px;
  clear: both;
}
.normal-form-ul {
  padding: 0 0 0 80px;
  height: 40px;
}
// .normal-form-ul li{
//   line-height:40px;
// }
.ivu-form-item {
  margin-bottom: 0px;
}
.ivu-form-item-error {
  margin-bottom: 24px;
}

.slmm-list-table {
  width: 100%;
}
.slmm-list-td1 {
  padding: 10px;
  line-height: 20px;
  width: 50%;
}

</style>
