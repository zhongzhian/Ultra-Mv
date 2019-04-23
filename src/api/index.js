const BASEPATH = '/mv';
const SUBPATH = '/api';
export default {
  basePath: BASEPATH + SUBPATH,
  login: {
    token: `/uaa/oauth/token`,
    account: `/account/v1/account/users/current`
  },
  index: {
    applylinkcounts: BASEPATH + SUBPATH + `/applylinkcounts`,//申请中的专线数量
    getbrokenlinkcounts: BASEPATH + SUBPATH + `/getbrokenlinkcounts`,//中断专线数量
    qualityscore: BASEPATH + SUBPATH + `/qualityscore`,//质量评分
    alarmCount: BASEPATH + SUBPATH + `/queryAlertCount`,//告警统计
    dataCenter: BASEPATH + SUBPATH + `/queryDataCenter`,//数据中心
    queryMapLinks: BASEPATH + SUBPATH + `/queryMapLinks`,//地图专线数据统计
    queryLinksPro: BASEPATH + SUBPATH + `/queryLinksPro`,//各省份专线统计
    cpuTop5: BASEPATH + SUBPATH + `/queryCpuTop5`,
    daiKuanRateTop5: BASEPATH + SUBPATH + `/queryDaiKuanRateTop5`,
    memoryTop5: BASEPATH + SUBPATH + `/queryMemoryTop5`,
    portInTop5: BASEPATH + SUBPATH + `/queryPortInTop5`,
    portOutTop5: BASEPATH + SUBPATH + `/queryPortOutTop5`,
  }
}