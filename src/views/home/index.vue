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
          <div id="mapChart" class="map-panel-map" style="height:558px;"></div>
          <div class="map-panel-select">
            <comselect
              @coms-select-change="alarmSelect"
              :textLeft="true"
              :selectDatas="alarmSelectData"
              :selectValue="alarmSelectValue"
            />
          </div>
          <div class="map-panel-mainkpis">
            <div class="leftdiv">专线总数<span style="font-size:20px;color:#73fbfd;margin-left:20px;">{{mapAllTotal}}</span></div>
            <div class="rightdiv">异常总数<span style="font-size:20px;color:#eb3223;margin-left:20px;">{{mapErrorTotal}}</span></div>
          </div>
          <div class="map-panel-mainlegend">
            <div><span style="background-color: #73fbfd;"></span>0~500G</div>
            <div><span style="background-color: #73fbfd;"></span>500~1000G</div>
            <div><span style="background-color: #73fbfd;"></span>1000~2500G</div>
            <div><span style="background-color: #73fbfd;"></span>2500~5000G</div>
            <div><span style="background-color: #73fbfd;"></span>5000G以上</div>
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
            <div class="leftdiv">活动<span style="font-size:20px;color:#73fbfd;margin-left:20px;">{{alarmCount.total}}</span></div>
            <div class="rightdiv">已派单<span style="font-size:20px;color:#eb3223;margin-left:20px;">{{alarmCount.paidan}}</span></div>
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
          <div class="normal-panel-title">数据流量(数据中心)</div>
          <div id="appTop5Chart"></div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;height:360px;">
      <div class="normal-panel fl" style="width:100%;height:360px;">
        <div class="normal-panel-content">
          <div class="normal-panel-title" style="height:50px;line-height: 30px;">活动告警</div>
          <!-- <b-table :columns="columns1" :data="data1" :pageData="pageData"></b-table> -->
          <div class="home-table-condition">
            <ul class="home-table-condition-ul">
              <li>
                <comselect
                  @coms-select-change="alarmSelect"
                  :textLeft="true"
                  :selectDatas="alarmSelectData"
                  :selectValue="alarmSelectValue"
                />
              </li>
              <li>
                <span>
                  当前页：
                  <label class="alarmlabel">15</label>
                </span>
              </li>
              <li>
                <span>
                  总数：
                  <label class="alarmlabel">15</label>
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
          <Table
            stripe
            height="300"
            @on-row-click="alarmDetail"
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
// import switchtab from "@/components/SwitchTab.vue";
import comselect from "@/components/ComSelect.vue";

// 开始使用 G2 绘制地图
var provinceChart = void 0;

