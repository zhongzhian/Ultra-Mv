//需要权限验证的路由
export const appRouter = {
  path: '/',
  name: 'root',
  component: () => import('../views/main.vue'),
  redirect: '/home',
  meta: {
    menuShow: false
},

  children: [
    {
      path: 'home',
      name: 'home',
      icon: 'home',
      label: '首页',
      component: () => import('../views/home'),
    },
    {
      path: 'slmm',
      name: 'slmm',
      icon: 'ios-bell',
      label: '专线监控管理',
      redirect: '/slmm/sllist',
      component: () => import('../views/slmm'),
      children: [
        {
          path: 'sllist',
          name: 'sllist',
          icon: 'ios-bell',
          label: '专线列表',
          component: () => import('../views/slmm/list.vue')
        },
        {
          path: 'slmonitor',
          name: 'slmonitor',
          icon: 'ios-bell',
          label: '专线监控',
          component: () => import('../views/slmm/monitor.vue')
        },
        {
          path: 'slcollector',
          name: 'slcollector',
          icon: 'ios-bell',
          label: 'SLA采集管理',
          component: () => import('../views/slmm/collector.vue')
        },
      ]
    },
    {
      path: 'svqt',
      name: 'svqt',
      icon: 'ios-bell',
      label: '服务质量监控',
      redirect: '/svqt/qosmonitor',
      meta: {
        menuShow: false
      },
      component: () => import('../views/svqt'),
      children: [
        {
          path: 'qosmonitor',
          name: 'qosmonitor',
          icon: 'ios-bell',
          label: 'QOS服务质量监控',
          component: () => import('../views/svqt/qosmonitor.vue')
        },
        {
          path: 'ltqosmonitor',
          name: 'ltqosmonitor',
          icon: 'ios-bell',
          label: 'QOS服务质量监控',
          component: () => import('../views/svqt/ltqosmonitor.vue')
        },
        {
          path: 'slamonitor',
          name: 'slamonitor',
          icon: 'ios-bell',
          label: 'SLA服务质量监控',
          component: () => import('../views/svqt/slamonitor.vue')
        },
        {
          path: 'ltslamonitor',
          name: 'ltslamonitor',
          icon: 'ios-bell',
          label: 'SLA服务质量监控',
          component: () => import('../views/svqt/ltslamonitor.vue')
        },
      ]
    },
    {
      path: 'apply',
      name: 'apply',
      icon: 'ios-bell',
      label: '申请管理',
      redirect: '/apply/applylist',
      component: () => import('../views/apply'),
      children: [
        {
          path: 'applylist',
          name: 'applylist',
          icon: 'ios-bell',
          label: '申请管理',
          component: () => import('../views/apply/applylist.vue')
        },
        {
          path: 'slmmapplyinfo',
          name: 'slmmapplyinfo',
          icon: 'ios-bell',
          label: '查看申请信息',
          component: () => import('../views/apply/slmmapplyinfo.vue')
        },
        {
          path: 'slmmapply',
          name: 'slmmapply',
          icon: 'ios-bell',
          label: '专线监控申请',
          component: () => import('../views/apply/slmmapply.vue')
        },
        {
          path: 'editapply',
          name: 'editapply',
          icon: 'ios-bell',
          label: '监控变更申请',
          component: () => import('../views/apply/editapply.vue')
        },
        {
          path: 'itapply',
          name: 'itapply',
          icon: 'ios-bell',
          label: 'IT基础监控申请',
          meta: {
            menuShow: false
        },
          component: () => import('../views/apply/itapply.vue')
        },
      ]
    },
    {
      path: 'approval',
      name: 'approval',
      icon: 'ios-bell',
      label: '审批管理',
      component: () => import('../views/approval'),
    },
    // {
    //   path: 'map',
    //   name: 'map',
    //   icon: 'ios-bell',
    //   label: '地图',
    //   component: () => import('../views/map'),
    // },
    {
      path: 'alarm',
      name: 'alarm',
      icon: 'ios-bell',
      label: '告警',
      redirect: '/alarm/activeAlarm',
      component: () => import('../views/alarm'),
      children: [
        {
          path: 'activeAlarm',
          name: 'activeAlarm',
          icon: 'ios-bell',
          label: '当前告警',
          component: () => import('../views/alarm/activeAlarm.vue')
        },
        {
          path: 'historyAlarm',
          name: 'historyAlarm',
          icon: 'ios-bell',
          label: '历史告警',
          component: () => import('../views/alarm/historyAlarm.vue')
        },
      ]
      
    },
    {
      path: 'topo',
      name: 'topo',
      icon: 'ios-bell',
      label: '拓扑',
      component: () => import('../views/topo/topo.vue'),
    },
    {
      path: 'pm',
      name: 'pm',
      icon: 'ios-bell',
      label: '性能管理',
      redirect: '/alarm/activeAlarm',
      component: () => import('../views/pm'),
      children: [
        {
          path: 'unicomPm',
          name: 'unicomPm',
          icon: 'ios-bell',
          label: '联通设备性能管理',
          component: () => import('../views/pm/unicomPm.vue')
        },
        {
          path: 'innerPm',
          name: 'innerPm',
          icon: 'ios-bell',
          label: '内网设备性能管理',
          component: () => import('../views/pm/innerPm.vue')
        },
      ]
      
    },
    {
      path: 'bigView',
      name: 'bigView',
      icon: 'ios-bell',
      label: '大屏',
      component: () => import('../views/home/bigView'),
    },
  ]
}

//不需要权限验证的通用路由
export const commonRouters = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   label: '登录',
  //   component: () => import('../views/login')
  // },
  {
    path: '/403',
    name: 'error-403',
    label: '403权限不足',
    component: () => import('../views/error/403.vue')
  },
  {
    path: '/500',
    name: 'error-500',
    label: '500-服务端错误',
    component: () => import('../views/error/500.vue')
  },
  {
    path: '/*',
    name: 'error-404',
    label: '404-页面不存在',
    component: () => import('../views/error/404.vue')
  },
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  appRouter,
  ...commonRouters,
];
