const DOMAINPATH = 'http://39.104.229.21:58055/';
//const BASEPATH = 'http://10.63.0.81:58055/mv';
const BASEPATH = 'http://39.104.229.21:58055/mv';
const SUBPATH = '/api';
const NMSPATH = 'http://192.168.189.146:58085/nmsw'
//const NMSPATH = 'http://10.63.0.81:58085/nmsw';
const DEDICATEPATH = 'http://39.104.229.21:58055/dedicate';
export default {
  domainport: DOMAINPATH,
  basePath: BASEPATH + SUBPATH,
  nmswPath:NMSPATH,
  login: {
    token: `/uaa/oauth/token`,
    account: `/account/v1/account/users/current`
  },
  index: {
    getcountry: BASEPATH + SUBPATH + `/getcountry`,//申请中的专线数量
    getprovince: BASEPATH + SUBPATH + `/getprovince`,//申请中的专线数量
    getcity: BASEPATH + SUBPATH + `/getcity`,//申请中的专线数量
    getappname: BASEPATH + SUBPATH + `/getappname`,//获取专线mv客户名称

    applylinkcounts: BASEPATH + SUBPATH + `/applylinkcounts`,//申请中的专线数量
    getbrokenlinkcounts: BASEPATH + SUBPATH + `/getbrokenlinkcounts`,//中断专线数量
    qualityscore: BASEPATH + SUBPATH + `/qualityscore`,//质量评分
    coverslinkprovinces: BASEPATH + SUBPATH + `/coverslinkprovinces`,//覆盖的省份数量
    alarmCount: BASEPATH + SUBPATH + `/queryAlertCount`,//告警统计
    dataCenter: BASEPATH + SUBPATH + `/queryDataCenter`,//数据中心
    queryMapLinks: BASEPATH + SUBPATH + `/queryMapLinks`,//地图专线数据统计
    getMapltl: BASEPATH + SUBPATH + `/getMaplt`,//地图连线
    queryLinksPro: BASEPATH + SUBPATH + `/queryLinksPro`,//各省份专线统计
    cpuTop5: BASEPATH + SUBPATH + `/queryCpuTop5`,
    daiKuanRateTop5: BASEPATH + SUBPATH + `/queryDaiKuanRateTop5`,
    memoryTop5: BASEPATH + SUBPATH + `/queryMemoryTop5`,
    portInTop5: BASEPATH + SUBPATH + `/queryPortInTop5`,
    portOutTop5: BASEPATH + SUBPATH + `/queryPortOutTop5`,

    queryActiveAlertList: BASEPATH + SUBPATH + `/getAlert`,//首页告警

    queryAllalert: BASEPATH + SUBPATH + `/queryAllalert`,//首页告警-2
    // portOutTop5: BASEPATH + SUBPATH + `/queryAllalert`,

    //queryActiveAlertList: NMSPATH + `/ActiveAlertViewAction!queryActiveAlertList.action`,//首页告警
    queryAlertById: NMSPATH + `/alertview/queryAlertById.action`,//首页告警钻取，参数为  告警id

    //新增首页输入输出速率
    queryBandRate: BASEPATH + SUBPATH+`/queryBandRate`,

    addDedicateLine: DEDICATEPATH + `/addDedicateLine`,//添加
    dedicateExport: DEDICATEPATH + `/dedicateExport`,//导出
    delDedicateLine: DEDICATEPATH + `/delDedicateLine`,//删除
    downTemplate: DEDICATEPATH + `/downTemplate`,//下载模版
    editDedicateLine: DEDICATEPATH + `/editDedicateLine`,//修改
    queryDedicateLine: DEDICATEPATH + `/queryDedicateLine`,//查询专线
    importExcel: DEDICATEPATH + `/importExcel`,//导入excel

  }
}