// 当前聚焦的区域
var currentAreaNode = void 0;
export default {
  components: { comselect },
  data() {
    return {
      colorsArr: ["#25a23fcc", "#dd704ccc", "#346ee4cc"],
      count: 0,
      showAlarmDetail: false,
      // provinceChart: null, //开始使用 G2 绘制地图
      // currentAreaNode: null, // 当前聚焦的区域
      // map: null,
      mapAllTotal:0,
      mapErrorTotal:0,
      top5Datas: [
        [
          {
            name: "CPU",
            key: "1",
            api:"/queryCpuTop5"
          },
          {
            name: "内存",
            key: "2",
            api:"/queryMemoryTop5"
          },
          {
            name: "端口出",
            key: "3",
            api:"/queryPortOutTop5"
          },
          {
            name: "端口入",
            key: "4",
            api:"/queryPortInTop5"
          },
          {
            name: "带宽利用率",
            key: "5",
            api:"/queryDaiKuanRateTop5"
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
      top5Chart:null,
      alarmCount:{
        total:0,paidan:0
      },
      row1kpis: [
        {
          img: "static/images/zongjizhuanxian.png",
          label: "中断专线数量",
          api:"/getbrokenlinkcounts",
          value: "0"
        },
        {
          img: "static/images/shuliang.png",
          label: "覆盖省份数量",
          api:"",
          value: "0"
        },
        {
          img: "static/images/pingfen.png",
          label: "质量评分",
          api:"/qualityscore",
          value: "0"
        },
        {
          img: "static/images/zhuanxian.png",
          label: "申请中的专线数量",
          api:"/applylinkcounts",
          value: "0"
        }
        // {
        //   img: "static/images/paidan.png",
        //   label: "派单数量",
        //   value: 4
        // },
        // {
        //   img: "static/images/shuliang.png",
        //   label: "专线省份数量",
        //   value: 23
        // },
        // {
        //   img: "static/images/pingfen.png",
        //   label: "质量评分",
        //   value: 96.8
        // },
        // {
        //   img: "static/images/zhuanxian.png",
        //   label: "新监控专线",
        //   value: 7
        // },
        // {
        //   img: "static/images/zongjizhuanxian.png",
        //   label: "总计监控专线",
        //   value: 87
        // }
      ],
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
      ],
      alarmColumns: [
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
      alarmData: [
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
        },
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
      ],
      alarmSelectValue: "1",
      alarmSelectData: [
        {
          name: "专线总数",
          value: "1"
        },
        {
          name: "异常总数",
          value: "2"
        }
      ]
    };
  },
  mounted() {
    this.setRow1Kpis();
    this.pieChart();
    this.kpiTop5();
    this.proviceChart();
    this.appTop5();
    this.setMapColor();
  },
  methods: {
    alarmDetail() {
      this.showAlarmDetail = true;
    },
    setMapColor(){
      var _this = this;
      var apiurl = API.basePath+"/queryMapLinks";
      var colorMap= {},alltotal=0,errortotal=0;
      this.axios.get(apiurl).then(result => {
        console.log(`--------------${apiurl}`,result);
        for(var r of result){
          let _provice = mapKey[r.province];
          if(!_provice) continue;
          // console.log("_provice",_provice);
          // #25a23fcc 绿色，#dd704ccc 橙色，#346ee4cc蓝色
          colorMap[_provice.code] = "#346ee4cc";
          if(r.slanumber>0){
            colorMap[_provice.code] = "#25a23fcc";
          }
          if(r.downnumber>0){
            colorMap[_provice.code] = "#dd704ccc";
          }
          alltotal=alltotal+r.totals;
          errortotal=errortotal+r.downnumber+r.slanumber;
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
        if(colorMap[adcode]){
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
        center: [102.4976, 31.1697],
        pitch: 40,
        zoom: 4.2,
        zooms: [4,5],
        layers: [disCountry],
        viewMode: "3D",
        skyColor: "#1b2143"
      });

      var buildLine = function(){
        var arr = []; //经纬度坐标数组
        var start = [113.323434, 23.106345],
          end = [91.115112, 29.645095],
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
            (Math.sin(radion) * Math.abs(_y)) / 2;
          arr.push([x, y]);
        }

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
          lineCap:"round",
          zIndex: 2
        });

        let toppoint = arr[arr.length-1];
        let bottompoint = arr[arr.length-2];

        let point0x = toppoint.lat-(bottompoint.lat-toppoint.lat)*4;
        let point0y = toppoint.lng-(bottompoint.lng-toppoint.lng)*4;
        console.log("point0::",point0x,point0y)
        let point1x = bottompoint.lat+(bottompoint.lng-toppoint.lng);
        let point1y = bottompoint.lng-(bottompoint.lat-toppoint.lat);
        console.log("point1::",point1x,point1y)
        let point2x = bottompoint.lat-(bottompoint.lng-toppoint.lng);
        let point2y = bottompoint.lng+(bottompoint.lat-toppoint.lat);
        console.log("point2::",point2x,point2y)

        //起点
        var circle = new AMap.Circle({
          center: arr[0],
          fillColor: "#81d4fa",
          strokeColor: "white",
          radius: 40000 //m
        });
        // 终点
        var circleMarker = new AMap.Circle({
          center: arr[arr.length - 1],
          fillColor: "#80d8ff",
          strokeColor: "white",
          radius: 100000 //m
        });
        // 箭头
        var polygon = new AMap.Polygon({
            fillColor: "#29b6f6",
            strokeColor: "#29b6f6",
            path: [[point0y,point0x],[point1y,point1x],[point2y,point2x]]
        });

        // map.add([circle, polygon, polyline]);
        map.add([polygon, polyline]);
      }

      // buildLine();
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
    alarmSelect(name) {
      console.log("do something");
    },
    setRow1Kpis(){
      for(var i = 0;i<this.row1kpis.length;i++){
        let kpi = this.row1kpis[i];
        if(kpi.api){
          let url = kpi.api;
          this.axios.get(`${API.basePath+url}`).then(result => {
            let _value = "0";
            if(result){
              if(result.data){
                _value = result.data.result || "0";
              }else{
                _value = result.result || result.scores || "0";
              }
            }
            kpi.value = _value
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
      let url = API.index.cpuTop5,top5IndexInt = parseInt(this.top5Index)-1;
      url = this.top5Datas[parseInt(top5IndexInt/5)][top5IndexInt%5].api;
      
      this.axios.get(`${API.basePath+url}`).then(result => {
        // console.log("--------------"+url,result);
        //       [
        // {
        //   "ip": "172.19.10.250",
        //   "value": 90,
        //   "res_descr": "BJCYBDZHT-R-2911-2.vanke.net.cn",
        //   "note": "北京房山地产"
        // }
        // ]
        if(this.top5Chart){
          this.top5Chart.changeData(result);
          // this.top5Chart.axis("ip", {
          //   label: {
          //     offset: 12
          //   }
          // });
          // this.top5Chart.render();
        }else{
          var chart = new G2.Chart({
            container: "kpiTop5Chart",
            forceFit: true,
            height: 230,
            padding: ["auto", "auto", 30, "auto"]
          });
          chart.source(result);
          chart.axis("ip", {
            label: {
              offset: 12
            }
          });
          chart.coord().transpose();
          chart.interval().position("ip*value");
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
        // let resultData = result[0];
        let resultData = {
          "alnum1": 10,
          "alnum2": 43,
          "alnum3": 23,
          "alnum4": 5,
          "total": 81,
          "paidan": 38
        }
        this.alarmCount = {
          total:resultData.total,paidan:resultData.paidan
        }
        let paidanData = [
          {
            value: (resultData.total - resultData.paidan),
            type: "未派单"
          },
          {
            value: resultData.paidan,
            type: "已派单"
          }
        ]
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
        ]
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
        height: 250,
        padding: [20, 0, 40, 0]
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
        // .label("name")
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
        for(var r of result){
          console.log("r",r)
          data.push({
            company: "已开通",
            type: r.province,
            value: r.monitornums
          });
          data.push({
            company: "未开通",
            type: r.province,
            value: r.nomonitornums
          })
          maxValue = Math.max(r.monitornums,r.monitornums,maxValue);
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
              fill: "#aaaaaa"
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
              fill: "#aaaaaa"
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
    appTop5() {
      this.axios.get(`${API.index.dataCenter}`).then(result => {
        // console.log(`--------------${API.index.dataCenter}`,result);
        // [
        //   {
        //     "dctime": "00:00",
        //     "value": 0.23
        //   }
        // ]
        var chart = new G2.Chart({
          container: "appTop5Chart",
          forceFit: true,
          height: 170,
          padding: ["auto", "auto", 40, "auto"]
        });
        chart.source(result);
        chart.scale('value', {
          min: 0
        });
        chart.scale('dctime', {
          range: [0, 1]
        });
        chart.tooltip({
          crosshairs: {
            type: 'line'
          }
        });
        chart.line().position('dctime*value');
        chart.point().position('dctime*value').size(4).shape('circle').style({
          stroke: '#fff',
          lineWidth: 1
        });
        chart.render();
      })
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
.map-panel-map{
  background: rgba(33, 41, 72, 0.5) !important;
}
.map-panel-select {
  position: absolute;
  left: 20px;
  top: 50px;
  z-index: 1;
}
.map-panel-mainkpis{
  position: absolute;
  left: 20px;
  right:20px;
  top: 50px;
  height:80px;
  text-align: center;
  font-size: 13px;
  color:#9798b8;
}

.map-panel-mainkpis .leftdiv{
  position: absolute;
  left: 50%;
  width:150px;
  margin-left:-170px;
  text-align: right;
}

.map-panel-mainkpis .rightdiv{
  position: absolute;
  left: 50%;
  width:150px;
  margin-left:20px;
  text-align: left;
}
.map-panel-mainlegend{
  position: absolute;
  left: 50px;
  bottom: 20px;
  height: 130px;
  text-align: left;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}
.map-panel-mainlegend span{
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
</style>
