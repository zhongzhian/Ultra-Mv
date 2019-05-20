<template>
  <div>
    <div style="height:70px;">
      <div
        v-for="(kpi,index) in row1kpis"
        v-bind:index="index"
        v-bind:key="kpi"
        class="normal-panel fl row4"
      >
        <div class="normal-panel-content" style="height:70px;">
          <img class="home-kpis-img" :src="kpi.img">
          <p class="home-kpis-p">{{kpi.label}}</p>
          <!-- :class="{'alarm':index===0}" -->
          <p class="home-kpis-pvalue">{{kpi.value}}</p>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:600px;">
      <div class="normal-panel fl" style="width:70%;height:600px;">
        <div class="normal-panel-content">
          <div class="normal-panel-title" style="text-align:center;">全国异常专线情况</div>
          <div class="map-panel-mainkpis">
            <div class="leftdiv">
              专线总数
              <span style="font-size:20px;color:#73fbfd;margin-left:20px;">{{mapAllTotal}}</span>
            </div>
            <div class="rightdiv">
              异常总数
              <span style="font-size:20px;color:#eb3223;margin-left:20px;">{{mapErrorTotal}}</span>
            </div>
          </div>
          <div id="mapChart" class="map-panel-map" style="height:518px;"></div>
          <div class="map-panel-select">
            <comselect
              @coms-select-change="alarmSelect"
              :textLeft="true"
              :selectDatas="alarmSelectData"
              :selectValue="alarmSelectValue"
            />
          </div>
          <div class="map-panel-mainlegend">
            <div>
              <span style="background-color: #DB6812;"></span>中断类
            </div>
            <div>
              <span style="background-color: #FFFF01;"></span>丢包异常类
            </div>
            <div>
              <span style="background-color: #01AFF9;"></span>正常
            </div>
            <div>
              <span style="background-color: #2C4272;"></span>无数据
            </div>
          </div>
        </div>
      </div>
      <div class="normal-panel fl" style="width:30%;">
        <div class="normal-panel-content" style="height:290px;margin-bottom:20px;">
          <div class="normal-panel-title">指标TOP5</div>
          <!-- <switchtab :swtichDatas="top5Datas" :sindex="top5Index" @coms-switch-change="changeTop5"/> -->
          <div class="home-top5-switch">
            <Icon
              @click="top5switch=0"
              color="#50b5ec"
              size="25"
              style="vertical-align: top;line-height: 30px;position: absolute;left: 15px;cursor:pointer;"
              type="ios-arrow-back"
            />
            <table class="home-top5-switch-table" cellspacing="0" cellpadding="0">
              <tr v-if="top5switch === 0">
                <td
                  @click="changeTop5(s)"
                  v-for="s in top5Datas[0]"
                  :key="s.key"
                  :class="{'active':s.key === top5Index}"
                >{{s.name}}</td>
              </tr>
              <tr v-if="top5switch === 1">
                <td
                  @click="changeTop5(s)"
                  v-for="s in top5Datas[1]"
                  :key="s.key"
                  :class="{'active':s.key === top5Index}"
                >{{s.name}}</td>
              </tr>
            </table>
            <Icon
              @click="top5switch=1"
              color="#50b5ec"
              size="25"
              style="vertical-align: top;line-height: 30px;position: absolute;right: 15px;cursor:pointer;"
              type="ios-arrow-forward"
            />
          </div>
          <div id="kpiTop5Chart"></div>
        </div>
        <div class="normal-panel-content" style="height:290px;">
          <div class="normal-panel-title">告警统计</div>
          <div id="alarmChart"></div>
          <div style="top:240px;" class="map-panel-mainkpis">
            <div class="leftdiv">
              活动
              <span style="font-size:20px;color:#73fbfd;margin-left:20px;">{{alarmCount.total}}</span>
            </div>
            <div class="rightdiv">
              已派单
              <span style="font-size:20px;color:#eb3223;margin-left:20px;">{{alarmCount.paidan}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:200px;">
      <div class="normal-panel fl" style="width:70%;height:200px;">
        <div class="normal-panel-content">
          <div class="normal-panel-title">各省份专线统计</div>
          <div id="proviceChart"></div>
        </div>
      </div>
      <div class="normal-panel fl" style="width:30%;">
        <div class="normal-panel-content" style="height:200px;">
          <div class="normal-panel-title-charts">数据流量(数据中心)
            <RadioGroup v-model="redionType" type="button" size="small" style="marginLeft:40px"   @on-change="inorout">
              <Radio label="in">输入速率</Radio>
              <Radio label="out">输出速率</Radio>     
          </RadioGroup>
          </div>
          <div id="appTop5Chart"></div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;margin-bottom:20px;">
      <div class="normal-panel" style="width:100%;">
        <div class="normal-panel-content">
          <div class="normal-panel-title" style="height:50px;line-height: 30px;">活动告警</div>
            <div class="home-table-condition">
            <ul class="home-table-condition-ul">
              <li>
                <!-- <Icon type="ios-arrow-up" /> -->
                <!-- <Icon type="md-arrow-dropup" /> -->
                <div
                  class="home-table-condition-openbtn"
                  @click="homeConditionShow = !homeConditionShow"
                >
                  <span>请选择查询条件</span>
                  <Icon
                    v-if="!homeConditionShow"
                    class="home-table-condition-openbtn-icon"
                    type="ios-arrow-down"
                  />
                  <Icon
                    v-if="homeConditionShow"
                    class="home-table-condition-openbtn-icon"
                    type="ios-arrow-up"
                  />
                </div>
                <!-- <Button size="small" @click="alarmShow" class="condition-btn" icon="md-arrow-dropdown">请选择查询条件
                </Button>-->
              </li>
              <li>
                <span>
                  当前页：
                  <label class="alarmlabel">{{alarmPager.page}}</label>
                </span>
              </li>
              <li>
                <span>
                  总数：
                  <label class="alarmlabel">{{alarmPager.total}}</label>
                </span>
              </li>
              <li>
                <template v-for="key in alarmKey">
                  <span
                    class="home-table-condition-alarmpoint"
                    :style="{ backgroundColor: key.color}"
                  ></span>
                  <label class="home-table-condition-alarmlabel">{{key.count}}</label>
                </template>
              </li>
            </ul>
          </div>
          <div v-show="homeConditionShow" class="home-table-condition-content">
            <Row class="home-table-condition-row">
              <Col span="12">
                <label class="home-table-condition-label">标题：</label>
                <Input v-model="alarmCondition.title" style="width: 300px"/>
              </Col>
              <Col span="12">
                <label class="home-table-condition-label">IPv4：</label>
                <Input v-model="alarmCondition.ipv4" style="width: 300px"/>
              </Col>
            </Row>
            <Row class="home-table-condition-row">
              <Col span="12">
                <label class="home-table-condition-label">应用系统：</label>
                <Select v-model="alarmCondition.appSystem" size="small" style="width:300px">
                  <Option value="ALL">全部</Option>
                  <Option value="万科集团">万科集团</Option>
                </Select>
              </Col>
              <Col span="12">
                <label class="home-table-condition-label">确认：</label>
                <Select v-model="alarmCondition.queren" size="small" style="width:300px">
                  <Option value="ALL">全部</Option>
                  <Option value="未确认">未确认</Option>
                  <Option value="已确认">已确认</Option>
                </Select>
              </Col>
            </Row>
            <Row class="home-table-condition-row">
              <Col span="12">
                <label class="home-table-condition-label">告警级别：</label>
                <Checkbox v-model="alarmCondition.severity.level1">严重告警</Checkbox>
                <Checkbox v-model="alarmCondition.severity.level2">主要告警</Checkbox>
                <Checkbox v-model="alarmCondition.severity.level3">次要告警</Checkbox>
                <Checkbox v-model="alarmCondition.severity.level4">普通告警</Checkbox>
              </Col>
              <Col span="12">
                <label class="home-table-condition-label">首次发生时间：</label>
                <DatePicker
                  v-model="alarmCondition.timerange"
                  type="datetimerange"
                  placeholder="请选择时间"
                  style="width: 300px;display: inline-block;"
                ></DatePicker>
              </Col>
            </Row>
            <Row class="home-table-condition-row">
              <Col span="24">
                <Button size="small" @click="alarmShow" class="condition-btn">查找</Button>
              </Col>
            </Row>
          </div>
             <!-- @on-row-click="alarmDetail" -->
          <Table
            stripe
            height="300"
         
            :columns="alarmColumns"
            :data="alarmData"
          ></Table>
        </div>
      </div>
    </div>
    <!-- <div id="chart"></div> -->

    <div v-if="showAlarmDetail" class="normal-panel alarmDetail-modal">
      <div class="mask"></div>
      <div class="normal-panel-content">
        <div class="normal-panel-title">
          告警详情
          <Icon @click="showAlarmDetail = false" type="close-round"></Icon>
        </div>
        <Row class="table-title">
          <label>告警信息</label>
        </Row>
        <div class="table-content">
          <Row>
            <Col span="24">
              <label>标题：</label>
              <span>通断性XXXXX</span>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <label>对象描述：</label>
              <span>XXXXXXXX</span>
            </Col>
            <Col span="12">
              <label>设备描述：</label>
              <span>XXXXXXXX</span>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <label>类别：</label>
              <span>XXXXXXXX</span>
            </Col>
            <Col span="12">
              <label>告警ID：</label>
              <span>XXXXXXXX</span>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <label>级别：</label>
              <span>XXXXXXXX</span>
            </Col>
            <Col span="12">
              <label>次数：</label>
              <span>XXXXXXXX</span>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <label>首次发生时间：</label>
              <span>XXXXXXXX</span>
            </Col>
            <Col span="12">
              <label>最后发生时间：</label>
              <span>XXXXXXXX</span>
            </Col>
          </Row>
          <Row class="desc">
            <Col span="24">
              <label>告警内容：</label>
              <span>告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容告警内容</span>
            </Col>
          </Row>
        </div>
        <Row class="table-title">
          <label>状态信息</label>
        </Row>
        <div class="table-content">
          <Row>
            <Col span="12">
              <label>派单状态：</label>
              <span>XXXXXXXX</span>
            </Col>
            <Col span="12">
              <label>通知状态：</label>
              <span>XXXXXXXX</span>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <label>确认状态：</label>
              <span>XXXXXXXX</span>
            </Col>
            <Col span="12">
              <label>确认人：</label>
              <span>XXXXXXXX</span>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <label>确认时间：</label>
              <span>XXXXXXXX</span>
            </Col>
            <Col span="12">
              <label>上次级别：</label>
              <span>XXXXXXXX</span>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <label>是否升级过：</label>
              <span>XXXXXXXX</span>
            </Col>
            <Col span="12">
              <label>升级时间：</label>
              <span>XXXXXXXX</span>
            </Col>
          </Row>
        </div>
        <p class="btns">
          <Button type="primary">确认告警</Button>
          <Button type="primary">清除告警</Button>
          <Button type="primary">关闭</Button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api";
import G2 from "@antv/g2";
// import L7 from '@antv/l7';
import { View } from "@antv/data-set";
import mapKey from "./mapKey.json";
// import flight from "./flight.json";
// import switchtab from "@/components/SwitchTab.vue";
import comselect from "@/components/ComSelect.vue";
import dateformat from "@/utils/dateformat.js";

// 开始使用 G2 绘制地图
var provinceChart = void 0;

// 当前聚焦的区域
var currentAreaNode = void 0;
export default {
  components: { comselect },
  data() {
    return {
      redionType:'in',
      colorsArr: ["#25a23fcc", "#dd704ccc", "#346ee4cc"],
      count: 0,
      showAlarmDetail: false,
      // provinceChart: null, //开始使用 G2 绘制地图
      // currentAreaNode: null, // 当前聚焦的区域
      map: null,
      geocoder:null,
      mapAllTotal: 0,
      mapErrorTotal: 0,
      top5Datas: [
        [
          {
            name: "CPU",
            key: "1",
            api: "/queryCpuTop5"
          },
          {
            name: "内存",
            key: "2",
            api: "/queryMemoryTop5"
          },
          {
            name: "端口出",
            key: "3",
            api: "/queryPortOutTop5"
          },
          {
            name: "端口入",
            key: "4",
            api: "/queryPortInTop5"
          },
          {
            name: "带宽利用率",
            key: "5",
            api: "/queryDaiKuanRateTop5"
          }
        ],
        [
          {
            name: "QOS",
            key: "6"
          },
          {
            name: "SLA",
            key: "7"
          },
          {
            name: "时延",
            key: "8"
          },
          {
            name: "抖动",
            key: "9"
          },
          {
            name: "丢包",
            key: "10"
          }
        ]
      ],
      top5switch: 0,
      top5Index: "2",
      top5Chart: null,
      appTop5Chart:null,
      alarmCount: {
        total: 0,
        paidan: 0
      },
      row1kpis: [
        {
          img: "static/images/zhongduanzhuanxian.png",
          label: "中断专线数量",
          api: "/getbrokenlinkcounts",
          value: "0"
        },
        {
          img: "static/images/fugaishengfenshuliang.png",
          label: "覆盖省份数量",
          api: "/coverslinkprovinces",
          value: "0"
        },
        {
          img: "static/images/shenqingzhongdezhuanxian.png",
          label: "申请中的专线",
          api: "/applylinkcounts",
          value: "0"
        },
        {
          img: "static/images/neiwangshebeishuliang.png",
          label: "内网设备数量",
          api: "/qualityscore",
          value: "0"
        }
      ],
      pageData: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      alarmPager: {
        page: 0,
        total: 0
      },
      alarmKey: [
        {
          key: 1,
          label: "严重",
          color: "#c4342b",
          count: 0
        },
        {
          key: 2,
          label: "主要",
          color: "#c16d01",
          count: 0
        },
        {
          key: 3,
          label: "次要",
          color: "#f9e265",
          count: 0
        },
        {
          key: 4,
          label: "普通",
          color: "#5dcbf1",
          count: 0
        }
      ],
      homeConditionShow: false,
      alarmCondition: {
        title: "",
        ipv4: "",
        appSystem: "ALL",
        queren: "ALL",
        severity: {
          level1: false,
          level2: false,
          level3: false,
          level4: false
        },
        timerange: ["", ""]
      },
      alarmColumns: [
        {
          title: "标题",
          key: "title",
            render: (h, params) => {
              return <a href={API.index.queryAlertById + "?type=1&eventId=" + params.row.eventID} target="_blank">{params.row.title}</a>
            }
          //render: title => <a href="http://www.baidu.com" target="_blank">{title}</a>,

        },
        {
          title: "内容",
          key: "text",
          minWidth: 200
          // ellipsis:true,
          // tooltip:true
        },
        {
          title: "告警级别",
          key: "severity",
          maxWidth: 90,
          render: (h, params) => {
            let maps = [
              {
                key: 1,
                label: "严重",
                color: "#c4342b",
                count: 0
              },
              {
                key: 2,
                label: "主要",
                color: "#c16d01",
                count: 0
              },
              {
                key: 3,
                label: "次要",
                color: "#f9e265",
                count: 0
              },
              {
                key: 4,
                label: "普通",
                color: "#5dcbf1",
                count: 0
              }
            ];
            return h("div", [
              h("span", {
                class: "home-table-condition-alarmpoint",
                style: {
                  backgroundColor: maps[params.row.severity - 1].color
                }
              }),
              h("label", maps[params.row.severity - 1].label)
            ]);
          }
        },
        {
          title: "次数",
          key: "total",
          maxWidth: 80
        },
        {
          title: "最后发生时间",
          key: "lastOccurTimeStr",
          maxWidth: 150
        },
        {
          title: "应用系统",
          key: "appSystem"
        },
        {
          title: "设备描述",
          key: "pnodeName"
        },
        {
          title: "对象描述",
          key: "nodeName"
        }
      ],
      alarmData: [],
      alarmSelectValue: "1",
      alarmSelectData: ["专线总数","异常总数"]
    };
  },
  mounted() {
    this.setRow1Kpis();
    this.pieChart();
    this.kpiTop5();
    this.proviceChart();
    this.appTop5('in');
    // this.setMapColor();
    this.alarmShow();
    this.setProvinceColor();
    // this.buildProvinceLine();
  },
  methods: {
    setProvinceColor() {
      var _this = this;
      var apiurl = API.basePath + "/queryMapLinks";
      var colorRegions=[];
      var alltotal = 0,
        errortotal = 0;
      this.axios.get(apiurl).then(result => {
        // console.log(`--------------${apiurl}`,result);
        for (var r of result) {
          
          // console.log("_provice",_provice);
          // #25a23fcc 绿色，#dd704ccc 橙色，#346ee4cc蓝色
          //
          if (r.downnumber > 0) {
            colorRegions.push({
              name:r.province,
              itemStyle:{
                color: "#DB6812"
              }
            });
          } else if (r.slanumber > 0) {
            colorRegions.push({
              name:r.province,
              itemStyle:{
                color: "#FFFF02"
              }
            });
          } else{
            colorRegions.push({
              name:r.province,
              itemStyle:{
                color: "#01AFF9"
              }
            });
          }
          alltotal = alltotal + r.totals;
          errortotal = errortotal + r.downnumber + r.slanumber;
        }
        this.mapAllTotal = alltotal;
        this.mapErrorTotal = errortotal;
        this.buildProvinceLine(colorRegions);
      });
    },
    buildProvinceLine(colorRegions) {
      let _this = this;
      var alirl = []
      this.axios.get(`${API.index.getMapltl}`).then(result => {
        if (result) {
          _.forEach(result, function(value) {
            console.log("value",value);

            let _orig = mapKey[value.orig];
            let _dest = mapKey[value.dest];
            if (_orig && _dest) {
              var arr = []; //经纬度坐标数组
              var start = _orig.xy,
                end = _dest.xy;
                alirl.push([start,end]);
            }
          })
          this.mapChart(colorRegions,alirl);
        }
      }).catch(e=>{
        console.log("eeeeeeeee",e);
        this.mapChart(colorRegions,alirl);
      });
    },
    mapChart(colorRegions,alirl){
      var dom = document.getElementById("mapChart");
      var myChart = echarts.init(dom);
      var app = {};
      var option = null;

      // var alirl = [
      //     [
      //         [121.15, 31.89],
      //         [109.781327, 39.608266]
      //     ]
      // ]

      option = {
          title: {
              text: '',
              x: 'center',
              top: "0",
              textStyle: {
                  color: '#000',
                  fontSize: 24
              }
          },
          tooltip: {
              show: true,
              formatter:(params)=>{
                let data = "测试1:"+params.name + "<br/>"+"值:"+ params.value[2]+"<br/>"+"地理坐标:[" + params.value[0]+","+params.value[1] +"]";
                return data;
              },
          },
          geo3D: {
              map: 'china',
              roam: true,
              regions: colorRegions,
              boxWidth:130,
              width:900,       
              height:500,
              // top:10,
              bottom:80,
              itemStyle: {
                  // areaColor: 'rgb(5,101,123)',
                  color: "#2C4272",
                  opacity: 1,
                  borderWidth: 0.8,
                  borderColor: 'rgb(62,215,213)'
              },
              label: {
                  show: false,
                  distance: 50, 
                  textStyle: {
                      color: '#fff', //地图初始化区域字体颜色
                      fontSize: 8,
                      
                      opacity: 1,
                      backgroundColor: 'rgba(0,0,0,0)'
                  },
              },
              emphasis: { //当鼠标放上去  地区区域是否显示名称
                  label: {
                      show: true,
                      distance:0,
                      textStyle: {
                          color: '#0000CD',
                          fontSize: 12,
                          backgroundColor: 'rgba(0,23,11,0)'
                      }
                  }
              },
              //shading: 'lambert',
              light: { //光照阴影
                  main: {
                      color: '#fff', //光照颜色
                      intensity: 1.2, //光照强度
                      //shadowQuality: 'high', //阴影亮度
                      shadow: false, //是否显示阴影
                      alpha: 55,
                      beta: 15

                  },
                  ambient: {
                      intensity: 0.3
                  }
              },
             viewControl: {        
                            alpha: 30,                      // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
                            beta: 0,                       // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
                         
                        },
              // realisticMaterial:{
              //     detailTexture:'asset/leather/leather_albedo.jpg'
              // }
          },
          series: [

              //画线

              {
                  type: 'lines3D',

                  coordinateSystem: 'geo3D',
                 
                  effect: {
                      show: true,
                      period: 2, //尾迹特效的周期。，值越小速度越快
                      // constantSpeed: 10, //轨迹特效的移动动画是否是固定速度，单位按三维空间的尺寸，设置为非 null 的值后会忽略 period 配置项。
                      trailColor:"#01Aff9", //尾迹的颜色，默认跟线条颜色相同。

                      trailWidth: 2,//尾迹的宽度。
                      trailOpacity: 0.5,
                      trailLength: 0.8, //尾迹的长度，范围从 0 到 1，为线条长度的百分比。
                  },

                  lineStyle: {
                     // width: 2,
                     // opacity: 0.05,
                      // width: 6,
                    color: '#01Aff9',
                    width: 1,
                    opacity: 1,
                    curveness: 1
                  },
                  blendMode: 'lighter',

                  data: alirl
                  // data: [
                  //     {
                  //         coords: [ [120, 66], [122, 67] ],
                  //         // 数据值
                  //         value: 10,
                  //         // 数据名
                  //         name: 'foo',
                  //         // 线条样式
                  //         lineStyle: {}
                  //     }
                  // ]
              }
          ]
      };

       console.log("option",option)
        myChart.setOption(option);
      // });
    },
    alarmDetail(row, index) {
      console.log("row", row);
      // this.showAlarmDetail = true;
      var _this = this;
      var apiurl = API.index.queryAlertById + "?type=1&eventId=" + row.eventID;
      // this.axios.get(apiurl).then(result => {
      //   console.log(`--------------${apiurl}`,result);
      // });

      window.open(apiurl, "_blank");
    },
    setMapColor() {
      var _this = this;
      var apiurl = API.basePath + "/queryMapLinks";
      var colorMap = {},
        alltotal = 0,
        errortotal = 0;
      this.axios.get(apiurl).then(result => {
        // console.log(`--------------${apiurl}`,result);
        for (var r of result) {
          let _provice = mapKey[r.province];
          if (!_provice) continue;
          // console.log("_provice",_provice);
          // #25a23fcc 绿色，#dd704ccc 橙色，#346ee4cc蓝色
          colorMap[_provice.code] = "#346ee4cc";
          if (r.slanumber > 0) {
            colorMap[_provice.code] = "#25a23fcc";
          }
          if (r.downnumber > 0) {
            colorMap[_provice.code] = "#dd704ccc";
          }
          alltotal = alltotal + r.totals;
          errortotal = errortotal + r.downnumber + r.slanumber;
        }
        this.mapAllTotal = alltotal;
        this.mapErrorTotal = errortotal;
        this.countryMap(colorMap);
      });
    },
    countryMap(colorMap) {
      var _this = this;
      var colors = {};

      var getColorByMap = function(adcode) {
        var rcolor = "#052051";
        if (colorMap[adcode]) {
          rcolor = colorMap[adcode];
        }
        return rcolor;
      };
      var disCountry = new AMap.DistrictLayer.Country({
        zIndex: 10,
        SOC: "CHN",
        depth: 1,
        styles: {
          "nation-stroke": "#22ffff",
          "coastline-stroke": [0.85, 0.63, 0.94, 1],
          "province-stroke": "white",
          "city-stroke": "rgba(255,255,255,0.5)", //中国特有字段
          fill: function(props) {
            //中国特有字段
            return getColorByMap(props.adcode_pro);
          }
        }
      });

      var map = new AMap.Map("mapChart", {
        version: "1.4.13",
        mapStyle: "amap://styles/midnight",
        features: ["bg", "road"],
        center: [50, 59],
        pitch: 40,
        zoom: 4.2,
        zooms: [4, 5],
        layers: [disCountry],
        viewMode: "3D",
        skyColor: "#1b2143"
      });

      map.on("click", function(ev) {
        // var px = ev.pixel;
        console.log("ev", ev);
        // 拾取所在位置的行政区
        // var props = disCountry.getDistrictByContainerPos(px);
        // console.log("props", props);

        if(!_this.geocoder){
          _this.geocoder = new AMap.Geocoder({});
        }
        _this.geocoder.getAddress(ev.lnglat, function(status, result) {
          if (status === 'complete'&&result.regeocode) {
            console.log("result",result);
            let province = result.regeocode.addressComponent.province;
            // var address = result.regeocode.formattedAddress;
            // document.getElementById('address').value = address;
          }else{
            
          }
        });
        // if (props) {
        //     var SOC = props.SOC;
        //     // 重置行政区样式
        //     disWorld.setStyles({
        //         // 国境线
        //         //nation-stroke': nationStroke,
        //         // 海岸线
        //         //'coastline-stroke': '',
        //         'fill': function (props) {
        //             return props.SOC == SOC ? nationFill : 'white';
        //         }
        //     });

        //     updateInfo(props);
        // }
      });

      this.map = map;
      this.buildLine();
    },
    worldMap() {
      var _this = this;
      var centers = {
        RUS: [93.729504, 68.718195],
        USA: [-113.877655, 52.652266],
        JPN: [136.824904, 38.00712]
      };
      var SOCSpeed = {
        CHN: 7.0, //广东
        JPN: 7.0, //青海
        USA: 10 //西藏
      };
      var getColorBySOC = function(soc) {
        var gdp = SOCSpeed[soc];
        var rcolor = "#052051";
        if (gdp) {
          rcolor = _this.colorsArr[_this.count % _this.colorsArr.length];
          _this.count++;
        }
        return rcolor;
      };

      var disWorld = new AMap.DistrictLayer.World({
        zIndex: 10,
        styles: {
          // 颜色格式: #RRGGBB、rgba()、rgb()、[r,g,b,a]
          "nation-stroke": function(props) {
            //props:{type:Nation_Border_China/Nation_Border_Foreign}
            if (props.type == "Nation_Border_China") {
              return "red";
            } else {
              return "white";
            }
          },
          "coastline-stroke": [0.8, 0.63, 1, 1],
          fill: function(props) {
            //props:{NAME_CHH,NAME_ENG,SOC}
            return getColorBySOC(props.SOC);
          }
        }
      });

      var map = new AMap.Map("container", {
        zooms: [3, 15],
        center: [100, 36],
        mapStyle: "amap://styles/midnight",
        showIndoorMap: false,
        zoom: 3,
        isHotspot: false,
        defaultCursor: "pointer",
        touchZoomCenter: 1,
        pitch: 30,
        layers: [disWorld],
        viewMode: "3D",
        resizeEnable: true
      });
    },
    buildLine() {
      if (!this.map) return;

      let _this = this;
      this.axios.get(`${API.index.getMapltl}`).then(result => {
        if (result) {
          _.forEach(result, function(value) {
            let _orig = mapKey[value.orig];
            let _dest = mapKey[value.dest];
            if (_orig && _dest) {
              var arr = []; //经纬度坐标数组
              var start = _orig.xy,
                end = _dest.xy,
                num = 180;
              var _x = end[0] - start[0];
              var _y = end[1] - start[1];
              var radionUnit = Math.PI / 180;

              for (var i = 0; i < num; i++) {
                var radion = i * radionUnit;
                var x = ((i + 1) * _x) / num + start[0];
                var y =
                  ((i + 1) * _y) / num +
                  start[1] +
                  (Math.sin(radion) * Math.abs(_y) * 3) / 4;
                arr.push([x, y]);
              }
              let firstpoint = arr[0];
              let lastpoint = arr[arr.length - 1];
              // console.log("firstpoint",firstpoint);
              // console.log("lastpoint",lastpoint);
              // arr.splice(0, 3);
              arr.splice(arr.length - 10, 10);
              // console.log("firstpoint",arr[0]);
              // console.log("lastpoint",arr[arr.length-1]);

              //曲线
              var polyline = new AMap.Polyline({
                path: arr,
                geodesic: true,
                lineJoin: "round",
                showDir: true,
                dirColor: "white",
                strokeColor: "#29b6f6",
                outlineColor: "#29b6f6",
                isOutline: true,
                strokeWeight: 2.0,
                lineCap: "round",
                zIndex: 2
              });

              let toppoint = arr[arr.length - 1];
              let bottompoint = arr[arr.length - 2];

              let point0x = toppoint.lat - (bottompoint.lat - toppoint.lat) * 8;
              let point0y = toppoint.lng - (bottompoint.lng - toppoint.lng) * 8;
              // console.log("point0::",point0x,point0y)
              let point1x = bottompoint.lat + (bottompoint.lng - toppoint.lng);
              let point1y = bottompoint.lng - (bottompoint.lat - toppoint.lat);
              // console.log("point1::",point1x,point1y)
              let point2x = bottompoint.lat - (bottompoint.lng - toppoint.lng);
              let point2y = bottompoint.lng + (bottompoint.lat - toppoint.lat);
              // console.log("point2::",point2x,point2y)

              //起点
              var circle = new AMap.Circle({
                center: firstpoint,
                fillColor: "#81d4fa",
                strokeColor: "white",
                radius: 400 //m
              });
              // 终点
              var circleMarker = new AMap.Circle({
                center: lastpoint,
                fillColor: "#80d8ff",
                strokeColor: "white",
                radius: 400 //m
              });
              // 箭头
              var polygon = new AMap.Polygon({
                fillColor: "#29b6f6",
                strokeColor: "#29b6f6",
                path: [
                  [point0y, point0x],
                  [point1y, point1x],
                  [point2y, point2x]
                ]
              });

              _this.map.add([circle, circleMarker, polygon, polyline]);
              // this.map.add([polygon, polyline]);
            }
          });
        }
      });
    },
    alarmSelect(name) {
      console.log("do something");
    },
    setRow1Kpis() {
      for (var i = 0; i < this.row1kpis.length; i++) {
        let kpi = this.row1kpis[i];
        if (kpi.api) {
          let url = kpi.api;
          this.axios.get(`${API.basePath + url}`).then(result => {
            let _value = "0";
            if (result) {
              if (result.data) {
                _value = result.data.result || "0";
              } else {
                _value = result.result || result.scores || "0";
              }
            }
            kpi.value = _value;
          });
        }
      }
    },
    changeTop5(s) {
      // console.log(s);
      this.top5Index = s.key;
      this.kpiTop5();
    },
    kpiTop5() {
      // top5Index 是1-10的字符串
      let url = API.index.cpuTop5,
        top5IndexInt = parseInt(this.top5Index) - 1;
      url = this.top5Datas[parseInt(top5IndexInt / 5)][top5IndexInt % 5].api;

      this.axios.get(`${API.basePath + url}`).then(result => {
        // console.log("--------------"+url,result);
        //   result =     [
        // {
        //   "ip": "172.19.10.250",
        //   "value": 90,
        //   "res_descr": "BJCYBDZHT-R-2911-2.vanke.net.cn",
        //   "note": "北京房山地产"
        // }
        // ]

        console.log("top5Chart",this.top5Chart)
        if (this.top5Chart) {
          this.top5Chart.changeData(result);
          // this.top5Chart.axis("ip", {
          //   label: {
          //     offset: 12
          //   }
          // });
          // this.top5Chart.render();
        } else {
          var chart = new G2.Chart({
            container: "kpiTop5Chart",
            forceFit: true,
            height: 230,
            padding: ["auto", "auto", 30, "auto"]
          });
          chart.source(result);
          chart.axis("ip", {
            label: {
              offset: 12,
              textStyle: {
                fill: "#9798b8" // 文本颜色
              }
            }
          });
          chart.axis("value", {
            label: {
              textStyle: {
                fill: "#9798b8" // 文本颜色
              }
            }
          });
          chart.tooltip(true, {
            showTitle: false,// 默认标题不显示
             itemTpl: '<ul><li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{pname}: {PROVINCE}</li><li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{cname}: {CITY}</li><li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{dname}: {INSTALLADDRESS}</li><li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{vname}: {value}</li></ul>'//定义标头

           // itemTpl: '<ul><li>{pname}: {PROVINCE}</li><li>{cname}: {CITY}</li><li>{dname}: {INSTALLADDRESS}</li><li>{vname}: {value}</li></ul>'

            // htmlContent: function htmlContent(title, items) {
            //   let selfItem = items[0]
            //   let html = '<div class="g2-tooltip">'
            //   // let titleDom = `<div class="g2-tooltip-title" style="margin-bottom: 4px;">${title}</div>`
            //   let sumDom = `<div>
            //               省份：${selfItem.PROVINCE}
            //             </div>
            //             <div>
            //               地址：${selfItem.CITY}
            //             </div>
            //             <div>
            //               装机地址：${selfItem.INSTALLADDRESS}
            //             </div>
            //             `
            //         return html  + sumDom + '</div>'
            //       }

          });

          // chart.tooltip("ip*value", function(item, percent) {
          //   return {
          //     name: item,
          //     value: value
          //   };
          // })
          chart.coord().transpose();
          chart.interval().position("ip*value").tooltip("PROVINCE*CITY*INSTALLADDRESS*value",(PROVINCE,CITY,INSTALLADDRESS,value) => {
            return {
              pname:'省份',
              PROVINCE,
              cname:'地市',
              CITY,
              dname:'装机地址',
              INSTALLADDRESS,
              vname:'值',
              value
            };
          });
          chart.render();
          this.top5Chart = chart;
        }
      });
    },
    pieChart() {
      this.axios.get(`${API.index.alarmCount}`).then(result => {
        // console.log(`--------------${API.index.alarmCount}`,result);
        // console.log(result);
        // [
        //   {
        //     "alnum1": null,
        //     "alnum2": null,
        //     "alnum3": null,
        //     "alnum4": null,
        //     "total": null,
        //     "paidan": 0
        //   }
        // ]
        let resultData = result[0];
        // let resultData = {
        //   "alnum1": 10,
        //   "alnum2": 43,
        //   "alnum3": 23,
        //   "alnum4": 5,
        //   "total": 81,
        //   "paidan": 38
        // }
        this.alarmCount = {
          total: resultData.total,
          paidan: resultData.paidan
        };
        let paidanData = [
          {
            value: resultData.total - resultData.paidan,
            type: "未派单"
          },
          {
            value: resultData.paidan,
            type: "已派单"
          }
        ];
        let alarmCount = [
          {
            value: resultData.alnum1,
            name: "严重告警"
          },
          {
            value: resultData.alnum2,
            name: "主要告警"
          },
          {
            value: resultData.alnum3,
            name: "次要告警"
          },
          {
            value: resultData.alnum4,
            name: "普通告警"
          }
        ];
        var dv = new View();
        dv.source(paidanData).transform({
          type: "percent",
          field: "value",
          dimension: "type",
          as: "percent"
        });
        var chart = new G2.Chart({
          container: "alarmChart",
          forceFit: true,
          height: 210,
          padding: [20, 0, 10, 0]
        });
        chart.source(dv, {
          percent: {
            formatter: function formatter(val) {
              val = (val * 100).toFixed(2) + "%";
              return val;
            }
          }
        });
        chart.coord("theta", {
          radius: 0.57
        });
        chart.tooltip({
          showTitle: false
        });
        // chart.legend(false);
        chart
          .intervalStack()
          .position("percent")
          .color("type", ["#234c8d", "#3778e7"])
          // .label("type", {
          //   offset: -10
          // })
          .tooltip("type*percent", function(item, percent) {
            percent = (percent * 100).toFixed(2) + "%";
            return {
              name: item,
              value: percent
            };
          })
          .select(false)
          .style({
            lineWidth: 0,
            stroke: "#fff"
          });

        chart.legend("type", false);
        chart.legend({
          position: "top", // 设置图例的显示位置
          // itemGap: 20, // 图例项之间的间距
          title: null, // 不展示图例的标题
          marker: "circle" // 设置图例 marker 的显示样式
        });
        var outterView = chart.view();
        var dv1 = new View();
        // dv1.source(alarmCount).transform({
        //   type: "percent",
        //   field: "value",
        //   dimension: "name",
        //   as: "percent"
        // });
        // outterView.source(dv1, {
        //   percent: {
        //     formatter: function formatter(val) {
        //       val = (val * 100).toFixed(2) + "%";
        //       return val;
        //     }
        //   }
        // });
        outterView.source(alarmCount);
        outterView.coord("theta", {
          innerRadius: 0.88,
          radius: 0.9
        });
        outterView
          .intervalStack()
          .position("value")
          .color("name", ["#db504d", "#c16d01", "#f9e265", "#5dcbf1"])
          // .label("value",{offset: 5,textStyle: {
          //     fill: '#9798b8'
          //   }
          // })
          // .tooltip("name*percent", function(item, percent) {
          //   percent = (percent * 100).toFixed(2) + "%";
          //   return {
          //     name: item,
          //     value: percent
          //   };
          // })
          .select(false)
          .style({
            lineWidth: 0,
            stroke: "#fff"
          });

        chart.render();
      });
    },
    proviceChart() {
      var data = [];

      this.axios.get(`${API.index.queryLinksPro}`).then(result => {
        let maxValue = 0;
        for (var r of result) {
          // console.log("r",r)
          data.push({
            company: "已开通",
            type: r.province,
            value: r.monitornums
          });
          data.push({
            company: "未开通",
            type: r.province,
            value: r.nomonitornums
          });
          maxValue = Math.max(r.monitornums, r.monitornums, maxValue);
        }
        var chart = new G2.Chart({
          container: "proviceChart",
          forceFit: true,
          height: 200,
          padding: ["auto", "auto", 70, "auto"]
        });
        chart.source(data);
        chart.scale("value", {
          alias: "占比（%）",
          max: maxValue,
          min: 0,
          tickCount: 4
        });
        chart.axis("type", {
          label: {
            textStyle: {
              fill: "#9798b8"
            }
          },
          tickLine: {
            alignWithLabel: false,
            length: 0
          }
        });

        chart.axis("value", {
          label: {
            textStyle: {
              fill: "#9798b8"
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
          .interval()
          .position("type*value")
          .color("company")
          .opacity(1)
          .adjust([
            {
              type: "dodge",
              marginRatio: 1 / 32
            }
          ]);
        chart.render();
      });
    },
    appTop5(type) {
      console.log("type",type)
      var Util = G2.Util;
      //queryBandRate
      
       var apiurl =  apiurl= API.index.queryBandRate + "?inorout=" + type;
      console.log("apiurl",apiurl)
      //`${API.index.dataCenter}`  原来
      this.axios.get(apiurl).then(result => {
        // console.log(`--------------${API.index.dataCenter}`,result);
        // [
        //   {
        //     "dctime": "00:00",
        //     "value": 0.23
        //   }
        // ]

        console.log("appTop5Chart",this.appTop5Chart)
        if (this.appTop5Chart) {
          this.appTop5Chart.changeData(result);
                 
        } else{

       var chart = new G2.Chart({
          container: "appTop5Chart",
          forceFit: true,
          height: 160,
          padding: ["auto", "auto", 40, "auto"]
        });
      
        chart.source(result);
        // chart.scale("value", {
        //   alias: '输入速率',
        //   min: 0
        // });
        //   chart.scale("ssvalue", {
        //   alias: '输出速率',
        //   min: 0
        // });
        chart.scale("dctime", {
          range: [0, 1],
          tickCount: 10
        });
        

       
        chart.axis("value", {
          position:'left',
          label: {
            textStyle: {
              fill: "#9798b8" // 文本颜色
            },
            formatter: val => {
              return val + "Mbs";
            }
          }
        });
        //  chart.axis("ssvalue", {
        //   position:'right',
        //    title: {
        //     autoRotate: 'false', // 是否需要自动旋转，默认为 true
        //     offset: 60, // 数值，设置坐标轴标题距离坐标轴线的距离
        //     // 设置标题的文本样式
        //     textStyle: {
        //       textAlign: 'middle', // 文本对齐方向，可取值为： start middle end
        //       fill: '#fff', // 文本的颜色
        //       fontSize: '12', // 文本大小
        //       // fontWeight: 'bold', // 文本粗细
        //     //  rotate: 30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
        //       textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
        //     },
        //     position: 'center' // 标题的显示位置（相对于坐标轴线），可取值为 start center end
        //   },
        //   label: {
        //     textStyle: {
        //       fill: "#9798b8" // 文本颜色
        //     },
        //     formatter: val => {
        //       return val + "Mbs";
        //     }
        //   }
        // });
        chart.axis("dctime", {
          label: {
            // offset:10,
            textStyle: {
              fill: "#9798b8" // 文本颜色
            },
            rotate: 0,
            autoRotate: false,
            // formatter: val => {
            //   if (val.indexOf(":05") != -1 || val.indexOf(":35") != -1) {
            //     return val;
            //   } else {
            //     return "";
            //   }
            // }
          }
        });

         
        chart.tooltip({
          crosshairs: {
            type: "line"
          }
        });
        // chart.line().position('dctime*value');
        // chart.point().position('dctime*value').size(4).shape('circle').style({
        //   stroke: '#fff',
        //   lineWidth: 1
        // });

        chart.legend({
          position: "bottom-center",
          onHover: Util.debounce(function(ev) {
            var item = ev.item;

            var country = item.dataValue;
            chart.get("geoms").forEach(function(geom) {
              geom.getShapes().forEach(function(shape) {
                var origin = shape.get("origin");
                if (Util.isArray(origin)) {
                  origin = origin[0];
                }
                if (!shape.get("_originAttrs")) {
                  shape.set("_originAttrs", Util.cloneDeep(shape._attrs)); // 缓存原来的属性
                }
                if (origin._origin.country === country) {
                  var originAttrs = shape.get("_originAttrs");
                  shape._attrs = Util.cloneDeep(originAttrs);
                } else {
                  shape.attr("stroke", "#ccc");
                }
              });
            });
          }),
          onUnhover: Util.debounce(function() {
            chart.get("geoms").forEach(function(geom) {
              geom.getShapes().forEach(function(shape) {
                if (shape.get("_originAttrs")) {
                  var originAttrs = shape.get("_originAttrs");
                  shape._attrs = Util.cloneDeep(originAttrs);
                }
              });
            });
            chart.get("canvas").draw();
          })
        });
        chart
          .line()
          .position("dctime*value")
          .color("ip")
          .size("ip", function(val) {
            // if (val === 'China') {
            //   return 4;
            // }
            return 2;
          })
          .opacity("ip", function(val) {
            // if (val === 'China') {
            //   return 1;
            // }
            return 0.7;
          });
        chart
          .point()
          .position("dctime*value")
          .color("ip")
          .size("ip", function(val) {
            // if (val === 'China') {
            //   return 4;
            // }
            return 0;
          })
          .style({
            lineWidth: 2
          });

        // //新加右侧y周
        //   chart
        //   .line()
        //   .position("dctime*ssvalue")
        //   .color("ip")
        //   .size("ip", function(val) {
        //     // if (val === 'China') {
        //     //   return 4;
        //     // }
        //     return 2;
        //   })
        //   .opacity("ip", function(val) {
        //     // if (val === 'China') {
        //     //   return 1;
        //     // }
        //     return 0.7;
        //   });
        // chart
        //   .point()
        //   .position("dctime*ssvalue")
        //   .color("ip")
        //   .size("ip", function(val) {
        //     // if (val === 'China') {
        //     //   return 4;
        //     // }
        //     return 0;
        //   })
        //   .style({
        //     lineWidth: 2
        //   });


        chart.render();
        this.appTop5Chart=chart;
        }
        
      });
    },
    inorout(e){
      console.log("^^^^^^^^^^^^^^^^^^^^^^",e)
      this.appTop5(e)
    },
    alarmShow() {
      let _this = this;
      var apiurl = API.index.queryAllalert;
      let params = [];
      if (this.alarmCondition.title) {
        params.push("title=" + this.alarmCondition.title);
      }
      if (this.alarmCondition.appSystem != "ALL") {
        params.push("appSystem=" + this.alarmCondition.appSystem);
      }

      if (this.alarmCondition.ipv4) {
        params.push("IPV4=" + this.alarmCondition.ipv4);
      }
      if (this.alarmCondition.queren != "ALL") {
        params.push("ackStatusName=" + this.alarmCondition.queren);
      }

      if (this.alarmCondition.timerange[0]) {
        params.push("starttime=" + dateformat.dateFormat(this.alarmCondition.timerange[0],"yyyy-MM-dd hh:mm:ss"));
        params.push("endtime=" + dateformat.dateFormat(this.alarmCondition.timerange[1],"yyyy-MM-dd hh:mm:ss"));
      }

      let severity = [];
      if (this.alarmCondition.severity.level1) {
        severity.push(1);
      }
      if (this.alarmCondition.severity.level2) {
        severity.push(2);
      }
      if (this.alarmCondition.severity.level3) {
        severity.push(3);
      }
      if (this.alarmCondition.severity.level4) {
        severity.push(4);
      }
      if (severity.length > 0) {
        params.push("severity=" + severity.join(","));
      }

      if (params.length > 0) {
        console.log("params", "?" + params.join("&"));
        apiurl = apiurl + "?" + params.join("&");
      }

      this.axios.get(apiurl).then(result => {
        console.log(`--------------${apiurl}`, result);
        // let result = {
        //   "total":2,
        //   "page":1,
        //   "row":500,
        //   "rows":[
        //     {"total":79273,"dispatchRecord":"false","EXT_NUM_FIELD9":"0","EXT_NUM_FIELD8":"0","hadParseResInfo":false,"EXT_NUM_FIELD7":"0","EXT_NUM_FIELD6":"0","EXT_NUM_FIELD5":"0","EXT_NUM_FIELD4":"0","occurTimeStr":"2018-05-13 15:27:23","city":"无锡","EXT_NUM_FIELD3":"0","upgradeTimeStr":"","orgSeverity":"Info","kpiNo":0,"lastcolor":"#ffc800","category":"通断性","sheetNo":"","processResult":"","extNum1Str":"2018-05-13 15:37:43","orgCategory":"IpAddress","title":"通断性IP地址ping超时","sheetStatus":"","note":"","lastOccurTime":1551163696195,"enTitle":"","userProperties":{"EXT_STR_FIELD28":"","EXT_NUM_FIELD6":0,"EXT_STR_FIELD27":"","EXT_STR_FIELD9":"WXDC-R-2911-CU.vanke.com","EXT_NUM_FIELD5":0,"EXT_STR_FIELD26":"","EXT_STR_FIELD8":"","EXT_NUM_FIELD4":0,"EXT_STR_FIELD25":"","EXT_STR_FIELD7":"","EXT_NUM_FIELD3":0,"EXT_STR_FIELD24":"","EXT_STR_FIELD23":"","EXT_STR_FIELD22":"","EXT_STR_FIELD21":"","EXT_STR_FIELD20":"","IPV6":"","IPV4":"172.19.10.130","EXT_NUM_FIELD10":0,"EXT_STR_FIELD30":"","EXT_STR_FIELD19":"","EXT_STR_FIELD18":"","EXT_STR_FIELD17":"","EXT_STR_FIELD16":"","EXT_STR_FIELD15":"","EXT_STR_FIELD14":"","EXT_STR_FIELD13":"","EXT_STR_FIELD12":"","EXT_STR_FIELD11":"ResIpAddress","EXT_STR_FIELD10":"","EXT_NUM_FIELD9":0,"EXT_NUM_FIELD8":0,"EXT_STR_FIELD29":"","EXT_NUM_FIELD7":0},"vendor":"Cisco","activeStatus":0,"lastSeverityName":"主要告警","pnodeName":"WXDC-R-2911-CU.vanke.com","collectTime":1526196443139,"dispatchTimeStr":"","dispatchUsers":"","EXT_STR_FIELD7":"","correlationType":"","suppressRuleId":0,"EXT_STR_FIELD9":"WXDC-R-2911-CU.vanke.com","EXT_STR_FIELD8":"","notifyUsers":"","cleanTimeStr":"","localMap":{},"ackTime":0,"nodeResType":"路由器","EXT_NUM_FIELD10":"0","occurTimeStr_TIMEZONE_2":"2018-05-13 12:27:23","helpModel":0,"g_context":{},"EXT_STR_FIELD30":"","dispatchTime":"0","dispatchStatusName":"未派单","lastOccurTimeStr_TIMEZONE_2":"2019-02-26 11:48:16","nodeName":"172.19.10.130","logicalCategorySub":"","upgradeStatusName":"否","extStr2":"","extStr3":"","extStr1":"1526197063403","extStr6":"","priority":22,"collectTimeStr":"2018-05-13 15:27:23","extStr4":"","extStr5":"","province":"江苏","notifyStatus":"false","parentFlag":0,"findResStatus":false,"sheetStatusName":"","dispatchStatus":"0","text":"无锡无锡MV0168（万科集团）：路由器WXDC-R-2911-CU.vanke.com IP地址172.19.10.130 网络中断。 发生时间2019-02-26 14:48:16，设备位置：江苏省,无锡市滨湖区湖滨路11号金域蓝湾花园33-2号。","notifyStatusName":"未通知","clrTime":0,"parseInServer":false,"clrOprter":"","IPV6":"","severityName":"主要告警","resID":330,"IPV4":"172.19.10.130","node":"172.19.10.130","ackTimeStr":"","filterRuleId":0,"toString":"","msgType":"","parentAlertID":0,"extStr1Str":"2018-05-13 15:37:43","EXT_STR_FIELD12":"","extNum1":1526197063401,"EXT_STR_FIELD11":"ResIpAddress","extNum2":-1,"EXT_STR_FIELD10":"","department":"","showAppAlarmMoNameRes":"false","children":[],"proviceCity":"江苏无锡","cleanStatus":"false","firstNotifyTimeStr":"","moName":"probe-vanke-IP-172.19.10.130","statusCode":6,"occurTime":1526196443107,"notifyTotal":"0","ackStatusName":"未确认","enCategory":"","corrEvents":[],"parentNode":"probe-vanke-SNMP-172.19.10.130","enText":"","upgradeID":0,"EXT_STR_FIELD15":"","EXT_STR_FIELD16":"","EXT_STR_FIELD13":"","EXT_STR_FIELD14":"","EXT_STR_FIELD19":"","EXT_STR_FIELD17":"","EXT_STR_FIELD18":"","logicalCategory":"","ackStatus":"false","EXT_STR_FIELD21":"","firstNotifyTime":"0","EXT_STR_FIELD20":"","EXT_STR_FIELD23":"","EXT_STR_FIELD22":"","community":"probe-vanke-SNMP-172.19.10.130","severity":2,"cleanStatusName":"未清除","appSys":"万科集团","lastSeverity":2,"ackOprter":"","EUID":302,"eventID":1123004,"source":"StatusPollParser","color":"#ffc800","lastOccurTimeStr":"2019-02-26 14:48:16","showAppAlarmParentNodeRes":"false","EXT_STR_FIELD24":"","EXT_STR_FIELD25":"","EXT_STR_FIELD26":"","notifyMode":"","EXT_STR_FIELD27":"","upgradeStatus":"false","EXT_STR_FIELD28":"","EXT_STR_FIELD29":""},{"total":1,"dispatchRecord":"false","EXT_NUM_FIELD9":"0","EXT_NUM_FIELD8":"0","hadParseResInfo":false,"EXT_NUM_FIELD7":"0","EXT_NUM_FIELD6":"0","EXT_NUM_FIELD5":"0","EXT_NUM_FIELD4":"0","occurTimeStr":"2019-01-14 17:43:37","city":"无锡","EXT_NUM_FIELD3":"0","upgradeTimeStr":"","orgSeverity":"Info","kpiNo":0,"lastcolor":"#ffc800","category":"通断性","sheetNo":"","processResult":"","extNum1Str":"2019-01-14 17:48:30","orgCategory":"IpAddress","title":"通断性IP地址ping超时","sheetStatus":"","note":"","lastOccurTime":1547459017418,"enTitle":"","userProperties":{"EXT_STR_FIELD28":"","EXT_NUM_FIELD6":0,"EXT_STR_FIELD27":"","EXT_STR_FIELD9":"WXDC-R-2911-CU.vanke.com","EXT_NUM_FIELD5":0,"EXT_STR_FIELD26":"","EXT_STR_FIELD8":"","EXT_NUM_FIELD4":0,"EXT_STR_FIELD25":"","EXT_STR_FIELD7":"","EXT_NUM_FIELD3":0,"EXT_STR_FIELD24":"","EXT_STR_FIELD23":"","EXT_STR_FIELD22":"","EXT_STR_FIELD21":"","EXT_STR_FIELD20":"","IPV6":"","IPV4":"172.19.10.130","EXT_NUM_FIELD10":0,"EXT_STR_FIELD30":"","EXT_STR_FIELD19":"","EXT_STR_FIELD18":"","EXT_STR_FIELD17":"","EXT_STR_FIELD16":"","EXT_STR_FIELD15":"","EXT_STR_FIELD14":"","EXT_STR_FIELD13":"","EXT_STR_FIELD12":"","EXT_STR_FIELD11":"ResIpAddress","EXT_STR_FIELD10":"","EXT_NUM_FIELD9":0,"EXT_NUM_FIELD8":0,"EXT_STR_FIELD29":"","EXT_NUM_FIELD7":0},"vendor":"Cisco","activeStatus":0,"lastSeverityName":"主要告警","pnodeName":"WXDC-R-2911-CU.vanke.com","collectTime":1547459017453,"dispatchTimeStr":"","dispatchUsers":"","EXT_STR_FIELD7":"","correlationType":"","suppressRuleId":0,"EXT_STR_FIELD9":"WXDC-R-2911-CU.vanke.com","EXT_STR_FIELD8":"","notifyUsers":"","cleanTimeStr":"","localMap":{},"ackTime":0,"nodeResType":"路由器","EXT_NUM_FIELD10":"0","occurTimeStr_TIMEZONE_2":"2019-01-14 14:43:37","helpModel":0,"g_context":{},"EXT_STR_FIELD30":"","dispatchTime":"0","dispatchStatusName":"未派单","lastOccurTimeStr_TIMEZONE_2":"2019-01-14 14:43:37","nodeName":"172.19.10.130","logicalCategorySub":"","upgradeStatusName":"否","extStr2":"","extStr3":"","extStr1":"1547459320347","extStr6":"","priority":22,"collectTimeStr":"2019-01-14 17:43:37","extStr4":"","extStr5":"","province":"江苏","notifyStatus":"false","parentFlag":0,"findResStatus":false,"sheetStatusName":"","dispatchStatus":"0","text":"无锡无锡MV0168（万科集团）：路由器WXDC-R-2911-CU.vanke.com IP地址172.19.10.130 网络中断。 发生时间2019-01-14 17:43:37，设备位置：江苏省,无锡市滨湖区湖滨路11号金域蓝湾花园33-2号。","notifyStatusName":"未通知","clrTime":0,"parseInServer":false,"clrOprter":"","IPV6":"","severityName":"主要告警","resID":330,"IPV4":"172.19.10.130","node":"172.19.10.130","ackTimeStr":"","filterRuleId":0,"toString":"","msgType":"","parentAlertID":0,"extStr1Str":"2019-01-14 17:48:40","EXT_STR_FIELD12":"","extNum1":1547459310326,"EXT_STR_FIELD11":"ResIpAddress","extNum2":-1,"EXT_STR_FIELD10":"","department":"","showAppAlarmMoNameRes":"false","children":[],"proviceCity":"江苏无锡","cleanStatus":"false","firstNotifyTimeStr":"","moName":"probe-vanke-IP-172.19.10.130","statusCode":6,"occurTime":1547459017418,"notifyTotal":"0","ackStatusName":"未确认","enCategory":"","corrEvents":[],"parentNode":"probe-vanke-SNMP-172.19.10.130","enText":"","upgradeID":0,"EXT_STR_FIELD15":"","EXT_STR_FIELD16":"","EXT_STR_FIELD13":"","EXT_STR_FIELD14":"","EXT_STR_FIELD19":"","EXT_STR_FIELD17":"","EXT_STR_FIELD18":"","logicalCategory":"","ackStatus":"false","EXT_STR_FIELD21":"","firstNotifyTime":"0","EXT_STR_FIELD20":"","EXT_STR_FIELD23":"","EXT_STR_FIELD22":"","community":"probe-vanke-SNMP-172.19.10.130","severity":2,"cleanStatusName":"未清除","appSys":"万科集团","lastSeverity":2,"ackOprter":"","EUID":302,"eventID":1891054,"source":"StatusPollParser","color":"#ffc800","lastOccurTimeStr":"2019-01-14 17:43:37","showAppAlarmParentNodeRes":"false","EXT_STR_FIELD24":"","EXT_STR_FIELD25":"","EXT_STR_FIELD26":"","notifyMode":"","EXT_STR_FIELD27":"","upgradeStatus":"false","EXT_STR_FIELD28":"","EXT_STR_FIELD29":""}
        // ]}

        // this.alarmPager.page = result.page;
        // this.alarmPager.total = result.total;
        this.alarmData = _.filter(result, function(value) {
          let isGood = true;
          // if (this.alarmCondition.ipv4) {
          //   isGood = isGood && value.IPV4 === this.alarmCondition.ipv4;
          // }
          // if (this.alarmCondition.queren != "ALL") {
          //   isGood =
          //     isGood && value.ackStatusName === this.alarmCondition.queren;
          // }

          // if (this.alarmCondition.timerange[0]) {
          //   let occurTime = new Date(value.occurTimeStr);
          //   isGood = isGood && occurTime > this.alarmCondition.timerange[0];
          //   isGood = isGood && occurTime < this.alarmCondition.timerange[0];
          // }
          if (isGood && value.severity) {
            _this.alarmKey[value.severity - 1].count++;
          }
          return isGood;
        });
      });
    }
  }
};
</script>
<style>
.amap-logo,
.amap-copyright {
  display: none !important;
}
</style>

<style lang="less" scoped>
.home-top5-switch-table {
  border-collapse: collapse;
  font-size: 12px;
  display: inline-block;
  border-radius: 2px;
  background-color: #151740;
  margin: 0 10px;
  td {
    border: 1px solid #163e68;
    border-collapse: collapse;
    padding: 4px 8px;
    color: #2a6893;
    cursor: pointer;
  }
  td.active {
    color: #50b5ec;
    font-weight: 600;
    background-color: #02306f;
  }
}
.map-panel-map {
  background: rgba(33, 41, 72, 0.5) !important;
}
.map-panel-select {
  position: absolute;
  left: 20px;
  top: 50px;
  z-index: 1;
}
.map-panel-mainkpis {
  // position: absolute;
  // left: 20px;
  // right: 20px;
  // top: 40px;
  height: 40px;
  text-align: center;
  font-size: 13px;
  color: #9798b8;
  margin-top: -10px;
}

.map-panel-mainkpis .leftdiv {
  position: absolute;
  left: 50%;
  width: 150px;
  margin-left: -170px;
  text-align: right;
}

.map-panel-mainkpis .rightdiv {
  position: absolute;
  left: 50%;
  width: 150px;
  margin-left: 20px;
  text-align: left;
}
.map-panel-mainlegend {
  position: absolute;
  left: 50px;
  bottom: 20px;
  height: 130px;
  text-align: left;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}
.map-panel-mainlegend span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
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
 .normal-panel-title-charts {
    height: 50px;
    display: flex;
    line-height: 50px;
    padding: 0 15px;
    font-size: 14px;
  
}
.home-table-condition-openbtn {
  text-align: center;
  width: 200px;
  color: #50b5ec;
  font-weight: 600;
  background-color: #151740;
  border-radius: 2px !important;
  border: 1px solid #163e68;
  position: relative;
  line-height: 25px;
  cursor: pointer;
}
.home-table-condition-openbtn-icon {
  position: absolute;
  right: 10px;
  top: 3px;
  font-size: 20px;
}
.home-table-condition-content {
  padding: 10px;
}
.home-table-condition-row {
  padding: 10px;
  line-height: 25px;
}
.home-table-condition-label {
  width: 100px;
  text-align: right;
  display: inline-block;
}
</style>
