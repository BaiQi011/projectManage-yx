window.DEMO_DATA = {
  meta: {
  systemName: '项目管理系统（演示版）',
    organization: '重庆城投智慧消防科技有限公司',
    slogan: '项目全过程管控 · 工程运维一体协同 · 资产设备闭环治理'
  },
  quickStats: {
    totalCustomers: 86,
    totalProjects: 128,
    activeProjects: 47,
    onlineDevices: 6842,
    warningCount: 13,
    contractAmount: '¥186,540,000',
    monthlyReceipts: '¥3,685,000'
  },
  notices: [
    { level: 'high', title: '江北区智慧消防改造项目存在高优先级施工延期风险', time: '今天 09:20' },
    { level: 'medium', title: '渝中片区设备返修工单待审批 4 条', time: '今天 10:15' },
    { level: 'low', title: '4 月度项目经营分析会已发布材料', time: '今天 11:30' }
  ],
  dashboard: {
    metricCards: [
      { label: '客户总数', value: '86', sub: '本月新增 26 家', route: '/pc/customer/archive' },
      { label: '项目总数', value: '128', sub: '本月新增 18 个', route: '/pc/project/archive' },
      { label: '在建项目数', value: '47', sub: '正常推进 39 个', route: '/pc/project/archive' },
      { label: '设备在线数', value: '6,842', sub: '在线率 97.6%', route: '/pc/asset/device' },
      { label: '告警数', value: '13', sub: '较昨日 -3', route: '/pc/asset/alarm', tone: 'danger' },
      { label: '合同总额', value: '¥1.87 亿', sub: '年度新签 ¥4,260 万', route: '/pc/contract/list' },
      { label: '本月回款', value: '¥368.5 万', sub: '月度环比 +72%', route: '/pc/finance/receipt' }
    ],
    customerScaleChart: {
      title: { text: '' },
      tooltip: {},
        legend: { top: 'top', right: 16 },
        xAxis: { data: ['微型企业', '小型企业', '中型企业', '大型企业'] },
        series: [
          { type: 'bar', name: '预客户', stack: 'total', color: '#4f8cff', data: [18, 26, 15, 8] },
          { type: 'bar', name: '准客户', stack: 'total', color: '#27c56d', data: [9, 13, 7, 4] },
          { type: 'bar', name: '签约客户', stack: 'total', color: '#f5a623', data: [6, 9, 5, 2] }
        ]
      },
    customerScaleSummary: [
      { label: '客户覆盖', value: '122 家' },
      { label: '已签约', value: '67 家' },
      { label: '重点跟进', value: '33 家' },
      { label: '储备商机', value: '22 家' }
    ],
    customerChannelChart: {
      title: { text: '' },
      tooltip: {},
      xAxis: { type: 'value' },
      yAxis: { data: ['客户推荐', '合作伙伴介绍', '电话销售', '社交媒体广告', '线下展会', '陌生拜访'] },
      series: [
        { type: 'bar', name: '签约客户', data: [22, 19, 18, 16, 14, 12] }
      ]
    },
    customerChannelSummary: [
      { label: '渠道类型', value: '6 类' },
      { label: '本月新增线索', value: '101 条' },
      { label: '主力渠道', value: '客户推荐' },
      { label: '合作转化', value: '18.8%' }
    ],
    projectStatusChart: {
      title: { text: '' },
      tooltip: {},
      series: [
        {
          type: 'pie',
          donut: true,
          center: ['70%', '54%'],
          radius: 0.28,
          innerRadius: 0.17,
          centerTitle: '项目总量',
          centerValue: '113',
          data: [
            { name: '待工勘', value: 28 },
            { name: '待施工', value: 35 },
            { name: '运营中', value: 41 },
            { name: '冻结', value: 9 }
          ]
        }
      ]
    },
    projectApprovalTrend30dChart: {
      title: { text: '' },
      tooltip: {},
      xAxis: {
        data: ['03/19', '03/20', '03/21', '03/22', '03/23', '03/24', '03/25', '03/26', '03/27', '03/28', '03/29', '03/30', '03/31', '04/01', '04/02', '04/03', '04/04', '04/05', '04/06', '04/07', '04/08', '04/09', '04/10', '04/11', '04/12', '04/13', '04/14', '04/15', '04/16', '04/17'],
        labelStep: 5
      },
      series: [
        {
          type: 'line',
          name: '立项数量',
          color: '#28d7ff',
          lineWidth: 4,
          lineGlow: 0.24,
          pointRadius: 4.5,
          showValueLabel: false,
          areaStyle: {},
          areaAlphaStart: 0.32,
          areaAlphaEnd: 0.03,
          areaOpacity: 0.22,
          emphasisPoints: [
            { index: 14, label: '峰值', stroke: '#5ef2ff', fill: '#8cf7ff' },
            { index: 29, label: '今日', stroke: '#ffd36a', fill: '#ffd36a' }
          ],
          data: [1, 2, 1, 3, 2, 2, 4, 3, 2, 5, 3, 4, 2, 3, 6, 4, 5, 3, 2, 4, 5, 4, 6, 3, 2, 4, 5, 6, 4, 3]
        }
      ]
    },
    deviceStatusChart: {
      title: { text: '' },
      tooltip: {},
      series: [
        {
          type: 'pie',
          donut: true,
          center: ['67%', '55%'],
          radius: 0.26,
          innerRadius: 0.15,
          centerTitle: '业务状态',
          centerValue: '8213',
          data: [
            { name: '在线运行', value: 6842 },
            { name: '仓储空闲', value: 1260 },
            { name: '维修中', value: 84 },
            { name: '待报废', value: 27 }
          ]
        }
      ]
    },
    deviceOnlineOfflineChart: {
      title: { text: '' },
      tooltip: {},
      series: [
        {
          type: 'pie',
          donut: true,
          center: ['67%', '55%'],
          radius: 0.26,
          innerRadius: 0.15,
          centerTitle: '在线率',
          centerValue: '83.3%',
          data: [
            {
              name: '在线',
              value: 6842,
              tooltipLines: ['设备总数：6,842', '海湾：2,180 / 312', '青鸟：1,946 / 268', '利达：1,504 / 196', '泛海三江：1,212 / 121']
            },
            {
              name: '离线',
              value: 1371,
              tooltipLines: ['设备总数：1,371', '海湾：312', '青鸟：268', '利达：196', '泛海三江：121', '其他：474']
            }
          ]
        }
      ]
    },
    deviceCategoryChart: {
      title: { text: '' },
      tooltip: {},
        legend: { show: false },
        xAxis: { data: ['用户信息传输装置', '一体式压力传感器', '一体式液位传感器', '离岗检测摄像机', '消防通道监测摄像机', '电气火灾报警器', '挂箱', '交换机'] },
        series: [
          { type: 'bar', name: '海湾', stack: 'supplier', color: '#4f8cff', data: [320, 280, 210, 160, 150, 240, 190, 140] },
          { type: 'bar', name: '青鸟', stack: 'supplier', color: '#2fd17b', data: [280, 230, 180, 140, 130, 210, 150, 120] },
          { type: 'bar', name: '利达', stack: 'supplier', color: '#31c7ff', data: [240, 220, 160, 120, 110, 180, 130, 105] },
          { type: 'bar', name: '泛海三江', stack: 'supplier', color: '#f5a623', data: [210, 190, 140, 100, 92, 155, 110, 90] },
          { type: 'bar', name: '其他', stack: 'supplier', color: '#8a94a8', data: [150, 120, 95, 80, 76, 115, 85, 70] }
        ]
      },
    contractTrendChart: {
      title: { text: '' },
      tooltip: {},
      xAxis: { data: ['已签约', '已付款', '付款完成'] },
      series: [
        {
          type: 'bar',
          name: '合同数量',
          tooltipLines: [
            ['合同数量：36', '合同金额：¥4,860 万'],
            ['合同数量：27', '合同金额：¥3,420 万'],
            ['合同数量：18', '合同金额：¥2,180 万']
          ],
          data: [36, 27, 18]
        }
      ]
    },
    invoiceTrendChart: {
      title: { text: '' },
      tooltip: { trigger: 'axis' },
      legend: { top: 'top', right: 16 },
      xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
      yAxis: [
        {
          type: 'value',
          name: '金额（万元）',
          position: 'left'
        },
        {
          type: 'value',
          name: '数量（份）',
          position: 'right'
        }
      ],
      series: [
        { type: 'line', name: '合同金额', color: '#28d7ff', lineWidth: 4, lineGlow: 0.18, yAxisIndex: 0, data: [860, 1420, 1180, 2260, 1950, 2480] },
        { type: 'line', name: '回款金额', color: '#25d18a', lineWidth: 4, lineGlow: 0.18, yAxisIndex: 0, data: [520, 860, 980, 1320, 1540, 1790] },
        { type: 'line', name: '开票金额', color: '#ffb347', lineWidth: 4, lineGlow: 0.18, yAxisIndex: 0, data: [460, 790, 910, 1280, 1490, 1680] },
        { type: 'line', name: '生产产值', color: '#8b7cff', lineWidth: 4, lineGlow: 0.18, yAxisIndex: 0, data: [680, 1180, 1260, 1890, 1720, 2160] },
        { type: 'line', name: '合同签订数量', color: '#ffd166', lineWidth: 4, lineGlow: 0.18, yAxisIndex: 1, data: [8, 12, 11, 17, 15, 19] }
      ]
    },
    overdueSurveyOrders: [
      { id: 'GK-202604-018', project: '渝中区历史风貌区消防联网改造', customer: '渝中区城市更新中心', owner: '刘健', dueDate: '2026-04-05', overdue: '超期 3 天', route: '/pc/project/survey-workorder' },
      { id: 'GK-202604-023', project: '江北国际机场货运区消防普查', customer: '重庆江北机场集团', owner: '吴柯', dueDate: '2026-04-04', overdue: '超期 4 天', route: '/pc/project/survey-workorder' },
      { id: 'GK-202604-031', project: '两江新区智慧园区消火栓摸排', customer: '两江新区产业投资集团', owner: '李健', dueDate: '2026-04-02', overdue: '超期 6 天', route: '/pc/project/survey-workorder' }
    ],
    overdueConstructionOrders: [
      { id: 'SG-202604-011', project: '江北区智慧消防设施改造项目', customer: '重庆江北机场集团', owner: '杨辉', dueDate: '2026-04-03', overdue: '超期 5 天', route: '/pc/project/construction-workorder' },
      { id: 'SG-202604-016', project: '南岸区医院消防设施更新工程', customer: '南岸区医院建设管理中心', owner: '彭超', dueDate: '2026-04-01', overdue: '超期 7 天', route: '/pc/project/construction-workorder' },
      { id: 'SG-202604-022', project: '渝中旧改消防联网设备安装', customer: '渝中区城市更新中心', owner: '陈斌', dueDate: '2026-03-31', overdue: '超期 8 天', route: '/pc/project/construction-workorder' }
    ]
  },
  pcMenu: [
    { key: 'dashboard', label: '业务看板', icon: '📊', route: '/pc/dashboard' },
    { key: 'customer', label: '客户管理', icon: '👥', children: [
      { key: 'customer-archive', label: '客户档案', route: '/pc/customer/archive' },
      { key: 'customer-follow', label: '跟进记录', route: '/pc/customer/follow' }
    ]},
    { key: 'project', label: '项目管理', icon: '🏗️', children: [
      { key: 'project-archive', label: '项目档案', route: '/pc/project/archive' },
      { key: 'project-cost', label: '项目报价', route: '/pc/project/cost' },
      { key: 'survey-workorder', label: '工勘工单', route: '/pc/project/survey-workorder' },
      { key: 'construction-workorder', label: '施工工单', route: '/pc/project/construction-workorder' },
      { key: 'maintenance-workorder', label: '运维工单', route: '/pc/project/maintenance-workorder' }
    ]},
    { key: 'marketing', label: '营销管理', icon: '📈', children: [
      { key: 'salesperson', label: '销售人员', route: '/pc/marketing/salesperson' },
      { key: 'salesteam', label: '销售团队', route: '/pc/marketing/salesteam' }
    ]},
    { key: 'contract', label: '合同管理', icon: '📝', route: '/pc/contract/list' },
    { key: 'engineering', label: '工程管理', icon: '🧰', children: [
      { key: 'engineer', label: '工程人员', route: '/pc/engineering/engineer' },
      { key: 'team', label: '工程小组', route: '/pc/engineering/team' },
      { key: 'vehicle-log', label: '车辆使用记录', route: '/pc/engineering/vehicle-log' }
    ]},
    { key: 'purchase', label: '采购管理', icon: '🚚', children: [
      { key: 'supplier', label: '供应商管理', route: '/pc/purchase/supplier' },
      { key: 'purchase-order', label: '采购单', route: '/pc/purchase/order' },
      { key: 'supplier-score', label: '供应商评分', route: '/pc/purchase/score' }
    ]},
    { key: 'asset', label: '设备资产管理', icon: '🧯', children: [
      { key: 'model', label: '型号管理', route: '/pc/asset/model' },
      { key: 'device', label: '设备档案', route: '/pc/asset/device' },
      { key: 'inventory', label: '设备库存', route: '/pc/asset/inventory' },
      { key: 'receive', label: '设备领用', route: '/pc/asset/receive' },
      { key: 'return', label: '设备退回', route: '/pc/asset/return' },
      { key: 'repair', label: '设备返修', route: '/pc/asset/repair' },
      { key: 'scrap', label: '设备报废', route: '/pc/asset/scrap' },
      { key: 'inbound', label: '入库记录', route: '/pc/asset/inbound' },
      { key: 'outbound', label: '出库记录', route: '/pc/asset/outbound' },
      { key: 'alarm', label: '告警记录', route: '/pc/asset/alarm' }
    ]},
    { key: 'finance', label: '财务管理', icon: '💹', children: [
      { key: 'profit', label: '项目毛利', route: '/pc/finance/profit' },
      { key: 'receipt', label: '回款记录', route: '/pc/finance/receipt' },
      { key: 'payment', label: '付款记录', route: '/pc/finance/payment' },
      { key: 'invoice', label: '开票记录', route: '/pc/finance/invoice' },
      { key: 'performance', label: '人员业绩', route: '/pc/finance/performance' }
    ]},
    { key: 'system', label: '系统管理', icon: '⚙️', children: [
      { key: 'user', label: '用户管理', route: '/pc/system/user' },
      { key: 'department', label: '部门管理', route: '/pc/system/department' },
      { key: 'dictionary', label: '字典管理', route: '/pc/system/dictionary' }
    ]}
  ],
  appTabs: [
    { key: 'home', label: '首页', icon: '⌂', route: '/app/home' },
    { key: 'message', label: '消息', icon: '✉', route: '/app/message' },
    { key: 'approval', label: '审批', icon: '✓', route: '/app/approval' },
    { key: 'profile', label: '我的', icon: '◎', route: '/app/profile' }
  ],
  appHomeQuickActions: [
    { label: '快速立项', icon: '◫', route: '/pc/project/archive' },
    { label: '工勘申请', icon: '⌖', route: '/app/survey-workorder' },
    { label: '施工申请', icon: '⚒', route: '/app/construction-workorder' },
    { label: '设备领用', icon: '↗', route: '/app/device-receive' }
  ],
  appHomeTasks: [
    { label: '待办工单', value: 5, route: '/app/construction-workorder' },
    { label: '待审批', value: 6, route: '/app/approval' }
  ],
  appHomeTaskReminder: {
    label: '待办工单',
    total: 5,
    route: '/app/survey-workorder',
    items: [
      { label: '工勘', value: 3, route: '/app/survey-workorder' },
      { label: '施工', value: 2, route: '/app/construction-workorder' },
      { label: '运维', value: 0, route: '/app/maintenance-workorder' }
    ]
  },
  appHomeGroups: [
    { title: '客户与销售', items: [
      { label: '客户档案', icon: '◌', route: '/pc/customer/archive' },
      { label: '跟进记录', icon: '◎', route: '/pc/customer/follow' },
      { label: '销售团队', icon: '◈', route: '/pc/marketing/salesteam' }
    ]},
    { title: '项目管理', items: [
      { label: '项目档案', icon: '▤', route: '/pc/project/archive' },
      { label: '项目报价', icon: '¥', route: '/app/project-cost' },
      { label: '工勘工单', icon: '⌖', route: '/app/survey-workorder' },
      { label: '施工工单', icon: '⚒', route: '/app/construction-workorder' },
      { label: '运维工单', icon: '⚙', route: '/app/maintenance-workorder' }
    ]},
    { title: '采购和设备资产', items: [
      { label: '采购单', icon: '▥', route: '/app/purchase-order' },
      { label: '设备领用', icon: '↗', route: '/app/device-receive' },
      { label: '设备退回', icon: '↙', route: '/app/device-return' },
      { label: '设备返修', icon: '△', route: '/pc/asset/repair' },
      { label: '设备报废', icon: '▲', route: '/pc/asset/scrap' }
    ]}
  ],
  dashboardCharts: {
    yearlyProjectAmount: {
      title: { text: '年度项目产值趋势' },
      xAxis: { data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
      series: [{ type: 'line', data: [860, 1220, 1480, 1710, 1960, 2240] }]
    },
    workorderDistribution: {
      title: { text: '工单状态分布' },
      series: [{ type: 'pie', data: [
        { name: '待受理', value: 18 },
        { name: '处理中', value: 42 },
        { name: '已完成', value: 76 },
        { name: '已超期', value: 9 }
      ] }]
    },
    customerGrowth: {
      title: { text: '重点客户增长' },
      xAxis: { data: ['渝中', '江北', '南岸', '两江', '沙坪坝'] },
      series: [{ type: 'bar', data: [16, 22, 18, 28, 14] }]
    }
  },
  customerArchiveOptions: {
    scales: ['微型企业', '小型企业', '中型企业', '大型企业'],
    tags: ['预客户', '准客户', '成交客户'],
    levels: ['VIP1', 'VIP2', 'VIP3', 'VIP4', 'VIP5'],
    sources: ['陌生拜访', '电话销售', '线下展会', '客户推荐', '社交媒体广告', '合作伙伴介绍'],
    industries: ['政府平台', '机场交通', '医疗卫生', '产业园区', '商业综合体', '教育院校'],
    projectScales: ['5个以下', '(含)5个至10个之间', '(含)10个至30个之间', '(含)30个以上'],
    salespersons: ['周洋', '刘芸', '何成', '王博', '张敏']
  },
  customerArchiveList: [
    { id: 'KH-2026-001', name: '重庆江北机场集团', creditCode: '91500000MA61JBA201', scale: '大型企业', tag: '成交客户', salesperson: '周洋', latestFollow: '2026-04-07 16:30', address: '重庆市渝北区两路街道机场路 1 号', source: '客户推荐', level: 'VIP5', industry: '机场交通', managedProjectScale: '(含)10个至30个之间', legalName: '赵建国', legalPhone: '13980001024', legalEmail: 'zhaojianguo@cqairport.cn', contactName: '陈思远', contactTitle: '设备保障部主任', contactPhone: '13890001220' },
    { id: 'KH-2026-002', name: '渝中区城市更新中心', creditCode: '12500103MB1K88231N', scale: '中型企业', tag: '准客户', salesperson: '刘芸', latestFollow: '2026-04-06 10:20', address: '重庆市渝中区人民路 188 号', source: '合作伙伴介绍', level: 'VIP3', industry: '政府平台', managedProjectScale: '(含)5个至10个之间', legalName: '陈晓梅', legalPhone: '13824510001', legalEmail: 'chenxm@yuzhong.gov.cn', contactName: '宋凯', contactTitle: '项目招商主管', contactPhone: '13677001288' },
    { id: 'KH-2026-003', name: '两江新区产业投资集团', creditCode: '91500000MA5U7H8E9P', scale: '大型企业', tag: '成交客户', salesperson: '何成', latestFollow: '2026-04-05 14:10', address: '重庆市两江新区黄山大道中段 60 号', source: '线下展会', level: 'VIP4', industry: '产业园区', managedProjectScale: '(含)30个以上', legalName: '王志峰', legalPhone: '13611880009', legalEmail: 'wangzf@ljtz.com', contactName: '周晨', contactTitle: '招商主管', contactPhone: '13967002211' },
    { id: 'KH-2026-004', name: '南岸区医院建设管理中心', creditCode: '12500108MB1A33216Q', scale: '中型企业', tag: '准客户', salesperson: '王博', latestFollow: '2026-04-03 11:40', address: '重庆市南岸区南坪东路 12 号', source: '电话销售', level: 'VIP2', industry: '医疗卫生', managedProjectScale: '5个以下', legalName: '李雪', legalPhone: '13756781234', legalEmail: 'lixue@nahealth.cn', contactName: '何婕', contactTitle: '后勤保障科长', contactPhone: '18623451221' },
    { id: 'KH-2026-005', name: '重庆高新区科创园运营公司', creditCode: '91500107MA60CC3Y7M', scale: '小型企业', tag: '预客户', salesperson: '张敏', latestFollow: '2026-04-02 09:15', address: '重庆市高新区大学城南路 99 号', source: '社交媒体广告', level: 'VIP1', industry: '产业园区', managedProjectScale: '(含)5个至10个之间', legalName: '沈涛', legalPhone: '13599881221', legalEmail: 'shentao@gxkcpark.com', contactName: '唐蕾', contactTitle: '招商主管', contactPhone: '18723001222' }
  ],
  customerFollowOptions: {
    methods: ['现场拜访', '电话沟通', '视频会议', '商务接待', '方案汇报', '微信沟通'],
    salespersons: ['周洋', '刘芸', '何成', '王博', '张敏']
  },
  customerFollowList: [
    { id: 'GJ-2026-001', customerId: 'KH-2026-001', customerName: '重庆江北机场集团', follower: '周洋', method: '现场拜访', time: '2026-04-07 16:30', detail: '就江北货运区消防弱电改造方案进行现场复核，客户重点关注主机联动与报警传输稳定性，约定下周提交优化版技术清单。', images: ['现场照片-1.jpg', '机房踏勘图.jpg'] },
    { id: 'GJ-2026-002', customerId: 'KH-2026-002', customerName: '渝中区城市更新中心', follower: '刘芸', method: '方案汇报', time: '2026-04-06 10:20', detail: '围绕旧改片区消防联网平台建设方案进行专题汇报，客户对分期实施和资金平衡方案表示认可，待内部审定。', images: ['汇报PPT封面.jpg'] },
    { id: 'GJ-2026-003', customerId: 'KH-2026-003', customerName: '两江新区产业投资集团', follower: '何成', method: '视频会议', time: '2026-04-05 14:10', detail: '对接园区运维项目续签事宜，重点确认年度巡检频次、驻场服务时段及设备更换响应承诺，客户要求补充 SLA 条款。', images: [] },
    { id: 'GJ-2026-004', customerId: 'KH-2026-004', customerName: '南岸区医院建设管理中心', follower: '王博', method: '电话沟通', time: '2026-04-03 11:40', detail: '沟通医院住院楼消防设施更新预算，客户反馈本轮重点在应急广播和喷淋末端整改，计划安排下周现场踏勘。', images: [] },
    { id: 'GJ-2026-005', customerId: 'KH-2026-005', customerName: '重庆高新区科创园运营公司', follower: '张敏', method: '商务接待', time: '2026-04-02 09:15', detail: '客户来访公司参观智慧消防管理平台演示环境，已建立初步联系，拟推荐园区楼宇消防物联改造方案。', images: ['来访签到.jpg'] }
  ],
  projectArchiveOptions: {
    status: ['待工勘', '待施工', '运营中', '冻结'],
    projectTypes: ['消防改造', '消防联网', '智慧运维', '设备更新', '年度维保'],
    managers: ['彭超', '杨辉', '周晨', '张瑶', '陈斌'],
    salespersons: ['周洋', '刘芸', '何成', '王博', '张敏']
  },
  projectArchiveTree: [
    {
      id: 'XM-2026-018',
      parentId: '',
      name: '江北区智慧消防设施改造项目',
      code: 'XM-2026-018',
      investorId: 'TZ-001',
      investorName: '重庆城投建设基金',
      customerId: 'KH-2026-001',
      customerName: '重庆江北机场集团',
      status: '待施工',
      manager: '彭超',
      salesperson: '周洋',
      projectType: '消防改造',
      contactName: '陈思远',
      contactTitle: '设备保障部主任',
      contactPhone: '13890001220',
      area: '重庆市渝北区江北国际机场',
      contractAmount: '¥8,600,000',
      period: '2026-03-15 至 2026-09-30',
      progress: '42%',
      deviceCount: 286,
      workorderCount: 18,
      remark: '一期聚焦货运区、航站区老旧主机与联动模块替换。',
      children: [
        {
          id: 'XM-2026-018-01',
          parentId: 'XM-2026-018',
          name: '货运区消防主机升级子项目',
          code: 'XM-2026-018-01',
          investorId: 'TZ-001',
          investorName: '重庆城投建设基金',
          customerId: 'KH-2026-001',
          customerName: '重庆江北机场集团',
          status: '待施工',
          manager: '杨辉',
          salesperson: '周洋',
          projectType: '设备更新',
          contactName: '陈思远',
          contactTitle: '设备保障部主任',
          contactPhone: '13890001220',
          area: '重庆市渝北区货运区',
          contractAmount: '¥3,200,000',
          period: '2026-03-20 至 2026-07-30',
          progress: '36%',
          deviceCount: 96,
          workorderCount: 7,
          remark: '涉及 3 套主机更换及报警回路迁改。'
        },
        {
          id: 'XM-2026-018-02',
          parentId: 'XM-2026-018',
          name: '航站楼联动控制改造子项目',
          code: 'XM-2026-018-02',
          investorId: 'TZ-001',
          investorName: '重庆城投建设基金',
          customerId: 'KH-2026-001',
          customerName: '重庆江北机场集团',
          status: '待工勘',
          manager: '彭超',
          salesperson: '周洋',
          projectType: '消防改造',
          contactName: '陈思远',
          contactTitle: '设备保障部主任',
          contactPhone: '13890001220',
          area: '重庆市渝北区 T3 航站楼',
          contractAmount: '¥2,480,000',
          period: '2026-04-01 至 2026-08-15',
          progress: '18%',
          deviceCount: 74,
          workorderCount: 5,
          remark: '需复核风机、水泵、卷帘门联动点位。'
        }
      ]
    },
    {
      id: 'XM-2026-023',
      parentId: '',
      name: '渝中区旧改消防联网项目',
      code: 'XM-2026-023',
      investorId: 'TZ-002',
      investorName: '渝中更新专项资金',
      customerId: 'KH-2026-002',
      customerName: '渝中区城市更新中心',
      status: '待工勘',
      manager: '杨辉',
      salesperson: '刘芸',
      projectType: '消防联网',
      contactName: '宋凯',
      contactTitle: '项目招商主管',
      contactPhone: '13677001288',
      area: '重庆市渝中区解放碑片区',
      contractAmount: '¥12,400,000',
      period: '2026-04-10 至 2026-12-20',
      progress: '12%',
      deviceCount: 420,
      workorderCount: 9,
      remark: '分三批推进历史风貌区联网改造，需兼容既有平台。 '
    },
    {
      id: 'XM-2026-031',
      parentId: '',
      name: '两江新区产业园消防运维项目',
      code: 'XM-2026-031',
      investorId: 'TZ-003',
      investorName: '两江产业投资基金',
      customerId: 'KH-2026-003',
      customerName: '两江新区产业投资集团',
      status: '运营中',
      manager: '周晨',
      salesperson: '何成',
      projectType: '智慧运维',
      contactName: '周晨',
      contactTitle: '招商主管',
      contactPhone: '13967002211',
      area: '重庆市两江新区产业园片区',
      contractAmount: '¥5,350,000',
      period: '2026-01-01 至 2026-12-31',
      progress: '68%',
      deviceCount: 1260,
      workorderCount: 49,
      remark: '覆盖 8 个园区、32 栋楼宇的巡检与维修。'
    },
    {
      id: 'XM-2026-037',
      parentId: '',
      name: '南岸区医院消防设施更新工程',
      code: 'XM-2026-037',
      customerId: 'KH-2026-004',
      customerName: '南岸区医院建设管理中心',
      status: '冻结',
      manager: '张瑶',
      salesperson: '王博',
      projectType: '设备更新',
      contactName: '何婕',
      contactTitle: '后勤保障科长',
      contactPhone: '18623451221',
      area: '重庆市南岸区南坪东路',
      contractAmount: '¥9,200,000',
      period: '2026-02-18 至 2026-10-30',
      progress: '8%',
      deviceCount: 312,
      workorderCount: 6,
      remark: '因医院二次预算调整，项目暂缓实施。'
    }
  ],
  projectDetailData: {
    'XM-2026-018': {
      milestones: [
        { label: '立项', date: '2026-03-08', status: 'done' },
        { label: '签约', date: '2026-03-22', status: 'done' },
        { label: '工勘', date: '2026-04-06', status: 'done' },
        { label: '施工', date: '2026-04-12', status: 'active' },
        { label: '回款', date: '2026-05-18', status: 'pending' }
      ],
      basicInfo: [
        ['项目编号', 'XM-2026-018'],
        ['所属客户', '重庆江北机场集团'],
        ['项目类型', '消防改造'],
        ['项目负责人', '彭超'],
        ['项目区域', '重庆市渝北区江北国际机场'],
        ['销售人员', '周洋'],
        ['合同金额', '¥8,600,000'],
        ['实施周期', '2026-03-15 至 2026-09-30'],
        ['设备数量', '286 台'],
        ['工单数量', '18 条'],
        ['备注', '一期重点改造货运区、航站楼消防主机及联动系统。']
      ],
      cost: {
        totalBudget: '¥7,350,000',
        dynamicCost: '¥7,120,000',
        materialCost: '¥4,980,000',
        laborCost: '¥1,450,000',
        grossMargin: '17.2%',
        warning: '正常'
      },
      workorders: [
        { code: 'GD-20260408-001', type: '施工工单', creator: '杨辉', createTime: '2026-04-08 09:10', status: '处理中', overdue: true },
        { code: 'GD-20260406-015', type: '工勘工单', creator: '刘健', createTime: '2026-04-06 14:25', status: '待受理', overdue: false },
        { code: 'GD-20260402-021', type: '整改工单', creator: '郑林', createTime: '2026-04-02 11:30', status: '已超期', overdue: true }
      ],
      devices: [
        { code: 'SB-001028', name: '点型感烟火灾探测器', category: '火灾报警设备', brand: '青鸟消防', model: 'JTY-GD-3100', installLocation: 'T1 航站楼 B1 层弱电井', status: '在线' },
        { code: 'SB-001246', name: '消防应急广播模块', category: '广播通讯设备', brand: '海湾', model: 'YJG-MK-22', installLocation: '货运区 2 号楼广播机房', status: '离线' },
        { code: 'SB-001512', name: '联动控制模块', category: '联动控制设备', brand: '利达', model: 'LDK-MK-08', installLocation: '停车楼消防控制室', status: '待安装' }
      ],
      contracts: [
        { code: 'HT-2026-011', name: '江北机场消防改造施工合同', amount: '¥8,600,000', invoiceAmount: '¥5,260,000', receivedAmount: '¥3,840,000', signDate: '2026-03-22', status: '履约中' }
      ]
    }
  },
  projectCostOptions: {
    statuses: ['草稿', '审批中', '已通过', '已驳回', '已撤销'],
    costItems: [
      { name: '用户信息传输装置', unit: '台' },
      { name: '一体式压力传感器', unit: '台' },
      { name: '一体式液位传感器', unit: '台' },
      { name: '离岗检测摄像机', unit: '台' },
      { name: '消防通道监测摄像机', unit: '台' },
      { name: '电气火灾报警器', unit: '台' },
      { name: '网络服务（宽带）', unit: '年/条' },
      { name: '挂箱', unit: '台' },
      { name: '交换机', unit: '台' },
      { name: '电源线', unit: 'm' },
      { name: '网线', unit: 'm' }
    ]
  },
  projectCostList: [
    {
      id: 'ZJ-2026-001',
      projectId: 'XM-2026-018',
      projectName: '江北区智慧消防设施改造项目',
      customerName: '重庆江北机场集团',
      creator: '彭超',
      createTime: '2026-04-06 10:30',
      status: '审批中',
      approvalRecords: [
        { time: '2026-04-06 10:30', operator: '彭超', action: '提交', remark: '提交报价审批，申请审核主材与设备预算。' },
        { time: '2026-04-07 09:15', operator: '李国华', action: '审批中', remark: '已进入总经办审批流程。' }
      ],
      details: [
        { name: '用户信息传输装置', unit: '台', qty: 12, price: 2800, amount: 33600, remark: '主机联网传输' },
        { name: '一体式压力传感器', unit: '台', qty: 26, price: 980, amount: 25480, remark: '消防水系统监测' },
        { name: '一体式液位传感器', unit: '台', qty: 10, price: 1260, amount: 12600, remark: '水箱液位' },
        { name: '离岗检测摄像机', unit: '台', qty: 8, price: 1650, amount: 13200, remark: '值守岗亭' },
        { name: '消防通道监测摄像机', unit: '台', qty: 18, price: 1420, amount: 25560, remark: '关键通道' },
        { name: '电气火灾报警器', unit: '台', qty: 22, price: 1180, amount: 25960, remark: '配电箱监测' },
        { name: '网络服务（宽带）', unit: '年/条', qty: 4, price: 1800, amount: 7200, remark: '项目专线' },
        { name: '挂箱', unit: '台', qty: 28, price: 240, amount: 6720, remark: '模块安装' },
        { name: '交换机', unit: '台', qty: 6, price: 1350, amount: 8100, remark: '接入交换' },
        { name: '电源线', unit: 'm', qty: 3200, price: 6.8, amount: 21760, remark: 'RVV 线缆' },
        { name: '网线', unit: 'm', qty: 4200, price: 3.6, amount: 15120, remark: '六类非屏蔽' }
      ]
    },
    {
      id: 'ZJ-2026-002',
      projectId: 'XM-2026-023',
      projectName: '渝中区旧改消防联网项目',
      customerName: '渝中区城市更新中心',
      creator: '杨辉',
      createTime: '2026-04-05 15:20',
      status: '草稿',
      approvalRecords: [
        { time: '2026-04-05 15:20', operator: '杨辉', action: '创建', remark: '首次录入旧改联网项目设备与材料清单。' }
      ],
      details: [
        { name: '用户信息传输装置', unit: '台', qty: 30, price: 2850, amount: 85500, remark: '分点位接入' },
        { name: '一体式压力传感器', unit: '台', qty: 48, price: 960, amount: 46080, remark: '旧改水系统' },
        { name: '一体式液位传感器', unit: '台', qty: 18, price: 1220, amount: 21960, remark: '高位水箱' },
        { name: '离岗检测摄像机', unit: '台', qty: 12, price: 1580, amount: 18960, remark: '消控室' },
        { name: '消防通道监测摄像机', unit: '台', qty: 36, price: 1380, amount: 49680, remark: '楼栋通道' },
        { name: '电气火灾报警器', unit: '台', qty: 40, price: 1160, amount: 46400, remark: '配电末端' },
        { name: '网络服务（宽带）', unit: '年/条', qty: 6, price: 1880, amount: 11280, remark: '联网专线' },
        { name: '挂箱', unit: '台', qty: 52, price: 235, amount: 12220, remark: '现场挂装' },
        { name: '交换机', unit: '台', qty: 10, price: 1320, amount: 13200, remark: '汇聚接入' },
        { name: '电源线', unit: 'm', qty: 5600, price: 6.5, amount: 36400, remark: '线缆施工' },
        { name: '网线', unit: 'm', qty: 8800, price: 3.4, amount: 29920, remark: '综合布线' }
      ]
    },
    {
      id: 'ZJ-2026-003',
      projectId: 'XM-2026-031',
      projectName: '两江新区产业园消防运维项目',
      customerName: '两江新区产业投资集团',
      creator: '周晨',
      createTime: '2026-04-02 09:50',
      status: '已通过',
      approvalRecords: [
        { time: '2026-04-02 09:50', operator: '周晨', action: '提交', remark: '提交运维项目季度报价清单。' },
        { time: '2026-04-03 11:20', operator: '李国华', action: '同意', remark: '金额结构合理，同意执行。' }
      ],
      details: [
        { name: '用户信息传输装置', unit: '台', qty: 8, price: 2760, amount: 22080, remark: '园区接入' },
        { name: '一体式压力传感器', unit: '台', qty: 16, price: 950, amount: 15200, remark: '泵房改造' },
        { name: '一体式液位传感器', unit: '台', qty: 6, price: 1190, amount: 7140, remark: '高位箱' },
        { name: '离岗检测摄像机', unit: '台', qty: 4, price: 1500, amount: 6000, remark: '门岗值守' },
        { name: '消防通道监测摄像机', unit: '台', qty: 10, price: 1360, amount: 13600, remark: '重点楼栋' },
        { name: '电气火灾报警器', unit: '台', qty: 12, price: 1120, amount: 13440, remark: '动力配电' },
        { name: '网络服务（宽带）', unit: '年/条', qty: 3, price: 1760, amount: 5280, remark: '园区专线' },
        { name: '挂箱', unit: '台', qty: 18, price: 220, amount: 3960, remark: '设备安装' },
        { name: '交换机', unit: '台', qty: 4, price: 1280, amount: 5120, remark: '网络接入' },
        { name: '电源线', unit: 'm', qty: 1800, price: 6.2, amount: 11160, remark: '补线整改' },
        { name: '网线', unit: 'm', qty: 2600, price: 3.2, amount: 8320, remark: '运维换新' }
      ]
    }
  ],
  surveyWorkorderOptions: {
    surveyors: ['刘健', '吴柯', '李健', '郑林', '陈斌'],
    statuses: ['待派工', '待工勘', '勘查中', '已完成', '已撤销']
  },
  surveyWorkorderList: [
    {
      id: 'GK-202604-018',
      projectId: 'XM-2026-023',
      projectName: '渝中区旧改消防联网项目',
      surveyor: '刘健',
      planDate: '2026-04-05',
      siteContactName: '宋凯',
      siteContactTitle: '项目招商主管',
      siteContactPhone: '13677001288',
      imageAttachmentName: '工勘现场照片-001.jpg',
      remark: '需重点核对老旧楼栋消防主机联网方式与桥架路径。',
      createTime: '2026-04-02 09:20',
      creator: '杨辉',
      status: '待工勘',
      overdue: true,
      logSheet: {
        number: 'CTBXGK-0000001',
        communityInfo: {
          communityName: '渝中区旧改消防联网项目',
          address: '重庆市渝中区解放碑街道八一路 168 号消控室',
          buildingCount: '12',
          propertyCompany: '重庆渝中城市运营服务有限公司',
          propertyContact: '宋凯',
          propertyPhone: '13677001288',
          maintenanceCompany: '重庆渝安消防维保有限公司',
          maintenanceContact: '刘川',
          maintenancePhone: '13988004567',
          attachmentImages: ['工勘现场照片-001.jpg', '工勘现场照片-002.jpg', '工勘现场照片-003.jpg'],
          fireCodeImage: '高楼消防码-001.png'
        },
        fireAlarm: {
          hostBrand: '海湾',
          hostModel: 'GST5000',
          hostCount: '2',
          manufactureDate: '2021-05-18',
          pointCount: '1800',
          networkDetail: '主机通过联网网关接入区级平台，4 栋老楼需补桥接',
          broadband: '电信 200M 宽带已接入消控室',
          hasCrtData: true,
          hasCrtDisplay: true
        },
        videoSystem: {
          fireLaneCount: '3',
          fireLanePosition: '一期主入口、2 号楼北侧、地下车库东侧',
          rescueSiteCount: '2',
          rescueSitePosition: '5 号楼前广场、商业裙楼西侧'
        },
        waterSystem: [
          { name: '消防水池', qty: '1', valve: true, signal: '有', position: '地下二层泵房西侧', remark: '液位信号正常' },
          { name: '高位水箱', qty: '1', valve: true, signal: '有', position: '12 号楼屋顶', remark: '需加装液位传感器' },
          { name: '室内消火栓泵', qty: '2', valve: true, signal: '有', position: '地下二层泵房', remark: '主备切换正常' },
          { name: '室外消火栓泵', qty: '1', valve: true, signal: '无', position: '室外泵房', remark: '反馈信号未接入主机' },
          { name: '喷淋泵', qty: '2', valve: true, signal: '有', position: '地下二层泵房', remark: '运行状态正常' },
          { name: '喷淋末端', qty: '18', valve: true, signal: '有', position: '各楼层走廊末端', remark: '末端压力正常' }
        ],
        newDevices: [
          { content: '用户信息传输装置', unit: '台', qty: '1', remark: '安装于消控室机柜' },
          { content: '一体式压力传感器', unit: '个', qty: '4', remark: '泵组出水总管各 2 个' },
          { content: '一体式液位传感器', unit: '个', qty: '2', remark: '消防水池、高位水箱各 1 个' },
          { content: '离岗检测摄像机', unit: '台', qty: '1', remark: '消控室值守区' },
          { content: '消防通道监测摄像机', unit: '台', qty: '3', remark: '覆盖 3 处消防车道' },
          { content: '网络服务（宽带）', unit: '项', qty: '1', remark: '沿用现有电信专线' },
          { content: '挂箱', unit: '个', qty: '1', remark: '用户传输装置配套' },
          { content: '交换机', unit: '台', qty: '1', remark: '8 口千兆交换机' },
          { content: '电源线', unit: '米', qty: '120', remark: 'RVV2*1.5' },
          { content: '网线', unit: '米', qty: '260', remark: '六类非屏蔽' }
        ]
      },
      logs: [
        { time: '2026-04-02 09:20', operator: '杨辉', content: '创建工勘工单，要求对解放碑片区旧改建筑进行消防主机联网现状勘查。' },
        { time: '2026-04-03 15:10', operator: '刘健', content: '已领取任务，待协调现场进场。' }
      ]
    },
    {
      id: 'GK-202604-023',
      projectId: 'XM-2026-018-02',
      projectName: '航站楼联动控制改造子项目',
      surveyor: '吴柯',
      planDate: '2026-04-08',
      siteContactName: '陈思远',
      siteContactTitle: '设备保障部主任',
      siteContactPhone: '13890001220',
      imageAttachmentName: '',
      remark: '复核风机、水泵和卷帘门联动点位，确认夜间施工窗口。',
      createTime: '2026-04-06 14:30',
      creator: '彭超',
      status: '勘查中',
      overdue: false,
      logSheet: {
        number: 'CTBXGK-0000002',
        communityInfo: {
          communityName: '航站楼联动控制改造子项目',
          address: '重庆市江北区机场货运区 T3 航站楼消控中心',
          buildingCount: '6',
          propertyCompany: '重庆机场设备保障中心',
          propertyContact: '陈思远',
          propertyPhone: '13890001220',
          maintenanceCompany: '重庆民航消防技术服务有限公司',
          maintenanceContact: '冯亮',
          maintenancePhone: '13699002118',
          attachmentImages: ['联动控制点位照片-001.jpg', '联动控制点位照片-002.jpg'],
          fireCodeImage: '-'
        },
        fireAlarm: {
          hostBrand: '青鸟',
          hostModel: 'JB-QB-JBF-11S',
          hostCount: '3',
          manufactureDate: '2020-11-09',
          pointCount: '2400',
          networkDetail: '主机通过机场专网与中心平台互联，联动控制柜单独组网',
          broadband: '机场专网 100M，可复用',
          hasCrtData: true,
          hasCrtDisplay: true
        },
        videoSystem: {
          fireLaneCount: '2',
          fireLanePosition: '货运区南门、西侧装卸平台',
          rescueSiteCount: '2',
          rescueSitePosition: 'T3 东侧机坪、货运区停车场'
        },
        waterSystem: [
          { name: '消防水池', qty: '1', valve: true, signal: '有', position: '动力站负一层', remark: '信号上传正常' },
          { name: '高位水箱', qty: '1', valve: true, signal: '有', position: '航站楼屋面', remark: '需复核液位余量' },
          { name: '室内消火栓泵', qty: '2', valve: true, signal: '有', position: '动力站泵房', remark: '联动测试待夜间开展' },
          { name: '室外消火栓泵', qty: '1', valve: true, signal: '有', position: '室外泵房', remark: '正常' },
          { name: '喷淋泵', qty: '2', valve: true, signal: '有', position: '动力站泵房', remark: '正常' },
          { name: '喷淋末端', qty: '16', valve: true, signal: '有', position: '航站楼各分区末端', remark: '末端试水正常' }
        ]
      },
      logs: [
        { time: '2026-04-06 14:30', operator: '彭超', content: '创建工勘工单，对 T3 航站楼联动控制点位开展二次复核。' },
        { time: '2026-04-08 10:15', operator: '吴柯', content: '已进场，正在复核风机、水泵、卷帘门联动点位。' }
      ]
    },
    {
      id: 'GK-202604-031',
      projectId: 'XM-2026-031',
      projectName: '两江新区产业园消防运维项目',
      surveyor: '郑林',
      planDate: '2026-04-04',
      createTime: '2026-04-01 11:40',
      creator: '周晨',
      status: '已完成',
      overdue: false,
      logSheet: {
        number: 'CTBXGK-0000003',
        communityInfo: {
          communityName: '两江新区产业园消防运维项目',
          address: '重庆市两江新区星光大道 88 号 3 号园区消控室',
          buildingCount: '9',
          propertyCompany: '两江新区产业园运营管理公司',
          propertyContact: '周晨',
          propertyPhone: '13967002211',
          attachmentImages: [],
          fireCodeImage: '-'
        },
        fireAlarm: {
          hostBrand: '北大青鸟',
          hostModel: 'JB-QG-QB9000',
          hostCount: '1',
          pointCount: '960',
          networkDetail: '已接入园区消防物联网平台',
          broadband: '移动 100M 宽带',
          hasCrtData: false,
          hasCrtDisplay: true
        },
        videoSystem: {
          fireLaneCount: '4',
          fireLanePosition: '园区南门、3 号楼东侧、5 号楼北侧、环道西段',
          rescueSiteCount: '3',
          rescueSitePosition: '3 号楼前、5 号楼前、中央广场'
        }
      },
      logs: [
        { time: '2026-04-01 11:40', operator: '周晨', content: '创建工勘工单，对 3 号园区消防泵房运行环境进行复核。' },
        { time: '2026-04-04 17:30', operator: '郑林', content: '完成现场勘查，已上传照片和问题清单。' }
      ]
    }
  ],
  constructionWorkorderOptions: {
    workers: ['杨辉', '郑林', '陈斌', '张瑶', '周晨'],
    statuses: ['待派工', '待施工', '施工中', '已完成', '已撤销']
  },
  constructionWorkorderList: [
    {
      id: 'SG-202604-011',
      projectId: 'XM-2026-018',
      projectName: '江北区智慧消防设施改造项目',
      worker: '杨辉',
      planDate: '2026-04-03',
      siteContactName: '陈思远',
      siteContactTitle: '设备保障部主任',
      siteContactPhone: '13890001220',
      imageAttachmentName: '施工现场照片-001.jpg',
      remark: '主机拆除与桥架整理完成，待夜间窗口继续联调。',
      createTime: '2026-04-01 08:50',
      creator: '彭超',
      status: '施工中',
      overdue: true,
      logSheet: {
        number: 'CTBXGK-0000011',
        communityInfo: {
          communityName: '江北区智慧消防设施改造项目',
          address: '重庆市江北区港城工业园货运区消防控制室',
          buildingCount: '8',
          propertyCompany: '重庆机场货运保障有限公司',
          propertyContact: '陈思远',
          propertyPhone: '13890001220',
          maintenanceCompany: '重庆民航消防技术服务有限公司',
          maintenanceContact: '赵宁',
          maintenancePhone: '13611002345'
        },
        fireAlarm: {
          hostBrand: '海湾',
          hostModel: 'GST200',
          hostCount: '2',
          manufactureDate: '2019-08-16',
          pointCount: '1600',
          networkDetail: '主机与视频联动系统同机房部署，需新增联网传输装置',
          broadband: '机场专网可复用',
          hasCrtData: true,
          hasCrtDisplay: false
        },
        videoSystem: {
          fireLaneCount: '2',
          fireLanePosition: '货运区主干道、设备库东侧',
          rescueSiteCount: '1',
          rescueSitePosition: '货运区集散广场'
        },
        constructionItems: [
          {
            name: '用户信息传输装置安装',
            deviceCode: 'SB-001028',
            deviceName: '用户信息传输装置',
            deviceBrand: '安消智联',
            deviceModel: 'TX3000-4G',
            building: '货运区 1 号楼',
            floor: '1F',
            position: '消防控制室主机柜右侧',
            images: ['施工安装照片-001.jpg', '施工安装照片-002.jpg']
          }
        ],
        waterSystem: [
          { name: '消防水池', qty: '1', valve: true, signal: '有', position: '地下泵房', remark: '正常' },
          { name: '高位水箱', qty: '1', valve: true, signal: '有', position: '设备楼屋顶', remark: '正常' },
          { name: '室内消火栓泵', qty: '2', valve: true, signal: '有', position: '地下泵房', remark: '正常' },
          { name: '室外消火栓泵', qty: '1', valve: true, signal: '有', position: '室外泵房', remark: '正常' },
          { name: '喷淋泵', qty: '2', valve: true, signal: '有', position: '地下泵房', remark: '正常' },
          { name: '喷淋末端', qty: '12', valve: true, signal: '有', position: '园区各楼栋末端', remark: '末端压力正常' }
        ],
        newDevices: [
          { content: '用户信息传输装置', unit: '台', qty: '1', remark: '新装' },
          { content: '离岗检测摄像机', unit: '台', qty: '1', remark: '消控室值守位' },
          { content: '消防通道监测摄像机', unit: '台', qty: '2', remark: '车道抓拍' },
          { content: '交换机', unit: '台', qty: '1', remark: '千兆交换机' },
          { content: '电源线', unit: '米', qty: '80', remark: '现场布线' },
          { content: '网线', unit: '米', qty: '180', remark: '现场布线' }
        ]
      },
      logs: [
        { time: '2026-04-01 08:50', operator: '彭超', content: '创建施工工单，要求完成货运区设备拆改及新设备安装。' },
        { time: '2026-04-03 18:20', operator: '杨辉', content: '完成主机拆除和桥架整理，因夜间窗口限制，剩余联调延期。' }
      ]
    },
    {
      id: 'SG-202604-016',
      projectId: 'XM-2026-037',
      projectName: '南岸区医院消防设施更新工程',
      worker: '张瑶',
      planDate: '2026-04-10',
      siteContactName: '何婕',
      siteContactTitle: '后勤保障科长',
      siteContactPhone: '18623451221',
      imageAttachmentName: '',
      remark: '需先确认院方封控区域和施工时间窗口。',
      createTime: '2026-04-07 09:40',
      creator: '王博',
      status: '待施工',
      overdue: false,
      logSheet: {
        number: 'CTBXGK-0000012',
        communityInfo: {
          communityName: '南岸区医院消防设施更新工程',
          address: '重庆市南岸区南坪东路 56 号住院部消防控制室',
          buildingCount: '5',
          propertyCompany: '南岸区医院后勤保障中心',
          propertyContact: '何婕',
          propertyPhone: '18623451221'
        },
        fireAlarm: {
          hostBrand: '赋安',
          hostModel: 'JB-TB-FA160',
          hostCount: '2',
          pointCount: '1280',
          networkDetail: '院区楼栋独立组网，住院楼需新增网关',
          broadband: '联通 100M 宽带',
          hasCrtData: false,
          hasCrtDisplay: true
        },
        videoSystem: {
          fireLaneCount: '2',
          fireLanePosition: '住院部南侧、门诊楼西侧',
          rescueSiteCount: '2',
          rescueSitePosition: '住院部前广场、急诊楼北侧'
        }
      },
      logs: [
        { time: '2026-04-07 09:40', operator: '王博', content: '创建施工工单，待医院确认夜间施工窗口后进场。' }
      ]
    },
    {
      id: 'SG-202604-022',
      projectId: 'XM-2026-031',
      projectName: '两江新区产业园消防运维项目',
      worker: '郑林',
      planDate: '2026-04-05',
      createTime: '2026-04-02 13:10',
      creator: '周晨',
      status: '已完成',
      overdue: false,
      logSheet: {
        number: 'CTBXGK-0000013',
        communityInfo: {
          communityName: '两江新区产业园消防运维项目',
          address: '重庆市两江新区星光大道 88 号 5 号楼消控室',
          buildingCount: '9',
          propertyCompany: '两江新区产业园运营管理公司',
          propertyContact: '周晨',
          propertyPhone: '13967002211'
        },
        fireAlarm: {
          hostBrand: '北大青鸟',
          hostModel: 'JB-QB-QM200',
          hostCount: '1',
          pointCount: '980',
          networkDetail: '园区统一联网平台',
          broadband: '移动 100M 宽带',
          hasCrtData: true,
          hasCrtDisplay: true
        },
        videoSystem: {
          fireLaneCount: '4',
          fireLanePosition: '园区南门、3 号楼东侧、5 号楼北侧、环道西段',
          rescueSiteCount: '3',
          rescueSitePosition: '3 号楼前、5 号楼前、中央广场'
        }
      },
      logs: [
        { time: '2026-04-02 13:10', operator: '周晨', content: '创建施工工单，安排 5 号楼报警回路整改和模块替换。' },
        { time: '2026-04-05 16:40', operator: '郑林', content: '已完成现场整改和联动测试，提交完工照片。' }
      ]
    }
  ],
  maintenanceWorkorderOptions: {
    workers: ['郑林', '周晨', '陈斌', '刘健', '杨辉'],
    statuses: ['待派工', '待处理', '处理中', '已完成', '已撤销'],
    priorities: ['一般', '紧急', '特急']
  },
  maintenanceWorkorderList: [
    {
      id: 'YW-202604-006',
      projectId: 'XM-2026-031',
      projectName: '两江新区产业园消防运维项目',
      worker: '郑林',
      planDate: '2026-04-06',
      siteContactName: '周晨',
      siteContactTitle: '招商主管',
      siteContactPhone: '13967002211',
      imageAttachmentName: '运维处理照片-001.jpg',
      remark: '现场主机回路离线，优先排查通讯模块供电情况。',
      createTime: '2026-04-05 08:40',
      creator: '周晨',
      status: '处理中',
      overdue: true,
      priority: '紧急',
      faultDesc: '3号园区消防主机出现回路故障，现场多点位离线，需尽快恢复通讯。',
      processInfo: {
        detail: '已进场排查通讯模块供电情况，完成故障点定位并临时恢复部分回路通讯。',
        images: ['运维处置照片-001.jpg', '运维处置照片-002.jpg'],
        submitted: true,
        submitTime: '2026-04-06 10:15',
        submitter: '郑林'
      },
      logs: [
        { time: '2026-04-05 08:40', operator: '周晨', content: '创建运维工单，要求当日进场排查回路离线问题。' },
        { time: '2026-04-06 10:15', operator: '郑林', content: '已完成主机排查，发现通讯模块电源异常，正在更换配件。' }
      ]
    },
    {
      id: 'YW-202604-009',
      projectId: 'XM-2026-018',
      projectName: '江北区智慧消防设施改造项目',
      worker: '杨辉',
      planDate: '2026-04-10',
      siteContactName: '陈思远',
      siteContactTitle: '设备保障部主任',
      siteContactPhone: '13890001220',
      imageAttachmentName: '',
      remark: '需配合机场夜间检修窗口完成联动测试。',
      createTime: '2026-04-08 16:10',
      creator: '彭超',
      status: '待处理',
      overdue: false,
      priority: '一般',
      faultDesc: '货运区新装广播模块需进行联动复测，核对分区广播触发逻辑。',
      processInfo: {
        detail: '',
        images: [],
        submitted: false,
        submitTime: '',
        submitter: ''
      },
      logs: [
        { time: '2026-04-08 16:10', operator: '彭超', content: '创建运维复测工单，安排联动回归测试。' }
      ]
    },
    {
      id: 'YW-202604-012',
      projectId: 'XM-2026-023',
      projectName: '渝中区旧改消防联网项目',
      worker: '刘健',
      planDate: '2026-04-04',
      createTime: '2026-04-03 11:25',
      creator: '杨辉',
      status: '已完成',
      overdue: false,
      priority: '特急',
      faultDesc: '联网网关离线导致片区平台无法接收报警信号，需紧急恢复。',
      processInfo: {
        detail: '已更换网关电源模块并恢复数据上送，现场联调正常，平台告警恢复。',
        images: ['运维完工照片-001.jpg'],
        submitted: true,
        submitTime: '2026-04-04 14:40',
        submitter: '刘健'
      },
      logs: [
        { time: '2026-04-03 11:25', operator: '杨辉', content: '创建运维工单，要求立即恢复联网网关通讯。' },
        { time: '2026-04-04 14:40', operator: '刘健', content: '已更换网关电源模块并恢复数据上送，完成验收。' }
      ]
    }
  ],
  salespersonOptions: {
    teams: ['营销一部', '营销二部', '营销三部', '大客户部', '政企合作部'],
    statuses: ['启用', '禁用']
  },
  salespersonList: [
    { id: 'XS-001', name: '周洋', phone: '13980001038', team: '营销一部', status: '启用', followCount: 18, title: '销售经理', region: '江北区', email: 'zhouyang@cqct.com' },
    { id: 'XS-002', name: '刘芸', phone: '13980001052', team: '营销二部', status: '启用', followCount: 14, title: '招商主管', region: '渝中区', email: 'liuyun@cqct.com' },
    { id: 'XS-003', name: '何成', phone: '13980001077', team: '营销三部', status: '启用', followCount: 11, title: '客户经理', region: '南岸区', email: 'hecheng@cqct.com' },
    { id: 'XS-004', name: '王博', phone: '13980001105', team: '政企合作部', status: '启用', followCount: 9, title: '招商主管', region: '南岸区', email: 'wangbo@cqct.com' },
    { id: 'XS-005', name: '张敏', phone: '13980001116', team: '大客户部', status: '禁用', followCount: 6, title: '销售专员', region: '高新区', email: 'zhangmin@cqct.com' }
  ],
  salesTeamOptions: {
    statuses: ['启用', '禁用']
  },
  salesTeamList: [
    { id: 'XT-001', name: '营销一部', ownerId: 'XS-001', ownerName: '周洋', status: '启用', desc: '负责江北区及机场交通类客户拓展。', createTime: '2026-01-05 09:20', memberIds: ['XS-001'] },
    { id: 'XT-002', name: '营销二部', ownerId: 'XS-002', ownerName: '刘芸', status: '启用', desc: '负责渝中区旧改、平台类客户项目拓展。', createTime: '2026-01-06 10:00', memberIds: ['XS-002'] },
    { id: 'XT-003', name: '营销三部', ownerId: 'XS-003', ownerName: '何成', status: '启用', desc: '负责南岸区医院、教育及运维续签客户。', createTime: '2026-01-06 10:30', memberIds: ['XS-003'] },
    { id: 'XT-004', name: '政企合作部', ownerId: 'XS-004', ownerName: '王博', status: '启用', desc: '负责政府平台、专项合作和联合投标。', createTime: '2026-01-08 11:15', memberIds: ['XS-004'] },
    { id: 'XT-005', name: '大客户部', ownerId: 'XS-005', ownerName: '张敏', status: '禁用', desc: '负责大型园区及重点集团客户深耕。', createTime: '2026-01-09 14:10', memberIds: ['XS-005'] }
  ],
  engineerOptions: {
    teams: ['项目一组', '项目二组', '勘察组', '运维组', '安装组'],
    statuses: ['启用', '禁用']
  },
  engineerList: [
    { id: 'GC-001', name: '彭超', phone: '13980001152', team: '项目一组', status: '启用', title: '项目经理', region: '江北机场片区', email: 'pengchao@cqct.com', workorderCount: 12 },
    { id: 'GC-002', name: '杨辉', phone: '13980001136', team: '项目二组', status: '启用', title: '施工主管', region: '渝中旧改片区', email: 'yanghui@cqct.com', workorderCount: 9 },
    { id: 'GC-003', name: '刘健', phone: '13980001128', team: '勘察组', status: '启用', title: '勘察工程师', region: '中心城区', email: 'liujian@cqct.com', workorderCount: 14 },
    { id: 'GC-004', name: '郑林', phone: '13980001277', team: '运维组', status: '启用', title: '运维工程师', region: '两江新区产业园', email: 'zhenglin@cqct.com', workorderCount: 18 },
    { id: 'GC-005', name: '张瑶', phone: '13980001168', team: '安装组', status: '禁用', title: '安装工程师', region: '南岸医院片区', email: 'zhangyao@cqct.com', workorderCount: 6 }
  ],
  engineerTeamOptions: {
    statuses: ['启用', '禁用']
  },
  engineerTeamList: [
    { id: 'GZ-001', name: '项目一组', ownerId: 'GC-001', ownerName: '彭超', status: '启用', laborCost: '¥650/台', surveyLaborCost: '12次', desc: '负责重点改造项目统筹推进、现场协调与验收组织。', createTime: '2026-01-10 09:10', memberIds: ['GC-001'] },
    { id: 'GZ-002', name: '项目二组', ownerId: 'GC-002', ownerName: '杨辉', status: '启用', laborCost: '¥720/台', surveyLaborCost: '8次', desc: '负责施工组织、夜间窗口作业与现场安全管控。', createTime: '2026-01-10 09:40', memberIds: ['GC-002'] },
    { id: 'GZ-003', name: '勘察组', ownerId: 'GC-003', ownerName: '刘健', status: '启用', laborCost: '¥580/台', surveyLaborCost: '20次', desc: '负责现场工勘、点位复核、方案落位与工程量核验。', createTime: '2026-01-11 10:00', memberIds: ['GC-003'] },
    { id: 'GZ-004', name: '运维组', ownerId: 'GC-004', ownerName: '郑林', status: '启用', laborCost: '¥620/台', surveyLaborCost: '6次', desc: '负责运维巡检、故障处置、告警响应和备件更换。', createTime: '2026-01-11 10:25', memberIds: ['GC-004'] },
    { id: 'GZ-005', name: '安装组', ownerId: 'GC-005', ownerName: '张瑶', status: '禁用', laborCost: '¥600/台', surveyLaborCost: '5次', desc: '负责设备安装、桥架整改、模块上墙和联调支持。', createTime: '2026-01-11 10:50', memberIds: ['GC-005'] }
  ],
  vehicleLogOptions: {
    users: ['彭超', '杨辉', '刘健', '郑林', '张瑶'],
    statuses: ['已审批', '待审批', '已驳回'],
    plates: ['渝A·D1208', '渝A·F5621', '渝A·H2709', '渝A·K8836']
  },
  vehicleLogList: [
    { id: 'CL-20260408-01', plate: '渝A·D1208', user: '杨辉', reason: '江北项目巡检', departTime: '2026-04-08 08:10', returnTime: '2026-04-08 18:20', mileage: '86km', status: '已审批', destination: '江北国际机场货运区', remark: '完成设备巡检、材料清点及夜间施工窗口踏勘。' },
    { id: 'CL-20260408-02', plate: '渝A·F5621', user: '刘健', reason: '南岸现场勘查', departTime: '2026-04-08 09:00', returnTime: '2026-04-08 15:40', mileage: '54km', status: '已审批', destination: '南岸区医院建设管理中心', remark: '完成住院楼消防改造点位复核及现场拍照。' },
    { id: 'CL-20260408-03', plate: '渝A·H2709', user: '郑林', reason: '运维备件配送', departTime: '2026-04-08 13:10', returnTime: '-', mileage: '-', status: '待审批', destination: '两江新区产业园', remark: '紧急配送电源模块及网络交换机备件。' }
  ],
  supplierOptions: {
    categories: ['消防主材', '弱电系统', '安装劳务', '设备维保', '综合服务'],
    statuses: ['启用', '禁用']
  },
  supplierList: [
    { id: 'GY-001', name: '重庆安消设备有限公司', category: '消防主材', contact: '黄波', phone: '13981110021', status: '启用', address: '重庆市渝北区回兴工业园 8 号', remark: '主供报警主机、模块及传感器。' },
    { id: 'GY-002', name: '西南智联弱电科技', category: '弱电系统', contact: '唐晓', phone: '13870020019', status: '启用', address: '重庆市九龙坡区石桥铺科园路 16 号', remark: '主供交换机、综合布线及联网网关。' },
    { id: 'GY-003', name: '渝北机电安装服务部', category: '安装劳务', contact: '朱平', phone: '13651190026', status: '禁用', address: '重庆市渝北区双凤桥街道 66 号', remark: '承担现场安装及桥架整改劳务。' }
  ],
  purchaseOrderOptions: {
    types: ['设备采购', '辅材采购', '劳务采购'],
    statuses: ['待审核', '已审核'],
    inboundStatuses: ['待入库', '已入库']
  },
  purchaseOrderList: [
    {
      id: 'CG-202604-001',
      supplierId: 'GY-001',
      supplierName: '重庆安消设备有限公司',
      amount: '¥101,920.00',
      status: '已审核',
      inboundStatus: '待入库',
      createTime: '2026-04-02 10:30',
      creator: '杨辉',
      approvalRemark: '到货计划明确，同意采购。',
      details: [
        { category: '报警设备', brand: '海湾', model: 'GST-LD-8301', qty: '16', price: '1280', amount: '20480.00' },
        { category: '传感设备', brand: '安消智联', model: 'TX3000-4G', qty: '18', price: '3180', amount: '57240.00' },
        { category: '网络设备', brand: '华三', model: 'SW-16GE-POE', qty: '12', price: '2020', amount: '24240.00' }
      ],
      approvalRecords: [
        { time: '2026-04-02 10:30', operator: '杨辉', action: '创建', remark: '提交采购单，待审核。' },
        { time: '2026-04-02 14:10', operator: '李国华', action: '同意', remark: '到货计划明确，同意采购。' }
      ]
    },
    {
      id: 'CG-202604-004',
      supplierId: 'GY-002',
      supplierName: '西南智联弱电科技',
      amount: '¥59,120.00',
      status: '待审核',
      inboundStatus: '待入库',
      createTime: '2026-04-04 15:10',
      creator: '刘健',
      details: [
        { category: '网络设备', brand: '华三', model: 'SW-16GE-POE', qty: '10', price: '2260', amount: '22600.00' },
        { category: '视频设备', brand: '宇视', model: 'AI-CAM-TD600', qty: '8', price: '1720', amount: '13760.00' },
        { category: '报警设备', brand: '青鸟', model: 'JBF5111', qty: '16', price: '1422.5', amount: '22760.00' }
      ],
      approvalRecords: [
        { time: '2026-04-04 15:10', operator: '刘健', action: '创建', remark: '已提交采购申请。' }
      ]
    },
    {
      id: 'CG-202604-008',
      supplierId: 'GY-003',
      supplierName: '渝北机电安装服务部',
      amount: '¥35,760.00',
      status: '已审核',
      inboundStatus: '已入库',
      createTime: '2026-04-06 09:45',
      creator: '郑林',
      approvalRemark: '施工配套紧急，同意采购并已完成入库。',
      details: [
        { category: '报警设备', brand: '青鸟', model: 'JBF5111', qty: '12', price: '1380', amount: '16560.00' },
        { category: '视频设备', brand: '宇视', model: 'AI-CAM-TD600', qty: '6', price: '3200', amount: '19200.00' }
      ],
      approvalRecords: [
        { time: '2026-04-06 09:45', operator: '郑林', action: '创建', remark: '提交采购单，待审核。' },
        { time: '2026-04-06 11:20', operator: '李国华', action: '同意', remark: '施工配套紧急，同意采购。' },
        { time: '2026-04-07 16:30', operator: '仓库管理员', action: '入库', remark: '已按采购明细完成入库。' }
      ]
    }
  ],
  supplierScoreList: [
    { id: 'PF-001', supplierId: 'GY-001', supplierName: '重庆安消设备有限公司', assessor: '杨辉', scoreTime: '2026-04-03 10:20', score: '96', remark: '供货稳定，设备到货及时。' },
    { id: 'PF-004', supplierId: 'GY-001', supplierName: '重庆安消设备有限公司', assessor: '刘健', scoreTime: '2026-04-06 14:10', score: '94', remark: '到货响应快，包装完好，配套资料齐全。' },
    { id: 'PF-005', supplierId: 'GY-001', supplierName: '重庆安消设备有限公司', assessor: '郑林', scoreTime: '2026-04-08 09:15', score: '97', remark: '现场配合度高，缺件补发及时。' },
    { id: 'PF-002', supplierId: 'GY-002', supplierName: '西南智联弱电科技', assessor: '刘健', scoreTime: '2026-04-05 15:40', score: '91', remark: '弱电材料规格齐全，配合度高。' },
    { id: 'PF-006', supplierId: 'GY-002', supplierName: '西南智联弱电科技', assessor: '杨辉', scoreTime: '2026-04-07 11:05', score: '90', remark: '部分辅材交付时间偏紧，后续需提前对齐计划。' },
    { id: 'PF-003', supplierId: 'GY-003', supplierName: '渝北机电安装服务部', assessor: '郑林', scoreTime: '2026-04-07 09:30', score: '87', remark: '劳务响应较快，需加强现场成品保护。' }
  ],
  modelOptions: {
    categories: ['用户信息传输装置', '一体式压力传感器', '一体式液位传感器', '离岗检测摄像机', '消防通道监测摄像机', '电气火灾报警器', '挂箱', '交换机']
  },
  modelList: [
    { id: 'MX-001', brand: '安消智联', model: 'TX3000-4G', category: '用户信息传输装置', lowStockWarning: '20', unit: '台', status: '启用', remark: '' },
    { id: 'MX-002', brand: '博控', model: 'YL-20/1.6MPa', category: '一体式压力传感器', lowStockWarning: '', unit: '台', status: '启用', remark: '' },
    { id: 'MX-003', brand: '博控', model: 'YW-10M', category: '一体式液位传感器', lowStockWarning: '15', unit: '台', status: '启用', remark: '' },
    { id: 'MX-004', brand: '宇视', model: 'AI-CAM-LG300', category: '离岗检测摄像机', lowStockWarning: '2', unit: '台', status: '启用', remark: '' },
    { id: 'MX-005', brand: '宇视', model: 'AI-CAM-TD600', category: '消防通道监测摄像机', lowStockWarning: '10', unit: '台', status: '启用', remark: '' },
    { id: 'MX-006', brand: '海湾', model: 'GST-DQ-01', category: '电气火灾报警器', lowStockWarning: '', unit: '台', status: '启用', remark: '' },
    { id: 'MX-007', brand: '安消智联', model: 'HX-BOX-01', category: '挂箱', lowStockWarning: '5', unit: '台', status: '启用', remark: '' },
    { id: 'MX-008', brand: '华三', model: 'SW-16GE-POE', category: '交换机', lowStockWarning: '12', unit: '台', status: '启用', remark: '' }
  ],
    deviceArchiveOptions: {
      statuses: ['在用设备', '闲置设备', '返修设备', '报废中设备', '已报废设备']
    },
    deviceArchiveList: [
      { id: 'SB-001028', code: 'SB-001028', name: '用户信息传输装置', category: '用户信息传输装置', brand: '安消智联', modelId: 'MX-001', model: 'TX3000-4G', status: '在用设备', purchasePrice: '¥3,180.00', warehouse: '江北项目仓', owner: '彭超', installDate: '2026-03-28' },
      { id: 'SB-001112', code: 'SB-001112', name: '一体式压力传感器', category: '一体式压力传感器', brand: '博控', modelId: 'MX-002', model: 'YL-20/1.6MPa', status: '在用设备', purchasePrice: '¥980.00', warehouse: '渝中项目仓', owner: '杨辉', installDate: '2026-03-18' },
      { id: 'SB-001205', code: 'SB-001205', name: '一体式液位传感器', category: '一体式液位传感器', brand: '博控', modelId: 'MX-003', model: 'YW-10M', status: '闲置设备', purchasePrice: '¥1,280.00', warehouse: '主仓', owner: '郑林', installDate: '' },
      { id: 'SB-001318', code: 'SB-001318', name: '离岗检测摄像机', category: '离岗检测摄像机', brand: '宇视', modelId: 'MX-004', model: 'AI-CAM-LG300', status: '返修设备', purchasePrice: '¥1,860.00', warehouse: '南岸项目仓', owner: '张瑶', installDate: '2026-02-26' },
      { id: 'SB-001488', code: 'SB-001488', name: '消防通道监测摄像机', category: '消防通道监测摄像机', brand: '宇视', modelId: 'MX-005', model: 'AI-CAM-TD600', status: '报废中设备', purchasePrice: '¥1,720.00', warehouse: '主仓', owner: '刘健', installDate: '2025-12-06' },
      { id: 'SB-001566', code: 'SB-001566', name: '电气火灾报警器', category: '电气火灾报警器', brand: '海湾', modelId: 'MX-006', model: 'GST-DQ-01', status: '已报废设备', purchasePrice: '¥1,360.00', warehouse: '报废仓', owner: '周晨', installDate: '2025-08-11' }
    ],
  inventoryList: [
    { id: 'KC-001', modelId: 'MX-002', name: '点型感烟火灾探测器', model: 'JBF5111', warehouse: '主仓', idleQty: '1260', safeQty: '600', status: '充足', assetType: '设备' },
    { id: 'KC-002', modelId: 'MX-001', name: '消防应急广播模块', model: 'GST-LD-8301', warehouse: '江北项目仓', idleQty: '184', safeQty: '120', status: '正常', assetType: '设备' },
    { id: 'KC-003', modelId: 'MX-005', name: '交换机', model: 'SW-16GE-POE', warehouse: '主仓', idleQty: '28', safeQty: '32', status: '低库存', assetType: '设备' }
  ],
  deviceReceiveList: [
    {
      id: 'LY-202604-001',
      creator: '杨辉',
      createTime: '2026-04-06 09:20',
      status: '待审核',
      projectNames: '江北区智慧消防设施改造项目、渝中区旧改消防联网项目',
      qtySummary: '2个项目 / 20台设备',
      remark: '货运区主机联网设备与旧改通道视频设备同步领用。',
      projectCards: [
        {
          projectId: 'XM-2026-018',
          projectName: '江北区智慧消防设施改造项目',
          needs: [
            { category: '用户信息传输装置', qty: '8' },
            { category: '挂箱', qty: '6' }
          ]
        },
        {
          projectId: 'XM-2026-023',
          projectName: '渝中区旧改消防联网项目',
          needs: [
            { category: '消防通道监测摄像机', qty: '4' },
            { category: '交换机', qty: '2' }
          ]
        }
      ],
      approvalRecords: [
        { time: '2026-04-06 09:20', operator: '杨辉', action: '创建', remark: '提交设备领用申请，待审核。' }
      ]
    },
    {
      id: 'LY-202604-002',
      creator: '刘健',
      createTime: '2026-04-07 11:00',
      status: '待出库',
      projectNames: '南岸区医院消防设施更新工程',
      qtySummary: '1个项目 / 8台设备',
      remark: '病区通道视频监测设备安装领用。',
      projectCards: [
        {
          projectId: 'XM-2026-037',
          projectName: '南岸区医院消防设施更新工程',
          needs: [
            { category: '消防通道监测摄像机', qty: '6' },
            { category: '交换机', qty: '2' }
          ]
        }
      ],
      approvalRecords: [
        { time: '2026-04-07 11:00', operator: '刘健', action: '创建', remark: '提交设备领用申请。' },
        { time: '2026-04-07 12:10', operator: '李国华', action: '同意', remark: '同意按计划出库。' }
      ]
    },
    {
      id: 'LY-202604-003',
      creator: '郑林',
      createTime: '2026-04-08 15:10',
      status: '已出库',
      projectNames: '两江新区产业园消防运维项目',
      qtySummary: '1个项目 / 5台设备',
      remark: '园区运维备用件领用。',
      projectCards: [
        {
          projectId: 'XM-2026-031',
          projectName: '两江新区产业园消防运维项目',
          needs: [
            { category: '用户信息传输装置', qty: '2' },
            { category: '一体式压力传感器', qty: '3' }
          ]
        }
      ],
      approvalRecords: [
        { time: '2026-04-08 15:10', operator: '郑林', action: '创建', remark: '提交设备领用申请。' },
        { time: '2026-04-08 15:40', operator: '李国华', action: '同意', remark: '可直接安排仓库出库。' },
        { time: '2026-04-08 16:20', operator: '仓库管理员', action: '出库', remark: '已完成出库。' }
      ]
    }
  ],
  deviceReturnList: [
    { id: 'TH-202604-001', model: 'GST-LD-8301', returner: '郑林', projectName: '两江新区产业园消防运维项目', qty: '6', status: '待入库', createTime: '2026-04-07 16:20', remark: '拆除旧模块集中退回' },
    { id: 'TH-202604-002', model: 'TX3000-4G', returner: '杨辉', projectName: '江北区智慧消防设施改造项目', qty: '2', status: '已入库', createTime: '2026-04-08 10:15', remark: '备用件未安装退回主仓' }
  ],
  deviceRepairList: [
    { id: 'FX-202604-001', model: 'AI-CAM-TD600', applicant: '张瑶', projectName: '南岸区医院消防设施更新工程', qty: '3', status: '审批中', createTime: '2026-04-05 14:10', remark: '视频图像模糊、夜视异常' },
    { id: 'FX-202604-002', model: 'TX3000-4G', applicant: '郑林', projectName: '两江新区产业园消防运维项目', qty: '2', status: '已通过', createTime: '2026-04-06 09:50', remark: '4G模块离线频繁' }
  ],
  deviceScrapList: [
    { id: 'BF-202604-001', model: 'GST-LD-8301', applicant: '杨辉', projectName: '江北区智慧消防设施改造项目', qty: '4', status: '待提交', createTime: '2026-04-04 10:05', remark: '设备老化严重、无修复价值' },
    { id: 'BF-202604-002', model: 'JBF5111', applicant: '郑林', projectName: '两江新区产业园消防运维项目', qty: '2', status: '审批中', createTime: '2026-04-07 17:20', remark: '主板故障且停产' }
  ],
  inboundRecordList: [
    { id: 'RK-202604-001', sourceType: '采购入库', sourceId: 'CG-202604-001', model: 'TX3000-4G', qty: '18', warehouse: '主仓', operator: '仓库管理员', time: '2026-04-08 15:10' },
    { id: 'RK-202604-002', sourceType: '退回入库', sourceId: 'TH-202604-002', model: 'TX3000-4G', qty: '2', warehouse: '主仓', operator: '仓库管理员', time: '2026-04-08 16:30' }
  ],
  outboundRecordList: [
    { id: 'CK-202604-001', sourceType: '领用出库', sourceId: 'LY-202604-002', model: 'AI-CAM-TD600', qty: '8', warehouse: '主仓', operator: '仓库管理员', time: '2026-04-07 13:20' },
    { id: 'CK-202604-002', sourceType: '返修出库', sourceId: 'FX-202604-002', model: 'TX3000-4G', qty: '2', warehouse: '主仓', operator: '仓库管理员', time: '2026-04-08 09:10' }
  ],
  alarmRecordList: [
    {
      id: 'ALR-20260413-001',
      alarmType: '主机离线',
      deviceName: '消防主机 01',
      deviceCode: 'SB-001028',
      projectId: 'XM-2026-018',
      projectName: '江北区智慧消防设施改造项目',
      status: '处理中',
      workorderTransferred: '已转工单',
      workorderId: 'YW-202604-009',
      latestAlarmTime: '2026-04-13 09:42',
      detail: '主机 3 号回路连续离线，现场反馈伴随通讯波动。',
      handlingRecords: [
        { time: '2026-04-13 09:48', operator: '李国华', content: '收到告警后通知项目负责人核查现场主机通讯状态。' },
        { time: '2026-04-13 09:55', operator: '李国华', content: '已一键报修并创建运维工单 YW-202604-009，指派杨辉现场排查。' }
      ],
      logs: [
        { time: '2026-04-13 09:42', type: '主机离线', reason: '主机 3 号回路通讯中断。' },
        { time: '2026-04-13 09:31', type: '主机离线', reason: '主机与回路板连接状态异常。' },
        { time: '2026-04-13 09:18', type: '通讯故障', reason: '联网链路抖动导致设备心跳丢失。' }
      ]
    },
    {
      id: 'ALR-20260413-002',
      alarmType: '电压异常',
      deviceName: '电源监控模块',
      deviceCode: 'SB-001205',
      projectId: 'XM-2026-031',
      projectName: '两江新区产业园消防运维项目',
      status: '未处理',
      workorderTransferred: '未转工单',
      workorderId: '',
      latestAlarmTime: '2026-04-13 10:26',
      detail: '模块上送电压异常波动，存在误报与电源模块老化风险。',
      handlingRecords: [],
      logs: [
        { time: '2026-04-13 10:26', type: '电压异常', reason: '模块采样电压连续 3 次超过阈值。' },
        { time: '2026-04-13 10:11', type: '电压异常', reason: '备用电源切换瞬间波动过大。' },
        { time: '2026-04-13 09:58', type: '电源故障', reason: '电源输入端接线松动导致读数抖动。' }
      ]
    },
    {
      id: 'ALR-20260413-003',
      alarmType: '反馈中断',
      deviceName: '喷淋泵控制柜',
      deviceCode: 'SB-001318',
      projectId: 'XM-2026-027',
      projectName: '南岸区医院消防设施更新工程',
      status: '已处理',
      workorderTransferred: '未转工单',
      workorderId: '',
      latestAlarmTime: '2026-04-13 11:08',
      detail: '控制柜反馈信号中断，现场已完成端子复位并恢复。',
      handlingRecords: [
        { time: '2026-04-13 11:18', operator: '李国华', content: '已联系现场值守人员复位控制柜端子，信号恢复正常。' }
      ],
      logs: [
        { time: '2026-04-13 11:08', type: '反馈中断', reason: '控制柜反馈触点接触不良。' },
        { time: '2026-04-13 10:57', type: '反馈中断', reason: '端子排松动引起反馈丢失。' }
      ]
    }
  ],
  investorList: [
    { id: 'TZ-001', name: '重庆城投建设基金', type: '国企', contact: '李国华', phone: '13980001001', amount: '¥56,000,000', status: '正常', remark: '重点支持市属智慧消防改造项目。' },
    { id: 'TZ-002', name: '渝中更新专项资金', type: '国企', contact: '陈晓梅', phone: '13824510001', amount: '¥28,000,000', status: '正常', remark: '支持旧改片区消防联网建设。' },
    { id: 'TZ-003', name: '两江产业投资基金', type: '其他', contact: '王志峰', phone: '13611880009', amount: '¥18,500,000', status: '冻结', remark: '支持园区运维及设备更新。' }
  ],
  projectProfitList: [
    { id: 'LR-001', projectName: '江北区智慧消防设施改造项目', income: '8600000', cost: '7120000', grossProfit: '1480000', productionValue: '¥6,920,000', warning: '正常' },
    { id: 'LR-002', projectName: '渝中区旧改消防联网项目', income: '12400000', cost: '11160000', grossProfit: '1240000', productionValue: '¥3,180,000', warning: '超预算预警' },
    { id: 'LR-003', projectName: '两江新区产业园消防运维项目', income: '5350000', cost: '3920000', grossProfit: '1430000', productionValue: '¥2,860,000', warning: '正常' }
  ],
  receiptList: [
    { id: 'HK-202604-001', contractId: 'HT-2026-011', contractName: 'HT-2026-011', projectName: '江北区智慧消防设施改造项目', customerName: '重庆江北机场集团', payerName: '重庆江北机场集团', payerAccount: '5001012000890001123', amount: '¥1,860,000.00', date: '2026-04-03', method: '预付款', voucherImage: '回款凭证-001.jpg', operator: '财务专员', remark: '阶段回款一' },
    { id: 'HK-202604-002', contractId: 'HT-2026-016', contractName: 'HT-2026-016', projectName: '渝中区旧改消防联网项目', customerName: '渝中区城市更新中心', payerName: '渝中区城市更新中心', payerAccount: '5001039000123008876', amount: '¥920,000.00', date: '2026-04-06', method: '尾款', voucherImage: '', operator: '财务专员', remark: '首期预付款' }
  ],
  paymentList: [
    { id: 'FK-202604-001', projectName: '江北区智慧消防设施改造项目', supplierName: '重庆安消设备有限公司', receiverName: '重庆安消设备有限公司', receiverAccount: '5002382000990011256', paymentType: '订金', amount: '¥680,000', date: '2026-04-05', method: '银行转账', voucherImage: '付款凭证-001.jpg', remark: '主材采购付款' },
    { id: 'FK-202604-002', projectName: '两江新区产业园消防运维项目', supplierName: '渝北机电安装服务部', receiverName: '渝北机电安装服务部', receiverAccount: '', paymentType: '尾款', amount: '¥158,000', date: '2026-04-08', method: '银行转账', voucherImage: '', remark: '劳务预付款' }
  ],
  invoiceList: [
    { id: 'KP-202604-001', contractId: 'HT-2026-011', projectName: '江北区智慧消防设施改造项目', customerName: '重庆江北机场集团', amount: '¥2,120,000.00', date: '2026-04-04', type: '专票', operator: '财务专员', voucherImage: '开票凭证-001.jpg', remark: '阶段开票一' },
    { id: 'KP-202604-002', contractId: 'HT-2026-016', projectName: '渝中区旧改消防联网项目', customerName: '渝中区城市更新中心', amount: '¥1,360,000.00', date: '2026-04-07', type: '专票', operator: '财务专员', voucherImage: '', remark: '首批设备开票' }
  ],
  performanceList: [
    { id: 'JX-001', personType: '销售人员', name: '周洋', department: '营销一部', metric: '签约金额', amount: '¥13,500,000', period: '2026年1-4月', rank: '1' },
    { id: 'JX-002', personType: '销售人员', name: '刘芸', department: '营销二部', metric: '回款金额', amount: '¥6,800,000', period: '2026年1-4月', rank: '2' },
    { id: 'JX-003', personType: '工程人员', name: '郑林', department: '运维组', metric: '工单完成量', amount: '48 单', period: '2026年1-4月', rank: '1' },
    { id: 'JX-004', personType: '工程人员', name: '刘健', department: '勘察组', metric: '工勘完成量', amount: '36 单', period: '2026年1-4月', rank: '2' }
  ],
  contractOptions: {
    statuses: ['草稿', '审批中', '已通过', '已驳回', '已撤销'],
    employerContacts: [
      { name: '赵建国', phone: '13980001024' },
      { name: '陈晓梅', phone: '13824510001' },
      { name: '王志峰', phone: '13611880009' },
      { name: '李雪', phone: '13756781234' }
    ],
    contractorContacts: [
      { name: '李国华', phone: '13980001001' },
      { name: '彭超', phone: '13980001152' },
      { name: '周晨', phone: '13967002211' }
    ],
    defaultTaxRate: 9,
    pricingCatalog: [
      { productName: '用户信息传输装置', specs: [
        { model: 'TX3000-NT', unit: '台', taxPrice: 2850 },
        { model: 'TX3000-4G', unit: '台', taxPrice: 3180 }
      ]},
      { productName: '一体式压力传感器', specs: [
        { model: 'YL-20/1.6MPa', unit: '台', taxPrice: 980 },
        { model: 'YL-25/2.5MPa', unit: '台', taxPrice: 1120 }
      ]},
      { productName: '一体式液位传感器', specs: [
        { model: 'YW-5M', unit: '台', taxPrice: 1260 },
        { model: 'YW-10M', unit: '台', taxPrice: 1480 }
      ]},
      { productName: '离岗检测摄像机', specs: [
        { model: 'AI-CAM-LG200', unit: '台', taxPrice: 1680 },
        { model: 'AI-CAM-LG300', unit: '台', taxPrice: 1860 }
      ]},
      { productName: '消防通道监测摄像机', specs: [
        { model: 'AI-CAM-TD400', unit: '台', taxPrice: 1450 },
        { model: 'AI-CAM-TD600', unit: '台', taxPrice: 1720 }
      ]},
      { productName: '电气火灾报警器', specs: [
        { model: 'DQ-AR120', unit: '台', taxPrice: 1180 },
        { model: 'DQ-AR160', unit: '台', taxPrice: 1360 }
      ]},
      { productName: '交换机', specs: [
        { model: 'SW-8GE-POE', unit: '台', taxPrice: 1380 },
        { model: 'SW-16GE-POE', unit: '台', taxPrice: 2260 }
      ]},
      { productName: '网线', specs: [
        { model: 'CAT6 六类非屏蔽', unit: 'm', taxPrice: 3.8 },
        { model: 'CAT6A 六类屏蔽', unit: 'm', taxPrice: 5.6 }
      ]}
    ]
  },
  contractList: [
    {
      id: 'HT-2026-011',
      customerId: 'KH-2026-001',
      customerName: '重庆江北机场集团',
      projectId: 'XM-2026-018',
      projectName: '江北区智慧消防设施改造项目',
      status: '已通过',
      creator: '周洋',
      createTime: '2026-03-22 10:15',
      signDate: '2026-03-22',
      signPlace: '重庆市江北机场集团会议中心',
      employerRepName: '赵建国',
      employerRepPhone: '13980001024',
      contractorRepName: '彭超',
      contractorRepPhone: '13980001152',
      content: '完成江北机场货运区及航站楼消防主机、联动模块、广播系统升级及联网调试。',
      startDate: '2026-03-25',
      duration: '189',
      endDate: '2026-09-30',
      totalAmount: '8600000',
      taxExclusiveAmount: '7889908.26',
      taxAmount: '710091.74',
      taxRate: '9',
      prepayment: '2580000',
      attachmentName: '江北机场消防改造合同.pdf',
      pricingDetails: [
        { productName: '用户信息传输装置', specModel: 'TX3000-4G', qty: '36', unit: '台', taxPrice: '3180', taxAmount: '114480.00', remark: '航站楼及货运区联网接入' },
        { productName: '一体式压力传感器', specModel: 'YL-20/1.6MPa', qty: '82', unit: '台', taxPrice: '980', taxAmount: '80360.00', remark: '消防水系统压力监测' },
        { productName: '离岗检测摄像机', specModel: 'AI-CAM-LG300', qty: '18', unit: '台', taxPrice: '1860', taxAmount: '33480.00', remark: '消控室及值守岗亭' },
        { productName: '消防通道监测摄像机', specModel: 'AI-CAM-TD600', qty: '42', unit: '台', taxPrice: '1720', taxAmount: '72240.00', remark: '重点通道占用识别' },
        { productName: '网线', specModel: 'CAT6A 六类屏蔽', qty: '9600', unit: 'm', taxPrice: '5.6', taxAmount: '53760.00', remark: '主干链路布线' }
      ]
    },
    {
      id: 'HT-2026-016',
      customerId: 'KH-2026-002',
      customerName: '渝中区城市更新中心',
      projectId: 'XM-2026-023',
      projectName: '渝中区旧改消防联网项目',
      status: '审批中',
      creator: '刘芸',
      createTime: '2026-04-02 14:20',
      signDate: '2026-04-02',
      signPlace: '渝中区城市更新中心会议室',
      employerRepName: '陈晓梅',
      employerRepPhone: '13824510001',
      contractorRepName: '李国华',
      contractorRepPhone: '13980001001',
      content: '完成旧改片区消防联网平台建设、网关部署及数据接入服务。',
      startDate: '2026-04-10',
      duration: '255',
      endDate: '2026-12-20',
      totalAmount: '12400000',
      taxExclusiveAmount: '11376146.79',
      taxAmount: '1023853.21',
      taxRate: '9',
      prepayment: '3720000',
      attachmentName: '渝中旧改消防联网合同.docx',
      pricingDetails: [
        { productName: '用户信息传输装置', specModel: 'TX3000-NT', qty: '48', unit: '台', taxPrice: '2850', taxAmount: '136800.00', remark: '旧改楼栋分点位接入' },
        { productName: '一体式液位传感器', specModel: 'YW-10M', qty: '24', unit: '台', taxPrice: '1480', taxAmount: '35520.00', remark: '高位水箱监测' },
        { productName: '电气火灾报警器', specModel: 'DQ-AR160', qty: '66', unit: '台', taxPrice: '1360', taxAmount: '89760.00', remark: '配电回路监测' },
        { productName: '交换机', specModel: 'SW-16GE-POE', qty: '15', unit: '台', taxPrice: '2260', taxAmount: '33900.00', remark: '楼栋弱电汇聚' },
        { productName: '网线', specModel: 'CAT6 六类非屏蔽', qty: '16800', unit: 'm', taxPrice: '3.8', taxAmount: '63840.00', remark: '综合布线施工' }
      ]
    },
    {
      id: 'HT-2026-019',
      customerId: 'KH-2026-003',
      customerName: '两江新区产业投资集团',
      projectId: 'XM-2026-031',
      projectName: '两江新区产业园消防运维项目',
      status: '草稿',
      creator: '何成',
      createTime: '2026-04-06 16:40',
      signDate: '2026-04-06',
      signPlace: '两江新区产业投资集团',
      employerRepName: '王志峰',
      employerRepPhone: '13611880009',
      contractorRepName: '周晨',
      contractorRepPhone: '13967002211',
      content: '提供园区消防系统巡检、故障抢修、联网监测和季度维保服务。',
      startDate: '2026-05-01',
      duration: '365',
      endDate: '2027-04-30',
      totalAmount: '5350000',
      taxExclusiveAmount: '4908256.88',
      taxAmount: '441743.12',
      taxRate: '9',
      prepayment: '1605000',
      attachmentName: '两江新区产业园运维合同.pdf',
      pricingDetails: [
        { productName: '一体式压力传感器', specModel: 'YL-25/2.5MPa', qty: '30', unit: '台', taxPrice: '1120', taxAmount: '33600.00', remark: '泵房压力采集' },
        { productName: '离岗检测摄像机', specModel: 'AI-CAM-LG200', qty: '10', unit: '台', taxPrice: '1680', taxAmount: '16800.00', remark: '值班岗亭监管' },
        { productName: '消防通道监测摄像机', specModel: 'AI-CAM-TD400', qty: '20', unit: '台', taxPrice: '1450', taxAmount: '29000.00', remark: '园区主通道占用识别' },
        { productName: '交换机', specModel: 'SW-8GE-POE', qty: '8', unit: '台', taxPrice: '1380', taxAmount: '11040.00', remark: '网络接入更新' },
        { productName: '网线', specModel: 'CAT6 六类非屏蔽', qty: '5200', unit: 'm', taxPrice: '3.8', taxAmount: '19760.00', remark: '年度整改布线' }
      ]
    }
  ],
  tables: {
    customerArchive: { columns: ['客户名称', '客户类型', '所属区域', '联系人', '联系电话', '跟进状态', '最近跟进时间'], rows: [
      ['重庆江北机场集团', '国企客户', '江北区', '赵建国', '139****1024', '重点跟进', '2026-04-07 16:30'],
      ['渝中区城市更新中心', '政府单位', '渝中区', '陈晓梅', '138****2451', '方案汇报中', '2026-04-06 10:20'],
      ['两江新区产业投资集团', '平台公司', '两江新区', '王志峰', '136****1188', '已签约', '2026-04-05 14:10'],
      ['南岸区医院建设管理中心', '事业单位', '南岸区', '李雪', '137****5678', '待回访', '2026-04-03 11:40']
    ]},
    customerFollow: { columns: ['客户名称', '跟进主题', '跟进方式', '跟进人', '下次计划', '结果状态'], rows: [
      ['重庆江北机场集团', '消防弱电改造方案复核', '现场拜访', '周洋', '2026-04-10', '已形成纪要'],
      ['渝中区城市更新中心', '项目预算沟通', '电话沟通', '刘芸', '2026-04-09', '待领导批示'],
      ['南岸区医院建设管理中心', '维保续签洽谈', '视频会议', '何成', '2026-04-12', '继续跟进']
    ]},
    projectArchive: { columns: ['项目编号', '项目名称', '建设单位', '项目类型', '项目经理', '合同金额', '进度状态', '风险等级'], rows: [
      ['XM-2026-018', '江北区智慧消防设施改造项目', '重庆江北机场集团', '改造提升', '彭超', '¥8,600,000', '施工中', '中'],
      ['XM-2026-023', '渝中区旧改消防联网项目', '渝中区城市更新中心', '联网建设', '杨辉', '¥12,400,000', '待开工', '低'],
      ['XM-2026-031', '两江新区产业园消防运维项目', '两江新区产业投资集团', '维保运维', '周晨', '¥5,350,000', '运维中', '低'],
      ['XM-2026-037', '南岸区医院消防设施更新工程', '南岸区医院建设管理中心', '设备更新', '张瑶', '¥9,200,000', '验收准备', '中']
    ]},
    projectCost: { columns: ['项目名称', '目标成本', '动态成本', '材料成本', '人工成本', '毛利率', '预警状态'], rows: [
      ['江北区智慧消防设施改造项目', '¥7,350,000', '¥7,120,000', '¥4,980,000', '¥1,450,000', '17.2%', '正常'],
      ['渝中区旧改消防联网项目', '¥10,800,000', '¥11,160,000', '¥8,120,000', '¥1,980,000', '10.0%', '超预算预警'],
      ['两江新区产业园消防运维项目', '¥4,080,000', '¥3,920,000', '¥2,410,000', '¥980,000', '26.7%', '正常']
    ]},
    workorder: { columns: ['工单编号', '所属项目', '工单类型', '负责人', '计划完成', '当前状态', '优先级'], rows: [
      ['GD-20260408-001', '江北区智慧消防设施改造项目', '施工工单', '杨辉', '2026-04-12', '处理中', '高'],
      ['GD-20260408-002', '两江新区产业园消防运维项目', '运维工单', '郑林', '2026-04-09', '待受理', '中'],
      ['GD-20260408-003', '南岸区医院消防设施更新工程', '工勘工单', '刘健', '2026-04-11', '待派工', '中']
    ]},
    salesperson: { columns: ['姓名', '所属团队', '负责区域', '在跟客户数', '签约金额', '回款完成率', '状态'], rows: [
      ['周洋', '一部', '江北区', '18', '¥13,500,000', '81%', '在岗'],
      ['刘芸', '二部', '渝中区', '14', '¥9,800,000', '74%', '在岗'],
      ['何成', '三部', '南岸区', '11', '¥7,400,000', '68%', '外出拜访']
    ]},
    contract: { columns: ['合同编号', '合同名称', '签约对象', '合同金额', '签订日期', '履约状态', '审批状态'], rows: [
      ['HT-2026-011', '江北机场消防改造施工合同', '重庆江北机场集团', '¥8,600,000', '2026-03-22', '履约中', '已通过'],
      ['HT-2026-016', '渝中旧改消防联网采购合同', '渝中区城市更新中心', '¥4,230,000', '2026-04-02', '待生效', '审批中'],
      ['HT-2026-019', '两江新区产业园运维服务合同', '两江新区产业投资集团', '¥5,350,000', '2026-04-06', '履约中', '已通过']
    ]},
    engineering: { columns: ['姓名', '岗位', '技能等级', '所属小组', '在场项目', '近30天工时', '状态'], rows: [
      ['彭超', '项目经理', '高级', '项目一组', '2', '186h', '在岗'],
      ['杨辉', '施工主管', '高级', '项目二组', '1', '174h', '驻场'],
      ['刘健', '勘察工程师', '中级', '勘察组', '3', '162h', '在岗'],
      ['郑林', '运维工程师', '中级', '运维组', '4', '198h', '待派工']
    ]},
    vehicleLog: { columns: ['车牌号', '用车人', '事由', '出车时间', '返回时间', '里程', '审批状态'], rows: [
      ['渝A·D1208', '杨辉', '江北项目巡检', '2026-04-08 08:10', '2026-04-08 18:20', '86km', '已审批'],
      ['渝A·F5621', '刘健', '南岸现场勘查', '2026-04-08 09:00', '2026-04-08 15:40', '54km', '已审批'],
      ['渝A·H2709', '郑林', '运维备件配送', '2026-04-08 13:10', '-', '-', '待审批']
    ]},
    supplier: { columns: ['供应商名称', '类别', '联系人', '联系电话', '地址', '状态'], rows: [
      ['重庆安消设备有限公司', '消防主材', '黄波', '139****0021', '渝北区回兴工业园 8 号', '启用'],
      ['西南智联弱电科技', '弱电系统', '唐晓', '138****0019', '九龙坡区石桥铺科园路 16 号', '启用'],
      ['渝北机电安装服务部', '安装劳务', '朱平', '136****0026', '渝北区双凤桥街道 66 号', '禁用']
    ]},
    purchaseOrder: { columns: ['采购单号', '供应商', '采购类型', '计划金额', '申请人', '到货状态', '审批状态'], rows: [
      ['CG-202604-001', '重庆安消设备有限公司', '设备采购', '¥680,000', '杨辉', '部分到货', '已通过'],
      ['CG-202604-004', '西南智联弱电科技', '辅材采购', '¥245,000', '刘健', '待到货', '审批中'],
      ['CG-202604-008', '渝北机电安装服务部', '劳务采购', '¥158,000', '郑林', '待排产', '待提交']
    ]},
    inventory: { columns: ['物资编码', '设备名称', '型号规格', '仓库', '当前库存', '安全库存', '库存状态', '资产属性'], rows: [
      ['SB-001028', '点型感烟火灾探测器', 'JTY-GD-3100', '主仓', '1260', '600', '充足', '设备'],
      ['SB-001246', '消防应急广播模块', 'YJG-MK-22', '江北项目仓', '184', '120', '正常', '设备'],
      ['SB-001352', '室内消火栓箱', 'SN65', '南岸项目仓', '28', '32', '低库存', '材料']
    ]},
    alarm: { columns: ['告警编号', '告警设备', '所属项目', '告警级别', '触发时间', '处置状态', '责任人'], rows: [
      ['AL-20260408-01', '消防主机 01', '江北区智慧消防设施改造项目', '一级', '2026-04-08 08:45', '处理中', '郑林'],
      ['AL-20260408-03', '电源监控模块', '两江新区产业园消防运维项目', '二级', '2026-04-08 10:20', '待确认', '周晨'],
      ['AL-20260408-05', '喷淋泵控制柜', '南岸区医院消防设施更新工程', '一级', '2026-04-08 11:15', '已上报', '彭超']
    ]},
    finance: { columns: ['项目名称', '投资方', '累计产值', '累计回款', '累计付款', '毛利额', '回款状态'], rows: [
      ['江北区智慧消防设施改造项目', '重庆城投建设基金', '¥6,920,000', '¥5,180,000', '¥4,250,000', '¥930,000', '正常'],
      ['渝中区旧改消防联网项目', '渝中更新专项资金', '¥3,180,000', '¥1,420,000', '¥2,160,000', '¥510,000', '回款预警'],
      ['两江新区产业园消防运维项目', '两江产业投资基金', '¥2,860,000', '¥2,220,000', '¥1,760,000', '¥460,000', '正常']
    ]},
    systemUser: { columns: ['姓名', '所属部门', '角色', '手机号码', '最近登录', '账号状态'], rows: [
      ['李国华', '总经办', '系统管理员', '139****1001', '2026-04-08 09:28', '启用'],
      ['周洋', '营销中心', '销售经理', '139****1038', '2026-04-08 08:57', '启用'],
      ['彭超', '工程中心', '项目经理', '139****1152', '2026-04-08 08:34', '启用'],
      ['郑林', '运维中心', '运维工程师', '139****1277', '2026-04-08 07:58', '启用']
    ]}
  },
  timelines: {
    dashboard: [
      { time: '09:10', title: '渝中区旧改项目采购申请提交', tag: '采购流程' },
      { time: '10:25', title: '江北项目一级告警自动推送运维群', tag: '告警联动' },
      { time: '13:40', title: '南岸医院项目验收资料完成归档', tag: '项目归档' },
      { time: '15:20', title: '两江产业园运维服务合同回款登记', tag: '财务事件' }
    ],
    approval: [
      { title: '采购单 CG-202604-004', desc: '西南智联弱电科技辅材采购审批', amount: '¥245,000', status: '待你审批' },
      { title: '设备报废申请 SB-BF-012', desc: '两江新区项目故障控制模块报废', amount: '8 台', status: '待复核' },
      { title: '车辆使用申请 CL-20260408-03', desc: '运维备件配送用车审批', amount: '渝A·H2709', status: '待审批' }
    ]
  }
};
