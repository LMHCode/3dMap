<template>
  <div>
    <!-- <el-row :gutter="20"> -->
    <!-- <el-col :sm="10" :md="10" :lg="10" :xl="10"> -->
    <!-- <el-card class="box-card"> -->
    <div>
      <p v-if="false">
        <span @click="getChina">返回</span>
        <!-- <el-button>中国</el-button> -->
        <span @click="getProvince">{{ province }}</span>
        <span>{{ city }}</span>
        <!-- <el-button class="backBtn" @click="back()">返回上级</el-button> -->
      </p>
 
      <div id="mapChart" class="map"></div>
      <!-- <div id="map" class="map"></div>
      <div id="map2" class="map"></div>-->
    </div>
    <!-- </el-card> -->
    <!-- </el-row> -->
  </div>
</template>
<script>
import "echarts-gl";
import * as $echarts from 'echarts';
require("echarts/lib/chart/map");
// import cityMap from "@/js/citymap";
let img05 =
  'path://d="M10,1A10,10,0,0,0,0,11C0,15.92,8.06,25.35,9.69,27.2a.37.37,0,0,0,.57,0c1.62-1.85,9.68-11.28,9.68-16.23A10,10,0,0,0,10,1Zm0,14.9a4,4,0,1,1,4-4A4,4,0,0,1,10,15.9Z"';
let chinaId = 320000;
let chinaName = "江苏";
// var chinaId = 320100;
// var chinaName = "南京";
// let chinaJson = null;
 
//记录父级ID、Name
let mapStack = [];
let parentId = null;
let parentName = null;
 
