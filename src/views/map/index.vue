<template>
  <div id="container" class="container"></div>
</template>

<script>
export default {
  data() {
    return {
      colorsArr: ["#25a23fcc", "#dd704ccc", "#346ee4cc"],
      count: 0
    };
  },
  mounted() {
    var _this = this;
    this.axios
      .get("//a.amap.com/Loca/static/mock/tourist_attractions.csv")
      .then(data => {
        // console.log("data", data);
        _this.countryMap();
      });
  },
  methods: {
    countryMap() {
      var _this = this;
      var SOC = "CHN";
      var colors = {};
      var GDPSpeed = {
        "440000": 7.0, //广东
        "630000": 7.0, //青海
        "540000": 10 //西藏
      };

      var getColorByDGP = function(adcode) {
        var gdp = GDPSpeed[adcode];
        var rcolor = "#052051";
        if (gdp) {
          rcolor = _this.colorsArr[_this.count % _this.colorsArr.length];
          colors[adcode] = rcolor;
          _this.count++;
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
            return getColorByDGP(props.adcode_pro);
          }
        }
      });

      var map = new AMap.Map("container", {
        version: "1.4.13",
        mapStyle: "amap://styles/midnight",
        features: ["bg", "road"],
        center: [107.4976, 32.16],
        pitch: 40,
        zoom: 4.5,
        layers: [disCountry],
        viewMode: "3D"
      });

      var arr = []; //经纬度坐标数组
      var start = [116.405289, 39.904987],
        end = [87.61792, 43.793308],
        num = 180;
      var _x = end[0] - start[0];
      var _y = end[1] - start[1];
      var radionUnit = Math.PI / 180;

      for (var i = 0; i < num; i++) {
        var radion = i * radionUnit;
        var x = ((i + 1) * _x) / num + start[0];
        var y = ((i + 1) * _y) / num + start[1] + Math.sin(radion) * Math.abs(_y)/2;
        arr.push([x, y]);
      }

      var polyline = new AMap.Polyline({
        path: arr,
        geodesic: true,
        lineJoin: "round",
        showDir: true,
        dirColor: "white",
        strokeColor: "#29b6f6",
        outlineColor: "white",
        isOutline: true,
        strokeWeight: 6.0,
        zIndex: 2
      });

      var circle = new AMap.Circle({
        center: arr[0],
        fillColor: "#81d4fa",
        strokeColor: "white",
        radius: 50000 //m
      });
      var circleMarker = new AMap.Circle({
        center: arr[arr.length - 1],
        fillColor: "#80d8ff",
        strokeColor: "white",
        radius: 100000 //m
      });

      map.add([circle, circleMarker, polyline]);
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
    }
  }
};
</script>

<style lang="less" scoped>
#container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 500px;
}
</style>
<style lang="less">
.amap-logo,
.amap-copyright {
  display: none !important;
}
</style>