//Echarts地图全局变量，主要是在返回上级地图的方法中会用到
let myChart = null;
export default {
  name: 'home',
  props: {
    cityName: {},
  },
  data() {
    return {
      userS: "",
      pieShow: false,
      map: "江苏",
      province: "江苏",
      city: "",
      pList: [
        "安徽",
        "福建",
        "甘肃",
        "广东",
        "广西",
        "贵州",
        "海南",
        "河北",
        "黑龙江",
        "湖北",
        "湖南",
        "江苏",
        "江西",
        "吉林",
        "辽宁",
        "内蒙古",
        "宁夏",
        "青海",
        "山东",
        "山西",
        "四川",
        "台湾",
        "西藏",
        "新疆",
        "云南",
        "浙江",
      ],
      guanwang: [
        {
          //江阴
          name: "江阴-供水管道1",
          value: [120.388168, 31.813939, 250],
          type: "guanwang",
          maintainOrg: "江阴供水总公司",
          checker: "供水管道检查员1",
          lastCheckTime: "2020-01-21 10:30",
        },
        {
          //江阴
          name: "江阴-供水管道2",
          value: [120.15185, 31.9118, 250],
          type: "guanwang",
          maintainOrg: "江阴供水总公司2",
          checker: "供水管道检查员2",
          lastCheckTime: "2020-01-21 15:30",
        },
      ],
      mapId: "",
      area: "",
    };
  },
  // watch: {
  //   cityName(val) {
  //     if (val.type == "city") {
  //       this.area = val.name + "市";
  //     } else {
  //       this.area = val.name;
  //     }
  //     this.cityNameToLoad();
  //   },
  // },
  mounted() {
    // this.getCrm();
    this.mapChart("mapChart");
  },
  methods: {
    // 用户定位
    getCrm() {
      // let data = {
      //   systemCode: "", //TODO
      //   name: this.cityName,
      // };
      this.guanwang.push({
        value: [1, 2, 250],
        code: 'x',
        name: 's',
      });
      this.mapChart("mapChart");
    },

    getChina() {
      // console.log(mapStack, "r");
      // this.registerAndsetOption(myChart, chinaId, chinaName, chinaJson, false);
    },

    getProvince() {
      // let cityId = cityMap[this.province];
      // let mapJson = require("./../../../config/json/map/" + cityId + ".json");
      // this.registerAndsetOption(myChart, cityId, this.province, mapJson, true);
      // cityId = null
      // mapJson = null
    },
    /**
     * 返回上一级地图
     */
    back() {
      if (mapStack.length != 0) {
        //如果有上级目录则执行
        // let map = mapStack.pop();
        // // this.$http
        // //   .get("./../../config2/json/map/" + map.mapId + ".json", {})
        // //   .then(response => {
        // const mapJson = require("@/assets/config/json/map/" +
        //   map.mapId +
        //   ".json");
        // this.registerAndsetOption(
        //   myChart,
        //   map.mapId,
        //   map.mapName,
        //   mapJson,
        //   false
        // );
 
        // //返回上一级后，父级的ID、Name随之改变
        // parentId = map.mapId;
        // parentName = map.mapName;
        // });
      }
    },
    /**
     * Echarts地图
     */
 
    mapChart() {
      const mapJson = require("../../assets/mapJson/china.json"); //response.data;
      // chinaJson = mapJson;
      console.log($echarts)
      myChart = $echarts.init(document.getElementById("mapChart"));
      this.registerAndsetOption(myChart, chinaId, chinaName, mapJson, true);
      // let that = this;
      // parentId = chinaId;
      // parentName = "china";
      // this.listenerCharts(myChart);
    },

    registerAndsetOption(myChart, id, name, mapJson, flag) {
      myChart.clear();
      $echarts.registerMap(name, mapJson);
      myChart.setOption(
        {
          // backgroundColor: "#0f375f",
          tooltip: {
            trigger: "item",
            position: "inside",
            // formatter: function (params) {},
            backgroundColor: "default: 'rgba(50,50,50,0.7)'",
            textStyle: {
              color: "#FFFFFF",
              textalign: "center",
              fontSize: "12px",
            },
          },
          grid: {
            top: "5%",
            left: "12%",
            right: "5%",
            bottom: "20%",
          },
          // legend: {
          //   orient: "vertical",
          //   id: 1,
          //   // y: "center",
          //   // x: "left",
          //   itemWidth: 15,
          //   data: [
          //     {
          //       name: "签约公司",
          //       icon: img05,
          //     },
          //   ],
          //   textStyle: {
          //     color: "#fff",
          //   },
          // },
          geo3D: {
            show: true,
            map: name,
            // opacity: 0,
            label: {
              show: true, //是否显示市
              textStyle: {
                color: "#E1FFFF", //文字颜色
                fontSize: 12, //文字大小
                backgroundColor: "rgba(0,0,0,.5)", //透明度0清空文字背景
                // backgroundColor: "blue",
              },
            },
            emphasis: {
              //当鼠标放上去  地区区域是否显示名称
              label: {
                show: true,
                formatter: (params) => {
                  this.area = params.name;
                  // console.log(this.area, "this.area");
                  return params.name;
                },
                textStyle: {
                  // color: "#fff",
                  // fontSize: 16,
                  // backgroundColor: "rgba(0,23,11,0)",
                },
              },
            },
            viewControl: {
              distance: 90, //地图视角 控制初始大小
              rotateSensitivity: 1, //禁止旋转
              zoomSensitivity: 1, //禁止缩放
            },
            zoom: 1.2,
            roam: true,
            // environment: new $echarts.graphic.LinearGradient(
            //   0,
            //   0,
            //   0,
            //   1,
            //   [
            //     {
            //       // 配置为垂直渐变的背景
            //       offset: 0,
            //       color: "#00aaff", // 天空颜色
            //     },
            //     {
            //       offset: 0.7,
            //       color: "#998866", // 地面颜色
            //     },
            //     {
            //       offset: 1,
            //       color: "#998866", // 地面颜色
            //     },
            //   ],
            //   false
            // ),
            itemStyle: {
              color: "rgba(100,149,237,.3)", //地图颜色
              borderWidth: 5, //设置外层边框
              borderColor: "rgba(   0,255,255,1)",
              shadowColor: "rgba(0,54,255, 1)",
              shadowBlur: 150,
              // borderWidth: 1, //分界线wdith
              // borderColor: "#459bca" //分界线颜色
              // shadowColor: "red",
              // shadowBlur: 10
            },
          },
          series: [
            {
              name: "签约公司",
              type: "scatter3D",
              aspectScale: 0.75,
              coordinateSystem: "geo3D",
              data: this.guanwang,
              symbol: img05,
              symbolSize: function (val) {
                return val[2] / 8;
              },
              boxDepth: 90,
              regionHeight: 8,
              label: {
                normal: {
                  show: false,
                  // formatter: function (params) {
                  //   // console.log(params);
                  //   //return params.name;
                  //   return params.name;
                  // },
                  position: "right",
                  color: "#fff",
                  fontSize: "8",
                },
                emphasis: {
                  show: true,
                },
              },
              itemStyle: {
                normal: {
                  // color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //   {
                  //     offset: 0,
                  //     color: "#24ebd7",
                  //   },
                  //   {
                  //     offset: 1,
                  //     color: "#DAC929",
                  //   },
                  // ]),
                  color: "#24ebd7",
                  borderWidth: 0,
                  // borderColor: "#f4b391",
                },
              },
            },
          ],
        },
        true
      );
      if (flag) {
        //往mapStack里添加parentId，parentName,返回上一级使用
        mapStack.push({
          mapId: parentId,
          mapName: parentName,
        });
        parentId = id;
        parentName = name;
      }
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    initMapData(mapJson) {
      var mapData = [];
      for (var i = 0; i < mapJson.features.length; i++) {
        mapData.push({
          name: mapJson.features[i].properties.name,
          //id:mapJson.features[i].id
        });
      }
      console.log(mapData, "mapData");
      return mapData;
    },

    cityNameToLoad() {
      // $echarts.init(document.getElementById("mapChart")).dispose();
      // let that = this;
      // var cityId = cityMap[that.area];
      // myChart = $echarts.init(document.getElementById("mapChart"));
      // this.listenerCharts(myChart);
      // if (this.area) {
      //   if (cityId) {
      //     //代表有下级地图
      //     // this.$http
      //     //   .get("./../../config2/json/map/" + cityId + ".json", {})
      //     //   .then(response => {
      //     const mapJson = require("./../../../config/json/map/" +
      //       cityId +
      //       ".json");
      //     that.$nextTick(() => {
      //       that.registerAndsetOption(
      //         myChart,
      //         cityId,
      //         this.area,
      //         mapJson,
      //         true
      //       );
      //     });
 
      //     // });
      //   }
      // }
    },
    listenerCharts(myChart) {
      var that = this;
      myChart.on("click", function (e) {
        console.log(e, "eee");
        // that.$router.push({
        //   path: "/electricityconsumptionanalysis",
        // });
      });
      myChart.getZr().on("click", function (e) {
        console.log(e,'dsfds')
        myChart.containPixel("series");
        let mouseStyle = document.getElementById("mapChart").children[0].style
          .cursor;
        if (that.pList.indexOf(that.area) > 0) {
          that.province = that.area;
        } else {
          that.city = that.area;
        }
        // var cityId = cityMap[that.area];
        if (that.area && mouseStyle == "pointer" && !e.target) {
          // if (cityId) {
          //   //代表有下级地图
          //   const mapJson = require("./../../../config/json/map/" +
          //     cityId +
          //     ".json");
          //   that.$nextTick(() => {
          //     that.registerAndsetOption(
          //       myChart,
          //       cityId,
          //       that.area,
          //       mapJson,
          //       true
          //     );
          //   });
          // }
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 20px 30px;
}
.map {
  // height: 600px;
  height: 80vh;
  width: 100%;
}
.conbox {
  border: 1px solid #ccc;
  padding: 5px 20px;
}
.content {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
}
.piebox {
  // min-width: 500px;
  width: 500px;
  height: 220px;
}
.monitoringObjects {
  width: 100%;
  height: 358px;
  //  height: 40vh;
  margin-top: 20px;
  margin-bottom: 20px;
}
.coulometricChart {
  width: 100%;
  height: 358px;
}
.chattitle {
  display: flex;
  justify-content: space-between;
}
</style>