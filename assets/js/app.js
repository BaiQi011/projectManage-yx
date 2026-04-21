(function () {
  var data = window.DEMO_DATA;
  var root = document.getElementById('app');

  var routeMeta = {
    '/pc/dashboard': { title: '业务看板', module: '业务看板', table: null },
    '/pc/customer/archive': { title: '客户档案', module: '客户管理', table: 'customerArchive' },
    '/pc/customer/follow': { title: '跟进记录', module: '客户管理', table: 'customerFollow' },
    '/pc/project/archive': { title: '项目档案', module: '项目管理', table: 'projectArchive' },
    '/pc/project/detail': { title: '项目详情', module: '项目管理', table: null },
    '/pc/project/cost': { title: '项目报价', module: '项目管理', table: 'projectCost' },
    '/pc/project/workorder-detail': { title: '工单详情', module: '项目管理', table: null },
    '/pc/project/survey-workorder': { title: '工勘工单', module: '项目管理', table: 'workorder' },
    '/pc/project/construction-workorder': { title: '施工工单', module: '项目管理', table: 'workorder' },
    '/pc/project/maintenance-workorder': { title: '运维工单', module: '项目管理', table: 'workorder' },
    '/pc/marketing/salesperson': { title: '销售人员', module: '营销管理', table: 'salesperson' },
    '/pc/marketing/salesteam': { title: '销售团队', module: '营销管理', table: 'salesperson' },
    '/pc/contract/list': { title: '合同管理', module: '合同管理', table: 'contract' },
    '/pc/engineering/engineer': { title: '工程人员', module: '工程管理', table: 'engineering' },
    '/pc/engineering/team': { title: '工程小组', module: '工程管理', table: 'engineering' },
    '/pc/engineering/vehicle-log': { title: '车辆使用记录', module: '工程管理', table: 'vehicleLog' },
    '/pc/purchase/supplier': { title: '供应商管理', module: '采购管理', table: 'supplier' },
    '/pc/purchase/order': { title: '采购单', module: '采购管理', table: 'purchaseOrder' },
    '/pc/purchase/score': { title: '供应商评分', module: '采购管理', table: 'supplier' },
    '/pc/asset/model': { title: '型号管理', module: '设备资产管理', table: 'inventory' },
    '/pc/asset/device': { title: '设备档案', module: '设备资产管理', table: 'inventory' },
    '/pc/asset/inventory': { title: '设备库存', module: '设备资产管理', table: 'inventory' },
    '/pc/asset/receive': { title: '设备领用', module: '设备资产管理', table: 'inventory' },
    '/pc/asset/return': { title: '设备退回', module: '设备资产管理', table: 'inventory' },
    '/pc/asset/repair': { title: '设备返修', module: '设备资产管理', table: 'inventory' },
    '/pc/asset/scrap': { title: '设备报废', module: '设备资产管理', table: 'inventory' },
    '/pc/asset/inbound': { title: '入库记录', module: '设备资产管理', table: 'inventory' },
    '/pc/asset/outbound': { title: '出库记录', module: '设备资产管理', table: 'inventory' },
    '/pc/asset/alarm': { title: '告警记录', module: '设备资产管理', table: 'alarm' },
    '/pc/finance/investor': { title: '投资方', module: '财务管理', table: 'finance' },
    '/pc/finance/profit': { title: '项目毛利', module: '财务管理', table: 'finance' },
    '/pc/finance/receipt': { title: '回款记录', module: '财务管理', table: 'finance' },
    '/pc/finance/payment': { title: '付款记录', module: '财务管理', table: 'finance' },
    '/pc/finance/invoice': { title: '开票记录', module: '财务管理', table: 'finance' },
    '/pc/finance/performance': { title: '人员业绩', module: '财务管理', table: 'finance' },
    '/pc/system/user': { title: '用户管理', module: '系统管理', table: 'systemUser' },
    '/pc/system/department': { title: '部门管理', module: '系统管理', table: 'systemUser' },
    '/pc/system/dictionary': { title: '字典管理', module: '系统管理', table: 'systemUser' },
    '/app/home': { title: '首页', module: 'APP', table: null },
    '/app/project-cost': { title: '项目报价', module: 'APP', table: null },
    '/app/project-cost/detail': { title: '报价详情', module: 'APP', table: null },
    '/app/purchase-order': { title: '采购单', module: 'APP', table: null },
    '/app/purchase-order/detail': { title: '采购详情', module: 'APP', table: null },
    '/app/device-receive': { title: '设备领用', module: 'APP', table: null },
    '/app/device-receive/detail': { title: '领用详情', module: 'APP', table: null },
    '/app/device-return': { title: '设备退回', module: 'APP', table: null },
    '/app/device-return/detail': { title: '退回详情', module: 'APP', table: null },
    '/app/survey-workorder': { title: '工勘工单', module: 'APP', table: null },
    '/app/survey-workorder/detail': { title: '工勘详情', module: 'APP', table: null },
    '/app/construction-workorder': { title: '施工工单', module: 'APP', table: null },
    '/app/construction-workorder/detail': { title: '施工详情', module: 'APP', table: null },
    '/app/maintenance-workorder': { title: '运维工单', module: 'APP', table: null },
    '/app/maintenance-workorder/detail': { title: '运维详情', module: 'APP', table: null },
    '/app/message': { title: '消息', module: 'APP', table: null },
    '/app/approval': { title: '审批', module: 'APP', table: null },
    '/app/profile': { title: '个人中心', module: 'APP', table: null }
  };

  var navRelation = {
    dashboard: ['/pc/project/archive', '/pc/asset/alarm', '/app/home'],
    project: ['/pc/project/archive', '/pc/project/cost', '/pc/contract/list', '/pc/finance/profit'],
    asset: ['/pc/asset/device', '/pc/asset/inventory', '/pc/asset/alarm', '/app/message'],
    approval: ['/app/approval', '/pc/purchase/order', '/pc/contract/list']
  };
  var appState = {
    ui: {
      pendingCustomerViewId: null,
      currentProjectDetailId: null,
      currentProjectDetailTab: 'basic',
      currentWorkorderDetail: null,
      appCostFilters: { keyword: '', status: '' },
      appPurchaseFilters: { keyword: '', status: '', inboundStatus: '' },
      appDeviceReceiveFilters: { keyword: '', status: '' },
      appDeviceReturnFilters: { keyword: '', status: '' },
      appDeviceReturnPickerFilters: { keyword: '', category: '', brand: '', model: '' },
      appSurveyFilters: { keyword: '', status: '' },
      appConstructionFilters: { keyword: '', status: '' },
      currentAppCostDetailId: null,
      currentAppCostDetailMode: 'view',
      appCostMoreOpen: false,
      currentAppPurchaseDetailId: null,
      currentAppPurchaseDetailMode: 'view',
      currentAppPurchaseDraft: null,
      appPurchaseMoreOpen: false,
      currentAppDeviceReceiveDetailId: null,
      currentAppDeviceReceiveDetailMode: 'view',
      currentAppDeviceReceiveDraft: null,
      currentAppDeviceReceivePicker: null,
      appDeviceReceiveMoreOpen: false,
      currentAppDeviceReturnDetailId: null,
      currentAppDeviceReturnDetailMode: 'view',
      currentAppDeviceReturnDraft: null,
      currentAppDeviceReturnPickerOpen: false,
      appDeviceReturnMoreOpen: false,
      appApprovalView: 'pending',
      currentAppSurveyDetailId: null,
      currentAppSurveyDetailMode: 'view',
      currentAppSurveyDraft: null,
      appSurveyMoreOpen: false,
      currentAppConstructionDetailId: null,
      currentAppConstructionDetailMode: 'view',
      currentAppConstructionDraft: null,
      appConstructionMoreOpen: false,
      appMaintenanceFilters: { keyword: '', status: '' },
      currentAppMaintenanceDetailId: null,
      currentAppMaintenanceDetailMode: 'view',
      currentAppMaintenanceDraft: null,
      appMaintenanceMoreOpen: false,
      dashboardAnalysis: {
        periodEnd: currentPeriodMonth()
      }
    },
    customerArchive: {
      list: (data.customerArchiveList || []).map(function (item) { return Object.assign({}, item); }),
      filters: { name: '', creditCode: '', scale: '', tag: '', salesperson: '' },
      modal: null,
      nextId: (data.customerArchiveList || []).length + 1
    },
    customerFollow: {
      list: (data.customerFollowList || []).map(function (item) { return Object.assign({}, item); }),
      filters: { customerName: '', follower: '', dateStart: '', dateEnd: '', method: '' },
      modal: null,
      nextId: (data.customerFollowList || []).length + 1
    },
    projectArchive: {
      tree: JSON.parse(JSON.stringify(data.projectArchiveTree || [])),
      filters: { name: '', code: '', customerName: '', status: '', manager: '' },
      modal: null,
      viewMode: 'tree',
      expanded: {},
      nextId: 38
    },
    projectCost: {
      list: (data.projectCostList || []).map(function (item) { return Object.assign({}, item, { details: (item.details || []).map(function (detail) { return Object.assign({}, detail); }) }); }),
      filters: { id: '', projectName: '', customerName: '', status: '', dateStart: '', dateEnd: '' },
      modal: null,
      nextId: (data.projectCostList || []).length + 1
    },
    surveyWorkorder: {
      list: (data.surveyWorkorderList || []).map(function (item) { return Object.assign({}, item, { logs: (item.logs || []).map(function (log) { return Object.assign({}, log); }) }); }),
      filters: { id: '', projectId: '', surveyor: '', planDate: '' },
      modal: null,
      nextId: (data.surveyWorkorderList || []).length + 1
    },
    constructionWorkorder: {
      list: (data.constructionWorkorderList || []).map(function (item) { return Object.assign({}, item, { logs: (item.logs || []).map(function (log) { return Object.assign({}, log); }) }); }),
      filters: { id: '', projectId: '', worker: '', planDate: '' },
      modal: null,
      nextId: (data.constructionWorkorderList || []).length + 1
    },
    maintenanceWorkorder: {
      list: (data.maintenanceWorkorderList || []).map(function (item) { return Object.assign({}, item, { logs: (item.logs || []).map(function (log) { return Object.assign({}, log); }) }); }),
      filters: { id: '', projectId: '', worker: '', planDate: '' },
      modal: null,
      nextId: (data.maintenanceWorkorderList || []).length + 1
    },
    salesperson: {
      list: (data.salespersonList || []).map(function (item) { return Object.assign({}, item); }),
      filters: { name: '', phone: '', team: '', status: '' },
      modal: null,
      nextId: (data.salespersonList || []).length + 1
    },
    salesTeam: {
      list: (data.salesTeamList || []).map(function (item) { return Object.assign({}, item, { memberIds: (item.memberIds || []).slice() }); }),
      filters: { name: '', ownerName: '', status: '' },
      modal: null,
      nextId: (data.salesTeamList || []).length + 1
    },
    engineer: {
      list: (data.engineerList || []).map(function (item) { return Object.assign({}, item); }),
      filters: { name: '', phone: '', team: '', status: '' },
      modal: null,
      nextId: (data.engineerList || []).length + 1
    },
    engineerTeam: {
      list: (data.engineerTeamList || []).map(function (item) { return Object.assign({}, item, { memberIds: (item.memberIds || []).slice() }); }),
      filters: { name: '', ownerName: '', status: '' },
      modal: null,
      nextId: (data.engineerTeamList || []).length + 1
    },
    vehicleLog: {
      list: (data.vehicleLogList || []).map(function (item) { return Object.assign({}, item); }),
      filters: { plate: '', user: '' },
      modal: null,
      nextId: (data.vehicleLogList || []).length + 1
    },
    managedModules: {
      supplier: { list: (data.supplierList || []).map(function (item) { return Object.assign({}, item); }), filters: { name: '', category: '', status: '' }, modal: null, nextId: (data.supplierList || []).length + 1 },
      purchaseOrder: { list: (data.purchaseOrderList || []).map(function (item) { return Object.assign({}, item, { details: (item.details || []).map(function (detail) { return Object.assign({}, detail); }), approvalRecords: (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); }) }); }), filters: { id: '', supplierName: '', status: '', inboundStatus: '', dateStart: '', dateEnd: '' }, modal: null, nextId: (data.purchaseOrderList || []).length + 1 },
      supplierScore: { list: (data.supplierScoreList || []).map(function (item) { return Object.assign({}, item); }), filters: { supplierName: '', assessor: '' }, modal: null, nextId: (data.supplierScoreList || []).length + 1 },
      model: { list: (data.modelList || []).map(function (item) { return Object.assign({}, item); }), filters: { brandKeyword: '', modelKeyword: '' }, modal: null, brandModal: null, selectedBrandId: '', brandList: [], nextId: (data.modelList || []).length + 1, nextBrandId: 1 },
      deviceArchive: { list: (data.deviceArchiveList || []).map(function (item) { return Object.assign({}, item); }), filters: { name: '', code: '', brand: '', model: '', category: '', status: '' }, modal: null, nextId: (data.deviceArchiveList || []).length + 1 },
      inventory: { list: (data.inventoryList || []).map(function (item) { return Object.assign({}, item); }), filters: { brand: '', model: '', category: '', stockStatus: '' }, modal: null, stockFilters: { code: '', category: '', brand: '' }, nextId: (data.inventoryList || []).length + 1 },
      deviceReceive: { list: (data.deviceReceiveList || []).map(function (item) { return Object.assign({}, item, { projectCards: (item.projectCards || []).map(function (card) { return Object.assign({}, card, { needs: (card.needs || []).map(function (need) { return createDeviceReceiveNeed(need); }) }); }), approvalRecords: (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); }) }); }), filters: { id: '', creator: '', createTime: '', status: '', dateStart: '', dateEnd: '' }, modal: null, pickerModal: null, nextId: (data.deviceReceiveList || []).length + 1 },
      deviceReturn: { list: (data.deviceReturnList || []).map(function (item) { return Object.assign({}, item, { selectedDevices: (item.selectedDevices || []).map(function (device) { return Object.assign({}, device); }), approvalRecords: (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); }) }); }), filters: { id: '', creator: '', createTime: '', status: '', dateStart: '', dateEnd: '' }, modal: null, pickerModal: null, nextId: (data.deviceReturnList || []).length + 1 },
      deviceRepair: { list: (data.deviceRepairList || []).map(function (item) { return Object.assign({}, item, { selectedDevices: (item.selectedDevices || []).map(function (device) { return Object.assign({}, device); }), approvalRecords: (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); }) }); }), filters: { id: '', creator: '', createTime: '', status: '', dateStart: '', dateEnd: '' }, modal: null, pickerModal: null, nextId: (data.deviceRepairList || []).length + 1 },
      deviceScrap: { list: (data.deviceScrapList || []).map(function (item) { return Object.assign({}, item, { selectedDevices: (item.selectedDevices || []).map(function (device) { return Object.assign({}, device); }), approvalRecords: (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); }) }); }), filters: { id: '', creator: '', createTime: '', status: '', dateStart: '', dateEnd: '' }, modal: null, pickerModal: null, nextId: (data.deviceScrapList || []).length + 1 },
      inboundRecord: { list: (data.inboundRecordList || []).map(function (item) { return Object.assign({}, item); }), filters: { deviceCode: '', deviceName: '', model: '', category: '', brand: '', dateStart: '', dateEnd: '', inboundType: '' }, modal: null, nextId: (data.inboundRecordList || []).length + 1 },
      outboundRecord: { list: (data.outboundRecordList || []).map(function (item) { return Object.assign({}, item); }), filters: { deviceCode: '', deviceName: '', model: '', category: '', brand: '', dateStart: '', dateEnd: '', outboundType: '' }, modal: null, nextId: (data.outboundRecordList || []).length + 1 },
      alarmRecord: { list: (data.alarmRecordList || []).map(function (item) { return Object.assign({}, item, { logs: (item.logs || []).map(function (log) { return Object.assign({}, log); }), handlingRecords: (item.handlingRecords || []).map(function (record) { return Object.assign({}, record); }) }); }), filters: { deviceName: '', deviceCode: '', projectName: '', status: '' }, modal: null, nextId: (data.alarmRecordList || []).length + 1 },
      investor: { list: (data.investorList || []).map(function (item) { return Object.assign({}, item); }), filters: { name: '', status: '' }, modal: null, nextId: (data.investorList || []).length + 1 },
      projectProfit: { list: (data.projectProfitList || []).map(function (item) { return Object.assign({}, item); }), filters: { projectName: '', projectCode: '', customerName: '', status: '' }, modal: null, nextId: (data.projectProfitList || []).length + 1 },
      receipt: { list: (data.receiptList || []).map(function (item) { return Object.assign({}, item); }), filters: { id: '', projectName: '', date: '' }, modal: null, nextId: (data.receiptList || []).length + 1 },
      payment: { list: (data.paymentList || []).map(function (item) { return Object.assign({}, item); }), filters: { id: '', projectName: '', date: '' }, modal: null, nextId: (data.paymentList || []).length + 1 },
      invoice: { list: (data.invoiceList || []).map(function (item) { return Object.assign({}, item); }), filters: { id: '', projectName: '', date: '' }, modal: null, nextId: (data.invoiceList || []).length + 1 },
      performance: {
        list: (data.performanceList || []).map(function (item) { return Object.assign({}, item); }),
        activeTab: 'sales',
        salesFilters: { name: '', phone: '', team: '', period: currentPeriodMonth() },
        engineerFilters: { name: '', phone: '', team: '', period: currentPeriodMonth() },
        modal: null,
        nextId: (data.performanceList || []).length + 1
      }
    },
    contract: {
      list: (data.contractList || []).map(function (item) { return Object.assign({}, item); }),
      filters: { id: '', customerId: '', projectId: '', status: '' },
      modal: null,
      nextId: (data.contractList || []).length + 1
    },
    deviceArchive: {
      route: '/pc/asset/device',
      eyebrow: '设备资产管理',
      title: '设备档案',
      intro: '统一维护设备台账、所属项目与状态信息，并展示设备各状态数量统计。',
      createLabel: '新增设备',
      idPrefix: 'SB-',
      filters: [
        { key: 'code', label: '设备编码', type: 'text', placeholder: '请输入设备编码' },
        { key: 'model', label: '型号', type: 'text', placeholder: '请输入设备型号' },
        { key: 'status', label: '状态', type: 'select', options: function () { return data.deviceArchiveOptions.statuses; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'code', label: '设备编码', link: true },
        { key: 'name', label: '设备名称' },
        { key: 'model', label: '型号' },
        { key: 'projectName', label: '所属项目' },
        { key: 'status', label: '状态', badge: true },
        { key: 'warehouse', label: '所属仓库' }
      ],
      form: [
        { key: 'code', label: '设备编码', type: 'text', required: true, placeholder: '请输入设备编码' },
        { key: 'name', label: '设备名称', type: 'text', required: true, placeholder: '请输入设备名称' },
        { key: 'model', label: '型号', type: 'select', required: true, options: function () { return (data.modelList || []).map(function (item) { return item.model; }); }, placeholder: '请选择型号' },
        { key: 'projectName', label: '所属项目', type: 'select', options: function () { return getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return item.name; }); }, placeholder: '请选择所属项目' },
        { key: 'status', label: '状态', type: 'select', options: function () { return data.deviceArchiveOptions.statuses; }, placeholder: '请选择状态' },
        { key: 'warehouse', label: '所属仓库', type: 'text', placeholder: '请输入所属仓库' },
        { key: 'owner', label: '责任人', type: 'text', placeholder: '请输入责任人' },
        { key: 'installDate', label: '安装日期', type: 'date', placeholder: '' }
      ],
      actions: ['view', 'edit']
    },
    inventory: {
      route: '/pc/asset/inventory',
      eyebrow: '设备资产管理',
      title: '设备库存',
      intro: '按设备型号展示闲置库存、安全库存及仓库分布，支持查看各型号库存清单。',
      createLabel: '',
      idPrefix: 'KC-',
      filters: [
        { key: 'name', label: '设备名称', type: 'text', placeholder: '请输入设备名称' },
        { key: 'warehouse', label: '仓库', type: 'text', placeholder: '请输入仓库' },
        { key: 'status', label: '库存状态', type: 'select', options: function () { return ['充足', '正常', '低库存']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'name', label: '设备名称', link: true },
        { key: 'model', label: '型号规格' },
        { key: 'warehouse', label: '仓库' },
        { key: 'idleQty', label: '闲置数量' },
        { key: 'safeQty', label: '安全库存' },
        { key: 'status', label: '库存状态', badge: true }
      ],
      form: [
        { key: 'name', label: '设备名称', type: 'text', required: true, placeholder: '请输入设备名称' },
        { key: 'model', label: '型号规格', type: 'text', required: true, placeholder: '请输入型号规格' },
        { key: 'warehouse', label: '仓库', type: 'text', required: true, placeholder: '请输入仓库' },
        { key: 'idleQty', label: '闲置数量', type: 'number', required: true, placeholder: '请输入数量' },
        { key: 'safeQty', label: '安全库存', type: 'number', required: true, placeholder: '请输入安全库存' },
        { key: 'status', label: '库存状态', type: 'select', options: function () { return ['充足', '正常', '低库存']; }, placeholder: '请选择库存状态' }
      ],
      actions: ['view']
    },
    deviceReceive: {
      route: '/pc/asset/receive',
      eyebrow: '设备资产管理',
      title: '设备领用',
      intro: '统一维护设备领用单、审批与出库流转，支持多项目设备领用场景。',
      createLabel: '新增领用单',
      idPrefix: 'LY-202604-',
      filters: [
        { key: 'id', label: '单据编号', type: 'text', placeholder: '请输入单据编号' },
        { key: 'creator', label: '创建人', type: 'text', placeholder: '请输入创建人' },
        { key: 'createTime', label: '创建时间', type: 'date', placeholder: '' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待审核', '待出库', '已出库', '已撤销']; }, placeholder: '全部状态' },
        { key: 'dateStart', label: '开始时间', type: 'date', placeholder: '' },
        { key: 'dateEnd', label: '结束时间', type: 'date', placeholder: '' }
      ],
      columns: [
        { key: 'id', label: '单据编号', link: true },
        { key: 'creator', label: '创建人' },
        { key: 'createTime', label: '创建时间' },
        { key: 'projectNames', label: '所属项目' },
        { key: 'qtySummary', label: '领用设备数量状态' },
        { key: 'status', label: '状态', badge: true }
      ],
      form: [
        { key: 'remark', label: '备注', type: 'textarea', span: 2, placeholder: '请输入领用说明' }
      ],
      actions: ['view', 'edit', 'delete', { key: 'revoke', label: '撤销' }, { key: 'approve', label: '审批' }, { key: 'outbound', label: '出库' }]
    },
    deviceReturn: {
      route: '/pc/asset/return',
      eyebrow: '设备资产管理',
      title: '设备退回',
      intro: '统一维护设备退回单、入库状态及退回原因，支持撤销和入库联动。',
      createLabel: '新增退回单',
      idPrefix: 'TH-202604-',
      filters: [
        { key: 'id', label: '退回单号', type: 'text', placeholder: '请输入单号' },
        { key: 'returner', label: '退回人', type: 'text', placeholder: '请输入退回人' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待入库', '已入库', '已撤销']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'id', label: '退回单号', link: true },
        { key: 'model', label: '型号' },
        { key: 'returner', label: '退回人' },
        { key: 'projectName', label: '所属项目' },
        { key: 'qty', label: '数量' },
        { key: 'status', label: '状态', badge: true }
      ],
      form: [
        { key: 'model', label: '设备型号', type: 'select', required: true, options: function () { return (data.modelList || []).map(function (item) { return item.model; }); }, placeholder: '请选择设备型号' },
        { key: 'returner', label: '退回人', type: 'select', required: true, options: function () { return (data.engineerList || []).map(function (item) { return item.name; }); }, placeholder: '请选择退回人' },
        { key: 'projectName', label: '所属项目', type: 'select', required: true, options: function () { return getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return item.name; }); }, placeholder: '请选择所属项目' },
        { key: 'qty', label: '数量', type: 'number', required: true, placeholder: '请输入数量' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待入库', '已入库', '已撤销']; }, placeholder: '请选择状态' },
        { key: 'remark', label: '备注', type: 'textarea', span: 2, placeholder: '请输入退回说明' }
      ],
      actions: ['view', 'edit', 'delete', { key: 'revoke', label: '撤销' }, { key: 'inbound', label: '入库' }]
    },
    deviceRepair: {
      route: '/pc/asset/repair',
      eyebrow: '设备资产管理',
      title: '设备返修',
      intro: '统一维护设备返修申请、审批与返修流转信息，支撑设备维修闭环管理。',
      createLabel: '新增返修单',
      idPrefix: 'FX-202604-',
      filters: [
        { key: 'id', label: '返修单号', type: 'text', placeholder: '请输入单号' },
        { key: 'applicant', label: '申请人', type: 'text', placeholder: '请输入申请人' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待提交', '审批中', '已通过', '已撤销']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'id', label: '返修单号', link: true },
        { key: 'model', label: '型号' },
        { key: 'applicant', label: '申请人' },
        { key: 'projectName', label: '所属项目' },
        { key: 'qty', label: '数量' },
        { key: 'status', label: '状态', badge: true }
      ],
      form: [
        { key: 'model', label: '设备型号', type: 'select', required: true, options: function () { return (data.modelList || []).map(function (item) { return item.model; }); }, placeholder: '请选择设备型号' },
        { key: 'applicant', label: '申请人', type: 'select', required: true, options: function () { return (data.engineerList || []).map(function (item) { return item.name; }); }, placeholder: '请选择申请人' },
        { key: 'projectName', label: '所属项目', type: 'select', required: true, options: function () { return getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return item.name; }); }, placeholder: '请选择所属项目' },
        { key: 'qty', label: '数量', type: 'number', required: true, placeholder: '请输入数量' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待提交', '审批中', '已通过', '已撤销']; }, placeholder: '请选择状态' },
        { key: 'remark', label: '返修原因', type: 'textarea', span: 2, placeholder: '请输入返修原因' }
      ],
      actions: ['view', 'edit', 'delete', { key: 'revoke', label: '撤销' }, { key: 'approve', label: '审批' }]
    },
    deviceScrap: {
      route: '/pc/asset/scrap',
      eyebrow: '设备资产管理',
      title: '设备报废',
      intro: '统一维护设备报废申请、审批与处置流转信息，支撑资产报废闭环管理。',
      createLabel: '新增报废单',
      idPrefix: 'BF-202604-',
      filters: [
        { key: 'id', label: '报废单号', type: 'text', placeholder: '请输入单号' },
        { key: 'applicant', label: '申请人', type: 'text', placeholder: '请输入申请人' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待提交', '审批中', '已通过', '已撤销']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'id', label: '报废单号', link: true },
        { key: 'model', label: '型号' },
        { key: 'applicant', label: '申请人' },
        { key: 'projectName', label: '所属项目' },
        { key: 'qty', label: '数量' },
        { key: 'status', label: '状态', badge: true }
      ],
      form: [
        { key: 'model', label: '设备型号', type: 'select', required: true, options: function () { return (data.modelList || []).map(function (item) { return item.model; }); }, placeholder: '请选择设备型号' },
        { key: 'applicant', label: '申请人', type: 'select', required: true, options: function () { return (data.engineerList || []).map(function (item) { return item.name; }); }, placeholder: '请选择申请人' },
        { key: 'projectName', label: '所属项目', type: 'select', required: true, options: function () { return getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return item.name; }); }, placeholder: '请选择所属项目' },
        { key: 'qty', label: '数量', type: 'number', required: true, placeholder: '请输入数量' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待提交', '审批中', '已通过', '已撤销']; }, placeholder: '请选择状态' },
        { key: 'remark', label: '报废原因', type: 'textarea', span: 2, placeholder: '请输入报废原因' }
      ],
      actions: ['view', 'edit', 'delete', { key: 'revoke', label: '撤销' }, { key: 'approve', label: '审批' }]
    },
    inboundRecord: {
      route: '/pc/asset/inbound',
      eyebrow: '设备资产管理',
      title: '入库记录',
      intro: '展示采购入库、设备退回等自动生成的入库记录，支持检索与查看。',
      createLabel: '',
      idPrefix: 'RK-',
      filters: [
        { key: 'id', label: '入库单号', type: 'text', placeholder: '请输入入库单号' },
        { key: 'sourceType', label: '来源类型', type: 'select', options: function () { return ['采购入库', '退回入库']; }, placeholder: '全部来源' },
        { key: 'warehouse', label: '仓库', type: 'text', placeholder: '请输入仓库' }
      ],
      columns: [
        { key: 'id', label: '入库单号', link: true },
        { key: 'sourceType', label: '来源类型', badge: true },
        { key: 'sourceId', label: '来源单号' },
        { key: 'model', label: '设备型号' },
        { key: 'qty', label: '数量' },
        { key: 'warehouse', label: '仓库' },
        { key: 'time', label: '入库时间' }
      ],
      form: [
        { key: 'sourceType', label: '来源类型', type: 'text', required: true, placeholder: '' },
        { key: 'sourceId', label: '来源单号', type: 'text', required: true, placeholder: '' },
        { key: 'model', label: '设备型号', type: 'text', required: true, placeholder: '' },
        { key: 'qty', label: '数量', type: 'text', required: true, placeholder: '' },
        { key: 'warehouse', label: '仓库', type: 'text', required: true, placeholder: '' },
        { key: 'operator', label: '操作人', type: 'text', required: true, placeholder: '' },
        { key: 'time', label: '入库时间', type: 'text', required: true, placeholder: '' }
      ],
      actions: ['view']
    },
    outboundRecord: {
      route: '/pc/asset/outbound',
      eyebrow: '设备资产管理',
      title: '出库记录',
      intro: '展示设备领用、返修、报废等自动生成的出库记录，支持检索与查看。',
      createLabel: '',
      idPrefix: 'CK-',
      filters: [
        { key: 'id', label: '出库单号', type: 'text', placeholder: '请输入出库单号' },
        { key: 'sourceType', label: '来源类型', type: 'select', options: function () { return ['领用出库', '返修出库', '报废出库']; }, placeholder: '全部来源' },
        { key: 'warehouse', label: '仓库', type: 'text', placeholder: '请输入仓库' }
      ],
      columns: [
        { key: 'id', label: '出库单号', link: true },
        { key: 'sourceType', label: '来源类型', badge: true },
        { key: 'sourceId', label: '来源单号' },
        { key: 'model', label: '设备型号' },
        { key: 'qty', label: '数量' },
        { key: 'warehouse', label: '仓库' },
        { key: 'time', label: '出库时间' }
      ],
      form: [
        { key: 'sourceType', label: '来源类型', type: 'text', required: true, placeholder: '' },
        { key: 'sourceId', label: '来源单号', type: 'text', required: true, placeholder: '' },
        { key: 'model', label: '设备型号', type: 'text', required: true, placeholder: '' },
        { key: 'qty', label: '数量', type: 'text', required: true, placeholder: '' },
        { key: 'warehouse', label: '仓库', type: 'text', required: true, placeholder: '' },
        { key: 'operator', label: '操作人', type: 'text', required: true, placeholder: '' },
        { key: 'time', label: '出库时间', type: 'text', required: true, placeholder: '' }
      ],
      actions: ['view']
    },
    alarmRecord: {
      route: '/pc/asset/alarm',
      eyebrow: '设备资产管理',
      title: '告警记录',
      intro: '展示设备告警记录及处置状态，支持一键报修快速创建运维工单。',
      createLabel: '',
      idPrefix: 'AL-',
      filters: [
        { key: 'id', label: '告警编号', type: 'text', placeholder: '请输入告警编号' },
        { key: 'level', label: '告警级别', type: 'select', options: function () { return ['一级', '二级']; }, placeholder: '全部级别' },
        { key: 'status', label: '处置状态', type: 'select', options: function () { return ['处理中', '待确认', '已上报']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'id', label: '告警编号', link: true },
        { key: 'device', label: '告警设备' },
        { key: 'projectName', label: '所属项目' },
        { key: 'level', label: '告警级别', badge: true },
        { key: 'time', label: '触发时间' },
        { key: 'status', label: '处置状态', badge: true }
      ],
      form: [
        { key: 'device', label: '告警设备', type: 'text', required: true, placeholder: '' },
        { key: 'projectName', label: '所属项目', type: 'text', required: true, placeholder: '' },
        { key: 'level', label: '告警级别', type: 'text', required: true, placeholder: '' },
        { key: 'time', label: '触发时间', type: 'text', required: true, placeholder: '' },
        { key: 'status', label: '处置状态', type: 'text', required: true, placeholder: '' },
        { key: 'owner', label: '责任人', type: 'text', required: true, placeholder: '' },
        { key: 'detail', label: '告警详情', type: 'textarea', span: 2, placeholder: '' }
      ],
      actions: ['view', { key: 'repair', label: '一键报修' }]
    },
    investor: {
      route: '/pc/finance/investor',
      eyebrow: '财务管理',
      title: '投资方',
      intro: '统一维护投资方与资金合作档案，支撑项目资金来源及回款分析展示。',
      createLabel: '新增投资方',
      idPrefix: 'TZ-',
      filters: [
        { key: 'name', label: '投资方名称', type: 'text', placeholder: '请输入投资方名称' },
        { key: 'type', label: '类型', type: 'text', placeholder: '请输入类型' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['合作中', '观察中', '暂停合作']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'name', label: '投资方名称', link: true },
        { key: 'type', label: '类型' },
        { key: 'contact', label: '联系人' },
        { key: 'phone', label: '联系电话' },
        { key: 'amount', label: '投资金额' },
        { key: 'status', label: '状态', badge: true }
      ],
      form: [
        { key: 'name', label: '投资方名称', type: 'text', required: true, placeholder: '请输入投资方名称' },
        { key: 'type', label: '类型', type: 'text', required: true, placeholder: '请输入类型' },
        { key: 'contact', label: '联系人', type: 'text', required: true, placeholder: '请输入联系人' },
        { key: 'phone', label: '联系电话', type: 'text', required: true, placeholder: '请输入联系电话' },
        { key: 'amount', label: '投资金额', type: 'text', placeholder: '请输入投资金额' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['合作中', '观察中', '暂停合作']; }, placeholder: '请选择状态' },
        { key: 'remark', label: '备注', type: 'textarea', span: 2, placeholder: '请输入备注' }
      ],
      actions: ['view', 'edit', 'delete']
    },
    projectProfit: {
      route: '/pc/finance/profit',
      eyebrow: '财务管理',
      title: '项目毛利',
      intro: '自动展示项目收入、成本、毛利和毛利率，支撑经营分析和预警展示。',
      createLabel: '',
      idPrefix: 'LR-',
      filters: [
        { key: 'projectName', label: '项目名称', type: 'text', placeholder: '请输入项目名称' },
        { key: 'warning', label: '预警状态', type: 'select', options: function () { return ['正常', '超预算预警']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'projectName', label: '项目名称', link: true },
        { key: 'income', label: '项目收入' },
        { key: 'cost', label: '动态成本' },
        { key: 'grossProfit', label: '毛利' },

        { key: 'warning', label: '预警状态', badge: true }
      ],
      form: [
        { key: 'projectName', label: '项目名称', type: 'text', required: true, placeholder: '' },
        { key: 'income', label: '项目收入', type: 'text', required: true, placeholder: '' },
        { key: 'cost', label: '动态成本', type: 'text', required: true, placeholder: '' },
        { key: 'grossProfit', label: '毛利', type: 'text', required: true, placeholder: '' },

        { key: 'warning', label: '预警状态', type: 'text', required: true, placeholder: '' }
      ],
      actions: ['view']
    },
    receipt: {
      route: '/pc/finance/receipt',
      eyebrow: '财务管理',
      title: '回款记录',
      intro: '统一维护回款记录，支持新增、编辑、删除、检索、查看及导入导出演示。',
      createLabel: '新增回款记录',
      idPrefix: 'HK-202604-',
      toolbarActions: [{ key: 'import', label: '批量导入' }, { key: 'export', label: '导出' }],
      filters: [
        { key: 'id', label: '回款编号', type: 'text', placeholder: '请输入回款编号' },
        { key: 'projectName', label: '项目名称', type: 'text', placeholder: '请输入项目名称' },
        { key: 'date', label: '回款日期', type: 'date', placeholder: '' }
      ],
      columns: [
        { key: 'id', label: '回款编号', link: true },
        { key: 'projectName', label: '项目名称' },
        { key: 'payerName', label: '付款方' },
        { key: 'amount', label: '回款金额' },
        { key: 'date', label: '回款日期' },
        { key: 'method', label: '回款类型' }
      ],
      form: [
        { key: 'contractId', label: '合同', type: 'select', required: true, options: function () { return (getContractState().list || []).map(function (item) { return { value: item.id, label: item.id + '｜' + (item.projectName || '-') }; }); }, placeholder: '请选择合同' },
        { key: 'projectName', label: '关联项目', type: 'text', required: true, placeholder: '' },
        { key: 'date', label: '回款日期', type: 'date', required: true, placeholder: '' },
        { key: 'method', label: '回款类型', type: 'select', required: true, options: function () { return ['预付款', '进度款', '尾款']; }, placeholder: '请选择回款类型' },
        { key: 'payerName', label: '付款方', type: 'text', required: true, placeholder: '请输入付款方' },
        { key: 'payerAccount', label: '付款账号', type: 'text', placeholder: '请输入付款账号' },
        { key: 'amount', label: '回款金额', type: 'number', required: true, placeholder: '请输入回款金额' },
        { key: 'voucherImage', label: '凭证图片', type: 'upload', placeholder: '' }
      ],
      actions: ['view', 'edit', 'delete']
    },
    payment: {
      route: '/pc/finance/payment',
      eyebrow: '财务管理',
      title: '付款记录',
      intro: '统一维护付款记录，支持新增、编辑、删除、检索、查看及导入导出演示。',
      createLabel: '新增付款记录',
      idPrefix: 'FK-202604-',
      toolbarActions: [{ key: 'import', label: '批量导入' }, { key: 'export', label: '导出' }],
      filters: [
        { key: 'id', label: '付款编号', type: 'text', placeholder: '请输入付款编号' },
        { key: 'projectName', label: '项目名称', type: 'text', placeholder: '请输入项目名称' },
        { key: 'date', label: '付款日期', type: 'date', placeholder: '' }
      ],
      columns: [
        { key: 'id', label: '付款编号', link: true },
        { key: 'projectName', label: '项目名称' },
        { key: 'receiverName', label: '收款方' },
        { key: 'amount', label: '付款金额' },
        { key: 'date', label: '付款日期' },
        { key: 'method', label: '付款方式' }
      ],
      form: [
        { key: 'projectName', label: '项目名称', type: 'select', required: true, options: function () { return getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return item.name; }); }, placeholder: '请选择项目' },
        { key: 'supplierName', label: '供应商', type: 'select', required: true, options: function () { return (data.supplierList || []).map(function (item) { return item.name; }); }, placeholder: '请选择供应商' },
        { key: 'receiverName', label: '收款方', type: 'text', required: true, placeholder: '请输入收款方' },
        { key: 'receiverAccount', label: '收款账号', type: 'text', placeholder: '请输入收款账号' },
        { key: 'paymentType', label: '款项类型', type: 'select', options: function () { return ['订金', '尾款']; }, placeholder: '请选择款项类型' },
        { key: 'amount', label: '付款金额', type: 'text', required: true, placeholder: '请输入付款金额' },
        { key: 'date', label: '付款日期', type: 'date', required: true, placeholder: '' },
        { key: 'method', label: '付款方式', type: 'select', options: function () { return ['银行转账', '支票', '现金']; }, placeholder: '请选择方式' },
        { key: 'voucherImage', label: '凭证照片', type: 'upload', span: 2, placeholder: '' },
        { key: 'remark', label: '备注', type: 'textarea', span: 2, placeholder: '请输入备注' }
      ],
      actions: ['view', 'edit', 'delete']
    },
    invoice: {
      route: '/pc/finance/invoice',
      eyebrow: '财务管理',
      title: '开票记录',
      intro: '统一维护开票记录，支持新增、编辑、删除、检索、查看及导入导出演示。',
      createLabel: '新增开票记录',
      idPrefix: 'KP-202604-',
      toolbarActions: [{ key: 'import', label: '批量导入' }, { key: 'export', label: '导出' }],
      filters: [
        { key: 'id', label: '开票编号', type: 'text', placeholder: '请输入开票编号' },
        { key: 'projectName', label: '项目名称', type: 'text', placeholder: '请输入项目名称' },
        { key: 'date', label: '开票日期', type: 'date', placeholder: '' }
      ],
      columns: [
        { key: 'id', label: '开票编号', link: true },
        { key: 'projectName', label: '项目名称' },
        { key: 'amount', label: '开票金额' },
        { key: 'date', label: '开票日期' },
        { key: 'type', label: '发票类型' }
      ],
      form: [
        { key: 'contractId', label: '合同', type: 'select', required: true, options: function () { return (getContractState().list || []).map(function (item) { return { value: item.id, label: item.id + '｜' + (item.projectName || '-') }; }); }, placeholder: '请选择合同' },
        { key: 'projectName', label: '关联项目', type: 'text', required: true, placeholder: '' },
        { key: 'amount', label: '开票金额', type: 'text', required: true, placeholder: '请输入开票金额' },
        { key: 'date', label: '开票日期', type: 'date', required: true, placeholder: '' },
        { key: 'type', label: '发票类型', type: 'select', options: function () { return ['专票', '普票']; }, placeholder: '请选择发票类型' },
        { key: 'operator', label: '开票人', type: 'text', placeholder: '请输入开票人' },
        { key: 'voucherImage', label: '凭证图片', type: 'upload', span: 2, placeholder: '' },
        { key: 'remark', label: '备注', type: 'textarea', span: 2, placeholder: '请输入备注' }
      ],
      actions: ['view', 'edit', 'delete']
    },
    performance: {
      route: '/pc/finance/performance',
      eyebrow: '财务管理',
      title: '人员业绩',
      intro: '统一展示销售人员、工程人员业绩表现，支撑经营复盘与绩效演示。',
      createLabel: '',
      idPrefix: 'JX-',
      filters: [
        { key: 'personType', label: '人员类型', type: 'select', options: function () { return ['销售人员', '工程人员']; }, placeholder: '全部类型' },
        { key: 'period', label: '统计周期', type: 'text', placeholder: '请输入统计周期' }
      ],
      columns: [
        { key: 'name', label: '姓名', link: true },
        { key: 'personType', label: '人员类型', badge: true },
        { key: 'department', label: '所属部门/小组' },
        { key: 'metric', label: '业绩指标' },
        { key: 'amount', label: '业绩数值' },
        { key: 'period', label: '统计周期' },
        { key: 'rank', label: '排名' }
      ],
      form: [
        { key: 'name', label: '姓名', type: 'text', required: true, placeholder: '' },
        { key: 'personType', label: '人员类型', type: 'text', required: true, placeholder: '' },
        { key: 'department', label: '所属部门/小组', type: 'text', required: true, placeholder: '' },
        { key: 'metric', label: '业绩指标', type: 'text', required: true, placeholder: '' },
        { key: 'amount', label: '业绩数值', type: 'text', required: true, placeholder: '' },
        { key: 'period', label: '统计周期', type: 'text', required: true, placeholder: '' },
        { key: 'rank', label: '排名', type: 'text', required: true, placeholder: '' }
      ],
      actions: ['view']
    }
  };
  (function initProjectArchiveState() {
    function walk(list) {
      var max = 37;
      (list || []).forEach(function (item) {
        var match = String(item.id).match(/XM-2026-(\d+)/);
        if (match) max = Math.max(max, Number(match[1]));
        if (item.children && item.children.length) {
          max = Math.max(max, walk(item.children));
        }
      });
      return max;
    }
    (data.projectArchiveTree || []).forEach(function (item) {
      appState.projectArchive.expanded[item.id] = true;
    });
    appState.projectArchive.nextId = walk(data.projectArchiveTree || []) + 1;
  })();

  function getRoute() {
    var hash = location.hash.replace(/^#/, '');
    return routeMeta[hash] ? hash : '/pc/dashboard';
  }

  function setRoute(route) {
    location.hash = route;
  }

  function getBreadcrumb(route) {
    if (route === '/pc/project/workorder-detail') {
      var workorderDetail = appState.ui.currentWorkorderDetail || {};
      return ['项目管理', workorderDetail.type === 'construction' ? '施工工单' : workorderDetail.type === 'maintenance' ? '运维工单' : '工勘工单', '工单详情'];
    }
    var meta = routeMeta[route] || {};
    return ['项目管理系统（演示版）', meta.module || '工作台', meta.title || '页面'];
  }

  function getPageTitle(route) {
    if (route === '/pc/project/workorder-detail') return '工单详情';
    return (routeMeta[route] || {}).title || '页面';
  }

  function badgeClass(value) {
    if (/一级|高|预警|待你审批|待审批|超预算/.test(value)) return 'danger';
    if (/中|处理中|未处理|部分到货|待确认|待复核|待审核|待入库|待提交/.test(value)) return 'warning';
    return 'success';
  }

  function safeText(value) {
    return String(value == null ? '' : value);
  }

  function escapeHtml(value) {
    return safeText(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function optionHTML(options, current, placeholder) {
    return ['<option value="">' + placeholder + '</option>'].concat((options || []).map(function (item) {
      return '<option value="' + escapeHtml(item) + '"' + (item === current ? ' selected' : '') + '>' + escapeHtml(item) + '</option>';
    })).join('');
  }

  function mappedOptionHTML(options, current, placeholder) {
    return ['<option value="">' + placeholder + '</option>'].concat((options || []).map(function (item) {
      return '<option value="' + escapeHtml(item.value) + '"' + (item.value === current ? ' selected' : '') + '>' + escapeHtml(item.label) + '</option>';
    })).join('');
  }

  function getCustomerArchiveState() {
    return appState.customerArchive;
  }

  function getCustomerFollowState() {
    return appState.customerFollow;
  }

  function getProjectArchiveState() {
    return appState.projectArchive;
  }

  function getProjectCostState() {
    return appState.projectCost;
  }

  function getSurveyWorkorderState() {
    return appState.surveyWorkorder;
  }

  function getConstructionWorkorderState() {
    return appState.constructionWorkorder;
  }

  function getMaintenanceWorkorderState() {
    return appState.maintenanceWorkorder;
  }

  function getPurchaseOrderState() {
    return getManagedState('purchaseOrder');
  }

  function getSalespersonState() {
    return appState.salesperson;
  }

  function getSalesTeamState() {
    return appState.salesTeam;
  }

  function getContractState() {
    return appState.contract;
  }

  function getEngineerState() {
    return appState.engineer;
  }

  function getEngineerTeamState() {
    return appState.engineerTeam;
  }

  function getVehicleLogState() {
    return appState.vehicleLog;
  }

  function getManagedState(key) {
    return appState.managedModules[key];
  }

  function currentUserName() {
    return '李国华';
  }

  function padNumber(value) {
    return String(value).padStart(2, '0');
  }

  function currentPeriodMonth() {
    var samples = []
      .concat((data.contractList || []).map(function (item) { return item.signDate; }))
      .concat((data.receiptList || []).map(function (item) { return item.date; }))
      .concat((data.paymentList || []).map(function (item) { return item.date; }))
      .concat((data.invoiceList || []).map(function (item) { return item.date; }))
      .concat((data.surveyWorkorderList || []).map(function (item) { return item.createTime || item.planDate; }))
      .concat((data.constructionWorkorderList || []).map(function (item) { return item.createTime || item.planDate; }))
      .concat((data.maintenanceWorkorderList || []).map(function (item) { return item.createTime || item.planDate; }))
      .filter(Boolean)
      .sort();
    if (samples.length) return String(samples[samples.length - 1]).slice(0, 7);
    var date = new Date();
    if (Number.isNaN(date.getTime())) return '2026-04';
    return date.getFullYear() + '-' + padNumber(date.getMonth() + 1);
  }

  function formatDateTime(value) {
    var date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.getFullYear() + '-' + padNumber(date.getMonth() + 1) + '-' + padNumber(date.getDate()) + ' ' + padNumber(date.getHours()) + ':' + padNumber(date.getMinutes());
  }

  function nowDateTimeText() {
    return formatDateTime(new Date());
  }

  function parseMoney(value) {
    var numeric = Number(String(value == null ? '' : value).replace(/[^\d.-]/g, ''));
    return Number.isFinite(numeric) ? numeric : 0;
  }

  function formatMoney(value) {
    var amount = Number(value) || 0;
    return '¥' + amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function buildModelBrandList(models) {
    var seen = {};
    var nextIndex = 1;
    return (models || []).reduce(function (result, item) {
      var category = safeText(item.category).trim();
      var brand = safeText(item.brand).trim();
      if (!category || !brand) return result;
      var mapKey = category + '::' + brand;
      if (seen[mapKey]) return result;
      var row = {
        id: 'MB-' + String(nextIndex).padStart(3, '0'),
        category: category,
        brand: brand
      };
      seen[mapKey] = true;
      nextIndex += 1;
      result.push(row);
      return result;
    }, []);
  }

  function ensureModelStateInitialized() {
    var state = getManagedState('model');
    if (!state.brandList || !state.brandList.length) {
      state.brandList = buildModelBrandList(state.list);
      state.nextBrandId = state.brandList.length + 1;
    }
    if (!state.selectedBrandId && state.brandList.length) {
      state.selectedBrandId = state.brandList[0].id;
    }
  }

  function getFilteredCustomers() {
    var state = getCustomerArchiveState();
    return state.list.filter(function (item) {
      var filters = state.filters;
      return (!filters.name || safeText(item.name).indexOf(filters.name) > -1) &&
        (!filters.creditCode || safeText(item.creditCode).indexOf(filters.creditCode) > -1) &&
        (!filters.scale || item.scale === filters.scale) &&
        (!filters.tag || item.tag === filters.tag) &&
        (!filters.salesperson || item.salesperson === filters.salesperson);
    });
  }

  function getFilteredFollowRecords() {
    var state = getCustomerFollowState();
    return state.list.filter(function (item) {
      var filters = state.filters;
      return (!filters.customerName || safeText(item.customerName).indexOf(filters.customerName) > -1) &&
        (!filters.follower || item.follower === filters.follower) &&
        (!filters.method || item.method === filters.method) &&
        (!filters.dateStart || item.time >= filters.dateStart) &&
        (!filters.dateEnd || item.time <= filters.dateEnd + ' 23:59');
    });
  }

  function flattenProjectTree(list, depth, parentVisible) {
    var rows = [];
    (list || []).forEach(function (item) {
      var current = Object.assign({}, item, { depth: depth || 0, hasChildren: !!(item.children && item.children.length) });
      rows.push(current);
      if (current.hasChildren && getProjectArchiveState().expanded[item.id] !== false && parentVisible !== false) {
        rows = rows.concat(flattenProjectTree(item.children, (depth || 0) + 1, true));
      }
    });
    return rows;
  }

  function getAllProjectItems(list) {
    var result = [];
    (list || []).forEach(function (item) {
      result.push(item);
      if (item.children && item.children.length) result = result.concat(getAllProjectItems(item.children));
    });
    return result;
  }

  function getFilteredProjectRows() {
    var state = getProjectArchiveState();
    var filters = state.filters;
    var rows = state.viewMode === 'tree' ? flattenProjectTree(state.tree, 0, true) : getAllProjectItems(state.tree);
    return rows.filter(function (item) {
      return (!filters.name || safeText(item.name).indexOf(filters.name) > -1) &&
        (!filters.code || safeText(item.code).indexOf(filters.code) > -1) &&
        (!filters.customerName || safeText(item.customerName).indexOf(filters.customerName) > -1) &&
        (!filters.status || item.status === filters.status) &&
        (!filters.manager || item.manager === filters.manager);
    });
  }

  function getFilteredProjectCosts() {
    var state = getProjectCostState();
    var filters = state.filters;
    return state.list.filter(function (item) {
      return (!filters.id || safeText(item.id).indexOf(filters.id) > -1) &&
        (!filters.projectName || safeText(item.projectName).indexOf(filters.projectName) > -1) &&
        (!filters.customerName || safeText(item.customerName).indexOf(filters.customerName) > -1) &&
        (!filters.status || item.status === filters.status) &&
        (!filters.dateStart || item.createTime >= filters.dateStart) &&
        (!filters.dateEnd || item.createTime <= filters.dateEnd + ' 23:59');
    });
  }

  function getFilteredSurveyWorkorders() {
    var state = getSurveyWorkorderState();
    var filters = state.filters;
    return state.list.filter(function (item) {
      return (!filters.id || safeText(item.id).indexOf(filters.id) > -1) &&
        (!filters.projectId || item.projectId === filters.projectId) &&
        (!filters.surveyor || item.surveyor === filters.surveyor) &&
        (!filters.planDate || item.planDate === filters.planDate);
    });
  }

  function getFilteredConstructionWorkorders() {
    var state = getConstructionWorkorderState();
    var filters = state.filters;
    return state.list.filter(function (item) {
      return (!filters.id || safeText(item.id).indexOf(filters.id) > -1) &&
        (!filters.projectId || item.projectId === filters.projectId) &&
        (!filters.worker || item.worker === filters.worker) &&
        (!filters.planDate || item.planDate === filters.planDate);
    });
  }

  function getFilteredMaintenanceWorkorders() {
    var state = getMaintenanceWorkorderState();
    var filters = state.filters;
    return state.list.filter(function (item) {
      return (!filters.id || safeText(item.id).indexOf(filters.id) > -1) &&
        (!filters.projectId || item.projectId === filters.projectId) &&
        (!filters.worker || item.worker === filters.worker) &&
        (!filters.planDate || item.planDate === filters.planDate);
    });
  }

  function getFilteredSalespersons() {
    var state = getSalespersonState();
    var filters = state.filters;
    return state.list.filter(function (item) {
      return (!filters.name || safeText(item.name).indexOf(filters.name) > -1) &&
        (!filters.phone || safeText(item.phone).indexOf(filters.phone) > -1) &&
        (!filters.team || item.team === filters.team) &&
        (!filters.status || item.status === filters.status);
    });
  }

  function getFilteredSalesTeams() {
    var state = getSalesTeamState();
    var filters = state.filters;
    return state.list.filter(function (item) {
      return (!filters.name || safeText(item.name).indexOf(filters.name) > -1) &&
        (!filters.ownerName || safeText(item.ownerName).indexOf(filters.ownerName) > -1) &&
        (!filters.status || item.status === filters.status);
    });
  }

  function getFilteredContracts() {
    var state = getContractState();
    var filters = state.filters;
    return state.list.filter(function (item) {
      return (!filters.id || safeText(item.id).indexOf(filters.id) > -1) &&
        (!filters.customerId || item.customerId === filters.customerId) &&
        (!filters.projectId || item.projectId === filters.projectId) &&
        (!filters.status || item.status === filters.status);
    });
  }

  function getFilteredEngineers() {
    var state = getEngineerState();
    var filters = state.filters;
    return state.list.filter(function (item) {
      return (!filters.name || safeText(item.name).indexOf(filters.name) > -1) &&
        (!filters.phone || safeText(item.phone).indexOf(filters.phone) > -1) &&
        (!filters.team || item.team === filters.team) &&
        (!filters.status || item.status === filters.status);
    });
  }

  function getFilteredEngineerTeams() {
    var state = getEngineerTeamState();
    var filters = state.filters;
    return state.list.filter(function (item) {
      return (!filters.name || safeText(item.name).indexOf(filters.name) > -1) &&
        (!filters.ownerName || safeText(item.ownerName).indexOf(filters.ownerName) > -1) &&
        (!filters.status || item.status === filters.status);
    });
  }

  function getFilteredVehicleLogs() {
    var state = getVehicleLogState();
    var filters = state.filters;
    return state.list.filter(function (item) {
      return (!filters.plate || safeText(item.plate).indexOf(filters.plate) > -1) &&
        (!filters.user || item.user === filters.user);

    });
  }

  var managedPageConfigs = {
    supplier: {
      route: '/pc/purchase/supplier',
      eyebrow: '采购管理',
      title: '供应商管理',
      intro: '统一维护供应商基础档案、启停状态及采购关联信息，支撑采购寻源与履约管理。',
      createLabel: '新增供应商',
      idPrefix: 'GY-',
      filters: [
        { key: 'name', label: '供应商名称', type: 'text', placeholder: '请输入供应商名称' },
        { key: 'category', label: '类别', type: 'select', options: function () { return data.supplierOptions.categories; }, placeholder: '全部类别' },
        { key: 'status', label: '状态', type: 'select', options: function () { return data.supplierOptions.statuses; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'name', label: '供应商名称', link: true },
        { key: 'category', label: '类别' },
        { key: 'contact', label: '联系人' },
        { key: 'phone', label: '联系电话' },
        { key: 'address', label: '地址' },
        { key: 'status', label: '状态', badge: true }
      ],
      form: [
        { key: 'name', label: '供应商名称', type: 'text', required: true, placeholder: '请输入供应商名称' },
        { key: 'category', label: '类别', type: 'select', required: true, options: function () { return data.supplierOptions.categories; }, placeholder: '请选择类别' },
        { key: 'contact', label: '联系人', type: 'text', required: true, placeholder: '请输入联系人' },
        { key: 'phone', label: '联系电话', type: 'text', required: true, placeholder: '请输入联系电话' },
        { key: 'status', label: '状态', type: 'select', options: function () { return data.supplierOptions.statuses; }, placeholder: '请选择状态' },
        { key: 'address', label: '地址', type: 'text', span: 2, placeholder: '请输入供应商地址' },
        { key: 'remark', label: '备注', type: 'textarea', span: 2, placeholder: '请输入备注' }
      ],
      actions: ['view', 'edit', 'delete', { key: 'drill', label: '关联采购单' }]
    },
    purchaseOrder: {
      route: '/pc/purchase/order',
      eyebrow: '采购管理',
      title: '采购单',
      intro: '统一维护采购单新增、审核、入库及明细信息，支撑采购业务闭环演示。',
      createLabel: '新增采购单',
      idPrefix: 'CG-202604-',
      filters: [
        { key: 'id', label: '采购单编号', type: 'text', placeholder: '请输入采购单编号' },
        { key: 'supplierName', label: '供应商', type: 'text', placeholder: '请输入供应商' },
        { key: 'status', label: '采购状态', type: 'select', options: function () { return data.purchaseOrderOptions.statuses; }, placeholder: '全部采购状态' },
        { key: 'inboundStatus', label: '入库状态', type: 'select', options: function () { return data.purchaseOrderOptions.inboundStatuses; }, placeholder: '全部入库状态' },
        { key: 'dateStart', label: '开始时间', type: 'date', placeholder: '' },
        { key: 'dateEnd', label: '结束时间', type: 'date', placeholder: '' }
      ],
      columns: [
        { key: 'id', label: '采购单编号', link: true },
        { key: 'supplierName', label: '供应商名称' },
        { key: 'amount', label: '采购金额' },
        { key: 'status', label: '审核状态', badge: true },
        { key: 'inboundStatus', label: '入库状态', badge: true },
        { key: 'createTime', label: '创建时间' },
        { key: 'creator', label: '创建人' }
      ],
      form: [
        { key: 'supplierName', label: '供应商名称', type: 'select', required: true, options: function () { return (data.supplierList || []).map(function (item) { return item.name; }); }, placeholder: '请选择供应商' }
      ],
      actions: ['view', 'edit', 'delete', { key: 'approve', label: '审核' }, { key: 'inbound', label: '入库' }]
    },
    supplierScore: {
      route: '/pc/purchase/score',
      eyebrow: '采购管理',
      title: '供应商评分',
      intro: '按供应商履约表现维护评价记录，独立记录质量、时效、服务评分结果，不承担供应商主档状态维护。',
      createLabel: '',
      idPrefix: 'PF-',
      filters: [
        { key: 'supplierName', label: '供应商', type: 'text', placeholder: '请输入供应商名称' },
        { key: 'assessor', label: '评分人', type: 'text', placeholder: '请输入评分人' }
      ],
      columns: [
        { key: 'supplierName', label: '供应商', link: true },
        { key: 'assessor', label: '评分人' },
        { key: 'scoreTime', label: '评分时间' },
        { key: 'score', label: '分值' }
      ],
      form: [
        { key: 'supplierName', label: '供应商', type: 'select', required: true, options: function () { return (data.supplierList || []).map(function (item) { return item.name; }); }, placeholder: '请选择供应商' },
        { key: 'score', label: '分值', type: 'number', required: true, placeholder: '请输入分值' },
        { key: 'remark', label: '评分说明', type: 'textarea', span: 2, placeholder: '请输入评分说明' }
      ],
      actions: ['edit', { key: 'score-record', label: '评分记录' }]
    },
    model: {
      route: '/pc/asset/model',
      eyebrow: '设备资产管理',
      title: '型号管理',
      intro: '统一维护设备品牌及型号基础信息，为设备档案、库存和出入库业务提供主数据支撑。',
      createLabel: '新增型号',
      idPrefix: 'MX-',
      filters: [
        { key: 'brand', label: '品牌', type: 'text', placeholder: '请输入品牌' },
        { key: 'category', label: '类别', type: 'select', options: function () { return data.modelOptions.categories; }, placeholder: '全部类别' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['启用', '禁用']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'brand', label: '品牌' },
        { key: 'model', label: '型号', link: true },
        { key: 'category', label: '类别' },
        { key: 'unit', label: '单位' },
        { key: 'status', label: '状态', badge: true }
      ],
      form: [
        { key: 'brand', label: '品牌', type: 'text', required: true, placeholder: '请输入品牌' },
        { key: 'model', label: '设备型号', type: 'text', required: true, placeholder: '请输入设备型号' },
        { key: 'category', label: '类别', type: 'select', required: true, options: function () { return data.modelOptions.categories; }, placeholder: '请选择类别' },
        { key: 'unit', label: '单位', type: 'text', required: true, placeholder: '请输入单位' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['启用', '禁用']; }, placeholder: '请选择状态' },
        { key: 'remark', label: '备注', type: 'textarea', span: 2, placeholder: '请输入备注' }
      ],
      actions: ['view', 'edit', 'delete']
    },
    deviceArchive: {
      route: '/pc/asset/device',
      eyebrow: '设备资产管理',
      title: '设备档案',
      intro: '统一维护设备台账、所属项目与状态信息，并展示设备各状态数量统计。',
      createLabel: '新增设备',
      idPrefix: 'SB-',
      filters: [
        { key: 'code', label: '设备编码', type: 'text', placeholder: '请输入设备编码' },
        { key: 'model', label: '型号', type: 'text', placeholder: '请输入设备型号' },
        { key: 'status', label: '状态', type: 'select', options: function () { return data.deviceArchiveOptions.statuses; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'code', label: '设备编码', link: true },
        { key: 'name', label: '设备名称' },
        { key: 'model', label: '型号' },
        { key: 'projectName', label: '所属项目' },
        { key: 'status', label: '状态', badge: true },
        { key: 'warehouse', label: '所属仓库' }
      ],
      form: [
        { key: 'code', label: '设备编码', type: 'text', required: true, placeholder: '请输入设备编码' },
        { key: 'name', label: '设备名称', type: 'text', required: true, placeholder: '请输入设备名称' },
        { key: 'model', label: '型号', type: 'select', required: true, options: function () { return (data.modelList || []).map(function (item) { return item.model; }); }, placeholder: '请选择型号' },
        { key: 'projectName', label: '所属项目', type: 'select', options: function () { return getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return item.name; }); }, placeholder: '请选择所属项目' },
        { key: 'status', label: '状态', type: 'select', options: function () { return data.deviceArchiveOptions.statuses; }, placeholder: '请选择状态' },
        { key: 'warehouse', label: '所属仓库', type: 'text', placeholder: '请输入所属仓库' },
        { key: 'owner', label: '责任人', type: 'text', placeholder: '请输入责任人' },
        { key: 'installDate', label: '安装日期', type: 'date', placeholder: '' }
      ],
      actions: ['view', 'edit']
    },
    inventory: {
      route: '/pc/asset/inventory',
      eyebrow: '设备资产管理',
      title: '设备库存',
      intro: '按设备型号展示闲置库存、安全库存及仓库分布，支持查看各型号库存清单。',
      createLabel: '',
      idPrefix: 'KC-',
      filters: [
        { key: 'name', label: '设备名称', type: 'text', placeholder: '请输入设备名称' },
        { key: 'warehouse', label: '仓库', type: 'text', placeholder: '请输入仓库' },
        { key: 'status', label: '库存状态', type: 'select', options: function () { return ['充足', '正常', '低库存']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'name', label: '设备名称', link: true },
        { key: 'model', label: '型号规格' },
        { key: 'warehouse', label: '仓库' },
        { key: 'idleQty', label: '闲置数量' },
        { key: 'safeQty', label: '安全库存' },
        { key: 'status', label: '库存状态', badge: true }
      ],
      form: [
        { key: 'name', label: '设备名称', type: 'text', required: true, placeholder: '请输入设备名称' },
        { key: 'model', label: '型号规格', type: 'text', required: true, placeholder: '请输入型号规格' },
        { key: 'warehouse', label: '仓库', type: 'text', required: true, placeholder: '请输入仓库' },
        { key: 'idleQty', label: '闲置数量', type: 'number', required: true, placeholder: '请输入数量' },
        { key: 'safeQty', label: '安全库存', type: 'number', required: true, placeholder: '请输入安全库存' },
        { key: 'status', label: '库存状态', type: 'select', options: function () { return ['充足', '正常', '低库存']; }, placeholder: '请选择库存状态' }
      ],
      actions: ['view']
    },
    deviceReceive: {
      route: '/pc/asset/receive',
      eyebrow: '设备资产管理',
      title: '设备领用',
      intro: '统一维护设备领用单、出库状态及领用去向，支持撤销和出库联动。',
      createLabel: '新增领用单',
      idPrefix: 'LY-202604-',
      filters: [
        { key: 'id', label: '领用单号', type: 'text', placeholder: '请输入单号' },
        { key: 'receiver', label: '领用人', type: 'text', placeholder: '请输入领用人' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待出库', '已出库', '已撤销']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'id', label: '领用单号', link: true },
        { key: 'model', label: '型号' },
        { key: 'receiver', label: '领用人' },
        { key: 'projectName', label: '所属项目' },
        { key: 'qty', label: '数量' },
        { key: 'status', label: '状态', badge: true }
      ],
      form: [
        { key: 'model', label: '设备型号', type: 'select', required: true, options: function () { return (data.modelList || []).map(function (item) { return item.model; }); }, placeholder: '请选择设备型号' },
        { key: 'receiver', label: '领用人', type: 'select', required: true, options: function () { return (data.engineerList || []).map(function (item) { return item.name; }); }, placeholder: '请选择领用人' },
        { key: 'projectName', label: '所属项目', type: 'select', required: true, options: function () { return getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return item.name; }); }, placeholder: '请选择所属项目' },
        { key: 'qty', label: '数量', type: 'number', required: true, placeholder: '请输入数量' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待出库', '已出库', '已撤销']; }, placeholder: '请选择状态' },
        { key: 'remark', label: '备注', type: 'textarea', span: 2, placeholder: '请输入领用说明' }
      ],
      actions: ['view', 'edit', 'delete', { key: 'revoke', label: '撤销' }, { key: 'outbound', label: '出库' }]
    },
    deviceReturn: {
      route: '/pc/asset/return',
      eyebrow: '设备资产管理',
      title: '设备退回',
      intro: '统一维护设备退回单、入库状态及退回原因，支持撤销和入库联动。',
      createLabel: '新增退回单',
      idPrefix: 'TH-202604-',
      filters: [
        { key: 'id', label: '退回单号', type: 'text', placeholder: '请输入单号' },
        { key: 'returner', label: '退回人', type: 'text', placeholder: '请输入退回人' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待入库', '已入库', '已撤销']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'id', label: '退回单号', link: true },
        { key: 'model', label: '型号' },
        { key: 'returner', label: '退回人' },
        { key: 'projectName', label: '所属项目' },
        { key: 'qty', label: '数量' },
        { key: 'status', label: '状态', badge: true }
      ],
      form: [
        { key: 'model', label: '设备型号', type: 'select', required: true, options: function () { return (data.modelList || []).map(function (item) { return item.model; }); }, placeholder: '请选择设备型号' },
        { key: 'returner', label: '退回人', type: 'select', required: true, options: function () { return (data.engineerList || []).map(function (item) { return item.name; }); }, placeholder: '请选择退回人' },
        { key: 'projectName', label: '所属项目', type: 'select', required: true, options: function () { return getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return item.name; }); }, placeholder: '请选择所属项目' },
        { key: 'qty', label: '数量', type: 'number', required: true, placeholder: '请输入数量' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待入库', '已入库', '已撤销']; }, placeholder: '请选择状态' },
        { key: 'remark', label: '备注', type: 'textarea', span: 2, placeholder: '请输入退回说明' }
      ],
      actions: ['view', 'edit', 'delete', { key: 'revoke', label: '撤销' }, { key: 'inbound', label: '入库' }]
    },
    deviceRepair: {
      route: '/pc/asset/repair',
      eyebrow: '设备资产管理',
      title: '设备返修',
      intro: '统一维护设备返修申请、审批与返修流转信息，支撑设备维修闭环管理。',
      createLabel: '新增返修单',
      idPrefix: 'FX-202604-',
      filters: [
        { key: 'id', label: '返修单号', type: 'text', placeholder: '请输入单号' },
        { key: 'applicant', label: '申请人', type: 'text', placeholder: '请输入申请人' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待提交', '审批中', '已通过', '已撤销']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'id', label: '返修单号', link: true },
        { key: 'model', label: '型号' },
        { key: 'applicant', label: '申请人' },
        { key: 'projectName', label: '所属项目' },
        { key: 'qty', label: '数量' },
        { key: 'status', label: '状态', badge: true }
      ],
      form: [
        { key: 'model', label: '设备型号', type: 'select', required: true, options: function () { return (data.modelList || []).map(function (item) { return item.model; }); }, placeholder: '请选择设备型号' },
        { key: 'applicant', label: '申请人', type: 'select', required: true, options: function () { return (data.engineerList || []).map(function (item) { return item.name; }); }, placeholder: '请选择申请人' },
        { key: 'projectName', label: '所属项目', type: 'select', required: true, options: function () { return getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return item.name; }); }, placeholder: '请选择所属项目' },
        { key: 'qty', label: '数量', type: 'number', required: true, placeholder: '请输入数量' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待提交', '审批中', '已通过', '已撤销']; }, placeholder: '请选择状态' },
        { key: 'remark', label: '返修原因', type: 'textarea', span: 2, placeholder: '请输入返修原因' }
      ],
      actions: ['view', 'edit', 'delete', { key: 'revoke', label: '撤销' }, { key: 'approve', label: '审批' }]
    },
    deviceScrap: {
      route: '/pc/asset/scrap',
      eyebrow: '设备资产管理',
      title: '设备报废',
      intro: '统一维护设备报废申请、审批与处置流转信息，支撑资产报废闭环管理。',
      createLabel: '新增报废单',
      idPrefix: 'BF-202604-',
      filters: [
        { key: 'id', label: '报废单号', type: 'text', placeholder: '请输入单号' },
        { key: 'applicant', label: '申请人', type: 'text', placeholder: '请输入申请人' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待提交', '审批中', '已通过', '已撤销']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'id', label: '报废单号', link: true },
        { key: 'model', label: '型号' },
        { key: 'applicant', label: '申请人' },
        { key: 'projectName', label: '所属项目' },
        { key: 'qty', label: '数量' },
        { key: 'status', label: '状态', badge: true }
      ],
      form: [
        { key: 'model', label: '设备型号', type: 'select', required: true, options: function () { return (data.modelList || []).map(function (item) { return item.model; }); }, placeholder: '请选择设备型号' },
        { key: 'applicant', label: '申请人', type: 'select', required: true, options: function () { return (data.engineerList || []).map(function (item) { return item.name; }); }, placeholder: '请选择申请人' },
        { key: 'projectName', label: '所属项目', type: 'select', required: true, options: function () { return getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return item.name; }); }, placeholder: '请选择所属项目' },
        { key: 'qty', label: '数量', type: 'number', required: true, placeholder: '请输入数量' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['待提交', '审批中', '已通过', '已撤销']; }, placeholder: '请选择状态' },
        { key: 'remark', label: '报废原因', type: 'textarea', span: 2, placeholder: '请输入报废原因' }
      ],
      actions: ['view', 'edit', 'delete', { key: 'revoke', label: '撤销' }, { key: 'approve', label: '审批' }]
    },
    inboundRecord: {
      route: '/pc/asset/inbound',
      eyebrow: '设备资产管理',
      title: '入库记录',
      intro: '展示采购入库、设备退回等自动生成的入库记录，支持检索与查看。',
      createLabel: '',
      idPrefix: 'RK-',
      filters: [
        { key: 'id', label: '入库单号', type: 'text', placeholder: '请输入入库单号' },
        { key: 'sourceType', label: '来源类型', type: 'select', options: function () { return ['采购入库', '退回入库']; }, placeholder: '全部来源' },
        { key: 'warehouse', label: '仓库', type: 'text', placeholder: '请输入仓库' }
      ],
      columns: [
        { key: 'id', label: '入库单号', link: true },
        { key: 'sourceType', label: '来源类型', badge: true },
        { key: 'sourceId', label: '来源单号' },
        { key: 'model', label: '设备型号' },
        { key: 'qty', label: '数量' },
        { key: 'warehouse', label: '仓库' },
        { key: 'time', label: '入库时间' }
      ],
      form: [
        { key: 'sourceType', label: '来源类型', type: 'text', required: true, placeholder: '' },
        { key: 'sourceId', label: '来源单号', type: 'text', required: true, placeholder: '' },
        { key: 'model', label: '设备型号', type: 'text', required: true, placeholder: '' },
        { key: 'qty', label: '数量', type: 'text', required: true, placeholder: '' },
        { key: 'warehouse', label: '仓库', type: 'text', required: true, placeholder: '' },
        { key: 'operator', label: '操作人', type: 'text', required: true, placeholder: '' },
        { key: 'time', label: '入库时间', type: 'text', required: true, placeholder: '' }
      ],
      actions: ['view']
    },
    outboundRecord: {
      route: '/pc/asset/outbound',
      eyebrow: '设备资产管理',
      title: '出库记录',
      intro: '展示设备领用、返修、报废等自动生成的出库记录，支持检索与查看。',
      createLabel: '',
      idPrefix: 'CK-',
      filters: [
        { key: 'id', label: '出库单号', type: 'text', placeholder: '请输入出库单号' },
        { key: 'sourceType', label: '来源类型', type: 'select', options: function () { return ['领用出库', '返修出库', '报废出库']; }, placeholder: '全部来源' },
        { key: 'warehouse', label: '仓库', type: 'text', placeholder: '请输入仓库' }
      ],
      columns: [
        { key: 'id', label: '出库单号', link: true },
        { key: 'sourceType', label: '来源类型', badge: true },
        { key: 'sourceId', label: '来源单号' },
        { key: 'model', label: '设备型号' },
        { key: 'qty', label: '数量' },
        { key: 'warehouse', label: '仓库' },
        { key: 'time', label: '出库时间' }
      ],
      form: [
        { key: 'sourceType', label: '来源类型', type: 'text', required: true, placeholder: '' },
        { key: 'sourceId', label: '来源单号', type: 'text', required: true, placeholder: '' },
        { key: 'model', label: '设备型号', type: 'text', required: true, placeholder: '' },
        { key: 'qty', label: '数量', type: 'text', required: true, placeholder: '' },
        { key: 'warehouse', label: '仓库', type: 'text', required: true, placeholder: '' },
        { key: 'operator', label: '操作人', type: 'text', required: true, placeholder: '' },
        { key: 'time', label: '出库时间', type: 'text', required: true, placeholder: '' }
      ],
      actions: ['view']
    },
    alarmRecord: {
      route: '/pc/asset/alarm',
      eyebrow: '设备资产管理',
      title: '告警记录',
      intro: '展示设备告警记录及处置状态，支持一键报修快速创建运维工单。',
      createLabel: '',
      idPrefix: 'AL-',
      filters: [
        { key: 'id', label: '告警编号', type: 'text', placeholder: '请输入告警编号' },
        { key: 'level', label: '告警级别', type: 'select', options: function () { return ['一级', '二级']; }, placeholder: '全部级别' },
        { key: 'status', label: '处置状态', type: 'select', options: function () { return ['处理中', '待确认', '已上报']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'id', label: '告警编号', link: true },
        { key: 'device', label: '告警设备' },
        { key: 'projectName', label: '所属项目' },
        { key: 'level', label: '告警级别', badge: true },
        { key: 'time', label: '触发时间' },
        { key: 'status', label: '处置状态', badge: true }
      ],
      form: [
        { key: 'device', label: '告警设备', type: 'text', required: true, placeholder: '' },
        { key: 'projectName', label: '所属项目', type: 'text', required: true, placeholder: '' },
        { key: 'level', label: '告警级别', type: 'text', required: true, placeholder: '' },
        { key: 'time', label: '触发时间', type: 'text', required: true, placeholder: '' },
        { key: 'status', label: '处置状态', type: 'text', required: true, placeholder: '' },
        { key: 'owner', label: '责任人', type: 'text', required: true, placeholder: '' },
        { key: 'detail', label: '告警详情', type: 'textarea', span: 2, placeholder: '' }
      ],
      actions: ['view', { key: 'repair', label: '一键报修' }]
    },
    investor: {
      route: '/pc/finance/investor',
      eyebrow: '财务管理',
      title: '投资方',
      intro: '统一维护投资方与资金合作档案，支撑项目资金来源及回款分析展示。',
      createLabel: '新增投资方',
      idPrefix: 'TZ-',
      filters: [
        { key: 'name', label: '投资方名称', type: 'text', placeholder: '请输入投资方名称' },
        { key: 'type', label: '类型', type: 'text', placeholder: '请输入类型' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['合作中', '观察中', '暂停合作']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'name', label: '投资方名称', link: true },
        { key: 'type', label: '类型' },
        { key: 'contact', label: '联系人' },
        { key: 'phone', label: '联系电话' },
        { key: 'amount', label: '投资金额' },
        { key: 'status', label: '状态', badge: true }
      ],
      form: [
        { key: 'name', label: '投资方名称', type: 'text', required: true, placeholder: '请输入投资方名称' },
        { key: 'type', label: '类型', type: 'text', required: true, placeholder: '请输入类型' },
        { key: 'contact', label: '联系人', type: 'text', required: true, placeholder: '请输入联系人' },
        { key: 'phone', label: '联系电话', type: 'text', required: true, placeholder: '请输入联系电话' },
        { key: 'amount', label: '投资金额', type: 'text', placeholder: '请输入投资金额' },
        { key: 'status', label: '状态', type: 'select', options: function () { return ['合作中', '观察中', '暂停合作']; }, placeholder: '请选择状态' },
        { key: 'remark', label: '备注', type: 'textarea', span: 2, placeholder: '请输入备注' }
      ],
      actions: ['view', 'edit', 'delete']
    },
    projectProfit: {
      route: '/pc/finance/profit',
      eyebrow: '财务管理',
      title: '项目毛利',
      intro: '自动展示项目收入、成本、毛利和毛利率，支撑经营分析和预警展示。',
      createLabel: '',
      idPrefix: 'LR-',
      filters: [
        { key: 'projectName', label: '项目名称', type: 'text', placeholder: '请输入项目名称' },
        { key: 'warning', label: '预警状态', type: 'select', options: function () { return ['正常', '超预算预警']; }, placeholder: '全部状态' }
      ],
      columns: [
        { key: 'projectName', label: '项目名称', link: true },
        { key: 'income', label: '项目收入' },
        { key: 'cost', label: '动态成本' },
        { key: 'grossProfit', label: '毛利' },

        { key: 'warning', label: '预警状态', badge: true }
      ],
      form: [
        { key: 'projectName', label: '项目名称', type: 'text', required: true, placeholder: '' },
        { key: 'income', label: '项目收入', type: 'text', required: true, placeholder: '' },
        { key: 'cost', label: '动态成本', type: 'text', required: true, placeholder: '' },
        { key: 'grossProfit', label: '毛利', type: 'text', required: true, placeholder: '' },

        { key: 'warning', label: '预警状态', type: 'text', required: true, placeholder: '' }
      ],
      actions: ['view']
    },
    receipt: {
      route: '/pc/finance/receipt',
      eyebrow: '财务管理',
      title: '回款记录',
      intro: '统一维护回款记录，支持新增、编辑、删除、检索、查看及导入导出演示。',
      createLabel: '新增回款记录',
      idPrefix: 'HK-202604-',
      toolbarActions: [{ key: 'import', label: '批量导入' }, { key: 'export', label: '导出' }],
      filters: [
        { key: 'id', label: '回款编号', type: 'text', placeholder: '请输入回款编号' },
        { key: 'projectName', label: '项目名称', type: 'text', placeholder: '请输入项目名称' },
        { key: 'date', label: '回款日期', type: 'date', placeholder: '' }
      ],
      columns: [
        { key: 'id', label: '回款编号', link: true },
        { key: 'projectName', label: '项目名称' },
        { key: 'payerName', label: '付款方' },
        { key: 'amount', label: '回款金额' },
        { key: 'date', label: '回款日期' },
        { key: 'method', label: '回款类型' }
      ],
      form: [
        { key: 'contractId', label: '合同', type: 'select', required: true, options: function () { return (getContractState().list || []).map(function (item) { return { value: item.id, label: item.id + '｜' + (item.projectName || '-') }; }); }, placeholder: '请选择合同' },
        { key: 'projectName', label: '关联项目', type: 'text', required: true, placeholder: '' },
        { key: 'date', label: '回款日期', type: 'date', required: true, placeholder: '' },
        { key: 'method', label: '回款类型', type: 'select', required: true, options: function () { return ['预付款', '进度款', '尾款']; }, placeholder: '请选择回款类型' },
        { key: 'payerName', label: '付款方', type: 'text', required: true, placeholder: '请输入付款方' },
        { key: 'payerAccount', label: '付款账号', type: 'text', placeholder: '请输入付款账号' },
        { key: 'amount', label: '回款金额', type: 'number', required: true, placeholder: '请输入回款金额' },
        { key: 'voucherImage', label: '凭证图片', type: 'upload', placeholder: '' }
      ],
      actions: ['view', 'edit', 'delete']
    },
    payment: {
      route: '/pc/finance/payment',
      eyebrow: '财务管理',
      title: '付款记录',
      intro: '统一维护付款记录，支持新增、编辑、删除、检索、查看及导入导出演示。',
      createLabel: '新增付款记录',
      idPrefix: 'FK-202604-',
      toolbarActions: [{ key: 'import', label: '批量导入' }, { key: 'export', label: '导出' }],
      filters: [
        { key: 'id', label: '付款编号', type: 'text', placeholder: '请输入付款编号' },
        { key: 'projectName', label: '项目名称', type: 'text', placeholder: '请输入项目名称' },
        { key: 'date', label: '付款日期', type: 'date', placeholder: '' }
      ],
      columns: [
        { key: 'id', label: '付款编号', link: true },
        { key: 'projectName', label: '项目名称' },
        { key: 'receiverName', label: '收款方' },
        { key: 'amount', label: '付款金额' },
        { key: 'date', label: '付款日期' },
        { key: 'method', label: '付款方式' }
      ],
      form: [
        { key: 'projectName', label: '项目名称', type: 'select', required: true, options: function () { return getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return item.name; }); }, placeholder: '请选择项目' },
        { key: 'supplierName', label: '供应商', type: 'select', required: true, options: function () { return (data.supplierList || []).map(function (item) { return item.name; }); }, placeholder: '请选择供应商' },
        { key: 'receiverName', label: '收款方', type: 'text', required: true, placeholder: '请输入收款方' },
        { key: 'receiverAccount', label: '收款账号', type: 'text', placeholder: '请输入收款账号' },
        { key: 'paymentType', label: '款项类型', type: 'select', options: function () { return ['订金', '尾款']; }, placeholder: '请选择款项类型' },
        { key: 'amount', label: '付款金额', type: 'text', required: true, placeholder: '请输入付款金额' },
        { key: 'date', label: '付款日期', type: 'date', required: true, placeholder: '' },
        { key: 'method', label: '付款方式', type: 'select', options: function () { return ['银行转账', '支票', '现金']; }, placeholder: '请选择方式' },
        { key: 'voucherImage', label: '凭证照片', type: 'upload', span: 2, placeholder: '' },
        { key: 'remark', label: '备注', type: 'textarea', span: 2, placeholder: '请输入备注' }
      ],
      actions: ['view', 'edit', 'delete']
    },
    invoice: {
      route: '/pc/finance/invoice',
      eyebrow: '财务管理',
      title: '开票记录',
      intro: '统一维护开票记录，支持新增、编辑、删除、检索、查看及导入导出演示。',
      createLabel: '新增开票记录',
      idPrefix: 'KP-202604-',
      toolbarActions: [{ key: 'import', label: '批量导入' }, { key: 'export', label: '导出' }],
      filters: [
        { key: 'id', label: '开票编号', type: 'text', placeholder: '请输入开票编号' },
        { key: 'projectName', label: '项目名称', type: 'text', placeholder: '请输入项目名称' },
        { key: 'date', label: '开票日期', type: 'date', placeholder: '' }
      ],
      columns: [
        { key: 'id', label: '开票编号', link: true },
        { key: 'projectName', label: '项目名称' },
        { key: 'amount', label: '开票金额' },
        { key: 'date', label: '开票日期' },
        { key: 'type', label: '发票类型' }
      ],
      form: [
        { key: 'contractId', label: '合同', type: 'select', required: true, options: function () { return (getContractState().list || []).map(function (item) { return { value: item.id, label: item.id + '｜' + (item.projectName || '-') }; }); }, placeholder: '请选择合同' },
        { key: 'projectName', label: '关联项目', type: 'text', required: true, placeholder: '' },
        { key: 'amount', label: '开票金额', type: 'text', required: true, placeholder: '请输入开票金额' },
        { key: 'date', label: '开票日期', type: 'date', required: true, placeholder: '' },
        { key: 'type', label: '发票类型', type: 'select', options: function () { return ['专票', '普票']; }, placeholder: '请选择发票类型' },
        { key: 'operator', label: '开票人', type: 'text', placeholder: '请输入开票人' },
        { key: 'voucherImage', label: '凭证图片', type: 'upload', span: 2, placeholder: '' },
        { key: 'remark', label: '备注', type: 'textarea', span: 2, placeholder: '请输入备注' }
      ],
      actions: ['view', 'edit', 'delete']
    },
    performance: {
      route: '/pc/finance/performance',
      eyebrow: '财务管理',
      title: '人员业绩',
      intro: '统一展示销售人员、工程人员业绩表现，支撑经营复盘与绩效演示。',
      createLabel: '',
      idPrefix: 'JX-',
      filters: [
        { key: 'personType', label: '人员类型', type: 'select', options: function () { return ['销售人员', '工程人员']; }, placeholder: '全部类型' },
        { key: 'period', label: '统计周期', type: 'text', placeholder: '请输入统计周期' }
      ],
      columns: [
        { key: 'name', label: '姓名', link: true },
        { key: 'personType', label: '人员类型', badge: true },
        { key: 'department', label: '所属部门/小组' },
        { key: 'metric', label: '业绩指标' },
        { key: 'amount', label: '业绩数值' },
        { key: 'period', label: '统计周期' },
        { key: 'rank', label: '排名' }
      ],
      form: [
        { key: 'name', label: '姓名', type: 'text', required: true, placeholder: '' },
        { key: 'personType', label: '人员类型', type: 'text', required: true, placeholder: '' },
        { key: 'department', label: '所属部门/小组', type: 'text', required: true, placeholder: '' },
        { key: 'metric', label: '业绩指标', type: 'text', required: true, placeholder: '' },
        { key: 'amount', label: '业绩数值', type: 'text', required: true, placeholder: '' },
        { key: 'period', label: '统计周期', type: 'text', required: true, placeholder: '' },
        { key: 'rank', label: '排名', type: 'text', required: true, placeholder: '' }
      ],
      actions: ['view']
    }
  };

  function getManagedPageKeyByRoute(route) {
    var keys = Object.keys(managedPageConfigs);
    for (var index = 0; index < keys.length; index += 1) {
      if (managedPageConfigs[keys[index]].route === route) return keys[index];
    }
    return '';
  }

  function getManagedRows(key) {
    var state = getManagedState(key);
    var config = managedPageConfigs[key];
    var filters = state.filters;
    if (key === 'purchaseOrder') {
      return state.list.filter(function (item) {
        var createDate = safeText(item.createTime).slice(0, 10);
        if (filters.id && safeText(item.id).indexOf(safeText(filters.id).trim()) === -1) return false;
        if (filters.supplierName && safeText(item.supplierName).indexOf(safeText(filters.supplierName).trim()) === -1) return false;
        if (filters.status && safeText(item.status) !== safeText(filters.status)) return false;
        if (filters.inboundStatus && safeText(item.inboundStatus) !== safeText(filters.inboundStatus)) return false;
        if (filters.dateStart && createDate < safeText(filters.dateStart)) return false;
        if (filters.dateEnd && createDate > safeText(filters.dateEnd)) return false;
        return true;
      });
    }
    return state.list.filter(function (item) {
      return (config.filters || []).every(function (field) {
        var filterValue = safeText(filters[field.key]).trim();
        if (!filterValue) return true;
        return field.type === 'select' ? safeText(item[field.key]) === filterValue : safeText(item[field.key]).indexOf(filterValue) > -1;
      });
    });
  }

  function managedFieldOptions(field) {
    if (!field || !field.options) return [];
    return typeof field.options === 'function' ? field.options() : field.options;
  }

  function managedActionLabel(action) {
    if (typeof action === 'string') {
      return { view: '查看', edit: '编辑', delete: '删除' }[action] || action;
    }
    return action.label;
  }

  function getSupplierScoreRecords(item) {
    var supplierName = safeText(item && item.supplierName).trim();
    var supplierId = safeText(item && item.supplierId).trim();
    var stateRecords = (getManagedState('supplierScore').list || []);
    var sourceRecords = stateRecords.length ? stateRecords : (data.supplierScoreList || []);
    if (!supplierName && !supplierId) return [];
    return sourceRecords.filter(function (record) {
      var recordSupplierName = safeText(record.supplierName).trim();
      var recordSupplierId = safeText(record.supplierId).trim();
      return (supplierId && recordSupplierId === supplierId) || (supplierName && recordSupplierName === supplierName);
    }).sort(function (a, b) {
      return safeText(b.scoreTime).localeCompare(safeText(a.scoreTime));
    });
  }

  function supplierScoreRecordListHTML(item) {
    var records = getSupplierScoreRecords(item);
    var headerHTML = '<div class="score-record-grid score-record-grid-head"><span>分值</span><span>评分人</span><span>评分时间</span><span>备注</span></div>';
    var bodyHTML = records.length ? records.map(function (record) {
      return '<div class="score-record-grid score-record-grid-row"><span>' + escapeHtml(record.score || '-') + '</span><span>' + escapeHtml(record.assessor || '-') + '</span><span>' + escapeHtml(record.scoreTime || '-') + '</span><span>' + escapeHtml(record.remark || '-') + '</span></div>';
    }).join('') : '<div class="empty-state">暂无评分记录</div>';
    return '<div class="score-record-list">' + headerHTML + '<div class="score-record-list-body">' + bodyHTML + '</div></div>';
  }

  function purchaseOrderSupplierOptions() {
    return (data.supplierList || []).map(function (item) {
      return { value: item.name, label: item.name };
    });
  }

  function purchaseOrderCatalogList() {
    return (data.modelList || []).map(function (item) {
      return {
        category: item.category || '',
        brand: item.brand || '',
        model: item.model || ''
      };
    });
  }

  function uniquePurchaseFieldValues(field, filters) {
    var values = [];
    purchaseOrderCatalogList().forEach(function (item) {
      if (filters && filters.category && item.category !== filters.category) return;
      if (filters && filters.brand && item.brand !== filters.brand) return;
      if (values.indexOf(item[field]) === -1) values.push(item[field]);
    });
    return values;
  }

  function createEmptyPurchaseOrderDetail() {
    var first = purchaseOrderCatalogList()[0] || { category: '', brand: '', model: '' };
    return {
      category: first.category || '',
      brand: first.brand || '',
      model: first.model || '',
      qty: '',
      price: '',
      amount: ''
    };
  }

  function normalizePurchaseOrderDetails(details) {
    var rows = (details || []).map(function (detail) {
      return Object.assign({}, createEmptyPurchaseOrderDetail(), detail || {});
    });
    return rows.length ? rows : [createEmptyPurchaseOrderDetail()];
  }

  function purchaseOrderAmountValue(details) {
    return normalizePurchaseOrderDetails(details).reduce(function (sum, detail) {
      var qty = Number(detail.qty) || 0;
      var price = Number(detail.price) || 0;
      return sum + qty * price;
    }, 0);
  }

  function purchaseOrderAmountText(details) {
    return '¥' + purchaseOrderAmountValue(details).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function purchaseOrderIdPreview() {
    return managedPageConfigs.purchaseOrder.idPrefix + String(getManagedState('purchaseOrder').nextId).padStart(3, '0');
  }

  function purchaseOrderDetailRowHTML(detail, index, mode) {
    var readOnly = mode === 'view' || mode === 'approve' || mode === 'inbound';
    var hidePrice = mode === 'inbound';
    var fieldFilters = { category: detail.category || '', brand: detail.brand || '' };
    var categoryOptions = optionHTML(uniquePurchaseFieldValues('category'), detail.category || '', '请选择分类');
    var brandOptions = optionHTML(uniquePurchaseFieldValues('brand', { category: detail.category || '' }), detail.brand || '', '请选择品牌');
    var modelOptions = optionHTML(uniquePurchaseFieldValues('model', fieldFilters), detail.model || '', '请选择型号');
    var qty = Number(detail.qty) || 0;
    var price = Number(detail.price) || 0;
    var amount = qty * price;
    return '<div class="purchase-detail-grid purchase-detail-grid-row">' +
      '<div>' + (readOnly ? escapeHtml(detail.category || '-') : '<select class="mini-select purchase-detail-select" name="detail-category-' + index + '" data-purchase-detail-field="category" data-index="' + index + '">' + categoryOptions + '</select>') + '</div>' +
      '<div>' + (readOnly ? escapeHtml(detail.brand || '-') : '<select class="mini-select purchase-detail-select" name="detail-brand-' + index + '" data-purchase-detail-field="brand" data-index="' + index + '">' + brandOptions + '</select>') + '</div>' +
      '<div>' + (readOnly ? escapeHtml(detail.model || '-') : '<select class="mini-select purchase-detail-select" name="detail-model-' + index + '" data-purchase-detail-field="model" data-index="' + index + '">' + modelOptions + '</select>') + '</div>' +
      '<div>' + (readOnly ? escapeHtml(detail.qty || '-') : '<input class="mini-input mini-input-sm purchase-detail-input" type="number" min="0" step="1" name="detail-qty-' + index + '" data-purchase-calc="qty" data-index="' + index + '" value="' + escapeHtml(detail.qty || '') + '" placeholder="数量" />') + '</div>' +
      (hidePrice ? '' : '<div>' + (readOnly ? escapeHtml(detail.price || '-') : '<input class="mini-input purchase-detail-input" type="number" min="0" step="0.01" name="detail-price-' + index + '" data-purchase-calc="price" data-index="' + index + '" value="' + escapeHtml(detail.price || '') + '" placeholder="单价" />') + '</div>') +
      (hidePrice ? '' : '<div><span class="cost-amount" data-purchase-amount="' + index + '">' + (amount ? amount.toFixed(2) : escapeHtml(detail.amount || '-')) + '</span></div>') +
      (!readOnly ? '<div><button type="button" class="link-btn danger-link" data-action="managed-purchase-remove-detail" data-index="' + index + '">删除</button></div>' : '') +
      '</div>';
  }

  function purchaseOrderDetailTableHTML(item, mode) {
    var details = normalizePurchaseOrderDetails(item.details);
    var hidePrice = mode === 'inbound';
    var head = '<div class="purchase-detail-grid purchase-detail-grid-head"><span>分类</span><span>品牌</span><span>型号</span><span>数量</span>' + (hidePrice ? '' : '<span>单价</span><span>合价</span>') + (mode === 'view' || mode === 'approve' || mode === 'inbound' ? '' : '<span>操作</span>') + '</div>';
    var body = details.map(function (detail, index) { return purchaseOrderDetailRowHTML(detail, index, mode); }).join('');
    var footer = hidePrice ? '' : '<div class="purchase-detail-grid purchase-detail-grid-foot"><span class="purchase-detail-total-label">采购金额</span><span class="purchase-detail-total-value" data-purchase-total>' + purchaseOrderAmountValue(details).toFixed(2) + '</span></div>';
    return '<div class="purchase-detail-list">' + head + '<div class="purchase-detail-list-body">' + body + '</div>' + footer + '</div>' +
      ((mode === 'create' || mode === 'edit') ? '<div class="purchase-detail-actions"><button type="button" class="btn secondary" data-action="managed-purchase-add-detail">新增明细</button></div>' : '');
  }

  function purchaseOrderModalHTML(item, modal) {
    var mode = modal.mode;
    var readOnly = mode === 'view' || mode === 'approve' || mode === 'inbound';
    var titleMap = { create: '新增采购单', edit: '编辑采购单', view: '采购单详情', approve: '采购单审核', inbound: '采购单入库' };
    var supplierOptions = mappedOptionHTML(purchaseOrderSupplierOptions(), item.supplierName || '', '请选择供应商');
    var formTitle = titleMap[mode] || '采购单';
    var details = normalizePurchaseOrderDetails(item.details);
    var amountText = purchaseOrderAmountText(details);
    var approvalHTML = (item.approvalRecords && item.approvalRecords.length) ? detailFlowRecordHTML('流转记录', '展示单据创建、编辑、审批等流转过程', approvalTimelineHTML(normalizeDetailFlowRecords(item.approvalRecords || [], item)).replace('暂无审批记录', '暂无流转记录')) : '';
    return '<div class="modal-mask" data-action="managed-modal-close" data-managed-key="purchaseOrder"><div class="modal-card customer-modal purchase-order-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + formTitle + '</h3><p>支持采购明细维护、审核和入库处理</p></div><button class="icon-btn" data-action="managed-modal-close" data-managed-key="purchaseOrder">×</button></div><form id="managed-form" class="modal-body" data-managed-key="purchaseOrder"><div class="modal-section"><h4>基础信息</h4><div class="modal-grid modal-grid-2"><label class="field modal-field"><span>采购单编号</span><input disabled value="' + escapeHtml(item.id || purchaseOrderIdPreview()) + '" /></label><label class="field modal-field"><span>供应商名称 <em>*</em></span><select name="supplierName" ' + (readOnly ? 'disabled ' : '') + '>' + supplierOptions + '</select></label><label class="field modal-field"><span>采购金额</span><input name="amountDisplay" disabled value="' + escapeHtml(amountText) + '" data-purchase-amount-display /></label><label class="field modal-field"><span>创建人</span><input ' + (readOnly ? 'disabled ' : '') + 'name="creator" value="' + escapeHtml(item.creator || '系统管理员') + '" placeholder="请输入创建人" /></label></div></div><div class="modal-section"><h4>采购明细列表</h4>' + purchaseOrderDetailTableHTML(item, mode) + '</div>' + approvalHTML + (mode === 'approve' ? '<div class="approval-box"><label class="field field-span-2"><span>审核意见</span><textarea name="approvalRemark" placeholder="同意可填写审核意见，驳回请填写原因">' + escapeHtml(item.approvalRemark || '') + '</textarea></label></div>' : '') + '<div class="modal-footer">' +
      (mode === 'approve'
        ? '<button type="button" class="btn primary" data-action="managed-purchase-approve-confirm" data-id="' + escapeHtml(item.id) + '">同意</button><button type="button" class="btn secondary danger-link" data-action="managed-purchase-reject-confirm" data-id="' + escapeHtml(item.id) + '">驳回</button>'
        : mode === 'inbound'
          ? '<button type="button" class="btn primary" data-action="managed-purchase-inbound-confirm" data-id="' + escapeHtml(item.id) + '">入库</button>'
          : readOnly
            ? ''
            : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="managed-modal-close" data-managed-key="purchaseOrder">关闭</button></div></form></div></div>';
  }

  function getFilteredModelBrands() {
    ensureModelStateInitialized();
    var state = getManagedState('model');
    var keyword = safeText(state.filters.brandKeyword).trim();
    if (!keyword) return state.brandList;
    return state.brandList.filter(function (item) {
      return safeText(item.brand).indexOf(keyword) > -1 || safeText(item.category).indexOf(keyword) > -1;
    });
  }

  function getSelectedModelBrand() {
    ensureModelStateInitialized();
    var state = getManagedState('model');
    return state.brandList.find(function (item) { return item.id === state.selectedBrandId; }) || state.brandList[0] || null;
  }

  function getFilteredModelRows() {
    ensureModelStateInitialized();
    var state = getManagedState('model');
    var selectedBrand = getSelectedModelBrand();
    var modelKeyword = safeText(state.filters.modelKeyword).trim();
    return state.list.filter(function (item) {
      if (selectedBrand && (item.brand !== selectedBrand.brand || item.category !== selectedBrand.category)) return false;
      if (modelKeyword && safeText(item.model).indexOf(modelKeyword) === -1) return false;
      return true;
    });
  }

  function syncModelBrandSelection() {
    ensureModelStateInitialized();
    var state = getManagedState('model');
    var exists = state.brandList.some(function (item) { return item.id === state.selectedBrandId; });
    if (!exists) state.selectedBrandId = state.brandList[0] ? state.brandList[0].id : '';
  }

  function refreshModelBrandList() {
    var state = getManagedState('model');
    var manualBrandList = (state.brandList || []).filter(function (item) {
      return !state.list.some(function (row) {
        return row.category === item.category && row.brand === item.brand;
      });
    });
    state.brandList = buildModelBrandList(state.list).concat(manualBrandList);
    state.nextBrandId = state.brandList.length + 1;
    syncModelBrandSelection();
  }

  function modelBrandTreeHTML() {
    var brands = getFilteredModelBrands();
    var selectedBrand = getSelectedModelBrand();
    var grouped = {};
    brands.forEach(function (item) {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });
    return '<div class="panel model-brand-panel"><div class="panel-header"><div><h3>分类 / 品牌</h3><p>支持品牌新增、编辑、删除与检索</p></div><button class="btn secondary model-brand-create-btn" data-action="model-brand-create">新增品牌</button></div><div class="model-brand-search"><input data-model-brand-filter="brandKeyword" value="' + escapeHtml(getManagedState('model').filters.brandKeyword || '') + '" placeholder="请输入品牌/分类检索" /></div><div class="model-brand-tree">' +
      (Object.keys(grouped).map(function (category) {
        return '<div class="model-brand-group"><div class="model-brand-group-title">' + escapeHtml(category) + '</div><div class="model-brand-list">' +
          grouped[category].map(function (item) {
            var active = selectedBrand && selectedBrand.id === item.id ? ' active' : '';
            return '<div class="model-brand-item' + active + '"><button class="model-brand-main" data-action="model-brand-select" data-id="' + item.id + '">' + escapeHtml(item.brand) + '</button><div class="model-brand-actions"><button class="model-brand-icon-btn" title="编辑" aria-label="编辑" data-action="model-brand-edit" data-id="' + item.id + '">✎</button><button class="model-brand-icon-btn danger" title="删除" aria-label="删除" data-action="model-brand-delete" data-id="' + item.id + '">🗑</button></div></div>';
          }).join('') +
          '</div></div>';
      }).join('') || '<div class="empty-state">暂无品牌数据</div>') +
      '</div></div>';
  }

  function modelTableHTML() {
    var selectedBrand = getSelectedModelBrand();
    var rows = getFilteredModelRows();
    return '<div class="panel model-list-panel"><div class="panel-header"><div><h3>型号列表</h3><p>' + (selectedBrand ? (escapeHtml(selectedBrand.category) + ' / ' + escapeHtml(selectedBrand.brand)) : '请选择左侧品牌') + '</p></div><div class="toolbar"><input class="toolbar-search" data-model-brand-filter="modelKeyword" value="' + escapeHtml(getManagedState('model').filters.modelKeyword || '') + '" placeholder="搜索型号" />' + (selectedBrand ? '<button class="btn primary" data-action="model-create">新增型号</button>' : '<button class="btn primary" disabled>新增型号</button>') + '</div></div><table class="data-table customer-table"><thead><tr><th>设备分类</th><th>品牌</th><th>型号</th><th>操作</th></tr></thead><tbody>' +
      ((rows.map(function (item) {
        return '<tr><td>' + escapeHtml(item.category || '-') + '</td><td>' + escapeHtml(item.brand || '-') + '</td><td><button class="text-link" data-action="model-view" data-id="' + item.id + '">' + escapeHtml(item.model || '-') + '</button></td><td><div class="table-actions"><button class="link-btn" data-action="model-view" data-id="' + item.id + '">查看</button><button class="link-btn" data-action="model-edit" data-id="' + item.id + '">编辑</button><button class="link-btn danger-link" data-action="model-delete" data-id="' + item.id + '">删除</button></div></td></tr>';
      }).join('')) || '<tr><td colspan="4"><div class="empty-state">暂无型号数据</div></td></tr>') +
      '</tbody></table></div>';
  }

  function modelBrandModalHTML() {
    var state = getManagedState('model');
    var modal = state.brandModal;
    if (!modal) return '';
    var item = modal.item || {};
    var title = modal.mode === 'edit' ? '编辑品牌' : '新增品牌';
    return '<div class="modal-mask" data-action="model-brand-modal-close"><div class="modal-card customer-modal model-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + title + '</h3><p>维护设备分类与品牌信息</p></div><button class="icon-btn" data-action="model-brand-modal-close">×</button></div><form id="model-brand-form" class="modal-body"><div class="modal-grid modal-grid-2"><label class="field modal-field"><span>分类 <em>*</em></span><select name="category">' + optionHTML(data.modelOptions.categories, item.category || '', '请选择分类') + '</select></label><label class="field modal-field"><span>品牌 <em>*</em></span><input name="brand" value="' + escapeHtml(item.brand || '') + '" placeholder="请输入品牌" /></label></div><div class="modal-footer"><button type="submit" class="btn primary">保存</button><button type="button" class="btn secondary" data-action="model-brand-modal-close">关闭</button></div></form></div></div>';
  }

  function modelModalHTML() {
    var state = getManagedState('model');
    var modal = state.modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view';
    var selectedBrand = getSelectedModelBrand();
    var title = modal.mode === 'edit' ? '编辑型号' : modal.mode === 'view' ? '查看型号' : '新增型号';
    var availableBrands = (state.brandList || []).filter(function (brandItem) {
      return !item.category || brandItem.category === item.category;
    }).map(function (brandItem) {
      return { value: brandItem.brand, label: brandItem.brand };
    });
    if (!availableBrands.length && selectedBrand) {
      availableBrands = [{ value: selectedBrand.brand, label: selectedBrand.brand }];
    }
    return '<div class="modal-mask" data-action="model-modal-close"><div class="modal-card customer-modal model-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + title + '</h3><p>维护品牌下设备型号信息</p></div><button class="icon-btn" data-action="model-modal-close">×</button></div><form id="model-form" class="modal-body"><div class="modal-grid modal-grid-2"><label class="field modal-field"><span>分类 <em>*</em></span><select name="category" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(data.modelOptions.categories, item.category || (selectedBrand ? selectedBrand.category : ''), '请选择分类') + '</select></label><label class="field modal-field"><span>品牌 <em>*</em></span><select name="brand" ' + (readOnly ? 'disabled ' : '') + '>' + mappedOptionHTML(availableBrands, item.brand || (selectedBrand ? selectedBrand.brand : ''), '请选择品牌') + '</select></label><label class="field modal-field field-span-2"><span>型号 <em>*</em></span><input name="model" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.model || '') + '" placeholder="请输入型号" /></label><label class="field modal-field field-span-2"><span>低库存预警</span><input name="lowStockWarning" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.lowStockWarning || '') + '" placeholder="请输入低库存预警" /></label></div><div class="modal-footer">' + (readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') + '<button type="button" class="btn secondary" data-action="model-modal-close">关闭</button></div></form></div></div>';
  }

  function modelManagementPageHTML() {
    ensureModelStateInitialized();
    syncModelBrandSelection();
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">设备管理</div><h2>型号管理</h2><p>支持设备品牌新增、编辑、删除、检索，并在品牌下维护设备型号。</p></div></div><div class="model-layout">' + modelBrandTreeHTML() + modelTableHTML() + '</div>' + modelBrandModalHTML() + modelModalHTML();
  }

  function getDeviceArchiveStats() {
    var list = getManagedState('deviceArchive').list || [];
    function count(status) {
      return list.filter(function (item) { return item.status === status; }).length;
    }
    return [
      { label: '设备总数', value: list.length, tone: '' },
      { label: '在用设备', value: count('在用设备'), tone: 'success' },
      { label: '闲置设备', value: count('闲置设备'), tone: '' },
      { label: '返修设备', value: count('返修设备'), tone: 'warning' },
      { label: '报废中设备', value: count('报废中设备'), tone: 'danger' },
      { label: '已报废设备', value: count('已报废设备'), tone: 'danger' }
    ];
  }

  function getFilteredDeviceArchiveRows() {
    var state = getManagedState('deviceArchive');
    var filters = state.filters || {};
    return (state.list || []).filter(function (item) {
      if (filters.name && safeText(item.name).indexOf(safeText(filters.name).trim()) === -1) return false;
      if (filters.code && safeText(item.code).indexOf(safeText(filters.code).trim()) === -1) return false;
      if (filters.brand && safeText(item.brand).indexOf(safeText(filters.brand).trim()) === -1) return false;
      if (filters.model && safeText(item.model).indexOf(safeText(filters.model).trim()) === -1) return false;
      if (filters.category && safeText(item.category) !== safeText(filters.category)) return false;
      if (filters.status && safeText(item.status) !== safeText(filters.status)) return false;
      return true;
    });
  }

  function deviceArchiveStatsHTML() {
    return '<div class="stats-grid device-archive-stats">' + getDeviceArchiveStats().map(function (item) {
      return '<div class="stat-card' + (item.tone ? ' tone-' + item.tone : '') + '"><div class="stat-title">' + item.label + '</div><div class="stat-value">' + item.value + '</div><div class="stat-desc">消防设备状态统计</div></div>';
    }).join('') + '</div>';
  }

  function deviceArchiveFiltersHTML() {
    var filters = getManagedState('deviceArchive').filters;
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid device-archive-filter-grid">' +
      '<label class="field"><span>设备名称</span><input data-device-archive-filter="name" value="' + escapeHtml(filters.name || '') + '" placeholder="请输入设备名称" /></label>' +
      '<label class="field"><span>设备编号</span><input data-device-archive-filter="code" value="' + escapeHtml(filters.code || '') + '" placeholder="请输入设备编号" /></label>' +
      '<label class="field"><span>品牌</span><input data-device-archive-filter="brand" value="' + escapeHtml(filters.brand || '') + '" placeholder="请输入品牌" /></label>' +
      '<label class="field"><span>型号</span><input data-device-archive-filter="model" value="' + escapeHtml(filters.model || '') + '" placeholder="请输入型号" /></label>' +
      '<label class="field"><span>分类</span><select data-device-archive-filter="category">' + optionHTML(data.modelOptions.categories, filters.category, '全部分类') + '</select></label>' +
      '<label class="field"><span>状态</span><select data-device-archive-filter="status">' + optionHTML(data.deviceArchiveOptions.statuses, filters.status, '全部状态') + '</select></label>' +
      '<div class="filter-actions"><button class="btn secondary" data-action="device-archive-reset">重置</button><button class="btn primary" data-action="device-archive-search">查询</button></div>' +
      '</div></div>';
  }

  function deviceArchiveTableHTML() {
    var rows = getFilteredDeviceArchiveRows();
    return '<div class="panel table-panel customer-table-panel"><div class="panel-header"><div><h3>设备档案列表</h3><p>共 ' + rows.length + ' 台设备，支持消防设备档案查看与编辑。</p></div></div><table class="data-table customer-table"><thead><tr><th>设备名称</th><th>设备编号</th><th>分类</th><th>品牌</th><th>型号</th><th>状态</th><th>批次</th><th>采购价</th><th>操作</th></tr></thead><tbody>' +
      ((rows.map(function (item) {
        return '<tr><td><button class="text-link" data-action="device-archive-view" data-id="' + item.id + '">' + escapeHtml(item.name || '-') + '</button></td><td>' + escapeHtml(item.code || '-') + '</td><td>' + escapeHtml(item.category || '-') + '</td><td>' + escapeHtml(item.brand || '-') + '</td><td>' + escapeHtml(item.model || '-') + '</td><td><span class="status ' + badgeClass(item.status) + '">' + escapeHtml(item.status || '-') + '</span></td><td>' + escapeHtml(item.batch || '-') + '</td><td>' + escapeHtml(item.purchasePrice || '-') + '</td><td><div class="table-actions"><button class="link-btn" data-action="device-archive-view" data-id="' + item.id + '">查看</button><button class="link-btn" data-action="device-archive-edit" data-id="' + item.id + '">编辑</button></div></td></tr>';
      }).join('')) || '<tr><td colspan="9"><div class="empty-state">未查询到符合条件的设备档案</div></td></tr>') +
      '</tbody></table></div>';
  }

  function deviceArchiveModalHTML() {
    var modal = getManagedState('deviceArchive').modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'edit' ? '编辑设备档案' : '设备档案详情';
    return '<div class="modal-mask" data-action="device-archive-modal-close"><div class="modal-card customer-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + title + '</h3><p>维护消防设备基础档案信息</p></div><button class="icon-btn" data-action="device-archive-modal-close">×</button></div><form id="device-archive-form" class="modal-body"><div class="modal-grid modal-grid-2">' +
      '<label class="field modal-field"><span>设备编码</span><input name="code" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.code || '') + '" placeholder="请输入设备编码" /></label>' +
      '<label class="field modal-field"><span>设备名称</span><input name="name" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.name || '') + '" placeholder="请输入设备名称" /></label>' +
      '<label class="field modal-field"><span>分类</span><input disabled value="' + escapeHtml(item.category || '-') + '" /></label>' +
      '<label class="field modal-field"><span>品牌</span><input disabled value="' + escapeHtml(item.brand || '-') + '" /></label>' +
      '<label class="field modal-field"><span>型号</span><input disabled value="' + escapeHtml(item.model || '-') + '" /></label>' +
      '<label class="field modal-field"><span>状态</span><input disabled value="' + escapeHtml(item.status || '-') + '" /></label>' +
      '<label class="field modal-field"><span>采购价</span><input disabled value="' + escapeHtml(item.purchasePrice || '-') + '" /></label>' +
      '<label class="field modal-field"><span>保管位置</span><input disabled value="' + escapeHtml(item.warehouse || '-') + '" /></label>' +
      '</div><div class="modal-footer">' + (readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') + '<button type="button" class="btn secondary" data-action="device-archive-modal-close">关闭</button></div></form></div></div>';
  }

  function deviceArchivePageHTML() {
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">设备管理</div><h2>设备档案</h2><p>支持消防设备档案检索、查看、编辑及状态统计。</p></div></div>' + deviceArchiveStatsHTML() + deviceArchiveFiltersHTML() + deviceArchiveTableHTML() + deviceArchiveModalHTML();
  }

  function getInventoryAggregateRows() {
    var inventoryState = getManagedState('inventory');
    var filters = inventoryState.filters || {};
    var idleDevices = (getManagedState('deviceArchive').list || []).filter(function (item) {
      return item.status === '闲置设备';
    });
    var grouped = {};
    (data.modelList || []).forEach(function (modelItem) {
      var groupKey = [modelItem.category, modelItem.brand, modelItem.model].join('::');
      if (!grouped[groupKey]) {
        grouped[groupKey] = {
          id: 'INV-' + modelItem.id,
          category: modelItem.category || '',
          brand: modelItem.brand || '',
          model: modelItem.model || '',
          lowStockWarning: modelItem.lowStockWarning || '',
          stockStatus: '无库存',
          devices: []
        };
      }
    });
    idleDevices.forEach(function (item) {
      var key = [item.category, item.brand, item.model].join('::');
      if (!grouped[key]) {
        grouped[key] = {
          id: 'INV-' + item.id,
          category: item.category || '',
          brand: item.brand || '',
          model: item.model || '',
          lowStockWarning: '',
          stockStatus: '有库存',
          devices: []
        };
      }
      grouped[key].devices.push(Object.assign({}, item));
      grouped[key].stockStatus = '有库存';
    });
    return Object.keys(grouped).map(function (key) {
      var row = grouped[key];
      row.idleQty = row.devices.length;
      row.isLowStockWarning = !!row.lowStockWarning && Number(row.idleQty || 0) <= Number(row.lowStockWarning);
      return row;
    }).filter(function (row) {
      if (filters.brand && safeText(row.brand).indexOf(safeText(filters.brand).trim()) === -1) return false;
      if (filters.model && safeText(row.model).indexOf(safeText(filters.model).trim()) === -1) return false;
      if (filters.category && safeText(row.category) !== safeText(filters.category)) return false;
      if (filters.stockStatus && safeText(row.stockStatus) !== safeText(filters.stockStatus)) return false;
      return true;
    });
  }

  function inventoryFiltersHTML() {
    var filters = getManagedState('inventory').filters;
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid inventory-filter-grid">' +
      '<label class="field"><span>品牌</span><input data-inventory-filter="brand" value="' + escapeHtml(filters.brand || '') + '" placeholder="请输入品牌" /></label>' +
      '<label class="field"><span>型号</span><input data-inventory-filter="model" value="' + escapeHtml(filters.model || '') + '" placeholder="请输入型号" /></label>' +
      '<label class="field"><span>设备类型</span><select data-inventory-filter="category">' + optionHTML(data.modelOptions.categories, filters.category, '全部设备类型') + '</select></label>' +
      '<label class="field"><span>库存状态</span><select data-inventory-filter="stockStatus">' + optionHTML(['有库存', '无库存'], filters.stockStatus, '全部库存状态') + '</select></label>' +
      '<div class="filter-actions"><button class="btn secondary" data-action="inventory-reset">重置</button><button class="btn primary" data-action="inventory-search">查询</button></div>' +
      '</div></div>';
  }

  function inventoryTableHTML() {
    var rows = getInventoryAggregateRows();
    return '<div class="panel table-panel customer-table-panel"><div class="panel-header"><div><h3>设备库存列表</h3><p>按型号统计闲置状态设备数量，可查看库存设备清单。</p></div></div><table class="data-table customer-table"><thead><tr><th>分类</th><th>品牌</th><th>型号</th><th>库存数量</th><th>操作</th></tr></thead><tbody>' +
      ((rows.map(function (item) {
        var qtyHtml = item.isLowStockWarning
          ? '<span class="status warning inventory-low-stock-badge" title="低库存预警：阈值 ' + escapeHtml(item.lowStockWarning) + '">' + escapeHtml(String(item.idleQty || 0)) + '台 · 低库存预警</span>'
          : escapeHtml(String(item.idleQty || 0)) + '台';
        return '<tr class="' + (item.isLowStockWarning ? 'inventory-low-stock-row' : '') + '"><td>' + escapeHtml(item.category || '-') + '</td><td>' + escapeHtml(item.brand || '-') + '</td><td>' + escapeHtml(item.model || '-') + '</td><td>' + qtyHtml + '</td><td><div class="table-actions"><button class="link-btn" data-action="inventory-stock-list" data-id="' + escapeHtml(item.id) + '">库存清单</button></div></td></tr>';
      }).join('')) || '<tr><td colspan="5"><div class="empty-state">未查询到符合条件的库存型号</div></td></tr>') +
      '</tbody></table></div>';
  }

  function getInventoryModalRows() {
    var state = getManagedState('inventory');
    var modal = state.modal;
    if (!modal || !modal.item) return [];
    var filters = state.stockFilters || {};
    return (modal.item.devices || []).filter(function (item) {
      if (filters.code && safeText(item.code).indexOf(safeText(filters.code).trim()) === -1) return false;
      if (filters.category && safeText(item.category).indexOf(safeText(filters.category).trim()) === -1) return false;
      if (filters.brand && safeText(item.brand).indexOf(safeText(filters.brand).trim()) === -1) return false;
      return true;
    });
  }

  function inventoryModalHTML() {
    var state = getManagedState('inventory');
    var modal = state.modal;
    if (!modal || !modal.item) return '';
    var filters = state.stockFilters || {};
    var rows = getInventoryModalRows();
    return '<div class="modal-mask" data-action="inventory-modal-close"><div class="modal-card customer-modal inventory-modal" data-stop-close="1"><div class="modal-header"><div><h3>库存设备清单</h3><p>' + escapeHtml(modal.item.category || '-') + ' / ' + escapeHtml(modal.item.brand || '-') + ' / ' + escapeHtml(modal.item.model || '-') + '</p></div><button class="icon-btn" data-action="inventory-modal-close">×</button></div><div class="modal-body"><div class="panel filter-panel inventory-stock-filter"><div class="filter-grid inventory-stock-filter-grid"><label class="field"><span>设备编码</span><input data-inventory-stock-filter="code" value="' + escapeHtml(filters.code || '') + '" placeholder="请输入设备编码" /></label><label class="field"><span>分类</span><input data-inventory-stock-filter="category" value="' + escapeHtml(filters.category || '') + '" placeholder="请输入分类" /></label><label class="field"><span>品牌</span><input data-inventory-stock-filter="brand" value="' + escapeHtml(filters.brand || '') + '" placeholder="请输入品牌" /></label><div class="filter-actions"><button class="btn secondary" data-action="inventory-stock-reset">重置</button><button class="btn primary" data-action="inventory-stock-search">查询</button></div></div></div><div class="cost-table-wrap inventory-stock-wrap"><table class="data-table customer-table"><thead><tr><th>设备编码</th><th>设备名称</th><th>分类</th><th>品牌</th><th>批次</th><th>采购价</th></tr></thead><tbody>' +
      ((rows.map(function (item) {
        return '<tr><td>' + escapeHtml(item.code || '-') + '</td><td>' + escapeHtml(item.name || '-') + '</td><td>' + escapeHtml(item.category || '-') + '</td><td>' + escapeHtml(item.brand || '-') + '</td><td>' + escapeHtml(item.batch || '-') + '</td><td>' + escapeHtml(item.purchasePrice || '-') + '</td></tr>';
      }).join('')) || '<tr><td colspan="6"><div class="empty-state">暂无库存设备</div></td></tr>') +
      '</tbody></table></div></div><div class="modal-footer"><button type="button" class="btn secondary" data-action="inventory-modal-close">关闭</button></div></div></div>';
  }

  function inventoryPageHTML() {
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">设备管理</div><h2>设备库存</h2><p>按型号统计闲置状态设备数量，支持查看各型号库存设备清单。</p></div></div>' + inventoryFiltersHTML() + inventoryTableHTML() + inventoryModalHTML();
  }

  function deviceReceiveNeedOptions() {
    return data.modelOptions.categories || [];
  }

  function deviceReceiveBrandOptions(category) {
    var values = [];
    (data.modelList || []).forEach(function (item) {
      if (category && item.category !== category) return;
      if (values.indexOf(item.brand) === -1) values.push(item.brand);
    });
    return values;
  }

  function deviceReceiveModelOptions(category, brand) {
    var values = [];
    (data.modelList || []).forEach(function (item) {
      if (category && item.category !== category) return;
      if (brand && item.brand !== brand) return;
      if (values.indexOf(item.model) === -1) values.push(item.model);
    });
    return values;
  }

  function createDeviceReceiveNeed(need) {
    var category = (need && need.category) || deviceReceiveNeedOptions()[0] || '';
    var brand = (need && need.brand) || deviceReceiveBrandOptions(category)[0] || '';
    var model = (need && need.model) || deviceReceiveModelOptions(category, brand)[0] || '';
    var selectedDevices = ((need && need.selectedDevices) || []).map(function (device) { return Object.assign({}, device); });
    var outboundQty = need && need.outboundQty !== undefined && need.outboundQty !== null && need.outboundQty !== '' ? String(need.outboundQty) : (selectedDevices.length ? String(selectedDevices.length) : '');
    return {
      category: category,
      brand: brand,
      model: model,
      qty: (need && need.qty) || '',
      outboundQty: outboundQty,
      selectedDevices: selectedDevices
    };
  }

  function normalizeDeviceReceiveCards(cards) {
    var defaultProject = getAllProjectItems(getProjectArchiveState().tree)[0] || { id: '', name: '' };
    var normalized = (cards || []).map(function (card) {
        return {
          projectId: card.projectId || defaultProject.id,
          projectName: card.projectName || defaultProject.name,
          needs: (card.needs || []).map(function (need) { return createDeviceReceiveNeed(need); })
        };
      });
      return normalized.length ? normalized : [{
        projectId: defaultProject.id,
        projectName: defaultProject.name,
        needs: [createDeviceReceiveNeed()]
      }];
    }

  function buildDeviceReceiveSummary(cards) {
    var normalized = normalizeDeviceReceiveCards(cards);
    var totalQty = normalized.reduce(function (sum, card) {
      return sum + (card.needs || []).reduce(function (cardSum, need) { return cardSum + (Number(need.qty) || 0); }, 0);
    }, 0);
    return {
      projectNames: normalized.map(function (card) { return card.projectName; }).join('、'),
      qtySummary: normalized.length + '个项目 / ' + totalQty + '台设备'
    };
  }

  function getFilteredDeviceReceiveRows() {
    var state = getManagedState('deviceReceive');
    var filters = state.filters || {};
    return (state.list || []).filter(function (item) {
      var createDate = safeText(item.createTime).slice(0, 10);
      if (filters.id && safeText(item.id).indexOf(safeText(filters.id).trim()) === -1) return false;
      if (filters.creator && safeText(item.creator).indexOf(safeText(filters.creator).trim()) === -1) return false;
      if (filters.createTime && createDate !== safeText(filters.createTime)) return false;
      if (filters.status && safeText(item.status) !== safeText(filters.status)) return false;
      if (filters.dateStart && createDate < safeText(filters.dateStart)) return false;
      if (filters.dateEnd && createDate > safeText(filters.dateEnd)) return false;
      return true;
    });
  }

  function deviceReceiveFiltersHTML() {
    var filters = getManagedState('deviceReceive').filters;
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid device-receive-filter-grid">' +
      '<label class="field"><span>单据编号</span><input data-device-receive-filter="id" value="' + escapeHtml(filters.id || '') + '" placeholder="请输入单据编号" /></label>' +
      '<label class="field"><span>创建人</span><input data-device-receive-filter="creator" value="' + escapeHtml(filters.creator || '') + '" placeholder="请输入创建人" /></label>' +
      '<label class="field"><span>创建时间</span><input type="date" data-device-receive-filter="createTime" value="' + escapeHtml(filters.createTime || '') + '" /></label>' +
      '<label class="field"><span>状态</span><select data-device-receive-filter="status">' + optionHTML(['待审核', '待出库', '已出库', '已撤销'], filters.status, '全部状态') + '</select></label>' +
      '<label class="field"><span>开始时间</span><input type="date" data-device-receive-filter="dateStart" value="' + escapeHtml(filters.dateStart || '') + '" /></label>' +
      '<label class="field"><span>结束时间</span><input type="date" data-device-receive-filter="dateEnd" value="' + escapeHtml(filters.dateEnd || '') + '" /></label>' +
      '<div class="filter-actions"><button class="btn secondary" data-action="device-receive-reset">重置</button><button class="btn primary" data-action="device-receive-search">查询</button></div>' +
      '</div></div>';
  }

  function deviceReceiveTableHTML() {
    var rows = getFilteredDeviceReceiveRows();
    return '<div class="panel table-panel customer-table-panel"><div class="panel-header"><div><h3>设备领用列表</h3><p>共 ' + rows.length + ' 条领用单据，支持审批、出库与撤销。</p></div><div class="toolbar"><button class="btn primary" data-action="device-receive-create">新增领用单</button></div></div><table class="data-table customer-table"><thead><tr><th>单据编号</th><th>创建人</th><th>创建时间</th><th>所属项目</th><th>领用设备数量状态</th><th>状态</th><th>操作</th></tr></thead><tbody>' +
      ((rows.map(function (item) {
        return '<tr><td><button class="text-link" data-action="device-receive-view" data-id="' + item.id + '">' + escapeHtml(item.id || '-') + '</button></td><td>' + escapeHtml(item.creator || '-') + '</td><td>' + escapeHtml(item.createTime || '-') + '</td><td>' + escapeHtml(item.projectNames || '-') + '</td><td>' + escapeHtml(item.qtySummary || '-') + '</td><td><span class="status ' + badgeClass(item.status) + '">' + escapeHtml(item.status || '-') + '</span></td><td><div class="table-actions"><button class="link-btn" data-action="device-receive-view" data-id="' + item.id + '">查看</button><button class="link-btn" data-action="device-receive-edit" data-id="' + item.id + '">编辑</button><button class="link-btn danger-link" data-action="device-receive-delete" data-id="' + item.id + '">删除</button><button class="link-btn danger-link" data-action="device-receive-revoke" data-id="' + item.id + '">撤销</button><button class="link-btn" data-action="device-receive-outbound" data-id="' + item.id + '">出库</button></div></td></tr>';
      }).join('')) || '<tr><td colspan="7"><div class="empty-state">未查询到符合条件的领用单据</div></td></tr>') +
      '</tbody></table></div>';
  }

  function syncDeviceReceiveOutboundQty(need) {
    if (!need) return;
    need.outboundQty = need.selectedDevices && need.selectedDevices.length ? String(need.selectedDevices.length) : '';
  }

  function getDeviceReceiveNeed(cardIndex, needIndex) {
    var modal = getManagedState('deviceReceive').modal;
    if (!modal || !modal.item || !modal.item.projectCards || !modal.item.projectCards[cardIndex]) return null;
    return modal.item.projectCards[cardIndex].needs[needIndex] || null;
  }

  function getDeviceReceiveSelectedDeviceIds(currentCardIndex, currentNeedIndex) {
    var modal = getManagedState('deviceReceive').modal;
    var selectedIds = [];
    if (!modal || !modal.item || !modal.item.projectCards) return selectedIds;
    (modal.item.projectCards || []).forEach(function (card, cardIndex) {
      (card.needs || []).forEach(function (need, needIndex) {
        if (cardIndex === currentCardIndex && needIndex === currentNeedIndex) return;
        ((need && need.selectedDevices) || []).forEach(function (device) {
          if (device && device.id) selectedIds.push(device.id);
        });
      });
    });
    return selectedIds;
  }

  function getSelectableOutboundDevices(cardIndex, needIndex) {
    var need = getDeviceReceiveNeed(cardIndex, needIndex);
    if (!need) return [];
    var occupiedIds = getDeviceReceiveSelectedDeviceIds(cardIndex, needIndex);
    var currentIds = ((need.selectedDevices) || []).map(function (device) { return device.id; });
    return (getManagedState('deviceArchive').list || []).filter(function (item) {
      if (item.status !== '闲置设备') return false;
      if (need.category && item.category !== need.category) return false;
      if (need.brand && item.brand !== need.brand) return false;
      if (need.model && item.model !== need.model) return false;
      if (occupiedIds.indexOf(item.id) > -1 && currentIds.indexOf(item.id) === -1) return false;
      return true;
    });
  }

  function deviceReceiveNeedRowHTML(need, cardIndex, needIndex, mode) {
    var readOnly = mode === 'view' || mode === 'approve';
    var outboundMode = mode === 'outbound';
    var fieldReadOnly = readOnly || outboundMode;
    var category = need.category || deviceReceiveNeedOptions()[0] || '';
    var brand = need.brand || deviceReceiveBrandOptions(category)[0] || '';
    var model = need.model || deviceReceiveModelOptions(category, brand)[0] || '';
    var selectedCount = ((need.selectedDevices) || []).length;
    var outboundQty = need.outboundQty || (selectedCount ? String(selectedCount) : '');
    return '<div class="device-receive-need-row">' +
      '<div>' + (fieldReadOnly ? escapeHtml(category || '-') : '<select name="card-' + cardIndex + '-need-category-' + needIndex + '" data-receive-card="' + cardIndex + '" data-receive-need="' + needIndex + '" data-receive-field="category">' + optionHTML(deviceReceiveNeedOptions(), category, '请选择分类') + '</select>') + '</div>' +
      '<div>' + (fieldReadOnly ? escapeHtml(brand || '-') : '<select name="card-' + cardIndex + '-need-brand-' + needIndex + '" data-receive-card="' + cardIndex + '" data-receive-need="' + needIndex + '" data-receive-field="brand">' + optionHTML(deviceReceiveBrandOptions(category), brand, '请选择品牌') + '</select>') + '</div>' +
      '<div>' + (fieldReadOnly ? escapeHtml(model || '-') : '<select name="card-' + cardIndex + '-need-model-' + needIndex + '" data-receive-card="' + cardIndex + '" data-receive-need="' + needIndex + '" data-receive-field="model">' + optionHTML(deviceReceiveModelOptions(category, brand), model, '请选择型号') + '</select>') + '</div>' +
      '<div>' + (fieldReadOnly ? escapeHtml(need.qty || '-') : '<input type="number" min="0" name="card-' + cardIndex + '-need-qty-' + needIndex + '" data-receive-card="' + cardIndex + '" data-receive-need="' + needIndex + '" data-receive-field="qty" value="' + escapeHtml(need.qty || '') + '" placeholder="请输入数量" />') + '</div>' +
      (outboundMode ? '<div><input type="number" disabled value="' + escapeHtml(outboundQty || '0') + '" placeholder="自动带出" /></div><div><button type="button" class="btn secondary btn-sm device-receive-detail-btn" data-action="device-receive-open-picker" data-card-index="' + cardIndex + '" data-need-index="' + needIndex + '">' + (selectedCount ? ('已选' + selectedCount + '台') : '选择设备') + '</button></div>' : '') +
      (!readOnly && !outboundMode ? '<div><button type="button" class="link-btn danger-link device-receive-remove-btn" data-action="device-receive-remove-need" data-card-index="' + cardIndex + '" data-need-index="' + needIndex + '">删除</button></div>' : '') +
      '</div>';
  }

  function deviceReceiveCardHTML(card, cardIndex, mode) {
    var readOnly = mode === 'view' || mode === 'approve';
    var outboundMode = mode === 'outbound';
    var projectOptions = mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return { value: item.id, label: item.name }; }), card.projectId || '', '请选择所属项目');
    return '<div class="modal-section device-receive-card"><div class="device-receive-card-head"><h4>项目领用卡片 ' + (cardIndex + 1) + '</h4>' + (!readOnly && !outboundMode ? '<button type="button" class="btn secondary btn-sm" data-action="device-receive-remove-card" data-card-index="' + cardIndex + '">删除项目</button>' : '') + '</div><div class="modal-grid modal-grid-2"><label class="field modal-field field-span-2"><span>所属项目 <em>*</em></span>' + (readOnly || outboundMode ? '<input disabled value="' + escapeHtml(card.projectName || '-') + '" />' : '<select name="card-project-' + cardIndex + '" data-receive-card-project="' + cardIndex + '">' + projectOptions + '</select>') + '</label></div><div class="device-receive-need-grid' + (outboundMode ? ' outbound-mode' : '') + '"><div class="device-receive-need-head' + (outboundMode ? ' outbound-mode' : '') + '"><span>分类</span><span>品牌</span><span>型号</span><span>需求数量</span>' + (outboundMode ? '<span>出库数量</span><span>出库明细</span>' : '') + (!readOnly && !outboundMode ? '<span>操作</span>' : '') + '</div>' + (card.needs || []).map(function (need, needIndex) { return deviceReceiveNeedRowHTML(need, cardIndex, needIndex, mode); }).join('') + '</div>' + (!readOnly && !outboundMode ? '<div class="purchase-detail-actions device-receive-add-need-bar"><button type="button" class="btn secondary" data-action="device-receive-add-need" data-card-index="' + cardIndex + '">新增设备需求</button></div>' : '') + '</div>';
  }

  function deviceReceiveOutboundPickerHTML() {
    var state = getManagedState('deviceReceive');
    var picker = state.pickerModal;
    if (!picker) return '';
    var need = getDeviceReceiveNeed(picker.cardIndex, picker.needIndex);
    if (!need) return '';
    var availableDevices = getSelectableOutboundDevices(picker.cardIndex, picker.needIndex);
    var selectedDevices = (need.selectedDevices || []);
    return '<div class="modal-mask" data-action="device-receive-picker-close"><div class="modal-card customer-modal device-receive-picker-modal" data-stop-close="1"><div class="modal-header"><div><h3>选择出库设备</h3><p>' + escapeHtml((need.category || '-') + ' / ' + (need.brand || '-') + ' / ' + (need.model || '-')) + '</p></div><button class="icon-btn" data-action="device-receive-picker-close">×</button></div><div class="modal-body"><div class="device-receive-picker-summary"><div>需求数量：<strong>' + escapeHtml(need.qty || '0') + '</strong></div><div>已选设备：<strong>' + selectedDevices.length + '</strong></div></div><div class="device-receive-picker-section"><h4>可选设备</h4><div class="device-receive-picker-table-wrap"><table class="data-table customer-table"><thead><tr><th>设备编码</th><th>设备名称</th><th>批次</th><th>入库时间</th><th>操作</th></tr></thead><tbody>' + ((availableDevices.map(function (device) {
      var selected = selectedDevices.some(function (item) { return item.id === device.id; });
      return '<tr><td>' + escapeHtml(device.code || '-') + '</td><td>' + escapeHtml(device.name || '-') + '</td><td>' + escapeHtml(device.batch || '-') + '</td><td>' + escapeHtml(device.inboundTime || device.installDate || '-') + '</td><td><button type="button" class="link-btn" data-action="device-receive-toggle-picker-device" data-device-id="' + escapeHtml(device.id) + '">' + (selected ? '移除' : '选择') + '</button></td></tr>';
    }).join('')) || '<tr><td colspan="5"><div class="empty-state">暂无可选择的闲置设备</div></td></tr>') + '</tbody></table></div></div><div class="device-receive-picker-section"><h4>已选设备</h4><div class="device-receive-picker-table-wrap"><table class="data-table customer-table"><thead><tr><th>设备编码</th><th>设备名称</th><th>批次</th><th>入库时间</th><th>操作</th></tr></thead><tbody>' + ((selectedDevices.map(function (device) {
      return '<tr><td>' + escapeHtml(device.code || '-') + '</td><td>' + escapeHtml(device.name || '-') + '</td><td>' + escapeHtml(device.batch || '-') + '</td><td>' + escapeHtml(device.inboundTime || device.installDate || '-') + '</td><td><button type="button" class="link-btn danger-link" data-action="device-receive-remove-picker-device" data-card-index="' + picker.cardIndex + '" data-need-index="' + picker.needIndex + '" data-device-id="' + escapeHtml(device.id) + '">移除</button></td></tr>';
    }).join('')) || '<tr><td colspan="5"><div class="empty-state">暂未选择出库设备</div></td></tr>') + '</tbody></table></div></div></div><div class="modal-footer"><button type="button" class="btn primary" data-action="device-receive-picker-close">完成</button></div></div></div>';
  }

  function deviceReceiveModalHTML() {
    var modal = getManagedState('deviceReceive').modal;
    if (!modal) return '';
    var item = modal.item || {};
    var mode = modal.mode;
    var readOnly = mode === 'view' || mode === 'approve' || mode === 'outbound';
    var titleMap = { create: '新增设备领用单', edit: '编辑设备领用单', view: '设备领用单详情', approve: '设备领用审批', outbound: '设备领用出库' };
    var approvalHTML = (item.approvalRecords && item.approvalRecords.length) ? '<div class="approval-box"><div class="panel-header approval-header"><div><h3>流转记录</h3><p>展示领用单创建、审批、出库过程</p></div></div>' + approvalTimelineHTML(item.approvalRecords || []) + '</div>' : '';
    return '<div class="modal-mask" data-action="device-receive-modal-close"><div class="modal-card customer-modal device-receive-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + (titleMap[mode] || '设备领用单') + '</h3><p>支持多个项目设备领用需求统一填报</p></div><button class="icon-btn" data-action="device-receive-modal-close">×</button></div><form id="device-receive-form" class="modal-body"><div class="modal-grid modal-grid-2"><label class="field modal-field"><span>单据编号</span><input disabled value="' + escapeHtml(item.id || ('LY-202604-' + String(getManagedState('deviceReceive').nextId).padStart(3, '0'))) + '" /></label><label class="field modal-field"><span>创建人</span><input name="creator" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.creator || '系统管理员') + '" placeholder="请输入创建人" /></label></div>' + (item.projectCards || []).map(function (card, index) { return deviceReceiveCardHTML(card, index, mode); }).join('') + (!readOnly ? '<div class="purchase-detail-actions device-receive-add-card-bar"><button type="button" class="btn secondary" data-action="device-receive-add-card">新增项目</button></div>' : '') + '<div class="modal-section device-receive-remark-section"><label class="field modal-field field-span-2"><span>备注</span><textarea name="remark" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea></label></div>' + approvalHTML + (mode === 'approve' ? '<div class="approval-box"><label class="field field-span-2"><span>审批意见</span><textarea name="approvalRemark" placeholder="同意可选填意见，驳回必须填写原因"></textarea></label></div>' : '') + '<div class="modal-footer">' +
      (mode === 'approve'
        ? '<button type="button" class="btn primary" data-action="device-receive-approve-confirm" data-id="' + escapeHtml(item.id) + '">同意</button><button type="button" class="btn secondary danger-link" data-action="device-receive-reject-confirm" data-id="' + escapeHtml(item.id) + '">驳回</button>'
        : mode === 'outbound'
          ? '<button type="button" class="btn primary" data-action="device-receive-outbound-confirm" data-id="' + escapeHtml(item.id) + '">出库</button>'
          : readOnly
            ? ''
            : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="device-receive-modal-close">关闭</button></div></form></div></div>' + deviceReceiveOutboundPickerHTML();
  }

  function deviceReceivePageHTML() {
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">设备管理</div><h2>设备领用</h2><p>支持多项目设备领用申请、审批、出库与撤销管理。</p></div></div>' + deviceReceiveFiltersHTML() + deviceReceiveTableHTML() + deviceReceiveModalHTML();
  }

  function deviceReturnCreatorName(item) {
    return item.creator || item.returner || '系统管理员';
  }

  function normalizeDeviceReturnDevices(devices, item) {
    var selectedDevices = (devices || []).map(function (device) { return Object.assign({}, device); });
    if (selectedDevices.length) return selectedDevices;
    if (!item || !item.model) return [];
    var qty = Number(item.qty) || 0;
    return (getManagedState('deviceArchive').list || []).filter(function (device) {
      return !item.model || device.model === item.model;
    }).slice(0, qty > 0 ? qty : 0).map(function (device) {
      return {
        id: device.id,
        code: device.code,
        name: device.name,
        batch: device.batch || device.warehouse || '-',
        inboundTime: device.inboundTime || device.installDate || '-'
      };
    });
  }

  function normalizeDeviceReturnItem(source) {
    var item = source || {};
    var selectedDevices = normalizeDeviceReturnDevices(item.selectedDevices, item);
    var qty = selectedDevices.length || (Number(item.qty) || 0);
    var approvalRecords = (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); });
    if (!approvalRecords.length && item.id) {
      var creator = deviceReturnCreatorName(item);
      var createTime = item.createTime || '2026-04-10 11:00';
      approvalRecords.push({
        time: createTime,
        operator: creator,
        action: '创建',
        remark: '提交设备退回单，待入库。'
      });
      if (item.status === '已入库') {
        approvalRecords.push({
          time: createTime,
          operator: '仓库管理员',
          action: '入库',
          remark: '已完成入库。'
        });
      } else if (item.status === '已撤销') {
        approvalRecords.push({
          time: createTime,
          operator: creator,
          action: '撤销',
          remark: '退回单已撤销。'
        });
      }
    }
    return {
      id: item.id,
      creator: deviceReturnCreatorName(item),
      createTime: item.createTime || '2026-04-10 11:00',
      projectId: item.projectId || '',
      projectName: item.projectName || '',
      selectedDevices: selectedDevices,
      qty: qty ? String(qty) : '',
      status: item.status || '待入库',
      remark: item.remark || '',
      approvalRecords: approvalRecords
    };
  }

  function getFilteredDeviceReturnRows() {
    var state = getManagedState('deviceReturn');
    var filters = state.filters || {};
    return (state.list || []).filter(function (raw) {
      var item = normalizeDeviceReturnItem(raw);
      var createDate = safeText(item.createTime).slice(0, 10);
      if (filters.id && safeText(item.id).indexOf(safeText(filters.id).trim()) === -1) return false;
      if (filters.creator && safeText(deviceReturnCreatorName(item)).indexOf(safeText(filters.creator).trim()) === -1) return false;
      if (filters.createTime && createDate !== safeText(filters.createTime)) return false;
      if (filters.status && safeText(item.status) !== safeText(filters.status)) return false;
      if (filters.dateStart && createDate < safeText(filters.dateStart)) return false;
      if (filters.dateEnd && createDate > safeText(filters.dateEnd)) return false;
      return true;
    });
  }

  function deviceReturnFiltersHTML() {
    var filters = getManagedState('deviceReturn').filters;
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid device-return-filter-grid">' +
      '<label class="field"><span>单据编号</span><input data-device-return-filter="id" value="' + escapeHtml(filters.id || '') + '" placeholder="请输入单据编号" /></label>' +
      '<label class="field"><span>创建人</span><input data-device-return-filter="creator" value="' + escapeHtml(filters.creator || '') + '" placeholder="请输入创建人" /></label>' +
      '<label class="field"><span>创建时间</span><input type="date" data-device-return-filter="createTime" value="' + escapeHtml(filters.createTime || '') + '" /></label>' +
      '<label class="field"><span>状态</span><select data-device-return-filter="status">' + optionHTML(['待入库', '已入库', '已撤销'], filters.status, '全部状态') + '</select></label>' +
      '<label class="field"><span>开始时间</span><input type="date" data-device-return-filter="dateStart" value="' + escapeHtml(filters.dateStart || '') + '" /></label>' +
      '<label class="field"><span>结束时间</span><input type="date" data-device-return-filter="dateEnd" value="' + escapeHtml(filters.dateEnd || '') + '" /></label>' +
      '<div class="filter-actions"><button class="btn secondary" data-action="device-return-reset">重置</button><button class="btn primary" data-action="device-return-search">查询</button></div>' +
      '</div></div>';
  }

  function deviceReturnTableHTML() {
    var rows = getFilteredDeviceReturnRows();
    return '<div class="panel table-panel customer-table-panel"><div class="panel-header"><div><h3>设备退回列表</h3><p>共 ' + rows.length + ' 条退回单据，支持查看、编辑、撤销和入库。</p></div><div class="toolbar"><button class="btn primary" data-action="device-return-create">新增退回单</button></div></div><table class="data-table customer-table"><thead><tr><th>单据编号</th><th>创建人</th><th>创建时间</th><th>所属项目</th><th>设备数量</th><th>状态</th><th>操作</th></tr></thead><tbody>' +
      ((rows.map(function (raw) {
        var item = normalizeDeviceReturnItem(raw);
        var qtyText = (Number(item.qty) || 0) + '台';
        return '<tr><td><button class="text-link" data-action="device-return-view" data-id="' + item.id + '">' + escapeHtml(item.id || '-') + '</button></td><td>' + escapeHtml(deviceReturnCreatorName(item)) + '</td><td>' + escapeHtml(item.createTime || '-') + '</td><td>' + escapeHtml(item.projectName || '-') + '</td><td>' + escapeHtml(qtyText) + '</td><td><span class="status ' + badgeClass(item.status) + '">' + escapeHtml(item.status || '-') + '</span></td><td><div class="table-actions"><button class="link-btn" data-action="device-return-view" data-id="' + item.id + '">查看</button><button class="link-btn" data-action="device-return-edit" data-id="' + item.id + '">编辑</button><button class="link-btn danger-link" data-action="device-return-delete" data-id="' + item.id + '">删除</button><button class="link-btn danger-link" data-action="device-return-revoke" data-id="' + item.id + '">撤销</button><button class="link-btn" data-action="device-return-inbound" data-id="' + item.id + '">入库</button></div></td></tr>';
      }).join('')) || '<tr><td colspan="7"><div class="empty-state">未查询到符合条件的退回单据</div></td></tr>') +
      '</tbody></table></div>';
  }

  function getDeviceReturnSelectableDevices() {
    var modal = getManagedState('deviceReturn').modal;
    var selectedIds = (((modal || {}).item || {}).selectedDevices || []).map(function (device) { return device.id; });
    return (getManagedState('deviceArchive').list || []).filter(function (device) {
      return device.status !== '已报废设备' || selectedIds.indexOf(device.id) > -1;
    });
  }

  function deviceReturnPickerModalHTML() {
    var state = getManagedState('deviceReturn');
    var picker = state.pickerModal;
    var modal = state.modal;
    if (!picker || !modal || !modal.item) return '';
    var selectedDevices = modal.item.selectedDevices || [];
    var availableDevices = getDeviceReturnSelectableDevices();
    return '<div class="modal-mask" data-action="device-return-picker-close"><div class="modal-card customer-modal device-return-picker-modal" data-stop-close="1"><div class="modal-header"><div><h3>选择退回设备</h3><p>勾选后保存，将设备加入退回清单</p></div><button class="icon-btn" data-action="device-return-picker-close">×</button></div><div class="modal-body"><div class="device-receive-picker-summary"><div>可选设备：<strong>' + availableDevices.length + '</strong></div><div>已选设备：<strong>' + selectedDevices.length + '</strong></div></div><div class="device-receive-picker-section"><h4>可选设备</h4><div class="device-receive-picker-table-wrap"><table class="data-table customer-table"><thead><tr><th>设备编码</th><th>设备名称</th><th>入库时间</th><th>操作</th></tr></thead><tbody>' + ((availableDevices.map(function (device) {
      var selected = selectedDevices.some(function (item) { return item.id === device.id; });
      return '<tr><td>' + escapeHtml(device.code || '-') + '</td><td>' + escapeHtml(device.name || '-') + '</td><td>' + escapeHtml(device.inboundTime || device.installDate || '-') + '</td><td><button type="button" class="link-btn" data-action="device-return-toggle-picker-device" data-device-id="' + escapeHtml(device.id) + '">' + (selected ? '取消' : '选择') + '</button></td></tr>';
    }).join('')) || '<tr><td colspan="4"><div class="empty-state">暂无可选择设备</div></td></tr>') + '</tbody></table></div></div><div class="device-receive-picker-section"><h4>已选设备</h4><div class="device-receive-picker-table-wrap"><table class="data-table customer-table"><thead><tr><th>设备编码</th><th>设备名称</th><th>入库时间</th><th>操作</th></tr></thead><tbody>' + ((selectedDevices.map(function (device) {
      return '<tr><td>' + escapeHtml(device.code || '-') + '</td><td>' + escapeHtml(device.name || '-') + '</td><td>' + escapeHtml(device.inboundTime || device.installDate || '-') + '</td><td><button type="button" class="link-btn danger-link" data-action="device-return-remove-device" data-device-id="' + escapeHtml(device.id) + '">移除</button></td></tr>';
    }).join('')) || '<tr><td colspan="4"><div class="empty-state">暂未选择设备</div></td></tr>') + '</tbody></table></div></div></div><div class="modal-footer"><button type="button" class="btn primary" data-action="device-return-picker-close">保存</button></div></div></div>';
  }

  function deviceReturnModalHTML() {
    var modal = getManagedState('deviceReturn').modal;
    if (!modal) return '';
    var item = normalizeDeviceReturnItem(modal.item || {});
    var readOnly = modal.mode === 'view' || modal.mode === 'inbound';
    var projectOptions = mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) {
      return { value: project.id, label: project.name };
    }), item.projectId || '', '请选择所属项目');
    var titleMap = { create: '新增设备退回单', edit: '编辑设备退回单', view: '设备退回单详情', inbound: '设备退回入库' };
    var approvalHTML = (modal.mode === 'view' || modal.mode === 'edit' || modal.mode === 'inbound') ? '<div class="approval-box"><div class="panel-header approval-header"><div><h3>流转记录</h3><p>展示退回单创建、编辑、撤销、入库过程</p></div></div>' + approvalTimelineHTML(item.approvalRecords || []) + '</div>' : '';
    return '<div class="modal-mask" data-action="device-return-modal-close"><div class="modal-card customer-modal device-return-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + (titleMap[modal.mode] || '设备退回单') + '</h3><p>支持设备退回登记、撤销与一键入库</p></div><button class="icon-btn" data-action="device-return-modal-close">×</button></div><form id="device-return-form" class="modal-body"><div class="modal-grid modal-grid-2"><label class="field modal-field"><span>单据编号</span><input disabled value="' + escapeHtml(item.id || ('TH-202604-' + String(getManagedState('deviceReturn').nextId).padStart(3, '0'))) + '" /></label><label class="field modal-field"><span>创建人 <em>*</em></span><input name="creator" ' + (readOnly ? 'disabled ' : '') + ' value="' + escapeHtml(deviceReturnCreatorName(item)) + '" placeholder="请输入创建人" /></label><label class="field modal-field"><span>创建时间</span><input type="datetime-local" name="createTime" ' + (readOnly ? 'disabled ' : '') + ' value="' + escapeHtml((item.createTime || '').replace(' ', 'T').slice(0, 16)) + '" /></label><label class="field modal-field"><span>所属项目 <em>*</em></span>' + (readOnly ? '<input disabled value="' + escapeHtml(item.projectName || '-') + '" />' : '<select name="projectId">' + projectOptions + '</select>') + '</label></div><div class="modal-section"><div class="panel-header"><div><h3>退回设备清单</h3><p>已选 ' + (item.selectedDevices || []).length + ' 台设备</p></div>' + (!readOnly ? '<div class="toolbar"><button type="button" class="btn secondary btn-sm" data-action="device-return-open-picker">选择设备</button></div>' : '') + '</div><div class="device-receive-picker-table-wrap"><table class="data-table customer-table"><thead><tr><th>设备编码</th><th>设备名称</th><th>批次</th>' + (readOnly ? '' : '<th>操作</th>') + '</tr></thead><tbody>' + (((item.selectedDevices || []).map(function (device) {
      return '<tr><td>' + escapeHtml(device.code || '-') + '</td><td>' + escapeHtml(device.name || '-') + '</td><td>' + escapeHtml(device.batch || '-') + '</td>' + (readOnly ? '' : '<td><button type="button" class="link-btn danger-link" data-action="device-return-remove-device" data-device-id="' + escapeHtml(device.id) + '">移除</button></td>') + '</tr>';
    }).join('')) || '<tr><td colspan="' + (readOnly ? '3' : '4') + '"><div class="empty-state">暂未选择退回设备</div></td></tr>') + '</tbody></table></div></div><div class="modal-grid modal-grid-2"><label class="field modal-field"><span>设备数量</span><input disabled value="' + escapeHtml(String((item.selectedDevices || []).length || 0)) + '" /></label><label class="field modal-field"><span>状态</span><input disabled value="' + escapeHtml(item.status || '待入库') + '" /></label><label class="field modal-field field-span-2"><span>备注</span><textarea name="remark" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea></label></div>' + approvalHTML + '<div class="modal-footer">' +
      (modal.mode === 'inbound'
        ? '<button type="button" class="btn primary" data-action="device-return-inbound-confirm" data-id="' + escapeHtml(item.id || '') + '">一键入库</button>'
        : readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="device-return-modal-close">关闭</button></div></form></div></div>' + deviceReturnPickerModalHTML();
  }

  function deviceReturnPageHTML() {
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">设备管理</div><h2>设备退回</h2><p>支持设备退回登记、设备清单维护、撤销与一键入库。</p></div></div>' + deviceReturnFiltersHTML() + deviceReturnTableHTML() + deviceReturnModalHTML();
  }

  function openDeviceReturnModal(mode, id) {
    var source = id ? findManagedItem('deviceReturn', id) : null;
    var item = source ? normalizeDeviceReturnItem(source) : normalizeDeviceReturnItem({
      creator: '系统管理员',
      createTime: '2026-04-10 11:00',
      status: '待入库',
      selectedDevices: [],
      approvalRecords: []
    });
    getManagedState('deviceReturn').modal = { mode: mode, item: item };
    getManagedState('deviceReturn').pickerModal = null;
    render();
  }

  function closeDeviceReturnModal() {
    getManagedState('deviceReturn').modal = null;
    getManagedState('deviceReturn').pickerModal = null;
    render();
  }

  function openDeviceReturnPicker() {
    var state = getManagedState('deviceReturn');
    if (!state.modal || (state.modal.mode !== 'create' && state.modal.mode !== 'edit')) return;
    state.pickerModal = { active: true };
    render();
  }

  function closeDeviceReturnPicker() {
    getManagedState('deviceReturn').pickerModal = null;
    render();
  }

  function toggleDeviceReturnPickerDevice(deviceId) {
    var state = getManagedState('deviceReturn');
    var modal = state.modal;
    if (!modal || !modal.item) return;
    var selectedDevices = (modal.item.selectedDevices || []).map(function (device) { return Object.assign({}, device); });
    var index = selectedDevices.findIndex(function (device) { return device.id === deviceId; });
    if (index > -1) {
      selectedDevices.splice(index, 1);
    } else {
      var raw = (getManagedState('deviceArchive').list || []).find(function (device) { return device.id === deviceId; });
      if (!raw) return;
      selectedDevices.push({
        id: raw.id,
        code: raw.code,
        name: raw.name,
        batch: raw.batch || raw.warehouse || '-',
        inboundTime: raw.inboundTime || raw.installDate || '-'
      });
    }
    modal.item.selectedDevices = selectedDevices;
    modal.item.qty = String(selectedDevices.length);
    render();
  }

  function removeDeviceReturnSelectedDevice(deviceId) {
    var modal = getManagedState('deviceReturn').modal;
    if (!modal || !modal.item) return;
    modal.item.selectedDevices = (modal.item.selectedDevices || []).filter(function (device) { return device.id !== deviceId; });
    modal.item.qty = String((modal.item.selectedDevices || []).length);
    render();
  }

  function saveDeviceReturn(formData) {
    var state = getManagedState('deviceReturn');
    var modal = state.modal;
    if (!modal || !modal.item) return;
    var projectId = safeText(formData.get('projectId')).trim();
    var project = getAllProjectItems(getProjectArchiveState().tree).find(function (item) { return item.id === projectId; }) || {};
    var selectedDevices = (modal.item.selectedDevices || []).map(function (device) { return Object.assign({}, device); });
    if (!projectId) return window.alert('请选择所属项目');
    if (!selectedDevices.length) return window.alert('请先选择退回设备');
    var creator = safeText(formData.get('creator')).trim() || '系统管理员';
    var createTimeInput = safeText(formData.get('createTime')).trim();
    var createTime = createTimeInput ? createTimeInput.replace('T', ' ') + ':00' : (modal.item.createTime || '2026-04-10 11:00');
    var payload = {
      creator: creator,
      returner: creator,
      createTime: createTime,
      projectId: projectId,
      projectName: project.name || modal.item.projectName || '',
      selectedDevices: selectedDevices,
      qty: String(selectedDevices.length),
      status: modal.item.status || '待入库',
      remark: safeText(formData.get('remark')).trim(),
      model: selectedDevices[0] ? selectedDevices[0].name : (modal.item.model || ''),
      approvalRecords: (modal.item.approvalRecords || []).map(function (record) { return Object.assign({}, record); })
    };
    if (modal.mode === 'edit' && modal.item.id) {
      payload.approvalRecords.push({
        time: '2026-04-10 11:20',
        operator: creator,
        action: '编辑',
        remark: '更新退回单信息。'
      });
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      payload.id = 'TH-202604-' + String(state.nextId).padStart(3, '0');
      payload.approvalRecords.unshift({
        time: payload.createTime,
        operator: creator,
        action: '创建',
        remark: '提交设备退回单，待入库。'
      });
      state.list.unshift(payload);
      state.nextId += 1;
    }
    closeDeviceReturnModal();
  }

  function deleteDeviceReturn(id) {
    if (!window.confirm('确认删除该退回单吗？')) return;
    var state = getManagedState('deviceReturn');
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function updateDeviceReturnStatus(id, status, remark, operator) {
    var state = getManagedState('deviceReturn');
    state.list = state.list.map(function (item) {
      if (item.id !== id) return item;
      var records = (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); });
      var actionMap = { '已撤销': '撤销', '已入库': '入库' };
      records.push({
        time: '2026-04-10 11:30',
        operator: operator || '系统管理员',
        action: actionMap[status] || '状态更新',
        remark: remark || (status === '已撤销' ? '退回单已撤销。' : status === '已入库' ? '已完成入库。' : '状态已更新。')
      });
      return Object.assign({}, item, { status: status, approvalRecords: records });
    });
    render();
  }

  function confirmDeviceReturnInbound(id) {
    var target = findManagedItem('deviceReturn', id);
    if (!target) return;
    var normalized = normalizeDeviceReturnItem(target);
    var qty = (normalized.selectedDevices || []).length || (Number(normalized.qty) || 0);
    var modelSummary = ((normalized.selectedDevices || []).map(function (device) { return device.name; }).filter(Boolean)[0]) || target.model || '设备';
    updateDeviceReturnStatus(id, '已入库', '已完成入库。', '仓库管理员');
    pushInboundRecord('退回入库', id, modelSummary, qty + '台');
    closeDeviceReturnModal();
  }

  function deviceRepairCreatorName(item) {
    return item.creator || item.applicant || '系统管理员';
  }

  function normalizeDeviceRepairDevices(devices, item) {
    var selectedDevices = (devices || []).map(function (device) { return Object.assign({}, device); });
    if (selectedDevices.length) return selectedDevices;
    if (!item || !item.model) return [];
    var qty = Number(item.qty) || 0;
    return (getManagedState('deviceArchive').list || []).filter(function (device) {
      return !item.model || device.model === item.model;
    }).slice(0, qty > 0 ? qty : 0).map(function (device) {
      return {
        id: device.id,
        code: device.code,
        name: device.name,
        category: device.category || '-',
        brand: device.brand || '-',
        model: device.model || '-',
        batch: device.batch || device.warehouse || '-'
      };
    });
  }

  function normalizeDeviceRepairItem(source) {
    var item = source || {};
    var selectedDevices = normalizeDeviceRepairDevices(item.selectedDevices, item);
    var qty = selectedDevices.length || (Number(item.qty) || 0);
    var approvalRecords = (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); });
    if (!approvalRecords.length && item.id) {
      var creator = deviceRepairCreatorName(item);
      var createTime = item.createTime || '2026-04-10 12:00';
      approvalRecords.push({
        time: createTime,
        operator: creator,
        action: '创建',
        remark: '提交设备返修单，待审批。'
      });
      if (item.status === '已通过') {
        approvalRecords.push({ time: createTime, operator: '李国华', action: '同意', remark: '审批通过。' });
      } else if (item.status === '已驳回') {
        approvalRecords.push({ time: createTime, operator: '李国华', action: '驳回', remark: '审批驳回，请补充信息。' });
      } else if (item.status === '已撤销') {
        approvalRecords.push({ time: createTime, operator: creator, action: '撤销', remark: '返修单已撤销。' });
      }
    }
    return {
      id: item.id,
      creator: deviceRepairCreatorName(item),
      createTime: item.createTime || '2026-04-10 12:00',
      projectId: item.projectId || '',
      projectName: item.projectName || '',
      selectedDevices: selectedDevices,
      qty: qty ? String(qty) : '',
      status: item.status || '待审批',
      remark: item.remark || '',
      approvalRecords: approvalRecords
    };
  }

  function getFilteredDeviceRepairRows() {
    var state = getManagedState('deviceRepair');
    var filters = state.filters || {};
    return (state.list || []).filter(function (raw) {
      var item = normalizeDeviceRepairItem(raw);
      var createDate = safeText(item.createTime).slice(0, 10);
      if (filters.id && safeText(item.id).indexOf(safeText(filters.id).trim()) === -1) return false;
      if (filters.creator && safeText(deviceRepairCreatorName(item)).indexOf(safeText(filters.creator).trim()) === -1) return false;
      if (filters.createTime && createDate !== safeText(filters.createTime)) return false;
      if (filters.status && safeText(item.status) !== safeText(filters.status)) return false;
      if (filters.dateStart && createDate < safeText(filters.dateStart)) return false;
      if (filters.dateEnd && createDate > safeText(filters.dateEnd)) return false;
      return true;
    });
  }

  function deviceRepairFiltersHTML() {
    var filters = getManagedState('deviceRepair').filters;
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid device-repair-filter-grid">' +
      '<label class="field"><span>单据编号</span><input data-device-repair-filter="id" value="' + escapeHtml(filters.id || '') + '" placeholder="请输入单据编号" /></label>' +
      '<label class="field"><span>创建人</span><input data-device-repair-filter="creator" value="' + escapeHtml(filters.creator || '') + '" placeholder="请输入创建人" /></label>' +
      '<label class="field"><span>创建时间</span><input type="date" data-device-repair-filter="createTime" value="' + escapeHtml(filters.createTime || '') + '" /></label>' +
      '<label class="field"><span>状态</span><select data-device-repair-filter="status">' + optionHTML(['待审批', '已通过', '已驳回', '已撤销'], filters.status, '全部状态') + '</select></label>' +
      '<label class="field"><span>开始时间</span><input type="date" data-device-repair-filter="dateStart" value="' + escapeHtml(filters.dateStart || '') + '" /></label>' +
      '<label class="field"><span>结束时间</span><input type="date" data-device-repair-filter="dateEnd" value="' + escapeHtml(filters.dateEnd || '') + '" /></label>' +
      '<div class="filter-actions"><button class="btn secondary" data-action="device-repair-reset">重置</button><button class="btn primary" data-action="device-repair-search">查询</button></div>' +
      '</div></div>';
  }

  function deviceRepairTableHTML() {
    var rows = getFilteredDeviceRepairRows();
    return '<div class="panel table-panel customer-table-panel"><div class="panel-header"><div><h3>设备返修列表</h3><p>共 ' + rows.length + ' 条返修单据，支持审批流转。</p></div><div class="toolbar"><button class="btn primary" data-action="device-repair-create">新增返修单</button></div></div><table class="data-table customer-table"><thead><tr><th>单据编号</th><th>创建人</th><th>创建时间</th><th>设备数量</th><th>状态</th><th>操作</th></tr></thead><tbody>' +
      ((rows.map(function (raw) {
        var item = normalizeDeviceRepairItem(raw);
        return '<tr><td><button class="text-link" data-action="device-repair-view" data-id="' + item.id + '">' + escapeHtml(item.id || '-') + '</button></td><td>' + escapeHtml(deviceRepairCreatorName(item)) + '</td><td>' + escapeHtml(item.createTime || '-') + '</td><td>' + escapeHtml((Number(item.qty) || 0) + '台') + '</td><td><span class="status ' + badgeClass(item.status) + '">' + escapeHtml(item.status || '-') + '</span></td><td><div class="table-actions"><button class="link-btn" data-action="device-repair-view" data-id="' + item.id + '">查看</button><button class="link-btn" data-action="device-repair-edit" data-id="' + item.id + '">编辑</button><button class="link-btn danger-link" data-action="device-repair-delete" data-id="' + item.id + '">删除</button><button class="link-btn danger-link" data-action="device-repair-revoke" data-id="' + item.id + '">撤销</button><button class="link-btn" data-action="device-repair-approve" data-id="' + item.id + '">审批</button></div></td></tr>';
      }).join('')) || '<tr><td colspan="6"><div class="empty-state">未查询到符合条件的返修单据</div></td></tr>') +
      '</tbody></table></div>';
  }

  function getDeviceRepairSelectableDevices() {
    var modal = getManagedState('deviceRepair').modal;
    var selectedIds = (((modal || {}).item || {}).selectedDevices || []).map(function (device) { return device.id; });
    return (getManagedState('deviceArchive').list || []).filter(function (device) {
      return device.status !== '已报废设备' || selectedIds.indexOf(device.id) > -1;
    });
  }

  function deviceRepairPickerModalHTML() {
    var state = getManagedState('deviceRepair');
    var picker = state.pickerModal;
    var modal = state.modal;
    if (!picker || !modal || !modal.item) return '';
    var selectedDevices = modal.item.selectedDevices || [];
    var availableDevices = getDeviceRepairSelectableDevices();
    return '<div class="modal-mask" data-action="device-repair-picker-close"><div class="modal-card customer-modal device-repair-picker-modal" data-stop-close="1"><div class="modal-header"><div><h3>选择返修设备</h3><p>勾选保存后加入返修设备清单</p></div><button class="icon-btn" data-action="device-repair-picker-close">×</button></div><div class="modal-body"><div class="device-receive-picker-summary"><div>可选设备：<strong>' + availableDevices.length + '</strong></div><div>已选设备：<strong>' + selectedDevices.length + '</strong></div></div><div class="device-receive-picker-section"><h4>可选设备</h4><div class="device-receive-picker-table-wrap"><table class="data-table customer-table"><thead><tr><th>设备编码</th><th>设备名称</th><th>分类</th><th>品牌</th><th>型号</th><th>批次</th><th>操作</th></tr></thead><tbody>' + ((availableDevices.map(function (device) {
      var selected = selectedDevices.some(function (item) { return item.id === device.id; });
      return '<tr><td>' + escapeHtml(device.code || '-') + '</td><td>' + escapeHtml(device.name || '-') + '</td><td>' + escapeHtml(device.category || '-') + '</td><td>' + escapeHtml(device.brand || '-') + '</td><td>' + escapeHtml(device.model || '-') + '</td><td>' + escapeHtml(device.batch || device.warehouse || '-') + '</td><td><button type="button" class="link-btn" data-action="device-repair-toggle-picker-device" data-device-id="' + escapeHtml(device.id) + '">' + (selected ? '取消' : '选择') + '</button></td></tr>';
    }).join('')) || '<tr><td colspan="7"><div class="empty-state">暂无可选择设备</div></td></tr>') + '</tbody></table></div></div></div><div class="modal-footer"><button type="button" class="btn primary" data-action="device-repair-picker-close">保存</button></div></div></div>';
  }

  function deviceRepairModalHTML() {
    var modal = getManagedState('deviceRepair').modal;
    if (!modal) return '';
    var item = normalizeDeviceRepairItem(modal.item || {});
    var readOnly = modal.mode === 'view' || modal.mode === 'approve';
    var titleMap = { create: '新增设备返修单', edit: '编辑设备返修单', view: '设备返修单详情', approve: '设备返修审批' };
    var approvalHTML = (item.approvalRecords && item.approvalRecords.length) ? '<div class="approval-box"><div class="panel-header approval-header"><div><h3>流转记录</h3><p>展示返修单创建、审批、撤销过程</p></div></div>' + approvalTimelineHTML(item.approvalRecords || []) + '</div>' : '';
    return '<div class="modal-mask" data-action="device-repair-modal-close"><div class="modal-card customer-modal device-repair-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + (titleMap[modal.mode] || '设备返修单') + '</h3><p>支持返修设备选择、审批与撤销管理</p></div><button class="icon-btn" data-action="device-repair-modal-close">×</button></div><form id="device-repair-form" class="modal-body"><div class="modal-grid modal-grid-2"><label class="field modal-field"><span>单据编号</span><input disabled value="' + escapeHtml(item.id || ('FX-202604-' + String(getManagedState('deviceRepair').nextId).padStart(3, '0'))) + '" /></label><label class="field modal-field"><span>创建人 <em>*</em></span><input name="creator" ' + (readOnly ? 'disabled ' : '') + ' value="' + escapeHtml(deviceRepairCreatorName(item)) + '" placeholder="请输入创建人" /></label><label class="field modal-field"><span>创建时间</span><input type="datetime-local" name="createTime" ' + (readOnly ? 'disabled ' : '') + ' value="' + escapeHtml((item.createTime || '').replace(' ', 'T').slice(0, 16)) + '" /></label></div><div class="modal-section"><div class="panel-header"><div><h3>返修设备清单</h3><p>已选 ' + (item.selectedDevices || []).length + ' 台设备</p></div>' + (!readOnly ? '<div class="toolbar"><button type="button" class="btn secondary btn-sm" data-action="device-repair-open-picker">选择设备</button></div>' : '') + '</div><div class="device-receive-picker-table-wrap"><table class="data-table customer-table"><thead><tr><th>设备编码</th><th>设备名称</th><th>分类</th><th>品牌</th><th>型号</th><th>批次</th>' + (readOnly ? '' : '<th>操作</th>') + '</tr></thead><tbody>' + (((item.selectedDevices || []).map(function (device) {
      return '<tr><td>' + escapeHtml(device.code || '-') + '</td><td>' + escapeHtml(device.name || '-') + '</td><td>' + escapeHtml(device.category || '-') + '</td><td>' + escapeHtml(device.brand || '-') + '</td><td>' + escapeHtml(device.model || '-') + '</td><td>' + escapeHtml(device.batch || '-') + '</td>' + (readOnly ? '' : '<td><button type="button" class="link-btn danger-link" data-action="device-repair-remove-device" data-device-id="' + escapeHtml(device.id) + '">移除</button></td>') + '</tr>';
    }).join('')) || '<tr><td colspan="' + (readOnly ? '6' : '7') + '"><div class="empty-state">暂未选择返修设备</div></td></tr>') + '</tbody></table></div></div><div class="modal-grid modal-grid-2"><label class="field modal-field"><span>设备数量</span><input disabled value="' + escapeHtml(String((item.selectedDevices || []).length || 0)) + '" /></label><label class="field modal-field"><span>状态</span><input disabled value="' + escapeHtml(item.status || '待审批') + '" /></label><label class="field modal-field field-span-2"><span>备注</span><textarea name="remark" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea></label></div>' + approvalHTML + (modal.mode === 'approve' ? '<div class="approval-box"><label class="field field-span-2"><span>审批意见</span><textarea name="approvalRemark" placeholder="同意可选填意见，驳回必须填写原因"></textarea></label></div>' : '') + '<div class="modal-footer">' +
      (modal.mode === 'approve'
        ? '<button type="button" class="btn primary" data-action="device-repair-approve-confirm" data-id="' + escapeHtml(item.id || '') + '">同意</button><button type="button" class="btn secondary danger-link" data-action="device-repair-reject-confirm" data-id="' + escapeHtml(item.id || '') + '">驳回</button>'
        : readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="device-repair-modal-close">关闭</button></div></form></div></div>' + deviceRepairPickerModalHTML();
  }

  function deviceRepairPageHTML() {
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">设备管理</div><h2>设备返修</h2><p>支持返修单创建、审批、撤销及流转记录查询。</p></div></div>' + deviceRepairFiltersHTML() + deviceRepairTableHTML() + deviceRepairModalHTML();
  }

  function openDeviceRepairModal(mode, id) {
    var source = id ? findManagedItem('deviceRepair', id) : null;
    var item = source ? normalizeDeviceRepairItem(source) : normalizeDeviceRepairItem({
      creator: '系统管理员',
      createTime: '2026-04-10 12:00',
      status: '待审批',
      selectedDevices: [],
      approvalRecords: []
    });
    getManagedState('deviceRepair').modal = { mode: mode, item: item };
    getManagedState('deviceRepair').pickerModal = null;
    render();
  }

  function closeDeviceRepairModal() {
    getManagedState('deviceRepair').modal = null;
    getManagedState('deviceRepair').pickerModal = null;
    render();
  }

  function openDeviceRepairPicker() {
    var state = getManagedState('deviceRepair');
    if (!state.modal || (state.modal.mode !== 'create' && state.modal.mode !== 'edit')) return;
    state.pickerModal = { active: true };
    render();
  }

  function closeDeviceRepairPicker() {
    getManagedState('deviceRepair').pickerModal = null;
    render();
  }

  function toggleDeviceRepairPickerDevice(deviceId) {
    var state = getManagedState('deviceRepair');
    var modal = state.modal;
    if (!modal || !modal.item) return;
    var selectedDevices = (modal.item.selectedDevices || []).map(function (device) { return Object.assign({}, device); });
    var index = selectedDevices.findIndex(function (device) { return device.id === deviceId; });
    if (index > -1) {
      selectedDevices.splice(index, 1);
    } else {
      var raw = (getManagedState('deviceArchive').list || []).find(function (device) { return device.id === deviceId; });
      if (!raw) return;
      selectedDevices.push({
        id: raw.id,
        code: raw.code,
        name: raw.name,
        category: raw.category || '-',
        brand: raw.brand || '-',
        model: raw.model || '-',
        batch: raw.batch || raw.warehouse || '-'
      });
    }
    modal.item.selectedDevices = selectedDevices;
    modal.item.qty = String(selectedDevices.length);
    render();
  }

  function removeDeviceRepairSelectedDevice(deviceId) {
    var modal = getManagedState('deviceRepair').modal;
    if (!modal || !modal.item) return;
    modal.item.selectedDevices = (modal.item.selectedDevices || []).filter(function (device) { return device.id !== deviceId; });
    modal.item.qty = String((modal.item.selectedDevices || []).length);
    render();
  }

  function saveDeviceRepair(formData) {
    var state = getManagedState('deviceRepair');
    var modal = state.modal;
    if (!modal || !modal.item) return;
    var selectedDevices = (modal.item.selectedDevices || []).map(function (device) { return Object.assign({}, device); });
    if (!selectedDevices.length) return window.alert('请先选择返修设备');
    var creator = safeText(formData.get('creator')).trim() || '系统管理员';
    var createTimeInput = safeText(formData.get('createTime')).trim();
    var createTime = createTimeInput ? createTimeInput.replace('T', ' ') + ':00' : (modal.item.createTime || '2026-04-10 12:00');
    var payload = {
      creator: creator,
      applicant: creator,
      createTime: createTime,
      projectId: modal.item.projectId || '',
      projectName: modal.item.projectName || '',
      selectedDevices: selectedDevices,
      qty: String(selectedDevices.length),
      status: modal.item.status || '待审批',
      remark: safeText(formData.get('remark')).trim(),
      model: selectedDevices[0] ? selectedDevices[0].model : (modal.item.model || ''),
      approvalRecords: (modal.item.approvalRecords || []).map(function (record) { return Object.assign({}, record); })
    };
    if (modal.mode === 'edit' && modal.item.id) {
      payload.approvalRecords.push({ time: '2026-04-10 12:20', operator: creator, action: '编辑', remark: '更新返修单信息。' });
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      payload.id = 'FX-202604-' + String(state.nextId).padStart(3, '0');
      payload.approvalRecords.unshift({ time: payload.createTime, operator: creator, action: '创建', remark: '提交设备返修单，待审批。' });
      state.list.unshift(payload);
      state.nextId += 1;
    }
    closeDeviceRepairModal();
  }

  function deleteDeviceRepair(id) {
    if (!window.confirm('确认删除该返修单吗？')) return;
    var state = getManagedState('deviceRepair');
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function updateDeviceRepairStatus(id, nextStatus, remark) {
    var state = getManagedState('deviceRepair');
    state.list = state.list.map(function (item) {
      if (item.id !== id) return item;
      var records = (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); });
      records.push({
        time: '2026-04-10 12:30',
        operator: nextStatus === '已撤销' ? deviceRepairCreatorName(item) : '李国华',
        action: nextStatus === '已通过' ? '同意' : nextStatus === '已驳回' ? '驳回' : nextStatus === '已撤销' ? '撤销' : '状态更新',
        remark: remark || (nextStatus === '已通过' ? '审批通过。' : nextStatus === '已驳回' ? '审批驳回。' : '返修单已撤销。')
      });
      return Object.assign({}, item, { status: nextStatus, approvalRecords: records });
    });
    closeDeviceRepairModal();
  }

  function deviceScrapCreatorName(item) {
    return item.creator || item.applicant || '系统管理员';
  }

  function normalizeDeviceScrapDevices(devices, item) {
    var selectedDevices = (devices || []).map(function (device) { return Object.assign({}, device); });
    if (selectedDevices.length) return selectedDevices;
    if (!item || !item.model) return [];
    var qty = Number(item.qty) || 0;
    return (getManagedState('deviceArchive').list || []).filter(function (device) {
      return !item.model || device.model === item.model;
    }).slice(0, qty > 0 ? qty : 0).map(function (device) {
      return {
        id: device.id,
        code: device.code,
        name: device.name,
        category: device.category || '-',
        brand: device.brand || '-',
        model: device.model || '-',
        batch: device.batch || device.warehouse || '-'
      };
    });
  }

  function normalizeDeviceScrapItem(source) {
    var item = source || {};
    var selectedDevices = normalizeDeviceScrapDevices(item.selectedDevices, item);
    var qty = selectedDevices.length || (Number(item.qty) || 0);
    var approvalRecords = (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); });
    if (!approvalRecords.length && item.id) {
      var creator = deviceScrapCreatorName(item);
      var createTime = item.createTime || '2026-04-10 13:00';
      approvalRecords.push({
        time: createTime,
        operator: creator,
        action: '创建',
        remark: '提交设备报废单，待审批。'
      });
      if (item.status === '已通过') {
        approvalRecords.push({ time: createTime, operator: '李国华', action: '同意', remark: '审批通过。' });
      } else if (item.status === '已驳回') {
        approvalRecords.push({ time: createTime, operator: '李国华', action: '驳回', remark: '审批驳回，请补充信息。' });
      } else if (item.status === '已撤销') {
        approvalRecords.push({ time: createTime, operator: creator, action: '撤销', remark: '报废单已撤销。' });
      }
    }
    return {
      id: item.id,
      creator: deviceScrapCreatorName(item),
      createTime: item.createTime || '2026-04-10 13:00',
      selectedDevices: selectedDevices,
      qty: qty ? String(qty) : '',
      status: item.status || '待审批',
      remark: item.remark || '',
      approvalRecords: approvalRecords
    };
  }

  function getFilteredDeviceScrapRows() {
    var state = getManagedState('deviceScrap');
    var filters = state.filters || {};
    return (state.list || []).filter(function (raw) {
      var item = normalizeDeviceScrapItem(raw);
      var createDate = safeText(item.createTime).slice(0, 10);
      if (filters.id && safeText(item.id).indexOf(safeText(filters.id).trim()) === -1) return false;
      if (filters.creator && safeText(deviceScrapCreatorName(item)).indexOf(safeText(filters.creator).trim()) === -1) return false;
      if (filters.createTime && createDate !== safeText(filters.createTime)) return false;
      if (filters.status && safeText(item.status) !== safeText(filters.status)) return false;
      if (filters.dateStart && createDate < safeText(filters.dateStart)) return false;
      if (filters.dateEnd && createDate > safeText(filters.dateEnd)) return false;
      return true;
    });
  }

  function deviceScrapFiltersHTML() {
    var filters = getManagedState('deviceScrap').filters;
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid device-scrap-filter-grid">' +
      '<label class="field"><span>单据编号</span><input data-device-scrap-filter="id" value="' + escapeHtml(filters.id || '') + '" placeholder="请输入单据编号" /></label>' +
      '<label class="field"><span>创建人</span><input data-device-scrap-filter="creator" value="' + escapeHtml(filters.creator || '') + '" placeholder="请输入创建人" /></label>' +
      '<label class="field"><span>创建时间</span><input type="date" data-device-scrap-filter="createTime" value="' + escapeHtml(filters.createTime || '') + '" /></label>' +
      '<label class="field"><span>状态</span><select data-device-scrap-filter="status">' + optionHTML(['待审批', '已通过', '已驳回', '已撤销'], filters.status, '全部状态') + '</select></label>' +
      '<label class="field"><span>开始时间</span><input type="date" data-device-scrap-filter="dateStart" value="' + escapeHtml(filters.dateStart || '') + '" /></label>' +
      '<label class="field"><span>结束时间</span><input type="date" data-device-scrap-filter="dateEnd" value="' + escapeHtml(filters.dateEnd || '') + '" /></label>' +
      '<div class="filter-actions"><button class="btn secondary" data-action="device-scrap-reset">重置</button><button class="btn primary" data-action="device-scrap-search">查询</button></div>' +
      '</div></div>';
  }

  function deviceScrapTableHTML() {
    var rows = getFilteredDeviceScrapRows();
    return '<div class="panel table-panel customer-table-panel"><div class="panel-header"><div><h3>设备报废列表</h3><p>共 ' + rows.length + ' 条报废单据，支持审批流转。</p></div><div class="toolbar"><button class="btn primary" data-action="device-scrap-create">新增报废单</button></div></div><table class="data-table customer-table"><thead><tr><th>单据编号</th><th>创建人</th><th>创建时间</th><th>设备数量</th><th>状态</th><th>操作</th></tr></thead><tbody>' +
      ((rows.map(function (raw) {
        var item = normalizeDeviceScrapItem(raw);
        return '<tr><td><button class="text-link" data-action="device-scrap-view" data-id="' + item.id + '">' + escapeHtml(item.id || '-') + '</button></td><td>' + escapeHtml(deviceScrapCreatorName(item)) + '</td><td>' + escapeHtml(item.createTime || '-') + '</td><td>' + escapeHtml((Number(item.qty) || 0) + '台') + '</td><td><span class="status ' + badgeClass(item.status) + '">' + escapeHtml(item.status || '-') + '</span></td><td><div class="table-actions"><button class="link-btn" data-action="device-scrap-view" data-id="' + item.id + '">查看</button><button class="link-btn" data-action="device-scrap-edit" data-id="' + item.id + '">编辑</button><button class="link-btn danger-link" data-action="device-scrap-delete" data-id="' + item.id + '">删除</button><button class="link-btn danger-link" data-action="device-scrap-revoke" data-id="' + item.id + '">撤销</button><button class="link-btn" data-action="device-scrap-approve" data-id="' + item.id + '">审批</button></div></td></tr>';
      }).join('')) || '<tr><td colspan="6"><div class="empty-state">未查询到符合条件的报废单据</div></td></tr>') +
      '</tbody></table></div>';
  }

  function getDeviceScrapSelectableDevices() {
    var modal = getManagedState('deviceScrap').modal;
    var selectedIds = (((modal || {}).item || {}).selectedDevices || []).map(function (device) { return device.id; });
    return (getManagedState('deviceArchive').list || []).filter(function (device) {
      return selectedIds.indexOf(device.id) > -1 || device.status !== '已报废设备';
    });
  }

  function deviceScrapPickerModalHTML() {
    var state = getManagedState('deviceScrap');
    var picker = state.pickerModal;
    var modal = state.modal;
    if (!picker || !modal || !modal.item) return '';
    var selectedDevices = modal.item.selectedDevices || [];
    var availableDevices = getDeviceScrapSelectableDevices();
    return '<div class="modal-mask" data-action="device-scrap-picker-close"><div class="modal-card customer-modal device-scrap-picker-modal" data-stop-close="1"><div class="modal-header"><div><h3>选择报废设备</h3><p>勾选保存后加入报废设备清单</p></div><button class="icon-btn" data-action="device-scrap-picker-close">×</button></div><div class="modal-body"><div class="device-receive-picker-summary"><div>可选设备：<strong>' + availableDevices.length + '</strong></div><div>已选设备：<strong>' + selectedDevices.length + '</strong></div></div><div class="device-receive-picker-section"><h4>可选设备</h4><div class="device-receive-picker-table-wrap"><table class="data-table customer-table"><thead><tr><th>设备编码</th><th>设备名称</th><th>分类</th><th>品牌</th><th>型号</th><th>批次</th><th>操作</th></tr></thead><tbody>' + ((availableDevices.map(function (device) {
      var selected = selectedDevices.some(function (item) { return item.id === device.id; });
      return '<tr><td>' + escapeHtml(device.code || '-') + '</td><td>' + escapeHtml(device.name || '-') + '</td><td>' + escapeHtml(device.category || '-') + '</td><td>' + escapeHtml(device.brand || '-') + '</td><td>' + escapeHtml(device.model || '-') + '</td><td>' + escapeHtml(device.batch || device.warehouse || '-') + '</td><td><button type="button" class="link-btn" data-action="device-scrap-toggle-picker-device" data-device-id="' + escapeHtml(device.id) + '">' + (selected ? '取消' : '选择') + '</button></td></tr>';
    }).join('')) || '<tr><td colspan="7"><div class="empty-state">暂无可选择设备</div></td></tr>') + '</tbody></table></div></div></div><div class="modal-footer"><button type="button" class="btn primary" data-action="device-scrap-picker-close">保存</button></div></div></div>';
  }

  function deviceScrapModalHTML() {
    var modal = getManagedState('deviceScrap').modal;
    if (!modal) return '';
    var item = normalizeDeviceScrapItem(modal.item || {});
    var readOnly = modal.mode === 'view' || modal.mode === 'approve';
    var titleMap = { create: '新增设备报废单', edit: '编辑设备报废单', view: '设备报废单详情', approve: '设备报废审批' };
    var approvalHTML = (item.approvalRecords && item.approvalRecords.length) ? '<div class="approval-box"><div class="panel-header approval-header"><div><h3>流转记录</h3><p>展示报废单创建、审批、撤销过程</p></div></div>' + approvalTimelineHTML(item.approvalRecords || []) + '</div>' : '';
    return '<div class="modal-mask" data-action="device-scrap-modal-close"><div class="modal-card customer-modal device-scrap-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + (titleMap[modal.mode] || '设备报废单') + '</h3><p>支持报废设备选择、审批与撤销管理</p></div><button class="icon-btn" data-action="device-scrap-modal-close">×</button></div><form id="device-scrap-form" class="modal-body"><div class="modal-grid modal-grid-2"><label class="field modal-field"><span>单据编号</span><input disabled value="' + escapeHtml(item.id || ('BF-202604-' + String(getManagedState('deviceScrap').nextId).padStart(3, '0'))) + '" /></label><label class="field modal-field"><span>创建人 <em>*</em></span><input name="creator" ' + (readOnly ? 'disabled ' : '') + ' value="' + escapeHtml(deviceScrapCreatorName(item)) + '" placeholder="请输入创建人" /></label><label class="field modal-field"><span>创建时间</span><input type="datetime-local" name="createTime" ' + (readOnly ? 'disabled ' : '') + ' value="' + escapeHtml((item.createTime || '').replace(' ', 'T').slice(0, 16)) + '" /></label></div><div class="modal-section"><div class="panel-header"><div><h3>报废设备清单</h3><p>已选 ' + (item.selectedDevices || []).length + ' 台设备</p></div>' + (!readOnly ? '<div class="toolbar"><button type="button" class="btn secondary btn-sm" data-action="device-scrap-open-picker">选择设备</button></div>' : '') + '</div><div class="device-receive-picker-table-wrap"><table class="data-table customer-table"><thead><tr><th>设备编码</th><th>设备名称</th><th>分类</th><th>品牌</th><th>型号</th><th>批次</th>' + (readOnly ? '' : '<th>操作</th>') + '</tr></thead><tbody>' + (((item.selectedDevices || []).map(function (device) {
      return '<tr><td>' + escapeHtml(device.code || '-') + '</td><td>' + escapeHtml(device.name || '-') + '</td><td>' + escapeHtml(device.category || '-') + '</td><td>' + escapeHtml(device.brand || '-') + '</td><td>' + escapeHtml(device.model || '-') + '</td><td>' + escapeHtml(device.batch || '-') + '</td>' + (readOnly ? '' : '<td><button type="button" class="link-btn danger-link" data-action="device-scrap-remove-device" data-device-id="' + escapeHtml(device.id) + '">移除</button></td>') + '</tr>';
    }).join('')) || '<tr><td colspan="' + (readOnly ? '6' : '7') + '"><div class="empty-state">暂未选择报废设备</div></td></tr>') + '</tbody></table></div></div><div class="modal-grid modal-grid-2"><label class="field modal-field"><span>设备数量</span><input disabled value="' + escapeHtml(String((item.selectedDevices || []).length || 0)) + '" /></label><label class="field modal-field"><span>状态</span><input disabled value="' + escapeHtml(item.status || '待审批') + '" /></label><label class="field modal-field field-span-2"><span>备注</span><textarea name="remark" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea></label></div>' + approvalHTML + (modal.mode === 'approve' ? '<div class="approval-box"><label class="field field-span-2"><span>审批意见</span><textarea name="approvalRemark" placeholder="同意可选填意见，驳回必须填写原因"></textarea></label></div>' : '') + '<div class="modal-footer">' +
      (modal.mode === 'approve'
        ? '<button type="button" class="btn primary" data-action="device-scrap-approve-confirm" data-id="' + escapeHtml(item.id || '') + '">同意</button><button type="button" class="btn secondary danger-link" data-action="device-scrap-reject-confirm" data-id="' + escapeHtml(item.id || '') + '">驳回</button>'
        : readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="device-scrap-modal-close">关闭</button></div></form></div></div>' + deviceScrapPickerModalHTML();
  }

  function deviceScrapPageHTML() {
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">设备管理</div><h2>设备报废</h2><p>支持报废单创建、审批、撤销及流转记录查询。</p></div></div>' + deviceScrapFiltersHTML() + deviceScrapTableHTML() + deviceScrapModalHTML();
  }

  function getInboundRecordDisplayRows() {
    var inboundList = getManagedState('inboundRecord').list || [];
    var archiveList = getManagedState('deviceArchive').list || [];
    var fallback = inboundList.length ? inboundList : [{ sourceType: '退回入库', sourceId: '--', time: '2026-04-07' }];
    var rows = [];
    function inboundBatchCode(record, device, rowIndex) {
      var source = safeText(record.sourceId || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
      var tail = source ? source.slice(-4) : String((rowIndex % 9999) + 1).padStart(4, '0');
      return 'PC' + 'B' + tail + String.fromCharCode(65 + (rowIndex % 26));
    }
    fallback.forEach(function (record, recordIndex) {
      var pick = archiveList.slice(recordIndex * 4, recordIndex * 4 + 4);
      if (!pick.length) pick = archiveList.slice(0, 4);
      pick.forEach(function (device) {
        var rowIndex = rows.length;
        rows.push({
          deviceCode: device.code || '--',
          deviceName: device.name || '--',
          model: device.model || '--',
          category: device.category || '--',
          brand: device.brand || '--',
          batch: inboundBatchCode(record, device, rowIndex),
          inboundTime: (record.time || device.inboundTime || device.installDate || '--').slice(0, 10),
          inboundType: record.sourceType === '采购入库' ? '设备采购入库' : '设备报废退回入库',
          sourceId: record.sourceId || '--'
        });
      });
    });
    return rows.map(function (item, index) { return Object.assign({ index: index + 1 }, item); });
  }

  function getFilteredInboundRecordRows() {
    var filters = getManagedState('inboundRecord').filters || {};
    return getInboundRecordDisplayRows().filter(function (row) {
      if (filters.deviceCode && safeText(row.deviceCode).indexOf(safeText(filters.deviceCode).trim()) === -1) return false;
      if (filters.deviceName && safeText(row.deviceName).indexOf(safeText(filters.deviceName).trim()) === -1) return false;
      if (filters.model && safeText(row.model).indexOf(safeText(filters.model).trim()) === -1) return false;
      if (filters.category && safeText(row.category).indexOf(safeText(filters.category).trim()) === -1) return false;
      if (filters.brand && safeText(row.brand).indexOf(safeText(filters.brand).trim()) === -1) return false;
      if (filters.inboundType && safeText(row.inboundType) !== safeText(filters.inboundType)) return false;
      if (filters.dateStart && safeText(row.inboundTime) < safeText(filters.dateStart)) return false;
      if (filters.dateEnd && safeText(row.inboundTime) > safeText(filters.dateEnd)) return false;
      return true;
    });
  }

  function inboundRecordFiltersHTML() {
    var filters = getManagedState('inboundRecord').filters || {};
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid inbound-record-filter-grid">' +
      '<label class="field"><span>设备编码</span><input data-device-inbound-filter="deviceCode" value="' + escapeHtml(filters.deviceCode || '') + '" placeholder="请输入设备编码" /></label>' +
      '<label class="field"><span>设备名称</span><input data-device-inbound-filter="deviceName" value="' + escapeHtml(filters.deviceName || '') + '" placeholder="请输入设备名称" /></label>' +
      '<label class="field"><span>设备型号</span><input data-device-inbound-filter="model" value="' + escapeHtml(filters.model || '') + '" placeholder="请输入设备型号" /></label>' +
      '<label class="field"><span>设备分类</span><input data-device-inbound-filter="category" value="' + escapeHtml(filters.category || '') + '" placeholder="请输入设备分类" /></label>' +
      '<label class="field"><span>设备品牌</span><input data-device-inbound-filter="brand" value="' + escapeHtml(filters.brand || '') + '" placeholder="请输入设备品牌" /></label>' +
      '<label class="field"><span>入库时间</span><div class="date-range-inline"><input type="date" data-device-inbound-filter="dateStart" value="' + escapeHtml(filters.dateStart || '') + '" /><span>—</span><input type="date" data-device-inbound-filter="dateEnd" value="' + escapeHtml(filters.dateEnd || '') + '" /></div></label>' +
      '<label class="field"><span>入库类型</span><select data-device-inbound-filter="inboundType">' + optionHTML(['设备采购入库', '设备报废退回入库'], filters.inboundType, '全部类型') + '</select></label>' +
      '<div class="filter-actions"><button class="btn secondary" data-action="device-inbound-reset">重置</button><button class="btn primary" data-action="device-inbound-search">查询</button></div>' +
      '</div></div>';
  }

  function inboundRecordTableHTML() {
    var rows = getFilteredInboundRecordRows();
    return '<div class="panel table-panel customer-table-panel"><table class="data-table customer-table"><thead><tr><th>序号</th><th>设备编码</th><th>设备名称</th><th>设备型号</th><th>设备分类</th><th>设备品牌</th><th>批次</th><th>入库时间</th><th>入库类型</th><th>关联单号</th></tr></thead><tbody>' +
      ((rows.map(function (item) {
        return '<tr><td>' + item.index + '</td><td>' + escapeHtml(item.deviceCode) + '</td><td>' + escapeHtml(item.deviceName) + '</td><td>' + escapeHtml(item.model) + '</td><td>' + escapeHtml(item.category) + '</td><td>' + escapeHtml(item.brand) + '</td><td>' + escapeHtml(item.batch) + '</td><td>' + escapeHtml(item.inboundTime) + '</td><td>' + escapeHtml(item.inboundType) + '</td><td>' + escapeHtml(item.sourceId) + '</td></tr>';
      }).join('')) || '<tr><td colspan="10"><div class="empty-state">未查询到符合条件的入库记录</div></td></tr>') +
      '</tbody></table><div class="table-inline-note">第 1 - ' + rows.length + ' 条 / 总共 ' + rows.length + ' 条</div></div>';
  }

  function inboundRecordPageHTML() {
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">设备管理</div><h2>入库记录</h2><p>展示设备采购与退回入库明细记录，支持组合检索。</p></div></div>' + inboundRecordFiltersHTML() + inboundRecordTableHTML();
  }

  function getOutboundRecordDisplayRows() {
    var outboundList = getManagedState('outboundRecord').list || [];
    var archiveList = getManagedState('deviceArchive').list || [];
    var fallback = outboundList.length ? outboundList : [{ sourceType: '领用出库', sourceId: '--', time: '2026-04-07' }];
    var rows = [];
    fallback.forEach(function (record, recordIndex) {
      var pick = archiveList.slice(recordIndex * 4, recordIndex * 4 + 4);
      if (!pick.length) pick = archiveList.slice(0, 4);
      pick.forEach(function (device) {
        rows.push({
          deviceCode: device.code || '--',
          deviceName: device.name || '--',
          model: device.model || '--',
          category: device.category || '--',
          brand: device.brand || '--',
          batch: device.batch || device.warehouse || '--',
          outboundTime: (record.time || device.inboundTime || device.installDate || '--').slice(0, 10),
          outboundType: record.sourceType || '领用出库',
          sourceId: record.sourceId || '--'
        });
      });
    });
    return rows.map(function (item, index) { return Object.assign({ index: index + 1 }, item); });
  }

  function getFilteredOutboundRecordRows() {
    var filters = getManagedState('outboundRecord').filters || {};
    return getOutboundRecordDisplayRows().filter(function (row) {
      if (filters.deviceCode && safeText(row.deviceCode).indexOf(safeText(filters.deviceCode).trim()) === -1) return false;
      if (filters.deviceName && safeText(row.deviceName).indexOf(safeText(filters.deviceName).trim()) === -1) return false;
      if (filters.model && safeText(row.model).indexOf(safeText(filters.model).trim()) === -1) return false;
      if (filters.category && safeText(row.category).indexOf(safeText(filters.category).trim()) === -1) return false;
      if (filters.brand && safeText(row.brand).indexOf(safeText(filters.brand).trim()) === -1) return false;
      if (filters.outboundType && safeText(row.outboundType) !== safeText(filters.outboundType)) return false;
      if (filters.dateStart && safeText(row.outboundTime) < safeText(filters.dateStart)) return false;
      if (filters.dateEnd && safeText(row.outboundTime) > safeText(filters.dateEnd)) return false;
      return true;
    });
  }

  function outboundRecordFiltersHTML() {
    var filters = getManagedState('outboundRecord').filters || {};
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid inbound-record-filter-grid">' +
      '<label class="field"><span>设备编码</span><input data-device-outbound-filter="deviceCode" value="' + escapeHtml(filters.deviceCode || '') + '" placeholder="请输入设备编码" /></label>' +
      '<label class="field"><span>设备名称</span><input data-device-outbound-filter="deviceName" value="' + escapeHtml(filters.deviceName || '') + '" placeholder="请输入设备名称" /></label>' +
      '<label class="field"><span>设备型号</span><input data-device-outbound-filter="model" value="' + escapeHtml(filters.model || '') + '" placeholder="请输入设备型号" /></label>' +
      '<label class="field"><span>设备分类</span><input data-device-outbound-filter="category" value="' + escapeHtml(filters.category || '') + '" placeholder="请输入设备分类" /></label>' +
      '<label class="field"><span>设备品牌</span><input data-device-outbound-filter="brand" value="' + escapeHtml(filters.brand || '') + '" placeholder="请输入设备品牌" /></label>' +
      '<label class="field"><span>出库时间</span><div class="date-range-inline"><input type="date" data-device-outbound-filter="dateStart" value="' + escapeHtml(filters.dateStart || '') + '" /><span>—</span><input type="date" data-device-outbound-filter="dateEnd" value="' + escapeHtml(filters.dateEnd || '') + '" /></div></label>' +
      '<label class="field"><span>出库类型</span><select data-device-outbound-filter="outboundType">' + optionHTML(['领用出库', '返修出库', '报废出库'], filters.outboundType, '全部类型') + '</select></label>' +
      '<div class="filter-actions"><button class="btn secondary" data-action="device-outbound-reset">重置</button><button class="btn primary" data-action="device-outbound-search">查询</button></div>' +
      '</div></div>';
  }

  function outboundRecordTableHTML() {
    var rows = getFilteredOutboundRecordRows();
    return '<div class="panel table-panel customer-table-panel"><table class="data-table customer-table"><thead><tr><th>序号</th><th>设备编码</th><th>设备名称</th><th>设备型号</th><th>设备分类</th><th>设备品牌</th><th>批次</th><th>出库时间</th><th>出库类型</th><th>关联单号</th></tr></thead><tbody>' +
      ((rows.map(function (item) {
        return '<tr><td>' + item.index + '</td><td>' + escapeHtml(item.deviceCode) + '</td><td>' + escapeHtml(item.deviceName) + '</td><td>' + escapeHtml(item.model) + '</td><td>' + escapeHtml(item.category) + '</td><td>' + escapeHtml(item.brand) + '</td><td>' + escapeHtml(item.batch) + '</td><td>' + escapeHtml(item.outboundTime) + '</td><td>' + escapeHtml(item.outboundType) + '</td><td>' + escapeHtml(item.sourceId) + '</td></tr>';
      }).join('')) || '<tr><td colspan="10"><div class="empty-state">未查询到符合条件的出库记录</div></td></tr>') +
      '</tbody></table><div class="table-inline-note">第 1 - ' + rows.length + ' 条 / 总共 ' + rows.length + ' 条</div></div>';
  }

  function outboundRecordPageHTML() {
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">设备管理</div><h2>出库记录</h2><p>展示领用、返修、报废等出库明细记录，支持组合检索。</p></div></div>' + outboundRecordFiltersHTML() + outboundRecordTableHTML();
  }

  function findAlarmRecord(id) {
    return findManagedItem('alarmRecord', id);
  }

  function normalizeAlarmRecord(item) {
    var record = Object.assign({
      id: '',
      alarmType: '',
      deviceName: '',
      deviceCode: '',
      projectId: '',
      projectName: '',
      status: '未处理',
      workorderTransferred: '未转工单',
      workorderId: '',
      latestAlarmTime: '',
      detail: '',
      logs: [],
      handlingRecords: []
    }, item || {});
    record.logs = (record.logs || []).map(function (log) { return Object.assign({}, log); }).sort(function (a, b) {
      return safeText(b.time).localeCompare(safeText(a.time));
    });
    record.handlingRecords = (record.handlingRecords || []).map(function (log) { return Object.assign({}, log); }).sort(function (a, b) {
      return safeText(b.time).localeCompare(safeText(a.time));
    });
    record.latestAlarmTime = record.latestAlarmTime || ((record.logs[0] || {}).time || '');
    record.alarmType = record.alarmType || ((record.logs[0] || {}).type || '');
    return record;
  }

  function getAlarmRecordRows() {
    return (getManagedState('alarmRecord').list || []).map(function (item) {
      return normalizeAlarmRecord(item);
    });
  }

  function getFilteredAlarmRecordRows() {
    var filters = getManagedState('alarmRecord').filters || {};
    return getAlarmRecordRows().filter(function (item) {
      if (filters.deviceName && safeText(item.deviceName).indexOf(safeText(filters.deviceName).trim()) === -1) return false;
      if (filters.deviceCode && safeText(item.deviceCode).indexOf(safeText(filters.deviceCode).trim()) === -1) return false;
      if (filters.projectName && safeText(item.projectName).indexOf(safeText(filters.projectName).trim()) === -1) return false;
      if (filters.status && safeText(item.status) !== safeText(filters.status)) return false;
      return true;
    });
  }

  function getAlarmRecordSummary() {
    var rows = getAlarmRecordRows();
    var allLogTimes = [];
    rows.forEach(function (item) {
      (item.logs || []).forEach(function (log) {
        if (log && log.time) allLogTimes.push(safeText(log.time).slice(0, 10));
      });
    });
    var today = allLogTimes.sort().slice(-1)[0] || nowDateTimeText().slice(0, 10);
    var todayCount = rows.reduce(function (sum, item) {
      return sum + (item.logs || []).filter(function (log) {
        return safeText(log.time).slice(0, 10) === today;
      }).length;
    }, 0);
    return {
      todayCount: todayCount,
      pendingCount: rows.filter(function (item) { return item.status !== '已处理'; }).length
    };
  }

  function alarmRecordSummaryHTML() {
    var summary = getAlarmRecordSummary();
    return '<div class="stats-grid alarm-summary-grid">' +
      '<div class="stat-card glow-2"><div class="stat-title">今日告警数</div><div class="stat-value">' + escapeHtml(String(summary.todayCount)) + '</div><div class="stat-desc">按告警日志累计统计</div></div>' +
      '<div class="stat-card glow-3"><div class="stat-title">未处理告警</div><div class="stat-value">' + escapeHtml(String(summary.pendingCount)) + '</div><div class="stat-desc">含未处理与处理中告警记录</div></div>' +
      '</div>';
  }

  function alarmRecordFiltersHTML() {
    var filters = getManagedState('alarmRecord').filters || {};
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid alarm-record-filter-grid">' +
      '<label class="field"><span>设备名称</span><input data-alarm-filter="deviceName" value="' + escapeHtml(filters.deviceName || '') + '" placeholder="请输入设备名称" /></label>' +
      '<label class="field"><span>设备编号</span><input data-alarm-filter="deviceCode" value="' + escapeHtml(filters.deviceCode || '') + '" placeholder="请输入设备编号" /></label>' +
      '<label class="field"><span>所属项目</span><input data-alarm-filter="projectName" value="' + escapeHtml(filters.projectName || '') + '" placeholder="请输入所属项目" /></label>' +
      '<label class="field"><span>状态</span><select data-alarm-filter="status">' + optionHTML(['未处理', '处理中', '已处理'], filters.status, '全部状态') + '</select></label>' +
      '<div class="filter-actions"><button class="btn secondary" data-action="alarm-reset">重置</button><button class="btn primary" data-action="alarm-search">查询</button></div>' +
      '</div></div>';
  }

  function alarmTransferBadgeText(item) {
    var text = item.workorderTransferred || (item.workorderId ? '已转工单' : '未转工单');
    var className = text === '已转工单' ? 'success' : 'warning';
    return '<span class="status ' + className + '">' + escapeHtml(text) + '</span>';
  }

  function alarmRecordTableHTML() {
    var rows = getFilteredAlarmRecordRows();
    return '<div class="panel table-panel customer-table-panel"><div class="panel-header"><div><h3>告警记录列表</h3><p>共 ' + rows.length + ' 条告警记录，支持处理、查看日志与一键报修。</p></div></div>' +
      '<table class="data-table customer-table"><thead><tr><th>最近告警时间</th><th>告警类型</th><th>设备名称</th><th>设备编号</th><th>所属项目</th><th>状态</th><th>是否已转工单</th><th>操作</th></tr></thead><tbody>' +
      ((rows.map(function (item) {
        return '<tr><td>' + escapeHtml(item.latestAlarmTime || '-') + '</td><td>' + escapeHtml(item.alarmType || '-') + '</td><td><button class="text-link" data-action="alarm-process" data-id="' + escapeHtml(item.id) + '">' + escapeHtml(item.deviceName || '-') + '</button></td><td>' + escapeHtml(item.deviceCode || '-') + '</td><td>' + escapeHtml(item.projectName || '-') + '</td><td><span class="status ' + badgeClass(item.status) + '">' + escapeHtml(item.status || '-') + '</span></td><td>' + alarmTransferBadgeText(item) + '</td><td><div class="table-actions"><button class="link-btn" data-action="alarm-process" data-id="' + escapeHtml(item.id) + '">告警处理</button><button class="link-btn" data-action="alarm-records" data-id="' + escapeHtml(item.id) + '">处理记录</button><button class="link-btn" data-action="alarm-logs" data-id="' + escapeHtml(item.id) + '">告警日志</button></div></td></tr>';
      }).join('')) || '<tr><td colspan="8"><div class="empty-state">未查询到符合条件的告警记录</div></td></tr>') +
      '</tbody></table></div>';
  }

  function alarmWorkerOptions(current) {
    var workers = (data.maintenanceWorkorderOptions && data.maintenanceWorkorderOptions.workers) || [];
    return optionHTML(workers, current || '', '请选择运维人员');
  }

  function alarmProcessModalHTML() {
    var modal = getManagedState('alarmRecord').modal;
    if (!modal || modal.mode !== 'process') return '';
    var item = normalizeAlarmRecord(modal.item || {});
    var currentTime = modal.currentTime || nowDateTimeText();
    return '<div class="modal-mask" data-action="alarm-modal-close"><div class="modal-card customer-modal alarm-process-modal" data-stop-close="1"><div class="modal-header"><div><h3>告警处理</h3><p>' + escapeHtml(item.deviceName || '-') + ' · ' + escapeHtml(item.projectName || '-') + '</p></div><button class="icon-btn" data-action="alarm-modal-close">×</button></div><form id="alarm-process-form" class="modal-body"><div class="modal-grid modal-grid-2"><label class="field modal-field"><span>处理人</span><input name="processor" disabled value="' + escapeHtml(currentUserName()) + '" /></label><label class="field modal-field"><span>处理时间</span><input name="processTime" disabled value="' + escapeHtml(currentTime) + '" /></label><label class="field modal-field field-span-2"><span>处理详情 <em>*</em></span><textarea name="detail" data-alarm-process-field="pendingDetail" placeholder="请输入处理详情，如现场排查情况、通知结果、临时处置方案。">' + escapeHtml(item.pendingDetail || '') + '</textarea></label></div><div class="modal-footer"><button type="submit" class="btn primary">保存处理</button><button type="button" class="btn secondary" data-action="alarm-open-repair" data-id="' + escapeHtml(item.id) + '">一键报修</button><button type="button" class="btn secondary" data-action="alarm-modal-close">关闭</button></div></form></div></div>';
  }

  function alarmRepairModalHTML() {
    var modal = getManagedState('alarmRecord').modal;
    if (!modal || modal.mode !== 'process' || !modal.repairPicker) return '';
    var item = normalizeAlarmRecord(modal.item || {});
    return '<div class="modal-mask" data-action="alarm-repair-close"><div class="modal-card customer-modal alarm-repair-modal" data-stop-close="1"><div class="modal-header"><div><h3>选择运维人员</h3><p>' + escapeHtml(item.deviceName || '-') + ' · ' + escapeHtml(item.alarmType || '-') + '</p></div><button class="icon-btn" data-action="alarm-repair-close">×</button></div><form id="alarm-repair-form" class="modal-body"><div class="modal-grid modal-grid-2"><label class="field modal-field field-span-2"><span>运维人员 <em>*</em></span><select name="worker" data-alarm-process-field="pendingWorker">' + alarmWorkerOptions(item.pendingWorker || '') + '</select></label><label class="field modal-field field-span-2"><span>处理说明</span><textarea disabled placeholder="将沿用告警处理弹窗中的处理详情">' + escapeHtml(item.pendingDetail || '未填写处理详情，创建工单时将仅带入告警信息。') + '</textarea></label></div><div class="modal-footer"><button type="button" class="btn primary" data-action="alarm-create-workorder" data-id="' + escapeHtml(item.id) + '">确认报修</button><button type="button" class="btn secondary" data-action="alarm-repair-close">取消</button></div></form></div></div>';
  }

  function alarmRecordLogModalHTML() {
    var modal = getManagedState('alarmRecord').modal;
    if (!modal || modal.mode !== 'records') return '';
    var item = normalizeAlarmRecord(modal.item || {});
    var records = item.handlingRecords || [];
    return '<div class="modal-mask" data-action="alarm-modal-close"><div class="modal-card customer-modal" data-stop-close="1"><div class="modal-header"><div><h3>处理记录</h3><p>' + escapeHtml(item.deviceName || '-') + ' · ' + escapeHtml(item.id || '') + '</p></div><button class="icon-btn" data-action="alarm-modal-close">×</button></div><div class="modal-body">' + (records.length ? surveyLogHTML(records) : '<div class="empty-state">暂无处理记录</div>') + '</div><div class="modal-footer"><button type="button" class="btn secondary" data-action="alarm-modal-close">关闭</button></div></div></div>';
  }

  function alarmLogsModalHTML() {
    var modal = getManagedState('alarmRecord').modal;
    if (!modal || modal.mode !== 'logs') return '';
    var item = normalizeAlarmRecord(modal.item || {});
    var logs = item.logs || [];
    return '<div class="modal-mask" data-action="alarm-modal-close"><div class="modal-card customer-modal" data-stop-close="1"><div class="modal-header"><div><h3>告警日志</h3><p>' + escapeHtml(item.deviceName || '-') + ' · 最近告警 ' + escapeHtml(item.latestAlarmTime || '-') + '</p></div><button class="icon-btn" data-action="alarm-modal-close">×</button></div><div class="modal-body"><div class="alarm-log-table-wrap"><table class="data-table customer-table"><thead><tr><th>告警时间</th><th>告警类型</th><th>告警原因</th></tr></thead><tbody>' + ((logs.map(function (log) {
      return '<tr><td>' + escapeHtml(log.time || '-') + '</td><td>' + escapeHtml(log.type || '-') + '</td><td>' + escapeHtml(log.reason || '-') + '</td></tr>';
    }).join('')) || '<tr><td colspan="3"><div class="empty-state">暂无告警日志</div></td></tr>') + '</tbody></table></div></div><div class="modal-footer"><button type="button" class="btn secondary" data-action="alarm-modal-close">关闭</button></div></div></div>';
  }

  function alarmRecordModalHTML() {
    return alarmProcessModalHTML() + alarmRepairModalHTML() + alarmRecordLogModalHTML() + alarmLogsModalHTML();
  }

  function alarmRecordPageHTML() {
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">设备管理</div><h2>告警记录</h2><p>支持告警检索、查看、处理，并可查看处理记录与告警日志。</p></div></div>' + alarmRecordSummaryHTML() + alarmRecordFiltersHTML() + alarmRecordTableHTML() + alarmRecordModalHTML();
  }

  function openAlarmModal(mode, id) {
    var source = findAlarmRecord(id);
    if (!source) return;
    getManagedState('alarmRecord').modal = { mode: mode, item: normalizeAlarmRecord(source), currentTime: nowDateTimeText() };
    render();
  }

  function closeAlarmModal() {
    getManagedState('alarmRecord').modal = null;
    render();
  }

  function syncAlarmProcessField(field, value) {
    var modal = getManagedState('alarmRecord').modal;
    if (!modal || !modal.item) return;
    modal.item[field] = value;
  }

  function openAlarmRepairModal(id) {
    var state = getManagedState('alarmRecord');
    var modal = state.modal;
    if (!modal || modal.mode !== 'process' || !modal.item || modal.item.id !== id) {
      return openAlarmModal('process', id);
    }
    modal.repairPicker = true;
    render();
  }

  function closeAlarmRepairModal() {
    var modal = getManagedState('alarmRecord').modal;
    if (!modal) return;
    modal.repairPicker = false;
    render();
  }

  function updateAlarmRecordItem(id, updater) {
    var state = getManagedState('alarmRecord');
    state.list = (state.list || []).map(function (item) {
      if (item.id !== id) return item;
      return normalizeAlarmRecord(typeof updater === 'function' ? updater(normalizeAlarmRecord(item)) : updater);
    });
  }

  function saveAlarmProcess(formData) {
    var modal = getManagedState('alarmRecord').modal;
    if (!modal || !modal.item) return;
    var detail = safeText(formData.get('detail')).trim();
    if (!detail) {
      window.alert('请填写处理详情');
      return;
    }
    var processTime = modal.currentTime || nowDateTimeText();
    updateAlarmRecordItem(modal.item.id, function (item) {
      var nextStatus = item.workorderId ? '处理中' : '已处理';
      return Object.assign({}, item, {
        status: nextStatus,
        pendingDetail: '',
        handlingRecords: [{
          time: processTime,
          operator: currentUserName(),
          content: detail
        }].concat(item.handlingRecords || [])
      });
    });
    closeAlarmModal();
  }

  function createMaintenanceFromAlarm(id, worker, detail) {
    var state = getMaintenanceWorkorderState();
    var alarm = normalizeAlarmRecord(findAlarmRecord(id));
    var createTime = nowDateTimeText();
    var planDate = createTime.slice(0, 10);
    var workorderId = 'YW-20260413-' + String(state.nextId).padStart(3, '0');
    state.list.unshift({
      id: workorderId,
      projectId: alarm.projectId || '',
      projectName: alarm.projectName || '',
      worker: worker,
      planDate: planDate,
      createTime: createTime,
      creator: currentUserName(),
      status: '待处理',
      overdue: false,
      priority: '紧急',
      faultDesc: (detail ? detail + '；' : '') + '来源告警：' + (alarm.alarmType || '-') + '，设备：' + (alarm.deviceName || '-') + '（' + (alarm.deviceCode || '-') + '）。',
      logs: [{ time: createTime, operator: currentUserName(), content: '由告警记录 ' + alarm.id + ' 一键报修创建运维工单。' }]
    });
    state.nextId += 1;
    return workorderId;
  }

  function createAlarmWorkorder(id) {
    var modal = getManagedState('alarmRecord').modal;
    if (!modal || !modal.item) return;
    var current = findAlarmRecord(id);
    if (current && current.workorderId) {
      window.alert('该告警已创建运维工单：' + current.workorderId);
      return;
    }
    var worker = safeText(modal.item.pendingWorker).trim();
    var detail = safeText(modal.item.pendingDetail).trim();
    if (!worker) {
      window.alert('请选择运维人员');
      return;
    }
    var workorderId = createMaintenanceFromAlarm(id, worker, detail);
    var recordTime = nowDateTimeText();
    updateAlarmRecordItem(id, function (item) {
      return Object.assign({}, item, {
        status: '处理中',
        workorderTransferred: '已转工单',
        workorderId: workorderId,
        pendingWorker: worker,
        repairPicker: false,
        handlingRecords: [{
          time: recordTime,
          operator: currentUserName(),
          content: '一键报修并创建运维工单 ' + workorderId + '，指派运维人员：' + worker + '。'
        }].concat(item.handlingRecords || [])
      });
    });
    openAlarmModal('process', id);
    var refreshed = getManagedState('alarmRecord').modal;
    if (refreshed) refreshed.repairPicker = false;
    render();
    window.alert('已创建运维工单：' + workorderId);
  }

  function findInvestor(id) {
    return getManagedState('investor').list.find(function (item) { return item.id === id; });
  }

  function getInvestorProjectList(investorId) {
    return (getProjectArchiveState().tree || []).filter(function (item) {
      return safeText(item.investorId) === safeText(investorId);
    });
  }

  function getFilteredInvestorRows() {
    var state = getManagedState('investor');
    var filters = state.filters || {};
    return (state.list || []).map(function (item) {
      var projects = getInvestorProjectList(item.id);
      return Object.assign({}, item, { projectCount: projects.length, projects: projects });
    }).filter(function (item) {
      if (filters.name && safeText(item.name).indexOf(safeText(filters.name).trim()) === -1) return false;
      if (filters.status && safeText(item.status) !== safeText(filters.status)) return false;
      return true;
    });
  }

  function investorFiltersHTML() {
    var filters = getManagedState('investor').filters || {};
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid investor-filter-grid">' +
      '<label class="field"><span>投资方名称</span><input data-investor-filter="name" value="' + escapeHtml(filters.name || '') + '" placeholder="请输入投资方名称" /></label>' +
      '<label class="field"><span>状态</span><select data-investor-filter="status">' + optionHTML(['正常', '冻结'], filters.status, '全部状态') + '</select></label>' +
      '<div class="filter-actions"><button class="btn secondary" data-action="investor-reset">重置</button><button class="btn primary" data-action="investor-search">查询</button></div>' +
      '</div></div>';
  }

  function investorTableHTML() {
    var rows = getFilteredInvestorRows();
    return '<div class="panel table-panel customer-table-panel"><div class="panel-header"><div><h3>投资方列表</h3><p>共 ' + rows.length + ' 条投资方数据，支持查看基础信息与关联项目情况。</p></div></div><table class="data-table customer-table"><thead><tr><th>投资方名称</th><th>编号</th><th>联系人</th><th>联系电话</th><th>关联项目数</th><th>状态</th><th>操作</th></tr></thead><tbody>' +
      ((rows.map(function (item) {
        return '<tr><td><button class="text-link" data-action="investor-view" data-id="' + escapeHtml(item.id) + '">' + escapeHtml(item.name || '-') + '</button></td><td>' + escapeHtml(item.id || '-') + '</td><td>' + escapeHtml(item.contact || '-') + '</td><td>' + escapeHtml(item.phone || '-') + '</td><td>' + escapeHtml(String(item.projectCount || 0)) + '</td><td><span class="status ' + (item.status === '正常' ? 'success' : 'danger') + '">' + escapeHtml(item.status || '-') + '</span></td><td><div class="table-actions"><button class="link-btn" data-action="investor-edit" data-id="' + escapeHtml(item.id) + '">编辑</button><button class="link-btn danger-link" data-action="investor-delete" data-id="' + escapeHtml(item.id) + '">删除</button></div></td></tr>';
      }).join('')) || '<tr><td colspan="7"><div class="empty-state">未查询到符合条件的投资方</div></td></tr>') +
      '</tbody></table></div>';
  }

  function investorProjectSummaryHTML(projects) {
    if (!projects || !projects.length) return '<div class="empty-state">暂无关联项目</div>';
    return '<div class="investor-project-list">' + projects.map(function (item) {
      return '<div class="detail-item"><span>' + escapeHtml(item.code || '-') + '</span><strong>' + escapeHtml(item.name || '-') + '</strong></div>';
    }).join('') + '</div>';
  }

  function investorModalHTML() {
    var modal = getManagedState('investor').modal;
    if (!modal) return '';
    var item = Object.assign({ id: '', name: '', type: '', contact: '', phone: '', status: '正常' }, modal.item || {});
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'create' ? '新增投资方' : modal.mode === 'edit' ? '编辑投资方' : '投资方详情';
    var projects = getInvestorProjectList(item.id);
    return '<div class="modal-mask" data-action="investor-modal-close"><div class="modal-card customer-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + title + '</h3><p>维护投资方基础信息并查看关联项目情况</p></div><button class="icon-btn" data-action="investor-modal-close">×</button></div><form id="investor-form" class="modal-body"><div class="modal-grid modal-grid-2"><label class="field modal-field"><span>投资方名称 <em>*</em></span><input name="name" ' + (readOnly ? 'disabled ' : '') + ' value="' + escapeHtml(item.name || '') + '" placeholder="请输入投资方名称" /></label><label class="field modal-field"><span>编号</span><input disabled value="' + escapeHtml(item.id || ('TZ-' + String(getManagedState('investor').nextId).padStart(3, '0'))) + '" /></label><label class="field modal-field"><span>类型 <em>*</em></span><select name="type" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(['个人', '国企', '央企', '私企', '其他'], item.type || '', '请选择类型') + '</select></label><label class="field modal-field"><span>状态 <em>*</em></span><select name="status" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(['正常', '冻结'], item.status || '', '请选择状态') + '</select></label><label class="field modal-field"><span>联系人 <em>*</em></span><input name="contact" ' + (readOnly ? 'disabled ' : '') + ' value="' + escapeHtml(item.contact || '') + '" placeholder="请输入联系人" /></label><label class="field modal-field"><span>联系电话 <em>*</em></span><input name="phone" ' + (readOnly ? 'disabled ' : '') + ' value="' + escapeHtml(item.phone || '') + '" placeholder="请输入联系电话" /></label></div>' + (readOnly ? '<div class="modal-section"><h4>关联项目</h4>' + investorProjectSummaryHTML(projects) + '</div>' : '') + '<div class="modal-footer">' + (readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') + '<button type="button" class="btn secondary" data-action="investor-modal-close">关闭</button></div></form></div></div>';
  }

  function investorPageHTML() {
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">财务管理</div><h2>投资方</h2><p>展示投资方基础信息和项目关联情况，支持新增、查看、编辑和检索。</p></div><div class="sub-actions"><button class="btn primary" data-action="investor-create">新增投资方</button></div></div>' + investorFiltersHTML() + investorTableHTML() + investorModalHTML();
  }

  function openInvestorModal(mode, id) {
    var item = id ? Object.assign({}, findInvestor(id)) : { id: '', name: '', type: '', contact: '', phone: '', status: '正常' };
    getManagedState('investor').modal = { mode: mode, item: item };
    render();
  }

  function closeInvestorModal() {
    getManagedState('investor').modal = null;
    render();
  }

  function saveInvestor(formData) {
    var state = getManagedState('investor');
    var modal = state.modal;
    if (!modal) return;
    var payload = {
      name: safeText(formData.get('name')).trim(),
      type: safeText(formData.get('type')).trim(),
      contact: safeText(formData.get('contact')).trim(),
      phone: safeText(formData.get('phone')).trim(),
      status: safeText(formData.get('status')).trim()
    };
    if (!payload.name || !payload.type || !payload.contact || !payload.phone || !payload.status) {
      window.alert('请完整填写投资方名称、类型、联系人、联系电话、状态');
      return;
    }
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      payload.id = 'TZ-' + String(state.nextId).padStart(3, '0');
      state.list.unshift(payload);
      state.nextId += 1;
    }
    closeInvestorModal();
  }

  function deleteInvestor(id) {
    if (!window.confirm('确认删除该投资方吗？此操作仅影响演示数据。')) return;
    var state = getManagedState('investor');
    state.list = (state.list || []).filter(function (item) { return item.id !== id; });
    render();
  }

  function getProjectProfitBaseProjects() {
    return (getProjectArchiveState().tree || []).map(function (item) { return Object.assign({}, item); });
  }

  function projectProfitRateText(value) {
    return escapeHtml((Number(value) || 0).toFixed(1) + '%');
  }

  function buildProjectProfitRows() {
    var receiptList = getManagedState('receipt').list || [];
    var paymentList = getManagedState('payment').list || [];
    return getProjectProfitBaseProjects().map(function (project) {
      var contractAmount = parseMoney(project.contractAmount);
      var receiptAmount = receiptList.reduce(function (sum, item) {
        return safeText(item.projectName) === safeText(project.name) ? sum + parseMoney(item.amount) : sum;
      }, 0);
      var deviceCost = paymentList.reduce(function (sum, item) {
        return safeText(item.projectName) === safeText(project.name) ? sum + parseMoney(item.amount) : sum;
      }, 0);
      var profit = contractAmount - deviceCost;
      var profitRate = contractAmount > 0 ? ((profit / contractAmount) * 100) : 0;
      return {
        id: project.id,
        projectName: project.name || '',
        projectCode: project.code || project.id || '',
        customerName: project.customerName || '',
        status: project.status || '',
        contractAmount: contractAmount,
        receiptAmount: receiptAmount,
        deviceCost: deviceCost,
        profit: profit,
        profitRate: profitRate
      };
    });
  }

  function getFilteredProjectProfitRows() {
    var filters = getManagedState('projectProfit').filters || {};
    return buildProjectProfitRows().filter(function (item) {
      if (filters.projectName && safeText(item.projectName).indexOf(safeText(filters.projectName).trim()) === -1) return false;
      if (filters.projectCode && safeText(item.projectCode).indexOf(safeText(filters.projectCode).trim()) === -1) return false;
      if (filters.customerName && safeText(item.customerName).indexOf(safeText(filters.customerName).trim()) === -1) return false;
      if (filters.status && safeText(item.status) !== safeText(filters.status)) return false;
      return true;
    });
  }

  function projectProfitFiltersHTML() {
    var filters = getManagedState('projectProfit').filters || {};
    var statuses = [];
    getProjectProfitBaseProjects().forEach(function (item) {
      if (item.status && statuses.indexOf(item.status) === -1) statuses.push(item.status);
    });
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid project-profit-filter-grid">' +
      '<label class="field"><span>项目名称</span><input data-project-profit-filter="projectName" value="' + escapeHtml(filters.projectName || '') + '" placeholder="请输入项目名称" /></label>' +
      '<label class="field"><span>项目编号</span><input data-project-profit-filter="projectCode" value="' + escapeHtml(filters.projectCode || '') + '" placeholder="请输入项目编号" /></label>' +
      '<label class="field"><span>所属客户</span><input data-project-profit-filter="customerName" value="' + escapeHtml(filters.customerName || '') + '" placeholder="请输入所属客户" /></label>' +
      '<label class="field"><span>项目状态</span><select data-project-profit-filter="status">' + optionHTML(statuses, filters.status, '全部状态') + '</select></label>' +
      '<div class="filter-actions"><button class="btn secondary" data-action="project-profit-reset">重置</button><button class="btn primary" data-action="project-profit-search">查询</button></div>' +
      '</div></div>';
  }

  function projectProfitTableHTML() {
    var rows = getFilteredProjectProfitRows();
    return '<div class="panel table-panel customer-table-panel"><div class="panel-header"><div><h3>项目毛利列表</h3><p>共 ' + rows.length + ' 个项目，展示合同金额与设备成本形成的利润结果。</p></div></div><table class="data-table customer-table"><thead><tr><th>项目名称</th><th>项目编号</th><th>所属客户</th><th>状态</th><th>利润</th><th>操作</th></tr></thead><tbody>' +
      ((rows.map(function (item) {
        return '<tr><td>' + escapeHtml(item.projectName || '-') + '</td><td>' + escapeHtml(item.projectCode || '-') + '</td><td>' + escapeHtml(item.customerName || '-') + '</td><td><span class="status ' + badgeClass(item.status || '') + '">' + escapeHtml(item.status || '-') + '</span></td><td>' + escapeHtml(formatMoney(item.profit)) + '</td><td>' + formatMoney(item.productionValue) + '</td><td><div class="table-actions"><button class="link-btn" data-action="project-profit-view" data-id="' + escapeHtml(item.id) + '">查看</button></div></td></tr>';
      }).join('')) || '<tr><td colspan="7"><div class="empty-state">未查询到符合条件的项目毛利数据</div></td></tr>') +
      '</tbody></table></div>';
  }

  function findProjectProfitRow(id) {
    return buildProjectProfitRows().find(function (item) { return item.id === id; });
  }

  function projectProfitModalHTML() {
    var modal = getManagedState('projectProfit').modal;
    if (!modal || !modal.item) return '';
    var item = modal.item;
    return '<div class="modal-mask" data-action="project-profit-modal-close"><div class="modal-card customer-modal" data-stop-close="1"><div class="modal-header"><div><h3>项目毛利详情</h3><p>' + escapeHtml(item.projectName || '-') + ' · ' + escapeHtml(item.projectCode || '-') + '</p></div><button class="icon-btn" data-action="project-profit-modal-close">×</button></div><div class="modal-body"><div class="modal-section"><h4>项目基础信息</h4><div class="detail-grid"><div class="detail-item"><span>项目名称</span><strong>' + escapeHtml(item.projectName || '-') + '</strong></div><div class="detail-item"><span>项目编号</span><strong>' + escapeHtml(item.projectCode || '-') + '</strong></div><div class="detail-item"><span>所属客户</span><strong>' + escapeHtml(item.customerName || '-') + '</strong></div><div class="detail-item"><span>项目状态</span><strong><span class="status ' + badgeClass(item.status || '') + '">' + escapeHtml(item.status || '-') + '</span></strong></div></div></div><div class="detail-overview-grid compact"><div class="stat-card"><div class="stat-title">合同金额</div><div class="stat-value detail-stat">' + escapeHtml(formatMoney(item.contractAmount)) + '</div></div><div class="stat-card"><div class="stat-title">回款金额</div><div class="stat-value detail-stat">' + escapeHtml(formatMoney(item.receiptAmount)) + '</div></div><div class="stat-card"><div class="stat-title">设备成本</div><div class="stat-value detail-stat">' + escapeHtml(formatMoney(item.deviceCost)) + '</div></div><div class="stat-card"><div class="stat-title">毛利</div><div class="stat-value detail-stat">' + escapeHtml(formatMoney(item.profit)) + '</div></div><div class="stat-card detail-item-full"><div class="stat-title">生产产值</div><div class="stat-value detail-stat">' + formatMoney(item.productionValue) + '</div></div></div></div><div class="modal-footer"><button type="button" class="btn secondary" data-action="project-profit-modal-close">关闭</button></div></div></div>';
  }

  function projectProfitPageHTML() {
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">财务管理</div><h2>项目毛利</h2><p>展示项目毛利、利润率及合同与成本构成，支持多条件检索和详情查看。</p></div></div>' + projectProfitFiltersHTML() + projectProfitTableHTML() + projectProfitModalHTML();
  }

  function openProjectProfitModal(id) {
    var row = findProjectProfitRow(id);
    if (!row) return;
    getManagedState('projectProfit').modal = { item: row };
    render();
  }

  function closeProjectProfitModal() {
    getManagedState('projectProfit').modal = null;
    render();
  }


  function openDeviceScrapModal(mode, id) {
    var source = id ? findManagedItem('deviceScrap', id) : null;
    var item = source ? normalizeDeviceScrapItem(source) : normalizeDeviceScrapItem({
      creator: '系统管理员',
      createTime: '2026-04-10 13:00',
      status: '待审批',
      selectedDevices: [],
      approvalRecords: []
    });
    getManagedState('deviceScrap').modal = { mode: mode, item: item };
    getManagedState('deviceScrap').pickerModal = null;
    render();
  }

  function closeDeviceScrapModal() {
    getManagedState('deviceScrap').modal = null;
    getManagedState('deviceScrap').pickerModal = null;
    render();
  }

  function openDeviceScrapPicker() {
    var state = getManagedState('deviceScrap');
    if (!state.modal || (state.modal.mode !== 'create' && state.modal.mode !== 'edit')) return;
    state.pickerModal = { active: true };
    render();
  }

  function closeDeviceScrapPicker() {
    getManagedState('deviceScrap').pickerModal = null;
    render();
  }

  function toggleDeviceScrapPickerDevice(deviceId) {
    var state = getManagedState('deviceScrap');
    var modal = state.modal;
    if (!modal || !modal.item) return;
    var selectedDevices = (modal.item.selectedDevices || []).map(function (device) { return Object.assign({}, device); });
    var index = selectedDevices.findIndex(function (device) { return device.id === deviceId; });
    if (index > -1) {
      selectedDevices.splice(index, 1);
    } else {
      var raw = (getManagedState('deviceArchive').list || []).find(function (device) { return device.id === deviceId; });
      if (!raw) return;
      selectedDevices.push({
        id: raw.id,
        code: raw.code,
        name: raw.name,
        category: raw.category || '-',
        brand: raw.brand || '-',
        model: raw.model || '-',
        batch: raw.batch || raw.warehouse || '-'
      });
    }
    modal.item.selectedDevices = selectedDevices;
    modal.item.qty = String(selectedDevices.length);
    render();
  }

  function removeDeviceScrapSelectedDevice(deviceId) {
    var modal = getManagedState('deviceScrap').modal;
    if (!modal || !modal.item) return;
    modal.item.selectedDevices = (modal.item.selectedDevices || []).filter(function (device) { return device.id !== deviceId; });
    modal.item.qty = String((modal.item.selectedDevices || []).length);
    render();
  }

  function saveDeviceScrap(formData) {
    var state = getManagedState('deviceScrap');
    var modal = state.modal;
    if (!modal || !modal.item) return;
    var selectedDevices = (modal.item.selectedDevices || []).map(function (device) { return Object.assign({}, device); });
    if (!selectedDevices.length) return window.alert('请先选择报废设备');
    var creator = safeText(formData.get('creator')).trim() || '系统管理员';
    var createTimeInput = safeText(formData.get('createTime')).trim();
    var createTime = createTimeInput ? createTimeInput.replace('T', ' ') + ':00' : (modal.item.createTime || '2026-04-10 13:00');
    var payload = {
      creator: creator,
      applicant: creator,
      createTime: createTime,
      selectedDevices: selectedDevices,
      qty: String(selectedDevices.length),
      status: modal.item.status || '待审批',
      remark: safeText(formData.get('remark')).trim(),
      model: selectedDevices[0] ? selectedDevices[0].model : (modal.item.model || ''),
      approvalRecords: (modal.item.approvalRecords || []).map(function (record) { return Object.assign({}, record); })
    };
    if (modal.mode === 'edit' && modal.item.id) {
      payload.approvalRecords.push({ time: '2026-04-10 13:20', operator: creator, action: '编辑', remark: '更新报废单信息。' });
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      payload.id = 'BF-202604-' + String(state.nextId).padStart(3, '0');
      payload.approvalRecords.unshift({ time: payload.createTime, operator: creator, action: '创建', remark: '提交设备报废单，待审批。' });
      state.list.unshift(payload);
      state.nextId += 1;
    }
    closeDeviceScrapModal();
  }

  function deleteDeviceScrap(id) {
    if (!window.confirm('确认删除该报废单吗？')) return;
    var state = getManagedState('deviceScrap');
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function updateDeviceScrapStatus(id, nextStatus, remark) {
    var state = getManagedState('deviceScrap');
    state.list = state.list.map(function (item) {
      if (item.id !== id) return item;
      var records = (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); });
      records.push({
        time: '2026-04-10 13:30',
        operator: nextStatus === '已撤销' ? deviceScrapCreatorName(item) : '李国华',
        action: nextStatus === '已通过' ? '同意' : nextStatus === '已驳回' ? '驳回' : nextStatus === '已撤销' ? '撤销' : '状态更新',
        remark: remark || (nextStatus === '已通过' ? '审批通过。' : nextStatus === '已驳回' ? '审批驳回。' : '报废单已撤销。')
      });
      return Object.assign({}, item, { status: nextStatus, approvalRecords: records });
    });
    closeDeviceScrapModal();
  }

  function openDeviceReceiveModal(mode, id) {
    getManagedState('deviceReceive').pickerModal = null;
    var source = id ? findManagedItem('deviceReceive', id) : null;
    var item = source ? Object.assign({}, source, {
      projectCards: normalizeDeviceReceiveCards(source.projectCards),
      approvalRecords: (source.approvalRecords || []).map(function (record) { return Object.assign({}, record); })
    }) : {
      creator: '系统管理员',
      status: '待审核',
      createTime: '2026-04-10 10:00',
      remark: '',
      projectCards: normalizeDeviceReceiveCards([]),
      approvalRecords: []
    };
    getManagedState('deviceReceive').modal = { mode: mode, item: item };
    render();
  }

  function closeDeviceReceiveModal() {
    getManagedState('deviceReceive').modal = null;
    getManagedState('deviceReceive').pickerModal = null;
    render();
  }

  function syncDeviceReceiveCardProject(cardIndex, projectId) {
    var modal = getManagedState('deviceReceive').modal;
    if (!modal) return;
    var project = getAllProjectItems(getProjectArchiveState().tree).find(function (item) { return item.id === projectId; }) || { id: projectId, name: '' };
    modal.item.projectCards[cardIndex].projectId = project.id;
    modal.item.projectCards[cardIndex].projectName = project.name;
  }

  function syncDeviceReceiveNeedField(cardIndex, needIndex, field, value) {
    var modal = getManagedState('deviceReceive').modal;
    if (!modal) return;
    var need = modal.item.projectCards[cardIndex].needs[needIndex];
    if (!need) return;
    need[field] = value;
    if (field === 'category') {
      need.brand = deviceReceiveBrandOptions(value)[0] || '';
      need.model = deviceReceiveModelOptions(value, need.brand)[0] || '';
      need.selectedDevices = [];
      need.outboundQty = '';
      render();
      return;
    }
    if (field === 'brand') {
      need.model = deviceReceiveModelOptions(need.category, value)[0] || '';
      need.selectedDevices = [];
      need.outboundQty = '';
      render();
      return;
    }
    if (field === 'model') {
      need.selectedDevices = [];
      need.outboundQty = '';
      render();
    }
  }

  function addDeviceReceiveCard() {
    var modal = getManagedState('deviceReceive').modal;
    if (!modal) return;
    modal.item.projectCards.push(normalizeDeviceReceiveCards([])[0]);
    render();
  }

  function removeDeviceReceiveCard(cardIndex) {
    var modal = getManagedState('deviceReceive').modal;
    if (!modal) return;
    modal.item.projectCards = modal.item.projectCards.filter(function (_, index) { return index !== Number(cardIndex); });
    if (!modal.item.projectCards.length) modal.item.projectCards = normalizeDeviceReceiveCards([]);
    render();
  }

  function addDeviceReceiveNeed(cardIndex) {
    var modal = getManagedState('deviceReceive').modal;
    if (!modal) return;
    modal.item.projectCards[cardIndex].needs.push(createDeviceReceiveNeed());
    render();
  }

  function removeDeviceReceiveNeed(cardIndex, needIndex) {
    var modal = getManagedState('deviceReceive').modal;
    if (!modal) return;
    var card = modal.item.projectCards[cardIndex];
    card.needs = card.needs.filter(function (_, index) { return index !== Number(needIndex); });
    if (!card.needs.length) {
      card.needs = [createDeviceReceiveNeed()];
    }
    render();
  }

  function openDeviceReceiveOutboundPicker(cardIndex, needIndex) {
    var state = getManagedState('deviceReceive');
    if (!state.modal || state.modal.mode !== 'outbound') return;
    state.pickerModal = { cardIndex: Number(cardIndex), needIndex: Number(needIndex) };
    render();
  }

  function closeDeviceReceiveOutboundPicker() {
    getManagedState('deviceReceive').pickerModal = null;
    render();
  }

  function toggleDeviceReceiveOutboundDevice(deviceId) {
    var state = getManagedState('deviceReceive');
    var picker = state.pickerModal;
    if (!picker) return;
    var need = getDeviceReceiveNeed(picker.cardIndex, picker.needIndex);
    if (!need) return;
    var selectedDevices = (need.selectedDevices || []).map(function (device) { return Object.assign({}, device); });
    var currentIndex = selectedDevices.findIndex(function (device) { return device.id === deviceId; });
    if (currentIndex > -1) {
      selectedDevices.splice(currentIndex, 1);
    } else {
      var device = (getManagedState('deviceArchive').list || []).find(function (item) { return item.id === deviceId; });
      if (!device) return;
      if ((Number(need.qty) || 0) > 0 && selectedDevices.length >= Number(need.qty)) {
        return window.alert('已达到当前需求数量，不可继续选择设备。');
      }
      selectedDevices.push({
        id: device.id,
        code: device.code,
        name: device.name,
        category: device.category,
        brand: device.brand,
        model: device.model,
        batch: device.batch || '-',
        purchasePrice: device.purchasePrice
      });
    }
    need.selectedDevices = selectedDevices;
    syncDeviceReceiveOutboundQty(need);
    render();
  }

  function removeSelectedOutboundDevice(cardIndex, needIndex, deviceId) {
    var need = getDeviceReceiveNeed(Number(cardIndex), Number(needIndex));
    if (!need) return;
    need.selectedDevices = (need.selectedDevices || []).filter(function (device) { return device.id !== deviceId; });
    syncDeviceReceiveOutboundQty(need);
    render();
  }

  function confirmDeviceReceiveOutbound(id) {
    var state = getManagedState('deviceReceive');
    var modal = state.modal;
    if (!modal || !modal.item) return;
    var projectCards = normalizeDeviceReceiveCards(modal.item.projectCards);
    var totalOutboundQty = 0;
    var outboundSummary = [];
    var invalidNeed = null;
    projectCards.forEach(function (card) {
      (card.needs || []).forEach(function (need) {
        syncDeviceReceiveOutboundQty(need);
        var selectedCount = (need.selectedDevices || []).length;
        var needQty = Number(need.qty) || 0;
        if (selectedCount > needQty) invalidNeed = need;
        if (selectedCount > 0) {
          totalOutboundQty += selectedCount;
          outboundSummary.push((need.model || need.category || '设备') + ' x ' + selectedCount);
        }
      });
    });
    if (invalidNeed) return window.alert('出库数量不能大于需求数量，请检查当前设备选择。');
    if (!totalOutboundQty) return window.alert('请先选择要出库的设备。');
    state.list = state.list.map(function (item) {
      if (item.id !== id) return item;
      var summary = buildDeviceReceiveSummary(projectCards);
      var records = (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); });
      records.push({
        time: '2026-04-10 10:20',
        operator: '仓库管理员',
        action: '出库',
        remark: '已完成出库：' + outboundSummary.join('；')
      });
      return Object.assign({}, item, {
        status: '已出库',
        projectCards: projectCards,
        projectNames: summary.projectNames,
        qtySummary: summary.qtySummary,
        approvalRecords: records
      });
    });
    pushOutboundRecord('领用出库', id, modal.item.projectNames || '多项目领用', totalOutboundQty + '台');
    closeDeviceReceiveModal();
  }

  function saveDeviceReceive(formData) {
    var state = getManagedState('deviceReceive');
    var modal = state.modal;
    if (!modal) return;
    var creator = safeText(formData.get('creator')).trim() || '系统管理员';
    var remark = safeText(formData.get('remark')).trim();
    var projectCards = normalizeDeviceReceiveCards(modal.item.projectCards).map(function (card, cardIndex) {
      var projectId = safeText(formData.get('card-project-' + cardIndex)).trim();
      var project = getAllProjectItems(getProjectArchiveState().tree).find(function (item) { return item.id === projectId; }) || {};
        var needs = (card.needs || []).map(function (_, needIndex) {
          return {
            category: safeText(formData.get('card-' + cardIndex + '-need-category-' + needIndex)).trim(),
            brand: safeText(formData.get('card-' + cardIndex + '-need-brand-' + needIndex)).trim(),
            model: safeText(formData.get('card-' + cardIndex + '-need-model-' + needIndex)).trim(),
            qty: safeText(formData.get('card-' + cardIndex + '-need-qty-' + needIndex)).trim(),
            outboundQty: card.needs[needIndex] && card.needs[needIndex].outboundQty ? safeText(card.needs[needIndex].outboundQty).trim() : '',
            selectedDevices: (((card.needs[needIndex] || {}).selectedDevices) || []).map(function (device) { return Object.assign({}, device); })
          };
        }).filter(function (need) {
          return need.category || need.brand || need.model || need.qty;
        });
      return {
        projectId: projectId,
        projectName: project.name || card.projectName,
        needs: needs
      };
    }).filter(function (card) { return card.projectId || card.projectName; });
    if (!projectCards.length) return window.alert('请至少填写一个项目领用卡片');
    var invalidCard = projectCards.find(function (card) {
      return !card.projectId || !(card.needs || []).length || card.needs.some(function (need) { return !need.category || !need.brand || !need.model || !need.qty; });
    });
    if (invalidCard) return window.alert('请完整填写所属项目及设备分类、品牌、型号、需求数量');
    var summary = buildDeviceReceiveSummary(projectCards);
    var payload = {
      creator: creator,
      createTime: modal.item.createTime || '2026-04-10 10:00',
      status: modal.item.status || '待审核',
      projectCards: projectCards,
      projectNames: summary.projectNames,
      qtySummary: summary.qtySummary,
      remark: remark,
      approvalRecords: (modal.item.approvalRecords || []).map(function (record) { return Object.assign({}, record); })
    };
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      payload.id = 'LY-202604-' + String(state.nextId).padStart(3, '0');
      payload.approvalRecords.unshift({ time: payload.createTime, operator: creator, action: '创建', remark: '提交设备领用申请，待审核。' });
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function deleteDeviceReceive(id) {
    if (!window.confirm('确认删除该领用单吗？')) return;
    var state = getManagedState('deviceReceive');
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function updateDeviceReceiveStatus(id, nextStatus, remark) {
    var state = getManagedState('deviceReceive');
    state.list = state.list.map(function (item) {
      if (item.id !== id) return item;
      var records = (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); });
      records.push({
        time: '2026-04-10 10:20',
        operator: nextStatus === '已出库' ? '仓库管理员' : '李国华',
        action: nextStatus === '待出库' ? '同意' : nextStatus === '已出库' ? '出库' : nextStatus === '已撤销' ? '撤销' : '驳回',
        remark: remark || (nextStatus === '已出库' ? '已完成出库。' : nextStatus === '待出库' ? '审批通过，待出库。' : '流程已更新。')
      });
      return Object.assign({}, item, { status: nextStatus, approvalRecords: records });
    });
    closeDeviceReceiveModal();
  }

  function openInventoryModal(id) {
    var row = getInventoryAggregateRows().find(function (item) { return item.id === id; });
    var state = getManagedState('inventory');
    state.stockFilters = { code: '', category: '', brand: '' };
    state.modal = row ? { item: row } : null;
    render();
  }

  function closeInventoryModal() {
    getManagedState('inventory').modal = null;
    render();
  }

  function openDeviceArchiveModal(mode, id) {
    var item = id ? Object.assign({}, findManagedItem('deviceArchive', id)) : {};
    getManagedState('deviceArchive').modal = { mode: mode, item: item };
    render();
  }

  function closeDeviceArchiveModal() {
    getManagedState('deviceArchive').modal = null;
    render();
  }

  function saveDeviceArchive(formData) {
    var state = getManagedState('deviceArchive');
    var modal = state.modal;
    if (!modal || !modal.item || !modal.item.id) return;
    var code = safeText(formData.get('code')).trim();
    var name = safeText(formData.get('name')).trim();
    if (!code) return window.alert('请输入设备编码');
    if (!name) return window.alert('请输入设备名称');
    state.list = state.list.map(function (item) {
      return item.id === modal.item.id ? Object.assign({}, item, { code: code, name: name }) : item;
    });
    state.modal = null;
    render();
  }

  function openModelBrandModal(mode, id) {
    ensureModelStateInitialized();
    var state = getManagedState('model');
    var item = id ? Object.assign({}, state.brandList.find(function (brandItem) { return brandItem.id === id; }) || {}) : {};
    state.brandModal = { mode: mode, item: item };
    render();
  }

  function openModelModal(mode, id) {
    ensureModelStateInitialized();
    var state = getManagedState('model');
    var selectedBrand = getSelectedModelBrand();
    var item = id ? Object.assign({}, state.list.find(function (row) { return row.id === id; }) || {}) : {
      category: selectedBrand ? selectedBrand.category : '',
      brand: selectedBrand ? selectedBrand.brand : '',
      model: '',
      lowStockWarning: '',
      remark: ''
    };
    state.modal = { mode: mode, item: item };
    render();
  }

  function closeModelBrandModal() {
    getManagedState('model').brandModal = null;
    render();
  }

  function closeModelModal() {
    getManagedState('model').modal = null;
    render();
  }

  function saveModelBrand(formData) {
    ensureModelStateInitialized();
    var state = getManagedState('model');
    var modal = state.brandModal;
    if (!modal) return;
    var category = safeText(formData.get('category')).trim();
    var brand = safeText(formData.get('brand')).trim();
    if (!category) return window.alert('请选择分类');
    if (!brand) return window.alert('请输入品牌');
    var duplicate = state.brandList.find(function (item) {
      return item.category === category && item.brand === brand && item.id !== modal.item.id;
    });
    if (duplicate) return window.alert('当前分类下该品牌已存在');
    if (modal.mode === 'edit' && modal.item.id) {
      var oldCategory = modal.item.category;
      var oldBrand = modal.item.brand;
      state.brandList = state.brandList.map(function (item) {
        return item.id === modal.item.id ? Object.assign({}, item, { category: category, brand: brand }) : item;
      });
      state.list = state.list.map(function (item) {
        return item.category === oldCategory && item.brand === oldBrand ? Object.assign({}, item, { category: category, brand: brand }) : item;
      });
      if (state.selectedBrandId === modal.item.id) state.selectedBrandId = modal.item.id;
    } else {
      var newBrand = { id: 'MB-' + String(state.nextBrandId).padStart(3, '0'), category: category, brand: brand };
      state.brandList.push(newBrand);
      state.nextBrandId += 1;
      state.selectedBrandId = newBrand.id;
    }
    state.brandModal = null;
    render();
  }

  function saveModel(formData) {
    ensureModelStateInitialized();
    var state = getManagedState('model');
    var modal = state.modal;
    if (!modal) return;
    var category = safeText(formData.get('category')).trim();
    var brand = safeText(formData.get('brand')).trim();
    var modelName = safeText(formData.get('model')).trim();
    if (!category) return window.alert('请选择分类');
    if (!brand) return window.alert('请选择品牌');
    if (!modelName) return window.alert('请输入型号');
    var duplicate = state.list.find(function (item) {
      return item.category === category && item.brand === brand && item.model === modelName && item.id !== modal.item.id;
    });
    if (duplicate) return window.alert('该品牌下型号已存在');
    var payload = {
      category: category,
      brand: brand,
      model: modelName,
      lowStockWarning: safeText(formData.get('lowStockWarning')).trim(),
      remark: modal.item.remark || '',
      unit: modal.item.unit || '台',
      status: modal.item.status || '启用'
    };
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      payload.id = managedPageConfigs.model.idPrefix + String(state.nextId).padStart(3, '0');
      state.list.unshift(payload);
      state.nextId += 1;
    }
    var existsBrand = state.brandList.some(function (item) { return item.category === category && item.brand === brand; });
    if (!existsBrand) {
      var newBrand = { id: 'MB-' + String(state.nextBrandId).padStart(3, '0'), category: category, brand: brand };
      state.brandList.push(newBrand);
      state.nextBrandId += 1;
      state.selectedBrandId = newBrand.id;
    } else {
      state.selectedBrandId = (state.brandList.find(function (item) { return item.category === category && item.brand === brand; }) || {}).id || state.selectedBrandId;
    }
    state.modal = null;
    refreshModelBrandList();
    render();
  }

  function deleteModelBrand(id) {
    ensureModelStateInitialized();
    var state = getManagedState('model');
    var target = state.brandList.find(function (item) { return item.id === id; });
    if (!target) return;
    if (!window.confirm('确认删除该品牌吗？删除后该品牌下型号也会一并删除。')) return;
    state.brandList = state.brandList.filter(function (item) { return item.id !== id; });
    state.list = state.list.filter(function (item) { return !(item.category === target.category && item.brand === target.brand); });
    syncModelBrandSelection();
    render();
  }

  function deleteModel(id) {
    var state = getManagedState('model');
    if (!window.confirm('确认删除该型号吗？')) return;
    state.list = state.list.filter(function (item) { return item.id !== id; });
    refreshModelBrandList();
    render();
  }

  function managedFieldHTML(field, item, readOnly) {
    var value = safeText(item[field.key]);
    var spanClass = field.span === 2 ? ' field-span-2' : '';
    if (field.type === 'upload') {
      if (readOnly) {
        return '<label class="field modal-field' + spanClass + '"><span>' + field.label + '</span><div class="attachment-name-display"><span>' + escapeHtml(value || '未上传图片') + '</span></div></label>';
      }
      return '<div class="field modal-field' + spanClass + ' contract-attachment-field"><span>' + field.label + (field.required ? ' <em>*</em>' : '') + '</span><button type="button" class="btn secondary contract-upload-btn voucher-upload-btn">上传图片</button><div class="field-hint">仅支持上传图片演示</div></div>';
    }
    if (field.type === 'textarea') {
      return '<label class="field modal-field' + spanClass + '"><span>' + field.label + (field.required ? ' <em>*</em>' : '') + '</span><textarea name="' + field.key + '" ' + (readOnly ? 'disabled ' : '') + 'placeholder="' + escapeHtml(field.placeholder || '') + '">' + escapeHtml(value) + '</textarea></label>';
    }
    if (field.type === 'select') {
      return '<label class="field modal-field' + spanClass + '"><span>' + field.label + (field.required ? ' <em>*</em>' : '') + '</span><select name="' + field.key + '" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(managedFieldOptions(field), value, field.placeholder || '请选择') + '</select></label>';
    }
    return '<label class="field modal-field' + spanClass + '"><span>' + field.label + (field.required ? ' <em>*</em>' : '') + '</span><input type="' + (field.type || 'text') + '" name="' + field.key + '" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(value) + '" placeholder="' + escapeHtml(field.placeholder || '') + '" /></label>';
  }

  function findReceiptContractById(id) {
    return (getContractState().list || []).find(function (item) { return item.id === id; }) || null;
  }

  function findReceiptContractByProject(projectName) {
    return (getContractState().list || []).find(function (item) { return safeText(item.projectName) === safeText(projectName); }) || null;
  }

  function receiptContractSelectHTML(value, readOnly) {
    var options = (getContractState().list || []).map(function (item) {
      return { value: item.id, label: item.id + '｜' + (item.projectName || '-') };
    });
    return '<label class="field modal-field"><span>合同 <em>*</em></span><select name="contractId" data-receipt-contract ' + (readOnly ? 'disabled ' : '') + '>' + mappedOptionHTML(options, value, '请选择合同') + '</select></label>';
  }

  function receiptVoucherHTML(item, readOnly) {
    var voucherName = safeText(item.voucherImage).trim() || '未上传图片';
    if (readOnly) {
      return '<label class="field modal-field field-span-2"><span>凭证图片</span><div class="attachment-name-display"><span>' + escapeHtml(voucherName) + '</span></div></label>';
    }
    return '<div class="field modal-field field-span-2 contract-attachment-field"><span>凭证图片</span><button type="button" class="btn secondary contract-upload-btn voucher-upload-btn">上传图片</button><div class="field-hint">仅支持上传 1 张图片</div></div>';
  }

  function receiptModalHTML(item, modal, config) {
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'create' ? (config.createLabel || ('新增' + config.title)) : modal.mode === 'edit' ? ('编辑' + config.title) : (config.title + '详情');
    return '<div class="modal-mask" data-action="managed-modal-close" data-managed-key="receipt"><div class="modal-card customer-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + title + '</h3><p>' + config.intro + '</p></div><button class="icon-btn" data-action="managed-modal-close" data-managed-key="receipt">×</button></div><form id="managed-form" class="modal-body" data-managed-key="receipt"><div class="modal-grid modal-grid-2">' +
      receiptContractSelectHTML(item.contractId || '', readOnly) +
      '<label class="field modal-field"><span>关联项目 <em>*</em></span><input name="projectName" data-receipt-project readonly value="' + escapeHtml(item.projectName || '') + '" placeholder="选择合同后自动回显" /></label>' +
      '<label class="field modal-field"><span>回款日期 <em>*</em></span><input type="date" name="date" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.date || '') + '" /></label>' +
      '<label class="field modal-field"><span>回款类型 <em>*</em></span><select name="method" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(['预付款', '进度款', '尾款'], item.method || '', '请选择回款类型') + '</select></label>' +
      '<label class="field modal-field"><span>付款方 <em>*</em></span><input name="payerName" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.payerName || '') + '" placeholder="请输入付款方" /></label>' +
      '<label class="field modal-field"><span>付款账号</span><input name="payerAccount" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.payerAccount || '') + '" placeholder="请输入付款账号" /></label>' +
      '<label class="field modal-field"><span>回款金额 <em>*</em></span><input type="number" step="0.01" min="0" name="amount" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.amount || '') + '" placeholder="请输入回款金额" /></label>' +
      receiptVoucherHTML(item, readOnly) +
      '</div><div class="modal-footer">' + (readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') + '<button type="button" class="btn secondary" data-action="managed-modal-close" data-managed-key="receipt">关闭</button></div></form></div></div>';
  }

  function invoiceModalHTML(item, modal, config) {
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'create' ? (config.createLabel || ('新增' + config.title)) : modal.mode === 'edit' ? ('编辑' + config.title) : (config.title + '详情');
    return '<div class="modal-mask" data-action="managed-modal-close" data-managed-key="invoice"><div class="modal-card customer-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + title + '</h3><p>' + config.intro + '</p></div><button class="icon-btn" data-action="managed-modal-close" data-managed-key="invoice">×</button></div><form id="managed-form" class="modal-body" data-managed-key="invoice"><div class="modal-grid modal-grid-2">' +
      '<label class="field modal-field"><span>合同 <em>*</em></span><select name="contractId" data-invoice-contract ' + (readOnly ? 'disabled ' : '') + '>' + mappedOptionHTML((getContractState().list || []).map(function (contract) { return { value: contract.id, label: contract.id + '｜' + (contract.projectName || '-') }; }), item.contractId || '', '请选择合同') + '</select></label>' +
      '<label class="field modal-field"><span>关联项目 <em>*</em></span><input name="projectName" data-invoice-project readonly value="' + escapeHtml(item.projectName || '') + '" placeholder="选择合同后自动回显" /></label>' +
      '<label class="field modal-field"><span>开票金额 <em>*</em></span><input type="number" step="0.01" min="0" name="amount" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.amount || '') + '" placeholder="请输入开票金额" /></label>' +
      '<label class="field modal-field"><span>开票日期 <em>*</em></span><input type="date" name="date" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.date || '') + '" /></label>' +
      '<label class="field modal-field"><span>发票类型</span><select name="type" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(['专票', '普票'], item.type || '', '请选择发票类型') + '</select></label>' +
      '<label class="field modal-field"><span>开票人</span><input name="operator" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.operator || '') + '" placeholder="请输入开票人" /></label>' +
      receiptVoucherHTML({ voucherImage: item.voucherImage }, readOnly) +
      '<label class="field modal-field field-span-2"><span>备注</span><textarea name="remark" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea></label>' +
      '</div><div class="modal-footer">' + (readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') + '<button type="button" class="btn secondary" data-action="managed-modal-close" data-managed-key="invoice">关闭</button></div></form></div></div>';
  }

  function syncReceiptProjectField(contractId) {
    var contract = findReceiptContractById(contractId);
    var projectInput = root.querySelector('#managed-form[data-managed-key="receipt"] [data-receipt-project]');
    if (projectInput) projectInput.value = contract ? (contract.projectName || '') : '';
  }

  function syncInvoiceProjectField(contractId) {
    var contract = findReceiptContractById(contractId);
    var projectInput = root.querySelector('#managed-form[data-managed-key="invoice"] [data-invoice-project]');
    if (projectInput) projectInput.value = contract ? (contract.projectName || '') : '';
  }

  function getPerformanceState() {
    return getManagedState('performance');
  }

  function periodMatch(value, period) {
    if (!period) return true;
    return safeText(value).indexOf(period) === 0;
  }

  function formatPlainMoney(value) {
    return '¥' + (Number(value) || 0).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function findProjectByName(name) {
    return getAllProjectItems(getProjectArchiveState().tree).find(function (item) {
      return safeText(item.name) === safeText(name);
    }) || null;
  }

  function salespersonOfContract(contract) {
    if (!contract) return '';
    var project = contract.projectId ? findProjectById(contract.projectId) : findProjectByName(contract.projectName);
    return project ? (project.salesperson || '') : '';
  }

  function salespersonOfReceipt(receipt) {
    if (!receipt) return '';
    var contract = receipt.contractId ? findContract(receipt.contractId) : null;
    if (!contract && receipt.projectName) {
      contract = (getContractState().list || []).find(function (item) { return safeText(item.projectName) === safeText(receipt.projectName); }) || null;
    }
    if (contract) return salespersonOfContract(contract);
    var project = findProjectByName(receipt.projectName);
    return project ? (project.salesperson || '') : '';
  }

  function buildSalesPerformanceRows() {
    var filters = getPerformanceState().salesFilters || {};
    var contracts = getContractState().list || [];
    var receipts = getManagedState('receipt').list || [];
    return getSalespersonState().list.map(function (person) {
      var signedAmount = contracts.reduce(function (sum, contract) {
        if (salespersonOfContract(contract) !== person.name) return sum;
        if (!periodMatch(contract.signDate, filters.period)) return sum;
        return sum + parseMoney(contract.totalAmount || contract.amount || 0);
      }, 0);
      var receiptAmount = receipts.reduce(function (sum, receipt) {
        if (salespersonOfReceipt(receipt) !== person.name) return sum;
        if (!periodMatch(receipt.date, filters.period)) return sum;
        return sum + parseMoney(receipt.amount || 0);
      }, 0);
      return {
        name: person.name,
        phone: person.phone || '',
        team: person.team || '',
        signedAmount: signedAmount,
        receiptAmount: receiptAmount
      };
    }).filter(function (item) {
      if (filters.name && safeText(item.name).indexOf(safeText(filters.name).trim()) === -1) return false;
      if (filters.phone && safeText(item.phone).indexOf(safeText(filters.phone).trim()) === -1) return false;
      if (filters.team && safeText(item.team) !== safeText(filters.team)) return false;
      return true;
    });
  }

  function buildEngineerPerformanceRows() {
    var filters = getPerformanceState().engineerFilters || {};
    var surveyRows = getSurveyWorkorderState().list || [];
    var constructionRows = getConstructionWorkorderState().list || [];
    var maintenanceRows = getMaintenanceWorkorderState().list || [];
    return getEngineerState().list.map(function (person) {
      var surveyCount = surveyRows.filter(function (item) {
        return safeText(item.surveyor) === safeText(person.name) && periodMatch(item.createTime || item.planDate, filters.period);
      }).length;
      var constructionCount = constructionRows.filter(function (item) {
        return safeText(item.worker) === safeText(person.name) && periodMatch(item.createTime || item.planDate, filters.period);
      }).length;
      var maintenanceCount = maintenanceRows.filter(function (item) {
        return safeText(item.worker) === safeText(person.name) && periodMatch(item.createTime || item.planDate, filters.period);
      }).length;
      return {
        name: person.name,
        phone: person.phone || '',
        team: person.team || '',
        surveyCount: surveyCount,
        constructionCount: constructionCount,
        maintenanceCount: maintenanceCount,
        productionValue: formatPlainMoney((surveyCount * 12000) + (constructionCount * 68000) + (maintenanceCount * 18000)),
        totalCount: surveyCount + constructionCount + maintenanceCount
      };
    }).filter(function (item) {
      if (filters.name && safeText(item.name).indexOf(safeText(filters.name).trim()) === -1) return false;
      if (filters.phone && safeText(item.phone).indexOf(safeText(filters.phone).trim()) === -1) return false;
      if (filters.team && safeText(item.team) !== safeText(filters.team)) return false;
      return true;
    });
  }

  function performanceTabsHTML() {
    var activeTab = getPerformanceState().activeTab || 'sales';
    return '<div class="performance-tabs">' +
      '<button class="performance-tab ' + (activeTab === 'sales' ? 'active' : '') + '" data-action="performance-tab" data-tab="sales">销售业绩</button>' +
      '<button class="performance-tab ' + (activeTab === 'engineer' ? 'active' : '') + '" data-action="performance-tab" data-tab="engineer">工程业绩</button>' +
      '</div>';
  }

  function performanceFilterHTML(type) {
    var isSales = type === 'sales';
    var filters = isSales ? getPerformanceState().salesFilters : getPerformanceState().engineerFilters;
    var teamOptions = isSales ? data.salespersonOptions.teams : data.engineerOptions.teams;
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid performance-filter-grid">' +
      '<label class="field"><span>姓名</span><input data-performance-filter="' + type + '-name" value="' + escapeHtml(filters.name || '') + '" placeholder="请输入姓名" /></label>' +
      '<label class="field"><span>手机号</span><input data-performance-filter="' + type + '-phone" value="' + escapeHtml(filters.phone || '') + '" placeholder="请输入手机号" /></label>' +
      '<label class="field"><span>' + (isSales ? '团队' : '小组') + '</span><select data-performance-filter="' + type + '-team">' + optionHTML(teamOptions, filters.team, isSales ? '全部团队' : '全部小组') + '</select></label>' +
      '<label class="field"><span>统计周期</span><input type="month" data-performance-filter="' + type + '-period" value="' + escapeHtml(filters.period || currentPeriodMonth()) + '" /></label>' +
      '<div class="filter-actions"><button class="btn secondary" data-action="performance-reset" data-tab="' + type + '">重置</button><button class="btn primary" data-action="performance-search">查询</button></div>' +
      '</div></div>';
  }

  function performanceSalesTableHTML() {
    var rows = buildSalesPerformanceRows();
    return '<div class="panel table-panel customer-table-panel"><div class="panel-header"><div><h3>销售业绩列表</h3><p>共 ' + rows.length + ' 名销售人员，展示当期新签合同与回款表现。</p></div></div><table class="data-table customer-table"><thead><tr><th>姓名</th><th>手机号</th><th>团队</th><th>新签合同金额</th><th>回款金额</th></tr></thead><tbody>' +
      (rows.map(function (item) {
        return '<tr><td>' + escapeHtml(item.name) + '</td><td>' + escapeHtml(item.phone || '-') + '</td><td>' + escapeHtml(item.team || '-') + '</td><td>' + escapeHtml(formatPlainMoney(item.signedAmount)) + '</td><td>' + escapeHtml(formatPlainMoney(item.receiptAmount)) + '</td></tr>';
      }).join('') || '<tr><td colspan="5"><div class="empty-state">未查询到符合条件的销售业绩数据</div></td></tr>') +
      '</tbody></table></div>';
  }

  function performanceEngineerTableHTML() {
    var rows = buildEngineerPerformanceRows();
    return '<div class="panel table-panel customer-table-panel"><div class="panel-header"><div><h3>工程业绩列表</h3><p>共 ' + rows.length + ' 名工程人员，展示当期工勘、施工、生产产值与运维任务完成量。</p></div></div><table class="data-table customer-table"><thead><tr><th>姓名</th><th>手机号</th><th>小组</th><th>工勘数量</th><th>施工数量</th><th>生产产值</th><th>运维数量</th></tr></thead><tbody>' +
      (rows.map(function (item) {
        return '<tr><td>' + escapeHtml(item.name) + '</td><td>' + escapeHtml(item.phone || '-') + '</td><td>' + escapeHtml(item.team || '-') + '</td><td>' + escapeHtml(String(item.surveyCount)) + '</td><td>' + escapeHtml(String(item.constructionCount)) + '</td><td>' + escapeHtml(item.productionValue || '-') + '</td><td>' + escapeHtml(String(item.maintenanceCount)) + '</td></tr>';
      }).join('') || '<tr><td colspan="7"><div class="empty-state">未查询到符合条件的工程业绩数据</div></td></tr>') +
      '</tbody></table></div>';
  }

  function performanceSummaryHTML(type) {
    if (type === 'sales') {
      var salesRows = buildSalesPerformanceRows();
      var signTotal = salesRows.reduce(function (sum, item) { return sum + item.signedAmount; }, 0);
      var receiptTotal = salesRows.reduce(function (sum, item) { return sum + item.receiptAmount; }, 0);
      return '<div class="stats-grid">' +
        '<div class="stat-card"><div class="stat-title">销售人数</div><div class="stat-value">' + salesRows.length + '</div><div class="stat-desc">纳入当期统计</div></div>' +
        '<div class="stat-card"><div class="stat-title">新签合同金额</div><div class="stat-value">' + escapeHtml(formatPlainMoney(signTotal)) + '</div><div class="stat-desc">统计周期内新增合同</div></div>' +
        '<div class="stat-card"><div class="stat-title">回款金额</div><div class="stat-value">' + escapeHtml(formatPlainMoney(receiptTotal)) + '</div><div class="stat-desc">统计周期内已回款</div></div>' +
        '</div>';
    }
    var engineerRows = buildEngineerPerformanceRows();
    var surveyTotal = engineerRows.reduce(function (sum, item) { return sum + item.surveyCount; }, 0);
    var constructionTotal = engineerRows.reduce(function (sum, item) { return sum + item.constructionCount; }, 0);
    var maintenanceTotal = engineerRows.reduce(function (sum, item) { return sum + item.maintenanceCount; }, 0);
    return '<div class="stats-grid">' +
      '<div class="stat-card"><div class="stat-title">工程人数</div><div class="stat-value">' + engineerRows.length + '</div><div class="stat-desc">纳入当期统计</div></div>' +
      '<div class="stat-card"><div class="stat-title">工勘数量</div><div class="stat-value">' + surveyTotal + '</div><div class="stat-desc">工勘工单执行量</div></div>' +
      '<div class="stat-card"><div class="stat-title">施工数量</div><div class="stat-value">' + constructionTotal + '</div><div class="stat-desc">施工工单执行量</div></div>' +
      '<div class="stat-card"><div class="stat-title">运维数量</div><div class="stat-value">' + maintenanceTotal + '</div><div class="stat-desc">运维工单执行量</div></div>' +
      '</div>';
  }

  function performanceChartsHTML(type) {
    return '<div class="content-grid performance-chart-grid">' +
      chartPanel('chart-performance-main', type === 'sales' ? '销售业绩对比' : '工程任务对比', type === 'sales' ? '对比人员新签合同金额与回款金额' : '对比人员工勘、施工、运维任务数量') +
      chartPanel('chart-performance-rank', type === 'sales' ? '销售排名' : '工程排名', type === 'sales' ? '按回款金额展示人员排名' : '按任务总量展示人员排名') +
      '</div>';
  }

  function performancePageHTML() {
    var activeTab = getPerformanceState().activeTab || 'sales';
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">财务管理</div><h2>人员业绩</h2><p>按销售与工程两类角色展示当期业绩表现，支持筛选、对比和排名分析。</p></div></div>' +
      performanceTabsHTML() +
      performanceSummaryHTML(activeTab) +
      performanceFilterHTML(activeTab) +
      performanceChartsHTML(activeTab) +
      (activeTab === 'sales' ? performanceSalesTableHTML() : performanceEngineerTableHTML());
  }

  function managedSummaryHTML(key) {
    if (key !== 'deviceArchive') return '';
    var list = getManagedState(key).list;
    var groups = ['在线运行', '仓储空闲', '维修中', '待报废', '安装调试'];
    return '<div class="stats-grid">' + groups.map(function (name) {
      var count = list.filter(function (item) { return item.status === name; }).length;
      return '<div class="stat-card"><div class="stat-title">' + name + '</div><div class="stat-value">' + count + '</div><div class="stat-desc">设备状态数量统计</div></div>';
    }).join('') + '</div>';
  }

  function managedFiltersHTML(key) {
    var config = managedPageConfigs[key];
    var filters = getManagedState(key).filters;
    return '<div class="panel filter-panel customer-filter-panel"><div class="filter-grid team-filter-grid">' +
      (config.filters || []).map(function (field) {
        if (field.type === 'select') {
          return '<label class="field"><span>' + field.label + '</span><select data-managed-filter="' + field.key + '" data-managed-key="' + key + '">' + optionHTML(managedFieldOptions(field), filters[field.key], field.placeholder || '全部') + '</select></label>';
        }
        return '<label class="field"><span>' + field.label + '</span><input type="' + (field.type || 'text') + '" data-managed-filter="' + field.key + '" data-managed-key="' + key + '" value="' + escapeHtml(filters[field.key] || '') + '" placeholder="' + escapeHtml(field.placeholder || '') + '" /></label>';
      }).join('') +
      '<div class="filter-actions"><button class="btn secondary" data-action="managed-reset" data-managed-key="' + key + '">重置</button><button class="btn primary" data-action="managed-search" data-managed-key="' + key + '">查询</button></div></div></div>';
  }

  function managedTableHTML(key) {
    var config = managedPageConfigs[key];
    var rows = getManagedRows(key);
    return '<div class="panel table-panel customer-table-panel"><div class="panel-header"><div><h3>' + config.title + '列表</h3><p>共 ' + rows.length + ' 条记录，支持演示数据查询与基础交互。</p></div><div class="toolbar">' +
      ((config.toolbarActions || []).map(function (action) {
        return '<button class="btn secondary" data-action="managed-toolbar" data-managed-key="' + key + '" data-extra-action="' + action.key + '">' + action.label + '</button>';
      }).join('')) +
      '</div></div><table class="data-table customer-table"><thead><tr>' +
      config.columns.map(function (column) { return '<th>' + column.label + '</th>'; }).join('') +
      '<th>操作</th></tr></thead><tbody>' +
      (rows.map(function (item) {
        return '<tr>' + config.columns.map(function (column) {
          var value = safeText(item[column.key] || '-');
          if (column.link) return '<td><button class="text-link" data-action="managed-view" data-managed-key="' + key + '" data-id="' + item.id + '">' + escapeHtml(value) + '</button></td>';
          if (column.badge) return '<td><span class="status ' + badgeClass(value) + '">' + escapeHtml(value) + '</span></td>';
          return '<td>' + escapeHtml(value) + '</td>';
        }).join('') + '<td><div class="table-actions">' + (config.actions || []).map(function (action) {
          var actionKey = typeof action === 'string' ? action : action.key;
          var label = managedActionLabel(action);
          var danger = /delete|revoke/.test(actionKey) ? ' danger-link' : '';
          return '<button class="link-btn' + danger + '" data-action="managed-' + actionKey + '" data-managed-key="' + key + '" data-id="' + item.id + '">' + label + '</button>';
        }).join('') + '</div></td></tr>';
      }).join('')) || '<tr><td colspan="' + (config.columns.length + 1) + '"><div class="empty-state">未查询到符合条件的数据</div></td></tr>' +
      '</tbody></table></div>';
  }

  function managedModalHTML(key) {
    var state = getManagedState(key);
    var modal = state.modal;
    if (!modal) return '';
    var config = managedPageConfigs[key];
    var item = modal.item || {};
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'create' ? (config.createLabel || ('新增' + config.title)) : modal.mode === 'edit' ? ('编辑' + config.title) : (config.title + '详情');
    if (key === 'purchaseOrder') {
      return purchaseOrderModalHTML(item, modal);
    }
    if (key === 'supplierScore' && modal.isScoreRecord) {
      return '<div class="modal-mask" data-action="managed-modal-close" data-managed-key="' + key + '"><div class="modal-card customer-modal" data-stop-close="1"><div class="modal-header"><div><h3>评分记录</h3><p>查看该供应商历次评分记录</p></div><button class="icon-btn" data-action="managed-modal-close" data-managed-key="' + key + '">×</button></div><div class="modal-body"><div class="modal-section"><h4>供应商</h4><div class="detail-item"><strong>' + escapeHtml(item.supplierName || '-') + '</strong></div></div><div class="modal-section"><h4>评分记录列表</h4>' + supplierScoreRecordListHTML(item) + '</div></div><div class="modal-footer"><button type="button" class="btn secondary" data-action="managed-modal-close" data-managed-key="' + key + '">关闭</button></div></div></div>';
    }
    if (key === 'receipt') {
      return receiptModalHTML(item, modal, config);
    }
    if (key === 'invoice') {
      return invoiceModalHTML(item, modal, config);
    }
    return '<div class="modal-mask" data-action="managed-modal-close" data-managed-key="' + key + '"><div class="modal-card customer-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + title + '</h3><p>' + config.intro + '</p></div><button class="icon-btn" data-action="managed-modal-close" data-managed-key="' + key + '">×</button></div><form id="managed-form" class="modal-body" data-managed-key="' + key + '"><div class="modal-grid modal-grid-2">' +
      (config.form || []).map(function (field) { return managedFieldHTML(field, item, readOnly); }).join('') +
      '</div><div class="modal-footer">' + (readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') + '<button type="button" class="btn secondary" data-action="managed-modal-close" data-managed-key="' + key + '">关闭</button></div></form></div></div>';
  }

  function managedPageHTML(key) {
    if (key === 'model') {
      return modelManagementPageHTML();
    }
    if (key === 'deviceArchive') {
      return deviceArchivePageHTML();
    }
    if (key === 'inventory') {
      return inventoryPageHTML();
    }
    if (key === 'investor') {
      return investorPageHTML();
    }
    if (key === 'projectProfit') {
      return projectProfitPageHTML();
    }
    if (key === 'performance') {
      return performancePageHTML();
    }
    if (key === 'deviceReceive') {
      return deviceReceivePageHTML();
    }
    if (key === 'deviceReturn') {
      return deviceReturnPageHTML();
    }
    if (key === 'deviceRepair') {
      return deviceRepairPageHTML();
    }
    if (key === 'deviceScrap') {
      return deviceScrapPageHTML();
    }
    if (key === 'inboundRecord') {
      return inboundRecordPageHTML();
    }
    if (key === 'outboundRecord') {
      return outboundRecordPageHTML();
    }
    if (key === 'alarmRecord') {
      return alarmRecordPageHTML();
    }
    var config = managedPageConfigs[key];
    return '<div class="sub-hero customer-hero"><div><div class="eyebrow">' + config.eyebrow + '</div><h2>' + config.title + '</h2><p>' + config.intro + '</p></div><div class="sub-actions">' +
      (config.createLabel ? '<button class="btn primary" data-action="managed-create" data-managed-key="' + key + '">' + config.createLabel + '</button>' : '') +
      '</div></div>' + managedSummaryHTML(key) + managedFiltersHTML(key) + managedTableHTML(key) + managedModalHTML(key);
  }

  function findManagedItem(key, id) {
    return getManagedState(key).list.find(function (item) { return item.id === id; });
  }

  function openManagedModal(key, mode, id) {
    var state = getManagedState(key);
    var item = id ? Object.assign({}, findManagedItem(key, id)) : {};
    if (key === 'purchaseOrder') {
      item = id ? Object.assign({}, findManagedItem(key, id), {
        details: normalizePurchaseOrderDetails((findManagedItem(key, id) || {}).details),
        approvalRecords: (((findManagedItem(key, id) || {}).approvalRecords) || []).map(function (record) { return Object.assign({}, record); })
      }) : { details: normalizePurchaseOrderDetails([]), creator: '系统管理员', status: '待审核', inboundStatus: '待入库', approvalRecords: [] };
    }
    if (key === 'supplierScore' && mode === 'score-record') {
      state.modal = { mode: 'view', item: item || {}, isScoreRecord: true };
      render();
      return;
    }
    if (key === 'receipt') {
      var contract = item.contractId ? findReceiptContractById(item.contractId) : findReceiptContractByProject(item.projectName || '');
      item = Object.assign({
        contractId: contract ? contract.id : '',
        contractName: contract ? contract.id : '',
        projectName: contract ? (contract.projectName || '') : '',
        date: '',
        method: '',
        payerName: '',
        payerAccount: '',
        amount: '',
        voucherImage: ''
      }, item);
      item.amount = item.amount ? (parseMoney(item.amount).toFixed(2)) : '';
      if (!item.projectName && contract) item.projectName = contract.projectName || '';
      if (!item.contractId && contract) item.contractId = contract.id;
    }
    if (key === 'invoice') {
      var invoiceContract = item.contractId ? findReceiptContractById(item.contractId) : findReceiptContractByProject(item.projectName || '');
      item = Object.assign({
        contractId: invoiceContract ? invoiceContract.id : '',
        projectName: invoiceContract ? (invoiceContract.projectName || '') : '',
        amount: '',
        date: '',
        type: '',
        operator: '',
        voucherImage: '',
        remark: ''
      }, item);
      item.amount = item.amount ? parseMoney(item.amount).toFixed(2) : '';
      if (!item.projectName && invoiceContract) item.projectName = invoiceContract.projectName || '';
      if (!item.contractId && invoiceContract) item.contractId = invoiceContract.id;
    }
    state.modal = { mode: mode, item: item };
    render();
  }

  function closeManagedModal(key) {
    getManagedState(key).modal = null;
    render();
  }

  function saveManagedModule(key, formData) {
    var state = getManagedState(key);
    var config = managedPageConfigs[key];
    var modal = state.modal;
    if (!modal) return;
    if (key === 'purchaseOrder') {
      var supplierName = safeText(formData.get('supplierName')).trim();
      var creator = safeText(formData.get('creator')).trim() || modal.item.creator || '系统管理员';
      var details = normalizePurchaseOrderDetails((modal.item && modal.item.details) || []).map(function (detail, index) {
        var category = safeText(formData.get('detail-category-' + index)).trim();
        var brand = safeText(formData.get('detail-brand-' + index)).trim();
        var model = safeText(formData.get('detail-model-' + index)).trim();
        var qty = safeText(formData.get('detail-qty-' + index)).trim();
        var price = safeText(formData.get('detail-price-' + index)).trim();
        var amount = (Number(qty) || 0) * (Number(price) || 0);
        return { category: category, brand: brand, model: model, qty: qty, price: price, amount: amount ? amount.toFixed(2) : '' };
      }).filter(function (detail) {
        return detail.category || detail.brand || detail.model || detail.qty || detail.price;
      });
      if (!supplierName) {
        window.alert('请选择供应商名称');
        return;
      }
      if (!details.length) {
        window.alert('请至少填写一条采购明细');
        return;
      }
      var invalidDetail = details.find(function (detail) {
        return !detail.category || !detail.brand || !detail.model || !detail.qty || !detail.price;
      });
      if (invalidDetail) {
        window.alert('请完整填写采购明细中的分类、品牌、型号、数量、单价');
        return;
      }
      var supplier = (data.supplierList || []).find(function (row) { return row.name === supplierName; }) || {};
      var amountText = purchaseOrderAmountText(details);
      var payloadOrder = {
        supplierId: supplier.id || modal.item.supplierId || '',
        supplierName: supplierName,
        amount: amountText,
        creator: creator,
        details: details,
        status: modal.item.status || '待审核',
        inboundStatus: modal.item.inboundStatus || '待入库',
        createTime: modal.item.createTime || '2026-04-09 20:30',
        approvalRecords: (modal.item.approvalRecords || []).map(function (record) { return Object.assign({}, record); })
      };
      if (modal.mode === 'edit' && modal.item.id) {
        state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payloadOrder, { id: modal.item.id }) : item; });
      } else {
        payloadOrder.id = config.idPrefix + String(state.nextId).padStart(3, '0');
        payloadOrder.approvalRecords.unshift({ time: payloadOrder.createTime, operator: creator, action: '创建', remark: '提交采购单，待审核。' });
        state.list.unshift(payloadOrder);
        state.nextId += 1;
      }
      state.modal = null;
      render();
      return;
    }
    if (key === 'receipt') {
      var contractId = safeText(formData.get('contractId')).trim();
      var contractItem = findReceiptContractById(contractId);
      var amountValue = safeText(formData.get('amount')).trim();
      var amountNumber = Number(amountValue);
      if (!contractId || !contractItem) {
        window.alert('请选择合同');
        return;
      }
      if (!safeText(formData.get('date')).trim()) {
        window.alert('请填写必填项：回款日期');
        return;
      }
      if (!safeText(formData.get('method')).trim()) {
        window.alert('请填写必填项：回款类型');
        return;
      }
      if (!safeText(formData.get('payerName')).trim()) {
        window.alert('请填写必填项：付款方');
        return;
      }
      if (!amountValue) {
        window.alert('请填写必填项：回款金额');
        return;
      }
      if (!/^\d+(\.\d{1,2})?$/.test(amountValue) || Number.isNaN(amountNumber)) {
        window.alert('回款金额需为数字，且最多保留两位小数');
        return;
      }
      var receiptPayload = {
        contractId: contractItem.id,
        contractName: contractItem.id,
        projectName: contractItem.projectName || '',
        customerName: contractItem.customerName || '',
        payerName: safeText(formData.get('payerName')).trim(),
        payerAccount: safeText(formData.get('payerAccount')).trim(),
        amount: formatMoney(amountNumber.toFixed(2)),
        date: safeText(formData.get('date')).trim(),
        method: safeText(formData.get('method')).trim(),
        voucherImage: modal.item.voucherImage || '',
        operator: modal.item.operator || '财务专员',
        remark: modal.item.remark || ''
      };
      if (modal.mode === 'edit' && modal.item.id) {
        state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, receiptPayload, { id: modal.item.id }) : item; });
      } else {
        receiptPayload.id = config.idPrefix + String(state.nextId).padStart(3, '0');
        state.list.unshift(receiptPayload);
        state.nextId += 1;
      }
      state.modal = null;
      render();
      return;
    }
    if (key === 'invoice') {
      var invoiceContractId = safeText(formData.get('contractId')).trim();
      var invoiceContract = findReceiptContractById(invoiceContractId);
      var invoiceAmountValue = safeText(formData.get('amount')).trim();
      var invoiceAmountNumber = Number(invoiceAmountValue);
      if (!invoiceContractId || !invoiceContract) {
        window.alert('请选择合同');
        return;
      }
      if (!invoiceAmountValue) {
        window.alert('请填写必填项：开票金额');
        return;
      }
      if (!/^\d+(\.\d{1,2})?$/.test(invoiceAmountValue) || Number.isNaN(invoiceAmountNumber)) {
        window.alert('开票金额需为数字，且最多保留两位小数');
        return;
      }
      if (!safeText(formData.get('date')).trim()) {
        window.alert('请填写必填项：开票日期');
        return;
      }
      var invoicePayload = {
        contractId: invoiceContract.id,
        projectName: invoiceContract.projectName || '',
        customerName: invoiceContract.customerName || '',
        amount: formatMoney(invoiceAmountNumber.toFixed(2)),
        date: safeText(formData.get('date')).trim(),
        type: safeText(formData.get('type')).trim(),
        operator: safeText(formData.get('operator')).trim(),
        voucherImage: modal.item.voucherImage || '',
        remark: safeText(formData.get('remark')).trim()
      };
      if (modal.mode === 'edit' && modal.item.id) {
        state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, invoicePayload, { id: modal.item.id }) : item; });
      } else {
        invoicePayload.id = config.idPrefix + String(state.nextId).padStart(3, '0');
        state.list.unshift(invoicePayload);
        state.nextId += 1;
      }
      state.modal = null;
      render();
      return;
    }
    var payload = {};
    (config.form || []).forEach(function (field) {
      payload[field.key] = safeText(formData.get(field.key)).trim();
    });
    var requiredField = (config.form || []).find(function (field) { return field.required && !payload[field.key]; });
    if (requiredField) {
      window.alert('请填写必填项：' + requiredField.label);
      return;
    }
    if (key === 'supplierScore') {
      payload.assessor = modal.item.assessor || '系统管理员';
      payload.scoreTime = modal.item.scoreTime || '2026-04-09 20:10';
    }
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      payload.id = config.idPrefix + String(state.nextId).padStart(config.idPrefix.indexOf('202604-') > -1 ? 3 : 3, '0');
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function updatePurchaseOrderLiveTotals() {
    var total = 0;
    root.querySelectorAll('[data-purchase-amount]').forEach(function (node) {
      var index = node.getAttribute('data-purchase-amount');
      var qtyInput = root.querySelector('input[name="detail-qty-' + index + '"]');
      var priceInput = root.querySelector('input[name="detail-price-' + index + '"]');
      var qty = qtyInput ? Number(qtyInput.value) || 0 : 0;
      var price = priceInput ? Number(priceInput.value) || 0 : 0;
      var amount = qty * price;
      node.textContent = amount ? amount.toFixed(2) : '0.00';
      total += amount;
    });
    var totalNode = root.querySelector('[data-purchase-total]');
    if (totalNode) totalNode.textContent = total.toFixed(2);
    var amountDisplay = root.querySelector('[data-purchase-amount-display]');
    if (amountDisplay) amountDisplay.value = '¥' + total.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function updatePurchaseOrderDetailField(index, field, value) {
    var modal = getManagedState('purchaseOrder').modal;
    if (!modal) return;
    var details = normalizePurchaseOrderDetails(modal.item.details);
    if (!details[index]) details[index] = createEmptyPurchaseOrderDetail();
    details[index][field] = value;
    if (field === 'category') {
      var brands = uniquePurchaseFieldValues('brand', { category: value });
      details[index].brand = brands.indexOf(details[index].brand) > -1 ? details[index].brand : (brands[0] || '');
      var models = uniquePurchaseFieldValues('model', { category: value, brand: details[index].brand });
      details[index].model = models.indexOf(details[index].model) > -1 ? details[index].model : (models[0] || '');
    }
    if (field === 'brand') {
      var nextModels = uniquePurchaseFieldValues('model', { category: details[index].category, brand: value });
      details[index].model = nextModels.indexOf(details[index].model) > -1 ? details[index].model : (nextModels[0] || '');
    }
    modal.item.details = details;
    render();
  }

  function syncPurchaseOrderDetailValue(index, field, value) {
    var modal = getManagedState('purchaseOrder').modal;
    if (!modal) return;
    var details = normalizePurchaseOrderDetails(modal.item.details);
    if (!details[index]) details[index] = createEmptyPurchaseOrderDetail();
    details[index][field] = value;
    modal.item.details = details;
  }

  function addPurchaseOrderDetail() {
    var modal = getManagedState('purchaseOrder').modal;
    if (!modal) return;
    modal.item.details = normalizePurchaseOrderDetails(modal.item.details);
    modal.item.details.push(createEmptyPurchaseOrderDetail());
    render();
  }

  function removePurchaseOrderDetail(index) {
    var modal = getManagedState('purchaseOrder').modal;
    if (!modal) return;
    modal.item.details = normalizePurchaseOrderDetails(modal.item.details).filter(function (_, rowIndex) { return rowIndex !== Number(index); });
    if (!modal.item.details.length) modal.item.details = [createEmptyPurchaseOrderDetail()];
    render();
  }

  function updatePurchaseOrderStatus(id, nextStatus, remark) {
    var state = getManagedState('purchaseOrder');
    state.list = state.list.map(function (item) {
      if (item.id !== id) return item;
      var approvalRecords = (item.approvalRecords || []).map(function (record) { return Object.assign({}, record); });
      approvalRecords.push({
        time: '2026-04-09 20:40',
        operator: nextStatus === '已入库' ? '仓库管理员' : '李国华',
        action: nextStatus === '已入库' ? '入库' : (nextStatus === '已审核' ? '同意' : '驳回'),
        remark: remark || (nextStatus === '已入库' ? '采购明细已完成入库。' : '审核处理完成。')
      });
      return Object.assign({}, item, nextStatus === '已入库'
        ? { inboundStatus: '已入库', approvalRecords: approvalRecords }
        : { status: nextStatus, approvalRemark: remark || item.approvalRemark || '', approvalRecords: approvalRecords });
    });
    closeManagedModal('purchaseOrder');
  }

  function deleteManagedModule(key, id) {
    if (!window.confirm('确认删除该记录吗？此操作仅影响演示数据。')) return;
    var state = getManagedState(key);
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function pushInboundRecord(sourceType, sourceId, model, qty) {
    getManagedState('inboundRecord').list.unshift({
      id: 'RK-202604-' + String(getManagedState('inboundRecord').nextId).padStart(3, '0'),
      sourceType: sourceType,
      sourceId: sourceId,
      model: model,
      qty: qty,
      warehouse: '主仓',
      operator: '仓库管理员',
      time: '2026-04-09 19:40'
    });
    getManagedState('inboundRecord').nextId += 1;
  }

  function pushOutboundRecord(sourceType, sourceId, model, qty) {
    getManagedState('outboundRecord').list.unshift({
      id: 'CK-202604-' + String(getManagedState('outboundRecord').nextId).padStart(3, '0'),
      sourceType: sourceType,
      sourceId: sourceId,
      model: model,
      qty: qty,
      warehouse: '主仓',
      operator: '仓库管理员',
      time: '2026-04-09 19:40'
    });
    getManagedState('outboundRecord').nextId += 1;
  }

  function handleManagedExtraAction(key, action, id) {
    var state = getManagedState(key);
    var item = id ? findManagedItem(key, id) : null;
    if (action === 'drill') return setRoute('/pc/purchase/order');
    if (key === 'purchaseOrder' && action === 'approve') {
      return openManagedModal(key, 'approve', id);
    }
    if (key === 'purchaseOrder' && action === 'inbound') {
      return openManagedModal(key, 'inbound', id);
    }
    if (action === 'approve') {
      state.list = state.list.map(function (row) { return row.id === id ? Object.assign({}, row, { status: '已通过' }) : row; });
      return render();
    }
    if (action === 'inbound') {
      if (key === 'purchaseOrder') {
        state.list = state.list.map(function (row) { return row.id === id ? Object.assign({}, row, { status: '已入库', inboundStatus: '已入库' }) : row; });
        if (item) pushInboundRecord('采购入库', item.id, item.type === '劳务采购' ? '劳务服务' : '采购物资', '1批');
      } else if (key === 'deviceReturn') {
        state.list = state.list.map(function (row) { return row.id === id ? Object.assign({}, row, { status: '已入库' }) : row; });
        if (item) pushInboundRecord('退回入库', item.id, item.model, item.qty);
      }
      return render();
    }
    if (action === 'outbound') {
      state.list = state.list.map(function (row) { return row.id === id ? Object.assign({}, row, { status: '已出库' }) : row; });
      if (item) pushOutboundRecord('领用出库', item.id, item.model, item.qty);
      return render();
    }
    if (action === 'revoke') {
      state.list = state.list.map(function (row) { return row.id === id ? Object.assign({}, row, { status: '已撤销' }) : row; });
      return render();
    }
    if (action === 'repair') {
      window.alert('已根据告警自动跳转至运维工单页，请继续创建报修工单。');
      return setRoute('/pc/project/maintenance-workorder');
    }
    if (action === 'import' || action === 'export') {
      return window.alert((action === 'import' ? '批量导入' : '导出') + '功能已在演示版中模拟。');
    }
  }

  function tableHTML(config) {
    if (!config) return '';
    return [
      '<div class="panel table-panel">',
      '<div class="panel-header"><div><h3>业务明细</h3><p>演示数据可作为后续逐页深化基础</p></div>',
      '<div class="toolbar"><button class="btn secondary">导出</button><button class="btn primary">新建</button></div></div>',
      '<table class="data-table"><thead><tr>',
      config.columns.map(function (column) { return '<th>' + column + '</th>'; }).join(''),
      '</tr></thead><tbody>',
      config.rows.map(function (row) {
        return '<tr>' + row.map(function (cell) {
          var value = String(cell);
          var isTag = /(正常|低库存|充足|重点跟进|方案汇报中|已签约|施工中|待开工|运维中|验收准备|处理中|待派工|待受理|履约中|待生效|已通过|审批中|在岗|驻场|观察中|长期合作|回款预警|启用|一级|二级)/.test(value);
          return '<td>' + (isTag ? '<span class="status ' + badgeClass(value) + '">' + value + '</span>' : value) + '</td>';
        }).join('') + '</tr>';
      }).join(''),
      '</tbody></table></div>'
    ].join('');
  }

  function statCardsHTML(wrapperClass) {
    return '<div class="stats-grid dashboard-stats' + (wrapperClass ? ' ' + wrapperClass : '') + '">' + data.dashboard.metricCards.map(function (item, index) {
      var toneClass = item.tone ? ' tone-' + item.tone : '';
      return '<button class="stat-card stat-card-link glow-' + ((index % 3) + 1) + toneClass + '" data-route="' + item.route + '"><div class="stat-title">' + item.label + '</div><div class="stat-value">' + item.value + '</div><div class="stat-desc">' + item.sub + '</div></button>';
    }).join('') + '</div>';
  }

  function noticeHTML() {
    return [
      '<div class="panel notice-panel"><div class="panel-header"><div><h3>重点提醒</h3></div></div>',
      '<div class="notice-list">',
      data.notices.map(function (item) {
        return '<div class="notice-item ' + item.level + '"><div><strong>' + item.title + '</strong><span>' + item.time + '</span></div><button class="link-btn" data-route="/pc/asset/alarm">查看详情</button></div>';
      }).join(''),
      '</div></div>'
    ].join('');
  }

  function timelineHTML(items, title, subtitle) {
    return [
      '<div class="panel timeline-panel"><div class="panel-header"><div><h3>' + title + '</h3>' + (subtitle ? '<p>' + subtitle + '</p>' : '') + '</div></div>',
      '<div class="timeline">',
      items.map(function (item) {
        return '<div class="timeline-item"><span class="timeline-dot"></span><div class="timeline-time">' + (item.time || item.status || '') + '</div><div class="timeline-content"><strong>' + item.title + '</strong><p>' + (item.tag || item.desc || '') + (item.amount ? ' · ' + item.amount : '') + '</p></div></div>';
      }).join(''),
      '</div></div>'
    ].join('');
  }

  function chartPanel(id, title, sub) {
    return '<div class="panel chart-panel"><div class="panel-header"><div><h3>' + title + '</h3>' + (sub ? '<p>' + sub + '</p>' : '') + '</div></div><div class="chart" id="' + id + '"></div></div>';
  }

  function richDashboardChartPanel(config) {
    return [
      '<div class="panel chart-panel chart-panel-rich">',
      '<div class="panel-header panel-header-rich"><div><h3>' + safeText(config.title) + '</h3>' + (config.sub ? '<p>' + safeText(config.sub) + '</p>' : '') + '</div></div>',
      '<div class="chart chart-rich" id="' + config.id + '"></div>',
      '</div>'
    ].join('');
  }

  function stackedChartPanel(config) {
    return [
      '<div class="panel chart-panel chart-panel-stack">',
      '<div class="panel-header"><div><h3>' + safeText(config.title) + '</h3>' + (config.sub ? '<p>' + safeText(config.sub) + '</p>' : '') + '</div></div>',
      '<div class="chart-stack">',
      '<div class="chart chart-stack-main" id="' + config.topId + '"></div>',
      '<div class="chart-stack-divider"><span>' + safeText(config.bottomTitle || '') + '</span></div>',
      '<div class="chart chart-stack-sub" id="' + config.bottomId + '"></div>',
      '</div>',
      '</div>'
    ].join('');
  }

  function dualPieChartPanel(config) {
    return [
      '<div class="panel chart-panel dual-pie-panel">',
      '<div class="panel-header"><div><h3>' + safeText(config.title) + '</h3>' + (config.sub ? '<p>' + safeText(config.sub) + '</p>' : '') + '</div></div>',
      '<div class="dual-pie-grid">',
      '<div class="dual-pie-item"><div class="dual-pie-title">' + safeText(config.leftTitle) + '</div><div class="chart dual-pie-chart" id="' + config.leftId + '"></div></div>',
      '<div class="dual-pie-item"><div class="dual-pie-title">' + safeText(config.rightTitle) + '</div><div class="chart dual-pie-chart" id="' + config.rightId + '"></div></div>',
      '</div>',
      '</div>'
    ].join('');
  }

  function projectMilestoneHTML(items) {
    var milestones = items || [];
    var completedCount = milestones.filter(function (item) { return item.status === 'done'; }).length;
    var activeIndex = milestones.findIndex(function (item) { return item.status === 'active'; });
    var progressIndex = activeIndex >= 0 ? activeIndex : completedCount;
    var progressWidth = milestones.length > 1 ? (progressIndex / (milestones.length - 1)) * 100 : 100;
    return [
      '<div class="panel project-milestone-panel">',
      '<div class="project-milestone-track"><span class="project-milestone-fill" style="width:' + progressWidth + '%"></span></div>',
      '<div class="project-milestone-list">',
      milestones.map(function (item) {
        return '<div class="project-milestone-item ' + (item.status || 'pending') + '">' +
          '<div class="project-milestone-dot"><span class="project-milestone-icon">' + ((item.status === 'done') ? '✓' : '') + '</span></div>' +
          '<div class="project-milestone-label">' + escapeHtml(item.label || '-') + '</div>' +
          '<div class="project-milestone-date">' + escapeHtml(item.date || '-') + '</div>' +
        '</div>';
      }).join(''),
      '</div>',
      '</div>'
    ].join('');
  }

  function contractAnalysisPanel(config) {
    var cards = (config.cards || []).map(function (item) {
      return '<div class="contract-mini-card"><span>' + safeText(item.label) + '</span><strong>' + safeText(item.value) + '</strong></div>';
    }).join('');
    return [
      '<div class="panel chart-panel contract-analysis-panel">',
      '<div class="panel-header"><div><h3>' + safeText(config.title) + '</h3>' + (config.sub ? '<p>' + safeText(config.sub) + '</p>' : '') + '</div></div>',
      '<div class="contract-analysis-grid">',
      '<div class="chart contract-analysis-chart" id="' + config.chartId + '"></div>',
      '<div class="contract-analysis-side">',
      '<div class="contract-side-title">' + safeText(config.sideTitle || '月度汇总') + '</div>',
      cards,
      '</div>',
      '</div>',
      '</div>'
    ].join('');
  }

  function dashboardHeroHTML() {
    return [
      '<div class="hero-banner dashboard-hero">',
      '<div class="dashboard-hero-main"><div class="dashboard-hero-top"><div class="eyebrow">国企数字化 · 消防工程 · 项目经营驾驶舱</div><div class="hero-actions dashboard-hero-actions"><button class="btn primary" data-route="/pc/project/archive">查看项目全景</button><button class="btn secondary" data-route="/pc/finance/profit">查看经营分析</button></div></div>' + statCardsHTML('dashboard-hero-stats') + '</div>',
      '</div>'
    ].join('');
  }

  function customerArchiveFiltersHTML() {
    var filters = getCustomerArchiveState().filters;
    var opts = data.customerArchiveOptions;
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid">',
      '<label class="field"><span>客户名称</span><input data-filter="name" value="' + escapeHtml(filters.name) + '" placeholder="请输入客户名称" /></label>',
      '<label class="field"><span>统一社会信用代码</span><input data-filter="creditCode" value="' + escapeHtml(filters.creditCode) + '" placeholder="请输入统一社会信用代码" /></label>',
      '<label class="field"><span>客户规模</span><select data-filter="scale">' + optionHTML(opts.scales, filters.scale, '全部规模') + '</select></label>',
      '<label class="field"><span>标签</span><select data-filter="tag">' + optionHTML(opts.tags, filters.tag, '全部标签') + '</select></label>',
      '<label class="field"><span>销售人员</span><select data-filter="salesperson">' + optionHTML(opts.salespersons, filters.salesperson, '全部销售') + '</select></label>',
      '<div class="filter-actions"><button class="btn secondary" data-action="customer-reset">重置</button><button class="btn primary" data-action="customer-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function customerArchiveTableHTML() {
    var rows = getFilteredCustomers();
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>客户档案列表</h3><p>共 ' + rows.length + ' 条客户档案，支持查看、编辑、删除及业务联动</p></div></div>',
      '<table class="data-table customer-table workorder-list-table"><thead><tr>',
      '<th>客户名称</th><th>统一社会信用代码</th><th>客户规模</th><th>标签</th><th>销售人员</th><th>最近跟进时间</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr>' +
          '<td><strong class="table-main">' + escapeHtml(item.name) + '</strong></td>' +
          '<td>' + escapeHtml(item.creditCode || '-') + '</td>' +
          '<td>' + escapeHtml(item.scale || '-') + '</td>' +
          '<td><span class="status ' + (item.tag === '成交客户' ? 'success' : item.tag === '准客户' ? 'warning' : 'danger') + '">' + escapeHtml(item.tag || '-') + '</span></td>' +
          '<td>' + escapeHtml(item.salesperson || '-') + '</td>' +
          '<td>' + escapeHtml(item.latestFollow || '-') + '</td>' +
          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="customer-view" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="customer-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn danger-link" data-action="customer-delete" data-id="' + item.id + '">删除</button>' +
          '<button class="link-btn" data-action="customer-follow" data-id="' + item.id + '">跟进记录</button>' +
          '<button class="link-btn" data-action="customer-project" data-id="' + item.id + '">关联项目</button>' +
          '</div></td>' +
          '</tr>';
      }).join('') || '<tr><td colspan="7"><div class="empty-state">未查询到符合条件的客户档案</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function customerArchiveModalHTML() {
    var modal = getCustomerArchiveState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view';
    var opts = data.customerArchiveOptions;
    var title = modal.mode === 'create' ? '新增客户' : modal.mode === 'edit' ? '编辑客户' : '查看客户';
    function input(name, label, value, required, placeholder) {
      return '<label class="field modal-field"><span>' + label + (required ? ' <em>*</em>' : '') + '</span><input name="' + name + '" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(value || '') + '" placeholder="' + escapeHtml(placeholder || '') + '" /></label>';
    }
    function select(name, label, value, options, required, placeholder) {
      return '<label class="field modal-field"><span>' + label + (required ? ' <em>*</em>' : '') + '</span><select name="' + name + '" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(options, value, placeholder) + '</select></label>';
    }
    return [
      '<div class="modal-mask" data-action="modal-close">',
      '<div class="modal-card customer-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>客户档案信息维护与业务联动查看</p></div><button class="icon-btn" data-action="modal-close">×</button></div>',
      '<form id="customer-form" class="modal-body">',
      '<div class="modal-grid modal-grid-2">',
      input('name', '客户名称', item.name, true, '请输入客户名称'),
      input('address', '客户地址', item.address, false, '请输入客户地址'),
      input('creditCode', '统一社会信用代码', item.creditCode, false, '请输入统一社会信用代码'),
      select('salesperson', '销售人员', item.salesperson, opts.salespersons, true, '请选择销售人员'),
      select('scale', '客户规模', item.scale, opts.scales, false, '请选择客户规模'),
      select('source', '来源渠道', item.source, opts.sources, false, '请选择来源渠道'),
      select('level', '客户等级', item.level, opts.levels, false, '请选择客户等级'),
      select('industry', '客户所在主要行业', item.industry, opts.industries, false, '请选择主要行业'),
      select('managedProjectScale', '管理项目规模', item.managedProjectScale, opts.projectScales, false, '请选择管理项目规模'),
      '<div class="modal-section"><h4>法定代表人信息</h4><div class="modal-grid modal-grid-3">' +
      input('legalName', '姓名', item.legalName, false, '请输入姓名') +
      input('legalPhone', '电话', item.legalPhone, false, '请输入电话') +
      input('legalEmail', '邮件', item.legalEmail, false, '请输入邮件') +
      '</div></div>',
      '<div class="modal-section"><h4>联系人信息</h4><div class="modal-grid modal-grid-3">' +
      input('contactName', '姓名', item.contactName, false, '请输入姓名') +
      input('contactTitle', '职务', item.contactTitle, false, '请输入职务') +
      input('contactPhone', '电话', item.contactPhone, false, '请输入电话') +
      '</div></div>',
      '</div>',
      '<div class="modal-footer">' +
      (readOnly
        ? '<button type="button" class="btn secondary" data-action="customer-follow" data-id="' + item.id + '">跟进记录</button><button type="button" class="btn secondary" data-action="customer-project" data-id="' + item.id + '">关联项目</button>'
        : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="modal-close">关闭</button>' +
      '</div>',
      '</form></div></div>'
    ].join('');
  }

  function customerArchivePageHTML() {
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">客户管理</div><h2>客户档案</h2><p>统一管理客户基础资料、销售归属、客户标签及关联业务入口，支持后续跟进和项目协同。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="customer-create">新增客户</button></div></div>',
      customerArchiveFiltersHTML(),
      customerArchiveTableHTML(),
      customerArchiveModalHTML()
    ].join('');
  }

  function customerFollowFiltersHTML() {
    var filters = getCustomerFollowState().filters;
    var opts = data.customerFollowOptions;
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid follow-filter-grid">',
      '<label class="field"><span>客户名称</span><input data-follow-filter="customerName" value="' + escapeHtml(filters.customerName) + '" placeholder="请输入客户名称" /></label>',
      '<label class="field"><span>跟进人</span><select data-follow-filter="follower">' + optionHTML(opts.salespersons, filters.follower, '全部跟进人') + '</select></label>',
      '<label class="field"><span>开始时间</span><input type="date" data-follow-filter="dateStart" value="' + escapeHtml(filters.dateStart) + '" /></label>',
      '<label class="field"><span>结束时间</span><input type="date" data-follow-filter="dateEnd" value="' + escapeHtml(filters.dateEnd) + '" /></label>',
      '<label class="field"><span>跟进方式</span><select data-follow-filter="method">' + optionHTML(opts.methods, filters.method, '全部方式') + '</select></label>',
      '<div class="filter-actions"><button class="btn secondary" data-action="follow-reset">重置</button><button class="btn primary" data-action="follow-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function customerFollowTableHTML() {
    var rows = getFilteredFollowRecords();
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>跟进记录列表</h3><p>共 ' + rows.length + ' 条跟进记录，支持查看、编辑、删除与客户联动</p></div></div>',
      '<table class="data-table customer-table workorder-list-table"><thead><tr>',
      '<th>客户名称</th><th>跟进人</th><th>跟进方式</th><th>跟进时间</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr>' +
          '<td><button class="text-link" data-action="follow-customer" data-customer-id="' + item.customerId + '">' + escapeHtml(item.customerName) + '</button></td>' +
          '<td>' + escapeHtml(item.follower) + '</td>' +
          '<td><span class="status ' + (item.method === '方案汇报' ? 'warning' : 'success') + '">' + escapeHtml(item.method) + '</span></td>' +
          '<td>' + escapeHtml(item.time) + '</td>' +
          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="follow-view" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="follow-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn danger-link" data-action="follow-delete" data-id="' + item.id + '">删除</button>' +
          '</div></td>' +
        '</tr>';
      }).join('') || '<tr><td colspan="5"><div class="empty-state">未查询到符合条件的跟进记录</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function customerFollowModalHTML() {
    var modal = getCustomerFollowState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'create' ? '新增跟进记录' : modal.mode === 'edit' ? '编辑跟进记录' : '跟进记录详情';
    var opts = data.customerFollowOptions;
    function field(name, label, type, value, required, placeholder) {
      return '<label class="field modal-field"><span>' + label + (required ? ' <em>*</em>' : '') + '</span><input type="' + (type || 'text') + '" name="' + name + '" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(value || '') + '" placeholder="' + escapeHtml(placeholder || '') + '" /></label>';
    }
    function selectField(name, label, value, options, required, placeholder) {
      return '<label class="field modal-field"><span>' + label + (required ? ' <em>*</em>' : '') + '</span><select name="' + name + '" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(options, value, placeholder) + '</select></label>';
    }
    function mappedSelectField(name, label, value, options, required, placeholder) {
      return '<label class="field modal-field"><span>' + label + (required ? ' <em>*</em>' : '') + '</span><select name="' + name + '" ' + (readOnly ? 'disabled ' : '') + '>' + mappedOptionHTML(options, value, placeholder) + '</select></label>';
    }
    return [
      '<div class="modal-mask" data-action="follow-modal-close">',
      '<div class="modal-card customer-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>记录客户触达过程、沟通方式和业务推进情况</p></div><button class="icon-btn" data-action="follow-modal-close">×</button></div>',
      '<form id="follow-form" class="modal-body">',
      '<div class="modal-grid modal-grid-2">',
      mappedSelectField('customerId', '客户', item.customerId, (data.customerArchiveList || []).map(function (customer) { return { value: customer.id, label: customer.name }; }), true, '请选择客户'),
      selectField('follower', '跟进人', item.follower, opts.salespersons, true, '请选择跟进人'),
      field('time', '跟进时间', 'datetime-local', toDateTimeLocal(item.time), true, ''),
      selectField('method', '跟进方式', item.method, opts.methods, true, '请选择跟进方式'),
      '<label class="field modal-field field-span-2"><span>详情描述 <em>*</em></span><textarea name="detail" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入跟进详情描述">' + escapeHtml(item.detail || '') + '</textarea></label>',
      field('images', '图片附件', 'text', (item.images || []).join('、'), false, '示例：现场照片.jpg；签字纪要.png'),
      '</div>',
      '<div class="modal-footer">' +
      (readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="follow-modal-close">关闭</button>' +
      '</div>',
      '</form></div></div>'
    ].join('');
  }

  function toDateTimeLocal(value) {
    return value ? value.replace(' ', 'T') : '';
  }

  function customerFollowPageHTML() {
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">客户管理</div><h2>跟进记录</h2><p>统一沉淀客户接触过程、沟通结果和业务推进状态，支持销售过程复盘与客户联动查看。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="follow-create">新增跟进记录</button></div></div>',
      customerFollowFiltersHTML(),
      customerFollowTableHTML(),
      customerFollowModalHTML()
    ].join('');
  }

  function projectArchiveFiltersHTML() {
    var filters = getProjectArchiveState().filters;
    var opts = data.projectArchiveOptions;
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid project-filter-grid">',
      '<label class="field"><span>项目名称</span><input data-project-filter="name" value="' + escapeHtml(filters.name) + '" placeholder="请输入项目名称" /></label>',
      '<label class="field"><span>项目编号</span><input data-project-filter="code" value="' + escapeHtml(filters.code) + '" placeholder="请输入项目编号" /></label>',
      '<label class="field"><span>客户名称</span><input data-project-filter="customerName" value="' + escapeHtml(filters.customerName) + '" placeholder="请输入客户名称" /></label>',
      '<label class="field"><span>状态</span><select data-project-filter="status">' + optionHTML(opts.status, filters.status, '全部状态') + '</select></label>',
      '<label class="field"><span>项目经理</span><select data-project-filter="manager">' + optionHTML(opts.managers, filters.manager, '全部项目经理') + '</select></label>',
      '<div class="filter-actions"><button class="btn secondary" data-action="project-reset">重置</button><button class="btn primary" data-action="project-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function projectArchiveTableHTML() {
    var rows = getFilteredProjectRows();
    var isTree = getProjectArchiveState().viewMode === 'tree';
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>项目档案列表</h3><p>共 ' + rows.length + ' 条项目档案，支持项目树展开和业务下钻</p></div></div>',
      '<table class="data-table customer-table workorder-list-table"><thead><tr>',
      '<th>项目名称</th><th>项目编号</th><th>所属客户</th><th>状态</th><th>项目经理</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        var indent = 'style="padding-left:' + (16 + item.depth * 22) + 'px"';
        var toggle = item.hasChildren ? '<button class="tree-toggle" data-action="project-toggle" data-id="' + item.id + '">' + (getProjectArchiveState().expanded[item.id] === false ? '+' : '−') + '</button>' : '<span class="tree-spacer"></span>';
        return '<tr>' +
          '<td><div class="tree-name" ' + indent + '>' + (isTree ? toggle : '') + '<button class="text-link" data-action="project-detail" data-id="' + item.id + '">' + escapeHtml(item.name) + '</button></div></td>' +
          '<td>' + escapeHtml(item.code) + '</td>' +
          '<td>' + escapeHtml(item.customerName) + '</td>' +
          '<td><span class="status ' + (item.status === '运营中' ? 'success' : item.status === '冻结' ? 'danger' : 'warning') + '">' + escapeHtml(item.status) + '</span></td>' +
          '<td>' + escapeHtml(item.manager) + '</td>' +
          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="project-detail" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="project-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn danger-link" data-action="project-delete" data-id="' + item.id + '">删除</button>' +
          '</div></td>' +
        '</tr>';
      }).join('') || '<tr><td colspan="6"><div class="empty-state">未查询到符合条件的项目档案</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function projectDetailPageHTML() {
    var project = findProjectById(appState.ui.currentProjectDetailId);
    if (!project) {
      return '<div class="panel table-panel"><div class="empty-state">未找到对应项目档案</div></div>';
    }
      var detail = data.projectDetailData[project.id] || {
        milestones: [],
        basicInfo: [
        ['项目编号', project.code || '-'],
        ['所属客户', project.customerName || '-'],
        ['项目类型', project.projectType || '-'],
        ['项目负责人', project.manager || '-'],
        ['项目区域', project.area || '-'],
        ['销售人员', project.salesperson || '-'],
        ['合同金额', project.contractAmount || '-'],
        ['实施周期', project.period || '-'],
          ['设备数量', (project.deviceCount || 0) + ' 台'],
        ['工单数量', (project.workorderCount || 0) + ' 条'],
        ['备注', project.remark || '-']
      ],
      cost: { totalBudget: '-', dynamicCost: '-', materialCost: '-', laborCost: '-', grossMargin: '-', warning: '正常' },
      workorders: [],
      devices: [],
      contracts: []
    };
    var activeTab = appState.ui.currentProjectDetailTab || 'basic';
    var tabs = [
      { key: 'basic', label: '基本信息' },
      { key: 'cost', label: '项目报价' },
      { key: 'workorder', label: '工单' },
      { key: 'device', label: '设备清单' },
      { key: 'contract', label: '合同信息' }
    ];
      return [
        '<div class="sub-hero customer-hero">',
        '<div><div class="eyebrow">项目管理 · 项目详情</div><h2>' + escapeHtml(project.name) + '</h2><p><span class="detail-code">项目编号：' + escapeHtml(project.code) + '</span><span class="status ' + (project.status === '运营中' ? 'success' : project.status === '冻结' ? 'danger' : 'warning') + '">' + escapeHtml(project.status) + '</span></p></div>',
        '<div class="sub-actions"><button class="btn secondary" data-route="/pc/project/archive">返回项目档案</button><button class="btn primary" data-action="project-edit" data-id="' + project.id + '">编辑</button></div></div>',
        projectMilestoneHTML(detail.milestones),
        '<div class="panel table-panel customer-table-panel"><div class="detail-tabs">' +
        tabs.map(function (tab) {
          return '<button class="detail-tab ' + (activeTab === tab.key ? 'active' : '') + '" data-action="project-detail-tab" data-tab="' + tab.key + '">' + tab.label + '</button>';
      }).join('') +
      '</div><div class="detail-tab-body">' + renderProjectDetailTab(project, detail, activeTab) + '</div></div>'
    ].join('');
  }

  function renderProjectDetailTab(project, detail, activeTab) {
    function section(title, desc, content, className) {
      return '<div class="project-detail-section-card' + (className ? ' ' + className : '') + '"><div class="project-detail-section-head"><div><h4>' + escapeHtml(title) + '</h4><p>' + escapeHtml(desc) + '</p></div></div><div class="project-detail-section-body">' + content + '</div></div>';
    }
    if (activeTab === 'basic') {
      return section('基础信息', '查看项目基础档案、负责人及实施范围', '<div class="detail-grid">' + detail.basicInfo.map(function (item) {
        return '<div class="detail-item ' + (item[0] === '备注' ? 'detail-item-full' : '') + '"><span>' + escapeHtml(item[0]) + '</span><strong>' + escapeHtml(item[1]) + '</strong></div>';
      }).join('') + '</div>', 'project-detail-section-basic');
    }
    if (activeTab === 'cost') {
      return section('报价明细', '同步项目报价页面的明细清单与合计金额', projectCostDetailTableHTML(project.id), 'project-detail-section-cost');
    }
    if (activeTab === 'workorder') {
      return section('工单记录', '展示当前项目相关工单及处理状态', '<table class="data-table project-detail-table project-workorder-table"><thead><tr><th>编号</th><th>类型</th><th>创建人</th><th>创建时间</th><th>状态</th></tr></thead><tbody>' +
        (detail.workorders || []).map(function (item) {
          return '<tr><td><button class="text-link" data-action="project-drill" data-drill="workorder" data-id="' + project.id + '">' + escapeHtml(item.code) + '</button></td><td>' + escapeHtml(item.type) + '</td><td>' + escapeHtml(item.creator) + '</td><td>' + escapeHtml(item.createTime) + '</td><td><span class="status ' + ((item.overdue || item.status === '已超期') ? 'danger' : item.status === '处理中' ? 'warning' : 'success') + '">' + escapeHtml(item.status) + (item.overdue ? ' · 超期' : '') + '</span></td></tr>';
        }).join('') + '</tbody></table>', 'project-detail-section-workorder');
    }
    if (activeTab === 'device') {
      return section('设备清单', '查看项目设备的分类、品牌、型号及在线状态', '<table class="data-table project-detail-table project-device-table"><thead><tr><th>设备编号</th><th>设备名称</th><th>分类</th><th>品牌</th><th>型号</th><th>安装位置</th><th>状态</th></tr></thead><tbody>' +
        (detail.devices || []).map(function (item) {
          var deviceStatusClass = item.status === '在线' ? 'success' : item.status === '离线' ? 'danger' : 'warning';
          return '<tr><td><button class="text-link" data-action="project-drill" data-drill="asset" data-id="' + project.id + '">' + escapeHtml(item.code) + '</button></td><td>' + escapeHtml(item.name) + '</td><td>' + escapeHtml(item.category || '-') + '</td><td>' + escapeHtml(item.brand || '-') + '</td><td>' + escapeHtml(item.model) + '</td><td>' + escapeHtml(item.installLocation || '-') + '</td><td><span class="status ' + deviceStatusClass + '">' + escapeHtml(item.status) + '</span></td></tr>';
        }).join('') + '</tbody></table>', 'project-detail-section-device');
    }
    return section('合同信息', '查看项目合同金额、累计开票与累计回款概览', '<table class="data-table project-detail-table project-contract-table"><thead><tr><th>合同编号</th><th>合同名称</th><th>合同金额</th><th>累计开票</th><th>累计回款</th><th>签订日期</th></tr></thead><tbody>' +
      (detail.contracts || []).map(function (item) {
        return '<tr><td><button class="text-link" data-action="project-drill" data-drill="contract" data-id="' + project.id + '">' + escapeHtml(item.code) + '</button></td><td>' + escapeHtml(item.name) + '</td><td>' + escapeHtml(item.amount) + '</td><td>' + escapeHtml(item.invoiceAmount || '-') + '</td><td>' + escapeHtml(item.receivedAmount || '-') + '</td><td>' + escapeHtml(item.signDate) + '</td></tr>';
      }).join('') + '</tbody></table>', 'project-detail-section-contract');
  }

  function projectArchiveModalHTML() {
    var modal = getProjectArchiveState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'create' ? '新增项目' : modal.mode === 'edit' ? '编辑项目' : '项目详情';
    var opts = data.projectArchiveOptions;
    var projectOptions = mappedOptionHTML([{ value: '', label: '无' }].concat(getAllProjectItems(getProjectArchiveState().tree).map(function (project) {
      return { value: project.id, label: project.name };
    })), item.parentId || '', '请选择父级项目');
    var customerOptions = mappedOptionHTML((getCustomerArchiveState().list || []).map(function (customer) {
      return { value: customer.id, label: customer.name };
    }), item.customerId || '', '请选择客户');
    function input(name, label, value, required, placeholder) {
      return '<label class="field modal-field"><span>' + label + (required ? ' <em>*</em>' : '') + '</span><input name="' + name + '" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(value || '') + '" placeholder="' + escapeHtml(placeholder || '') + '" /></label>';
    }
    function addressInput(name, label, value, required, placeholder) {
      return '<label class="field modal-field field-span-2"><span>' + label + (required ? ' <em>*</em>' : '') + '</span><div class="project-address-input"><input name="' + name + '" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(value || '') + '" placeholder="' + escapeHtml(placeholder || '') + '" /><span class="project-address-icon" aria-hidden="true">⌖</span></div></label>';
    }
    function select(name, label, html, required) {
      return '<label class="field modal-field"><span>' + label + (required ? ' <em>*</em>' : '') + '</span><select name="' + name + '" ' + (readOnly ? 'disabled ' : '') + '>' + html + '</select></label>';
    }
    return [
      '<div class="modal-mask" data-action="project-modal-close">',
      '<div class="modal-card customer-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>维护项目层级、项目负责人、销售归属及联系人信息</p></div><button class="icon-btn" data-action="project-modal-close">×</button></div>',
      '<form id="project-form" class="modal-body">',
      '<div class="modal-grid modal-grid-2">',
      select('parentId', '父级项目', projectOptions, false),
      input('name', '项目名称', item.name, true, '请输入项目名称'),
      select('customerId', '客户', customerOptions, true),
      select('projectType', '项目类型', optionHTML(opts.projectTypes, item.projectType, '请选择项目类型'), false),
      select('manager', '项目经理', optionHTML(opts.managers, item.manager, '请选择项目经理'), true),
      select('salesperson', '销售人员', optionHTML(opts.salespersons, item.salesperson, '请选择销售人员'), true),
      addressInput('area', '项目地址', item.area, true, '请输入地点名称或坐标'),
      '<div class="modal-section"><h4>项目联系人</h4><div class="modal-grid modal-grid-3">' +
      input('contactName', '姓名', item.contactName, false, '请输入姓名') +
      input('contactTitle', '职务', item.contactTitle, false, '请输入职务') +
      input('contactPhone', '电话', item.contactPhone, false, '请输入电话') +
      '</div></div>',
      '<label class="field modal-field field-span-2"><span>备注</span><textarea name="remark" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入备注信息">' + escapeHtml(item.remark || '') + '</textarea></label>',
      '</div>',
      '<div class="modal-footer">' +
      (readOnly
        ? '<button type="button" class="btn secondary" data-action="project-drill" data-drill="workorder" data-id="' + item.id + '">工单</button><button type="button" class="btn secondary" data-action="project-drill" data-drill="asset" data-id="' + item.id + '">设备</button><button type="button" class="btn secondary" data-action="project-drill" data-drill="cost" data-id="' + item.id + '">报价</button><button type="button" class="btn secondary" data-action="project-drill" data-drill="contract" data-id="' + item.id + '">合同</button>'
        : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="project-modal-close">关闭</button>' +
      '</div>',
      '</form></div></div>'
    ].join('');
  }

  function projectArchivePageHTML() {
    var state = getProjectArchiveState();
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">项目管理</div><h2>项目档案</h2><p>统一管理项目层级结构、项目状态、负责人及下钻业务入口，支撑工单、设备、报价、合同协同。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="project-create">新增项目</button><div class="switcher"><button class="switch-btn ' + (state.viewMode === 'tree' ? 'active' : '') + '" data-action="project-view-mode" data-mode="tree">树状视图</button><button class="switch-btn ' + (state.viewMode === 'table' ? 'active' : '') + '" data-action="project-view-mode" data-mode="table">表格视图</button></div></div></div>',
      projectArchiveFiltersHTML(),
      projectArchiveTableHTML(),
      projectArchiveModalHTML()
    ].join('');
  }

  function projectCostFiltersHTML() {
    var filters = getProjectCostState().filters;
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid project-cost-filter-grid">',
      '<label class="field"><span>编号</span><input data-cost-filter="id" value="' + escapeHtml(filters.id) + '" placeholder="请输入报价单编号" /></label>',
      '<label class="field"><span>项目名称</span><input data-cost-filter="projectName" value="' + escapeHtml(filters.projectName) + '" placeholder="请输入项目名称" /></label>',
      '<label class="field"><span>客户名称</span><input data-cost-filter="customerName" value="' + escapeHtml(filters.customerName) + '" placeholder="请输入客户名称" /></label>',
      '<label class="field"><span>审批状态</span><select data-cost-filter="status">' + optionHTML(data.projectCostOptions.statuses, filters.status, '全部状态') + '</select></label>',
      '<label class="field"><span>开始时间</span><input type="date" data-cost-filter="dateStart" value="' + escapeHtml(filters.dateStart) + '" /></label>',
      '<label class="field"><span>结束时间</span><input type="date" data-cost-filter="dateEnd" value="' + escapeHtml(filters.dateEnd) + '" /></label>',
      '<div class="filter-actions"><button class="btn secondary" data-action="cost-reset">重置</button><button class="btn primary" data-action="cost-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function projectCostTableHTML() {
    var rows = getFilteredProjectCosts();
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>报价单列表</h3><p>共 ' + rows.length + ' 条报价单，展示成本构成与审批流转状态</p></div></div>',
      '<table class="data-table customer-table"><thead><tr>',
      '<th>报价单编号</th><th>项目名称</th><th>客户名称</th><th>创建人</th><th>创建时间</th><th>状态</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr>' +
          '<td><strong class="table-main">' + escapeHtml(item.id) + '</strong></td>' +
          '<td><button class="text-link" data-action="cost-view" data-id="' + item.id + '">' + escapeHtml(item.projectName) + '</button></td>' +
          '<td>' + escapeHtml(item.customerName) + '</td>' +
          '<td>' + escapeHtml(item.creator) + '</td>' +
          '<td>' + escapeHtml(item.createTime) + '</td>' +
          '<td><span class="status ' + (item.status === '已通过' ? 'success' : item.status === '审批中' ? 'warning' : (item.status === '已撤销' || item.status === '已驳回') ? 'danger' : 'warning') + '">' + escapeHtml(item.status) + '</span></td>' +
          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="cost-view" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="cost-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn" data-action="cost-approve" data-id="' + item.id + '">审批</button>' +
          '<button class="link-btn danger-link" data-action="cost-revoke" data-id="' + item.id + '">撤销</button>' +
          '</div></td>' +
        '</tr>';
      }).join('') || '<tr><td colspan="7"><div class="empty-state">未查询到符合条件的报价单</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function costBrandOptionsHTML(value) {
    return optionHTML([
      '海湾',
      '青鸟',
      '安消智联',
      '宇视',
      '华三',
      '通用'
    ], value || '', '请选择品牌');
  }

  function costModelOptionsHTML(value) {
    return optionHTML([
      'GST-LD-8301',
      'JBF5111',
      'TX3000-4G',
      'AI-CAM-TD600',
      'SW-16GE-POE',
      'RVV-2×1.5'
    ], value || '', '请选择型号');
  }

  function costDetailBrandModelByName(name) {
    var mapping = {
      '用户信息传输装置': { brand: '安消智联', model: 'TX3000-4G' },
      '一体式压力传感器': { brand: '海湾', model: 'YL-20/1.6MPa' },
      '一体式液位传感器': { brand: '海湾', model: 'YW-10M' },
      '离岗检测摄像机': { brand: '宇视', model: 'AI-CAM-LG300' },
      '消防通道监测摄像机': { brand: '宇视', model: 'AI-CAM-TD600' },
      '电气火灾报警器': { brand: '青鸟', model: 'JBF5111' },
      '挂箱': { brand: '通用', model: 'BX-01' },
      '交换机': { brand: '华三', model: 'SW-16GE-POE' },
      '电源线': { brand: '通用', model: 'RVV-2×1.5' },
      '网线': { brand: '通用', model: 'CAT6' },
      '网络服务（宽带）': { brand: '通用', model: '企业宽带' }
    };
    return mapping[name] || { brand: '', model: '' };
  }

  function renderCostDetailRows(details, readOnly, includeBrandModel) {
    return (details || []).map(function (item, index) {
      var fallbackBrandModel = costDetailBrandModelByName(item.name);
      var brandText = item.brand || ((item.brandModel || '').split(' ')[0] || '') || fallbackBrandModel.brand;
      var modelText = item.model || ((item.brandModel || '').split(' ').slice(1).join(' ') || '') || fallbackBrandModel.model;
      return '<tr>' +
        '<td>' + escapeHtml(item.name) + '</td>' +
        (includeBrandModel ? '<td>' + (readOnly ? escapeHtml(brandText || '-') : '<select class="mini-input cost-brand-select" name="detail-brand-' + index + '">' + costBrandOptionsHTML(brandText) + '</select>') + '</td>' : '') +
        (includeBrandModel ? '<td>' + (readOnly ? escapeHtml(modelText || '-') : '<select class="mini-input cost-model-select" name="detail-model-' + index + '">' + costModelOptionsHTML(modelText) + '</select>') + '</td>' : '') +
        '<td>' + escapeHtml(item.unit) + '</td>' +
        '<td>' + (readOnly ? escapeHtml(item.qty) : '<input class="mini-input" data-cost-calc="qty" data-index="' + index + '" name="detail-qty-' + index + '" value="' + escapeHtml(item.qty) + '" />') + '</td>' +
        '<td>' + (readOnly ? escapeHtml(item.price) : '<input class="mini-input" data-cost-calc="price" data-index="' + index + '" name="detail-price-' + index + '" value="' + escapeHtml(item.price) + '" />') + '</td>' +
        '<td><span class="cost-amount" data-cost-amount="' + index + '">' + escapeHtml(item.amount) + '</span></td>' +
        '<td>' + (readOnly ? escapeHtml(item.remark || '-') : '<input class="mini-input" name="detail-remark-' + index + '" value="' + escapeHtml(item.remark || '') + '" />') + '</td>' +
      '</tr>';
    }).join('');
  }

  function calcCostTotal(details) {
    return (details || []).reduce(function (sum, item) {
      return sum + (Number(item.amount) || 0);
    }, 0);
  }

  function projectCostDetailTableHTML(projectId) {
    var costItem = (getProjectCostState().list || []).find(function (item) {
      return item.projectId === projectId;
    }) || (data.projectCostList || []).find(function (item) {
      return item.projectId === projectId;
    });
    if (!costItem || !(costItem.details || []).length) {
      return '<div class="empty-state">暂无报价明细</div>';
    }
    var details = costItem.details || [];
    var totalAmount = calcCostTotal(details);
    return '<div class="cost-table-wrap"><table class="data-table cost-detail-table project-detail-table project-cost-table"><thead><tr><th>报价明细</th><th>品牌</th><th>型号</th><th>单位</th><th>数量</th><th>单价</th><th>合价</th><th>备注</th></tr></thead><tbody>' + renderCostDetailRows(details, true, true) + '<tr class="cost-total-row"><td colspan="6">合计</td><td colspan="2">¥<span data-cost-total>' + escapeHtml(totalAmount.toFixed(2)) + '</span></td></tr></tbody></table></div>';
  }

  function approvalTimelineHTML(records) {
    if (!records || !records.length) return '<div class="empty-state">暂无审批记录</div>';
    return '<div class="timeline approval-timeline">' + records.map(function (record) {
      return '<div class="timeline-item"><span class="timeline-dot"></span><div class="timeline-time">' + escapeHtml(record.time) + '</div><div class="timeline-content"><strong>' + escapeHtml(record.operator) + ' · ' + escapeHtml(record.action) + '</strong><p>' + escapeHtml(record.remark || '-') + '</p></div></div>';
    }).join('') + '</div>';
  }

  function normalizeCostFlowAction(action) {
    if (action === '同意' || action === '已通过' || action === '驳回' || action === '审批中' || action === '提交') return '审批';
    return action || '流转';
  }

  function buildCostFlowRecords(item) {
    var records = (item && item.approvalRecords ? item.approvalRecords : []).map(function (record) {
      return {
        time: record.time || item.createTime || '',
        operator: record.operator || item.creator || '系统管理员',
        action: normalizeCostFlowAction(record.action),
        remark: record.remark || '',
        rawAction: record.action || ''
      };
    }).filter(function (record) {
      return ['创建', '编辑', '审批'].indexOf(record.action) > -1;
    });
    var hasCreate = records.some(function (record) { return record.action === '创建'; });
    if (!hasCreate) {
      records.unshift({
        time: item.createTime || '',
        operator: item.creator || '系统管理员',
        action: '创建',
        remark: '新建报价单。',
        rawAction: '创建'
      });
    }
    var approvedRecord = null;
    records.forEach(function (record) {
      if (record.action === '审批') approvedRecord = record;
    });
    if (approvedRecord) {
      approvedRecord.remark = approvedRecord.rawAction === '驳回'
        ? (approvedRecord.remark || '审批驳回。')
        : (approvedRecord.rawAction === '审批中'
          ? '审批中。'
          : (approvedRecord.remark || '审批通过。'));
    }
    return records;
  }

  function costFlowTimelineHTML(item) {
    var records = buildCostFlowRecords(item || {});
    if (!records.length) return '<div class="empty-state">暂无流转记录</div>';
    return approvalTimelineHTML(records).replace('暂无审批记录', '暂无流转记录');
  }

  function detailFlowRecordHTML(title, desc, timelineHTML) {
    return '<div class="approval-box detail-flow-record"><div class="panel-header approval-header"><div><h3>' + escapeHtml(title || '流转记录') + '</h3><p>' + escapeHtml(desc || '') + '</p></div></div>' + timelineHTML + '</div>';
  }

  function normalizeDetailFlowRecords(records, fallbackItem) {
    var normalized = (records || []).map(function (record) {
      var rawAction = record.action || '';
      return {
        time: record.time || (fallbackItem && fallbackItem.createTime) || '',
        operator: record.operator || (fallbackItem && fallbackItem.creator) || '系统管理员',
        action: (rawAction === '创建' || rawAction === '编辑') ? rawAction : '审批',
        remark: record.remark || '',
        rawAction: rawAction
      };
    }).filter(function (record) {
      return ['创建', '编辑', '审批'].indexOf(record.action) > -1;
    });
    if (!normalized.length && fallbackItem && fallbackItem.id) {
      normalized.push({
        time: fallbackItem.createTime || '',
        operator: fallbackItem.creator || '系统管理员',
        action: '创建',
        remark: '新建单据。',
        rawAction: '创建'
      });
    }
    return normalized;
  }

  function buildContractFlowRecords(item) {
    var records = normalizeDetailFlowRecords(item && item.approvalRecords ? item.approvalRecords : [], item);
    if (!records.length && item && item.id) {
      records.push({
        time: item.createTime || '',
        operator: item.creator || '系统管理员',
        action: '创建',
        remark: '新建合同。'
      });
      if (item.status === '审批中') {
        records.push({
          time: item.createTime || '',
          operator: item.creator || '系统管理员',
          action: '审批',
          remark: '合同审批中。'
        });
      } else if (item.status === '已通过' || item.status === '已驳回') {
        records.push({
          time: item.createTime || '',
          operator: '李国华',
          action: '审批',
          remark: item.status === '已通过' ? '合同审批通过。' : '合同审批驳回。'
        });
      }
    }
    return records;
  }

  function contractFlowTimelineHTML(item) {
    var records = buildContractFlowRecords(item || {});
    if (!records.length) return '<div class="empty-state">暂无流转记录</div>';
    return approvalTimelineHTML(records).replace('暂无审批记录', '暂无流转记录');
  }

  function projectCostModalHTML() {
    var modal = getProjectCostState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'create' ? '新增报价单' : modal.mode === 'edit' ? '编辑报价单' : modal.mode === 'approve' ? '报价单审批' : '报价单详情';
    var projectOptions = mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) {
      return { value: project.id, label: project.name };
    }), item.projectId || '', '请选择项目');
    var totalAmount = calcCostTotal(item.details || []);
    return [
      '<div class="modal-mask" data-action="cost-modal-close">',
      '<div class="modal-card cost-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>维护工程设备、材料及网络服务等成本构成，支撑审批流转</p></div><button class="icon-btn" data-action="cost-modal-close">×</button></div>',
      '<form id="cost-form" class="modal-body">',
      '<div class="modal-grid modal-grid-2">',
      '<label class="field modal-field"><span>项目 <em>*</em></span><select name="projectId" ' + (readOnly || modal.mode === 'approve' ? 'disabled ' : '') + '>' + projectOptions + '</select></label>',
      '<label class="field modal-field"><span>审批状态</span><input disabled value="' + escapeHtml(item.status || '草稿') + '" /></label>',
      '</div>',
      '<div class="cost-table-wrap"><table class="data-table cost-detail-table"><thead><tr><th>报价明细</th><th>品牌</th><th>型号</th><th>单位</th><th>数量</th><th>单价</th><th>合价</th><th>备注</th></tr></thead><tbody>' + renderCostDetailRows(item.details || [], readOnly || modal.mode === 'approve', true) + '<tr class="cost-total-row"><td colspan="6">合计</td><td colspan="2">¥<span data-cost-total>' + escapeHtml(totalAmount.toFixed(2)) + '</span></td></tr></tbody></table></div>',
      detailFlowRecordHTML('流转记录', '展示单据创建、编辑、审批等流转过程', costFlowTimelineHTML(item)),
      (modal.mode === 'approve'
        ? '<div class="approval-box"><label class="field field-span-2"><span>审批意见</span><textarea name="approvalRemark" placeholder="同意可填写审批意见，驳回请填写原因"></textarea></label></div>'
        : ''),
      '<div class="modal-footer">' +
      (modal.mode === 'approve'
        ? '<button type="button" class="btn primary" data-action="cost-approve-confirm" data-id="' + item.id + '">同意</button><button type="button" class="btn secondary danger-link" data-action="cost-reject-confirm" data-id="' + item.id + '">驳回</button>'
        : readOnly
          ? ''
          : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="cost-modal-close">关闭</button>' +
      '</div></form></div></div>'
    ].join('');
  }

  function projectCostPageHTML() {
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">项目管理</div><h2>项目报价</h2><p>统一管理项目成本构成、设备材料明细及报价审批状态，体现工程报价业务特征。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="cost-create">新增报价单</button></div></div>',
      projectCostFiltersHTML(),
      projectCostTableHTML(),
      projectCostModalHTML()
    ].join('');
  }

  function surveyWorkorderFiltersHTML() {
    var filters = getSurveyWorkorderState().filters;
    var projectOptions = mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) {
      return { value: project.id, label: project.name };
    }), filters.projectId, '请选择项目');
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid survey-filter-grid">',
      '<label class="field"><span>工单编号</span><input data-survey-filter="id" value="' + escapeHtml(filters.id) + '" placeholder="请输入工单编号" /></label>',
      '<label class="field"><span>项目</span><select data-survey-filter="projectId">' + projectOptions + '</select></label>',
      '<label class="field"><span>工勘人员</span><select data-survey-filter="surveyor">' + optionHTML(data.surveyWorkorderOptions.surveyors, filters.surveyor, '全部工勘人员') + '</select></label>',
      '<label class="field"><span>计划工勘日期</span><input type="date" data-survey-filter="planDate" value="' + escapeHtml(filters.planDate) + '" /></label>',
      '<div class="filter-actions"><button class="btn secondary" data-action="survey-reset">重置</button><button class="btn primary" data-action="survey-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function surveyWorkorderTableHTML() {
    var rows = getFilteredSurveyWorkorders();
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>工勘工单列表</h3><p>共 ' + rows.length + ' 条工勘工单，支持日志查看与超期识别</p></div></div>',
      '<table class="data-table customer-table"><thead><tr>',
      '<th>工单编号</th><th>所属项目</th><th>工勘人员</th><th>创建时间</th><th>创建人</th><th>状态</th><th>是否超期</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr class="' + (item.overdue ? 'row-overdue' : '') + '">' +
          '<td><strong class="table-main">' + escapeHtml(item.id) + '</strong></td>' +
          '<td><button class="text-link" data-action="survey-view" data-id="' + item.id + '">' + escapeHtml(item.projectName) + '</button></td>' +
          '<td>' + escapeHtml(item.surveyor) + '</td>' +
          '<td>' + escapeHtml(item.createTime) + '</td>' +
          '<td>' + escapeHtml(item.creator) + '</td>' +
          '<td><span class="status ' + (item.status === '已完成' ? 'success' : item.status === '已撤销' ? 'danger' : 'warning') + '">' + escapeHtml(item.status) + '</span></td>' +
          '<td>' + (item.overdue ? '<span class="status danger">已超期</span>' : '<span class="status success">正常</span>') + '</td>' +
          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="survey-view" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="survey-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn danger-link" data-action="survey-revoke" data-id="' + item.id + '">撤销</button>' +
          '<button class="link-btn danger-link" data-action="survey-delete" data-id="' + item.id + '">删除</button>' +
          '</div></td>' +
        '</tr>';
      }).join('') || '<tr><td colspan="8"><div class="empty-state">未查询到符合条件的工勘工单</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function surveyLogHTML(logs) {
    return '<div class="timeline">' + (logs || []).map(function (log) {
      return '<div class="timeline-item"><span class="timeline-dot"></span><div class="timeline-time">' + escapeHtml(log.time) + '</div><div class="timeline-content"><strong>' + escapeHtml(log.operator) + '</strong><p>' + escapeHtml(log.content) + '</p></div></div>';
    }).join('') + '</div>';
  }

  function inspectionReadonlyText(value) {
    return value === undefined || value === null || value === '' ? '-' : String(value);
  }

  function inspectionReadonlyList(value) {
    if (Array.isArray(value)) {
      var filtered = value.filter(function (item) { return item !== undefined && item !== null && item !== ''; });
      return filtered.length ? filtered.join('、') : '-';
    }
    return inspectionReadonlyText(value);
  }

  function inspectionReadonlyYesNo(value) {
    if (value === true) return '是';
    if (value === false) return '否';
    if (value === '是' || value === '否') return value;
    return '-';
  }

  function inspectionDeviceCategory(content) {
    if (content === '网络服务（宽带）') return '网络服务';
    if (content === '电源线' || content === '网线') return '辅材';
    return '设备';
  }

  function inspectionDeviceUnit(category, fallbackUnit) {
    if (category === '设备') return '台';
    if (category === '网络服务') return '条';
    return fallbackUnit || '-';
  }

  function inspectionWaterRows() {
    return [
      { name: '消防水池', required: true },
      { name: '高位水箱', required: true },
      { name: '室内消火栓泵', required: false },
      { name: '室外消火栓泵', required: false },
      { name: '喷淋泵', required: false },
      { name: '喷淋末端', required: true }
    ];
  }

  function inspectionWaterRowRequired(name) {
    var row = inspectionWaterRows().find(function (item) { return item.name === name; });
    return !row || row.required !== false;
  }

  function inspectionLogFieldHTML(label, value, required) {
    return '<div class="inspection-log-field"><div class="inspection-log-label">' + escapeHtml(label) + (required ? ' <em>*</em>' : '') + '</div><div class="inspection-log-value">' + escapeHtml(inspectionReadonlyText(value)) + '</div></div>';
  }

  function inspectionLogSectionHTML(title, body) {
    return '<section class="inspection-log-section"><div class="inspection-log-section-title">' + escapeHtml(title) + '</div>' + body + '</section>';
  }

  function buildInspectionLogSheetData(item, type) {
    var logSheet = item.logSheet || {};
    var communityInfo = logSheet.communityInfo || {};
    var fireAlarm = logSheet.fireAlarm || {};
    var videoSystem = logSheet.videoSystem || {};
    var waterSystem = logSheet.waterSystem || [];
    var newDevices = logSheet.newDevices || [];
    var constructionItems = logSheet.constructionItems || [];
    var number = logSheet.number || item.id || (type === 'construction' ? 'CTBXGK-0000002' : 'CTBXGK-0000001');
    var defaultWaterRows = inspectionWaterRows().map(function (row) {
      return { name: row.name, qty: '-', valve: '-', signal: '-', position: '-', remark: '-' };
    });
    var defaultNewDeviceRows = [
      '用户信息传输装置', '一体式压力传感器', '一体式液位传感器', '离岗检测摄像机', '消防通道监测摄像机',
      '电气火灾报警器', '网络服务（宽带）', '挂箱', '交换机', '电源线', '网线'
    ].map(function (name, index) {
      var category = inspectionDeviceCategory(name);
      return { index: index + 1, category: category, content: name, unit: inspectionDeviceUnit(category, '套'), qty: '-', remark: '-' };
    });
    return {
      title: logSheet.title || '城投标信 - 数字消防现场踏勘记录表',
      number: number,
      note: '注：带 * 为必填项',
      communityInfo: {
        communityName: communityInfo.communityName || item.projectName || '-',
        address: communityInfo.address || '-',
        buildingCount: communityInfo.buildingCount || '-',
        propertyCompany: communityInfo.propertyCompany || '-',
        propertyContact: communityInfo.propertyContact || item.siteContactName || '-',
        propertyPhone: communityInfo.propertyPhone || item.siteContactPhone || '-',
        maintenanceCompany: communityInfo.maintenanceCompany || '-',
        maintenanceContact: communityInfo.maintenanceContact || '-',
        maintenancePhone: communityInfo.maintenancePhone || '-',
        attachmentImages: inspectionReadonlyList(communityInfo.attachmentImages),
        fireCodeImage: inspectionReadonlyText(communityInfo.fireCodeImage)
      },
      fireAlarm: {
        hostBrand: fireAlarm.hostBrand || '-',
        hostModel: fireAlarm.hostModel || '-',
        hostCount: fireAlarm.hostCount || '-',
        manufactureDate: fireAlarm.manufactureDate || '-',
        pointCount: fireAlarm.pointCount || '-',
        networkDetail: fireAlarm.networkDetail || '-',
        broadband: fireAlarm.broadband || '-',
        hasCrtData: inspectionReadonlyYesNo(fireAlarm.hasCrtData),
        hasCrtDisplay: inspectionReadonlyYesNo(fireAlarm.hasCrtDisplay)
      },
      videoSystem: {
        fireLaneCount: videoSystem.fireLaneCount || '-',
        fireLanePosition: videoSystem.fireLanePosition || '-',
        rescueSiteCount: videoSystem.rescueSiteCount || '-',
        rescueSitePosition: videoSystem.rescueSitePosition || '-'
      },
      constructionItems: constructionItems.map(function (row) {
        return {
          name: row.name || '-',
          deviceCode: row.deviceCode || '-',
          deviceName: row.deviceName || '-',
          deviceBrand: row.deviceBrand || '-',
          deviceModel: row.deviceModel || '-',
          building: row.building || '-',
          floor: row.floor || '-',
          position: row.position || '-',
          images: row.images || []
        };
      }),
      constructionRemark: logSheet.constructionRemark || '-',
      waterSystem: defaultWaterRows.map(function (row) {
        var matched = waterSystem.find(function (itemRow) { return itemRow.name === row.name; }) || {};
        return {
          name: row.name,
          qty: inspectionReadonlyText(matched.qty || row.qty),
          valve: inspectionReadonlyYesNo(matched.valve || row.valve),
          signal: inspectionReadonlyText(matched.signal || row.signal),
          position: inspectionReadonlyText(matched.position || row.position),
          remark: inspectionReadonlyText(matched.remark || row.remark)
        };
      }),
      newDevices: defaultNewDeviceRows.map(function (row) {
        var matched = newDevices.find(function (itemRow) { return itemRow.content === row.content; }) || {};
        var category = inspectionReadonlyText(matched.category || inspectionDeviceCategory(row.content));
        return {
          index: row.index,
          category: category,
          content: row.content,
          unit: inspectionDeviceUnit(category, inspectionReadonlyText(matched.unit || row.unit)),
          qty: inspectionReadonlyText(matched.qty || row.qty),
          remark: inspectionReadonlyText(matched.remark || row.remark)
        };
      })
    };
  }

  function inspectionLogSheetHTML(item, type) {
    var sheet = buildInspectionLogSheetData(item, type);
    if (getRoute().indexOf('/app/') === 0 && type === 'survey') {
      return appInspectionLogSheetHTML(sheet);
    }
    if (getRoute().indexOf('/app/') === 0 && type === 'construction') {
      return appConstructionLogSheetHTML(sheet);
    }
    var constructionItemsHTML = type === 'construction' && sheet.constructionItems && sheet.constructionItems.length
      ? inspectionLogSectionHTML('施工项清单', '<div class="construction-log-readonly-list">' + sheet.constructionItems.map(function (row, index) {
        return '<div class="construction-log-readonly-card"><div class="construction-log-readonly-head"><strong>施工项 ' + (index + 1) + '</strong><span>' + escapeHtml(inspectionReadonlyText(row.name)) + '</span></div><div class="construction-log-readonly-grid">' +
          '<div><span>设备编码</span><strong>' + escapeHtml(inspectionReadonlyText(row.deviceCode)) + '</strong></div>' +
          '<div><span>设备名称</span><strong>' + escapeHtml(inspectionReadonlyText(row.deviceName)) + '</strong></div>' +
          '<div><span>设备品牌</span><strong>' + escapeHtml(inspectionReadonlyText(row.deviceBrand)) + '</strong></div>' +
          '<div><span>设备型号</span><strong>' + escapeHtml(inspectionReadonlyText(row.deviceModel)) + '</strong></div>' +
          '<div><span>楼栋</span><strong>' + escapeHtml(inspectionReadonlyText(row.building)) + '</strong></div>' +
          '<div><span>楼层</span><strong>' + escapeHtml(inspectionReadonlyText(row.floor)) + '</strong></div>' +
          '<div class="full"><span>具体位置</span><strong>' + escapeHtml(inspectionReadonlyText(row.position)) + '</strong></div>' +
          '<div class="full"><span>图片附件</span><strong>' + escapeHtml(inspectionReadonlyList(row.images)) + '</strong></div>' +
        '</div></div>';
      }).join('') + '</div>')
      : '';
    var communityHTML = [
      '<div class="inspection-log-grid inspection-log-grid-2">',
      inspectionLogFieldHTML('小区名称', sheet.communityInfo.communityName, true),
      inspectionLogFieldHTML('消控室详细地址', sheet.communityInfo.address, true),
      inspectionLogFieldHTML('小区楼栋数量', sheet.communityInfo.buildingCount, true),
      inspectionLogFieldHTML('物业单位', sheet.communityInfo.propertyCompany),
      inspectionLogFieldHTML('物业联系人', sheet.communityInfo.propertyContact, true),
      inspectionLogFieldHTML('联系电话', sheet.communityInfo.propertyPhone, true),
      inspectionLogFieldHTML('消防维保单位', sheet.communityInfo.maintenanceCompany),
      inspectionLogFieldHTML('消防维保单位联系人', sheet.communityInfo.maintenanceContact),
      inspectionLogFieldHTML('联系电话', sheet.communityInfo.maintenancePhone),
      (type === 'survey' ? inspectionLogFieldHTML('附件图片上传（最多10张）', sheet.communityInfo.attachmentImages) : ''),
      (type === 'survey' ? inspectionLogFieldHTML('高楼消防码', sheet.communityInfo.fireCodeImage) : ''),
      '</div>'
    ].join('');
    var fireAlarmHTML = [
      '<div class="inspection-log-grid inspection-log-grid-2">',
      inspectionLogFieldHTML('主机品牌', sheet.fireAlarm.hostBrand, true),
      inspectionLogFieldHTML('主机型号', sheet.fireAlarm.hostModel, true),
      inspectionLogFieldHTML('主机数量', sheet.fireAlarm.hostCount, true),
      inspectionLogFieldHTML('主机制造日期', sheet.fireAlarm.manufactureDate),
      inspectionLogFieldHTML('主机点位数', sheet.fireAlarm.pointCount, true),
      inspectionLogFieldHTML('联网详情', sheet.fireAlarm.networkDetail, true),
      inspectionLogFieldHTML('控制室宽带情况', sheet.fireAlarm.broadband),
      inspectionLogFieldHTML('是否有 CRT 数据（报警主机数据）', sheet.fireAlarm.hasCrtData),
      inspectionLogFieldHTML('是否有 CRT（图形显示器）', sheet.fireAlarm.hasCrtDisplay),
      '</div>'
    ].join('');
    var videoHTML = [
      '<div class="inspection-log-grid inspection-log-grid-2">',
      inspectionLogFieldHTML('消防车道数量', sheet.videoSystem.fireLaneCount),
      inspectionLogFieldHTML('消防车道位置', sheet.videoSystem.fireLanePosition),
      inspectionLogFieldHTML('消防扑救场地数量', sheet.videoSystem.rescueSiteCount),
      inspectionLogFieldHTML('消防扑救场地位置', sheet.videoSystem.rescueSitePosition),
      '</div>'
    ].join('');
    var waterHTML = [
      '<div class="inspection-log-table-wrap">',
      '<table class="inspection-log-table"><thead><tr><th>设备名称</th><th>数量</th><th>是否有球阀</th><th>信号有无</th><th>位置</th><th>备注</th></tr></thead><tbody>',
      sheet.waterSystem.map(function (row) {
        return '<tr><td>' + escapeHtml(row.name) + ' <em>*</em></td><td>' + escapeHtml(row.qty) + '</td><td>' + escapeHtml(row.valve) + '</td><td>' + escapeHtml(row.signal) + '</td><td>' + escapeHtml(row.position) + '</td><td>' + escapeHtml(row.remark) + '</td></tr>';
      }).join(''),
      '</tbody></table></div>'
    ].join('');
    var newDeviceHTML = [
      '<div class="inspection-log-table-wrap">',
      '<table class="inspection-log-table inspection-log-table-device"><thead><tr><th>序号</th><th>类别</th><th>建设内容</th><th>单位</th><th>数量</th><th>备注</th></tr></thead><tbody>',
      sheet.newDevices.map(function (row) {
        return '<tr><td class="inspection-log-cell-center">' + escapeHtml(String(row.index)) + '</td><td>' + escapeHtml(row.category) + '</td><td>' + escapeHtml(row.content) + '</td><td class="inspection-log-cell-center">' + escapeHtml(row.unit) + '</td><td class="inspection-log-cell-center">' + escapeHtml(row.qty) + '</td><td>' + escapeHtml(row.remark) + '</td></tr>';
      }).join(''),
      '</tbody></table></div>'
    ].join('');
    return [
      '<div class="inspection-log-page">',
      '<div class="inspection-log-sheet">',
      '<div class="inspection-log-sheet-head">',
      '<div class="inspection-log-title-row"><div class="inspection-log-title"></div><div class="inspection-log-code">编号：' + escapeHtml(sheet.number) + '</div></div>',
      '<div class="inspection-log-title-main">' + escapeHtml(sheet.title) + '</div>',
      '<div class="inspection-log-note">' + escapeHtml(sheet.note) + '</div>',
      '</div>',
      (type === 'construction'
        ? (constructionItemsHTML + inspectionLogSectionHTML('备注', '<div class="construction-log-remark">' + escapeHtml(inspectionReadonlyText(sheet.constructionRemark)) + '</div>'))
        : [
          inspectionLogSectionHTML('小区基本信息', communityHTML),
          inspectionLogSectionHTML('火灾报警系统', fireAlarmHTML),
          inspectionLogSectionHTML('视频监控系统', videoHTML),
          inspectionLogSectionHTML('消防水系统', waterHTML),
          inspectionLogSectionHTML('新增设备统计', newDeviceHTML)
        ].join('')),
      '</div></div>'
    ].join('');
  }

  function appInspectionLogReadonlyField(label, value) {
    return '<div class="mobile-cost-card-row"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(inspectionReadonlyText(value)) + '</strong></div>';
  }

  function appInspectionLogSectionHTML(title, extra, body) {
    return '<section class="mobile-section app-log-view-section"><div class="section-title"><h4>' + escapeHtml(title) + '</h4><span>' + escapeHtml(extra || '') + '</span></div><div class="mobile-cost-detail-card app-log-view-card">' + body + '</div></section>';
  }

  function appInspectionLogSheetHTML(sheet) {
    var waterCards = (sheet.waterSystem || []).map(function (row) {
      return '<div class="mobile-cost-detail-row app-log-view-list-card"><div class="mobile-cost-detail-row-head"><strong>' + escapeHtml(row.name) + '</strong><span>消防水系统</span></div><div class="mobile-cost-card-body">' +
        appInspectionLogReadonlyField('数量', row.qty) +
        appInspectionLogReadonlyField('球阀', row.valve) +
        appInspectionLogReadonlyField('信号', row.signal) +
        appInspectionLogReadonlyField('位置', row.position) +
        appInspectionLogReadonlyField('备注', row.remark) +
      '</div></div>';
    }).join('');
    var newDeviceCards = (sheet.newDevices || []).map(function (row) {
      return '<div class="mobile-cost-detail-row app-log-view-list-card"><div class="mobile-cost-detail-row-head"><strong>' + escapeHtml(String(row.index) + '. ' + row.content) + '</strong><span>' + escapeHtml(row.category) + '</span></div><div class="mobile-cost-card-body">' +
        appInspectionLogReadonlyField('单位', row.unit) +
        appInspectionLogReadonlyField('数量', row.qty) +
        appInspectionLogReadonlyField('备注', row.remark) +
      '</div></div>';
    }).join('');
    return [
      '<div class="app-log-view-page">',
      appInspectionLogSectionHTML('基础信息', sheet.number, '<div class="mobile-cost-card-body">' +
        appInspectionLogReadonlyField('小区名称', sheet.communityInfo.communityName) +
        appInspectionLogReadonlyField('详细地址', sheet.communityInfo.address) +
        appInspectionLogReadonlyField('楼栋数量', sheet.communityInfo.buildingCount) +
        appInspectionLogReadonlyField('物业单位', sheet.communityInfo.propertyCompany) +
        appInspectionLogReadonlyField('物业联系人', sheet.communityInfo.propertyContact) +
        appInspectionLogReadonlyField('联系电话', sheet.communityInfo.propertyPhone) +
        appInspectionLogReadonlyField('维保单位', sheet.communityInfo.maintenanceCompany) +
        appInspectionLogReadonlyField('维保联系人', sheet.communityInfo.maintenanceContact) +
        appInspectionLogReadonlyField('维保电话', sheet.communityInfo.maintenancePhone) +
        appInspectionLogReadonlyField('附件图片', sheet.communityInfo.attachmentImages) +
        appInspectionLogReadonlyField('高楼消防码', sheet.communityInfo.fireCodeImage) +
      '</div>'),
      appInspectionLogSectionHTML('火灾报警系统', '', '<div class="mobile-cost-card-body">' +
        appInspectionLogReadonlyField('主机品牌', sheet.fireAlarm.hostBrand) +
        appInspectionLogReadonlyField('主机型号', sheet.fireAlarm.hostModel) +
        appInspectionLogReadonlyField('主机数量', sheet.fireAlarm.hostCount) +
        appInspectionLogReadonlyField('制造日期', sheet.fireAlarm.manufactureDate) +
        appInspectionLogReadonlyField('主机点位数', sheet.fireAlarm.pointCount) +
        appInspectionLogReadonlyField('联网详情', sheet.fireAlarm.networkDetail) +
        appInspectionLogReadonlyField('宽带情况', sheet.fireAlarm.broadband) +
        appInspectionLogReadonlyField('CRT 数据', sheet.fireAlarm.hasCrtData) +
        appInspectionLogReadonlyField('CRT 显示器', sheet.fireAlarm.hasCrtDisplay) +
      '</div>'),
      appInspectionLogSectionHTML('视频监控系统', '', '<div class="mobile-cost-card-body">' +
        appInspectionLogReadonlyField('消防车道数量', sheet.videoSystem.fireLaneCount) +
        appInspectionLogReadonlyField('消防车道位置', sheet.videoSystem.fireLanePosition) +
        appInspectionLogReadonlyField('扑救场地数量', sheet.videoSystem.rescueSiteCount) +
        appInspectionLogReadonlyField('扑救场地位置', sheet.videoSystem.rescueSitePosition) +
      '</div>'),
      '<section class="mobile-section app-log-view-section"><div class="section-title"><h4>消防水系统</h4><span>' + escapeHtml(String((sheet.waterSystem || []).length)) + '项</span></div><div class="mobile-cost-detail-grid">' + waterCards + '</div></section>',
      '<section class="mobile-section app-log-view-section"><div class="section-title"><h4>新增设备统计</h4><span>' + escapeHtml(String((sheet.newDevices || []).length)) + '项</span></div><div class="mobile-cost-detail-grid">' + newDeviceCards + '</div></section>',
      '</div>'
    ].join('');
  }

  function appConstructionLogSheetHTML(sheet) {
    var constructionCards = (sheet.constructionItems || []).map(function (row, index) {
      return '<div class="mobile-cost-detail-row app-log-view-list-card"><div class="mobile-cost-detail-row-head"><strong>施工项 ' + (index + 1) + ' · ' + escapeHtml(inspectionReadonlyText(row.name)) + '</strong><span>' + escapeHtml(inspectionReadonlyText(row.deviceName)) + '</span></div><div class="mobile-cost-card-body">' +
        appInspectionLogReadonlyField('设备编码', row.deviceCode) +
        appInspectionLogReadonlyField('设备名称', row.deviceName) +
        appInspectionLogReadonlyField('设备品牌', row.deviceBrand) +
        appInspectionLogReadonlyField('设备型号', row.deviceModel) +
        appInspectionLogReadonlyField('楼栋', row.building) +
        appInspectionLogReadonlyField('楼层', row.floor) +
        appInspectionLogReadonlyField('具体位置', row.position) +
        appInspectionLogReadonlyField('图片附件', inspectionReadonlyList(row.images)) +
      '</div></div>';
    }).join('');
    return [
      '<div class="app-log-view-page">',
      '<section class="mobile-section app-log-view-section"><div class="section-title"><h4>施工项清单</h4><span>' + escapeHtml(String((sheet.constructionItems || []).length)) + '项</span></div><div class="mobile-cost-detail-grid">' + constructionCards + '</div></section>',
      appInspectionLogSectionHTML('备注', '', '<div class="mobile-cost-card-body">' + appInspectionLogReadonlyField('备注', sheet.constructionRemark) + '</div>'),
      '</div>'
    ].join('');
  }

  function workorderBaseRoute(type) {
    if (type === 'construction') return '/pc/project/construction-workorder';
    if (type === 'maintenance') return '/pc/project/maintenance-workorder';
    return '/pc/project/survey-workorder';
  }

  function findWorkorderByType(type, id) {
    if (type === 'construction') return findConstruction(id);
    if (type === 'maintenance') return findMaintenance(id);
    return findSurvey(id);
  }

  function openWorkorderDetail(type, id) {
    appState.ui.currentWorkorderDetail = { type: type, id: id };
    setRoute('/pc/project/workorder-detail');
  }

  function currentWorkorderDetailItem() {
    var detail = appState.ui.currentWorkorderDetail || {};
    return detail.id ? findWorkorderByType(detail.type, detail.id) : null;
  }

  function workorderStatusClass(status, overdue) {
    if (overdue || status === '已撤销') return 'danger';
    if (/待|中/.test(status || '')) return 'warning';
    return 'success';
  }

  function workorderDetailField(label, value, extraClass) {
    return '<div class="workorder-detail-item' + (extraClass ? ' ' + extraClass : '') + '"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(inspectionReadonlyText(value)) + '</strong></div>';
  }

  function workorderDetailPageHTML() {
    var detailState = appState.ui.currentWorkorderDetail || {};
    var type = detailState.type || 'survey';
    var item = currentWorkorderDetailItem();
    if (!item) {
      return '<div class="panel table-panel"><div class="empty-state">未找到对应工单</div></div>';
    }
    var isConstruction = type === 'construction';
    var isMaintenance = type === 'maintenance';
    var ownerLabel = isConstruction ? '施工人员' : (isMaintenance ? '运维人员' : '工勘人员');
    var planLabel = isConstruction ? '计划施工日期' : (isMaintenance ? '计划运维日期' : '计划工勘日期');
    var listTitle = isConstruction ? '施工工单' : (isMaintenance ? '运维工单' : '工勘工单');
    var statusClass = workorderStatusClass(item.status, item.overdue);
    var logNumber = (item.logSheet && item.logSheet.number) || item.id || '-';
    var latestLog = item.logs && item.logs.length ? item.logs[item.logs.length - 1] : null;
    var process = item.processInfo || { detail: '', images: [], submitted: false, submitTime: '', submitter: '' };
    if (isMaintenance) {
      return [
        '<div class="workorder-detail-page">',
        '<div class="workorder-detail-shell">',
        '<div class="workorder-detail-header">',
        '<div class="workorder-detail-header-left"><button class="workorder-detail-back" data-action="workorder-detail-back" data-workorder-type="' + type + '">←</button><div><div class="workorder-detail-title-row"><h3>' + listTitle + '详情</h3><span class="status ' + statusClass + '">' + escapeHtml(item.status || '-') + '</span></div><p>' + escapeHtml(item.id || '-') + '</p></div></div>',
        '<div class="workorder-detail-header-actions"><button class="btn secondary" data-route="' + workorderBaseRoute(type) + '">返回列表</button></div>',
        '</div>',
        '<div class="workorder-detail-section"><div class="workorder-detail-section-title">基础信息</div><div class="workorder-detail-grid">',
        workorderDetailField('工单编号', item.id),
        workorderDetailField('所属项目', item.projectName),
        workorderDetailField(ownerLabel, item.worker),
        workorderDetailField(planLabel, item.planDate),
        workorderDetailField('故障描述', item.faultDesc || '-', 'workorder-detail-item-full'),
        workorderDetailField('紧急程度', item.priority || '-'),
        workorderDetailField('创建时间', item.createTime),
        workorderDetailField('创建人', item.creator),
        workorderDetailField('状态', item.status),
        workorderDetailField('是否超期', item.overdue ? '是' : '否', item.overdue ? 'is-danger' : ''),
        workorderDetailField('现场联系人', [item.siteContactName, item.siteContactTitle].filter(Boolean).join(' / ') || '-'),
        workorderDetailField('联系电话', item.siteContactPhone),
        workorderDetailField('图片附件', item.imageAttachmentName || '-'),
        workorderDetailField('备注', item.remark || '-', 'workorder-detail-item-full'),
        '</div></div>',
        '<div class="workorder-detail-section"><div class="workorder-detail-section-head"><div class="workorder-detail-section-title">处置过程</div></div>',
        '<form id="maintenance-process-form" class="maintenance-process-form">',
        '<label class="inspection-log-edit-field maintenance-process-field"><span>处置详情</span><textarea class="inspection-log-edit-input inspection-log-edit-textarea" name="processDetail" placeholder="请输入处置过程、结果说明">' + escapeHtml(process.detail || '') + '</textarea></label>',
        inspectionLogUploadFieldHTML('图片附件', 'maintenanceProcessImages', (process.images || []).join('、'), true),
        '<div class="maintenance-process-meta">' +
        '<div class="workorder-log-side-item"><span>提交状态</span><strong>' + escapeHtml(process.submitted ? '已提交' : '待提交') + '</strong></div>' +
        '<div class="workorder-log-side-item"><span>提交时间</span><strong>' + escapeHtml(process.submitTime || '-') + '</strong></div>' +
        '<div class="workorder-log-side-item"><span>提交人</span><strong>' + escapeHtml(process.submitter || '-') + '</strong></div>' +
        '</div>' +
        '<div class="maintenance-process-actions"><button type="button" class="btn primary" data-action="maintenance-process-submit" data-id="' + escapeHtml(item.id) + '">提交处置过程</button></div>' +
        '</form>',
        '</div>',
        '</div>'
      ].join('');
    }
    return [
      '<div class="workorder-detail-page">',
      '<div class="workorder-detail-shell">',
      '<div class="workorder-detail-header">',
      '<div class="workorder-detail-header-left"><button class="workorder-detail-back" data-action="workorder-detail-back" data-workorder-type="' + type + '">←</button><div><div class="workorder-detail-title-row"><h3>' + listTitle + '详情</h3><span class="status ' + statusClass + '">' + escapeHtml(item.status || '-') + '</span></div><p>' + escapeHtml(item.id || '-') + '</p></div></div>',
      '<div class="workorder-detail-header-actions"><button class="btn secondary" data-route="' + workorderBaseRoute(type) + '">返回列表</button></div>',
      '</div>',
      '<div class="workorder-detail-section"><div class="workorder-detail-section-title">基础信息</div><div class="workorder-detail-grid">',
      workorderDetailField('工单编号', item.id),
      workorderDetailField('所属项目', item.projectName),
      workorderDetailField(ownerLabel, isConstruction ? item.worker : item.surveyor),
      workorderDetailField(planLabel, item.planDate),
      workorderDetailField('创建时间', item.createTime),
      workorderDetailField('创建人', item.creator),
      workorderDetailField('状态', item.status),
      workorderDetailField('是否超期', item.overdue ? '是' : '否', item.overdue ? 'is-danger' : ''),
      workorderDetailField('现场联系人', [item.siteContactName, item.siteContactTitle].filter(Boolean).join(' / ') || '-'),
      workorderDetailField('联系电话', item.siteContactPhone),
      workorderDetailField('图片附件', item.imageAttachmentName || '-'),
      workorderDetailField('备注', item.remark || '-', 'workorder-detail-item-full'),
      '</div></div>',
      '<div class="workorder-detail-section"><div class="workorder-detail-section-head"><div class="workorder-detail-section-title">日志模块</div><button class="btn primary workorder-log-fill-btn" data-action="workorder-fill-log" data-id="' + escapeHtml(item.id) + '" data-workorder-type="' + type + '">填报日志</button></div><div class="workorder-log-card">',
      '<div class="workorder-log-main"><div class="workorder-log-row"><span>日志编号：</span><button class="workorder-log-link" data-action="workorder-open-log" data-id="' + escapeHtml(item.id) + '" data-workorder-type="' + type + '">' + escapeHtml(logNumber) + '</button></div><div class="workorder-log-row"><span>日志类型：</span><strong>' + (isConstruction ? '施工日志' : '工勘日志') + '</strong></div></div>',
      '<div class="workorder-log-side"><div class="workorder-log-side-item"><span>最近更新时间</span><strong>' + escapeHtml(latestLog ? latestLog.time : '-') + '</strong></div><div class="workorder-log-side-item"><span>最近操作人</span><strong>' + escapeHtml(latestLog ? latestLog.operator : '-') + '</strong></div></div>',
      '</div></div>',
      '</div>',
      (type === 'construction' ? constructionWorkorderModalHTML() : surveyWorkorderModalHTML())
    ].join('');
  }

  function saveMaintenanceProcess(id, formData) {
    var detail = safeText(formData.get('processDetail')).trim();
    var images = inspectionParseListText(formData.get('maintenanceProcessImages')).slice(0, 10);
    if (!detail) {
      window.alert('请填写处置详情后再提交。');
      return;
    }
    var now = '2026-04-14 16:20';
    getMaintenanceWorkorderState().list = getMaintenanceWorkorderState().list.map(function (item) {
      if (item.id !== id) return item;
      return Object.assign({}, item, {
        status: '已完成',
        overdue: false,
        processInfo: {
          detail: detail,
          images: images,
          submitted: true,
          submitTime: now,
          submitter: currentUserName()
        },
        logs: (item.logs || []).concat([{ time: now, operator: currentUserName(), content: '提交运维工单处置过程。' }])
      });
    });
    render();
  }

  function inspectionLogSourceSheet(item) {
    return item.logSheetDraft || item.logSheet || {};
  }

  function inspectionLogFormFieldHTML(label, name, value, required, options) {
    var attrs = options || {};
    if (attrs.options && attrs.options.length) {
      return '<label class="inspection-log-edit-field' + (attrs.className ? ' ' + attrs.className : '') + '"><span>' + escapeHtml(label) + (required ? ' <em>*</em>' : '') + '</span><select class="inspection-log-edit-input" name="' + name + '">' + attrs.options.map(function (option) {
        var selected = safeText(value) === safeText(option) ? ' selected' : '';
        return '<option value="' + escapeHtml(option) + '"' + selected + '>' + escapeHtml(option) + '</option>';
      }).join('') + '</select></label>';
    }
    var tag = attrs.multiline ? 'textarea' : 'input';
    var valueText = escapeHtml(value == null ? '' : String(value));
    var placeholder = escapeHtml(attrs.placeholder || '');
    var extraClass = attrs.className ? ' ' + attrs.className : '';
    if (tag === 'textarea') {
      return '<label class="inspection-log-edit-field' + extraClass + '"><span>' + escapeHtml(label) + (required ? ' <em>*</em>' : '') + '</span><textarea class="inspection-log-edit-input inspection-log-edit-textarea" name="' + name + '" placeholder="' + placeholder + '">' + valueText + '</textarea></label>';
    }
    return '<label class="inspection-log-edit-field' + extraClass + '"><span>' + escapeHtml(label) + (required ? ' <em>*</em>' : '') + '</span><input class="inspection-log-edit-input" name="' + name + '" value="' + valueText + '" placeholder="' + placeholder + '" /></label>';
  }

  function inspectionLogUploadFieldHTML(label, name, value, multiple) {
    var displayText = safeText(value).trim() || '未上传';
    return '<div class="inspection-log-edit-field inspection-log-upload-field"><span>' + escapeHtml(label) + '</span><div class="inspection-log-upload-row"><input type="hidden" name="' + name + '" value="' + escapeHtml(safeText(value)) + '" /><button type="button" class="btn secondary inspection-log-upload-btn" data-action="inspection-log-upload" data-upload-name="' + name + '" data-upload-multiple="' + (multiple ? '1' : '0') + '">上传</button><div class="inspection-log-upload-name" data-upload-display="' + name + '">' + escapeHtml(displayText) + '</div></div></div>';
  }

  function constructionLogDeviceList() {
    return (getManagedState('deviceArchive').list || []).map(function (device) { return Object.assign({}, device); });
  }

  function constructionLogEmptyItem() {
    return {
      name: '',
      deviceCode: '',
      deviceName: '',
      deviceBrand: '',
      deviceModel: '',
      building: '',
      floor: '',
      position: '',
      images: []
    };
  }

  function constructionLogItemsSource(item) {
    var source = (item.logSheetDraft && item.logSheetDraft.constructionItems) || (item.logSheet && item.logSheet.constructionItems) || [];
    return (source.length ? source : [constructionLogEmptyItem()]).map(function (row) {
      return Object.assign(constructionLogEmptyItem(), row, { images: (row.images || []).slice(0, 3) });
    });
  }

  function ensureConstructionLogDraftItem() {
    var modal = getConstructionWorkorderState().modal;
    if (!modal || !modal.item) return [];
    modal.item.logSheetDraft = modal.item.logSheetDraft || Object.assign({}, modal.item.logSheet || {});
    modal.item.logSheetDraft.constructionItems = constructionLogItemsSource(modal.item);
    return modal.item.logSheetDraft.constructionItems;
  }

  function constructionLogDeviceByCode(code) {
    return constructionLogDeviceList().find(function (device) { return device.code === code; });
  }

  function syncConstructionLogField(index, field, value) {
    var items = ensureConstructionLogDraftItem();
    if (!items[index]) items[index] = constructionLogEmptyItem();
    items[index][field] = value;
    if (field === 'deviceCode') {
      var device = constructionLogDeviceByCode(value);
      items[index].deviceCode = device ? device.code : '';
      items[index].deviceName = device ? device.name : '';
      items[index].deviceBrand = device ? device.brand : '';
      items[index].deviceModel = device ? device.model : '';
    }
  }

  function addConstructionLogItem() {
    var items = ensureConstructionLogDraftItem();
    items.push(constructionLogEmptyItem());
    render();
  }

  function removeConstructionLogItem(index) {
    var items = ensureConstructionLogDraftItem();
    if (items.length <= 1) return;
    items.splice(index, 1);
    render();
  }

  function constructionLogFormModalHTML(item, closeAction, formId) {
    if (getRoute().indexOf('/app/') === 0) {
      return appConstructionLogFormModalHTML(item, closeAction, formId);
    }
    var items = constructionLogItemsSource(item);
    var deviceOptions = constructionLogDeviceList();
    return [
      '<div class="modal-mask" data-action="' + closeAction + '"><div class="modal-card customer-modal inspection-log-modal inspection-log-edit-modal construction-log-edit-modal" data-stop-close="1">',
      '<div class="modal-header inspection-log-modal-header"><div><h3>填报施工日志</h3><p>' + escapeHtml(item.id || '-') + ' · ' + escapeHtml(item.projectName || '-') + '</p></div><button class="icon-btn inspection-log-close-btn" data-action="' + closeAction + '">×</button></div>',
      '<div class="modal-body inspection-log-modal-body"><div class="inspection-log-page"><form id="' + formId + '" class="inspection-log-sheet inspection-log-form construction-log-form" autocomplete="off">',
      '<div class="inspection-log-sheet-head"><div class="inspection-log-title-row"><div class="inspection-log-title"></div><div class="inspection-log-code">编号：' + escapeHtml(((item.logSheet && item.logSheet.number) || item.id || '')) + '</div></div><div class="inspection-log-title-main">城投标信 - 施工日志填报</div><div class="inspection-log-note">注：施工项名称、设备为必填项</div></div>',
      '<section class="inspection-log-section"><div class="construction-log-section-head"><div class="inspection-log-section-title">施工项清单</div></div><input type="hidden" name="constructionItemCount" value="' + items.length + '" />' +
      items.map(function (row, index) {
        return '<div class="construction-log-item">' +
          '<div class="construction-log-item-head"><div class="construction-log-item-title">施工项 ' + (index + 1) + '</div>' + (items.length > 1 ? '<button type="button" class="link-btn danger-link" data-action="construction-log-remove-item" data-index="' + index + '">删除</button>' : '') + '</div>' +
          '<div class="inspection-log-edit-grid inspection-log-edit-grid-2">' +
          '<label class="inspection-log-edit-field"><span>施工项名称 <em>*</em></span><input class="inspection-log-edit-input" name="constructionName-' + index + '" value="' + escapeHtml(row.name) + '" data-construction-log-field="name" data-index="' + index + '" /></label>' +
          '<label class="inspection-log-edit-field"><span>设备 <em>*</em></span><select class="inspection-log-edit-input" name="constructionDevice-' + index + '" data-construction-log-field="deviceCode" data-index="' + index + '"><option value="">请选择设备</option>' + deviceOptions.map(function (device) { return '<option value="' + escapeHtml(device.code) + '"' + (row.deviceCode === device.code ? ' selected' : '') + '>' + escapeHtml(device.code + ' / ' + device.name) + '</option>'; }).join('') + '</select></label>' +
          '<label class="inspection-log-edit-field"><span>设备编码</span><input class="inspection-log-edit-input" name="constructionDeviceCode-' + index + '" value="' + escapeHtml(row.deviceCode) + '" readonly /></label>' +
          '<label class="inspection-log-edit-field"><span>设备名称</span><input class="inspection-log-edit-input" name="constructionDeviceName-' + index + '" value="' + escapeHtml(row.deviceName) + '" readonly /></label>' +
          '<label class="inspection-log-edit-field"><span>设备品牌</span><input class="inspection-log-edit-input" name="constructionDeviceBrand-' + index + '" value="' + escapeHtml(row.deviceBrand) + '" readonly /></label>' +
          '<label class="inspection-log-edit-field"><span>设备型号</span><input class="inspection-log-edit-input" name="constructionDeviceModel-' + index + '" value="' + escapeHtml(row.deviceModel) + '" readonly /></label>' +
          '</div>' +
          '<div class="construction-log-location-grid">' +
          '<label class="inspection-log-edit-field"><span>楼栋</span><input class="inspection-log-edit-input" name="constructionBuilding-' + index + '" value="' + escapeHtml(row.building) + '" data-construction-log-field="building" data-index="' + index + '" /></label>' +
          '<label class="inspection-log-edit-field"><span>楼层</span><input class="inspection-log-edit-input" name="constructionFloor-' + index + '" value="' + escapeHtml(row.floor) + '" data-construction-log-field="floor" data-index="' + index + '" /></label>' +
          '<label class="inspection-log-edit-field"><span>具体位置</span><input class="inspection-log-edit-input" name="constructionPosition-' + index + '" value="' + escapeHtml(row.position) + '" data-construction-log-field="position" data-index="' + index + '" /></label>' +
          '</div>' +
          inspectionLogUploadFieldHTML('图片附件（最多支持3张）', 'constructionImages-' + index, (row.images || []).join('、'), true) +
        '</div>';
      }).join('') + '<div class="construction-log-add-bar"><button type="button" class="btn secondary construction-log-add-btn" data-action="construction-log-add-item">添加施工项</button></div></section>',
      '<section class="inspection-log-section"><div class="inspection-log-section-title">备注</div>' + inspectionLogFormFieldHTML('备注', 'constructionRemark', safeText((item.logSheetDraft && item.logSheetDraft.constructionRemark) || (item.logSheet && item.logSheet.constructionRemark) || ''), false, { multiline: true, className: 'construction-log-remark-field', placeholder: '请输入备注' }) + '</section>',
      '</form></div></div>',
      '<div class="modal-footer inspection-log-modal-footer"><button type="button" class="btn secondary inspection-log-footer-btn" data-action="construction-log-draft" data-id="' + escapeHtml(item.id) + '">存草稿</button><button type="button" class="btn primary" data-action="construction-log-submit" data-id="' + escapeHtml(item.id) + '">提交</button><button type="button" class="btn secondary inspection-log-footer-btn" data-action="' + closeAction + '">取消</button></div>',
      '</div></div>'
    ].join('');
  }

  function appConstructionLogFormModalHTML(item, closeAction, formId) {
    var items = constructionLogItemsSource(item);
    var deviceOptions = constructionLogDeviceList();
    return [
      '<div class="modal-mask app-log-fill-mask" data-action="' + closeAction + '"><div class="modal-card app-log-fill-modal" data-stop-close="1">',
      appLogModalHeaderHTML(closeAction, (item.id || '-') + ' · ' + (item.projectName || '-')),
      '<div class="modal-body app-log-fill-body"><form id="' + formId + '" class="app-log-fill-form" autocomplete="off">',
      '<section class="mobile-section app-log-fill-section"><div class="section-title"><h4>施工项清单</h4><span>' + items.length + '项</span></div><input type="hidden" name="constructionItemCount" value="' + items.length + '" /><div class="mobile-cost-detail-grid">' +
      items.map(function (row, index) {
        return '<div class="mobile-cost-detail-row app-log-fill-list-card"><div class="mobile-cost-detail-row-head"><strong>施工项 ' + (index + 1) + '</strong>' + (items.length > 1 ? '<button type="button" class="link-btn danger-link" data-action="construction-log-remove-item" data-index="' + index + '">删除</button>' : '<span>必填</span>') + '</div><div class="mobile-cost-detail-grid">' +
          appInspectionLogFormFieldHTML('施工项名称', 'constructionName-' + index, row.name, true) +
          '<label class="field app-log-fill-field"><span>设备 <em>*</em></span><select name="constructionDevice-' + index + '" data-construction-log-field="deviceCode" data-index="' + index + '"><option value="">请选择设备</option>' + deviceOptions.map(function (device) { return '<option value="' + escapeHtml(device.code) + '"' + (row.deviceCode === device.code ? ' selected' : '') + '>' + escapeHtml(device.code + ' / ' + device.name) + '</option>'; }).join('') + '</select></label>' +
          '<label class="field app-log-fill-field"><span>设备编码</span><input name="constructionDeviceCode-' + index + '" value="' + escapeHtml(row.deviceCode) + '" readonly /></label>' +
          '<label class="field app-log-fill-field"><span>设备名称</span><input name="constructionDeviceName-' + index + '" value="' + escapeHtml(row.deviceName) + '" readonly /></label>' +
          '<label class="field app-log-fill-field"><span>设备品牌</span><input name="constructionDeviceBrand-' + index + '" value="' + escapeHtml(row.deviceBrand) + '" readonly /></label>' +
          '<label class="field app-log-fill-field"><span>设备型号</span><input name="constructionDeviceModel-' + index + '" value="' + escapeHtml(row.deviceModel) + '" readonly /></label>' +
          '<label class="field app-log-fill-field"><span>楼栋</span><input name="constructionBuilding-' + index + '" value="' + escapeHtml(row.building) + '" data-construction-log-field="building" data-index="' + index + '" /></label>' +
          '<label class="field app-log-fill-field"><span>楼层</span><input name="constructionFloor-' + index + '" value="' + escapeHtml(row.floor) + '" data-construction-log-field="floor" data-index="' + index + '" /></label>' +
          '<label class="field app-log-fill-field app-log-fill-field-full"><span>具体位置</span><input name="constructionPosition-' + index + '" value="' + escapeHtml(row.position) + '" data-construction-log-field="position" data-index="' + index + '" /></label>' +
          '<div class="field app-log-fill-field app-log-fill-field-full"><span>图片附件（最多3张）</span><div class="app-log-fill-upload"><input type="hidden" name="constructionImages-' + index + '" value="' + escapeHtml((row.images || []).join('、')) + '" /><button type="button" class="btn secondary" data-action="inspection-log-upload" data-upload-name="constructionImages-' + index + '" data-upload-multiple="1">上传</button><div class="app-log-fill-upload-name" data-upload-display="constructionImages-' + index + '">' + escapeHtml((row.images || []).join('、') || '未上传') + '</div></div></div>' +
        '</div></div>';
      }).join('') + '</div><div class="mobile-cost-actions"><button type="button" class="btn secondary" data-action="construction-log-add-item">新增施工项</button></div></section>',
      '<section class="mobile-section app-log-fill-section"><div class="section-title"><h4>备注</h4><span></span></div><div class="mobile-cost-detail-card app-log-fill-grid">' +
      appInspectionLogFormFieldHTML('备注', 'constructionRemark', safeText((item.logSheetDraft && item.logSheetDraft.constructionRemark) || (item.logSheet && item.logSheet.constructionRemark) || ''), false, { multiline: true }) +
      '</div></section>',
      '</form></div>',
      '<div class="modal-footer app-log-fill-footer"><button type="button" class="btn secondary" data-action="construction-log-draft" data-id="' + escapeHtml(item.id) + '">存草稿</button><button type="button" class="btn primary" data-action="construction-log-submit" data-id="' + escapeHtml(item.id) + '">提交</button><button type="button" class="btn secondary" data-action="' + closeAction + '">取消</button></div>',
      '</div></div>'
    ].join('');
  }

  function inspectionLogFormModalHTML(item, type, closeAction, formId) {
    if (type === 'construction') {
      return constructionLogFormModalHTML(item, closeAction, formId);
    }
    if (getRoute().indexOf('/app/') === 0 && type === 'survey') {
      return appInspectionLogFormModalHTML(item, closeAction, formId);
    }
    var sheet = buildInspectionLogSheetData({ projectName: item.projectName, siteContactName: item.siteContactName, siteContactPhone: item.siteContactPhone, logSheet: inspectionLogSourceSheet(item) }, type);
    var waterRows = sheet.waterSystem || [];
    var newDeviceRows = sheet.newDevices || [];
    return [
      '<div class="modal-mask" data-action="' + closeAction + '"><div class="modal-card customer-modal inspection-log-modal inspection-log-edit-modal" data-stop-close="1">',
      '<div class="modal-header inspection-log-modal-header"><div><h3>' + (type === 'construction' ? '填报施工日志' : '填报工勘日志') + '</h3><p>' + escapeHtml(item.id || '-') + ' · ' + escapeHtml(item.projectName || '-') + '</p></div><button class="icon-btn inspection-log-close-btn" data-action="' + closeAction + '">×</button></div>',
      '<div class="modal-body inspection-log-modal-body"><div class="inspection-log-page"><form id="' + formId + '" class="inspection-log-sheet inspection-log-form" autocomplete="off">',
      '<div class="inspection-log-sheet-head"><div class="inspection-log-title-row"><div class="inspection-log-title"></div><div class="inspection-log-code">编号：' + escapeHtml(sheet.number) + '</div></div><div class="inspection-log-title-main">' + escapeHtml(sheet.title) + '</div><div class="inspection-log-note">' + escapeHtml(sheet.note) + '</div></div>',
      '<section class="inspection-log-section"><div class="inspection-log-section-title">小区基本信息</div><div class="inspection-log-edit-grid inspection-log-edit-grid-2">',
      inspectionLogFormFieldHTML('小区名称', 'communityName', sheet.communityInfo.communityName, true),
      inspectionLogFormFieldHTML('消控室详细地址', 'address', sheet.communityInfo.address, true),
      inspectionLogFormFieldHTML('小区楼栋数量', 'buildingCount', sheet.communityInfo.buildingCount, true),
      inspectionLogFormFieldHTML('物业单位', 'propertyCompany', sheet.communityInfo.propertyCompany),
      inspectionLogFormFieldHTML('物业联系人', 'propertyContact', sheet.communityInfo.propertyContact, true),
      inspectionLogFormFieldHTML('联系电话', 'propertyPhone', sheet.communityInfo.propertyPhone, true),
      inspectionLogFormFieldHTML('消防维保单位', 'maintenanceCompany', sheet.communityInfo.maintenanceCompany),
      inspectionLogFormFieldHTML('消防维保单位联系人', 'maintenanceContact', sheet.communityInfo.maintenanceContact),
      inspectionLogFormFieldHTML('联系电话', 'maintenancePhone', sheet.communityInfo.maintenancePhone),
      (type === 'survey' ? inspectionLogUploadFieldHTML('附件图片上传（最多10张）', 'attachmentImages', sheet.communityInfo.attachmentImages === '-' ? '' : sheet.communityInfo.attachmentImages, true) : ''),
      (type === 'survey' ? inspectionLogUploadFieldHTML('高楼消防码', 'fireCodeImage', sheet.communityInfo.fireCodeImage === '-' ? '' : sheet.communityInfo.fireCodeImage, false) : ''),
      '</div></section>',
      '<section class="inspection-log-section"><div class="inspection-log-section-title">火灾报警系统</div><div class="inspection-log-edit-grid inspection-log-edit-grid-2">',
      inspectionLogFormFieldHTML('主机品牌', 'hostBrand', sheet.fireAlarm.hostBrand, true),
      inspectionLogFormFieldHTML('主机型号', 'hostModel', sheet.fireAlarm.hostModel, true),
      inspectionLogFormFieldHTML('主机数量', 'hostCount', sheet.fireAlarm.hostCount, true),
      inspectionLogFormFieldHTML('主机制造日期', 'manufactureDate', sheet.fireAlarm.manufactureDate),
      inspectionLogFormFieldHTML('主机点位数', 'pointCount', sheet.fireAlarm.pointCount, true),
      inspectionLogFormFieldHTML('联网详情', 'networkDetail', sheet.fireAlarm.networkDetail, true, { multiline: true }),
      inspectionLogFormFieldHTML('控制室宽带情况', 'broadband', sheet.fireAlarm.broadband),
      inspectionLogFormFieldHTML('是否有 CRT 数据（报警主机数据）', 'hasCrtData', sheet.fireAlarm.hasCrtData, false, { options: ['是', '否'] }),
      inspectionLogFormFieldHTML('是否有 CRT（图形显示器）', 'hasCrtDisplay', sheet.fireAlarm.hasCrtDisplay, false, { options: ['是', '否'] }),
      '</div></section>',
      '<section class="inspection-log-section"><div class="inspection-log-section-title">视频监控系统</div><div class="inspection-log-edit-grid inspection-log-edit-grid-2">',
      inspectionLogFormFieldHTML('消防车道数量', 'fireLaneCount', sheet.videoSystem.fireLaneCount),
      inspectionLogFormFieldHTML('消防车道位置', 'fireLanePosition', sheet.videoSystem.fireLanePosition),
      inspectionLogFormFieldHTML('消防扑救场地数量', 'rescueSiteCount', sheet.videoSystem.rescueSiteCount),
      inspectionLogFormFieldHTML('消防扑救场地位置', 'rescueSitePosition', sheet.videoSystem.rescueSitePosition),
      '</div></section>',
      '<section class="inspection-log-section"><div class="inspection-log-section-title">消防水系统</div><div class="inspection-log-table-wrap"><table class="inspection-log-table"><thead><tr><th>设备名称</th><th>数量</th><th>是否有球阀</th><th>信号有无</th><th>位置</th><th>备注</th></tr></thead><tbody>',
      waterRows.map(function (row, index) {
        return '<tr><td>' + escapeHtml(row.name) + (inspectionWaterRowRequired(row.name) ? ' <em>*</em>' : '') + '<input type="hidden" name="waterName-' + index + '" value="' + escapeHtml(row.name) + '" /></td><td><input class="inspection-log-table-input" name="waterQty-' + index + '" value="' + escapeHtml(row.qty === '-' ? '' : row.qty) + '" /></td><td><select class="inspection-log-table-input" name="waterValve-' + index + '"><option value=""></option><option value="是"' + (row.valve === '是' ? ' selected' : '') + '>是</option><option value="否"' + (row.valve === '否' ? ' selected' : '') + '>否</option></select></td><td><select class="inspection-log-table-input" name="waterSignal-' + index + '"><option value=""></option><option value="有"' + (row.signal === '有' ? ' selected' : '') + '>有</option><option value="无"' + (row.signal === '无' ? ' selected' : '') + '>无</option></select></td><td><input class="inspection-log-table-input" name="waterPosition-' + index + '" value="' + escapeHtml(row.position === '-' ? '' : row.position) + '" /></td><td><input class="inspection-log-table-input" name="waterRemark-' + index + '" value="' + escapeHtml(row.remark === '-' ? '' : row.remark) + '" /></td></tr>';
      }).join(''),
      '</tbody></table></div></section>',
      '<section class="inspection-log-section"><div class="inspection-log-section-title">新增设备统计</div><div class="inspection-log-table-wrap"><table class="inspection-log-table inspection-log-table-device"><thead><tr><th>序号</th><th>类别</th><th>建设内容</th><th>单位</th><th>数量</th><th>备注</th></tr></thead><tbody>',
      newDeviceRows.map(function (row, index) {
        return '<tr><td class="inspection-log-cell-center">' + escapeHtml(String(row.index)) + '</td><td>' + escapeHtml(row.category) + '<input type="hidden" name="newCategory-' + index + '" value="' + escapeHtml(row.category) + '" /></td><td>' + escapeHtml(row.content) + '<input type="hidden" name="newContent-' + index + '" value="' + escapeHtml(row.content) + '" /></td><td><input class="inspection-log-table-input inspection-log-cell-center" name="newUnit-' + index + '" value="' + escapeHtml(row.unit === '-' ? '' : row.unit) + '" /></td><td><input class="inspection-log-table-input inspection-log-cell-center" name="newQty-' + index + '" value="' + escapeHtml(row.qty === '-' ? '' : row.qty) + '" /></td><td><input class="inspection-log-table-input" name="newRemark-' + index + '" value="' + escapeHtml(row.remark === '-' ? '' : row.remark) + '" /></td></tr>';
      }).join(''),
      '</tbody></table></div></section>',
      '</form></div></div>',
      '<div class="modal-footer inspection-log-modal-footer"><button type="button" class="btn secondary inspection-log-footer-btn" data-action="' + (type === 'construction' ? 'construction-log-draft' : 'survey-log-draft') + '" data-id="' + escapeHtml(item.id) + '">存草稿</button><button type="button" class="btn primary" data-action="' + (type === 'construction' ? 'construction-log-submit' : 'survey-log-submit') + '" data-id="' + escapeHtml(item.id) + '">提交</button><button type="button" class="btn secondary inspection-log-footer-btn" data-action="' + closeAction + '">取消</button></div>',
      '</div></div>'
    ].join('');
  }

  function appInspectionLogFormFieldHTML(label, name, value, required, options) {
    var attrs = options || {};
    var valueText = value === '-' ? '' : safeText(value);
    if (attrs.options && attrs.options.length) {
      return '<label class="field app-log-fill-field' + (attrs.full ? ' app-log-fill-field-full' : '') + '"><span>' + escapeHtml(label) + (required ? ' <em>*</em>' : '') + '</span><select name="' + name + '">' + attrs.options.map(function (option) {
        return '<option value="' + escapeHtml(option) + '"' + (safeText(valueText) === safeText(option) ? ' selected' : '') + '>' + escapeHtml(option || '请选择') + '</option>';
      }).join('') + '</select></label>';
    }
    if (attrs.multiline) {
      return '<label class="field app-log-fill-field app-log-fill-field-full"><span>' + escapeHtml(label) + (required ? ' <em>*</em>' : '') + '</span><textarea name="' + name + '" placeholder="' + escapeHtml(attrs.placeholder || ('请输入' + label)) + '">' + escapeHtml(valueText) + '</textarea></label>';
    }
    return '<label class="field app-log-fill-field' + (attrs.full ? ' app-log-fill-field-full' : '') + '"><span>' + escapeHtml(label) + (required ? ' <em>*</em>' : '') + '</span><input name="' + name + '" value="' + escapeHtml(valueText) + '" placeholder="' + escapeHtml(attrs.placeholder || ('请输入' + label)) + '" /></label>';
  }

  function appInspectionLogUploadFieldHTML(label, name, value, multiple) {
    var displayText = multiple ? (inspectionParseListText(value).join('、') || '未上传') : (safeText(value).trim() || '未上传');
    return '<div class="field app-log-fill-field app-log-fill-field-full"><span>' + escapeHtml(label) + '</span><div class="app-log-fill-upload"><input type="hidden" name="' + name + '" value="' + escapeHtml(safeText(value)) + '" /><button type="button" class="btn secondary" data-action="inspection-log-upload" data-upload-name="' + name + '" data-upload-multiple="' + (multiple ? '1' : '0') + '">上传</button><div class="app-log-fill-upload-name" data-upload-display="' + name + '">' + escapeHtml(displayText) + '</div></div></div>';
  }

  function appLogModalHeaderHTML(closeAction, subtitle) {
    return '<div class="modal-header app-log-fill-header"><button class="app-log-header-icon app-log-header-back" data-action="' + closeAction + '" aria-label="返回">‹</button><div class="app-log-header-title"><h3>日志详情</h3></div><button class="app-log-header-icon app-log-header-close" data-action="' + closeAction + '" aria-label="关闭">×</button></div>';
  }

  function appInspectionLogFormModalHTML(item, closeAction, formId) {
    var sheet = buildInspectionLogSheetData({ projectName: item.projectName, siteContactName: item.siteContactName, siteContactPhone: item.siteContactPhone, logSheet: inspectionLogSourceSheet(item) }, 'survey');
    var waterRows = sheet.waterSystem || [];
    var newDeviceRows = sheet.newDevices || [];
    return [
      '<div class="modal-mask app-log-fill-mask" data-action="' + closeAction + '"><div class="modal-card app-log-fill-modal" data-stop-close="1">',
      appLogModalHeaderHTML(closeAction, (item.id || '-') + ' · ' + (item.projectName || '-')),
      '<div class="modal-body app-log-fill-body"><form id="' + formId + '" class="app-log-fill-form" autocomplete="off">',
      '<section class="mobile-section app-log-fill-section"><div class="section-title"><h4>基础信息</h4><span>' + escapeHtml(sheet.number) + '</span></div><div class="mobile-cost-detail-card app-log-fill-grid">' +
      appInspectionLogFormFieldHTML('小区名称', 'communityName', sheet.communityInfo.communityName, true) +
      appInspectionLogFormFieldHTML('消控室详细地址', 'address', sheet.communityInfo.address, true, { multiline: true }) +
      appInspectionLogFormFieldHTML('小区楼栋数量', 'buildingCount', sheet.communityInfo.buildingCount, true) +
      appInspectionLogFormFieldHTML('物业单位', 'propertyCompany', sheet.communityInfo.propertyCompany) +
      appInspectionLogFormFieldHTML('物业联系人', 'propertyContact', sheet.communityInfo.propertyContact, true) +
      appInspectionLogFormFieldHTML('联系电话', 'propertyPhone', sheet.communityInfo.propertyPhone, true) +
      appInspectionLogFormFieldHTML('消防维保单位', 'maintenanceCompany', sheet.communityInfo.maintenanceCompany) +
      appInspectionLogFormFieldHTML('维保单位联系人', 'maintenanceContact', sheet.communityInfo.maintenanceContact) +
      appInspectionLogFormFieldHTML('维保联系电话', 'maintenancePhone', sheet.communityInfo.maintenancePhone) +
      appInspectionLogUploadFieldHTML('附件图片上传（最多10张）', 'attachmentImages', sheet.communityInfo.attachmentImages === '-' ? '' : sheet.communityInfo.attachmentImages, true) +
      appInspectionLogUploadFieldHTML('高楼消防码', 'fireCodeImage', sheet.communityInfo.fireCodeImage === '-' ? '' : sheet.communityInfo.fireCodeImage, false) +
      '</div></section>',
      '<section class="mobile-section app-log-fill-section"><div class="section-title"><h4>火灾报警系统</h4><span></span></div><div class="mobile-cost-detail-card app-log-fill-grid">' +
      appInspectionLogFormFieldHTML('主机品牌', 'hostBrand', sheet.fireAlarm.hostBrand, true) +
      appInspectionLogFormFieldHTML('主机型号', 'hostModel', sheet.fireAlarm.hostModel, true) +
      appInspectionLogFormFieldHTML('主机数量', 'hostCount', sheet.fireAlarm.hostCount, true) +
      appInspectionLogFormFieldHTML('主机制造日期', 'manufactureDate', sheet.fireAlarm.manufactureDate) +
      appInspectionLogFormFieldHTML('主机点位数', 'pointCount', sheet.fireAlarm.pointCount, true) +
      appInspectionLogFormFieldHTML('联网详情', 'networkDetail', sheet.fireAlarm.networkDetail, true, { multiline: true }) +
      appInspectionLogFormFieldHTML('控制室宽带情况', 'broadband', sheet.fireAlarm.broadband) +
      appInspectionLogFormFieldHTML('是否有 CRT 数据', 'hasCrtData', sheet.fireAlarm.hasCrtData, false, { options: ['', '是', '否'] }) +
      appInspectionLogFormFieldHTML('是否有 CRT', 'hasCrtDisplay', sheet.fireAlarm.hasCrtDisplay, false, { options: ['', '是', '否'] }) +
      '</div></section>',
      '<section class="mobile-section app-log-fill-section"><div class="section-title"><h4>视频监控系统</h4><span></span></div><div class="mobile-cost-detail-card app-log-fill-grid">' +
      appInspectionLogFormFieldHTML('消防车道数量', 'fireLaneCount', sheet.videoSystem.fireLaneCount) +
      appInspectionLogFormFieldHTML('消防车道位置', 'fireLanePosition', sheet.videoSystem.fireLanePosition, false, { multiline: true }) +
      appInspectionLogFormFieldHTML('消防扑救场地数量', 'rescueSiteCount', sheet.videoSystem.rescueSiteCount) +
      appInspectionLogFormFieldHTML('消防扑救场地位置', 'rescueSitePosition', sheet.videoSystem.rescueSitePosition, false, { multiline: true }) +
      '</div></section>',
      '<section class="mobile-section app-log-fill-section"><div class="section-title"><h4>消防水系统</h4><span>' + waterRows.length + '项</span></div><div class="mobile-cost-detail-grid">' +
      waterRows.map(function (row, index) {
        return '<div class="mobile-cost-detail-row app-log-fill-list-card"><div class="mobile-cost-detail-row-head"><strong>' + escapeHtml(row.name) + '</strong><span>' + (inspectionWaterRowRequired(row.name) ? '必填' : '') + '</span></div><input type="hidden" name="waterName-' + index + '" value="' + escapeHtml(row.name) + '" /><div class="mobile-cost-detail-grid">' +
          appInspectionLogFormFieldHTML('数量', 'waterQty-' + index, row.qty === '-' ? '' : row.qty) +
          appInspectionLogFormFieldHTML('是否有球阀', 'waterValve-' + index, row.valve === '-' ? '' : row.valve, false, { options: ['', '是', '否'] }) +
          appInspectionLogFormFieldHTML('信号有无', 'waterSignal-' + index, row.signal === '-' ? '' : row.signal, false, { options: ['', '有', '无'] }) +
          appInspectionLogFormFieldHTML('位置', 'waterPosition-' + index, row.position === '-' ? '' : row.position) +
          appInspectionLogFormFieldHTML('备注', 'waterRemark-' + index, row.remark === '-' ? '' : row.remark, false, { multiline: true }) +
        '</div></div>';
      }).join('') + '</div></section>',
      '<section class="mobile-section app-log-fill-section"><div class="section-title"><h4>新增设备统计</h4><span>' + newDeviceRows.length + '项</span></div><div class="mobile-cost-detail-grid">' +
      newDeviceRows.map(function (row, index) {
        return '<div class="mobile-cost-detail-row app-log-fill-list-card"><div class="mobile-cost-detail-row-head"><strong>' + escapeHtml(String(row.index) + '. ' + row.content) + '</strong><span>' + escapeHtml(row.category) + '</span></div><input type="hidden" name="newCategory-' + index + '" value="' + escapeHtml(row.category) + '" /><input type="hidden" name="newContent-' + index + '" value="' + escapeHtml(row.content) + '" /><div class="mobile-cost-detail-grid">' +
          appInspectionLogFormFieldHTML('单位', 'newUnit-' + index, row.unit === '-' ? '' : row.unit) +
          appInspectionLogFormFieldHTML('数量', 'newQty-' + index, row.qty === '-' ? '' : row.qty) +
          appInspectionLogFormFieldHTML('备注', 'newRemark-' + index, row.remark === '-' ? '' : row.remark, false, { multiline: true }) +
        '</div></div>';
      }).join('') + '</div></section>',
      '</form></div>',
      '<div class="modal-footer app-log-fill-footer"><button type="button" class="btn secondary" data-action="survey-log-draft" data-id="' + escapeHtml(item.id) + '">存草稿</button><button type="button" class="btn primary" data-action="survey-log-submit" data-id="' + escapeHtml(item.id) + '">提交</button><button type="button" class="btn secondary" data-action="' + closeAction + '">取消</button></div>',
      '</div></div>'
    ].join('');
  }

  function inspectionParseListText(text) {
    var value = safeText(text).trim();
    if (!value) return [];
    return value.split(/[、,，;；\n]/).map(function (item) { return item.trim(); }).filter(Boolean).slice(0, 10);
  }

  function inspectionLogPayloadFromForm(formData, type, existingItem) {
    if (type === 'construction') {
      var itemCount = Number(formData.get('constructionItemCount') || 0);
      var existingSheet = Object.assign({}, existingItem.logSheet || existingItem.logSheetDraft || {});
      existingSheet.number = existingSheet.number || existingItem.id || '';
      existingSheet.title = existingSheet.title || '城投标信 - 数字消防现场踏勘记录表';
      existingSheet.constructionItems = Array.from({ length: itemCount }).map(function (_, index) {
        return {
          name: safeText(formData.get('constructionName-' + index)).trim(),
          deviceCode: safeText(formData.get('constructionDeviceCode-' + index)).trim(),
          deviceName: safeText(formData.get('constructionDeviceName-' + index)).trim(),
          deviceBrand: safeText(formData.get('constructionDeviceBrand-' + index)).trim(),
          deviceModel: safeText(formData.get('constructionDeviceModel-' + index)).trim(),
          building: safeText(formData.get('constructionBuilding-' + index)).trim(),
          floor: safeText(formData.get('constructionFloor-' + index)).trim(),
          position: safeText(formData.get('constructionPosition-' + index)).trim(),
          images: inspectionParseListText(formData.get('constructionImages-' + index)).slice(0, 3)
        };
      });
      existingSheet.constructionRemark = safeText(formData.get('constructionRemark')).trim();
      return existingSheet;
    }
    var waterRows = inspectionWaterRows().map(function (row, index) {
      var name = row.name;
      return {
        name: name,
        qty: safeText(formData.get('waterQty-' + index)).trim(),
        valve: safeText(formData.get('waterValve-' + index)).trim(),
        signal: safeText(formData.get('waterSignal-' + index)).trim(),
        position: safeText(formData.get('waterPosition-' + index)).trim(),
        remark: safeText(formData.get('waterRemark-' + index)).trim()
      };
    });
    var newDeviceNames = ['用户信息传输装置', '一体式压力传感器', '一体式液位传感器', '离岗检测摄像机', '消防通道监测摄像机', '电气火灾报警器', '网络服务（宽带）', '挂箱', '交换机', '电源线', '网线'];
    var newDevices = newDeviceNames.map(function (_, index) {
      return {
        category: safeText(formData.get('newCategory-' + index)).trim(),
        content: safeText(formData.get('newContent-' + index)).trim(),
        unit: safeText(formData.get('newUnit-' + index)).trim(),
        qty: safeText(formData.get('newQty-' + index)).trim(),
        remark: safeText(formData.get('newRemark-' + index)).trim()
      };
    });
    return {
      number: (existingItem.logSheet && existingItem.logSheet.number) || (existingItem.logSheetDraft && existingItem.logSheetDraft.number) || existingItem.id || '',
      title: '城投标信 - 数字消防现场踏勘记录表',
      communityInfo: {
        communityName: safeText(formData.get('communityName')).trim(),
        address: safeText(formData.get('address')).trim(),
        buildingCount: safeText(formData.get('buildingCount')).trim(),
        propertyCompany: safeText(formData.get('propertyCompany')).trim(),
        propertyContact: safeText(formData.get('propertyContact')).trim(),
        propertyPhone: safeText(formData.get('propertyPhone')).trim(),
        maintenanceCompany: safeText(formData.get('maintenanceCompany')).trim(),
        maintenanceContact: safeText(formData.get('maintenanceContact')).trim(),
        maintenancePhone: safeText(formData.get('maintenancePhone')).trim(),
        attachmentImages: type === 'survey' ? inspectionParseListText(formData.get('attachmentImages')) : [],
        fireCodeImage: type === 'survey' ? safeText(formData.get('fireCodeImage')).trim() : ''
      },
      fireAlarm: {
        hostBrand: safeText(formData.get('hostBrand')).trim(),
        hostModel: safeText(formData.get('hostModel')).trim(),
        hostCount: safeText(formData.get('hostCount')).trim(),
        manufactureDate: safeText(formData.get('manufactureDate')).trim(),
        pointCount: safeText(formData.get('pointCount')).trim(),
        networkDetail: safeText(formData.get('networkDetail')).trim(),
        broadband: safeText(formData.get('broadband')).trim(),
        hasCrtData: safeText(formData.get('hasCrtData')).trim(),
        hasCrtDisplay: safeText(formData.get('hasCrtDisplay')).trim()
      },
      videoSystem: {
        fireLaneCount: safeText(formData.get('fireLaneCount')).trim(),
        fireLanePosition: safeText(formData.get('fireLanePosition')).trim(),
        rescueSiteCount: safeText(formData.get('rescueSiteCount')).trim(),
        rescueSitePosition: safeText(formData.get('rescueSitePosition')).trim()
      },
      waterSystem: waterRows,
      newDevices: newDevices
    };
  }

  function saveInspectionLog(type, id, formData, submitMode) {
    var state = type === 'construction' ? getConstructionWorkorderState() : getSurveyWorkorderState();
    var item = findWorkorderByType(type, id);
    if (!item) return;
    var payload = inspectionLogPayloadFromForm(formData, type, item);
    if (submitMode === 'submit') {
      if (type === 'construction') {
        if (!(payload.constructionItems || []).length || payload.constructionItems.some(function (row) { return !safeText(row.name).trim() || !safeText(row.deviceCode).trim(); })) {
          window.alert('请完成施工项名称和设备后再提交日志。');
          return;
        }
      } else {
        var requiredValues = [
          payload.communityInfo.communityName,
          payload.communityInfo.address,
          payload.communityInfo.buildingCount,
          payload.communityInfo.propertyContact,
          payload.communityInfo.propertyPhone,
          payload.fireAlarm.hostBrand,
          payload.fireAlarm.hostModel,
          payload.fireAlarm.hostCount,
          payload.fireAlarm.pointCount,
          payload.fireAlarm.networkDetail
        ];
        if (requiredValues.some(function (value) { return !safeText(value).trim(); })) {
          window.alert('请填写必填项后再提交日志。');
          return;
        }
      }
    }
    var now = type === 'construction' ? '2026-04-14 15:10' : '2026-04-14 14:30';
    state.list = state.list.map(function (row) {
      if (row.id !== id) return row;
      var update = submitMode === 'submit'
        ? { logSheet: payload, logSheetDraft: null, logs: (row.logs || []).concat([{ time: now, operator: currentUserName(), content: '提交' + (type === 'construction' ? '施工' : '工勘') + '日志。' }]) }
        : { logSheetDraft: payload, logs: (row.logs || []).concat([{ time: now, operator: currentUserName(), content: '保存' + (type === 'construction' ? '施工' : '工勘') + '日志草稿。' }]) };
      return Object.assign({}, row, update);
    });
    state.modal = null;
    render();
  }

  function surveyWorkorderModalHTML() {
    var modal = getSurveyWorkorderState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view' || modal.mode === 'log';
    var title = modal.mode === 'create' ? '新建工勘工单' : modal.mode === 'edit' ? '编辑工勘工单' : modal.mode === 'log' ? '工勘日志' : '工勘工单详情';
    var projectOptions = mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) {
      return { value: project.id, label: project.name };
    }), item.projectId || '', '请选择项目');
    if (modal.mode === 'log') {
      if (getRoute().indexOf('/app/') === 0) {
        return '<div class="modal-mask app-log-fill-mask" data-action="survey-modal-close"><div class="modal-card app-log-fill-modal app-log-view-modal" data-stop-close="1">' + appLogModalHeaderHTML('survey-modal-close', (item.id || '-') + ' · ' + (item.projectName || '-')) + '<div class="modal-body app-log-fill-body">' + inspectionLogSheetHTML(item, 'survey') + '</div><div class="modal-footer app-log-fill-footer"><button type="button" class="btn secondary" data-action="survey-modal-close">关闭</button></div></div></div>';
      }
      return '<div class="modal-mask" data-action="survey-modal-close"><div class="modal-card customer-modal inspection-log-modal" data-stop-close="1"><div class="modal-header inspection-log-modal-header"><div><h3>' + title + '</h3></div><button class="icon-btn inspection-log-close-btn" data-action="survey-modal-close">×</button></div><div class="modal-body inspection-log-modal-body">' + inspectionLogSheetHTML(item, 'survey') + '</div><div class="modal-footer inspection-log-modal-footer"><button type="button" class="btn secondary inspection-log-footer-btn" data-action="survey-modal-close">关闭</button></div></div></div>';
    }
    if (modal.mode === 'logFill') {
      return inspectionLogFormModalHTML(item, 'survey', 'survey-modal-close', 'survey-log-form');
    }
    function contactInput(name, value, placeholder) {
      return '<input name="' + name + '" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(value || '') + '" placeholder="' + escapeHtml(placeholder || '') + '" />';
    }
    return [
      '<div class="modal-mask" data-action="survey-modal-close">',
      '<div class="modal-card customer-modal survey-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>用于现场勘查任务派发、执行跟踪和日志沉淀</p></div><button class="icon-btn" data-action="survey-modal-close">×</button></div>',
      '<form id="survey-form" class="modal-body">',
      '<div class="modal-grid modal-grid-2 compact-form-grid">',
      '<label class="field modal-field"><span>工单编号</span><input disabled value="' + escapeHtml(item.id || '系统自动生成') + '" /></label>',
      '<label class="field modal-field"><span>所属项目 <em>*</em></span><select name="projectId" ' + (readOnly ? 'disabled ' : '') + '>' + projectOptions + '</select></label>',
      '<label class="field modal-field"><span>工勘人员 <em>*</em></span><select name="surveyor" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(data.surveyWorkorderOptions.surveyors, item.surveyor, '请选择工勘人员') + '</select></label>',
      '<label class="field modal-field"><span>计划工勘日期 <em>*</em></span><input type="date" name="planDate" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.planDate || '') + '" /></label>',
      '<label class="field modal-field"><span>创建时间</span><input disabled value="' + escapeHtml(item.createTime || '保存后生成') + '" /></label>',
      '<label class="field modal-field"><span>创建人</span><input disabled value="' + escapeHtml(item.creator || '系统管理员') + '" /></label>',
      '<div class="modal-section field-span-2"><h4>现场联系人</h4><div class="survey-contact-block"><div class="survey-contact-head"><span>姓名</span><span>职务</span><span>手机号</span><span>操作</span></div><div class="survey-contact-row">' +
      contactInput('siteContactName', item.siteContactName, '请输入姓名') +
      contactInput('siteContactTitle', item.siteContactTitle, '请输入职务') +
      contactInput('siteContactPhone', item.siteContactPhone, '请输入手机号') +
      '<button type="button" class="btn primary survey-contact-add-btn" ' + (readOnly ? 'disabled' : '') + '>＋</button>' +
      '</div></div></div>',
      '<div class="modal-section field-span-2"><h4>图片附件</h4><div class="survey-upload-block"><button type="button" class="survey-upload-box" ' + (readOnly ? 'disabled' : '') + '><span>⇪</span><label>上传</label></button>' + (item.imageAttachmentName ? '<div class="survey-upload-name">' + escapeHtml(item.imageAttachmentName) + '</div>' : '') + '</div></div>',
      '<label class="field modal-field field-span-2"><span>备注</span><textarea name="remark" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea></label>',
      '</div>',
      '<div class="modal-footer">' +
      (readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="survey-modal-close">关闭</button>' +
      '</div></form></div></div>'
    ].join('');
  }

  function surveyWorkorderPageHTML() {
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">项目管理</div><h2>工勘工单</h2><p>面向工程现场勘查任务派发与执行跟踪，突出进场勘查、现场日志和超期识别。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="survey-create">新建工勘工单</button></div></div>',
      surveyWorkorderFiltersHTML(),
      surveyWorkorderTableHTML(),
      surveyWorkorderModalHTML()
    ].join('');
  }

  function constructionWorkorderFiltersHTML() {
    var filters = getConstructionWorkorderState().filters;
    var projectOptions = mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) {
      return { value: project.id, label: project.name };
    }), filters.projectId, '请选择项目');
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid survey-filter-grid">',
      '<label class="field"><span>工单编号</span><input data-construction-filter="id" value="' + escapeHtml(filters.id) + '" placeholder="请输入工单编号" /></label>',
      '<label class="field"><span>项目</span><select data-construction-filter="projectId">' + projectOptions + '</select></label>',
      '<label class="field"><span>施工人员</span><select data-construction-filter="worker">' + optionHTML(data.constructionWorkorderOptions.workers, filters.worker, '全部施工人员') + '</select></label>',
      '<label class="field"><span>计划施工日期</span><input type="date" data-construction-filter="planDate" value="' + escapeHtml(filters.planDate) + '" /></label>',
      '<div class="filter-actions"><button class="btn secondary" data-action="construction-reset">重置</button><button class="btn primary" data-action="construction-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function constructionWorkorderTableHTML() {
    var rows = getFilteredConstructionWorkorders();
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>施工工单列表</h3><p>共 ' + rows.length + ' 条施工工单，支持施工日志查看与超期识别</p></div></div>',
      '<table class="data-table customer-table"><thead><tr>',
      '<th>工单编号</th><th>所属项目</th><th>施工人员</th><th>创建时间</th><th>创建人</th><th>状态</th><th>是否超期</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr class="' + (item.overdue ? 'row-overdue' : '') + '">' +
          '<td><strong class="table-main">' + escapeHtml(item.id) + '</strong></td>' +
          '<td><button class="text-link" data-action="construction-view" data-id="' + item.id + '">' + escapeHtml(item.projectName) + '</button></td>' +
          '<td>' + escapeHtml(item.worker) + '</td>' +
          '<td>' + escapeHtml(item.createTime) + '</td>' +
          '<td>' + escapeHtml(item.creator) + '</td>' +
          '<td><span class="status ' + (item.status === '已完成' ? 'success' : item.status === '已撤销' ? 'danger' : 'warning') + '">' + escapeHtml(item.status) + '</span></td>' +
          '<td>' + (item.overdue ? '<span class="status danger">已超期</span>' : '<span class="status success">正常</span>') + '</td>' +
          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="construction-view" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="construction-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn danger-link" data-action="construction-revoke" data-id="' + item.id + '">撤销</button>' +
          '<button class="link-btn danger-link" data-action="construction-delete" data-id="' + item.id + '">删除</button>' +
          '</div></td>' +
        '</tr>';
      }).join('') || '<tr><td colspan="8"><div class="empty-state">未查询到符合条件的施工工单</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function constructionWorkorderModalHTML() {
    var modal = getConstructionWorkorderState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view' || modal.mode === 'log';
    var title = modal.mode === 'create' ? '新建施工工单' : modal.mode === 'edit' ? '编辑施工工单' : modal.mode === 'log' ? '施工日志' : '施工工单详情';
    var projectOptions = mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) {
      return { value: project.id, label: project.name };
    }), item.projectId || '', '请选择项目');
    if (modal.mode === 'log') {
      if (getRoute().indexOf('/app/') === 0) {
        return '<div class="modal-mask app-log-fill-mask" data-action="construction-modal-close"><div class="modal-card app-log-fill-modal app-log-view-modal" data-stop-close="1">' + appLogModalHeaderHTML('construction-modal-close', (item.id || '-') + ' · ' + (item.projectName || '-')) + '<div class="modal-body app-log-fill-body">' + inspectionLogSheetHTML(item, 'construction') + '</div><div class="modal-footer app-log-fill-footer"><button type="button" class="btn secondary" data-action="construction-modal-close">关闭</button></div></div></div>';
      }
      return '<div class="modal-mask" data-action="construction-modal-close"><div class="modal-card customer-modal inspection-log-modal" data-stop-close="1"><div class="modal-header inspection-log-modal-header"><div><h3>' + title + '</h3></div><button class="icon-btn inspection-log-close-btn" data-action="construction-modal-close">×</button></div><div class="modal-body inspection-log-modal-body">' + inspectionLogSheetHTML(item, 'construction') + '</div><div class="modal-footer inspection-log-modal-footer"><button type="button" class="btn secondary inspection-log-footer-btn" data-action="construction-modal-close">关闭</button></div></div></div>';
    }
    if (modal.mode === 'logFill') {
      return inspectionLogFormModalHTML(item, 'construction', 'construction-modal-close', 'construction-log-form');
    }
    function contactInput(name, value, placeholder) {
      return '<input name="' + name + '" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(value || '') + '" placeholder="' + escapeHtml(placeholder || '') + '" />';
    }
    return [
      '<div class="modal-mask" data-action="construction-modal-close">',
      '<div class="modal-card customer-modal survey-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>用于施工任务派发、现场执行跟踪和施工日志沉淀</p></div><button class="icon-btn" data-action="construction-modal-close">×</button></div>',
      '<form id="construction-form" class="modal-body">',
      '<div class="modal-grid modal-grid-2 compact-form-grid">',
      '<label class="field modal-field"><span>工单编号</span><input disabled value="' + escapeHtml(item.id || '系统自动生成') + '" /></label>',
      '<label class="field modal-field"><span>所属项目 <em>*</em></span><select name="projectId" ' + (readOnly ? 'disabled ' : '') + '>' + projectOptions + '</select></label>',
      '<label class="field modal-field"><span>施工人员 <em>*</em></span><select name="worker" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(data.constructionWorkorderOptions.workers, item.worker, '请选择施工人员') + '</select></label>',
      '<label class="field modal-field"><span>计划施工日期 <em>*</em></span><input type="date" name="planDate" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.planDate || '') + '" /></label>',
      '<label class="field modal-field"><span>创建时间</span><input disabled value="' + escapeHtml(item.createTime || '保存后生成') + '" /></label>',
      '<label class="field modal-field"><span>创建人</span><input disabled value="' + escapeHtml(item.creator || '系统管理员') + '" /></label>',
      '<div class="modal-section field-span-2"><h4>现场联系人</h4><div class="survey-contact-block"><div class="survey-contact-head"><span>姓名</span><span>职务</span><span>手机号</span><span>操作</span></div><div class="survey-contact-row">' +
      contactInput('siteContactName', item.siteContactName, '请输入姓名') +
      contactInput('siteContactTitle', item.siteContactTitle, '请输入职务') +
      contactInput('siteContactPhone', item.siteContactPhone, '请输入手机号') +
      '<button type="button" class="btn primary survey-contact-add-btn" ' + (readOnly ? 'disabled' : '') + '>＋</button>' +
      '</div></div></div>',
      '<div class="modal-section field-span-2"><h4>图片附件</h4><div class="survey-upload-block"><button type="button" class="survey-upload-box" ' + (readOnly ? 'disabled' : '') + '><span>⇪</span><label>上传</label></button>' + (item.imageAttachmentName ? '<div class="survey-upload-name">' + escapeHtml(item.imageAttachmentName) + '</div>' : '') + '</div></div>',
      '<label class="field modal-field field-span-2"><span>备注</span><textarea name="remark" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea></label>',
      '</div>',
      '<div class="modal-footer">' +
      (readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="construction-modal-close">关闭</button>' +
      '</div></form></div></div>'
    ].join('');
  }

  function constructionWorkorderPageHTML() {
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">项目管理</div><h2>施工工单</h2><p>面向施工现场执行任务派发与过程跟踪，突出现场施工、进度推进和超期识别。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="construction-create">新建施工工单</button></div></div>',
      constructionWorkorderFiltersHTML(),
      constructionWorkorderTableHTML(),
      constructionWorkorderModalHTML()
    ].join('');
  }

  function maintenanceWorkorderFiltersHTML() {
    var filters = getMaintenanceWorkorderState().filters;
    var projectOptions = mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) {
      return { value: project.id, label: project.name };
    }), filters.projectId, '请选择项目');
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid survey-filter-grid">',
      '<label class="field"><span>工单编号</span><input data-maintenance-filter="id" value="' + escapeHtml(filters.id) + '" placeholder="请输入工单编号" /></label>',
      '<label class="field"><span>项目</span><select data-maintenance-filter="projectId">' + projectOptions + '</select></label>',
      '<label class="field"><span>运维人员</span><select data-maintenance-filter="worker">' + optionHTML(data.maintenanceWorkorderOptions.workers, filters.worker, '全部运维人员') + '</select></label>',
      '<label class="field"><span>计划运维日期</span><input type="date" data-maintenance-filter="planDate" value="' + escapeHtml(filters.planDate) + '" /></label>',
      '<div class="filter-actions"><button class="btn secondary" data-action="maintenance-reset">重置</button><button class="btn primary" data-action="maintenance-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function maintenanceWorkorderTableHTML() {
    var rows = getFilteredMaintenanceWorkorders();
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>运维工单列表</h3><p>共 ' + rows.length + ' 条运维工单，支持现场日志查看与超期识别</p></div></div>',
      '<table class="data-table customer-table"><thead><tr>',
      '<th>工单编号</th><th>所属项目</th><th>运维人员</th><th>创建时间</th><th>创建人</th><th>状态</th><th>是否超期</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr class="' + (item.overdue ? 'row-overdue' : '') + '">' +
          '<td><strong class="table-main">' + escapeHtml(item.id) + '</strong></td>' +
          '<td><button class="text-link" data-action="maintenance-view" data-id="' + item.id + '">' + escapeHtml(item.projectName) + '</button></td>' +
          '<td>' + escapeHtml(item.worker) + '</td>' +
          '<td>' + escapeHtml(item.createTime) + '</td>' +
          '<td>' + escapeHtml(item.creator) + '</td>' +
          '<td><span class="status ' + (item.status === '已完成' ? 'success' : item.status === '已撤销' ? 'danger' : 'warning') + '">' + escapeHtml(item.status) + '</span></td>' +
          '<td>' + (item.overdue ? '<span class="status danger">已超期</span>' : '<span class="status success">正常</span>') + '</td>' +
          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="maintenance-view" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="maintenance-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn danger-link" data-action="maintenance-revoke" data-id="' + item.id + '">撤销</button>' +
          '<button class="link-btn danger-link" data-action="maintenance-delete" data-id="' + item.id + '">删除</button>' +
          '</div></td>' +
        '</tr>';
      }).join('') || '<tr><td colspan="8"><div class="empty-state">未查询到符合条件的运维工单</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function maintenanceWorkorderModalHTML() {
    var modal = getMaintenanceWorkorderState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view' || modal.mode === 'log';
    var title = modal.mode === 'create' ? '新建运维工单' : modal.mode === 'edit' ? '编辑运维工单' : modal.mode === 'log' ? '运维日志' : '运维工单详情';
    var projectOptions = mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) {
      return { value: project.id, label: project.name };
    }), item.projectId || '', '请选择项目');
    if (modal.mode === 'log') {
      return '<div class="modal-mask" data-action="maintenance-modal-close"><div class="modal-card customer-modal" data-stop-close="1"><div class="modal-header"><div><h3>' + title + '</h3><p>' + escapeHtml(item.id || '') + ' · ' + escapeHtml(item.projectName || '') + '</p></div><button class="icon-btn" data-action="maintenance-modal-close">×</button></div><div class="modal-body">' + surveyLogHTML(item.logs) + '</div><div class="modal-footer"><button type="button" class="btn secondary" data-action="maintenance-modal-close">关闭</button></div></div></div>';
    }
    function contactInput(name, value, placeholder) {
      return '<input name="' + name + '" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(value || '') + '" placeholder="' + escapeHtml(placeholder || '') + '" />';
    }
    return [
      '<div class="modal-mask" data-action="maintenance-modal-close">',
      '<div class="modal-card customer-modal survey-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>用于运维抢修、故障处理和现场处置跟踪</p></div><button class="icon-btn" data-action="maintenance-modal-close">×</button></div>',
      '<form id="maintenance-form" class="modal-body">',
      '<div class="modal-grid modal-grid-2 compact-form-grid">',
      '<label class="field modal-field"><span>工单编号</span><input disabled value="' + escapeHtml(item.id || '系统自动生成') + '" /></label>',
      '<label class="field modal-field"><span>所属项目 <em>*</em></span><select name="projectId" ' + (readOnly ? 'disabled ' : '') + '>' + projectOptions + '</select></label>',
      '<label class="field modal-field"><span>运维人员 <em>*</em></span><select name="worker" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(data.maintenanceWorkorderOptions.workers, item.worker, '请选择运维人员') + '</select></label>',
      '<label class="field modal-field"><span>计划运维日期 <em>*</em></span><input type="date" name="planDate" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.planDate || '') + '" /></label>',
      '<label class="field modal-field field-span-2"><span>故障描述 ' + (readOnly ? '' : '<em>*</em>') + '</span><textarea name="faultDesc" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入故障描述、现场现象及处置要求">' + escapeHtml(item.faultDesc || '') + '</textarea></label>',
      '<label class="field modal-field"><span>紧急程度</span><select name="priority" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(data.maintenanceWorkorderOptions.priorities, item.priority, '请选择紧急程度') + '</select></label>',
      '<label class="field modal-field"><span>创建人</span><input disabled value="' + escapeHtml(item.creator || '系统管理员') + '" /></label>',
      '<div class="modal-section field-span-2"><h4>现场联系人</h4><div class="survey-contact-block"><div class="survey-contact-head"><span>姓名</span><span>职务</span><span>手机号</span><span>操作</span></div><div class="survey-contact-row">' +
      contactInput('siteContactName', item.siteContactName, '请输入姓名') +
      contactInput('siteContactTitle', item.siteContactTitle, '请输入职务') +
      contactInput('siteContactPhone', item.siteContactPhone, '请输入手机号') +
      '<button type="button" class="btn primary survey-contact-add-btn" ' + (readOnly ? 'disabled' : '') + '>＋</button>' +
      '</div></div></div>',
      '<div class="modal-section field-span-2"><h4>图片附件</h4><div class="survey-upload-block"><button type="button" class="survey-upload-box" ' + (readOnly ? 'disabled' : '') + '><span>⇪</span><label>上传</label></button>' + (item.imageAttachmentName ? '<div class="survey-upload-name">' + escapeHtml(item.imageAttachmentName) + '</div>' : '') + '</div></div>',
      '<label class="field modal-field field-span-2"><span>备注</span><textarea name="remark" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea></label>',
      '</div>',
      '<div class="modal-footer">' +
      (readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="maintenance-modal-close">关闭</button>' +
      '</div></form></div></div>'
    ].join('');
  }

  function maintenanceWorkorderPageHTML() {
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">项目管理</div><h2>运维工单</h2><p>面向运维现场故障排查与处置，突出故障描述、紧急程度和超期识别。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="maintenance-create">新建运维工单</button></div></div>',
      maintenanceWorkorderFiltersHTML(),
      maintenanceWorkorderTableHTML(),
      maintenanceWorkorderModalHTML()
    ].join('');
  }

  function salespersonFiltersHTML() {
    var filters = getSalespersonState().filters;
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid sales-filter-grid">',
      '<label class="field"><span>姓名</span><input data-sales-filter="name" value="' + escapeHtml(filters.name) + '" placeholder="请输入姓名" /></label>',
      '<label class="field"><span>手机号</span><input data-sales-filter="phone" value="' + escapeHtml(filters.phone) + '" placeholder="请输入手机号" /></label>',
      '<label class="field"><span>销售团队</span><select data-sales-filter="team">' + optionHTML(data.salespersonOptions.teams, filters.team, '全部团队') + '</select></label>',
      '<label class="field"><span>状态</span><select data-sales-filter="status">' + optionHTML(data.salespersonOptions.statuses, filters.status, '全部状态') + '</select></label>',
      '<div class="filter-actions"><button class="btn secondary" data-action="sales-reset">重置</button><button class="btn primary" data-action="sales-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function salespersonTableHTML() {
    var rows = getFilteredSalespersons();
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>销售人员列表</h3><p>共 ' + rows.length + ' 名销售人员，支持团队绑定和关联跟进记录查看</p></div></div>',
      '<table class="data-table customer-table"><thead><tr>',
      '<th>姓名</th><th>手机号</th><th>所属团队</th><th>状态</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr>' +
          '<td><button class="text-link" data-action="sales-view" data-id="' + item.id + '">' + escapeHtml(item.name) + '</button></td>' +
          '<td>' + escapeHtml(item.phone) + '</td>' +
          '<td>' + escapeHtml(item.team) + '</td>' +
          '<td><span class="status ' + (item.status === '启用' ? 'success' : 'danger') + '">' + escapeHtml(item.status) + '</span></td>' +
          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="sales-view" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="sales-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn danger-link" data-action="sales-delete" data-id="' + item.id + '">删除</button>' +
          '<button class="link-btn" data-action="sales-follow" data-id="' + item.id + '">关联跟进记录</button>' +
          '</div></td>' +
        '</tr>';
      }).join('') || '<tr><td colspan="5"><div class="empty-state">未查询到符合条件的销售人员</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function salespersonModalHTML() {
    var modal = getSalespersonState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'create' ? '新增销售人员' : modal.mode === 'edit' ? '编辑销售人员' : '销售人员详情';
    return [
      '<div class="modal-mask" data-action="sales-modal-close">',
      '<div class="modal-card customer-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>维护销售人员基础资料、所属团队及业务归属</p></div><button class="icon-btn" data-action="sales-modal-close">×</button></div>',
      '<form id="sales-form" class="modal-body">',
      '<div class="modal-grid modal-grid-2">',
      '<label class="field modal-field"><span>姓名 <em>*</em></span><input name="name" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.name || '') + '" placeholder="请输入姓名" /></label>',
      '<label class="field modal-field"><span>手机号 <em>*</em></span><input name="phone" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.phone || '') + '" placeholder="请输入手机号" /></label>',
      '<label class="field modal-field"><span>所属团队 <em>*</em></span><select name="team" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(data.salespersonOptions.teams, item.team, '请选择销售团队') + '</select></label>',
      '<label class="field modal-field"><span>状态</span><select name="status" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(data.salespersonOptions.statuses, item.status, '请选择状态') + '</select></label>',
      '</div>',
      '<div class="modal-footer">' +
      (readOnly ? '<button type="button" class="btn secondary" data-action="sales-follow" data-id="' + item.id + '">关联跟进记录</button>' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="sales-modal-close">关闭</button>' +
      '</div></form></div></div>'
    ].join('');
  }

  function salespersonPageHTML() {
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">营销管理</div><h2>销售人员</h2><p>统一维护销售人员基础信息、团队归属与跟进业务入口，支撑客户销售过程管理。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="sales-create">新增销售人员</button></div></div>',
      salespersonFiltersHTML(),
      salespersonTableHTML(),
      salespersonModalHTML()
    ].join('');
  }

  function salesTeamFiltersHTML() {
    var filters = getSalesTeamState().filters;
    var ownerOptions = mappedOptionHTML(getSalespersonState().list.map(function (item) {
      return { value: item.name, label: item.name };
    }), filters.ownerName, '全部负责人');
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid team-filter-grid">',
      '<label class="field"><span>团队名称</span><input data-team-filter="name" value="' + escapeHtml(filters.name) + '" placeholder="请输入团队名称" /></label>',
      '<label class="field"><span>负责人</span><select data-team-filter="ownerName">' + ownerOptions + '</select></label>',
      '<label class="field"><span>状态</span><select data-team-filter="status">' + optionHTML(data.salesTeamOptions.statuses, filters.status, '全部状态') + '</select></label>',
      '<div class="filter-actions"><button class="btn secondary" data-action="team-reset">重置</button><button class="btn primary" data-action="team-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function renderTeamMembers(team) {
    return (team.memberIds || []).map(function (memberId) {
      var member = findSales(memberId);
      if (!member) return '';
      return '<div class="member-chip"><span>' + escapeHtml(member.name) + ' · ' + escapeHtml(member.title || '销售') + '</span><button class="mini-btn" data-action="team-remove-member" data-id="' + team.id + '" data-member-id="' + member.id + '">移除</button></div>';
    }).join('') || '<div class="empty-state">暂无团队成员</div>';
  }

  function salesTeamTableHTML() {
    var rows = getFilteredSalesTeams();
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>销售团队列表</h3><p>共 ' + rows.length + ' 个销售团队，支持负责人绑定、成员管理和团队跟进查看</p></div></div>',
      '<table class="data-table customer-table"><thead><tr>',
      '<th>团队名称</th><th>负责人</th><th>状态</th><th>描述</th><th>创建时间</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr>' +
          '<td><button class="text-link" data-action="team-view" data-id="' + item.id + '">' + escapeHtml(item.name) + '</button></td>' +
          '<td>' + escapeHtml(item.ownerName || '-') + '</td>' +
          '<td><span class="status ' + (item.status === '启用' ? 'success' : 'danger') + '">' + escapeHtml(item.status) + '</span></td>' +
          '<td>' + escapeHtml(item.desc || '-') + '</td>' +
          '<td>' + escapeHtml(item.createTime || '-') + '</td>' +
          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="team-view" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="team-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn danger-link" data-action="team-delete" data-id="' + item.id + '">删除</button>' +
          '<button class="link-btn" data-action="team-follow" data-id="' + item.id + '">团队跟进记录</button>' +
          '</div></td>' +
        '</tr>';
      }).join('') || '<tr><td colspan="6"><div class="empty-state">未查询到符合条件的销售团队</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function salesTeamModalHTML() {
    var modal = getSalesTeamState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'create' ? '新增销售团队' : modal.mode === 'edit' ? '编辑销售团队' : '销售团队详情';
    var salesOptions = mappedOptionHTML(getSalespersonState().list.map(function (person) {
      return { value: person.id, label: person.name + ' · ' + (person.team || '未分组') };
    }), '', '请选择成员');
    return [
      '<div class="modal-mask" data-action="team-modal-close">',
      '<div class="modal-card customer-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>维护销售团队组织信息、负责人绑定及成员管理</p></div><button class="icon-btn" data-action="team-modal-close">×</button></div>',
      '<form id="team-form" class="modal-body">',
      '<div class="modal-grid modal-grid-2">',
      '<label class="field modal-field"><span>团队名称 <em>*</em></span><input name="name" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.name || '') + '" placeholder="请输入团队名称" /></label>',
      '<label class="field modal-field"><span>负责人 <em>*</em></span><select name="ownerId" ' + (readOnly ? 'disabled ' : '') + '>' + mappedOptionHTML(getSalespersonState().list.map(function (person) { return { value: person.id, label: person.name }; }), item.ownerId || '', '请选择负责人') + '</select></label>',
      '<label class="field modal-field"><span>状态</span><select name="status" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(data.salesTeamOptions.statuses, item.status, '请选择状态') + '</select></label>',
      '<label class="field modal-field"><span>创建时间</span><input disabled value="' + escapeHtml(item.createTime || '保存后生成') + '" /></label>',
      '<label class="field modal-field field-span-2"><span>描述</span><textarea name="desc" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入团队职责描述">' + escapeHtml(item.desc || '') + '</textarea></label>',
      '</div>',
      '<div class="modal-section"><h4>团队成员</h4><div class="member-list">' + renderTeamMembers(item) + '</div>' +
      (readOnly ? '' : '<div class="member-action-bar"><select name="memberToAdd">' + salesOptions + '</select><button type="button" class="btn secondary" data-action="team-add-member" data-id="' + (item.id || '') + '">绑定成员</button></div>') +
      '</div>',
      '<div class="modal-footer">' +
      (readOnly ? '<button type="button" class="btn secondary" data-action="team-follow" data-id="' + item.id + '">团队跟进记录</button>' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="team-modal-close">关闭</button>' +
      '</div></form></div></div>'
    ].join('');
  }

  function salesTeamPageHTML() {
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">营销管理</div><h2>销售团队</h2><p>统一维护销售团队组织信息、负责人及成员结构，支撑团队维度客户跟进与业务协同。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="team-create">新增团队</button></div></div>',
      salesTeamFiltersHTML(),
      salesTeamTableHTML(),
      salesTeamModalHTML()
    ].join('');
  }

  function engineerFiltersHTML() {
    var filters = getEngineerState().filters;
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid sales-filter-grid">',
      '<label class="field"><span>姓名</span><input data-engineer-filter="name" value="' + escapeHtml(filters.name) + '" placeholder="请输入姓名" /></label>',
      '<label class="field"><span>手机号</span><input data-engineer-filter="phone" value="' + escapeHtml(filters.phone) + '" placeholder="请输入手机号" /></label>',
      '<label class="field"><span>工程小组</span><select data-engineer-filter="team">' + optionHTML(data.engineerOptions.teams, filters.team, '全部小组') + '</select></label>',
      '<label class="field"><span>状态</span><select data-engineer-filter="status">' + optionHTML(data.engineerOptions.statuses, filters.status, '全部状态') + '</select></label>',
      '<div class="filter-actions"><button class="btn secondary" data-action="engineer-reset">重置</button><button class="btn primary" data-action="engineer-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function engineerTableHTML() {
    var rows = getFilteredEngineers();
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>工程人员列表</h3><p>共 ' + rows.length + ' 名工程人员，支持小组绑定和关联工单查看</p></div></div>',
      '<table class="data-table customer-table"><thead><tr>',
      '<th>姓名</th><th>手机号</th><th>所属小组</th><th>状态</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr>' +
          '<td><button class="text-link" data-action="engineer-view" data-id="' + item.id + '">' + escapeHtml(item.name) + '</button></td>' +
          '<td>' + escapeHtml(item.phone) + '</td>' +
          '<td>' + escapeHtml(item.team) + '</td>' +
          '<td><span class="status ' + (item.status === '启用' ? 'success' : 'danger') + '">' + escapeHtml(item.status) + '</span></td>' +
          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="engineer-view" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="engineer-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn danger-link" data-action="engineer-delete" data-id="' + item.id + '">删除</button>' +
          '<button class="link-btn" data-action="engineer-workorder" data-id="' + item.id + '">关联工单</button>' +
          '</div></td>' +
        '</tr>';
      }).join('') || '<tr><td colspan="5"><div class="empty-state">未查询到符合条件的工程人员</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function engineerModalHTML() {
    var modal = getEngineerState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'create' ? '新增工程人员' : modal.mode === 'edit' ? '编辑工程人员' : '工程人员详情';
    return [
      '<div class="modal-mask" data-action="engineer-modal-close">',
      '<div class="modal-card customer-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>维护工程人员基础资料、所属小组及现场作业归属</p></div><button class="icon-btn" data-action="engineer-modal-close">×</button></div>',
      '<form id="engineer-form" class="modal-body">',
      '<div class="modal-grid modal-grid-2">',
      '<label class="field modal-field"><span>姓名 <em>*</em></span><input name="name" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.name || '') + '" placeholder="请输入姓名" /></label>',
      '<label class="field modal-field"><span>手机号 <em>*</em></span><input name="phone" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.phone || '') + '" placeholder="请输入手机号" /></label>',
      '<label class="field modal-field"><span>所属小组 <em>*</em></span><select name="team" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(data.engineerOptions.teams, item.team, '请选择工程小组') + '</select></label>',
      '<label class="field modal-field"><span>状态</span><select name="status" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(data.engineerOptions.statuses, item.status, '请选择状态') + '</select></label>',
      '</div>',
      '<div class="modal-footer">' +
      (readOnly ? '<button type="button" class="btn secondary" data-action="engineer-workorder" data-id="' + item.id + '">关联工单</button>' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="engineer-modal-close">关闭</button>' +
      '</div></form></div></div>'
    ].join('');
  }

  function engineerPageHTML() {
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">工程管理</div><h2>工程人员</h2><p>统一维护工程人员基础信息、小组归属与工单协同入口，支撑工程实施与运维调度。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="engineer-create">新增工程人员</button></div></div>',
      engineerFiltersHTML(),
      engineerTableHTML(),
      engineerModalHTML()
    ].join('');
  }

  function engineerTeamFiltersHTML() {
    var filters = getEngineerTeamState().filters;
    var ownerOptions = mappedOptionHTML(getEngineerState().list.map(function (item) {
      return { value: item.name, label: item.name };
    }), filters.ownerName, '全部负责人');
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid team-filter-grid">',
      '<label class="field"><span>小组名称</span><input data-engineer-team-filter="name" value="' + escapeHtml(filters.name) + '" placeholder="请输入小组名称" /></label>',
      '<label class="field"><span>负责人</span><select data-engineer-team-filter="ownerName">' + ownerOptions + '</select></label>',
      '<label class="field"><span>状态</span><select data-engineer-team-filter="status">' + optionHTML(data.engineerTeamOptions.statuses, filters.status, '全部状态') + '</select></label>',
      '<div class="filter-actions"><button class="btn secondary" data-action="engineer-team-reset">重置</button><button class="btn primary" data-action="engineer-team-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function renderEngineerTeamMembers(team) {
    return (team.memberIds || []).map(function (memberId) {
      var member = findEngineer(memberId);
      if (!member) return '';
      return '<div class="member-chip"><span>' + escapeHtml(member.name) + ' · ' + escapeHtml(member.title || '工程人员') + '</span><button class="mini-btn" data-action="engineer-team-remove-member" data-id="' + team.id + '" data-member-id="' + member.id + '">移除</button></div>';
    }).join('') || '<div class="empty-state">暂无小组成员</div>';
  }

  function engineerTeamTableHTML() {
    var rows = getFilteredEngineerTeams();
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>工程小组列表</h3><p>共 ' + rows.length + ' 个工程小组，支持负责人绑定、成员管理和工单协同查看</p></div></div>',
      '<table class="data-table customer-table"><thead><tr>',
      '<th>小组名称</th><th>负责人</th><th>状态</th><th>描述</th><th>创建时间</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr>' +
          '<td><button class="text-link" data-action="engineer-team-view" data-id="' + item.id + '">' + escapeHtml(item.name) + '</button></td>' +
          '<td>' + escapeHtml(item.ownerName || '-') + '</td>' +
          '<td><span class="status ' + (item.status === '启用' ? 'success' : 'danger') + '">' + escapeHtml(item.status) + '</span></td>' +
          '<td>' + escapeHtml(item.desc || '-') + '</td>' +
          '<td>' + escapeHtml(item.createTime || '-') + '</td>' +
          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="engineer-team-view" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="engineer-team-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn danger-link" data-action="engineer-team-delete" data-id="' + item.id + '">删除</button>' +
          '<button class="link-btn" data-action="survey-create">工勘工单</button>' +
          '<button class="link-btn" data-action="construction-create">施工工单</button>' +
          '<button class="link-btn" data-action="maintenance-create">运维工单</button>' +
          '</div></td>' +
        '</tr>';
      }).join('') || '<tr><td colspan="6"><div class="empty-state">未查询到符合条件的工程小组</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function engineerTeamModalHTML() {
    var modal = getEngineerTeamState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'create' ? '新增工程小组' : modal.mode === 'edit' ? '编辑工程小组' : '工程小组详情';
    var engineerOptions = mappedOptionHTML(getEngineerState().list.map(function (person) {
      return { value: person.id, label: person.name + ' · ' + (person.team || '未分组') };
    }), '', '请选择成员');
    return [
      '<div class="modal-mask" data-action="engineer-team-modal-close">',
      '<div class="modal-card customer-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>维护工程小组组织信息、负责人绑定及成员管理</p></div><button class="icon-btn" data-action="engineer-team-modal-close">×</button></div>',
      '<form id="engineer-team-form" class="modal-body">',
      '<div class="modal-grid modal-grid-2">',
      '<label class="field modal-field"><span>小组名称 <em>*</em></span><input name="name" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.name || '') + '" placeholder="请输入小组名称" /></label>',
      '<label class="field modal-field"><span>负责人 <em>*</em></span><select name="ownerId" ' + (readOnly ? 'disabled ' : '') + '>' + mappedOptionHTML(getEngineerState().list.map(function (person) { return { value: person.id, label: person.name }; }), item.ownerId || '', '请选择负责人') + '</select></label>',
      '<label class="field modal-field"><span>状态</span><select name="status" ' + (readOnly ? 'disabled ' : '') + '>' + optionHTML(data.engineerTeamOptions.statuses, item.status, '请选择状态') + '</select></label>',
      '<label class="field modal-field"><span>施工人工成本</span><input name="laborCost" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.laborCost || '') + '" placeholder="请输入施工人工成本（元/台）" /></label>',
      '<label class="field modal-field"><span>工勘人力成本</span><input name="surveyLaborCost" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.surveyLaborCost || '') + '" placeholder="请输入工勘人力成本（次）" /></label>',
      '<label class="field modal-field"><span>创建时间</span><input disabled value="' + escapeHtml(item.createTime || '保存后生成') + '" /></label>',
      '<label class="field modal-field field-span-2"><span>描述</span><textarea name="desc" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入小组职责描述">' + escapeHtml(item.desc || '') + '</textarea></label>',
      '</div>',
      '<div class="modal-section"><h4>小组成员</h4><div class="member-list">' + renderEngineerTeamMembers(item) + '</div>' +
      (readOnly ? '' : '<div class="member-action-bar"><select name="memberToAdd">' + engineerOptions + '</select><button type="button" class="btn secondary" data-action="engineer-team-add-member" data-id="' + (item.id || '') + '">绑定成员</button></div>') +
      '</div>',
      '<div class="modal-footer">' +
      (readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="engineer-team-modal-close">关闭</button>' +
      '</div></form></div></div>'
    ].join('');
  }

  function engineerTeamPageHTML() {
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">工程管理</div><h2>工程小组</h2><p>统一维护工程小组组织信息、负责人及成员结构，支撑现场实施、巡检与运维协同。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="engineer-team-create">新增小组</button></div></div>',
      engineerTeamFiltersHTML(),
      engineerTeamTableHTML(),
      engineerTeamModalHTML()
    ].join('');
  }

  function vehicleLogFiltersHTML() {
    var filters = getVehicleLogState().filters;
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid team-filter-grid">',
      '<label class="field"><span>车牌号</span><input data-vehicle-filter="plate" value="' + escapeHtml(filters.plate) + '" placeholder="请输入车牌号" /></label>',
      '<label class="field"><span>用车人</span><select data-vehicle-filter="user">' + optionHTML(data.vehicleLogOptions.users, filters.user, '全部用车人') + '</select></label>',

      '<div class="filter-actions"><button class="btn secondary" data-action="vehicle-reset">重置</button><button class="btn primary" data-action="vehicle-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function vehicleLogTableHTML() {
    var rows = getFilteredVehicleLogs();
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>车辆使用记录</h3><p>共 ' + rows.length + ' 条车辆使用记录，支持申请、查看、编辑、删除及审批状态管理</p></div></div>',
      '<table class="data-table customer-table"><thead><tr>',
      '<th>车牌号</th><th>用车人</th><th>事由</th><th>出车时间</th><th>返回时间</th><th>里程</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr>' +
          '<td><button class="text-link" data-action="vehicle-view" data-id="' + item.id + '">' + escapeHtml(item.plate) + '</button></td>' +
          '<td>' + escapeHtml(item.user) + '</td>' +
          '<td>' + escapeHtml(item.reason) + '</td>' +
          '<td>' + escapeHtml(item.departTime) + '</td>' +
          '<td>' + escapeHtml(item.returnTime || '-') + '</td>' +
          '<td>' + escapeHtml(item.mileage || '-') + '</td>' +

          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="vehicle-view" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="vehicle-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn danger-link" data-action="vehicle-delete" data-id="' + item.id + '">删除</button>' +
          '</div></td>' +
        '</tr>';
      }).join('') || '<tr><td colspan="7"><div class="empty-state">未查询到符合条件的车辆使用记录</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function vehicleLogModalHTML() {
    var modal = getVehicleLogState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view';
    var title = modal.mode === 'create' ? '新增车辆使用记录' : modal.mode === 'edit' ? '编辑车辆使用记录' : '车辆使用记录详情';
    return [
      '<div class="modal-mask" data-action="vehicle-modal-close">',
      '<div class="modal-card customer-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>维护工程用车申请、现场出车和返回信息，支撑工程车辆调度留痕。</p></div><button class="icon-btn" data-action="vehicle-modal-close">×</button></div>',
      '<form id="vehicle-form" class="modal-body">',
      '<div class="modal-grid modal-grid-2">',
      '<label class="field modal-field"><span>车牌号 <em>*</em></span><input name="plate" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.plate || '') + '" placeholder="请输入车牌号" /></label>',
      '<label class="field modal-field"><span>用车人 <em>*</em></span><input name="user" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.user || '') + '" placeholder="请输入用车人" /></label>',
      '<label class="field modal-field"><span>出车时间 <em>*</em></span><input type="datetime-local" name="departTime" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml((item.departTime || '').replace(' ', 'T')) + '" /></label>',
      '<label class="field modal-field"><span>返回时间</span><input type="datetime-local" name="returnTime" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.returnTime && item.returnTime !== '-' ? item.returnTime.replace(' ', 'T') : '') + '" /></label>',
      '<label class="field modal-field"><span>里程</span><input name="mileage" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.mileage && item.mileage !== '-' ? item.mileage : '') + '" placeholder="请输入里程，如 86km" /></label>',

      '<label class="field modal-field field-span-2"><span>事由 <em>*</em></span><input name="reason" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.reason || '') + '" placeholder="请输入用车事由" /></label>',
      '<label class="field modal-field field-span-2"><span>目的地</span><input name="destination" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.destination || '') + '" placeholder="请输入目的地" /></label>',
      '<label class="field modal-field field-span-2"><span>备注</span><textarea name="remark" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入备注信息">' + escapeHtml(item.remark || '') + '</textarea></label>',
      '</div>',
      '<div class="modal-footer">' +
      (readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="vehicle-modal-close">关闭</button>' +
      '</div></form></div></div>'
    ].join('');
  }

  function vehicleLogPageHTML() {
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">工程管理</div><h2>车辆使用记录</h2><p>统一维护项目工勘、施工、运维场景下的工程车辆使用记录，支撑审批留痕与调度复盘。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="vehicle-create">新增用车记录</button></div></div>',
      vehicleLogFiltersHTML(),
      vehicleLogTableHTML(),
      vehicleLogModalHTML()
    ].join('');
  }

  function rmbUpper(value) {
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    var fraction = ['角', '分'];
    var num = Math.abs(Number(value) || 0);
    if (!num) return '零元整';
    var s = '';
    fraction.forEach(function (item, index) {
      var d = Math.floor(num * 10 * Math.pow(10, index)) % 10;
      if (d) s += digit[d] + item;
    });
    s = s || '整';
    num = Math.floor(num);
    for (var i = 0; i < unit[0].length && num > 0; i += 1) {
      var p = '';
      for (var j = 0; j < unit[1].length && num > 0; j += 1) {
        var n = num % 10;
        p = digit[n] + unit[1][j] + p;
        num = Math.floor(num / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整').replace(/元整$/, '元整');
  }

  function buildDefaultContractPricingDetails() {
    return Array.from({ length: 5 }).map(function () {
      return { productName: '', specModel: '', qty: '', unit: '', taxPrice: '', taxAmount: '', remark: '' };
    });
  }

  function normalizeContractPricingDetails(details) {
    var list = (details || []).slice(0, 5).map(function (item) {
      return {
        productName: safeText(item.productName || item.name).trim(),
        specModel: safeText(item.specModel || item.model).trim(),
        qty: safeText(item.qty).trim(),
        unit: safeText(item.unit).trim(),
        taxPrice: safeText(item.taxPrice || item.price).trim(),
        taxAmount: safeText(item.taxAmount || item.amount).trim(),
        remark: safeText(item.remark).trim()
      };
    });
    while (list.length < 5) list.push({ productName: '', specModel: '', qty: '', unit: '', taxPrice: '', taxAmount: '', remark: '' });
    return list;
  }

  function getContractPricingCatalog() {
    return (data.contractOptions && data.contractOptions.pricingCatalog) || [];
  }

  function getContractPricingSpecs(productName) {
    var product = getContractPricingCatalog().find(function (item) { return item.productName === productName; });
    return product ? (product.specs || []) : [];
  }

  function findContractPricingSpec(productName, specModel) {
    return getContractPricingSpecs(productName).find(function (item) { return item.model === specModel; }) || null;
  }

  function contractProductOptionsHTML(value) {
    return mappedOptionHTML(getContractPricingCatalog().map(function (item) {
      return { value: item.productName, label: item.productName };
    }), value || '', '请选择产品名称');
  }

  function contractSpecOptionsHTML(productName, value) {
    return mappedOptionHTML(getContractPricingSpecs(productName).map(function (item) {
      return { value: item.model, label: item.model };
    }), value || '', productName ? '请选择规格型号' : '请先选择产品');
  }

  function calcContractPricingSummary(details, taxRate) {
    var totalAmount = (details || []).reduce(function (sum, item) {
      return sum + (Number(item.taxAmount) || 0);
    }, 0);
    var rate = Number(taxRate) || 0;
    var taxExclusiveAmount = rate ? totalAmount / (1 + rate / 100) : totalAmount;
    var taxAmount = totalAmount - taxExclusiveAmount;
    return {
      totalAmount: totalAmount,
      taxExclusiveAmount: taxExclusiveAmount,
      taxAmount: taxAmount,
      taxRate: rate
    };
  }

  function contractPricingTableHTML(item, readOnly) {
    var details = normalizeContractPricingDetails(item.pricingDetails);
    var summary = calcContractPricingSummary(details, item.taxRate || data.contractOptions.defaultTaxRate);
    return '<div class="modal-section"><h4>计价清单</h4><div class="cost-table-wrap contract-pricing-wrap"><table class="data-table cost-detail-table contract-pricing-table"><thead><tr><th>序号</th><th>产品名称</th><th>规格型号</th><th>数量</th><th>单位</th><th>含税单价（元）</th><th>含税合价（元）</th><th>备注</th></tr></thead><tbody>' +
      details.map(function (row, index) {
        return '<tr>' +
          '<td>' + (index + 1) + '</td>' +
          '<td>' + (readOnly
            ? escapeHtml(row.productName || '-')
            : '<select class="mini-select contract-mini-select" data-contract-product="' + index + '" data-index="' + index + '" name="pricing-product-' + index + '">' + contractProductOptionsHTML(row.productName) + '</select>') + '</td>' +
          '<td>' + (readOnly
            ? escapeHtml(row.specModel || '-')
            : '<select class="mini-select contract-mini-select" data-contract-spec="' + index + '" data-index="' + index + '" name="pricing-spec-' + index + '">' + contractSpecOptionsHTML(row.productName, row.specModel) + '</select>') + '</td>' +
          '<td>' + (readOnly
            ? escapeHtml(row.qty || '-')
            : '<input class="mini-input mini-input-sm" data-contract-calc="qty" data-index="' + index + '" name="pricing-qty-' + index + '" value="' + escapeHtml(row.qty) + '" placeholder="数量" />') + '</td>' +
          '<td>' + (readOnly
            ? escapeHtml(row.unit || '-')
            : '<input class="mini-input mini-input-xs" name="pricing-unit-' + index + '" value="' + escapeHtml(row.unit) + '" readonly />') + '</td>' +
          '<td>' + (readOnly
            ? escapeHtml(row.taxPrice || '-')
            : '<input class="mini-input" data-contract-calc="price" data-index="' + index + '" name="pricing-price-' + index + '" value="' + escapeHtml(row.taxPrice) + '" placeholder="单价" />') + '</td>' +
          '<td><span class="cost-amount" data-contract-amount="' + index + '">' + escapeHtml(row.taxAmount || '-') + '</span></td>' +
          '<td>' + (readOnly
            ? escapeHtml(row.remark || '-')
            : '<input class="mini-input contract-remark-input" name="pricing-remark-' + index + '" value="' + escapeHtml(row.remark) + '" placeholder="备注" />') + '</td>' +
        '</tr>';
      }).join('') +
      '<tr class="cost-total-row"><td></td><td>税费/税率</td><td colspan="3"></td><td><span data-contract-tax-rate-display>' + escapeHtml(String(summary.taxRate || data.contractOptions.defaultTaxRate)) + '%</span></td><td><span data-contract-tax-amount-display>' + summary.taxAmount.toFixed(2) + '</span></td><td></td></tr>' +
      '<tr class="cost-total-row"><td></td><td>不含税合计</td><td colspan="4"></td><td><span data-contract-no-tax-total>' + summary.taxExclusiveAmount.toFixed(2) + '</span></td><td></td></tr>' +
      '</tbody></table></div></div>';
  }

  function updateAmountUpperDisplay(name, value) {
    var node = root.querySelector('[data-upper-for="' + name + '"]');
    if (node) node.textContent = rmbUpper(value);
  }

  function updateContractPricingRow(index) {
    var form = root.querySelector('#contract-form');
    if (!form) return;
    var productSelect = form.querySelector('[name="pricing-product-' + index + '"]');
    var specSelect = form.querySelector('[name="pricing-spec-' + index + '"]');
    var unitInput = form.querySelector('[name="pricing-unit-' + index + '"]');
    var priceInput = form.querySelector('[name="pricing-price-' + index + '"]');
    var qtyInput = form.querySelector('[name="pricing-qty-' + index + '"]');
    var amountNode = form.querySelector('[data-contract-amount="' + index + '"]');
    if (!productSelect || !specSelect || !unitInput || !priceInput || !amountNode) return;
    var currentSpec = specSelect.value;
    specSelect.innerHTML = contractSpecOptionsHTML(productSelect.value, currentSpec);
    if (!findContractPricingSpec(productSelect.value, specSelect.value)) specSelect.value = '';
    var spec = findContractPricingSpec(productSelect.value, specSelect.value);
    if (spec) {
      unitInput.value = spec.unit || '';
      if (!priceInput.value || priceInput.getAttribute('data-spec-model') !== spec.model) priceInput.value = spec.taxPrice != null ? String(spec.taxPrice) : '';
      priceInput.setAttribute('data-spec-model', spec.model);
    } else {
      unitInput.value = '';
      if (!productSelect.value) priceInput.value = '';
      priceInput.removeAttribute('data-spec-model');
    }
    var amount = (Number(qtyInput && qtyInput.value) || 0) * (Number(priceInput.value) || 0);
    amountNode.textContent = amount ? amount.toFixed(2) : '-';
  }

  function updateContractPricingTotals() {
    var form = root.querySelector('#contract-form');
    if (!form) return;
    var details = [];
    for (var index = 0; index < 5; index += 1) {
      updateContractPricingRow(index);
      var amountNode = form.querySelector('[data-contract-amount="' + index + '"]');
      details.push({ taxAmount: amountNode && amountNode.textContent !== '-' ? amountNode.textContent : '' });
    }
    var taxRateInput = form.querySelector('input[name="taxRate"]');
    var totalInput = form.querySelector('input[name="totalAmount"]');
    var taxExclusiveInput = form.querySelector('input[name="taxExclusiveAmount"]');
    var taxAmountInput = form.querySelector('input[name="taxAmount"]');
    var summary = calcContractPricingSummary(details, taxRateInput ? taxRateInput.value : data.contractOptions.defaultTaxRate);
    if (totalInput) totalInput.value = summary.totalAmount ? summary.totalAmount.toFixed(2) : '';
    if (taxExclusiveInput) taxExclusiveInput.value = summary.taxExclusiveAmount ? summary.taxExclusiveAmount.toFixed(2) : '';
    if (taxAmountInput) taxAmountInput.value = summary.taxAmount ? summary.taxAmount.toFixed(2) : '';
    updateAmountUpperDisplay('totalAmount', totalInput ? totalInput.value : '');
    updateAmountUpperDisplay('taxExclusiveAmount', taxExclusiveInput ? taxExclusiveInput.value : '');
    updateAmountUpperDisplay('taxAmount', taxAmountInput ? taxAmountInput.value : '');
    var taxRateDisplay = form.querySelector('[data-contract-tax-rate-display]');
    if (taxRateDisplay) taxRateDisplay.textContent = String(Number(taxRateInput && taxRateInput.value ? taxRateInput.value : data.contractOptions.defaultTaxRate) || 0) + '%';
    var taxAmountDisplay = form.querySelector('[data-contract-tax-amount-display]');
    if (taxAmountDisplay) taxAmountDisplay.textContent = summary.taxAmount.toFixed(2);
    var noTaxTotalDisplay = form.querySelector('[data-contract-no-tax-total]');
    if (noTaxTotalDisplay) noTaxTotalDisplay.textContent = summary.taxExclusiveAmount.toFixed(2);
  }

  function contractFiltersHTML() {
    var filters = getContractState().filters;
    return [
      '<div class="panel filter-panel customer-filter-panel">',
      '<div class="filter-grid contract-filter-grid">',
      '<label class="field"><span>合同编号</span><input data-contract-filter="id" value="' + escapeHtml(filters.id) + '" placeholder="请输入合同编号" /></label>',
      '<label class="field"><span>客户</span><select data-contract-filter="customerId">' + mappedOptionHTML(getCustomerArchiveState().list.map(function (item) { return { value: item.id, label: item.name }; }), filters.customerId, '全部客户') + '</select></label>',
      '<label class="field"><span>项目</span><select data-contract-filter="projectId">' + mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (item) { return { value: item.id, label: item.name }; }), filters.projectId, '全部项目') + '</select></label>',
      '<label class="field"><span>状态</span><select data-contract-filter="status">' + optionHTML(data.contractOptions.statuses, filters.status, '全部状态') + '</select></label>',
      '<div class="filter-actions"><button class="btn secondary" data-action="contract-reset">重置</button><button class="btn primary" data-action="contract-search">查询</button></div>',
      '</div></div>'
    ].join('');
  }

  function contractTableHTML() {
    var rows = getFilteredContracts();
    return [
      '<div class="panel table-panel customer-table-panel">',
      '<div class="panel-header"><div><h3>合同列表</h3><p>共 ' + rows.length + ' 份合同，支持审批、撤销和完整合同信息查看</p></div></div>',
      '<table class="data-table customer-table"><thead><tr>',
      '<th>合同编号</th><th>客户</th><th>项目</th><th>合同金额</th><th>状态</th><th>创建人</th><th>创建时间</th><th>操作</th>',
      '</tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr>' +
          '<td><button class="text-link" data-action="contract-view" data-id="' + item.id + '">' + escapeHtml(item.id) + '</button></td>' +
          '<td>' + escapeHtml(item.customerName) + '</td>' +
          '<td>' + escapeHtml(item.projectName) + '</td>' +
          '<td><span class="status ' + (item.status === '已通过' ? 'success' : item.status === '审批中' ? 'warning' : (item.status === '已撤销' || item.status === '已驳回') ? 'danger' : 'warning') + '">' + escapeHtml(item.status) + '</span></td>' +
          '<td>' + escapeHtml(item.creator) + '</td>' +
          '<td>' + escapeHtml(item.createTime) + '</td>' +
          '<td><div class="table-actions">' +
          '<button class="link-btn" data-action="contract-view" data-id="' + item.id + '">查看</button>' +
          '<button class="link-btn" data-action="contract-edit" data-id="' + item.id + '">编辑</button>' +
          '<button class="link-btn danger-link" data-action="contract-revoke" data-id="' + item.id + '">撤销</button>' +
          '<button class="link-btn danger-link" data-action="contract-delete" data-id="' + item.id + '">删除</button>' +
          '<button class="link-btn" data-action="contract-approve" data-id="' + item.id + '">审批</button>' +
          '</div></td>' +
          '</tr>';
      }).join('') || '<tr><td colspan="7"><div class="empty-state">未查询到符合条件的合同</div></td></tr>',
      '</tbody></table></div>'
    ].join('');
  }

  function contractModalHTML() {
    var modal = getContractState().modal;
    if (!modal) return '';
    var item = modal.item || {};
    var readOnly = modal.mode === 'view' || modal.mode === 'approve';
    var title = modal.mode === 'create' ? '新增合同' : modal.mode === 'edit' ? '编辑合同' : modal.mode === 'approve' ? '合同审批' : '合同详情';
    var customerOptions = mappedOptionHTML(getCustomerArchiveState().list.map(function (customer) { return { value: customer.id, label: customer.name }; }), item.customerId || '', '请选择发包方');
    var projectOptions = mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) { return { value: project.id, label: project.name }; }), item.projectId || '', '请选择项目');
    var attachmentName = safeText(item.attachmentName).trim() || '未上传附件';
    function amountField(name, label, value) {
      var autoCalc = name === 'totalAmount' || name === 'taxExclusiveAmount' || name === 'taxAmount';
      return '<div class="amount-field"><label class="field modal-field"><span>' + label + ' <em>*</em></span><input type="number" step="0.01" name="' + name + '" ' + (readOnly ? 'disabled ' : '') + (autoCalc && !readOnly ? 'readonly ' : '') + 'value="' + escapeHtml(value || '') + '" /></label><div class="amount-upper" data-upper-for="' + name + '">' + escapeHtml(rmbUpper(value)) + '</div></div>';
    }
    var approvalHTML = detailFlowRecordHTML('流转记录', '展示单据创建、编辑、审批等流转过程', contractFlowTimelineHTML(item));
    return [
      '<div class="modal-mask" data-action="contract-modal-close">',
      '<div class="modal-card contract-modal" data-stop-close="1">',
      '<div class="modal-header"><div><h3>' + title + '</h3><p>维护合同基础信息、工程概况、工期要求、计价清单及合同报价</p></div><button class="icon-btn" data-action="contract-modal-close">×</button></div>',
      '<form id="contract-form" class="modal-body">',
      '<div class="modal-section"><h4>基础信息</h4><div class="modal-grid modal-grid-2">' +
      '<label class="field modal-field"><span>发包方 <em>*</em></span><select name="customerId" ' + (readOnly ? 'disabled ' : '') + '>' + customerOptions + '</select></label>' +
      '<label class="field modal-field"><span>合同订立时间 <em>*</em></span><input type="date" name="signDate" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.signDate || '') + '" /></label>' +
      '<label class="field modal-field"><span>合同订立地点 <em>*</em></span><input name="signPlace" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.signPlace || '') + '" placeholder="请输入合同订立地点" /></label>' +
      '<label class="field modal-field"><span>合同编号 <em>*</em></span><input name="id" ' + (readOnly || modal.mode === 'edit' ? 'disabled ' : '') + 'value="' + escapeHtml(item.id || '') + '" placeholder="请输入合同编号" /></label>' +
      '</div></div>',
      '<div class="modal-section"><h4>工程概况</h4><div class="modal-grid modal-grid-2">' +
      '<label class="field modal-field"><span>项目 <em>*</em></span><select name="projectId" ' + (readOnly ? 'disabled ' : '') + '>' + projectOptions + '</select></label>' +
      '<div class="inline-pair-field"><span class="inline-pair-label">发包方代表 <em>*</em></span><div class="inline-pair-grid">' +
      '<input name="employerRepName" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.employerRepName || '') + '" placeholder="请输入发包方代表姓名" />' +
      '<input name="employerRepPhone" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.employerRepPhone || '') + '" placeholder="请输入联系方式" />' +
      '</div></div>' +
      '<div class="inline-pair-field"><span class="inline-pair-label">承包方代表 <em>*</em></span><div class="inline-pair-grid">' +
      '<input name="contractorRepName" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.contractorRepName || '') + '" placeholder="请输入承包方代表姓名" />' +
      '<input name="contractorRepPhone" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.contractorRepPhone || '') + '" placeholder="请输入联系方式" />' +
      '</div></div>' +
      '<label class="field modal-field field-span-2"><span>承包内容 <em>*</em></span><textarea name="content" ' + (readOnly ? 'disabled ' : '') + ' placeholder="请输入承包内容">' + escapeHtml(item.content || '') + '</textarea></label>' +
      '</div></div>',
      '<div class="modal-section"><h4>工期要求</h4><div class="modal-grid modal-grid-3">' +
      '<label class="field modal-field"><span>暂定开工日期 <em>*</em></span><input type="date" name="startDate" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.startDate || '') + '" /></label>' +
      '<label class="field modal-field"><span>工期（天） <em>*</em></span><input type="number" name="duration" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.duration || '') + '" placeholder="请输入工期天数" /></label>' +
      '<label class="field modal-field"><span>暂定完工日期 <em>*</em></span><input type="date" name="endDate" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.endDate || '') + '" /></label>' +
      '</div></div>',
      '<div class="modal-section"><h4>合同附件</h4><div class="modal-grid modal-grid-2">' +
      (modal.mode === 'create'
        ? '<div class="field modal-field contract-attachment-field"><span>上传附件</span><button type="button" class="btn secondary contract-upload-btn">上传附件</button></div>'
        : '<div class="field modal-field contract-attachment-field"><span>附件名称</span><div class="attachment-name-display"><span>' + escapeHtml(attachmentName) + '</span><button type="button" class="icon-btn attachment-download-btn" aria-label="下载附件">⭳</button></div></div>') +
      '</div></div>',
      contractPricingTableHTML(item, readOnly),
      '<div class="modal-section"><h4>合同报价</h4><div class="modal-grid modal-grid-2">' +
      amountField('totalAmount', '总价', item.totalAmount) +
      amountField('taxExclusiveAmount', '不含税金额', item.taxExclusiveAmount) +
      amountField('taxAmount', '增值税金额', item.taxAmount) +
      '<label class="field modal-field"><span>增值税率 <em>*</em></span><input type="number" name="taxRate" ' + (readOnly ? 'disabled ' : '') + 'value="' + escapeHtml(item.taxRate || String(data.contractOptions.defaultTaxRate)) + '" /></label>' +
      amountField('prepayment', '预付款', item.prepayment) +
      '</div></div>',
      approvalHTML,
      (modal.mode === 'approve' ? '<div class="approval-box"><label class="field field-span-2"><span>审批意见</span><textarea name="contractApprovalRemark" placeholder="同意可选填审批意见，驳回时必须填写原因"></textarea></label></div>' : ''),
      '<div class="modal-footer">' +
      (modal.mode === 'approve'
        ? '<button type="button" class="btn primary" data-action="contract-approve-confirm" data-id="' + item.id + '" data-mode="agree">同意</button><button type="button" class="btn secondary" data-action="contract-approve-confirm" data-id="' + item.id + '" data-mode="reject">驳回</button>'
        : readOnly ? '' : '<button type="submit" class="btn primary">保存</button>') +
      '<button type="button" class="btn secondary" data-action="contract-modal-close">关闭</button>' +
      '</div></form></div></div>'
    ].join('');
  }

  function contractPageHTML() {
    return [
      '<div class="sub-hero customer-hero">',
      '<div><div class="eyebrow">合同管理</div><h2>合同管理</h2><p>统一维护合同主数据、工程概况、工期要求及合同报价，支持审批和撤销。</p></div>',
      '<div class="sub-actions"><button class="btn primary" data-action="contract-create">新增合同</button></div></div>',
      contractFiltersHTML(),
      contractTableHTML(),
      contractModalHTML()
    ].join('');
  }

  function alertListHTML(title, subtitle, items) {
    return [
      '<div class="panel alert-list-panel">',
      '<div class="panel-header"><div><h3>' + title + '</h3>' + (subtitle ? '<p>' + subtitle + '</p>' : '') + '</div></div>',
      '<div class="alert-list">',
      items.map(function (item) {
        return '<button class="alert-item" data-route="' + item.route + '">' +
          '<div class="alert-item-head"><span class="status danger">' + item.overdue + '</span><span class="alert-id">' + item.id + '</span></div>' +
          '<strong>' + safeText(item.project) + '</strong>' +
          '<p>' + safeText(item.customer) + '</p>' +
          '<div class="alert-meta"><span>负责人：' + safeText(item.owner) + '</span><span>计划完成：' + safeText(item.dueDate) + '</span></div>' +
        '</button>';
      }).join(''),
      '</div></div>'
    ].join('');
  }

  function dashboardAnalysisPeriodOptions() {
    var endMonth = appState.ui.dashboardAnalysis.periodEnd || currentPeriodMonth();
    var parts = endMonth.split('-');
    var endYear = Number(parts[0]) || 2026;
    var endMo = Number(parts[1]) || 4;
    var months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    var options = '';
    for (var i = 0; i < 12; i++) {
      var y = endYear;
      var m = endMo - i;
      while (m <= 0) { m += 12; y -= 1; }
      var val = y + '-' + (m < 10 ? '0' + m : m);
      var label = y + '年' + months[m - 1];
      var selected = val === endMonth ? ' selected' : '';
      options += '<option value="' + val + '"' + selected + '>' + label + '</option>';
    }
    return options;
  }

  function dashboardAnalysisChartOption() {
    var endMonth = appState.ui.dashboardAnalysis.periodEnd || currentPeriodMonth();
    var parts = endMonth.split('-');
    var endYear = Number(parts[0]) || 2026;
    var endMo = Number(parts[1]) || 4;
    var labels = [];
    var months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    for (var i = 5; i >= 0; i--) {
      var y = endYear;
      var m = endMo - i;
      while (m <= 0) { m += 12; y -= 1; }
      labels.push(months[m - 1]);
    }
    var baseAmounts = [[860,1420,1180,2260,1950,2480],[520,860,980,1320,1540,1790],[460,790,910,1280,1490,1680],[680,1180,1260,1890,1720,2160]];
    var baseCount = [8,12,11,17,15,19];
    var hash = endMonth.charCodeAt(0) * 7 + endMonth.charCodeAt(3) * 13 + endMo;
    var offset = hash % 6;
    function shift(arr) { return arr.map(function(v,i) { return v + (i+offset)*20 - 50; }); }
    return {
      title: { text: '' },
      tooltip: { trigger: 'axis' },
      legend: { top: 'top', right: 16 },
      xAxis: { type: 'category', data: labels },
      yAxis: [
        { type: 'value', name: '金额（万元）', position: 'left' },
        { type: 'value', name: '数量（份）', position: 'right' }
      ],
      series: [
        { type: 'line', name: '合同金额', color: '#28d7ff', lineWidth: 4, lineGlow: 0.18, yAxisIndex: 0, data: shift(baseAmounts[0]) },
        { type: 'line', name: '回款金额', color: '#25d18a', lineWidth: 4, lineGlow: 0.18, yAxisIndex: 0, data: shift(baseAmounts[1]) },
        { type: 'line', name: '开票金额', color: '#ffb347', lineWidth: 4, lineGlow: 0.18, yAxisIndex: 0, data: shift(baseAmounts[2]) },
        { type: 'line', name: '生产产值', color: '#8b7cff', lineWidth: 4, lineGlow: 0.18, yAxisIndex: 0, data: shift(baseAmounts[3]) },
        { type: 'line', name: '合同签订数量', color: '#ffd166', lineWidth: 4, lineGlow: 0.18, yAxisIndex: 1, data: baseCount.map(function(v) { return v + (hash % 3) - 1; }) }
      ]
    };
  }

  function pcDashboardHTML() {
    return [
      dashboardHeroHTML(),
      '<div class="content-grid dashboard-grid-2">',
      contractAnalysisPanel({
        title: '合同统计',
        chartId: 'chart-contract-trend',
        sideTitle: '月度汇总',
        cards: [
          { label: '本月新签合同数量', value: '19 份' },
          { label: '本月回款总额', value: '¥368.5 万' }
        ]
      }),
      '<div class="panel chart-panel"><div class="panel-header"><div style="display:flex;align-items:center;justify-content:space-between;width:100%"><h3>经营分析</h3><label style="display:flex;align-items:center;gap:6px;font-size:12px;color:#8aa0c5"><span>时间范围</span><select data-dashboard-analysis-period style="background:rgba(22,48,88,.5);color:#dbeafe;border:1px solid rgba(120,196,255,.25);border-radius:6px;padding:3px 8px;font-size:12px">' + dashboardAnalysisPeriodOptions() + '</select></label></div></div><div class="chart" id="chart-invoice-trend"></div></div>',
      '</div>',
      '<div class="content-grid dashboard-grid-2">',
      richDashboardChartPanel({
        id: 'chart-customer-scale',
        title: '客户规模分析',
        sub: ''
      }),
      richDashboardChartPanel({
        id: 'chart-customer-channel',
        title: '来源渠道分析',
        sub: ''
      }),
      '</div>',
      '<div class="content-grid dashboard-grid-3">',
      stackedChartPanel({
        title: '项目状态分析',
        sub: '',
        topId: 'chart-project-status',
        bottomId: 'chart-project-trend-30d',
        bottomTitle: '近30日立项趋势'
      }),
      alertListHTML('超期工勘工单', '', data.dashboard.overdueSurveyOrders),
      alertListHTML('超期施工工单', '', data.dashboard.overdueConstructionOrders),
      '</div>',
      '<div class="content-grid dashboard-grid-2">',
      dualPieChartPanel({
        title: '设备状态分析',
        leftTitle: '业务状态',
        rightTitle: '在线/离线占比',
        leftId: 'chart-device-status',
        rightId: 'chart-device-online-offline'
      }),
      chartPanel('chart-device-category', '设备分类统计', ''),
      '</div>',
      '</div>'
    ].join('');
  }

  function genericSummary(route) {
    var meta = routeMeta[route];
    var links = navRelation.project.slice(0, 3);
    if (/asset/.test(route)) links = navRelation.asset;
    if (/approval|purchase|contract/.test(route)) links = navRelation.approval;
    return [
      '<div class="sub-hero">',
      '<div><div class="eyebrow">' + meta.module + '</div><h2>' + meta.title + '</h2><p>围绕 ' + meta.title + ' 构建可继续细化的演示页面骨架，包含筛选、统计、图表、明细、跳转入口。</p></div>',
      '<div class="sub-actions">',
      links.map(function (link) {
        var target = routeMeta[link];
        return '<button class="ghost-pill" data-route="' + link + '">' + target.title + '</button>';
      }).join(''),
      '</div></div>',
      '<div class="mini-stats">',
      '<div class="mini-stat"><span>本月新增</span><strong>' + (8 + route.length % 9) + '</strong></div>',
      '<div class="mini-stat"><span>待办事项</span><strong>' + (12 + route.length % 7) + '</strong></div>',
      '<div class="mini-stat"><span>异常提醒</span><strong>' + (2 + route.length % 5) + '</strong></div>',
      '<div class="mini-stat"><span>闭环率</span><strong>' + (88 + route.length % 9) + '%</strong></div>',
      '</div>'
    ].join('');
  }

  function genericPageHTML(route) {
    if (route === '/pc/customer/archive') {
      return customerArchivePageHTML();
    }
    if (route === '/pc/customer/follow') {
      return customerFollowPageHTML();
    }
    if (route === '/pc/project/archive') {
      return projectArchivePageHTML();
    }
    if (route === '/pc/project/cost') {
      return projectCostPageHTML();
    }
    if (route === '/pc/project/survey-workorder') {
      return surveyWorkorderPageHTML();
    }
    if (route === '/pc/project/construction-workorder') {
      return constructionWorkorderPageHTML();
    }
    if (route === '/pc/project/maintenance-workorder') {
      return maintenanceWorkorderPageHTML();
    }
    if (route === '/pc/marketing/salesperson') {
      return salespersonPageHTML();
    }
    if (route === '/pc/marketing/salesteam') {
      return salesTeamPageHTML();
    }
    if (route === '/pc/engineering/engineer') {
      return engineerPageHTML();
    }
    if (route === '/pc/engineering/team') {
      return engineerTeamPageHTML();
    }
    if (route === '/pc/engineering/vehicle-log') {
      return vehicleLogPageHTML();
    }
    var managedKey = getManagedPageKeyByRoute(route);
    if (managedKey) {
      return managedPageHTML(managedKey);
    }
    if (route === '/pc/contract/list') {
      return contractPageHTML();
    }
    if (route === '/pc/project/detail') {
      return projectDetailPageHTML();
    }
    if (route === '/pc/project/workorder-detail') {
      return workorderDetailPageHTML();
    }
    var meta = routeMeta[route];
    var chartId = 'chart-generic';
    return [
      genericSummary(route),
      '<div class="content-grid content-grid-2">',
      chartPanel(chartId, meta.title + '趋势分析', '支持后续替换为真实业务图表'),
      timelineHTML(data.timelines.dashboard.slice(0, 3), '流转记录', '展示审批、派工、入库、回款等过程信息'),
      '</div>',
      tableHTML(data.tables[meta.table])
    ].join('');
  }

  function appHomeHTML() {
    var taskReminder = data.appHomeTaskReminder || {};
    var taskReminderItems = taskReminder.items || [];
    var taskReminderTotal = Number(taskReminder.total);
    if (!Number.isFinite(taskReminderTotal)) {
      taskReminderTotal = taskReminderItems.reduce(function (sum, item) { return sum + (Number(item.value) || 0); }, 0);
    }
    return [
      '<div class="mobile-home-hero">',
      '<div class="mobile-quick-actions">' + (data.appHomeQuickActions || []).map(function (item) {
        return '<button class="mobile-quick-item" data-route="' + item.route + '"><span class="mobile-quick-icon">' + item.icon + '</span><label>' + item.label + '</label></button>';
      }).join('') + '</div></div>',
      '<section class="mobile-task-section"><div class="mobile-task-reminder">' +
        '<button class="mobile-task-reminder-head" data-route="' + escapeHtml(taskReminder.route || '/app/survey-workorder') + '"><span>' + escapeHtml(taskReminder.label || '待办工单') + '</span><strong>' + taskReminderTotal + '</strong></button>' +
        '<div class="mobile-task-reminder-grid">' + (taskReminderItems.map(function (item) {
          return '<button class="mobile-task-reminder-item" data-route="' + escapeHtml(item.route || '/app/home') + '"><span>' + escapeHtml(item.label || '-') + '</span><strong>' + (Number(item.value) || 0) + '</strong></button>';
        }).join('') || '<div class="empty-state">暂无任务</div>') + '</div></div></section>',
      data.appHomeGroups.map(function (group) {
        return '<section class="mobile-section"><div class="section-title"><h4>' + group.title + '</h4></div><div class="app-grid">' + group.items.map(function (item) {
          return '<button class="app-grid-item app-grid-item-entry" data-route="' + item.route + '"><i class="app-entry-icon">' + (item.icon || '◌') + '</i><span>' + item.label + '</span></button>';
        }).join('') + '</div></section>';
      }).join('')
    ].join('');
  }

  function appMessageHTML() {
    return '<section class="mobile-section"><div class="section-title"><h4>业务消息</h4><span>今日更新</span></div><div class="message-list">' + data.notices.map(function (item) {
      return '<div class="message-item"><div class="message-icon ' + item.level + '"></div><div><strong>' + item.title + '</strong><p>' + item.time + ' · 系统自动推送</p></div></div>';
    }).join('') + '</div></section>';
  }

  function appProjectCostEntryHTML() {
    return appProjectCostListHTML();
  }

  function approvalOwnerName(item) {
    return safeText((item || {}).creator || (item || {}).applicant || (item || {}).returner || '');
  }

  function getAppPendingApprovalItems() {
    var items = [];
    (getContractState().list || []).forEach(function (item) {
      if (safeText(item.status) !== '审批中') return;
      items.push({
        id: item.id,
        type: 'contract',
        typeLabel: '合同',
        title: item.id,
        subtitle: item.projectName || item.customerName || '-',
        status: item.status || '审批中',
        owner: approvalOwnerName(item) || item.contractorRepName || '-',
        time: item.createTime || item.signDate || '-',
        amount: item.totalAmount ? ('¥' + formatMoney(item.totalAmount)) : '-',
        routeType: 'pc',
        actionText: '转PC处理'
      });
    });
    (getProjectCostState().list || []).forEach(function (item) {
      if (safeText(item.status) !== '审批中') return;
      items.push({
        id: item.id,
        type: 'cost',
        typeLabel: '报价单',
        title: item.id,
        subtitle: item.projectName || '-',
        status: item.status || '审批中',
        owner: approvalOwnerName(item) || '-',
        time: item.createTime || '-',
        amount: '¥' + formatMoney(calcCostTotal(item.details || [])),
        routeType: 'app',
        actionText: '去审批'
      });
    });
    (getManagedState('purchaseOrder').list || []).forEach(function (item) {
      if (safeText(item.status) !== '待审核') return;
      items.push({
        id: item.id,
        type: 'purchase',
        typeLabel: '采购单',
        title: item.id,
        subtitle: item.supplierName || '-',
        status: item.status || '待审核',
        owner: approvalOwnerName(item) || '-',
        time: item.createTime || '-',
        amount: item.amount || ('¥' + normalizePurchaseOrderDetails(item.details).reduce(function (sum, detail) { return sum + parseMoney(detail.amount || detail.price); }, 0).toFixed(2)),
        routeType: 'app',
        actionText: '去审批'
      });
    });
    (getManagedState('deviceRepair').list || []).map(function (item) { return normalizeDeviceRepairItem(item); }).forEach(function (item) {
      if (safeText(item.status) !== '审批中' && safeText(item.status) !== '待审批') return;
      items.push({
        id: item.id,
        type: 'repair',
        typeLabel: '设备返修单',
        title: item.id,
        subtitle: item.projectName || ((item.selectedDevices || [])[0] || {}).name || '-',
        status: item.status || '待审批',
        owner: approvalOwnerName(item) || '-',
        time: item.createTime || '-',
        amount: (Number(item.qty) || 0) + '台',
        routeType: 'pc',
        actionText: '转PC处理'
      });
    });
    (getManagedState('deviceReturn').list || []).map(function (item) { return normalizeDeviceReturnItem(item); }).forEach(function (item) {
      if (safeText(item.status) !== '待入库') return;
      items.push({
        id: item.id,
        type: 'return',
        typeLabel: '设备退回单',
        title: item.id,
        subtitle: item.projectName || '-',
        status: item.status || '待入库',
        owner: approvalOwnerName(item) || '-',
        time: item.createTime || '-',
        amount: (Number(item.qty) || 0) + '台',
        routeType: 'app',
        actionText: '去处理'
      });
    });
    return items.sort(function (a, b) { return safeText(b.time).localeCompare(safeText(a.time)); });
  }

  function getAppSubmittedApprovalItems() {
    var user = currentUserName();
    var items = [];
    (getContractState().list || []).forEach(function (item) {
      if (approvalOwnerName(item) !== user && safeText(item.contractorRepName) !== user) return;
      items.push({
        id: item.id,
        type: 'contract',
        typeLabel: '合同',
        title: item.id,
        subtitle: item.projectName || item.customerName || '-',
        status: item.status || '-',
        owner: approvalOwnerName(item) || item.contractorRepName || '-',
        time: item.createTime || item.signDate || '-',
        amount: item.totalAmount ? ('¥' + formatMoney(item.totalAmount)) : '-',
        routeType: 'pc',
        actionText: '查看'
      });
    });
    (getProjectCostState().list || []).forEach(function (item) {
      if (approvalOwnerName(item) !== user) return;
      items.push({
        id: item.id,
        type: 'cost',
        typeLabel: '报价单',
        title: item.id,
        subtitle: item.projectName || '-',
        status: item.status || '-',
        owner: approvalOwnerName(item) || '-',
        time: item.createTime || '-',
        amount: '¥' + formatMoney(calcCostTotal(item.details || [])),
        routeType: 'app',
        actionText: '查看'
      });
    });
    (getManagedState('purchaseOrder').list || []).forEach(function (item) {
      if (approvalOwnerName(item) !== user) return;
      items.push({
        id: item.id,
        type: 'purchase',
        typeLabel: '采购单',
        title: item.id,
        subtitle: item.supplierName || '-',
        status: item.status || '-',
        owner: approvalOwnerName(item) || '-',
        time: item.createTime || '-',
        amount: item.amount || '-',
        routeType: 'app',
        actionText: '查看'
      });
    });
    (getManagedState('deviceRepair').list || []).map(function (item) { return normalizeDeviceRepairItem(item); }).forEach(function (item) {
      if (approvalOwnerName(item) !== user) return;
      items.push({
        id: item.id,
        type: 'repair',
        typeLabel: '设备返修单',
        title: item.id,
        subtitle: item.projectName || ((item.selectedDevices || [])[0] || {}).name || '-',
        status: item.status || '-',
        owner: approvalOwnerName(item) || '-',
        time: item.createTime || '-',
        amount: (Number(item.qty) || 0) + '台',
        routeType: 'pc',
        actionText: '查看'
      });
    });
    (getManagedState('deviceReturn').list || []).map(function (item) { return normalizeDeviceReturnItem(item); }).forEach(function (item) {
      if (approvalOwnerName(item) !== user) return;
      items.push({
        id: item.id,
        type: 'return',
        typeLabel: '设备退回单',
        title: item.id,
        subtitle: item.projectName || '-',
        status: item.status || '-',
        owner: approvalOwnerName(item) || '-',
        time: item.createTime || '-',
        amount: (Number(item.qty) || 0) + '台',
        routeType: 'app',
        actionText: '查看'
      });
    });
    return items.sort(function (a, b) { return safeText(b.time).localeCompare(safeText(a.time)); });
  }

  function appApprovalCardHTML(item) {
    var submitInfo = (escapeHtml(item.owner || '-') + ' · ' + escapeHtml(item.time || '-'));
    return '<button class="mobile-cost-card app-approval-card" data-action="app-approval-open" data-type="' + escapeHtml(item.type) + '" data-id="' + escapeHtml(item.id) + '">' +
      '<div class="mobile-cost-card-head"><strong>' + escapeHtml(item.title || '-') + '</strong></div>' +
      '<div class="mobile-cost-card-body">' +
      '<div class="mobile-cost-card-row"><span>单据类型</span><strong>' + escapeHtml(item.typeLabel || '-') + '</strong></div>' +
      '<div class="mobile-cost-card-row app-approval-row-info"><span>关联信息</span><strong class="app-approval-ellipsis-2">' + escapeHtml(item.subtitle || '-') + '</strong></div>' +
      '<div class="mobile-cost-card-row"><span>提交信息</span><strong>' + submitInfo + '</strong></div>' +
      '</div></button>';
  }

  function openAppApprovalItem(type, id) {
    if (type === 'cost') return openAppCostDetail('approve', id);
    if (type === 'purchase') return openAppPurchaseDetail('approve', id);
    if (type === 'return') {
      var item = normalizeDeviceReturnItem(findManagedItem('deviceReturn', id) || {});
      return openAppDeviceReturnDetail(safeText(item.status) === '待入库' ? 'inbound' : 'view', id);
    }
    if (type === 'contract') return setRoute('/pc/contract/list');
    if (type === 'repair') return setRoute('/pc/asset/repair');
  }

  function appApprovalHTML() {
    var view = appState.ui.appApprovalView || 'pending';
    var rows = view === 'submitted' ? getAppSubmittedApprovalItems() : getAppPendingApprovalItems();
    return '<section class="mobile-section app-approval-section"><div class="section-title"><h4>' + (view === 'submitted' ? '已提交' : '待审批') + '</h4><button class="btn secondary btn-sm" data-action="app-approval-switch" data-view="' + (view === 'submitted' ? 'pending' : 'submitted') + '">' + (view === 'submitted' ? '待审批' : '已提交') + '</button></div><div class="mobile-cost-list">' + ((rows.map(function (item) {
      return appApprovalCardHTML(item);
    }).join('')) || '<div class="empty-state">' + (view === 'submitted' ? '暂无我提交的审批单据' : '暂无待处理审批') + '</div>') + '</div></section>';
  }

  function appProfileHTML() {
    return '<section class="profile-card"><div class="avatar">李</div><div><h3>李国华</h3><p>总经办 · 系统管理员</p><span>手机：139****1001</span></div></section><section class="mobile-section"><div class="section-title"><h4>个人工作台</h4><span>常用入口</span></div><div class="app-grid"><button class="app-grid-item" data-route="/app/approval"><strong>6</strong><span>我的审批</span></button><button class="app-grid-item" data-route="/app/message"><strong>28</strong><span>我的消息</span></button><button class="app-grid-item" data-route="/pc/system/user"><strong>18</strong><span>组织用户</span></button><button class="app-grid-item" data-route="/pc/dashboard"><strong>1</strong><span>综合驾驶舱</span></button></div></section>';
  }

  function renderPC(route) {
    var breadcrumb = getBreadcrumb(route);
    var menuRoute = route === '/pc/project/workorder-detail'
      ? ((appState.ui.currentWorkorderDetail || {}).type === 'construction' ? '/pc/project/construction-workorder' : (appState.ui.currentWorkorderDetail || {}).type === 'maintenance' ? '/pc/project/maintenance-workorder' : '/pc/project/survey-workorder')
      : route;
    return [
      '<div class="screen screen-pc">',
      '<aside class="sidebar"><div class="brand"><div class="brand-badge">CQCT</div><div><h1>项目管理系统</h1><p>演示版 · Project Demo Suite</p></div></div>',
      '<nav class="menu">',
      data.pcMenu.map(function (item) {
        var hasActiveChild = (item.children || []).some(function (child) { return child.route === menuRoute; });
        var active = item.route === menuRoute || hasActiveChild;
        return '<div class="menu-group ' + (active ? 'active' : '') + '"><div class="menu-item ' + (item.route === menuRoute ? 'current' : '') + '" data-route="' + (item.route || (item.children && item.children[0].route) || '') + '"><span class="menu-icon">' + item.icon + '</span><span>' + item.label + '</span></div>' +
          (item.children ? '<div class="submenu ' + (item.children.length >= 8 ? 'submenu-dense' : '') + '">' + item.children.map(function (child) {
            return '<div class="submenu-item ' + (child.route === menuRoute ? 'current' : '') + '" data-route="' + child.route + '">' + child.label + '</div>';
          }).join('') + '</div>' : '') + '</div>';
      }).join(''),
      '</nav></aside>',
      '<section class="main-shell"><header class="topbar"><div><div class="breadcrumb">' + breadcrumb.map(function (name) { return '<span>' + name + '</span>'; }).join('<i>/</i>') + '</div><h2>' + getPageTitle(route) + '</h2></div>',
      '<div class="topbar-actions"><div class="switcher"><button class="switch-btn active" data-route="/pc/dashboard">PC端</button><button class="switch-btn" data-route="/app/home">APP端</button></div><div class="user-pill">管理员 · 李国华</div></div></header>',
      '<main class="page-body">' + (route === '/pc/dashboard' ? pcDashboardHTML() : genericPageHTML(route)) + '</main></section></div>'
    ].join('');
  }

  function renderApp(route) {
    var body = appHomeHTML();
    if (route === '/app/project-cost') body = appProjectCostEntryHTML();
    if (route === '/app/project-cost/detail') body = appProjectCostDetailHTML();
    if (route === '/app/purchase-order') body = appPurchaseOrderListHTML();
    if (route === '/app/purchase-order/detail') body = appPurchaseOrderDetailHTML();
    if (route === '/app/device-receive') body = appDeviceReceiveListHTML();
    if (route === '/app/device-receive/detail') body = appDeviceReceiveDetailHTML();
    if (route === '/app/device-return') body = appDeviceReturnListHTML();
    if (route === '/app/device-return/detail') body = appDeviceReturnDetailHTML();
    if (route === '/app/survey-workorder') body = appSurveyWorkorderListHTML();
    if (route === '/app/survey-workorder/detail') body = appSurveyWorkorderDetailHTML();
    if (route === '/app/construction-workorder') body = appConstructionWorkorderListHTML();
    if (route === '/app/construction-workorder/detail') body = appConstructionWorkorderDetailHTML();
    if (route === '/app/maintenance-workorder') body = appMaintenanceWorkorderListHTML();
    if (route === '/app/maintenance-workorder/detail') body = appMaintenanceWorkorderDetailHTML();
    if (route === '/app/message') body = appMessageHTML();
    if (route === '/app/approval') body = appApprovalHTML();
    if (route === '/app/profile') body = appProfileHTML();
    var appBackRoute = route === '/app/project-cost/detail' ? '/app/project-cost' : route === '/app/purchase-order/detail' ? '/app/purchase-order' : route === '/app/device-receive/detail' ? '/app/device-receive' : route === '/app/device-return/detail' ? '/app/device-return' : route === '/app/survey-workorder/detail' ? '/app/survey-workorder' : route === '/app/construction-workorder/detail' ? '/app/construction-workorder' : route === '/app/maintenance-workorder/detail' ? '/app/maintenance-workorder' : '/app/home';
    var showBottomNav = route === '/app/home' || route === '/app/message' || route === '/app/approval' || route === '/app/profile';
    var costDetailItem = route === '/app/project-cost/detail' ? currentAppCostDetailItem() : null;
    var costDetailMode = appState.ui.currentAppCostDetailMode || 'view';
    var purchaseDetailItem = route === '/app/purchase-order/detail' ? currentAppPurchaseDetailItem() : null;
    var purchaseDetailMode = appState.ui.currentAppPurchaseDetailMode || 'view';
    var deviceReceiveDetailItem = route === '/app/device-receive/detail' ? currentAppDeviceReceiveDetailItem() : null;
    var deviceReceiveDetailMode = appState.ui.currentAppDeviceReceiveDetailMode || 'view';
    var deviceReturnDetailItem = route === '/app/device-return/detail' ? currentAppDeviceReturnDetailItem() : null;
    var deviceReturnDetailMode = appState.ui.currentAppDeviceReturnDetailMode || 'view';
    var surveyDetailItem = route === '/app/survey-workorder/detail' ? currentAppSurveyDetailItem() : null;
    var surveyDetailMode = appState.ui.currentAppSurveyDetailMode || 'view';
    var constructionDetailItem = route === '/app/construction-workorder/detail' ? currentAppConstructionDetailItem() : null;
    var constructionDetailMode = appState.ui.currentAppConstructionDetailMode || 'view';
    var maintenanceDetailItem = route === '/app/maintenance-workorder/detail' ? currentAppMaintenanceDetailItem() : null;
    var maintenanceDetailMode = appState.ui.currentAppMaintenanceDetailMode || 'view';
    var topbarAction = route === '/app/project-cost'
      ? '<button class="btn primary mobile-topbar-action mobile-icon-btn" data-action="app-cost-create" aria-label="新增">＋</button>'
      : route === '/app/project-cost/detail' && costDetailItem && costDetailMode === 'view'
        ? '<div class="mobile-topbar-actions"><button class="btn secondary mobile-topbar-action-icon mobile-icon-btn" data-action="app-cost-more-toggle" aria-label="更多">⋯</button>' + (appState.ui.appCostMoreOpen ? '<div class="mobile-topbar-more-menu"><button class="mobile-topbar-more-item" data-action="app-cost-edit" data-id="' + escapeHtml(costDetailItem.id) + '">编辑</button><button class="mobile-topbar-more-item" data-action="app-cost-approve" data-id="' + escapeHtml(costDetailItem.id) + '">审批</button><button class="mobile-topbar-more-item danger" data-action="app-cost-revoke" data-id="' + escapeHtml(costDetailItem.id) + '">撤回</button></div>' : '') + '</div>'
      : route === '/app/purchase-order'
        ? '<button class="btn primary mobile-topbar-action mobile-icon-btn" data-action="app-purchase-create" data-route="/app/purchase-order/detail" aria-label="新增">＋</button>'
        : route === '/app/purchase-order/detail' && purchaseDetailItem && purchaseDetailMode === 'view'
          ? '<div class="mobile-topbar-actions"><button class="btn secondary mobile-topbar-action-icon mobile-icon-btn" data-action="app-purchase-more-toggle" aria-label="更多">⋯</button>' + (appState.ui.appPurchaseMoreOpen ? '<div class="mobile-topbar-more-menu">' + (safeText(purchaseDetailItem.status) === '待审核' ? '<button class="mobile-topbar-more-item" data-action="app-purchase-approve" data-id="' + escapeHtml(purchaseDetailItem.id) + '">审核</button>' : '') + (safeText(purchaseDetailItem.inboundStatus) === '待入库' ? '<button class="mobile-topbar-more-item" data-action="app-purchase-inbound" data-id="' + escapeHtml(purchaseDetailItem.id) + '">入库</button>' : '') + '<button class="mobile-topbar-more-item" data-action="app-purchase-edit" data-id="' + escapeHtml(purchaseDetailItem.id) + '">编辑</button><button class="mobile-topbar-more-item danger" data-action="app-purchase-delete" data-id="' + escapeHtml(purchaseDetailItem.id) + '">删除</button></div>' : '') + '</div>'
      : route === '/app/device-receive'
        ? '<button class="btn primary mobile-topbar-action mobile-icon-btn" data-action="app-device-receive-create" aria-label="新增">＋</button>'
        : route === '/app/device-receive/detail' && deviceReceiveDetailItem && deviceReceiveDetailMode === 'view'
          ? '<div class="mobile-topbar-actions"><button class="btn secondary mobile-topbar-action-icon mobile-icon-btn" data-action="app-device-receive-more-toggle" aria-label="更多">⋯</button>' + (appState.ui.appDeviceReceiveMoreOpen ? '<div class="mobile-topbar-more-menu">' + (safeText(deviceReceiveDetailItem.status) === '待审核' ? '<button class="mobile-topbar-more-item" data-action="app-device-receive-approve" data-id="' + escapeHtml(deviceReceiveDetailItem.id) + '">审批</button>' : '') + (safeText(deviceReceiveDetailItem.status) === '待出库' ? '<button class="mobile-topbar-more-item" data-action="app-device-receive-outbound" data-id="' + escapeHtml(deviceReceiveDetailItem.id) + '">出库</button>' : '') + '<button class="mobile-topbar-more-item" data-action="app-device-receive-edit" data-id="' + escapeHtml(deviceReceiveDetailItem.id) + '">编辑</button><button class="mobile-topbar-more-item" data-action="app-device-receive-revoke" data-id="' + escapeHtml(deviceReceiveDetailItem.id) + '">撤回</button><button class="mobile-topbar-more-item danger" data-action="app-device-receive-delete" data-id="' + escapeHtml(deviceReceiveDetailItem.id) + '">删除</button></div>' : '') + '</div>'
      : route === '/app/device-return'
        ? '<button class="btn primary mobile-topbar-action mobile-icon-btn" data-action="app-device-return-create" aria-label="新增">＋</button>'
        : route === '/app/device-return/detail' && deviceReturnDetailItem && deviceReturnDetailMode === 'view'
          ? '<div class="mobile-topbar-actions"><button class="btn secondary mobile-topbar-action-icon mobile-icon-btn" data-action="app-device-return-more-toggle" aria-label="更多">⋯</button>' + (appState.ui.appDeviceReturnMoreOpen ? '<div class="mobile-topbar-more-menu">' + (safeText(deviceReturnDetailItem.status) === '待入库' ? '<button class="mobile-topbar-more-item" data-action="app-device-return-inbound" data-id="' + escapeHtml(deviceReturnDetailItem.id) + '">入库</button>' : '') + '<button class="mobile-topbar-more-item" data-action="app-device-return-edit" data-id="' + escapeHtml(deviceReturnDetailItem.id) + '">编辑</button><button class="mobile-topbar-more-item" data-action="app-device-return-revoke" data-id="' + escapeHtml(deviceReturnDetailItem.id) + '">撤回</button><button class="mobile-topbar-more-item danger" data-action="app-device-return-delete" data-id="' + escapeHtml(deviceReturnDetailItem.id) + '">删除</button></div>' : '') + '</div>'
      : route === '/app/survey-workorder'
        ? '<button class="btn primary mobile-topbar-action mobile-icon-btn" data-action="app-survey-create" aria-label="新增">＋</button>'
        : route === '/app/survey-workorder/detail' && surveyDetailItem && surveyDetailMode === 'view'
          ? '<div class="mobile-topbar-actions"><button class="btn secondary mobile-topbar-action-icon mobile-icon-btn" data-action="app-survey-more-toggle" aria-label="更多">⋯</button>' + (appState.ui.appSurveyMoreOpen ? '<div class="mobile-topbar-more-menu"><button class="mobile-topbar-more-item" data-action="app-survey-edit" data-id="' + escapeHtml(surveyDetailItem.id) + '">编辑</button><button class="mobile-topbar-more-item" data-action="app-survey-revoke" data-id="' + escapeHtml(surveyDetailItem.id) + '">撤回</button><button class="mobile-topbar-more-item danger" data-action="app-survey-delete" data-id="' + escapeHtml(surveyDetailItem.id) + '">删除</button></div>' : '') + '</div>'
          : route === '/app/construction-workorder'
            ? '<button class="btn primary mobile-topbar-action mobile-icon-btn" data-action="app-construction-create" aria-label="新增">＋</button>'
            : route === '/app/construction-workorder/detail' && constructionDetailItem && constructionDetailMode === 'view'
              ? '<div class="mobile-topbar-actions"><button class="btn secondary mobile-topbar-action-icon mobile-icon-btn" data-action="app-construction-more-toggle" aria-label="更多">⋯</button>' + (appState.ui.appConstructionMoreOpen ? '<div class="mobile-topbar-more-menu"><button class="mobile-topbar-more-item" data-action="app-construction-edit" data-id="' + escapeHtml(constructionDetailItem.id) + '">编辑</button><button class="mobile-topbar-more-item" data-action="app-construction-revoke" data-id="' + escapeHtml(constructionDetailItem.id) + '">撤回</button><button class="mobile-topbar-more-item danger" data-action="app-construction-delete" data-id="' + escapeHtml(constructionDetailItem.id) + '">删除</button></div>' : '') + '</div>'
            : route === '/app/maintenance-workorder'
              ? '<button class="btn primary mobile-topbar-action mobile-icon-btn" data-action="app-maintenance-create" aria-label="新增">＋</button>'
              : route === '/app/maintenance-workorder/detail' && maintenanceDetailItem && maintenanceDetailMode === 'view'
                ? '<div class="mobile-topbar-actions"><button class="btn secondary mobile-topbar-action-icon mobile-icon-btn" data-action="app-maintenance-more-toggle" aria-label="更多">⋯</button>' + (appState.ui.appMaintenanceMoreOpen ? '<div class="mobile-topbar-more-menu"><button class="mobile-topbar-more-item" data-action="app-maintenance-edit" data-id="' + escapeHtml(maintenanceDetailItem.id) + '">编辑</button><button class="mobile-topbar-more-item" data-action="app-maintenance-revoke" data-id="' + escapeHtml(maintenanceDetailItem.id) + '">撤回</button><button class="mobile-topbar-more-item danger" data-action="app-maintenance-delete" data-id="' + escapeHtml(maintenanceDetailItem.id) + '">删除</button></div>' : '') + '</div>'
            : '';
    var showBackBtn = !{ '/app/home': 1, '/app/message': 1, '/app/approval': 1, '/app/profile': 1 }[route];
    return [
      '<div class="screen screen-app-shell"><button class="app-floating-pc" data-route="/pc/dashboard">切换至PC端</button><div class="device-frame"><div class="device-notch"></div><div class="screen-app">',
      '<header class="mobile-topbar">' + (showBackBtn ? '<button class="mobile-back-btn" data-route="' + appBackRoute + '" aria-label="返回">‹</button>' : '') + '<div><h2>' + (route === '/app/home' ? '城投项目管理系统' : routeMeta[route].title) + '</h2></div>' + topbarAction + (((route === '/app/project-cost/detail' && appState.ui.appCostMoreOpen) || (route === '/app/purchase-order/detail' && appState.ui.appPurchaseMoreOpen) || (route === '/app/device-receive/detail' && appState.ui.appDeviceReceiveMoreOpen) || (route === '/app/device-return/detail' && appState.ui.appDeviceReturnMoreOpen) || (route === '/app/survey-workorder/detail' && appState.ui.appSurveyMoreOpen) || (route === '/app/construction-workorder/detail' && appState.ui.appConstructionMoreOpen) || (route === '/app/maintenance-workorder/detail' && appState.ui.appMaintenanceMoreOpen)) ? '<button class="mobile-topbar-more-mask" data-action="' + (route === '/app/project-cost/detail' ? 'app-cost-more-toggle' : route === '/app/purchase-order/detail' ? 'app-purchase-more-toggle' : route === '/app/device-receive/detail' ? 'app-device-receive-more-toggle' : route === '/app/device-return/detail' ? 'app-device-return-more-toggle' : route === '/app/survey-workorder/detail' ? 'app-survey-more-toggle' : route === '/app/construction-workorder/detail' ? 'app-construction-more-toggle' : 'app-maintenance-more-toggle') + '" aria-label="关闭更多"></button>' : '') + '</header>',
      '<main class="mobile-body">' + body + '</main>',
      (showBottomNav ? '<footer class="bottom-nav">' + data.appTabs.map(function (tab) {
        return '<button class="bottom-item ' + (tab.route === route ? 'current' : '') + '" data-route="' + tab.route + '"><span>' + tab.icon + '</span><label>' + tab.label + '</label></button>';
      }).join('') + '</footer>' : ''),
      '</div></div></div>'
    ].join('');
  }

  function renderCharts(route) {
    if (route === '/pc/dashboard') {
      echarts.init(document.getElementById('chart-customer-scale')).setOption(data.dashboard.customerScaleChart);
      echarts.init(document.getElementById('chart-customer-channel')).setOption(data.dashboard.customerChannelChart);
      echarts.init(document.getElementById('chart-project-status')).setOption(data.dashboard.projectStatusChart);
      echarts.init(document.getElementById('chart-project-trend-30d')).setOption(data.dashboard.projectApprovalTrend30dChart);
      echarts.init(document.getElementById('chart-device-status')).setOption(data.dashboard.deviceStatusChart);
      echarts.init(document.getElementById('chart-device-online-offline')).setOption(data.dashboard.deviceOnlineOfflineChart);
      echarts.init(document.getElementById('chart-device-category')).setOption(data.dashboard.deviceCategoryChart);
      echarts.init(document.getElementById('chart-contract-trend')).setOption(data.dashboard.contractTrendChart);
      echarts.init(document.getElementById('chart-invoice-trend')).setOption(dashboardAnalysisChartOption());
      return;
    }
    if (route === '/pc/finance/performance') {
      var activeTab = getPerformanceState().activeTab || 'sales';
      var rows = activeTab === 'sales' ? buildSalesPerformanceRows() : buildEngineerPerformanceRows();
      var topRows = rows.slice().sort(function (a, b) {
        var left = activeTab === 'sales' ? a.receiptAmount : a.totalCount;
        var right = activeTab === 'sales' ? b.receiptAmount : b.totalCount;
        return right - left;
      }).slice(0, 6);
      var mainOption = activeTab === 'sales'
        ? {
            tooltip: { trigger: 'axis' },
            legend: { textStyle: { color: '#d7e7ff' } },
            grid: { left: 40, right: 20, top: 40, bottom: 30 },
            xAxis: { type: 'category', data: rows.map(function (item) { return item.name; }), axisLabel: { color: '#aac1e7' }, axisLine: { lineStyle: { color: 'rgba(170,193,231,.35)' } } },
            yAxis: { type: 'value', axisLabel: { color: '#aac1e7' }, splitLine: { lineStyle: { color: 'rgba(170,193,231,.12)' } } },
            series: [
              { name: '新签合同金额', type: 'bar', barMaxWidth: 28, itemStyle: { color: '#16c7ff' }, data: rows.map(function (item) { return item.signedAmount; }) },
              { name: '回款金额', type: 'bar', barMaxWidth: 28, itemStyle: { color: '#25d18a' }, data: rows.map(function (item) { return item.receiptAmount; }) }
            ]
          }
        : {
            tooltip: { trigger: 'axis' },
            legend: { textStyle: { color: '#d7e7ff' } },
            grid: { left: 40, right: 20, top: 40, bottom: 30 },
            xAxis: { type: 'category', data: rows.map(function (item) { return item.name; }), axisLabel: { color: '#aac1e7' }, axisLine: { lineStyle: { color: 'rgba(170,193,231,.35)' } } },
            yAxis: { type: 'value', axisLabel: { color: '#aac1e7' }, splitLine: { lineStyle: { color: 'rgba(170,193,231,.12)' } } },
            series: [
              { name: '工勘数量', type: 'bar', barMaxWidth: 18, itemStyle: { color: '#16c7ff', borderRadius: [6, 6, 0, 0] }, data: rows.map(function (item) { return item.surveyCount; }) },
              { name: '施工数量', type: 'bar', barMaxWidth: 18, itemStyle: { color: '#25d18a', borderRadius: [6, 6, 0, 0] }, data: rows.map(function (item) { return item.constructionCount; }) },
              { name: '运维数量', type: 'bar', barMaxWidth: 18, itemStyle: { color: '#ffb347', borderRadius: [6, 6, 0, 0] }, data: rows.map(function (item) { return item.maintenanceCount; }) }
            ]
          };
      var rankOption = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: 80, right: 20, top: 20, bottom: 20 },
        xAxis: { type: 'value', axisLabel: { color: '#aac1e7' }, splitLine: { lineStyle: { color: 'rgba(170,193,231,.12)' } } },
        yAxis: { type: 'category', data: topRows.map(function (item) { return item.name; }), axisLabel: { color: '#aac1e7' }, axisLine: { lineStyle: { color: 'rgba(170,193,231,.35)' } } },
        series: [{
          type: 'bar',
          barMaxWidth: 18,
          itemStyle: { color: activeTab === 'sales' ? '#25d18a' : '#16c7ff', borderRadius: [0, 6, 6, 0] },
          data: topRows.map(function (item) { return activeTab === 'sales' ? item.receiptAmount : item.totalCount; })
        }]
      };
      echarts.init(document.getElementById('chart-performance-main')).setOption(mainOption);
      echarts.init(document.getElementById('chart-performance-rank')).setOption(rankOption);
      return;
    }
    if (route.indexOf('/pc/') === 0) {
      var option = /finance/.test(route)
        ? data.dashboardCharts.yearlyProjectAmount
        : /asset|purchase/.test(route)
          ? data.dashboardCharts.workorderDistribution
          : data.dashboardCharts.customerGrowth;
      echarts.init(document.getElementById('chart-generic')).setOption(option);
    }
  }

  function bindActions() {
    root.querySelectorAll('[data-dashboard-analysis-period]').forEach(function (node) {
      node.addEventListener('change', function () {
        appState.ui.dashboardAnalysis.periodEnd = node.value;
        var chartDom = document.getElementById('chart-invoice-trend');
        if (chartDom) echarts.init(chartDom).setOption(dashboardAnalysisChartOption());
      });
    });
    root.querySelectorAll('[data-route]').forEach(function (node) {
      node.addEventListener('click', function () {
        var action = node.getAttribute('data-action');
        if (action === 'app-purchase-create') return openAppPurchaseDetail('create');
        if (action === 'app-purchase-view') return openAppPurchaseDetail('view', node.getAttribute('data-id'));
        setRoute(node.getAttribute('data-route'));
      });
    });
    root.querySelectorAll('[data-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getCustomerArchiveState().filters[node.getAttribute('data-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getCustomerArchiveState().filters[node.getAttribute('data-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-follow-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getCustomerFollowState().filters[node.getAttribute('data-follow-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getCustomerFollowState().filters[node.getAttribute('data-follow-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-project-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getProjectArchiveState().filters[node.getAttribute('data-project-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getProjectArchiveState().filters[node.getAttribute('data-project-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-cost-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getProjectCostState().filters[node.getAttribute('data-cost-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getProjectCostState().filters[node.getAttribute('data-cost-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-cost-calc]').forEach(function (node) {
      node.addEventListener('input', updateCostLiveTotals);
    });
    root.querySelectorAll('[data-purchase-calc]').forEach(function (node) {
      node.addEventListener('input', function () {
        syncPurchaseOrderDetailValue(node.getAttribute('data-index'), node.getAttribute('data-purchase-calc'), node.value);
        updatePurchaseOrderLiveTotals();
      });
      node.addEventListener('change', function () {
        syncPurchaseOrderDetailValue(node.getAttribute('data-index'), node.getAttribute('data-purchase-calc'), node.value);
        updatePurchaseOrderLiveTotals();
      });
    });
    root.querySelectorAll('[data-purchase-detail-field]').forEach(function (node) {
      node.addEventListener('change', function () {
        updatePurchaseOrderDetailField(node.getAttribute('data-index'), node.getAttribute('data-purchase-detail-field'), node.value);
      });
    });
    root.querySelectorAll('[data-survey-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getSurveyWorkorderState().filters[node.getAttribute('data-survey-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getSurveyWorkorderState().filters[node.getAttribute('data-survey-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-construction-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getConstructionWorkorderState().filters[node.getAttribute('data-construction-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getConstructionWorkorderState().filters[node.getAttribute('data-construction-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-maintenance-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getMaintenanceWorkorderState().filters[node.getAttribute('data-maintenance-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getMaintenanceWorkorderState().filters[node.getAttribute('data-maintenance-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-sales-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getSalespersonState().filters[node.getAttribute('data-sales-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getSalespersonState().filters[node.getAttribute('data-sales-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-team-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getSalesTeamState().filters[node.getAttribute('data-team-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getSalesTeamState().filters[node.getAttribute('data-team-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-engineer-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getEngineerState().filters[node.getAttribute('data-engineer-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getEngineerState().filters[node.getAttribute('data-engineer-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-engineer-team-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getEngineerTeamState().filters[node.getAttribute('data-engineer-team-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getEngineerTeamState().filters[node.getAttribute('data-engineer-team-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-vehicle-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getVehicleLogState().filters[node.getAttribute('data-vehicle-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getVehicleLogState().filters[node.getAttribute('data-vehicle-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-managed-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        var key = node.getAttribute('data-managed-key');
        getManagedState(key).filters[node.getAttribute('data-managed-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        var key = node.getAttribute('data-managed-key');
        getManagedState(key).filters[node.getAttribute('data-managed-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-contract-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getContractState().filters[node.getAttribute('data-contract-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getContractState().filters[node.getAttribute('data-contract-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-model-brand-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('model').filters[node.getAttribute('data-model-brand-filter')] = node.value;
        render();
      });
      node.addEventListener('change', function () {
        getManagedState('model').filters[node.getAttribute('data-model-brand-filter')] = node.value;
        render();
      });
    });
    root.querySelectorAll('[data-device-archive-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('deviceArchive').filters[node.getAttribute('data-device-archive-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getManagedState('deviceArchive').filters[node.getAttribute('data-device-archive-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-inventory-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('inventory').filters[node.getAttribute('data-inventory-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getManagedState('inventory').filters[node.getAttribute('data-inventory-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-inventory-stock-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('inventory').stockFilters[node.getAttribute('data-inventory-stock-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getManagedState('inventory').stockFilters[node.getAttribute('data-inventory-stock-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-device-receive-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('deviceReceive').filters[node.getAttribute('data-device-receive-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getManagedState('deviceReceive').filters[node.getAttribute('data-device-receive-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-device-return-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('deviceReturn').filters[node.getAttribute('data-device-return-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getManagedState('deviceReturn').filters[node.getAttribute('data-device-return-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-device-repair-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('deviceRepair').filters[node.getAttribute('data-device-repair-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getManagedState('deviceRepair').filters[node.getAttribute('data-device-repair-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-device-scrap-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('deviceScrap').filters[node.getAttribute('data-device-scrap-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getManagedState('deviceScrap').filters[node.getAttribute('data-device-scrap-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-device-inbound-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('inboundRecord').filters[node.getAttribute('data-device-inbound-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getManagedState('inboundRecord').filters[node.getAttribute('data-device-inbound-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-device-outbound-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('outboundRecord').filters[node.getAttribute('data-device-outbound-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getManagedState('outboundRecord').filters[node.getAttribute('data-device-outbound-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-alarm-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('alarmRecord').filters[node.getAttribute('data-alarm-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getManagedState('alarmRecord').filters[node.getAttribute('data-alarm-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-alarm-process-field]').forEach(function (node) {
      node.addEventListener('input', function () {
        syncAlarmProcessField(node.getAttribute('data-alarm-process-field'), node.value);
      });
      node.addEventListener('change', function () {
        syncAlarmProcessField(node.getAttribute('data-alarm-process-field'), node.value);
      });
    });
    root.querySelectorAll('[data-investor-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('investor').filters[node.getAttribute('data-investor-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getManagedState('investor').filters[node.getAttribute('data-investor-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-project-profit-filter]').forEach(function (node) {
      node.addEventListener('input', function () {
        getManagedState('projectProfit').filters[node.getAttribute('data-project-profit-filter')] = node.value;
      });
      node.addEventListener('change', function () {
        getManagedState('projectProfit').filters[node.getAttribute('data-project-profit-filter')] = node.value;
      });
    });
    root.querySelectorAll('[data-receive-card-project]').forEach(function (node) {
      node.addEventListener('change', function () {
        syncDeviceReceiveCardProject(Number(node.getAttribute('data-receive-card-project')), node.value);
      });
    });
    root.querySelectorAll('[data-receive-field]').forEach(function (node) {
      node.addEventListener('input', function () {
        syncDeviceReceiveNeedField(Number(node.getAttribute('data-receive-card')), Number(node.getAttribute('data-receive-need')), node.getAttribute('data-receive-field'), node.value);
      });
      node.addEventListener('change', function () {
        syncDeviceReceiveNeedField(Number(node.getAttribute('data-receive-card')), Number(node.getAttribute('data-receive-need')), node.getAttribute('data-receive-field'), node.value);
      });
    });
    root.querySelectorAll('[data-upper-for]').forEach(function (node) {
      var name = node.getAttribute('data-upper-for');
      var input = root.querySelector('input[name="' + name + '"]');
      if (input) {
        input.addEventListener('input', function () {
          node.textContent = rmbUpper(input.value);
        });
      }
    });
    root.querySelectorAll('[data-contract-product]').forEach(function (node) {
      node.addEventListener('change', function () {
        updateContractPricingTotals();
      });
    });
    root.querySelectorAll('[data-contract-spec]').forEach(function (node) {
      node.addEventListener('change', function () {
        updateContractPricingTotals();
      });
    });
    root.querySelectorAll('[data-contract-calc]').forEach(function (node) {
      node.addEventListener('input', updateContractPricingTotals);
      node.addEventListener('change', updateContractPricingTotals);
    });
    var contractTaxRateInput = root.querySelector('#contract-form input[name="taxRate"]');
    if (contractTaxRateInput) {
      contractTaxRateInput.addEventListener('input', updateContractPricingTotals);
      contractTaxRateInput.addEventListener('change', updateContractPricingTotals);
    }
    root.querySelectorAll('[data-receipt-contract]').forEach(function (node) {
      node.addEventListener('change', function () {
        syncReceiptProjectField(node.value);
      });
    });
    root.querySelectorAll('[data-invoice-contract]').forEach(function (node) {
      node.addEventListener('change', function () {
        syncInvoiceProjectField(node.value);
      });
    });
    root.querySelectorAll('[data-performance-filter]').forEach(function (node) {
      function syncPerformanceFilter() {
        var key = node.getAttribute('data-performance-filter');
        var parts = key.split('-');
        var group = parts[0] === 'sales' ? 'salesFilters' : 'engineerFilters';
        var filterKey = parts.slice(1).join('-');
        getPerformanceState()[group][filterKey] = node.value;
      }
      node.addEventListener('input', syncPerformanceFilter);
      node.addEventListener('change', syncPerformanceFilter);
    });
    root.querySelectorAll('[data-app-cost-filter]').forEach(function (node) {
      function syncAppCostFilter() {
        appState.ui.appCostFilters[node.getAttribute('data-app-cost-filter')] = node.value;
      }
      node.addEventListener('input', syncAppCostFilter);
      node.addEventListener('change', syncAppCostFilter);
    });
    root.querySelectorAll('[data-app-cost-detail]').forEach(function (node) {
      function syncAppCostDetailNode() {
        syncAppCostDetailField(Number(node.getAttribute('data-index')), node.getAttribute('data-app-cost-detail'), node.value);
        render();
      }
      node.addEventListener('input', syncAppCostDetailNode);
      node.addEventListener('change', syncAppCostDetailNode);
    });
    root.querySelectorAll('[data-app-cost-base]').forEach(function (node) {
      function syncAppCostBaseNode() {
        syncAppCostBaseField(node.getAttribute('data-app-cost-base'), node.value);
        render();
      }
      node.addEventListener('input', syncAppCostBaseNode);
      node.addEventListener('change', syncAppCostBaseNode);
    });
    root.querySelectorAll('[data-app-purchase-filter]').forEach(function (node) {
      function syncAppPurchaseFilter() {
        appState.ui.appPurchaseFilters[node.getAttribute('data-app-purchase-filter')] = node.value;
      }
      node.addEventListener('input', syncAppPurchaseFilter);
      node.addEventListener('change', syncAppPurchaseFilter);
    });
    root.querySelectorAll('[data-app-purchase-base]').forEach(function (node) {
      function syncAppPurchaseBaseNode() {
        syncAppPurchaseBaseField(node.getAttribute('data-app-purchase-base'), node.value);
        render();
      }
      node.addEventListener('input', syncAppPurchaseBaseNode);
      node.addEventListener('change', syncAppPurchaseBaseNode);
    });
    root.querySelectorAll('[data-app-purchase-detail-field]').forEach(function (node) {
      function syncAppPurchaseDetailNode() {
        syncAppPurchaseDetailField(Number(node.getAttribute('data-index')), node.getAttribute('data-app-purchase-detail-field'), node.value);
        render();
      }
      node.addEventListener('change', syncAppPurchaseDetailNode);
    });
    root.querySelectorAll('[data-app-purchase-detail-calc]').forEach(function (node) {
      function syncAppPurchaseCalcNode() {
        syncAppPurchaseCalcField(Number(node.getAttribute('data-index')), node.getAttribute('data-app-purchase-detail-calc'), node.value);
        render();
      }
      node.addEventListener('input', syncAppPurchaseCalcNode);
      node.addEventListener('change', syncAppPurchaseCalcNode);
    });
    root.querySelectorAll('[data-app-device-receive-filter]').forEach(function (node) {
      function syncAppDeviceReceiveFilter() {
        appState.ui.appDeviceReceiveFilters[node.getAttribute('data-app-device-receive-filter')] = node.value;
      }
      node.addEventListener('input', syncAppDeviceReceiveFilter);
      node.addEventListener('change', syncAppDeviceReceiveFilter);
    });
    root.querySelectorAll('[data-app-device-receive-base]').forEach(function (node) {
      function syncAppDeviceReceiveBaseNode() {
        syncAppDeviceReceiveBaseField(node.getAttribute('data-app-device-receive-base'), node.value);
        render();
      }
      node.addEventListener('input', syncAppDeviceReceiveBaseNode);
      node.addEventListener('change', syncAppDeviceReceiveBaseNode);
    });
    root.querySelectorAll('[data-app-device-receive-card-project]').forEach(function (node) {
      function syncAppDeviceReceiveCardNode() {
        syncAppDeviceReceiveProject(Number(node.getAttribute('data-app-device-receive-card-project')), node.value);
        render();
      }
      node.addEventListener('change', syncAppDeviceReceiveCardNode);
    });
    root.querySelectorAll('[data-app-device-receive-need-field]').forEach(function (node) {
      function syncAppDeviceReceiveNeedNode() {
        syncAppDeviceReceiveNeedField(Number(node.getAttribute('data-card-index')), Number(node.getAttribute('data-need-index')), node.getAttribute('data-app-device-receive-need-field'), node.value);
        render();
      }
      node.addEventListener('input', syncAppDeviceReceiveNeedNode);
      node.addEventListener('change', syncAppDeviceReceiveNeedNode);
    });
    root.querySelectorAll('[data-app-device-return-filter]').forEach(function (node) {
      function syncAppDeviceReturnFilter() {
        appState.ui.appDeviceReturnFilters[node.getAttribute('data-app-device-return-filter')] = node.value;
      }
      node.addEventListener('input', syncAppDeviceReturnFilter);
      node.addEventListener('change', syncAppDeviceReturnFilter);
    });
    root.querySelectorAll('[data-app-device-return-picker-filter]').forEach(function (node) {
      function syncAppDeviceReturnPickerFilter() {
        var key = node.getAttribute('data-app-device-return-picker-filter');
        appState.ui.appDeviceReturnPickerFilters[key] = node.value;
        if (key === 'category') {
          appState.ui.appDeviceReturnPickerFilters.brand = '';
          appState.ui.appDeviceReturnPickerFilters.model = '';
        } else if (key === 'brand') {
          appState.ui.appDeviceReturnPickerFilters.model = '';
        }
        if (node.tagName === 'SELECT') render();
      }
      node.addEventListener('input', syncAppDeviceReturnPickerFilter);
      node.addEventListener('change', syncAppDeviceReturnPickerFilter);
    });
    root.querySelectorAll('[data-app-device-return-base]').forEach(function (node) {
      function syncAppDeviceReturnBaseNode() {
        syncAppDeviceReturnBaseField(node.getAttribute('data-app-device-return-base'), node.value);
        render();
      }
      node.addEventListener('input', syncAppDeviceReturnBaseNode);
      node.addEventListener('change', syncAppDeviceReturnBaseNode);
    });
    root.querySelectorAll('[data-app-survey-filter]').forEach(function (node) {
      function syncAppSurveyFilter() {
        appState.ui.appSurveyFilters[node.getAttribute('data-app-survey-filter')] = node.value;
      }
      node.addEventListener('input', syncAppSurveyFilter);
      node.addEventListener('change', syncAppSurveyFilter);
    });
    root.querySelectorAll('[data-app-survey-base]').forEach(function (node) {
      function syncAppSurveyBaseNode() {
        syncAppSurveyBaseField(node.getAttribute('data-app-survey-base'), node.value);
        render();
      }
      node.addEventListener('input', syncAppSurveyBaseNode);
      node.addEventListener('change', syncAppSurveyBaseNode);
    });
    root.querySelectorAll('[data-app-construction-filter]').forEach(function (node) {
      function syncAppConstructionFilter() {
        appState.ui.appConstructionFilters[node.getAttribute('data-app-construction-filter')] = node.value;
      }
      node.addEventListener('input', syncAppConstructionFilter);
      node.addEventListener('change', syncAppConstructionFilter);
    });
    root.querySelectorAll('[data-app-construction-base]').forEach(function (node) {
      function syncAppConstructionBaseNode() {
        syncAppConstructionBaseField(node.getAttribute('data-app-construction-base'), node.value);
        render();
      }
      node.addEventListener('input', syncAppConstructionBaseNode);
      node.addEventListener('change', syncAppConstructionBaseNode);
    });
    root.querySelectorAll('[data-app-maintenance-filter]').forEach(function (node) {
      function syncAppMaintenanceFilter() {
        appState.ui.appMaintenanceFilters[node.getAttribute('data-app-maintenance-filter')] = node.value;
      }
      node.addEventListener('input', syncAppMaintenanceFilter);
      node.addEventListener('change', syncAppMaintenanceFilter);
    });
    root.querySelectorAll('[data-app-maintenance-base]').forEach(function (node) {
      function syncAppMaintenanceBaseNode() {
        syncAppMaintenanceBaseField(node.getAttribute('data-app-maintenance-base'), node.value);
        render();
      }
      node.addEventListener('input', syncAppMaintenanceBaseNode);
      node.addEventListener('change', syncAppMaintenanceBaseNode);
    });
    root.querySelectorAll('[data-app-maintenance-process]').forEach(function (node) {
      function syncAppMaintenanceProcessNode() {
        syncAppMaintenanceProcessField(node.getAttribute('data-app-maintenance-process'), node.value);
      }
      node.addEventListener('input', syncAppMaintenanceProcessNode);
      node.addEventListener('change', syncAppMaintenanceProcessNode);
    });
    root.querySelectorAll('[data-construction-log-field]').forEach(function (node) {
      function syncConstructionLogNode() {
        syncConstructionLogField(Number(node.getAttribute('data-index')), node.getAttribute('data-construction-log-field'), node.value);
        if (node.getAttribute('data-construction-log-field') === 'deviceCode') render();
      }
      node.addEventListener('input', syncConstructionLogNode);
      node.addEventListener('change', syncConstructionLogNode);
    });
    root.querySelectorAll('[data-action]').forEach(function (node) {
      node.addEventListener('click', function (event) {
        var action = node.getAttribute('data-action');
        var id = node.getAttribute('data-id');
        var customerId = node.getAttribute('data-customer-id');
        var mode = node.getAttribute('data-mode');
        var drill = node.getAttribute('data-drill');
        var tab = node.getAttribute('data-tab');
        var memberId = node.getAttribute('data-member-id');
        var managedKey = node.getAttribute('data-managed-key');
        var extraAction = node.getAttribute('data-extra-action');
        var workorderType = node.getAttribute('data-workorder-type');
        if (node.hasAttribute('data-stop-close')) {
          event.stopPropagation();
          return;
        }
        if (action === 'customer-create') return openCustomerModal('create');
        if (action === 'customer-view') return openCustomerModal('view', id);
        if (action === 'customer-edit') return openCustomerModal('edit', id);
        if (action === 'customer-delete') return deleteCustomer(id);
        if (action === 'customer-follow') {
          getCustomerArchiveState().modal = null;
          return setRoute('/pc/customer/follow');
        }
        if (action === 'customer-project') {
          getCustomerArchiveState().modal = null;
          return setRoute('/pc/project/archive');
        }
        if (action === 'customer-reset') {
          getCustomerArchiveState().filters = { name: '', creditCode: '', scale: '', tag: '', salesperson: '' };
          return render();
        }
        if (action === 'customer-search') return render();
        if (action === 'modal-close') {
          if (event.target === node) return closeCustomerModal();
        }
        if (action === 'follow-create') return openFollowModal('create');
        if (action === 'follow-view') return openFollowModal('view', id);
        if (action === 'follow-edit') return openFollowModal('edit', id);
        if (action === 'follow-delete') return deleteFollow(id);
        if (action === 'follow-customer') return goCustomerArchiveDetail(customerId);
        if (action === 'follow-reset') {
          getCustomerFollowState().filters = { customerName: '', follower: '', dateStart: '', dateEnd: '', method: '' };
          return render();
        }
        if (action === 'follow-search') return render();
        if (action === 'follow-modal-close') {
          if (event.target === node) return closeFollowModal();
        }
        if (action === 'project-create') return openProjectModal('create');
        if (action === 'project-detail') return openProjectDetail(id);
        if (action === 'project-view') return openProjectModal('view', id);
        if (action === 'project-edit') return openProjectModal('edit', id);
        if (action === 'project-delete') return deleteProject(id);
        if (action === 'project-reset') {
          getProjectArchiveState().filters = { name: '', code: '', customerName: '', status: '', manager: '' };
          return render();
        }
        if (action === 'project-search') return render();
        if (action === 'project-view-mode') {
          getProjectArchiveState().viewMode = mode || 'tree';
          return render();
        }
        if (action === 'project-detail-tab') {
          appState.ui.currentProjectDetailTab = tab || 'basic';
          return render();
        }
        if (action === 'project-toggle') {
          var expanded = getProjectArchiveState().expanded;
          expanded[id] = expanded[id] === false ? true : false;
          return render();
        }
        if (action === 'project-modal-close') {
          if (event.target === node) return closeProjectModal();
        }
        if (action === 'project-drill') {
          getProjectArchiveState().modal = null;
          if (drill === 'workorder') return setRoute('/pc/project/construction-workorder');
          if (drill === 'asset') return setRoute('/pc/asset/device');
          if (drill === 'cost') return setRoute('/pc/project/cost');
          if (drill === 'contract') return setRoute('/pc/contract/list');
        }
        if (action === 'cost-create') return openCostModal('create');
        if (action === 'cost-view') return openCostModal('view', id);
        if (action === 'cost-edit') return openCostModal('edit', id);
        if (action === 'cost-approve') return openCostModal('approve', id);
        if (action === 'cost-revoke') return revokeCost(id);
        if (action === 'cost-reset') {
          getProjectCostState().filters = { id: '', projectName: '', customerName: '', status: '', dateStart: '', dateEnd: '' };
          return render();
        }
        if (action === 'cost-search') return render();
        if (action === 'cost-modal-close') {
          if (event.target === node) return closeCostModal();
        }
        if (action === 'cost-approve-confirm') return approveCost(id, '已通过');
        if (action === 'cost-reject-confirm') return approveCost(id, '驳回');
        if (action === 'survey-create') return openSurveyModal('create');
        if (action === 'survey-view') return openWorkorderDetail('survey', id);
        if (action === 'survey-edit') return openSurveyModal('edit', id);
        if (action === 'survey-log') return openSurveyModal('log', id);
        if (action === 'survey-revoke') return revokeSurvey(id);
        if (action === 'survey-delete') return deleteSurvey(id);
        if (action === 'survey-reset') {
          getSurveyWorkorderState().filters = { id: '', projectId: '', surveyor: '', planDate: '' };
          return render();
        }
        if (action === 'survey-search') return render();
        if (action === 'survey-modal-close') {
          if (event.target === node) return closeSurveyModal();
        }
        if (action === 'construction-create') return openConstructionModal('create');
        if (action === 'construction-view') return openWorkorderDetail('construction', id);
        if (action === 'construction-edit') return openConstructionModal('edit', id);
        if (action === 'construction-log') return openConstructionModal('log', id);
        if (action === 'construction-revoke') return revokeConstruction(id);
        if (action === 'construction-delete') return deleteConstruction(id);
        if (action === 'construction-reset') {
          getConstructionWorkorderState().filters = { id: '', projectId: '', worker: '', planDate: '' };
          return render();
        }
        if (action === 'construction-search') return render();
        if (action === 'construction-modal-close') {
          if (event.target === node) return closeConstructionModal();
        }
        if (action === 'workorder-open-log') {
          return workorderType === 'construction' ? openConstructionModal('log', id) : openSurveyModal('log', id);
        }
        if (action === 'workorder-fill-log') {
          return workorderType === 'construction' ? openConstructionModal('logFill', id) : openSurveyModal('logFill', id);
        }
        if (action === 'workorder-detail-back') {
          return setRoute(workorderBaseRoute(workorderType));
        }
        if (action === 'inspection-log-upload') {
          var uploadName = node.getAttribute('data-upload-name');
          var isMultiple = node.getAttribute('data-upload-multiple') === '1';
          var isConstructionImages = /^constructionImages-\d+$/.test(uploadName || '');
          var form = node.closest('form');
          var hiddenInput = form ? form.querySelector('input[name="' + uploadName + '"]') : null;
          var currentValue = hiddenInput ? hiddenInput.value : '';
          var promptText = isMultiple ? ('请输入附件图片名称，多个文件请用逗号、顿号或换行分隔（最多' + (isConstructionImages ? '3' : '10') + '张）') : '请输入图片名称';
          var nextValue = window.prompt(promptText, currentValue || '');
          if (nextValue == null) return;
          if (hiddenInput) {
            hiddenInput.value = isConstructionImages ? inspectionParseListText(nextValue).slice(0, 3).join('、') : nextValue;
            var display = form.querySelector('[data-upload-display="' + uploadName + '"]');
            if (display) {
              var normalizedValue = isMultiple
                ? (isConstructionImages ? inspectionParseListText(nextValue).slice(0, 3).join('、') : inspectionParseListText(nextValue).join('、'))
                : (safeText(nextValue).trim() || '未上传');
              display.textContent = normalizedValue || '未上传';
            }
            var constructionImageMatch = /^constructionImages-(\d+)$/.exec(uploadName || '');
            if (constructionImageMatch) {
              syncConstructionLogField(Number(constructionImageMatch[1]), 'images', inspectionParseListText(nextValue).slice(0, 3));
            }
          }
          return;
        }
        if (action === 'construction-log-add-item') return addConstructionLogItem();
        if (action === 'construction-log-remove-item') return removeConstructionLogItem(Number(node.getAttribute('data-index')));
        if (action === 'survey-log-draft') {
          var surveyLogForm = root.querySelector('#survey-log-form');
          if (surveyLogForm) return saveInspectionLog('survey', id, new FormData(surveyLogForm), 'draft');
          return;
        }
        if (action === 'survey-log-submit') {
          var surveySubmitForm = root.querySelector('#survey-log-form');
          if (surveySubmitForm) return saveInspectionLog('survey', id, new FormData(surveySubmitForm), 'submit');
          return;
        }
        if (action === 'construction-log-draft') {
          var constructionLogForm = root.querySelector('#construction-log-form');
          if (constructionLogForm) return saveInspectionLog('construction', id, new FormData(constructionLogForm), 'draft');
          return;
        }
        if (action === 'construction-log-submit') {
          var constructionSubmitForm = root.querySelector('#construction-log-form');
          if (constructionSubmitForm) return saveInspectionLog('construction', id, new FormData(constructionSubmitForm), 'submit');
          return;
        }
        if (action === 'maintenance-process-submit') {
          var maintenanceProcessForm = root.querySelector('#maintenance-process-form');
          if (maintenanceProcessForm) return saveMaintenanceProcess(id, new FormData(maintenanceProcessForm));
          return;
        }
        if (action === 'maintenance-create') return openMaintenanceModal('create');
        if (action === 'maintenance-view') return openWorkorderDetail('maintenance', id);
        if (action === 'maintenance-edit') return openMaintenanceModal('edit', id);
        if (action === 'maintenance-log') return openMaintenanceModal('log', id);
        if (action === 'maintenance-revoke') return revokeMaintenance(id);
        if (action === 'maintenance-delete') return deleteMaintenance(id);
        if (action === 'maintenance-reset') {
          getMaintenanceWorkorderState().filters = { id: '', projectId: '', worker: '', planDate: '' };
          return render();
        }
        if (action === 'maintenance-search') return render();
        if (action === 'maintenance-modal-close') {
          if (event.target === node) return closeMaintenanceModal();
        }
        if (action === 'sales-create') return openSalesModal('create');
        if (action === 'sales-view') return openSalesModal('view', id);
        if (action === 'sales-edit') return openSalesModal('edit', id);
        if (action === 'sales-delete') return deleteSales(id);
        if (action === 'sales-follow') return setRoute('/pc/customer/follow');
        if (action === 'sales-toggle') return toggleSales(id);
        if (action === 'sales-reset') {
          getSalespersonState().filters = { name: '', phone: '', team: '', status: '' };
          return render();
        }
        if (action === 'sales-search') return render();
        if (action === 'sales-modal-close') {
          if (event.target === node) return closeSalesModal();
        }
        if (action === 'team-create') return openTeamModal('create');
        if (action === 'team-view') return openTeamModal('view', id);
        if (action === 'team-edit') return openTeamModal('edit', id);
        if (action === 'team-delete') return deleteTeam(id);
        if (action === 'team-follow') return setRoute('/pc/customer/follow');
        if (action === 'team-reset') {
          getSalesTeamState().filters = { name: '', ownerName: '', status: '' };
          return render();
        }
        if (action === 'team-search') return render();
        if (action === 'team-modal-close') {
          if (event.target === node) return closeTeamModal();
        }
        if (action === 'team-add-member') return addTeamMember(id);
        if (action === 'team-remove-member') return removeTeamMember(id, memberId);
        if (action === 'engineer-create') return openEngineerModal('create');
        if (action === 'engineer-view') return openEngineerModal('view', id);
        if (action === 'engineer-edit') return openEngineerModal('edit', id);
        if (action === 'engineer-delete') return deleteEngineer(id);
        if (action === 'engineer-workorder') return setRoute('/pc/project/maintenance-workorder');
        if (action === 'engineer-reset') {
          getEngineerState().filters = { name: '', phone: '', team: '', status: '' };
          return render();
        }
        if (action === 'engineer-search') return render();
        if (action === 'engineer-modal-close') {
          if (event.target === node) return closeEngineerModal();
        }
        if (action === 'engineer-team-create') return openEngineerTeamModal('create');
        if (action === 'engineer-team-view') return openEngineerTeamModal('view', id);
        if (action === 'engineer-team-edit') return openEngineerTeamModal('edit', id);
        if (action === 'engineer-team-delete') return deleteEngineerTeam(id);
        if (action === 'engineer-team-reset') {
          getEngineerTeamState().filters = { name: '', ownerName: '', status: '' };
          return render();
        }
        if (action === 'engineer-team-search') return render();
        if (action === 'engineer-team-modal-close') {
          if (event.target === node) return closeEngineerTeamModal();
        }
        if (action === 'engineer-team-add-member') return addEngineerTeamMember(id);
        if (action === 'engineer-team-remove-member') return removeEngineerTeamMember(id, memberId);
        if (action === 'vehicle-create') return openVehicleModal('create');
        if (action === 'vehicle-view') return openVehicleModal('view', id);
        if (action === 'vehicle-edit') return openVehicleModal('edit', id);
        if (action === 'vehicle-delete') return deleteVehicle(id);
        if (action === 'vehicle-reset') {
          getVehicleLogState().filters = { plate: '', user: '' };
          return render();
        }
        if (action === 'vehicle-search') return render();
        if (action === 'vehicle-modal-close') {
          if (event.target === node) return closeVehicleModal();
        }
        if (action === 'managed-create') return openManagedModal(managedKey, 'create');
        if (action === 'managed-view') return openManagedModal(managedKey, 'view', id);
        if (action === 'managed-edit') return openManagedModal(managedKey, 'edit', id);
        if (action === 'managed-score-record') return openManagedModal(managedKey, 'score-record', id);
        if (action === 'managed-delete') return deleteManagedModule(managedKey, id);
        if (action === 'managed-reset') {
          Object.keys(getManagedState(managedKey).filters).forEach(function (filterKey) { getManagedState(managedKey).filters[filterKey] = ''; });
          return render();
        }
        if (action === 'managed-search') return render();
        if (action === 'managed-modal-close') {
          if (event.target === node) return closeManagedModal(managedKey);
        }
        if (action === 'managed-purchase-add-detail') return addPurchaseOrderDetail();
        if (action === 'managed-purchase-remove-detail') return removePurchaseOrderDetail(node.getAttribute('data-index'));
        if (action === 'managed-purchase-approve-confirm') {
          var approveForm = root.querySelector('#managed-form');
          var approveRemark = approveForm ? safeText(new FormData(approveForm).get('approvalRemark')).trim() : '';
          return updatePurchaseOrderStatus(id, '已审核', approveRemark || '审核通过');
        }
        if (action === 'managed-purchase-reject-confirm') {
          var rejectForm = root.querySelector('#managed-form');
          var rejectRemark = rejectForm ? safeText(new FormData(rejectForm).get('approvalRemark')).trim() : '';
          if (!rejectRemark) {
            window.alert('驳回时请填写审核意见');
            return;
          }
          return updatePurchaseOrderStatus(id, '待审核', rejectRemark);
        }
        if (action === 'managed-purchase-inbound-confirm') {
          var purchase = findManagedItem('purchaseOrder', id);
          if (purchase) {
            var firstDetail = normalizePurchaseOrderDetails(purchase.details)[0] || {};
            pushInboundRecord('采购入库', purchase.id, firstDetail.model || '采购物资', String(normalizePurchaseOrderDetails(purchase.details).length) + '项');
          }
          return updatePurchaseOrderStatus(id, '已入库', '采购明细已完成入库。');
        }
        if (action === 'model-brand-select') {
          getManagedState('model').selectedBrandId = id;
          return render();
        }
        if (action === 'model-brand-create') return openModelBrandModal('create');
        if (action === 'model-brand-edit') return openModelBrandModal('edit', id);
        if (action === 'model-brand-delete') return deleteModelBrand(id);
        if (action === 'model-create') return openModelModal('create');
        if (action === 'model-view') return openModelModal('view', id);
        if (action === 'model-edit') return openModelModal('edit', id);
        if (action === 'model-delete') return deleteModel(id);
        if (action === 'model-brand-modal-close') {
          if (event.target === node) return closeModelBrandModal();
        }
        if (action === 'model-modal-close') {
          if (event.target === node) return closeModelModal();
        }
        if (action === 'device-archive-view') return openDeviceArchiveModal('view', id);
        if (action === 'device-archive-edit') return openDeviceArchiveModal('edit', id);
        if (action === 'device-archive-reset') {
          getManagedState('deviceArchive').filters = { name: '', code: '', brand: '', model: '', category: '', status: '' };
          return render();
        }
        if (action === 'device-archive-search') return render();
        if (action === 'device-archive-modal-close') {
          if (event.target === node) return closeDeviceArchiveModal();
        }
        if (action === 'inventory-stock-list') return openInventoryModal(id);
        if (action === 'inventory-reset') {
          getManagedState('inventory').filters = { brand: '', model: '', category: '', stockStatus: '' };
          return render();
        }
        if (action === 'inventory-search') return render();
        if (action === 'inventory-stock-reset') {
          getManagedState('inventory').stockFilters = { code: '', category: '', brand: '' };
          return render();
        }
        if (action === 'inventory-stock-search') return render();
        if (action === 'inventory-modal-close') {
          if (event.target === node) return closeInventoryModal();
        }
        if (action === 'device-receive-create') return openDeviceReceiveModal('create');
        if (action === 'device-receive-view') return openDeviceReceiveModal('view', id);
        if (action === 'device-receive-edit') return openDeviceReceiveModal('edit', id);
        if (action === 'device-receive-delete') return deleteDeviceReceive(id);
        if (action === 'device-receive-revoke') return updateDeviceReceiveStatus(id, '已撤销', '领用单已撤销。');
        if (action === 'device-receive-approve') return openDeviceReceiveModal('approve', id);
        if (action === 'device-receive-outbound') return openDeviceReceiveModal('outbound', id);
        if (action === 'device-receive-reset') {
          getManagedState('deviceReceive').filters = { id: '', creator: '', createTime: '', status: '', dateStart: '', dateEnd: '' };
          return render();
        }
        if (action === 'device-receive-search') return render();
        if (action === 'device-receive-modal-close') {
          if (event.target === node) return closeDeviceReceiveModal();
        }
        if (action === 'device-receive-add-card') return addDeviceReceiveCard();
        if (action === 'device-receive-remove-card') return removeDeviceReceiveCard(node.getAttribute('data-card-index'));
        if (action === 'device-receive-add-need') return addDeviceReceiveNeed(node.getAttribute('data-card-index'));
        if (action === 'device-receive-remove-need') return removeDeviceReceiveNeed(node.getAttribute('data-card-index'), node.getAttribute('data-need-index'));
        if (action === 'device-receive-open-picker') return openDeviceReceiveOutboundPicker(node.getAttribute('data-card-index'), node.getAttribute('data-need-index'));
        if (action === 'device-receive-picker-close') {
          if (event.target === node) return closeDeviceReceiveOutboundPicker();
        }
        if (action === 'device-receive-toggle-picker-device') return toggleDeviceReceiveOutboundDevice(node.getAttribute('data-device-id'));
        if (action === 'device-receive-remove-picker-device') return removeSelectedOutboundDevice(node.getAttribute('data-card-index'), node.getAttribute('data-need-index'), node.getAttribute('data-device-id'));
        if (action === 'device-receive-approve-confirm') {
          var approveReceiveForm = root.querySelector('#device-receive-form');
          var approveReceiveRemark = approveReceiveForm ? safeText(new FormData(approveReceiveForm).get('approvalRemark')).trim() : '';
          return updateDeviceReceiveStatus(id, '待出库', approveReceiveRemark || '审批通过，待出库。');
        }
        if (action === 'device-receive-reject-confirm') {
          var rejectReceiveForm = root.querySelector('#device-receive-form');
          var rejectReceiveRemark = rejectReceiveForm ? safeText(new FormData(rejectReceiveForm).get('approvalRemark')).trim() : '';
          if (!rejectReceiveRemark) return window.alert('驳回时请填写审批意见');
          return updateDeviceReceiveStatus(id, '待审核', rejectReceiveRemark);
        }
        if (action === 'device-receive-outbound-confirm') {
          return confirmDeviceReceiveOutbound(id);
        }
        if (action === 'device-return-create') return openDeviceReturnModal('create');
        if (action === 'device-return-view') return openDeviceReturnModal('view', id);
        if (action === 'device-return-edit') return openDeviceReturnModal('edit', id);
        if (action === 'device-return-delete') return deleteDeviceReturn(id);
        if (action === 'device-return-revoke') return updateDeviceReturnStatus(id, '已撤销');
        if (action === 'device-return-inbound') return openDeviceReturnModal('inbound', id);
        if (action === 'device-return-reset') {
          getManagedState('deviceReturn').filters = { id: '', creator: '', createTime: '', status: '', dateStart: '', dateEnd: '' };
          return render();
        }
        if (action === 'device-return-search') return render();
        if (action === 'device-return-modal-close') {
          if (event.target === node) return closeDeviceReturnModal();
        }
        if (action === 'device-return-open-picker') return openDeviceReturnPicker();
        if (action === 'device-return-picker-close') {
          if (event.target === node) return closeDeviceReturnPicker();
        }
        if (action === 'device-return-toggle-picker-device') return toggleDeviceReturnPickerDevice(node.getAttribute('data-device-id'));
        if (action === 'device-return-remove-device') return removeDeviceReturnSelectedDevice(node.getAttribute('data-device-id'));
        if (action === 'device-return-inbound-confirm') return confirmDeviceReturnInbound(id);
        if (action === 'device-repair-create') return openDeviceRepairModal('create');
        if (action === 'device-repair-view') return openDeviceRepairModal('view', id);
        if (action === 'device-repair-edit') return openDeviceRepairModal('edit', id);
        if (action === 'device-repair-delete') return deleteDeviceRepair(id);
        if (action === 'device-repair-revoke') return updateDeviceRepairStatus(id, '已撤销', '返修单已撤销。');
        if (action === 'device-repair-approve') return openDeviceRepairModal('approve', id);
        if (action === 'device-repair-reset') {
          getManagedState('deviceRepair').filters = { id: '', creator: '', createTime: '', status: '', dateStart: '', dateEnd: '' };
          return render();
        }
        if (action === 'device-repair-search') return render();
        if (action === 'device-repair-modal-close') {
          if (event.target === node) return closeDeviceRepairModal();
        }
        if (action === 'device-repair-open-picker') return openDeviceRepairPicker();
        if (action === 'device-repair-picker-close') {
          if (event.target === node) return closeDeviceRepairPicker();
        }
        if (action === 'device-repair-toggle-picker-device') return toggleDeviceRepairPickerDevice(node.getAttribute('data-device-id'));
        if (action === 'device-repair-remove-device') return removeDeviceRepairSelectedDevice(node.getAttribute('data-device-id'));
        if (action === 'device-repair-approve-confirm') {
          var approveRepairForm = root.querySelector('#device-repair-form');
          var approveRepairRemark = approveRepairForm ? safeText(new FormData(approveRepairForm).get('approvalRemark')).trim() : '';
          return updateDeviceRepairStatus(id, '已通过', approveRepairRemark || '审批通过。');
        }
        if (action === 'device-repair-reject-confirm') {
          var rejectRepairForm = root.querySelector('#device-repair-form');
          var rejectRepairRemark = rejectRepairForm ? safeText(new FormData(rejectRepairForm).get('approvalRemark')).trim() : '';
          if (!rejectRepairRemark) return window.alert('驳回时请填写审批意见');
          return updateDeviceRepairStatus(id, '已驳回', rejectRepairRemark);
        }
        if (action === 'device-scrap-create') return openDeviceScrapModal('create');
        if (action === 'device-scrap-view') return openDeviceScrapModal('view', id);
        if (action === 'device-scrap-edit') return openDeviceScrapModal('edit', id);
        if (action === 'device-scrap-delete') return deleteDeviceScrap(id);
        if (action === 'device-scrap-revoke') return updateDeviceScrapStatus(id, '已撤销', '报废单已撤销。');
        if (action === 'device-scrap-approve') return openDeviceScrapModal('approve', id);
        if (action === 'device-scrap-reset') {
          getManagedState('deviceScrap').filters = { id: '', creator: '', createTime: '', status: '', dateStart: '', dateEnd: '' };
          return render();
        }
        if (action === 'device-scrap-search') return render();
        if (action === 'device-scrap-modal-close') {
          if (event.target === node) return closeDeviceScrapModal();
        }
        if (action === 'device-scrap-open-picker') return openDeviceScrapPicker();
        if (action === 'device-scrap-picker-close') {
          if (event.target === node) return closeDeviceScrapPicker();
        }
        if (action === 'device-scrap-toggle-picker-device') return toggleDeviceScrapPickerDevice(node.getAttribute('data-device-id'));
        if (action === 'device-scrap-remove-device') return removeDeviceScrapSelectedDevice(node.getAttribute('data-device-id'));
        if (action === 'device-scrap-approve-confirm') {
          var approveScrapForm = root.querySelector('#device-scrap-form');
          var approveScrapRemark = approveScrapForm ? safeText(new FormData(approveScrapForm).get('approvalRemark')).trim() : '';
          return updateDeviceScrapStatus(id, '已通过', approveScrapRemark || '审批通过。');
        }
        if (action === 'device-scrap-reject-confirm') {
          var rejectScrapForm = root.querySelector('#device-scrap-form');
          var rejectScrapRemark = rejectScrapForm ? safeText(new FormData(rejectScrapForm).get('approvalRemark')).trim() : '';
          if (!rejectScrapRemark) return window.alert('驳回时请填写审批意见');
          return updateDeviceScrapStatus(id, '已驳回', rejectScrapRemark);
        }
        if (action === 'device-inbound-reset') {
          getManagedState('inboundRecord').filters = { deviceCode: '', deviceName: '', model: '', category: '', brand: '', dateStart: '', dateEnd: '', inboundType: '' };
          return render();
        }
        if (action === 'device-inbound-search') return render();
        if (action === 'device-outbound-reset') {
          getManagedState('outboundRecord').filters = { deviceCode: '', deviceName: '', model: '', category: '', brand: '', dateStart: '', dateEnd: '', outboundType: '' };
          return render();
        }
        if (action === 'device-outbound-search') return render();
        if (action === 'alarm-process') return openAlarmModal('process', id);
        if (action === 'alarm-records') return openAlarmModal('records', id);
        if (action === 'alarm-logs') return openAlarmModal('logs', id);
        if (action === 'alarm-reset') {
          getManagedState('alarmRecord').filters = { deviceName: '', deviceCode: '', projectName: '', status: '' };
          return render();
        }
        if (action === 'alarm-search') return render();
        if (action === 'alarm-modal-close') {
          if (event.target === node) return closeAlarmModal();
        }
        if (action === 'alarm-open-repair') return openAlarmRepairModal(id);
        if (action === 'alarm-repair-close') {
          if (event.target === node) return closeAlarmRepairModal();
        }
        if (action === 'alarm-create-workorder') return createAlarmWorkorder(id);
        if (action === 'investor-create') return openInvestorModal('create');
        if (action === 'investor-view') return openInvestorModal('view', id);
        if (action === 'investor-edit') return openInvestorModal('edit', id);
        if (action === 'investor-delete') return deleteInvestor(id);
        if (action === 'investor-reset') {
          getManagedState('investor').filters = { name: '', status: '' };
          return render();
        }
        if (action === 'investor-search') return render();
        if (action === 'investor-modal-close') {
          if (event.target === node) return closeInvestorModal();
        }
        if (action === 'project-profit-view') return openProjectProfitModal(id);
        if (action === 'project-profit-reset') {
          getManagedState('projectProfit').filters = { projectName: '', projectCode: '', customerName: '', status: '' };
          return render();
        }
        if (action === 'project-profit-search') return render();
        if (action === 'performance-tab') {
          getPerformanceState().activeTab = tab || 'sales';
          return render();
        }
        if (action === 'performance-reset') {
          if ((tab || 'sales') === 'sales') {
            getPerformanceState().salesFilters = { name: '', phone: '', team: '', period: currentPeriodMonth() };
          } else {
            getPerformanceState().engineerFilters = { name: '', phone: '', team: '', period: currentPeriodMonth() };
          }
          return render();
        }
        if (action === 'performance-search') return render();
        if (action === 'project-profit-modal-close') {
          if (event.target === node) return closeProjectProfitModal();
        }
        if (action === 'managed-toolbar') return handleManagedExtraAction(managedKey, extraAction);
        if (action.indexOf('managed-') === 0) return handleManagedExtraAction(managedKey, action.replace('managed-', ''), id);
        if (action === 'contract-create') return openContractModal('create');
        if (action === 'contract-view') return openContractModal('view', id);
        if (action === 'contract-edit') return openContractModal('edit', id);
        if (action === 'contract-delete') return deleteContract(id);
        if (action === 'contract-revoke') return revokeContract(id);
        if (action === 'contract-approve') return openContractModal('approve', id);
        if (action === 'contract-reset') {
          getContractState().filters = { id: '', customerId: '', projectId: '', status: '' };
          return render();
        }
        if (action === 'contract-search') return render();
        if (action === 'contract-modal-close') {
          if (event.target === node) return closeContractModal();
        }
        if (action === 'contract-approve-confirm') return approveContract(id, mode);
        if (action === 'app-cost-create') return openAppCostDetail('create');
        if (action === 'app-cost-view') return openAppCostDetail('view', id);
        if (action === 'app-cost-more-toggle') {
          appState.ui.appCostMoreOpen = !appState.ui.appCostMoreOpen;
          return render();
        }
        if (action === 'app-cost-edit') return openAppCostDetail('edit', id);
        if (action === 'app-cost-approve') return openAppCostDetail('approve', id);
        if (action === 'app-cost-revoke') return revokeAppCost(id);
        if (action === 'app-cost-search') return render();
        if (action === 'app-cost-save-create') return saveAppCost('create');
        if (action === 'app-cost-save-edit') return saveAppCost('edit', id);
        if (action === 'app-cost-submit-view') return saveAppCost('edit', id);
        if (action === 'app-cost-approve-pass') return approveAppCost(id, true);
        if (action === 'app-cost-approve-reject') return approveAppCost(id, false);
        if (action === 'app-purchase-create') return openAppPurchaseDetail('create');
        if (action === 'app-purchase-view') return openAppPurchaseDetail('view', id);
        if (action === 'app-purchase-more-toggle') {
          appState.ui.appPurchaseMoreOpen = !appState.ui.appPurchaseMoreOpen;
          return render();
        }
        if (action === 'app-purchase-edit') return openAppPurchaseDetail('edit', id);
        if (action === 'app-purchase-approve') return openAppPurchaseDetail('approve', id);
        if (action === 'app-purchase-inbound') return openAppPurchaseDetail('inbound', id);
        if (action === 'app-purchase-search') return render();
        if (action === 'app-purchase-add-detail') return addAppPurchaseDetail();
        if (action === 'app-purchase-remove-detail') return removeAppPurchaseDetail(node.getAttribute('data-index'));
        if (action === 'app-purchase-save-create') return saveAppPurchase('create');
        if (action === 'app-purchase-save-edit') return saveAppPurchase('edit', id);
        if (action === 'app-purchase-approve-pass') return approveAppPurchase(id, true);
        if (action === 'app-purchase-approve-reject') return approveAppPurchase(id, false);
        if (action === 'app-purchase-inbound-confirm') return inboundAppPurchase(id);
        if (action === 'app-purchase-delete') return deleteAppPurchase(id);
        if (action === 'app-device-receive-create') return openAppDeviceReceiveDetail('create');
        if (action === 'app-device-receive-view') return openAppDeviceReceiveDetail('view', id);
        if (action === 'app-device-receive-more-toggle') {
          appState.ui.appDeviceReceiveMoreOpen = !appState.ui.appDeviceReceiveMoreOpen;
          return render();
        }
        if (action === 'app-device-receive-edit') return openAppDeviceReceiveDetail('edit', id);
        if (action === 'app-device-receive-approve') return openAppDeviceReceiveDetail('approve', id);
        if (action === 'app-device-receive-outbound') return openAppDeviceReceiveDetail('outbound', id);
        if (action === 'app-device-receive-search') return render();
        if (action === 'app-device-receive-add-card') return addAppDeviceReceiveCard();
        if (action === 'app-device-receive-remove-card') return removeAppDeviceReceiveCard(node.getAttribute('data-card-index'));
        if (action === 'app-device-receive-add-need') return addAppDeviceReceiveNeed(node.getAttribute('data-card-index'));
        if (action === 'app-device-receive-remove-need') return removeAppDeviceReceiveNeed(node.getAttribute('data-card-index'), node.getAttribute('data-need-index'));
        if (action === 'app-device-receive-open-picker') return openAppDeviceReceivePicker(node.getAttribute('data-card-index'), node.getAttribute('data-need-index'));
        if (action === 'app-device-receive-picker-close') return closeAppDeviceReceivePicker();
        if (action === 'app-device-receive-toggle-picker-device') return toggleAppDeviceReceivePickerDevice(node.getAttribute('data-device-id'));
        if (action === 'app-device-receive-remove-device') return removeAppDeviceReceiveSelectedDevice(node.getAttribute('data-card-index'), node.getAttribute('data-need-index'), node.getAttribute('data-device-id'));
        if (action === 'app-device-receive-save-create') return saveAppDeviceReceive('create');
        if (action === 'app-device-receive-save-edit') return saveAppDeviceReceive('edit', id);
        if (action === 'app-device-receive-approve-pass') return approveAppDeviceReceive(id, true);
        if (action === 'app-device-receive-approve-reject') return approveAppDeviceReceive(id, false);
        if (action === 'app-device-receive-outbound-confirm') return outboundAppDeviceReceive(id);
        if (action === 'app-device-receive-revoke') return revokeAppDeviceReceive(id);
        if (action === 'app-device-receive-delete') return deleteAppDeviceReceive(id);
        if (action === 'app-device-return-create') return openAppDeviceReturnDetail('create');
        if (action === 'app-device-return-view') return openAppDeviceReturnDetail('view', id);
        if (action === 'app-device-return-more-toggle') {
          appState.ui.appDeviceReturnMoreOpen = !appState.ui.appDeviceReturnMoreOpen;
          return render();
        }
        if (action === 'app-device-return-edit') return openAppDeviceReturnDetail('edit', id);
        if (action === 'app-device-return-inbound') return openAppDeviceReturnDetail('inbound', id);
        if (action === 'app-device-return-search') return render();
        if (action === 'app-device-return-open-picker') return openAppDeviceReturnPicker();
        if (action === 'app-device-return-picker-close') return closeAppDeviceReturnPicker();
        if (action === 'app-device-return-picker-search') return render();
        if (action === 'app-device-return-picker-reset') return resetAppDeviceReturnPickerFilters();
        if (action === 'app-device-return-toggle-picker-device') return toggleAppDeviceReturnPickerDevice(node.getAttribute('data-device-id'));
        if (action === 'app-device-return-remove-device') return removeAppDeviceReturnSelectedDevice(node.getAttribute('data-device-id'));
        if (action === 'app-device-return-save-create') return saveAppDeviceReturn('create');
        if (action === 'app-device-return-save-edit') return saveAppDeviceReturn('edit', id);
        if (action === 'app-device-return-inbound-confirm') return inboundAppDeviceReturn(id);
        if (action === 'app-device-return-revoke') return revokeAppDeviceReturn(id);
        if (action === 'app-device-return-delete') return deleteAppDeviceReturn(id);
        if (action === 'app-approval-switch') {
          appState.ui.appApprovalView = node.getAttribute('data-view') || 'pending';
          return render();
        }
        if (action === 'app-approval-open') return openAppApprovalItem(node.getAttribute('data-type'), node.getAttribute('data-id'));
        if (action === 'app-survey-create') return openAppSurveyDetail('create');
        if (action === 'app-survey-view') return openAppSurveyDetail('view', id);
        if (action === 'app-survey-more-toggle') {
          appState.ui.appSurveyMoreOpen = !appState.ui.appSurveyMoreOpen;
          return render();
        }
        if (action === 'app-survey-edit') return openAppSurveyDetail('edit', id);
        if (action === 'app-survey-search') return render();
        if (action === 'app-survey-save-create') return saveAppSurvey('create');
        if (action === 'app-survey-save-edit') return saveAppSurvey('edit', id);
        if (action === 'app-survey-revoke') return revokeAppSurvey(id);
        if (action === 'app-survey-delete') return deleteAppSurvey(id);
        if (action === 'app-survey-log-fill') return openSurveyModal('logFill', id);
        if (action === 'app-survey-log-view') return openSurveyModal('log', id);
        if (action === 'app-construction-create') return openAppConstructionDetail('create');
        if (action === 'app-construction-view') return openAppConstructionDetail('view', id);
        if (action === 'app-construction-more-toggle') {
          appState.ui.appConstructionMoreOpen = !appState.ui.appConstructionMoreOpen;
          return render();
        }
        if (action === 'app-construction-edit') return openAppConstructionDetail('edit', id);
        if (action === 'app-construction-search') return render();
        if (action === 'app-construction-save-create') return saveAppConstruction('create');
        if (action === 'app-construction-save-edit') return saveAppConstruction('edit', id);
        if (action === 'app-construction-revoke') return revokeAppConstruction(id);
        if (action === 'app-construction-delete') return deleteAppConstruction(id);
        if (action === 'app-construction-log-fill') return openConstructionModal('logFill', id);
        if (action === 'app-construction-log-view') return openConstructionModal('log', id);
        if (action === 'app-maintenance-create') return openAppMaintenanceDetail('create');
        if (action === 'app-maintenance-view') return openAppMaintenanceDetail('view', id);
        if (action === 'app-maintenance-more-toggle') {
          appState.ui.appMaintenanceMoreOpen = !appState.ui.appMaintenanceMoreOpen;
          return render();
        }
        if (action === 'app-maintenance-edit') return openAppMaintenanceDetail('edit', id);
        if (action === 'app-maintenance-search') return render();
        if (action === 'app-maintenance-save-create') return saveAppMaintenance('create');
        if (action === 'app-maintenance-save-edit') return saveAppMaintenance('edit', id);
        if (action === 'app-maintenance-process-submit') return submitAppMaintenanceProcess(id);
        if (action === 'app-maintenance-revoke') return revokeAppMaintenance(id);
        if (action === 'app-maintenance-delete') return deleteAppMaintenance(id);
      });
    });
    var customerForm = root.querySelector('#customer-form');
    if (customerForm) {
      customerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveCustomer(new FormData(customerForm));
      });
    }
    var followForm = root.querySelector('#follow-form');
    if (followForm) {
      followForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveFollow(new FormData(followForm));
      });
    }
    var projectForm = root.querySelector('#project-form');
    if (projectForm) {
      projectForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveProject(new FormData(projectForm));
      });
    }
    var costForm = root.querySelector('#cost-form');
    if (costForm) {
      costForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveCost(new FormData(costForm));
      });
    }
    var surveyForm = root.querySelector('#survey-form');
    if (surveyForm) {
      surveyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveSurvey(new FormData(surveyForm));
      });
    }
    var constructionForm = root.querySelector('#construction-form');
    if (constructionForm) {
      constructionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveConstruction(new FormData(constructionForm));
      });
    }
    var maintenanceForm = root.querySelector('#maintenance-form');
    if (maintenanceForm) {
      maintenanceForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveMaintenance(new FormData(maintenanceForm));
      });
    }
    var salesForm = root.querySelector('#sales-form');
    if (salesForm) {
      salesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveSales(new FormData(salesForm));
      });
    }
    var teamForm = root.querySelector('#team-form');
    if (teamForm) {
      teamForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveTeam(new FormData(teamForm));
      });
    }
    var engineerForm = root.querySelector('#engineer-form');
    if (engineerForm) {
      engineerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveEngineer(new FormData(engineerForm));
      });
    }
    var engineerTeamForm = root.querySelector('#engineer-team-form');
    if (engineerTeamForm) {
      engineerTeamForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveEngineerTeam(new FormData(engineerTeamForm));
      });
    }
    var vehicleForm = root.querySelector('#vehicle-form');
    if (vehicleForm) {
      vehicleForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveVehicle(new FormData(vehicleForm));
      });
    }
    var managedForm = root.querySelector('#managed-form');
    if (managedForm) {
      if (managedForm.getAttribute('data-managed-key') === 'purchaseOrder') {
        updatePurchaseOrderLiveTotals();
      }
      managedForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveManagedModule(managedForm.getAttribute('data-managed-key'), new FormData(managedForm));
      });
    }
    var modelBrandForm = root.querySelector('#model-brand-form');
    if (modelBrandForm) {
      modelBrandForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveModelBrand(new FormData(modelBrandForm));
      });
    }
    var modelForm = root.querySelector('#model-form');
    if (modelForm) {
      modelForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveModel(new FormData(modelForm));
      });
    }
    var deviceArchiveForm = root.querySelector('#device-archive-form');
    if (deviceArchiveForm) {
      deviceArchiveForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveDeviceArchive(new FormData(deviceArchiveForm));
      });
    }
    var deviceReceiveForm = root.querySelector('#device-receive-form');
    if (deviceReceiveForm) {
      deviceReceiveForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveDeviceReceive(new FormData(deviceReceiveForm));
      });
    }
    var deviceReturnForm = root.querySelector('#device-return-form');
    if (deviceReturnForm) {
      deviceReturnForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveDeviceReturn(new FormData(deviceReturnForm));
      });
    }
    var deviceRepairForm = root.querySelector('#device-repair-form');
    if (deviceRepairForm) {
      deviceRepairForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveDeviceRepair(new FormData(deviceRepairForm));
      });
    }
    var deviceScrapForm = root.querySelector('#device-scrap-form');
    if (deviceScrapForm) {
      deviceScrapForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveDeviceScrap(new FormData(deviceScrapForm));
      });
    }
    var contractForm = root.querySelector('#contract-form');
    if (contractForm) {
      updateContractPricingTotals();
      contractForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveContract(new FormData(contractForm));
      });
    }
    var alarmProcessForm = root.querySelector('#alarm-process-form');
    if (alarmProcessForm) {
      alarmProcessForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveAlarmProcess(new FormData(alarmProcessForm));
      });
    }
    var investorForm = root.querySelector('#investor-form');
    if (investorForm) {
      investorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveInvestor(new FormData(investorForm));
      });
    }
  }

  function findCustomer(id) {
    return getCustomerArchiveState().list.find(function (item) { return item.id === id; });
  }

  function openCustomerModal(mode, id) {
    var item = id ? Object.assign({}, findCustomer(id)) : {
      name: '', address: '', creditCode: '', salesperson: '', scale: '', source: '', level: '', industry: '', managedProjectScale: '',
      legalName: '', legalPhone: '', legalEmail: '', contactName: '', contactTitle: '', contactPhone: ''
    };
    getCustomerArchiveState().modal = { mode: mode, item: item };
    render();
  }

  function closeCustomerModal() {
    getCustomerArchiveState().modal = null;
    render();
  }

  function goCustomerArchiveDetail(customerId) {
    appState.ui.pendingCustomerViewId = customerId;
    setRoute('/pc/customer/archive');
  }

  function handlePendingCustomerView(route) {
    if (route === '/pc/customer/archive' && appState.ui.pendingCustomerViewId) {
      var pendingId = appState.ui.pendingCustomerViewId;
      appState.ui.pendingCustomerViewId = null;
      openCustomerModal('view', pendingId);
      return true;
    }
    return false;
  }

  function saveCustomer(formData) {
    var state = getCustomerArchiveState();
    var modal = state.modal;
    if (!modal) return;
    var payload = {};
    ['name', 'address', 'creditCode', 'salesperson', 'scale', 'source', 'level', 'industry', 'managedProjectScale', 'legalName', 'legalPhone', 'legalEmail', 'contactName', 'contactTitle', 'contactPhone'].forEach(function (key) {
      payload[key] = safeText(formData.get(key)).trim();
    });
    if (!payload.name || !payload.salesperson) {
      window.alert('请填写必填项：客户名称、销售人员');
      return;
    }
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) {
        return item.id === modal.item.id ? Object.assign({}, item, payload) : item;
      });
    } else {
      payload.id = 'KH-2026-' + String(state.nextId).padStart(3, '0');
      payload.tag = payload.tag || '预客户';
      payload.latestFollow = '2026-04-08 15:00';
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function deleteCustomer(id) {
    if (!window.confirm('确认删除该客户档案吗？此操作仅影响演示数据。')) return;
    var state = getCustomerArchiveState();
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function findFollow(id) {
    return getCustomerFollowState().list.find(function (item) { return item.id === id; });
  }

  function openFollowModal(mode, id) {
    var item = id ? Object.assign({}, findFollow(id)) : {
      customerId: '', follower: '', time: '', method: '', detail: '', images: []
    };
    getCustomerFollowState().modal = { mode: mode, item: item };
    render();
  }

  function closeFollowModal() {
    getCustomerFollowState().modal = null;
    render();
  }

  function saveFollow(formData) {
    var state = getCustomerFollowState();
    var modal = state.modal;
    if (!modal) return;
    var payload = {
      customerId: safeText(formData.get('customerId')).trim(),
      follower: safeText(formData.get('follower')).trim(),
      time: safeText(formData.get('time')).trim().replace('T', ' '),
      method: safeText(formData.get('method')).trim(),
      detail: safeText(formData.get('detail')).trim(),
      images: safeText(formData.get('images')).trim() ? safeText(formData.get('images')).split(/[、,，;；]/).map(function (item) { return item.trim(); }).filter(Boolean) : []
    };
    if (!payload.customerId || !payload.follower || !payload.time || !payload.method || !payload.detail) {
      window.alert('请填写必填项：客户、跟进人、跟进时间、跟进方式、详情描述');
      return;
    }
    var customer = findCustomer(payload.customerId);
    payload.customerName = customer ? customer.name : payload.customerId;
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) {
        return item.id === modal.item.id ? Object.assign({}, item, payload) : item;
      });
    } else {
      payload.id = 'GJ-2026-' + String(state.nextId).padStart(3, '0');
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function deleteFollow(id) {
    if (!window.confirm('确认删除该跟进记录吗？此操作仅影响演示数据。')) return;
    var state = getCustomerFollowState();
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function findProjectById(id, list) {
    var result = null;
    (list || getProjectArchiveState().tree).some(function (item) {
      if (item.id === id) {
        result = item;
        return true;
      }
      if (item.children && item.children.length) {
        result = findProjectById(id, item.children);
        return !!result;
      }
      return false;
    });
    return result;
  }

  function openProjectModal(mode, id) {
    var item = id ? Object.assign({}, findProjectById(id)) : {
      parentId: '', name: '', customerId: '', projectType: '', manager: '', salesperson: '',
      area: '', contactName: '', contactTitle: '', contactPhone: '', remark: '', status: '待工勘'
    };
    getProjectArchiveState().modal = { mode: mode, item: item };
    render();
  }

  function openProjectDetail(id) {
    appState.ui.currentProjectDetailId = id;
    appState.ui.currentProjectDetailTab = 'basic';
    setRoute('/pc/project/detail');
  }

  function closeProjectModal() {
    getProjectArchiveState().modal = null;
    render();
  }

  function saveProject(formData) {
    var state = getProjectArchiveState();
    var modal = state.modal;
    if (!modal) return;
    var payload = {
      parentId: safeText(formData.get('parentId')).trim(),
      name: safeText(formData.get('name')).trim(),
      customerId: safeText(formData.get('customerId')).trim(),
      projectType: safeText(formData.get('projectType')).trim(),
      manager: safeText(formData.get('manager')).trim(),
      salesperson: safeText(formData.get('salesperson')).trim(),
      area: safeText(formData.get('area')).trim(),
      contactName: safeText(formData.get('contactName')).trim(),
      contactTitle: safeText(formData.get('contactTitle')).trim(),
      contactPhone: safeText(formData.get('contactPhone')).trim(),
      remark: safeText(formData.get('remark')).trim()
    };
    if (!payload.name || !payload.customerId || !payload.manager || !payload.salesperson || !payload.area) {
      window.alert('请填写必填项：项目名称、客户、项目经理、销售人员、项目地址');
      return;
    }
    var customer = findCustomer(payload.customerId);
    payload.customerName = customer ? customer.name : payload.customerId;
    payload.status = modal.item.status || '待工勘';
    if (modal.mode === 'edit' && modal.item.id) {
      var target = findProjectById(modal.item.id);
      Object.assign(target, payload);
    } else {
      payload.id = 'XM-2026-' + String(state.nextId).padStart(3, '0');
      payload.code = payload.id;
      if (payload.parentId) {
        var parent = findProjectById(payload.parentId);
        parent.children = parent.children || [];
        parent.children.push(payload);
        state.expanded[parent.id] = true;
      } else {
        state.tree.push(payload);
      }
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function removeProjectById(id, list) {
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === id) {
        list.splice(i, 1);
        return true;
      }
      if (list[i].children && list[i].children.length && removeProjectById(id, list[i].children)) {
        return true;
      }
    }
    return false;
  }

  function deleteProject(id) {
    if (!window.confirm('确认删除该项目档案吗？子项目会一并移除，此操作仅影响演示数据。')) return;
    removeProjectById(id, getProjectArchiveState().tree);
    render();
  }

  function findCost(id) {
    return getProjectCostState().list.find(function (item) { return item.id === id; });
  }

  function buildDefaultCostDetails() {
    return (data.projectCostOptions.costItems || []).map(function (item) {
      return { name: item.name, brand: '', model: '', brandModel: '', unit: item.unit, qty: '', price: '', amount: '', remark: '' };
    });
  }

  function openCostModal(mode, id) {
    var item = id ? JSON.parse(JSON.stringify(findCost(id))) : {
      projectId: '',
      status: '草稿',
      details: buildDefaultCostDetails()
    };
    getProjectCostState().modal = { mode: mode, item: item };
    render();
  }

  function closeCostModal() {
    getProjectCostState().modal = null;
    render();
  }

  function saveCost(formData) {
    var state = getProjectCostState();
    var modal = state.modal;
    if (!modal) return;
    var projectId = safeText(formData.get('projectId')).trim();
    if (!projectId) {
      window.alert('请选择项目');
      return;
    }
    var project = findProjectById(projectId);
    var details = buildDefaultCostDetails().map(function (item, index) {
      var qty = safeText(formData.get('detail-qty-' + index)).trim();
      var price = safeText(formData.get('detail-price-' + index)).trim();
      var amount = (Number(qty) || 0) * (Number(price) || 0);
      return {
        name: item.name,
        brand: safeText(formData.get('detail-brand-' + index)).trim(),
        model: safeText(formData.get('detail-model-' + index)).trim(),
        brandModel: [safeText(formData.get('detail-brand-' + index)).trim(), safeText(formData.get('detail-model-' + index)).trim()].join(' ').trim(),
        unit: item.unit,
        qty: qty,
        price: price,
        amount: amount ? amount.toFixed(2) : '',
        remark: safeText(formData.get('detail-remark-' + index)).trim()
      };
    });
    var originalRecords = modal.item.approvalRecords ? modal.item.approvalRecords.slice() : [];
    var payload = {
      projectId: projectId,
      projectName: project ? project.name : projectId,
      customerName: project ? project.customerName : '-',
      creator: project ? project.manager : '系统管理员',
      createTime: '2026-04-09 14:20',
      status: modal.item.status || '草稿',
      approvalRecords: modal.mode === 'edit'
        ? originalRecords.concat([{ time: '2026-04-09 14:20', operator: currentUserName(), action: '编辑', remark: '更新报价明细。' }])
        : [{ time: '2026-04-09 14:20', operator: currentUserName(), action: '创建', remark: '新建报价单，待提交审批。' }],
      details: details
    };
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id, createTime: item.createTime, creator: item.creator }) : item; });
    } else {
      payload.id = 'ZJ-2026-' + String(state.nextId).padStart(3, '0');
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function approveCost(id, mode) {
    var state = getProjectCostState();
    var textarea = root.querySelector('textarea[name="approvalRemark"]');
    var remark = textarea ? safeText(textarea.value).trim() : '';
    if (mode === '驳回' && !remark) {
      window.alert('驳回时请填写原因');
      return;
    }
    state.list = state.list.map(function (item) {
      return item.id === id ? Object.assign({}, item, {
        status: mode === '驳回' ? '已驳回' : '已通过',
        approvalRemark: remark,
        lastApprovalAction: mode,
        approvalRecords: (item.approvalRecords || []).concat([{ time: '2026-04-09 15:40', operator: '李国华', action: mode, remark: remark || (mode === '驳回' ? '驳回，请补充明细。' : '审批通过。') }])
      }) : item;
    });
    state.modal = null;
    render();
  }

  function updateCostLiveTotals() {
    var total = 0;
    root.querySelectorAll('[data-cost-amount]').forEach(function (node) {
      var index = node.getAttribute('data-cost-amount');
      var qtyInput = root.querySelector('input[name="detail-qty-' + index + '"]');
      var priceInput = root.querySelector('input[name="detail-price-' + index + '"]');
      var qty = qtyInput ? Number(qtyInput.value) || 0 : 0;
      var price = priceInput ? Number(priceInput.value) || 0 : 0;
      var amount = qty * price;
      node.textContent = amount ? amount.toFixed(2) : '';
      total += amount;
    });
    var totalNode = root.querySelector('[data-cost-total]');
    if (totalNode) totalNode.textContent = total.toFixed(2);
  }

  function revokeCost(id) {
    if (!window.confirm('确认撤销该报价单吗？撤销后状态将变为已撤销。')) return;
    var state = getProjectCostState();
    state.list = state.list.map(function (item) {
      return item.id === id ? Object.assign({}, item, {
        status: '已撤销',
        approvalRecords: (item.approvalRecords || []).concat([{ time: '2026-04-09 16:00', operator: currentUserName(), action: '撤回', remark: '撤回报价单。' }])
      }) : item;
    });
    render();
  }

  function findCost(id) {
    return getProjectCostState().list.find(function (item) { return item.id === id; });
  }

  function appProjectCostDraftItem() {
    return {
      id: '',
      projectId: '',
      projectName: '',
      customerName: '',
      creator: currentUserName(),
      createTime: '2026-04-14 16:30',
      status: '草稿',
      approvalRecords: [{ time: '2026-04-14 16:30', operator: currentUserName(), action: '创建', remark: 'APP端新增报价单草稿。' }],
      details: (data.projectCostOptions.costItems || []).map(function (item) {
        return { name: item.name, unit: item.unit, qty: '', price: '', amount: '', remark: '' };
      })
    };
  }

  function openAppCostDetail(mode, id) {
    appState.ui.appCostMoreOpen = false;
    if (mode === 'create') {
      appState.ui.currentAppCostDetailId = null;
      appState.ui.currentAppCostDetailMode = 'create';
      appState.ui.currentAppCostDraft = appProjectCostDraftItem();
    } else {
      appState.ui.currentAppCostDetailId = id;
      appState.ui.currentAppCostDetailMode = mode || 'view';
      appState.ui.currentAppCostDraft = JSON.parse(JSON.stringify(findCost(id) || {}));
    }
    setRoute('/app/project-cost/detail');
  }

  function currentAppCostDetailItem() {
    if (appState.ui.currentAppCostDetailMode === 'create') return appState.ui.currentAppCostDraft || appProjectCostDraftItem();
    if (!appState.ui.currentAppCostDetailId) return null;
    return appState.ui.currentAppCostDraft || JSON.parse(JSON.stringify(findCost(appState.ui.currentAppCostDetailId) || null));
  }

  function getFilteredAppProjectCosts() {
    var filters = appState.ui.appCostFilters || {};
    var keyword = safeText(filters.keyword).trim();
    var status = safeText(filters.status).trim();
    return (getProjectCostState().list || []).filter(function (item) {
      var matchedKeyword = !keyword || [item.id, item.projectName, item.customerName].some(function (value) { return safeText(value).indexOf(keyword) >= 0; });
      var matchedStatus = !status || appCostMobileStatusText(item.status) === status;
      return matchedKeyword && matchedStatus;
    });
  }

  function appCostMobileStatusText(status) {
    return status === '已通过' ? '已审批' : '待审批';
  }

  function appPurchaseDraftItem() {
    return {
      id: '',
      supplierId: '',
      supplierName: '',
      amount: '¥0.00',
      status: '待审核',
      inboundStatus: '待入库',
      createTime: '',
      creator: currentUserName(),
      approvalRemark: '',
      details: normalizePurchaseOrderDetails([]),
      approvalRecords: []
    };
  }

  function appPurchaseStatusClass(item) {
    if (!item) return 'warning';
    if (safeText(item.inboundStatus) === '已入库') return 'success';
    return badgeClass(item.status || '');
  }

  function appPurchaseStatusText(item) {
    if (!item) return '-';
    return safeText(item.status) + ' / ' + safeText(item.inboundStatus);
  }

  function openAppPurchaseDetail(mode, id) {
    appState.ui.appPurchaseMoreOpen = false;
    if (mode === 'create') {
      appState.ui.currentAppPurchaseDetailId = null;
      appState.ui.currentAppPurchaseDetailMode = 'create';
      appState.ui.currentAppPurchaseDraft = appPurchaseDraftItem();
    } else {
      var source = findManagedItem('purchaseOrder', id) || {};
      appState.ui.currentAppPurchaseDetailId = id;
      appState.ui.currentAppPurchaseDetailMode = mode || 'view';
      appState.ui.currentAppPurchaseDraft = Object.assign({}, source, {
        details: normalizePurchaseOrderDetails(source.details),
        approvalRecords: ((source.approvalRecords || []).map(function (record) { return Object.assign({}, record); }))
      });
    }
    setRoute('/app/purchase-order/detail');
  }

  function currentAppPurchaseDetailItem() {
    if (appState.ui.currentAppPurchaseDetailMode === 'create') return appState.ui.currentAppPurchaseDraft || appPurchaseDraftItem();
    if (!appState.ui.currentAppPurchaseDetailId) return null;
    return appState.ui.currentAppPurchaseDraft || JSON.parse(JSON.stringify(findManagedItem('purchaseOrder', appState.ui.currentAppPurchaseDetailId) || null));
  }

  function getFilteredAppPurchaseOrders() {
    var filters = appState.ui.appPurchaseFilters || {};
    var keyword = safeText(filters.keyword).trim();
    var status = safeText(filters.status).trim();
    var inboundStatus = safeText(filters.inboundStatus).trim();
    return (getPurchaseOrderState().list || []).filter(function (item) {
      var matchedKeyword = !keyword || [item.id, item.supplierName, item.creator, item.amount].some(function (value) { return safeText(value).indexOf(keyword) >= 0; });
      var matchedStatus = !status || safeText(item.status) === status;
      var matchedInbound = !inboundStatus || safeText(item.inboundStatus) === inboundStatus;
      return matchedKeyword && matchedStatus && matchedInbound;
    });
  }

  function appPurchaseInlineField(label, controlHTML) {
    return '<label class="field mobile-cost-detail-inline-field mobile-cost-detail-row-full"><span>' + escapeHtml(label) + '</span>' + controlHTML + '</label>';
  }

  function appPurchaseDetailStatsField(label, controlHTML) {
    return '<div class="mobile-cost-detail-stat"><span>' + escapeHtml(label) + '</span>' + controlHTML + '</div>';
  }

  function appPurchaseDetailRowHTML(detail, index, editable, inboundMode) {
    var fieldFilters = { category: detail.category || '', brand: detail.brand || '' };
    var categoryOptions = optionHTML(uniquePurchaseFieldValues('category'), detail.category || '', '请选择分类');
    var brandOptions = optionHTML(uniquePurchaseFieldValues('brand', { category: detail.category || '' }), detail.brand || '', '请选择品牌');
    var modelOptions = optionHTML(uniquePurchaseFieldValues('model', fieldFilters), detail.model || '', '请选择型号');
    var qty = Number(detail.qty) || 0;
    var price = Number(detail.price) || 0;
    var amount = qty * price;
    return '<div class="mobile-cost-detail-row app-purchase-detail-row">' +
      '<div class="mobile-cost-detail-row-head"><strong>明细 ' + escapeHtml(String(index + 1)) + '</strong>' + (editable ? '<button class="link-btn danger-link" data-action="app-purchase-remove-detail" data-index="' + index + '">删除</button>' : '') + '</div>' +
      '<div class="mobile-cost-detail-grid">' +
      appPurchaseInlineField('分类', editable ? '<select data-app-purchase-detail-field="category" data-index="' + index + '">' + categoryOptions + '</select>' : '<input disabled value="' + escapeHtml(detail.category || '-') + '" />') +
      appPurchaseInlineField('品牌', editable ? '<select data-app-purchase-detail-field="brand" data-index="' + index + '">' + brandOptions + '</select>' : '<input disabled value="' + escapeHtml(detail.brand || '-') + '" />') +
      appPurchaseInlineField('型号', editable ? '<select data-app-purchase-detail-field="model" data-index="' + index + '">' + modelOptions + '</select>' : '<input disabled value="' + escapeHtml(detail.model || '-') + '" />') +
      '<div class="mobile-cost-detail-stats app-device-receive-stats' + (outboundMode ? ' outbound-mode' : '') + '">' +
      appPurchaseDetailStatsField('数量', editable ? '<input type="number" min="0" step="1" data-app-purchase-detail-calc="qty" data-index="' + index + '" value="' + escapeHtml(detail.qty || '') + '" />' : '<input disabled value="' + escapeHtml(detail.qty || '-') + '" />') +
      (inboundMode ? '' : appPurchaseDetailStatsField('单价', editable ? '<input type="number" min="0" step="0.01" data-app-purchase-detail-calc="price" data-index="' + index + '" value="' + escapeHtml(detail.price || '') + '" />' : '<input disabled value="' + escapeHtml(detail.price || '-') + '" />')) +
      (inboundMode ? '' : appPurchaseDetailStatsField('合价', '<input disabled value="' + escapeHtml(amount ? amount.toFixed(2) : (detail.amount || '-')) + '" data-app-purchase-amount="' + index + '" />')) +
      '</div>' +
      '</div></div>';
  }

  function appPurchaseFlowTimelineHTML(item) {
    return approvalTimelineHTML(normalizeDetailFlowRecords((item && item.approvalRecords) || [], item || {})).replace('暂无审批记录', '暂无流转记录');
  }

  function appPurchaseOrderListHTML() {
    var filters = appState.ui.appPurchaseFilters || {};
    var rows = getFilteredAppPurchaseOrders();
    return [
      '<section class="mobile-section">',
      '<div class="mobile-cost-toolbar app-purchase-toolbar"><label class="field mobile-cost-toolbar-keyword"><input data-app-purchase-filter="keyword" value="' + escapeHtml(filters.keyword || '') + '" placeholder="单号/供应商/创建人" /></label><label class="field mobile-cost-toolbar-status"><select data-app-purchase-filter="status">' + optionHTML(data.purchaseOrderOptions.statuses, filters.status || '', '审核状态') + '</select></label><label class="field mobile-cost-toolbar-status"><select data-app-purchase-filter="inboundStatus">' + optionHTML(data.purchaseOrderOptions.inboundStatuses, filters.inboundStatus || '', '入库状态') + '</select></label><div class="mobile-cost-toolbar-actions"><button class="btn secondary mobile-icon-btn" data-action="app-purchase-search" aria-label="检索">⌕</button></div></div>',
      '<div class="mobile-cost-list">' + (rows.map(function (item) {
        return '<button class="mobile-cost-card" data-action="app-purchase-view" data-route="/app/purchase-order/detail" data-id="' + escapeHtml(item.id) + '"><div class="mobile-cost-card-head app-purchase-card-head"><strong>' + escapeHtml(item.id) + '</strong><div class="app-purchase-card-badges"><span class="status ' + appPurchaseStatusClass(item) + '">' + escapeHtml(item.status || '-') + '</span><span class="status ' + badgeClass(item.inboundStatus || '') + '">' + escapeHtml(item.inboundStatus || '-') + '</span></div></div><div class="mobile-cost-card-body"><div class="mobile-cost-card-row"><span>供应商</span><strong>' + escapeHtml(item.supplierName || '-') + '</strong></div><div class="mobile-cost-card-row"><span>金额</span><strong>' + escapeHtml(item.amount || '-') + '</strong></div><div class="mobile-cost-card-row"><span>创建人</span><strong>' + escapeHtml(item.creator || '-') + '</strong></div><div class="mobile-cost-card-row"><span>时间</span><strong>' + escapeHtml(item.createTime || '-') + '</strong></div></div></button>';
      }).join('') || '<div class="empty-state">暂无采购单</div>') + '</div></section>'
    ].join('');
  }

  function appPurchaseOrderDetailHTML() {
    var item = currentAppPurchaseDetailItem();
    if (!item) return '<section class="mobile-section"><div class="empty-state">未找到对应采购单</div></section>';
    var mode = appState.ui.currentAppPurchaseDetailMode || 'view';
    var editable = mode === 'edit' || mode === 'create';
    var approvable = mode === 'approve';
    var inboundMode = mode === 'inbound';
    var amount = purchaseOrderAmountValue(item.details || []);
    var showTimeline = mode !== 'create';
    var primaryAction = mode === 'create'
      ? '<button class="btn primary" data-action="app-purchase-save-create">提交</button>'
      : editable
        ? '<button class="btn primary" data-action="app-purchase-save-edit" data-id="' + escapeHtml(item.id) + '">提交</button>'
        : approvable
          ? '<button class="btn primary" data-action="app-purchase-approve-pass" data-id="' + escapeHtml(item.id) + '">同意</button><button class="btn secondary danger-link" data-action="app-purchase-approve-reject" data-id="' + escapeHtml(item.id) + '">驳回</button>'
          : inboundMode
            ? '<button class="btn primary" data-action="app-purchase-inbound-confirm" data-id="' + escapeHtml(item.id) + '">确认入库</button>'
            : (safeText(item.status) === '待审核'
                ? '<button class="btn primary" data-action="app-purchase-approve" data-id="' + escapeHtml(item.id) + '">审核</button>'
                : safeText(item.inboundStatus) === '待入库'
                  ? '<button class="btn primary" data-action="app-purchase-inbound" data-id="' + escapeHtml(item.id) + '">入库</button>'
                  : '<button class="btn secondary" data-action="app-purchase-edit" data-id="' + escapeHtml(item.id) + '">编辑</button>');
    return [
      '<section class="mobile-section"><div class="section-title"><h4>' + (mode === 'create' ? '新建采购单' : mode === 'approve' ? '采购单审核' : mode === 'inbound' ? '采购单入库' : '采购详情') + '</h4><span>' + escapeHtml(item.id || '待生成') + '</span></div>',
      '<div class="mobile-cost-detail-card">' +
      appPurchaseInlineField('供应商', editable ? '<select data-app-purchase-base="supplierName">' + mappedOptionHTML(purchaseOrderSupplierOptions(), item.supplierName || '', '请选择供应商') + '</select>' : '<input disabled value="' + escapeHtml(item.supplierName || '-') + '" />') +
      appPurchaseInlineField('采购金额', '<input disabled value="' + escapeHtml('¥' + amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + '" data-app-purchase-amount-display />') +
      appPurchaseInlineField('审核状态', '<input disabled value="' + escapeHtml(item.status || '-') + '" />') +
      appPurchaseInlineField('入库状态', '<input disabled value="' + escapeHtml(item.inboundStatus || '-') + '" />') +
      appPurchaseInlineField('创建时间', '<input disabled value="' + escapeHtml(item.createTime || '保存后生成') + '" />') +
      appPurchaseInlineField('创建人', editable ? '<input data-app-purchase-base="creator" value="' + escapeHtml(item.creator || currentUserName()) + '" placeholder="请输入创建人" />' : '<input disabled value="' + escapeHtml(item.creator || currentUserName()) + '" />') +
      '</div>',
      '<div class="mobile-cost-detail-list">' + normalizePurchaseOrderDetails(item.details).map(function (detail, index) { return appPurchaseDetailRowHTML(detail, index, editable, inboundMode); }).join('') + '</div>',
      (editable ? '<div class="mobile-cost-actions"><button class="btn secondary" data-action="app-purchase-add-detail">新增明细</button></div>' : ''),
      (inboundMode ? '' : '<div class="mobile-cost-total">合计：<strong>¥' + escapeHtml(amount.toFixed(2)) + '</strong></div>'),
      (showTimeline ? '<div class="mobile-cost-approval"><div class="section-title"><h4>流转记录</h4><span>' + escapeHtml(appPurchaseStatusText(item)) + '</span></div>' + appPurchaseFlowTimelineHTML(item) + '</div>' : ''),
      (approvable ? '<label class="field"><span>审核意见</span><textarea data-app-purchase-approval-remark placeholder="同意可填写意见，驳回请填写原因">' + escapeHtml(item.approvalRemark || '') + '</textarea></label>' : ''),
      '<div class="mobile-cost-actions mobile-cost-actions-sticky">' + primaryAction + '</div></section>'
    ].join('');
  }

  function syncAppPurchaseBaseField(field, value) {
    var item = currentAppPurchaseDetailItem();
    if (!item) return;
    item[field] = value;
    if (field === 'supplierName') {
      var supplier = (data.supplierList || []).find(function (row) { return row.name === value; }) || {};
      item.supplierId = supplier.id || '';
    }
  }

  function syncAppPurchaseDetailField(index, field, value) {
    var item = currentAppPurchaseDetailItem();
    if (!item) return;
    var details = normalizePurchaseOrderDetails(item.details);
    if (!details[index]) details[index] = createEmptyPurchaseOrderDetail();
    details[index][field] = value;
    if (field === 'category') {
      var brands = uniquePurchaseFieldValues('brand', { category: value });
      details[index].brand = brands.indexOf(details[index].brand) > -1 ? details[index].brand : (brands[0] || '');
      var models = uniquePurchaseFieldValues('model', { category: value, brand: details[index].brand });
      details[index].model = models.indexOf(details[index].model) > -1 ? details[index].model : (models[0] || '');
    }
    if (field === 'brand') {
      var nextModels = uniquePurchaseFieldValues('model', { category: details[index].category || '', brand: value });
      details[index].model = nextModels.indexOf(details[index].model) > -1 ? details[index].model : (nextModels[0] || '');
    }
    item.details = details;
  }

  function syncAppPurchaseCalcField(index, field, value) {
    var item = currentAppPurchaseDetailItem();
    if (!item) return;
    var details = normalizePurchaseOrderDetails(item.details);
    if (!details[index]) details[index] = createEmptyPurchaseOrderDetail();
    details[index][field] = value;
    var qty = Number(details[index].qty) || 0;
    var price = Number(details[index].price) || 0;
    details[index].amount = qty && price ? (qty * price).toFixed(2) : '';
    item.details = details;
  }

  function addAppPurchaseDetail() {
    var item = currentAppPurchaseDetailItem();
    if (!item) return;
    item.details = normalizePurchaseOrderDetails(item.details);
    item.details.push(createEmptyPurchaseOrderDetail());
    render();
  }

  function removeAppPurchaseDetail(index) {
    var item = currentAppPurchaseDetailItem();
    if (!item) return;
    item.details = normalizePurchaseOrderDetails(item.details).filter(function (_, rowIndex) { return rowIndex !== Number(index); });
    if (!item.details.length) item.details = [createEmptyPurchaseOrderDetail()];
    render();
  }

  function saveAppPurchase(mode, id) {
    var state = getPurchaseOrderState();
    var item = JSON.parse(JSON.stringify(currentAppPurchaseDetailItem() || {}));
    if (!safeText(item.supplierName).trim()) {
      window.alert('请选择供应商后再提交。');
      return;
    }
    var details = normalizePurchaseOrderDetails(item.details).map(function (detail) {
      var qty = Number(detail.qty) || 0;
      var price = Number(detail.price) || 0;
      return Object.assign({}, detail, {
        amount: qty && price ? (qty * price).toFixed(2) : ''
      });
    }).filter(function (detail) {
      return detail.category || detail.brand || detail.model || detail.qty || detail.price;
    });
    var invalidDetail = details.some(function (detail) {
      return !detail.category || !detail.brand || !detail.model || !detail.qty || !detail.price;
    });
    if (!details.length || invalidDetail) {
      window.alert('请完整填写至少一条采购明细。');
      return;
    }
    var supplier = (data.supplierList || []).find(function (row) { return row.name === item.supplierName; }) || {};
    var amountText = purchaseOrderAmountText(details);
    var now = '2026-04-15 10:20';
    if (mode === 'create') {
      var newId = managedPageConfigs.purchaseOrder.idPrefix + String(state.nextId).padStart(3, '0');
      var payload = Object.assign({}, item, {
        id: newId,
        supplierId: supplier.id || '',
        amount: amountText,
        status: '待审核',
        inboundStatus: '待入库',
        createTime: now,
        creator: item.creator || currentUserName(),
        details: details,
        approvalRecords: [{ time: now, operator: currentUserName(), action: '创建', remark: 'APP端提交采购单，待审核。' }]
      });
      state.list.unshift(payload);
      state.nextId += 1;
      appState.ui.currentAppPurchaseDraft = null;
      openAppPurchaseDetail('view', newId);
      return;
    }
    state.list = state.list.map(function (row) {
      return row.id === id ? Object.assign({}, row, item, {
        supplierId: supplier.id || row.supplierId || '',
        amount: amountText,
        details: details,
        approvalRecords: (row.approvalRecords || []).concat([{ time: now, operator: currentUserName(), action: '编辑', remark: 'APP端更新采购单信息。' }])
      }) : row;
    });
    appState.ui.currentAppPurchaseDraft = null;
    openAppPurchaseDetail('view', id);
  }

  function approveAppPurchase(id, passed) {
    var remarkNode = root.querySelector('[data-app-purchase-approval-remark]');
    var remark = remarkNode ? safeText(remarkNode.value).trim() : '';
    if (!passed && !remark) {
      window.alert('驳回时请填写审核意见。');
      return;
    }
    var now = '2026-04-15 10:35';
    getPurchaseOrderState().list = getPurchaseOrderState().list.map(function (row) {
      return row.id === id ? Object.assign({}, row, {
        status: passed ? '已审核' : '待审核',
        approvalRemark: remark,
        approvalRecords: (row.approvalRecords || []).concat([{
          time: now,
          operator: currentUserName(),
          action: passed ? '同意' : '驳回',
          remark: remark || 'APP端审核通过。'
        }])
      }) : row;
    });
    openAppPurchaseDetail('view', id);
  }

  function inboundAppPurchase(id) {
    var now = '2026-04-15 10:45';
    getPurchaseOrderState().list = getPurchaseOrderState().list.map(function (row) {
      if (row.id !== id) return row;
      return Object.assign({}, row, {
        status: '已入库',
        inboundStatus: '已入库',
        approvalRemark: row.approvalRemark || 'APP端已完成入库。',
        approvalRecords: (row.approvalRecords || []).concat([{
          time: now,
          operator: currentUserName(),
          action: '入库',
          remark: 'APP端完成采购明细入库。'
        }])
      });
    });
    var purchase = findManagedItem('purchaseOrder', id);
    if (purchase) {
      var firstDetail = normalizePurchaseOrderDetails(purchase.details)[0] || {};
      pushInboundRecord('采购入库', purchase.id, firstDetail.model || '采购物资', String(normalizePurchaseOrderDetails(purchase.details).length) + '项');
    }
    openAppPurchaseDetail('view', id);
  }

  function deleteAppPurchase(id) {
    if (!window.confirm('确认删除该采购单吗？此操作仅影响演示数据。')) return;
    getPurchaseOrderState().list = getPurchaseOrderState().list.filter(function (row) { return row.id !== id; });
    appState.ui.currentAppPurchaseDraft = null;
    setRoute('/app/purchase-order');
  }

  function appDeviceReceiveDraftItem() {
    return {
      id: '',
      creator: currentUserName(),
      status: '待审核',
      createTime: '',
      remark: '',
      projectNames: '',
      qtySummary: '',
      projectCards: normalizeDeviceReceiveCards([]),
      approvalRecords: []
    };
  }

  function openAppDeviceReceiveDetail(mode, id) {
    appState.ui.appDeviceReceiveMoreOpen = false;
    appState.ui.currentAppDeviceReceivePicker = null;
    if (mode === 'create') {
      appState.ui.currentAppDeviceReceiveDetailId = null;
      appState.ui.currentAppDeviceReceiveDetailMode = 'create';
      appState.ui.currentAppDeviceReceiveDraft = appDeviceReceiveDraftItem();
    } else {
      var source = findManagedItem('deviceReceive', id) || {};
      appState.ui.currentAppDeviceReceiveDetailId = id;
      appState.ui.currentAppDeviceReceiveDetailMode = mode || 'view';
      appState.ui.currentAppDeviceReceiveDraft = Object.assign({}, source, {
        projectCards: normalizeDeviceReceiveCards(source.projectCards),
        approvalRecords: (source.approvalRecords || []).map(function (record) { return Object.assign({}, record); })
      });
    }
    setRoute('/app/device-receive/detail');
  }

  function currentAppDeviceReceiveDetailItem() {
    if (appState.ui.currentAppDeviceReceiveDetailMode === 'create') return appState.ui.currentAppDeviceReceiveDraft || appDeviceReceiveDraftItem();
    if (!appState.ui.currentAppDeviceReceiveDetailId) return null;
    return appState.ui.currentAppDeviceReceiveDraft || JSON.parse(JSON.stringify(findManagedItem('deviceReceive', appState.ui.currentAppDeviceReceiveDetailId) || null));
  }

  function getFilteredAppDeviceReceiveRows() {
    var filters = appState.ui.appDeviceReceiveFilters || {};
    var keyword = safeText(filters.keyword).trim();
    var status = safeText(filters.status).trim();
    return (getManagedState('deviceReceive').list || []).filter(function (item) {
      var matchedKeyword = !keyword || [item.id, item.creator, item.projectNames, item.qtySummary].some(function (value) { return safeText(value).indexOf(keyword) >= 0; });
      var matchedStatus = !status || safeText(item.status) === status;
      return matchedKeyword && matchedStatus;
    });
  }

  function appDeviceReceiveNeedSummary(cards) {
    var summary = buildDeviceReceiveSummary(cards || []);
    return { projectNames: summary.projectNames || '-', qtySummary: summary.qtySummary || '-' };
  }

  function appDeviceReceiveListHTML() {
    var filters = appState.ui.appDeviceReceiveFilters || {};
    var rows = getFilteredAppDeviceReceiveRows();
    return [
      '<section class="mobile-section">',
      '<div class="mobile-cost-toolbar mobile-cost-toolbar-inline"><label class="field mobile-cost-toolbar-keyword"><input data-app-device-receive-filter="keyword" value="' + escapeHtml(filters.keyword || '') + '" placeholder="单号/创建人/项目" /></label><label class="field mobile-cost-toolbar-status"><select data-app-device-receive-filter="status">' + optionHTML(['待审核', '待出库', '已出库', '已撤销'], filters.status || '', '全部状态') + '</select></label><div class="mobile-cost-toolbar-actions"><button class="btn secondary mobile-icon-btn" data-action="app-device-receive-search" aria-label="检索">⌕</button></div></div>',
      '<div class="mobile-cost-list">' + (rows.map(function (item) {
        return '<button class="mobile-cost-card" data-action="app-device-receive-view" data-id="' + escapeHtml(item.id) + '"><div class="mobile-cost-card-head"><strong>' + escapeHtml(item.id || '-') + '</strong><span class="status ' + badgeClass(item.status || '') + '">' + escapeHtml(item.status || '-') + '</span></div><div class="mobile-cost-card-body"><div class="mobile-cost-card-row"><span>创建人</span><strong>' + escapeHtml(item.creator || '-') + '</strong></div><div class="mobile-cost-card-row"><span>项目</span><strong>' + escapeHtml(item.projectNames || '-') + '</strong></div><div class="mobile-cost-card-row"><span>数量</span><strong>' + escapeHtml(item.qtySummary || '-') + '</strong></div><div class="mobile-cost-card-row"><span>时间</span><strong>' + escapeHtml(item.createTime || '-') + '</strong></div></div></button>';
      }).join('') || '<div class="empty-state">暂无设备领用单</div>') + '</div></section>'
    ].join('');
  }

  function appDeviceReceiveInlineField(label, controlHTML) {
    return '<label class="field mobile-cost-detail-inline-field mobile-cost-detail-row-full"><span>' + escapeHtml(label) + '</span>' + controlHTML + '</label>';
  }

  function getAppDeviceReceiveNeed(cardIndex, needIndex) {
    var item = currentAppDeviceReceiveDetailItem();
    if (!item || !item.projectCards || !item.projectCards[cardIndex]) return null;
    return item.projectCards[cardIndex].needs[needIndex] || null;
  }

  function getAppDeviceReceiveSelectedDeviceIds(cardIndex, needIndex) {
    var item = currentAppDeviceReceiveDetailItem();
    var selectedIds = [];
    if (!item || !item.projectCards) return selectedIds;
    (item.projectCards || []).forEach(function (card, currentCardIndex) {
      (card.needs || []).forEach(function (need, currentNeedIndex) {
        if (currentCardIndex === cardIndex && currentNeedIndex === needIndex) return;
        (need.selectedDevices || []).forEach(function (device) {
          if (device && device.id) selectedIds.push(device.id);
        });
      });
    });
    return selectedIds;
  }

  function getSelectableAppDeviceReceiveDevices(cardIndex, needIndex) {
    var need = getAppDeviceReceiveNeed(cardIndex, needIndex);
    if (!need) return [];
    var occupiedIds = getAppDeviceReceiveSelectedDeviceIds(cardIndex, needIndex);
    var currentIds = ((need.selectedDevices) || []).map(function (device) { return device.id; });
    return (getManagedState('deviceArchive').list || []).filter(function (device) {
      if (device.status !== '闲置设备') return false;
      if (need.category && device.category !== need.category) return false;
      if (need.brand && device.brand !== need.brand) return false;
      if (need.model && device.model !== need.model) return false;
      if (occupiedIds.indexOf(device.id) > -1 && currentIds.indexOf(device.id) === -1) return false;
      return true;
    });
  }

  function appDeviceReceiveNeedRowHTML(need, cardIndex, needIndex, editable, outboundMode) {
    var category = need.category || deviceReceiveNeedOptions()[0] || '';
    var brand = need.brand || deviceReceiveBrandOptions(category)[0] || '';
    var model = need.model || deviceReceiveModelOptions(category, brand)[0] || '';
    var selectedDevices = need.selectedDevices || [];
    syncDeviceReceiveOutboundQty(need);
    return '<div class="mobile-cost-detail-row">' +
      '<div class="mobile-cost-detail-row-head"><strong>设备需求 ' + escapeHtml(String(needIndex + 1)) + '</strong>' + (editable ? '<button class="link-btn danger-link" data-action="app-device-receive-remove-need" data-card-index="' + cardIndex + '" data-need-index="' + needIndex + '">删除</button>' : '') + '</div>' +
      '<div class="mobile-cost-detail-grid">' +
      appDeviceReceiveInlineField('分类', editable ? '<select data-app-device-receive-need-field="category" data-card-index="' + cardIndex + '" data-need-index="' + needIndex + '">' + optionHTML(deviceReceiveNeedOptions(), category, '请选择分类') + '</select>' : '<input disabled value="' + escapeHtml(category || '-') + '" />') +
      appDeviceReceiveInlineField('品牌', editable ? '<select data-app-device-receive-need-field="brand" data-card-index="' + cardIndex + '" data-need-index="' + needIndex + '">' + optionHTML(deviceReceiveBrandOptions(category), brand, '请选择品牌') + '</select>' : '<input disabled value="' + escapeHtml(brand || '-') + '" />') +
      appDeviceReceiveInlineField('型号', editable ? '<select data-app-device-receive-need-field="model" data-card-index="' + cardIndex + '" data-need-index="' + needIndex + '">' + optionHTML(deviceReceiveModelOptions(category, brand), model, '请选择型号') + '</select>' : '<input disabled value="' + escapeHtml(model || '-') + '" />') +
      (outboundMode
        ? '<div class="mobile-cost-detail-stats"><div class="mobile-cost-detail-stat"><span>需求数量</span><input disabled value="' + escapeHtml(need.qty || '-') + '" /></div><div class="mobile-cost-detail-stat"><span>出库数量</span><input disabled value="' + escapeHtml(need.outboundQty || '0') + '" /></div><div class="mobile-cost-detail-stat"><span>已选设备</span><input disabled value="' + escapeHtml(String(selectedDevices.length)) + '" /></div></div>'
        : appDeviceReceiveInlineField('需求数量', editable ? '<input type="number" min="0" step="1" data-app-device-receive-need-field="qty" data-card-index="' + cardIndex + '" data-need-index="' + needIndex + '" value="' + escapeHtml(need.qty || '') + '" />' : '<input disabled value="' + escapeHtml(need.qty || '-') + '" />')) +
      (outboundMode ? '<div class="mobile-cost-actions"><button class="btn secondary" data-action="app-device-receive-open-picker" data-card-index="' + cardIndex + '" data-need-index="' + needIndex + '">选择设备</button></div>' : '') +
      (outboundMode ? '<div class="app-device-receive-chip-list">' + ((selectedDevices.map(function (device) { return '<button class="app-device-receive-chip" data-action="app-device-receive-remove-device" data-card-index="' + cardIndex + '" data-need-index="' + needIndex + '" data-device-id="' + escapeHtml(device.id) + '">' + escapeHtml(device.code || device.name || '-') + ' ×</button>'; }).join('')) || '<div class="empty-state">暂未选择出库设备</div>') + '</div>' : '') +
      '</div></div>';
  }

  function appDeviceReceiveProjectCardHTML(card, cardIndex, mode) {
    var editable = mode === 'create' || mode === 'edit';
    var outboundMode = mode === 'outbound';
    var projectOptions = mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) { return { value: project.id, label: project.name }; }), card.projectId || '', '请选择项目');
    return '<div class="mobile-cost-detail-row app-device-receive-project-card">' +
      '<div class="mobile-cost-detail-row-head"><strong>项目卡片 ' + escapeHtml(String(cardIndex + 1)) + '</strong>' + (editable ? '<button class="link-btn danger-link" data-action="app-device-receive-remove-card" data-card-index="' + cardIndex + '">删除项目</button>' : '') + '</div>' +
      '<div class="mobile-cost-detail-grid">' +
      appDeviceReceiveInlineField('所属项目', editable ? '<select data-app-device-receive-card-project="' + cardIndex + '">' + projectOptions + '</select>' : '<input disabled value="' + escapeHtml(card.projectName || '-') + '" />') +
      '<div class="mobile-cost-detail-list">' + (card.needs || []).map(function (need, needIndex) { return appDeviceReceiveNeedRowHTML(need, cardIndex, needIndex, editable, outboundMode); }).join('') + '</div>' +
      (editable ? '<div class="mobile-cost-actions"><button class="btn secondary" data-action="app-device-receive-add-need" data-card-index="' + cardIndex + '">新增设备需求</button></div>' : '') +
      '</div></div>';
  }

  function appDeviceReceivePickerHTML() {
    var picker = appState.ui.currentAppDeviceReceivePicker;
    if (!picker) return '';
    var need = getAppDeviceReceiveNeed(picker.cardIndex, picker.needIndex);
    if (!need) return '';
    var devices = getSelectableAppDeviceReceiveDevices(picker.cardIndex, picker.needIndex);
    var selectedIds = (need.selectedDevices || []).map(function (device) { return device.id; });
    return '<div class="modal-mask" data-action="app-device-receive-picker-close"><div class="modal-card customer-modal app-device-receive-picker-modal" data-stop-close="1"><div class="modal-header"><div><h3>选择出库设备</h3><p>' + escapeHtml((need.category || '-') + ' / ' + (need.brand || '-') + ' / ' + (need.model || '-')) + '</p></div><button class="icon-btn" data-action="app-device-receive-picker-close">×</button></div><div class="modal-body"><div class="mobile-cost-list">' + ((devices.map(function (device) {
      var selected = selectedIds.indexOf(device.id) > -1;
      return '<button class="mobile-cost-card" data-action="app-device-receive-toggle-picker-device" data-device-id="' + escapeHtml(device.id) + '"><div class="mobile-cost-card-head"><strong>' + escapeHtml(device.code || '-') + '</strong><span class="status ' + (selected ? 'success' : 'warning') + '">' + (selected ? '已选择' : '可选择') + '</span></div><div class="mobile-cost-card-body"><div class="mobile-cost-card-row"><span>名称</span><strong>' + escapeHtml(device.name || '-') + '</strong></div><div class="mobile-cost-card-row"><span>批次</span><strong>' + escapeHtml(device.batch || '-') + '</strong></div><div class="mobile-cost-card-row"><span>入库</span><strong>' + escapeHtml(device.inboundTime || device.installDate || '-') + '</strong></div></div></button>';
    }).join('')) || '<div class="empty-state">暂无可选择的闲置设备</div>') + '</div></div><div class="modal-footer"><button class="btn primary" data-action="app-device-receive-picker-close">完成</button></div></div></div>';
  }

  function appDeviceReceiveDetailHTML() {
    var item = currentAppDeviceReceiveDetailItem();
    if (!item) return '<section class="mobile-section"><div class="empty-state">未找到对应领用单</div></section>';
    var mode = appState.ui.currentAppDeviceReceiveDetailMode || 'view';
    var editable = mode === 'create' || mode === 'edit';
    var approvable = mode === 'approve';
    var outboundMode = mode === 'outbound';
    var summary = appDeviceReceiveNeedSummary(item.projectCards || []);
    var primaryAction = mode === 'create'
      ? '<button class="btn primary" data-action="app-device-receive-save-create">提交</button>'
      : editable
        ? '<button class="btn primary" data-action="app-device-receive-save-edit" data-id="' + escapeHtml(item.id) + '">提交</button>'
        : approvable
          ? '<button class="btn primary" data-action="app-device-receive-approve-pass" data-id="' + escapeHtml(item.id) + '">同意</button><button class="btn secondary danger-link" data-action="app-device-receive-approve-reject" data-id="' + escapeHtml(item.id) + '">驳回</button>'
          : outboundMode
            ? '<button class="btn primary" data-action="app-device-receive-outbound-confirm" data-id="' + escapeHtml(item.id) + '">确认出库</button>'
            : (safeText(item.status) === '待审核'
                ? '<button class="btn primary" data-action="app-device-receive-approve" data-id="' + escapeHtml(item.id) + '">审批</button>'
                : safeText(item.status) === '待出库'
                  ? '<button class="btn primary" data-action="app-device-receive-outbound" data-id="' + escapeHtml(item.id) + '">出库</button>'
                  : '<button class="btn secondary" data-action="app-device-receive-edit" data-id="' + escapeHtml(item.id) + '">编辑</button>');
    return [
      '<section class="mobile-section"><div class="section-title"><h4>' + (mode === 'create' ? '新建设备领用单' : mode === 'approve' ? '设备领用审批' : mode === 'outbound' ? '设备领用出库' : '领用详情') + '</h4><span>' + escapeHtml(item.id || '待生成') + '</span></div>',
      '<div class="mobile-cost-detail-card">' +
      appDeviceReceiveInlineField('创建人', editable ? '<input data-app-device-receive-base="creator" value="' + escapeHtml(item.creator || currentUserName()) + '" placeholder="请输入创建人" />' : '<input disabled value="' + escapeHtml(item.creator || '-') + '" />') +
      appDeviceReceiveInlineField('状态', '<input disabled value="' + escapeHtml(item.status || '-') + '" />') +
      appDeviceReceiveInlineField('创建时间', '<input disabled value="' + escapeHtml(item.createTime || '保存后生成') + '" />') +
      appDeviceReceiveInlineField('所属项目', '<input disabled value="' + escapeHtml(summary.projectNames) + '" />') +
      appDeviceReceiveInlineField('设备数量', '<input disabled value="' + escapeHtml(summary.qtySummary) + '" />') +
      '<label class="field"><span>备注</span>' + (editable ? '<textarea data-app-device-receive-base="remark" placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea>' : '<textarea disabled>' + escapeHtml(item.remark || '-') + '</textarea>') + '</label>' +
      '</div>',
      '<div class="mobile-cost-detail-list">' + (item.projectCards || []).map(function (card, cardIndex) { return appDeviceReceiveProjectCardHTML(card, cardIndex, mode); }).join('') + '</div>',
      (editable ? '<div class="mobile-cost-actions"><button class="btn secondary" data-action="app-device-receive-add-card">新增项目</button></div>' : ''),
      (mode === 'create' ? '' : '<div class="mobile-cost-approval"><div class="section-title"><h4>流转记录</h4><span></span></div>' + approvalTimelineHTML(item.approvalRecords || []).replace('暂无审批记录', '暂无流转记录') + '</div>'),
      (approvable ? '<label class="field"><span>审批意见</span><textarea data-app-device-receive-approval-remark placeholder="同意可选填，驳回请填写原因"></textarea></label>' : ''),
      '<div class="mobile-cost-actions mobile-cost-actions-sticky">' + primaryAction + '</div></section>' + appDeviceReceivePickerHTML()
    ].join('');
  }

  function syncAppDeviceReceiveBaseField(field, value) {
    var item = currentAppDeviceReceiveDetailItem();
    if (!item) return;
    item[field] = value;
  }

  function syncAppDeviceReceiveProject(cardIndex, projectId) {
    var item = currentAppDeviceReceiveDetailItem();
    if (!item || !item.projectCards || !item.projectCards[cardIndex]) return;
    var project = getAllProjectItems(getProjectArchiveState().tree).find(function (row) { return row.id === projectId; }) || { id: projectId, name: '' };
    item.projectCards[cardIndex].projectId = project.id;
    item.projectCards[cardIndex].projectName = project.name;
  }

  function syncAppDeviceReceiveNeedField(cardIndex, needIndex, field, value) {
    var item = currentAppDeviceReceiveDetailItem();
    if (!item || !item.projectCards || !item.projectCards[cardIndex]) return;
    var need = item.projectCards[cardIndex].needs[needIndex];
    if (!need) return;
    need[field] = value;
    if (field === 'category') {
      need.brand = deviceReceiveBrandOptions(value)[0] || '';
      need.model = deviceReceiveModelOptions(value, need.brand)[0] || '';
      need.selectedDevices = [];
      need.outboundQty = '';
    } else if (field === 'brand') {
      need.model = deviceReceiveModelOptions(need.category, value)[0] || '';
      need.selectedDevices = [];
      need.outboundQty = '';
    } else if (field === 'model') {
      need.selectedDevices = [];
      need.outboundQty = '';
    }
  }

  function addAppDeviceReceiveCard() {
    var item = currentAppDeviceReceiveDetailItem();
    if (!item) return;
    item.projectCards = normalizeDeviceReceiveCards(item.projectCards);
    item.projectCards.push(normalizeDeviceReceiveCards([])[0]);
    render();
  }

  function removeAppDeviceReceiveCard(cardIndex) {
    var item = currentAppDeviceReceiveDetailItem();
    if (!item || !item.projectCards) return;
    item.projectCards = item.projectCards.filter(function (_, index) { return index !== Number(cardIndex); });
    if (!item.projectCards.length) item.projectCards = normalizeDeviceReceiveCards([]);
    render();
  }

  function addAppDeviceReceiveNeed(cardIndex) {
    var item = currentAppDeviceReceiveDetailItem();
    if (!item || !item.projectCards || !item.projectCards[cardIndex]) return;
    item.projectCards[cardIndex].needs.push(createDeviceReceiveNeed());
    render();
  }

  function removeAppDeviceReceiveNeed(cardIndex, needIndex) {
    var item = currentAppDeviceReceiveDetailItem();
    if (!item || !item.projectCards || !item.projectCards[cardIndex]) return;
    var card = item.projectCards[cardIndex];
    card.needs = card.needs.filter(function (_, index) { return index !== Number(needIndex); });
    if (!card.needs.length) card.needs = [createDeviceReceiveNeed()];
    render();
  }

  function openAppDeviceReceivePicker(cardIndex, needIndex) {
    appState.ui.currentAppDeviceReceivePicker = { cardIndex: Number(cardIndex), needIndex: Number(needIndex) };
    render();
  }

  function closeAppDeviceReceivePicker() {
    appState.ui.currentAppDeviceReceivePicker = null;
    render();
  }

  function toggleAppDeviceReceivePickerDevice(deviceId) {
    var picker = appState.ui.currentAppDeviceReceivePicker;
    if (!picker) return;
    var need = getAppDeviceReceiveNeed(picker.cardIndex, picker.needIndex);
    if (!need) return;
    var selectedDevices = (need.selectedDevices || []).map(function (device) { return Object.assign({}, device); });
    var currentIndex = selectedDevices.findIndex(function (device) { return device.id === deviceId; });
    if (currentIndex > -1) {
      selectedDevices.splice(currentIndex, 1);
    } else {
      var raw = (getManagedState('deviceArchive').list || []).find(function (device) { return device.id === deviceId; });
      if (!raw) return;
      selectedDevices.push({
        id: raw.id,
        code: raw.code,
        name: raw.name,
        batch: raw.batch || raw.warehouse || '-',
        inboundTime: raw.inboundTime || raw.installDate || '-'
      });
    }
    need.selectedDevices = selectedDevices;
    syncDeviceReceiveOutboundQty(need);
    render();
  }

  function removeAppDeviceReceiveSelectedDevice(cardIndex, needIndex, deviceId) {
    var need = getAppDeviceReceiveNeed(Number(cardIndex), Number(needIndex));
    if (!need) return;
    need.selectedDevices = (need.selectedDevices || []).filter(function (device) { return device.id !== deviceId; });
    syncDeviceReceiveOutboundQty(need);
    render();
  }

  function saveAppDeviceReceive(mode, id) {
    var state = getManagedState('deviceReceive');
    var item = JSON.parse(JSON.stringify(currentAppDeviceReceiveDetailItem() || {}));
    var creator = safeText(item.creator).trim() || currentUserName();
    var projectCards = normalizeDeviceReceiveCards(item.projectCards).map(function (card) {
      return {
        projectId: card.projectId,
        projectName: card.projectName,
        needs: (card.needs || []).map(function (need) {
          return createDeviceReceiveNeed(need);
        })
      };
    }).filter(function (card) { return card.projectId || card.projectName; });
    if (!projectCards.length) return window.alert('请至少填写一个项目领用卡片');
    var invalidCard = projectCards.find(function (card) {
      return !card.projectId || !(card.needs || []).length || card.needs.some(function (need) { return !need.category || !need.brand || !need.model || !need.qty; });
    });
    if (invalidCard) return window.alert('请完整填写所属项目及设备分类、品牌、型号、需求数量');
    var summary = buildDeviceReceiveSummary(projectCards);
    var now = '2026-04-15 11:20';
    if (mode === 'create') {
      var payload = {
        id: 'LY-202604-' + String(state.nextId).padStart(3, '0'),
        creator: creator,
        createTime: now,
        status: '待审核',
        remark: safeText(item.remark).trim(),
        projectCards: projectCards,
        projectNames: summary.projectNames,
        qtySummary: summary.qtySummary,
        approvalRecords: [{ time: now, operator: creator, action: '创建', remark: 'APP端提交设备领用申请，待审核。' }]
      };
      state.list.unshift(payload);
      state.nextId += 1;
      appState.ui.currentAppDeviceReceiveDraft = null;
      openAppDeviceReceiveDetail('view', payload.id);
      return;
    }
    state.list = state.list.map(function (row) {
      return row.id === id ? Object.assign({}, row, {
        creator: creator,
        remark: safeText(item.remark).trim(),
        projectCards: projectCards,
        projectNames: summary.projectNames,
        qtySummary: summary.qtySummary,
        approvalRecords: (row.approvalRecords || []).concat([{ time: now, operator: creator, action: '编辑', remark: 'APP端更新设备领用申请。' }])
      }) : row;
    });
    appState.ui.currentAppDeviceReceiveDraft = null;
    openAppDeviceReceiveDetail('view', id);
  }

  function approveAppDeviceReceive(id, passed) {
    var remarkNode = root.querySelector('[data-app-device-receive-approval-remark]');
    var remark = remarkNode ? safeText(remarkNode.value).trim() : '';
    if (!passed && !remark) return window.alert('驳回时请填写审批意见');
    var now = '2026-04-15 11:35';
    getManagedState('deviceReceive').list = getManagedState('deviceReceive').list.map(function (row) {
      return row.id === id ? Object.assign({}, row, {
        status: passed ? '待出库' : '待审核',
        approvalRecords: (row.approvalRecords || []).concat([{ time: now, operator: currentUserName(), action: passed ? '同意' : '驳回', remark: remark || 'APP端审批通过，待出库。' }])
      }) : row;
    });
    openAppDeviceReceiveDetail('view', id);
  }

  function outboundAppDeviceReceive(id) {
    var item = JSON.parse(JSON.stringify(currentAppDeviceReceiveDetailItem() || {}));
    var projectCards = normalizeDeviceReceiveCards(item.projectCards);
    var totalOutboundQty = 0;
    var invalidNeed = null;
    projectCards.forEach(function (card) {
      (card.needs || []).forEach(function (need) {
        syncDeviceReceiveOutboundQty(need);
        var selectedCount = (need.selectedDevices || []).length;
        var needQty = Number(need.qty) || 0;
        if (selectedCount > needQty) invalidNeed = need;
        if (selectedCount > 0) totalOutboundQty += selectedCount;
      });
    });
    if (invalidNeed) return window.alert('出库设备数量不能超过需求数量');
    if (!totalOutboundQty) return window.alert('请至少选择一台出库设备');
    var summary = buildDeviceReceiveSummary(projectCards);
    var now = '2026-04-15 11:45';
    getManagedState('deviceReceive').list = getManagedState('deviceReceive').list.map(function (row) {
      return row.id === id ? Object.assign({}, row, {
        status: '已出库',
        projectCards: projectCards,
        projectNames: summary.projectNames,
        qtySummary: summary.qtySummary,
        approvalRecords: (row.approvalRecords || []).concat([{ time: now, operator: currentUserName(), action: '出库', remark: 'APP端完成设备领用出库。' }])
      }) : row;
    });
    pushOutboundRecord('领用出库', id, summary.projectNames || '多项目领用', totalOutboundQty + '台');
    openAppDeviceReceiveDetail('view', id);
  }

  function revokeAppDeviceReceive(id) {
    if (!window.confirm('确认撤销该领用单吗？')) return;
    var now = '2026-04-15 11:50';
    getManagedState('deviceReceive').list = getManagedState('deviceReceive').list.map(function (row) {
      return row.id === id ? Object.assign({}, row, {
        status: '已撤销',
        approvalRecords: (row.approvalRecords || []).concat([{ time: now, operator: currentUserName(), action: '撤销', remark: 'APP端撤销设备领用单。' }])
      }) : row;
    });
    openAppDeviceReceiveDetail('view', id);
  }

  function deleteAppDeviceReceive(id) {
    if (!window.confirm('确认删除该领用单吗？此操作仅影响演示数据。')) return;
    getManagedState('deviceReceive').list = getManagedState('deviceReceive').list.filter(function (row) { return row.id !== id; });
    appState.ui.currentAppDeviceReceiveDraft = null;
    setRoute('/app/device-receive');
  }

  function appDeviceReturnDraftItem() {
    return normalizeDeviceReturnItem({
      creator: currentUserName(),
      createTime: '',
      status: '待入库',
      selectedDevices: [],
      approvalRecords: []
    });
  }

  function openAppDeviceReturnDetail(mode, id) {
    appState.ui.appDeviceReturnMoreOpen = false;
    appState.ui.currentAppDeviceReturnPickerOpen = false;
    if (mode === 'create') {
      appState.ui.currentAppDeviceReturnDetailId = null;
      appState.ui.currentAppDeviceReturnDetailMode = 'create';
      appState.ui.currentAppDeviceReturnDraft = appDeviceReturnDraftItem();
    } else {
      var source = findManagedItem('deviceReturn', id) || {};
      appState.ui.currentAppDeviceReturnDetailId = id;
      appState.ui.currentAppDeviceReturnDetailMode = mode || 'view';
      appState.ui.currentAppDeviceReturnDraft = normalizeDeviceReturnItem(source);
    }
    setRoute('/app/device-return/detail');
  }

  function currentAppDeviceReturnDetailItem() {
    if (appState.ui.currentAppDeviceReturnDetailMode === 'create') return appState.ui.currentAppDeviceReturnDraft || appDeviceReturnDraftItem();
    if (!appState.ui.currentAppDeviceReturnDetailId) return null;
    return appState.ui.currentAppDeviceReturnDraft || normalizeDeviceReturnItem(findManagedItem('deviceReturn', appState.ui.currentAppDeviceReturnDetailId) || null);
  }

  function getFilteredAppDeviceReturnRows() {
    var filters = appState.ui.appDeviceReturnFilters || {};
    var keyword = safeText(filters.keyword).trim();
    var status = safeText(filters.status).trim();
    return (getManagedState('deviceReturn').list || []).map(function (row) { return normalizeDeviceReturnItem(row); }).filter(function (item) {
      var matchedKeyword = !keyword || [item.id, deviceReturnCreatorName(item), item.projectName, item.qty].some(function (value) { return safeText(value).indexOf(keyword) >= 0; });
      var matchedStatus = !status || safeText(item.status) === status;
      return matchedKeyword && matchedStatus;
    });
  }

  function getAppDeviceReturnSelectableDevices() {
    var item = currentAppDeviceReturnDetailItem();
    var selectedIds = ((item && item.selectedDevices) || []).map(function (device) { return device.id; });
    return (getManagedState('deviceArchive').list || []).filter(function (device) {
      return device.status !== '已报废设备' || selectedIds.indexOf(device.id) > -1;
    });
  }

  function getFilteredAppDeviceReturnSelectableDevices() {
    var filters = appState.ui.appDeviceReturnPickerFilters || {};
    var keyword = safeText(filters.keyword).trim();
    var category = safeText(filters.category).trim();
    var brand = safeText(filters.brand).trim();
    var model = safeText(filters.model).trim();
    return getAppDeviceReturnSelectableDevices().filter(function (device) {
      var matchedKeyword = !keyword || [device.code, device.name, device.category, device.brand, device.model, device.batch, device.warehouse].some(function (value) {
        return safeText(value).indexOf(keyword) >= 0;
      });
      var matchedCategory = !category || safeText(device.category) === category;
      var matchedBrand = !brand || safeText(device.brand) === brand;
      var matchedModel = !model || safeText(device.model) === model;
      return matchedKeyword && matchedCategory && matchedBrand && matchedModel;
    });
  }

  function appDeviceReturnListHTML() {
    var filters = appState.ui.appDeviceReturnFilters || {};
    var rows = getFilteredAppDeviceReturnRows();
    return [
      '<section class="mobile-section">',
      '<div class="mobile-cost-toolbar mobile-cost-toolbar-inline"><label class="field mobile-cost-toolbar-keyword"><input data-app-device-return-filter="keyword" value="' + escapeHtml(filters.keyword || '') + '" placeholder="单号/创建人/项目" /></label><label class="field mobile-cost-toolbar-status"><select data-app-device-return-filter="status">' + optionHTML(['待入库', '已入库', '已撤销'], filters.status || '', '全部状态') + '</select></label><div class="mobile-cost-toolbar-actions"><button class="btn secondary mobile-icon-btn" data-action="app-device-return-search" aria-label="检索">⌕</button></div></div>',
      '<div class="mobile-cost-list">' + (rows.map(function (item) {
        return '<button class="mobile-cost-card" data-action="app-device-return-view" data-id="' + escapeHtml(item.id) + '"><div class="mobile-cost-card-head"><strong>' + escapeHtml(item.id || '-') + '</strong><span class="status ' + badgeClass(item.status || '') + '">' + escapeHtml(item.status || '-') + '</span></div><div class="mobile-cost-card-body"><div class="mobile-cost-card-row"><span>创建人</span><strong>' + escapeHtml(deviceReturnCreatorName(item)) + '</strong></div><div class="mobile-cost-card-row"><span>项目</span><strong>' + escapeHtml(item.projectName || '-') + '</strong></div><div class="mobile-cost-card-row"><span>数量</span><strong>' + escapeHtml((Number(item.qty) || 0) + '台') + '</strong></div><div class="mobile-cost-card-row"><span>时间</span><strong>' + escapeHtml(item.createTime || '-') + '</strong></div></div></button>';
      }).join('') || '<div class="empty-state">暂无设备退回单</div>') + '</div></section>'
    ].join('');
  }

  function appDeviceReturnSelectedListHTML(item, editable) {
    var devices = item.selectedDevices || [];
    return '<div class="mobile-cost-list">' + ((devices.map(function (device) {
      return '<div class="mobile-cost-card"><div class="mobile-cost-card-head"><strong>' + escapeHtml(device.code || '-') + '</strong>' + (editable ? '<button class="link-btn danger-link" data-action="app-device-return-remove-device" data-device-id="' + escapeHtml(device.id) + '">移除</button>' : '') + '</div><div class="mobile-cost-card-body"><div class="mobile-cost-card-row"><span>名称</span><strong>' + escapeHtml(device.name || '-') + '</strong></div><div class="mobile-cost-card-row"><span>批次</span><strong>' + escapeHtml(device.batch || '-') + '</strong></div><div class="mobile-cost-card-row"><span>入库</span><strong>' + escapeHtml(device.inboundTime || '-') + '</strong></div></div></div>';
    }).join('')) || '<div class="empty-state">暂未选择退回设备</div>') + '</div>';
  }

  function appDeviceReturnPickerHTML() {
    if (!appState.ui.currentAppDeviceReturnPickerOpen) return '';
    var item = currentAppDeviceReturnDetailItem() || {};
    var selectedDevices = item.selectedDevices || [];
    var selectedIds = selectedDevices.map(function (device) { return device.id; });
    var filters = appState.ui.appDeviceReturnPickerFilters || {};
    var rows = getFilteredAppDeviceReturnSelectableDevices();
    return '<div class="modal-mask" data-action="app-device-return-picker-close"><div class="modal-card customer-modal app-device-receive-picker-modal app-device-return-picker-modal" data-stop-close="1"><div class="modal-header"><div><h3>选择退回设备</h3><p>勾选设备加入退回清单</p></div><button class="icon-btn" data-action="app-device-return-picker-close">×</button></div><div class="modal-body"><div class="mobile-cost-toolbar app-device-return-picker-filter"><label class="field mobile-cost-toolbar-keyword"><input data-app-device-return-picker-filter="keyword" value="' + escapeHtml(filters.keyword || '') + '" placeholder="设备编码/名称/型号" /></label><label class="field"><select data-app-device-return-picker-filter="category">' + optionHTML(deviceReceiveNeedOptions(), filters.category || '', '全部分类') + '</select></label><label class="field"><select data-app-device-return-picker-filter="brand">' + optionHTML(deviceReceiveBrandOptions(filters.category || ''), filters.brand || '', '全部品牌') + '</select></label><label class="field"><select data-app-device-return-picker-filter="model">' + optionHTML(deviceReceiveModelOptions(filters.category || '', filters.brand || ''), filters.model || '', '全部型号') + '</select></label><div class="mobile-cost-toolbar-actions"><button class="btn secondary mobile-icon-btn" data-action="app-device-return-picker-search" aria-label="筛选">⌕</button><button class="btn secondary mobile-icon-btn" data-action="app-device-return-picker-reset" aria-label="重置">↺</button></div></div><div class="device-receive-picker-summary app-device-return-picker-summary"><div>可选设备：<strong>' + escapeHtml(String(rows.length)) + '</strong></div><div>已选设备：<strong>' + escapeHtml(String(selectedDevices.length)) + '</strong></div></div><div class="device-receive-picker-section app-device-return-picker-section"><h4>可选设备</h4><div class="mobile-cost-list">' + ((rows.map(function (device) {
      var selected = selectedIds.indexOf(device.id) > -1;
      return '<button class="mobile-cost-card" data-action="app-device-return-toggle-picker-device" data-device-id="' + escapeHtml(device.id) + '"><div class="mobile-cost-card-head"><strong>' + escapeHtml(device.code || '-') + '</strong><span class="status ' + (selected ? 'success' : 'warning') + '">' + (selected ? '已选择' : '可选择') + '</span></div><div class="mobile-cost-card-body"><div class="mobile-cost-card-row"><span>名称</span><strong>' + escapeHtml(device.name || '-') + '</strong></div><div class="mobile-cost-card-row"><span>分类</span><strong>' + escapeHtml(device.category || '-') + '</strong></div><div class="mobile-cost-card-row"><span>品牌型号</span><strong>' + escapeHtml([device.brand, device.model].filter(Boolean).join(' / ') || '-') + '</strong></div><div class="mobile-cost-card-row"><span>批次</span><strong>' + escapeHtml(device.batch || device.warehouse || '-') + '</strong></div><div class="mobile-cost-card-row"><span>入库</span><strong>' + escapeHtml(device.inboundTime || device.installDate || '-') + '</strong></div></div></button>';
    }).join('')) || '<div class="empty-state">暂无可选择设备</div>') + '</div></div><div class="device-receive-picker-section app-device-return-picker-section"><h4>已选设备</h4><div class="app-device-receive-chip-list app-device-return-selected-list">' + ((selectedDevices.map(function (device) {
      return '<button class="app-device-receive-chip app-device-return-chip" data-action="app-device-return-remove-device" data-device-id="' + escapeHtml(device.id) + '">' + escapeHtml(device.code || device.name || '-') + ' ×</button>';
    }).join('')) || '<div class="empty-state">暂未选择设备</div>') + '</div></div></div><div class="modal-footer"><button class="btn primary" data-action="app-device-return-picker-close">完成</button></div></div></div>';
  }

  function appDeviceReturnDetailHTML() {
    var item = currentAppDeviceReturnDetailItem();
    if (!item) return '<section class="mobile-section"><div class="empty-state">未找到对应退回单</div></section>';
    var mode = appState.ui.currentAppDeviceReturnDetailMode || 'view';
    var editable = mode === 'create' || mode === 'edit';
    var inboundMode = mode === 'inbound';
    var primaryAction = mode === 'create'
      ? '<button class="btn primary" data-action="app-device-return-save-create">提交</button>'
      : editable
        ? '<button class="btn primary" data-action="app-device-return-save-edit" data-id="' + escapeHtml(item.id) + '">提交</button>'
        : inboundMode
          ? '<button class="btn primary" data-action="app-device-return-inbound-confirm" data-id="' + escapeHtml(item.id) + '">一键入库</button>'
          : (safeText(item.status) === '待入库'
              ? '<button class="btn primary" data-action="app-device-return-inbound" data-id="' + escapeHtml(item.id) + '">入库</button>'
              : '<button class="btn secondary" data-action="app-device-return-edit" data-id="' + escapeHtml(item.id) + '">编辑</button>');
    return [
      '<section class="mobile-section"><div class="section-title"><h4>' + (mode === 'create' ? '新建设备退回单' : mode === 'inbound' ? '设备退回入库' : '退回详情') + '</h4><span>' + escapeHtml(item.id || '待生成') + '</span></div>',
      '<div class="mobile-cost-detail-card">' +
      appPurchaseInlineField('创建人', editable ? '<input data-app-device-return-base="creator" value="' + escapeHtml(deviceReturnCreatorName(item)) + '" placeholder="请输入创建人" />' : '<input disabled value="' + escapeHtml(deviceReturnCreatorName(item)) + '" />') +
      appPurchaseInlineField('创建时间', '<input disabled value="' + escapeHtml(item.createTime || '保存后生成') + '" />') +
      appPurchaseInlineField('所属项目', editable ? '<select data-app-device-return-base="projectId">' + mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) { return { value: project.id, label: project.name }; }), item.projectId || '', '请选择所属项目') + '</select>' : '<input disabled value="' + escapeHtml(item.projectName || '-') + '" />') +
      appPurchaseInlineField('设备数量', '<input disabled value="' + escapeHtml(String((item.selectedDevices || []).length || 0)) + '台" />') +
      appPurchaseInlineField('状态', '<input disabled value="' + escapeHtml(item.status || '-') + '" />') +
      '<label class="field"><span>备注</span>' + (editable ? '<textarea data-app-device-return-base="remark" placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea>' : '<textarea disabled>' + escapeHtml(item.remark || '-') + '</textarea>') + '</label>' +
      '</div>',
      '<div class="mobile-cost-approval"><div class="section-title"><h4>退回设备清单</h4><span>已选 ' + escapeHtml(String((item.selectedDevices || []).length || 0)) + ' 台</span></div>' + appDeviceReturnSelectedListHTML(item, editable) + (editable ? '<div class="mobile-cost-actions"><button class="btn secondary" data-action="app-device-return-open-picker">选择设备</button></div>' : '') + '</div>',
      (mode === 'create' ? '' : '<div class="mobile-cost-approval"><div class="section-title"><h4>流转记录</h4><span></span></div>' + approvalTimelineHTML(item.approvalRecords || []).replace('暂无审批记录', '暂无流转记录') + '</div>'),
      '<div class="mobile-cost-actions mobile-cost-actions-sticky">' + primaryAction + '</div></section>' + appDeviceReturnPickerHTML()
    ].join('');
  }

  function syncAppDeviceReturnBaseField(field, value) {
    var item = currentAppDeviceReturnDetailItem();
    if (!item) return;
    item[field] = value;
    if (field === 'projectId') {
      var project = getAllProjectItems(getProjectArchiveState().tree).find(function (row) { return row.id === value; }) || { id: value, name: '' };
      item.projectId = project.id;
      item.projectName = project.name;
    }
  }

  function openAppDeviceReturnPicker() {
    appState.ui.appDeviceReturnPickerFilters = { keyword: '', category: '', brand: '', model: '' };
    appState.ui.currentAppDeviceReturnPickerOpen = true;
    render();
  }

  function closeAppDeviceReturnPicker() {
    appState.ui.currentAppDeviceReturnPickerOpen = false;
    render();
  }

  function resetAppDeviceReturnPickerFilters() {
    appState.ui.appDeviceReturnPickerFilters = { keyword: '', category: '', brand: '', model: '' };
    render();
  }

  function toggleAppDeviceReturnPickerDevice(deviceId) {
    var item = currentAppDeviceReturnDetailItem();
    if (!item) return;
    var selectedDevices = (item.selectedDevices || []).map(function (device) { return Object.assign({}, device); });
    var index = selectedDevices.findIndex(function (device) { return device.id === deviceId; });
    if (index > -1) {
      selectedDevices.splice(index, 1);
    } else {
      var raw = (getManagedState('deviceArchive').list || []).find(function (device) { return device.id === deviceId; });
      if (!raw) return;
      selectedDevices.push({
        id: raw.id,
        code: raw.code,
        name: raw.name,
        batch: raw.batch || raw.warehouse || '-',
        inboundTime: raw.inboundTime || raw.installDate || '-'
      });
    }
    item.selectedDevices = selectedDevices;
    item.qty = String(selectedDevices.length);
    render();
  }

  function removeAppDeviceReturnSelectedDevice(deviceId) {
    var item = currentAppDeviceReturnDetailItem();
    if (!item) return;
    item.selectedDevices = (item.selectedDevices || []).filter(function (device) { return device.id !== deviceId; });
    item.qty = String((item.selectedDevices || []).length);
    render();
  }

  function saveAppDeviceReturn(mode, id) {
    var state = getManagedState('deviceReturn');
    var item = normalizeDeviceReturnItem(JSON.parse(JSON.stringify(currentAppDeviceReturnDetailItem() || {})));
    if (!safeText(item.projectId).trim()) return window.alert('请选择所属项目');
    if (!(item.selectedDevices || []).length) return window.alert('请先选择退回设备');
    var project = getAllProjectItems(getProjectArchiveState().tree).find(function (row) { return row.id === item.projectId; }) || {};
    var creator = safeText(item.creator).trim() || currentUserName();
    var now = '2026-04-15 12:15';
    if (mode === 'create') {
      var payload = {
        id: 'TH-202604-' + String(state.nextId).padStart(3, '0'),
        creator: creator,
        returner: creator,
        createTime: now,
        projectId: item.projectId,
        projectName: project.name || item.projectName || '',
        selectedDevices: (item.selectedDevices || []).map(function (device) { return Object.assign({}, device); }),
        qty: String((item.selectedDevices || []).length),
        status: '待入库',
        remark: safeText(item.remark).trim(),
        model: item.selectedDevices[0] ? item.selectedDevices[0].name : '',
        approvalRecords: [{ time: now, operator: creator, action: '创建', remark: 'APP端提交设备退回单，待入库。' }]
      };
      state.list.unshift(payload);
      state.nextId += 1;
      appState.ui.currentAppDeviceReturnDraft = null;
      openAppDeviceReturnDetail('view', payload.id);
      return;
    }
    state.list = state.list.map(function (row) {
      return row.id === id ? Object.assign({}, row, {
        creator: creator,
        returner: creator,
        projectId: item.projectId,
        projectName: project.name || item.projectName || '',
        selectedDevices: (item.selectedDevices || []).map(function (device) { return Object.assign({}, device); }),
        qty: String((item.selectedDevices || []).length),
        remark: safeText(item.remark).trim(),
        model: item.selectedDevices[0] ? item.selectedDevices[0].name : row.model,
        approvalRecords: (row.approvalRecords || []).concat([{ time: now, operator: creator, action: '编辑', remark: 'APP端更新退回单信息。' }])
      }) : row;
    });
    appState.ui.currentAppDeviceReturnDraft = null;
    openAppDeviceReturnDetail('view', id);
  }

  function inboundAppDeviceReturn(id) {
    var target = findManagedItem('deviceReturn', id);
    if (!target) return;
    var item = normalizeDeviceReturnItem(target);
    var qty = (item.selectedDevices || []).length || (Number(item.qty) || 0);
    var modelSummary = ((item.selectedDevices || []).map(function (device) { return device.name; }).filter(Boolean)[0]) || target.model || '设备';
    var now = '2026-04-15 12:25';
    getManagedState('deviceReturn').list = getManagedState('deviceReturn').list.map(function (row) {
      return row.id === id ? Object.assign({}, row, {
        status: '已入库',
        approvalRecords: (normalizeDeviceReturnItem(row).approvalRecords || []).concat([{ time: now, operator: currentUserName(), action: '入库', remark: 'APP端完成设备退回入库。' }])
      }) : row;
    });
    pushInboundRecord('退回入库', id, modelSummary, qty + '台');
    openAppDeviceReturnDetail('view', id);
  }

  function revokeAppDeviceReturn(id) {
    if (!window.confirm('确认撤销该退回单吗？')) return;
    var now = '2026-04-15 12:30';
    getManagedState('deviceReturn').list = getManagedState('deviceReturn').list.map(function (row) {
      return row.id === id ? Object.assign({}, row, {
        status: '已撤销',
        approvalRecords: (normalizeDeviceReturnItem(row).approvalRecords || []).concat([{ time: now, operator: currentUserName(), action: '撤销', remark: 'APP端撤销设备退回单。' }])
      }) : row;
    });
    openAppDeviceReturnDetail('view', id);
  }

  function deleteAppDeviceReturn(id) {
    if (!window.confirm('确认删除该退回单吗？此操作仅影响演示数据。')) return;
    getManagedState('deviceReturn').list = getManagedState('deviceReturn').list.filter(function (row) { return row.id !== id; });
    appState.ui.currentAppDeviceReturnDraft = null;
    setRoute('/app/device-return');
  }

  function appSurveyDraftItem() {
    return {
      id: '',
      projectId: '',
      projectName: '',
      surveyor: '',
      planDate: '',
      siteContactName: '',
      siteContactTitle: '',
      siteContactPhone: '',
      imageAttachmentName: '',
      remark: '',
      createTime: '',
      creator: currentUserName(),
      status: '待派工',
      overdue: false,
      logSheet: null,
      logSheetDraft: null,
      logs: []
    };
  }

  function openAppSurveyDetail(mode, id) {
    if (mode === 'create') {
      appState.ui.currentAppSurveyDetailId = null;
      appState.ui.currentAppSurveyDetailMode = 'create';
      appState.ui.currentAppSurveyDraft = appSurveyDraftItem();
    } else {
      appState.ui.currentAppSurveyDetailId = id;
      appState.ui.currentAppSurveyDetailMode = mode || 'view';
      appState.ui.currentAppSurveyDraft = JSON.parse(JSON.stringify(findSurvey(id) || {}));
    }
    setRoute('/app/survey-workorder/detail');
  }

  function currentAppSurveyDetailItem() {
    if (appState.ui.currentAppSurveyDetailMode === 'create') return appState.ui.currentAppSurveyDraft || appSurveyDraftItem();
    if (!appState.ui.currentAppSurveyDetailId) return null;
    return appState.ui.currentAppSurveyDraft || JSON.parse(JSON.stringify(findSurvey(appState.ui.currentAppSurveyDetailId) || null));
  }

  function getFilteredAppSurveyWorkorders() {
    var filters = appState.ui.appSurveyFilters || {};
    var keyword = safeText(filters.keyword).trim();
    var status = safeText(filters.status).trim();
    return (getSurveyWorkorderState().list || []).filter(function (item) {
      var matchedKeyword = !keyword || [item.id, item.projectName, item.surveyor, item.creator].some(function (value) { return safeText(value).indexOf(keyword) >= 0; });
      var matchedStatus = !status || safeText(item.status) === status;
      return matchedKeyword && matchedStatus;
    });
  }

  function appSurveyWorkorderListHTML() {
    var filters = appState.ui.appSurveyFilters || {};
    var rows = getFilteredAppSurveyWorkorders();
    return [
      '<section class="mobile-section">',
      '<div class="mobile-cost-toolbar mobile-cost-toolbar-inline"><label class="field mobile-cost-toolbar-keyword"><input data-app-survey-filter="keyword" value="' + escapeHtml(filters.keyword || '') + '" placeholder="请输入" /></label><label class="field mobile-cost-toolbar-status"><select data-app-survey-filter="status">' + optionHTML(data.surveyWorkorderOptions.statuses, filters.status || '', '全部状态') + '</select></label><div class="mobile-cost-toolbar-actions"><button class="btn secondary mobile-icon-btn" data-action="app-survey-search" aria-label="检索">⌕</button></div></div>',
      '<div class="mobile-cost-list">' + ((rows.map(function (item) {
        return '<button class="mobile-cost-card" data-action="app-survey-view" data-id="' + item.id + '"><div class="mobile-cost-card-head"><strong>' + escapeHtml(item.id) + '</strong><span class="status ' + workorderStatusClass(item.status, item.overdue) + '">' + escapeHtml(item.status) + '</span></div><div class="mobile-cost-card-body"><div class="mobile-cost-card-row"><span>项目名称</span><strong>' + escapeHtml(item.projectName || '-') + '</strong></div><div class="mobile-cost-card-row"><span>工勘人员</span><strong>' + escapeHtml(item.surveyor || '-') + '</strong></div><div class="mobile-cost-card-row"><span>计划日期</span><strong>' + escapeHtml(item.planDate || '-') + '</strong></div></div></button>';
      }).join('')) || '<div class="empty-state">暂无工勘工单</div>') + '</div></section>' + surveyWorkorderModalHTML()
    ].join('');
  }

  function syncAppSurveyBaseField(field, value) {
    var item = currentAppSurveyDetailItem();
    if (!item) return;
    item[field] = value;
    if (field === 'projectId') {
      var project = findProjectById(value);
      item.projectName = project ? project.name : '';
    }
  }

  function appSurveyReadonlyField(label, value) {
    return '<label class="field"><span>' + escapeHtml(label) + '</span><input disabled value="' + escapeHtml(inspectionReadonlyText(value)) + '" /></label>';
  }

  function appSurveyInlineField(label, controlHTML) {
    return '<label class="field mobile-cost-detail-inline-field mobile-cost-detail-row-full"><span>' + escapeHtml(label) + '</span>' + controlHTML + '</label>';
  }

  function appSurveyWorkorderDetailHTML() {
    var item = currentAppSurveyDetailItem();
    if (!item) return '<section class="mobile-section"><div class="empty-state">未找到对应工勘工单</div></section>';
    var mode = appState.ui.currentAppSurveyDetailMode || 'view';
    var editable = mode === 'edit' || mode === 'create';
    var logNumber = ((item.logSheet && item.logSheet.number) || (item.logSheetDraft && item.logSheetDraft.number) || item.id || '-');
    return [
      '<section class="mobile-section"><div class="section-title"><h4>' + (mode === 'create' ? '新建工勘工单' : '工勘详情') + '</h4><span>' + escapeHtml(item.id || '待生成') + '</span></div>',
      '<div class="mobile-cost-detail-card">' +
      appSurveyInlineField('所属项目', editable ? '<select data-app-survey-base="projectId">' + mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) { return { value: project.id, label: project.name }; }), item.projectId || '', '请选择项目') + '</select>' : '<input disabled value="' + escapeHtml(item.projectName || '-') + '" />') +
      appSurveyInlineField('工勘人员', editable ? '<select data-app-survey-base="surveyor">' + optionHTML(data.surveyWorkorderOptions.surveyors, item.surveyor || '', '请选择工勘人员') + '</select>' : '<input disabled value="' + escapeHtml(item.surveyor || '-') + '" />') +
      appSurveyInlineField('计划工勘日期', editable ? '<input type="date" data-app-survey-base="planDate" value="' + escapeHtml(item.planDate || '') + '" />' : '<input disabled value="' + escapeHtml(item.planDate || '-') + '" />') +
      appSurveyInlineField('创建时间', '<input disabled value="' + escapeHtml(item.createTime || '保存后生成') + '" />') +
      appSurveyInlineField('创建人', '<input disabled value="' + escapeHtml(item.creator || currentUserName()) + '" />') +
      appSurveyInlineField('状态', '<input disabled value="' + escapeHtml(item.status || '-') + '" />') +
      appSurveyInlineField('现场联系人', editable ? '<input data-app-survey-base="siteContactName" value="' + escapeHtml(item.siteContactName || '') + '" placeholder="请输入联系人姓名" />' : '<input disabled value="' + escapeHtml(item.siteContactName || '-') + '" />') +
      appSurveyInlineField('联系人职务', editable ? '<input data-app-survey-base="siteContactTitle" value="' + escapeHtml(item.siteContactTitle || '') + '" placeholder="请输入联系人职务" />' : '<input disabled value="' + escapeHtml(item.siteContactTitle || '-') + '" />') +
      appSurveyInlineField('联系电话', editable ? '<input data-app-survey-base="siteContactPhone" value="' + escapeHtml(item.siteContactPhone || '') + '" placeholder="请输入联系电话" />' : '<input disabled value="' + escapeHtml(item.siteContactPhone || '-') + '" />') +
      appSurveyInlineField('图片附件', editable ? '<input data-app-survey-base="imageAttachmentName" value="' + escapeHtml(item.imageAttachmentName || '') + '" placeholder="请输入图片名称" />' : '<input disabled value="' + escapeHtml(item.imageAttachmentName || '-') + '" />') +
      '<label class="field"><span>备注</span>' + (editable ? '<textarea data-app-survey-base="remark" placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea>' : '<textarea disabled>' + escapeHtml(item.remark || '-') + '</textarea>') + '</label>' +
      '</div>',
      (mode === 'create' ? '' :
        '<div class="mobile-cost-approval"><div class="section-title"><h4>日志概览</h4><button class="btn secondary btn-sm mobile-log-fill-btn" data-action="app-survey-log-fill" data-id="' + escapeHtml(item.id) + '">填报日志</button></div><button class="mobile-cost-card mobile-log-card" data-action="app-survey-log-view" data-id="' + escapeHtml(item.id) + '"><div class="mobile-cost-card-body"><div class="mobile-cost-card-row"><span>日志编号</span><strong>' + escapeHtml(logNumber) + '</strong><i class="mobile-log-card-arrow">›</i></div></div></button></div>') +
      '<div class="mobile-cost-actions mobile-cost-actions-sticky">' +
      (mode === 'create'
        ? '<button class="btn primary" data-action="app-survey-save-create">提交</button>'
        : editable
          ? '<button class="btn primary" data-action="app-survey-save-edit" data-id="' + escapeHtml(item.id) + '">提交</button>'
          : '<button class="btn primary" data-action="app-survey-log-fill" data-id="' + escapeHtml(item.id) + '">提交</button>') +
      '</div></section>' + surveyWorkorderModalHTML()
    ].join('');
  }

  function saveAppSurvey(mode, id) {
    var state = getSurveyWorkorderState();
    var modalItem = JSON.parse(JSON.stringify(currentAppSurveyDetailItem() || {}));
    if (!modalItem.projectId || !modalItem.surveyor || !modalItem.planDate) {
      window.alert('请填写必填项：项目、工勘人员、计划工勘日期');
      return;
    }
    var project = findProjectById(modalItem.projectId);
    var payload = Object.assign({}, modalItem, {
      projectName: project ? project.name : modalItem.projectId,
      createTime: modalItem.createTime || '2026-04-09 15:10',
      creator: modalItem.creator || currentUserName(),
      status: modalItem.status || '待工勘',
      overdue: modalItem.planDate < '2026-04-09' && (modalItem.status || '待工勘') !== '已完成',
      logs: (modalItem.logs || []).concat([{ time: '2026-04-09 15:10', operator: currentUserName(), content: mode === 'edit' ? 'APP端更新工勘工单信息。' : 'APP端创建工勘工单并分配工勘人员。' }])
    });
    if (mode === 'edit' && id) {
      state.list = state.list.map(function (row) { return row.id === id ? Object.assign({}, row, payload, { id: id }) : row; });
      appState.ui.currentAppSurveyDraft = null;
      openAppSurveyDetail('view', id);
      return;
    }
    payload.id = 'GK-20260409-' + String(state.nextId).padStart(3, '0');
    state.list.unshift(payload);
    state.nextId += 1;
    appState.ui.currentAppSurveyDraft = null;
    openAppSurveyDetail('view', payload.id);
  }

  function revokeAppSurvey(id) {
    if (!window.confirm('确认撤销该工勘工单吗？')) return;
    getSurveyWorkorderState().list = getSurveyWorkorderState().list.map(function (item) {
      return item.id === id ? Object.assign({}, item, { status: '已撤销', overdue: false, logs: (item.logs || []).concat([{ time: '2026-04-09 15:20', operator: currentUserName(), content: 'APP端撤销工勘工单。' }]) }) : item;
    });
    openAppSurveyDetail('view', id);
  }

  function deleteAppSurvey(id) {
    if (!window.confirm('确认删除该工勘工单吗？此操作仅影响演示数据。')) return;
    getSurveyWorkorderState().list = getSurveyWorkorderState().list.filter(function (item) { return item.id !== id; });
    appState.ui.currentAppSurveyDraft = null;
    setRoute('/app/survey-workorder');
  }

  function appConstructionDraftItem() {
    return {
      id: '',
      projectId: '',
      projectName: '',
      worker: '',
      planDate: '',
      siteContactName: '',
      siteContactTitle: '',
      siteContactPhone: '',
      imageAttachmentName: '',
      remark: '',
      createTime: '2026-04-09 16:10',
      creator: currentUserName(),
      status: '待施工',
      overdue: false,
      logSheet: null,
      logSheetDraft: null,
      logs: []
    };
  }

  function openAppConstructionDetail(mode, id) {
    if (mode === 'create') {
      appState.ui.currentAppConstructionDetailId = null;
      appState.ui.currentAppConstructionDetailMode = 'create';
      appState.ui.currentAppConstructionDraft = appConstructionDraftItem();
    } else {
      appState.ui.currentAppConstructionDetailId = id;
      appState.ui.currentAppConstructionDetailMode = mode || 'view';
      appState.ui.currentAppConstructionDraft = JSON.parse(JSON.stringify(findConstruction(id) || {}));
    }
    setRoute('/app/construction-workorder/detail');
  }

  function currentAppConstructionDetailItem() {
    if (appState.ui.currentAppConstructionDetailMode === 'create') return appState.ui.currentAppConstructionDraft || appConstructionDraftItem();
    if (!appState.ui.currentAppConstructionDetailId) return null;
    return appState.ui.currentAppConstructionDraft || JSON.parse(JSON.stringify(findConstruction(appState.ui.currentAppConstructionDetailId) || null));
  }

  function getFilteredAppConstructionWorkorders() {
    var filters = appState.ui.appConstructionFilters || {};
    var keyword = safeText(filters.keyword).trim();
    var status = safeText(filters.status).trim();
    return (getConstructionWorkorderState().list || []).filter(function (item) {
      var matchedKeyword = !keyword || [item.id, item.projectName, item.worker, item.creator].some(function (value) { return safeText(value).indexOf(keyword) >= 0; });
      var matchedStatus = !status || safeText(item.status) === status;
      return matchedKeyword && matchedStatus;
    });
  }

  function appConstructionWorkorderListHTML() {
    var filters = appState.ui.appConstructionFilters || {};
    var rows = getFilteredAppConstructionWorkorders();
    return [
      '<section class="mobile-section">',
      '<div class="mobile-cost-toolbar mobile-cost-toolbar-inline"><label class="field mobile-cost-toolbar-keyword"><input data-app-construction-filter="keyword" value="' + escapeHtml(filters.keyword || '') + '" placeholder="请输入" /></label><label class="field mobile-cost-toolbar-status"><select data-app-construction-filter="status">' + optionHTML(data.constructionWorkorderOptions.statuses, filters.status || '', '全部状态') + '</select></label><div class="mobile-cost-toolbar-actions"><button class="btn secondary mobile-icon-btn" data-action="app-construction-search" aria-label="检索">⌕</button></div></div>',
      '<div class="mobile-cost-list">' + ((rows.map(function (item) {
        return '<button class="mobile-cost-card" data-action="app-construction-view" data-id="' + item.id + '"><div class="mobile-cost-card-head"><strong>' + escapeHtml(item.id) + '</strong><span class="status ' + workorderStatusClass(item.status, item.overdue) + '">' + escapeHtml(item.status) + '</span></div><div class="mobile-cost-card-body"><div class="mobile-cost-card-row"><span>项目名称</span><strong>' + escapeHtml(item.projectName || '-') + '</strong></div><div class="mobile-cost-card-row"><span>施工人员</span><strong>' + escapeHtml(item.worker || '-') + '</strong></div><div class="mobile-cost-card-row"><span>计划日期</span><strong>' + escapeHtml(item.planDate || '-') + '</strong></div></div></button>';
      }).join('')) || '<div class="empty-state">暂无施工工单</div>') + '</div></section>' + constructionWorkorderModalHTML()
    ].join('');
  }

  function syncAppConstructionBaseField(field, value) {
    var item = currentAppConstructionDetailItem();
    if (!item) return;
    item[field] = value;
    if (field === 'projectId') {
      var project = findProjectById(value);
      item.projectName = project ? project.name : '';
    }
  }

  function appConstructionWorkorderDetailHTML() {
    var item = currentAppConstructionDetailItem();
    if (!item) return '<section class="mobile-section"><div class="empty-state">未找到对应施工工单</div></section>';
    var mode = appState.ui.currentAppConstructionDetailMode || 'view';
    var editable = mode === 'edit' || mode === 'create';
    var logNumber = ((item.logSheet && item.logSheet.number) || (item.logSheetDraft && item.logSheetDraft.number) || item.id || '-');
    return [
      '<section class="mobile-section"><div class="section-title"><h4>' + (mode === 'create' ? '新建施工工单' : '施工详情') + '</h4><span>' + escapeHtml(item.id || '待生成') + '</span></div>',
      '<div class="mobile-cost-detail-card">' +
      appSurveyInlineField('所属项目', editable ? '<select data-app-construction-base="projectId">' + mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) { return { value: project.id, label: project.name }; }), item.projectId || '', '请选择项目') + '</select>' : '<input disabled value="' + escapeHtml(item.projectName || '-') + '" />') +
      appSurveyInlineField('施工人员', editable ? '<select data-app-construction-base="worker">' + optionHTML(data.constructionWorkorderOptions.workers, item.worker || '', '请选择施工人员') + '</select>' : '<input disabled value="' + escapeHtml(item.worker || '-') + '" />') +
      appSurveyInlineField('计划施工日期', editable ? '<input type="date" data-app-construction-base="planDate" value="' + escapeHtml(item.planDate || '') + '" />' : '<input disabled value="' + escapeHtml(item.planDate || '-') + '" />') +
      appSurveyInlineField('创建时间', '<input disabled value="' + escapeHtml(item.createTime || '保存后生成') + '" />') +
      appSurveyInlineField('创建人', '<input disabled value="' + escapeHtml(item.creator || currentUserName()) + '" />') +
      appSurveyInlineField('状态', '<input disabled value="' + escapeHtml(item.status || '-') + '" />') +
      appSurveyInlineField('现场联系人', editable ? '<input data-app-construction-base="siteContactName" value="' + escapeHtml(item.siteContactName || '') + '" placeholder="请输入联系人姓名" />' : '<input disabled value="' + escapeHtml(item.siteContactName || '-') + '" />') +
      appSurveyInlineField('联系人职务', editable ? '<input data-app-construction-base="siteContactTitle" value="' + escapeHtml(item.siteContactTitle || '') + '" placeholder="请输入联系人职务" />' : '<input disabled value="' + escapeHtml(item.siteContactTitle || '-') + '" />') +
      appSurveyInlineField('联系电话', editable ? '<input data-app-construction-base="siteContactPhone" value="' + escapeHtml(item.siteContactPhone || '') + '" placeholder="请输入联系电话" />' : '<input disabled value="' + escapeHtml(item.siteContactPhone || '-') + '" />') +
      appSurveyInlineField('图片附件', editable ? '<input data-app-construction-base="imageAttachmentName" value="' + escapeHtml(item.imageAttachmentName || '') + '" placeholder="请输入图片名称" />' : '<input disabled value="' + escapeHtml(item.imageAttachmentName || '-') + '" />') +
      '<label class="field"><span>备注</span>' + (editable ? '<textarea data-app-construction-base="remark" placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea>' : '<textarea disabled>' + escapeHtml(item.remark || '-') + '</textarea>') + '</label>' +
      '</div>',
      (mode === 'create' ? '' :
        '<div class="mobile-cost-approval"><div class="section-title"><h4>日志概览</h4><button class="btn secondary btn-sm mobile-log-fill-btn" data-action="app-construction-log-fill" data-id="' + escapeHtml(item.id) + '">填报日志</button></div><button class="mobile-cost-card mobile-log-card" data-action="app-construction-log-view" data-id="' + escapeHtml(item.id) + '"><div class="mobile-cost-card-body"><div class="mobile-cost-card-row"><span>日志编号</span><strong>' + escapeHtml(logNumber) + '</strong><i class="mobile-log-card-arrow">›</i></div></div></button></div>') +
      '<div class="mobile-cost-actions mobile-cost-actions-sticky">' +
      (mode === 'create'
        ? '<button class="btn primary" data-action="app-construction-save-create">提交</button>'
        : editable
          ? '<button class="btn primary" data-action="app-construction-save-edit" data-id="' + escapeHtml(item.id) + '">提交</button>'
          : '<button class="btn primary" data-action="app-construction-log-fill" data-id="' + escapeHtml(item.id) + '">提交</button>') +
      '</div></section>' + constructionWorkorderModalHTML()
    ].join('');
  }

  function saveAppConstruction(mode, id) {
    var state = getConstructionWorkorderState();
    var modalItem = JSON.parse(JSON.stringify(currentAppConstructionDetailItem() || {}));
    if (!modalItem.projectId || !modalItem.worker || !modalItem.planDate) {
      window.alert('请填写必填项：项目、施工人员、计划施工日期');
      return;
    }
    var project = findProjectById(modalItem.projectId);
    var payload = Object.assign({}, modalItem, {
      projectName: project ? project.name : modalItem.projectId,
      createTime: modalItem.createTime || '2026-04-09 16:10',
      creator: modalItem.creator || currentUserName(),
      status: modalItem.status || '待施工',
      overdue: modalItem.planDate < '2026-04-09' && (modalItem.status || '待施工') !== '已完成',
      logs: (modalItem.logs || []).concat([{ time: '2026-04-09 16:10', operator: currentUserName(), content: mode === 'edit' ? 'APP端更新施工工单信息。' : 'APP端创建施工工单并安排施工人员。' }])
    });
    if (mode === 'edit' && id) {
      state.list = state.list.map(function (row) { return row.id === id ? Object.assign({}, row, payload, { id: id }) : row; });
      appState.ui.currentAppConstructionDraft = null;
      openAppConstructionDetail('view', id);
      return;
    }
    payload.id = 'SG-20260409-' + String(state.nextId).padStart(3, '0');
    state.list.unshift(payload);
    state.nextId += 1;
    appState.ui.currentAppConstructionDraft = null;
    openAppConstructionDetail('view', payload.id);
  }

  function revokeAppConstruction(id) {
    if (!window.confirm('确认撤销该施工工单吗？')) return;
    getConstructionWorkorderState().list = getConstructionWorkorderState().list.map(function (item) {
      return item.id === id ? Object.assign({}, item, { status: '已撤销', overdue: false, logs: (item.logs || []).concat([{ time: '2026-04-09 16:20', operator: currentUserName(), content: 'APP端撤销施工工单。' }]) }) : item;
    });
    openAppConstructionDetail('view', id);
  }

  function deleteAppConstruction(id) {
    if (!window.confirm('确认删除该施工工单吗？此操作仅影响演示数据。')) return;
    getConstructionWorkorderState().list = getConstructionWorkorderState().list.filter(function (item) { return item.id !== id; });
    appState.ui.currentAppConstructionDraft = null;
    setRoute('/app/construction-workorder');
  }

  function appProjectCostListHTML() {
    var filters = appState.ui.appCostFilters || {};
    var rows = getFilteredAppProjectCosts();
    return [
      '<section class="mobile-section">',
      '<div class="mobile-cost-toolbar mobile-cost-toolbar-inline"><label class="field mobile-cost-toolbar-keyword"><input data-app-cost-filter="keyword" value="' + escapeHtml(filters.keyword || '') + '" placeholder="请输入" /></label><label class="field mobile-cost-toolbar-status"><select data-app-cost-filter="status">' + optionHTML(['待审批', '已审批'], filters.status || '', '全部状态') + '</select></label><div class="mobile-cost-toolbar-actions"><button class="btn secondary mobile-icon-btn" data-action="app-cost-search" aria-label="检索">⌕</button></div></div>',
      '<div class="mobile-cost-list">' + ((rows.map(function (item) {
        return '<button class="mobile-cost-card" data-action="app-cost-view" data-id="' + item.id + '"><div class="mobile-cost-card-head"><strong>' + escapeHtml(item.id) + '</strong><span class="status ' + (appCostMobileStatusText(item.status) === '已审批' ? 'success' : 'warning') + '">' + escapeHtml(appCostMobileStatusText(item.status)) + '</span></div><div class="mobile-cost-card-body"><div class="mobile-cost-card-row"><span>项目名称</span><strong>' + escapeHtml(item.projectName) + '</strong></div><div class="mobile-cost-card-row"><span>创建人</span><strong>' + escapeHtml(item.creator) + '</strong></div><div class="mobile-cost-card-row"><span>创建时间</span><strong>' + escapeHtml(item.createTime) + '</strong></div></div></button>';
      }).join('')) || '<div class="empty-state">暂无报价单</div>') + '</div></section>'
    ].join('');
  }

  function appCostDetailRowHTML(item, index, editable) {
    var fallbackBrandModel = costDetailBrandModelByName(item.name);
    var brandText = item.brand || ((item.brandModel || '').split(' ')[0] || '') || fallbackBrandModel.brand;
    var modelText = item.model || ((item.brandModel || '').split(' ').slice(1).join(' ') || '') || fallbackBrandModel.model;
    return '<div class="mobile-cost-detail-row">' +
      '<div class="mobile-cost-detail-row-head"><strong>' + escapeHtml(item.name) + '</strong></div>' +
      '<div class="mobile-cost-detail-grid">' +
      '<div class="mobile-cost-detail-stats"><div class="mobile-cost-detail-stat"><span>品牌</span>' + (editable ? '<select data-app-cost-detail="brand" data-index="' + index + '">' + costBrandOptionsHTML(brandText) + '</select>' : '<input disabled value="' + escapeHtml(brandText || '-') + '" />') + '</div><div class="mobile-cost-detail-stat"><span>型号</span>' + (editable ? '<select data-app-cost-detail="model" data-index="' + index + '">' + costModelOptionsHTML(modelText) + '</select>' : '<input disabled value="' + escapeHtml(modelText || '-') + '" />') + '</div></div>' +
      '<div class="mobile-cost-detail-stats"><div class="mobile-cost-detail-stat"><span>数量</span>' + (editable ? '<input data-app-cost-detail="qty" data-index="' + index + '" value="' + escapeHtml(item.qty) + '" />' : '<input disabled value="' + escapeHtml(item.qty || '-') + '" />') + '</div><div class="mobile-cost-detail-stat"><span>单价</span>' + (editable ? '<input data-app-cost-detail="price" data-index="' + index + '" value="' + escapeHtml(item.price) + '" />' : '<input disabled value="' + escapeHtml(item.price || '-') + '" />') + '</div><div class="mobile-cost-detail-stat"><span>合价</span><input disabled value="' + escapeHtml(String(item.amount || '-')) + '" data-app-cost-amount="' + index + '" /></div></div>' +
      '<label class="field mobile-cost-detail-inline-field mobile-cost-detail-row-full mobile-cost-detail-remark"><span>备注</span>' + (editable ? '<textarea data-app-cost-detail="remark" data-index="' + index + '" placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea>' : '<textarea disabled>' + escapeHtml(item.remark || '-') + '</textarea>') + '</label>' +
      '</div></div>';
  }

  function appProjectCostDetailHTML() {
    var item = currentAppCostDetailItem();
    if (!item) return '<section class="mobile-section"><div class="empty-state">未找到对应报价单</div></section>';
    var mode = appState.ui.currentAppCostDetailMode || 'view';
    var editable = mode === 'edit' || mode === 'create';
    var approvable = mode === 'approve';
    var total = calcCostTotal((item.details || []).map(function (row) {
      var qty = Number(row.qty) || 0;
      var price = Number(row.price) || 0;
      return Object.assign({}, row, { amount: qty * price });
    }));
    var viewActions = item.status === '草稿' || item.status === '已驳回'
      ? '<button class="btn secondary" data-action="app-cost-edit" data-id="' + escapeHtml(item.id) + '">编辑</button><button class="btn primary" data-action="app-cost-submit-view" data-id="' + escapeHtml(item.id) + '">提交</button><button class="btn secondary danger-link" data-action="app-cost-revoke" data-id="' + escapeHtml(item.id) + '">撤回</button>'
      : item.status === '审批中'
        ? '<button class="btn primary" data-action="app-cost-approve" data-id="' + escapeHtml(item.id) + '">审批</button><button class="btn secondary danger-link" data-action="app-cost-revoke" data-id="' + escapeHtml(item.id) + '">撤回</button>'
        : '<button class="btn secondary" data-action="app-cost-edit" data-id="' + escapeHtml(item.id) + '">编辑</button><button class="btn secondary danger-link" data-action="app-cost-revoke" data-id="' + escapeHtml(item.id) + '">撤回</button>';
    function appCostInlineField(label, controlHTML) {
      return '<label class="field mobile-cost-detail-inline-field mobile-cost-detail-row-full"><span>' + escapeHtml(label) + '</span>' + controlHTML + '</label>';
    }
    return [
      '<section class="mobile-section"><div class="section-title"><h4>' + (mode === 'create' ? '新增报价单' : '报价详情') + '</h4><span>' + escapeHtml(item.id || '待生成') + '</span></div>',
      '<div class="mobile-cost-detail-card">' +
      appCostInlineField('项目', editable ? '<select data-app-cost-base="projectId">' + mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) { return { value: project.id, label: project.name }; }), item.projectId || '', '请选择项目') + '</select>' : '<input disabled value="' + escapeHtml(item.projectName || '-') + '" />') +
      appCostInlineField('客户名称', '<input disabled value="' + escapeHtml(item.customerName || '-') + '" data-app-cost-base-display="customerName" />') +
      appCostInlineField('创建人', '<input disabled value="' + escapeHtml(item.creator || '-') + '" />') +
      appCostInlineField('状态', '<input disabled value="' + escapeHtml(item.status || '-') + '" />') +
      '</div>',
      '<div class="mobile-cost-detail-list">' + (item.details || []).map(function (detail, index) { return appCostDetailRowHTML(detail, index, editable); }).join('') + '</div>',
      '<div class="mobile-cost-total">合计：<strong>¥' + escapeHtml(total.toFixed(2)) + '</strong></div>',
      '<div class="mobile-cost-approval"><div class="section-title"><h4>流转记录</h4><span></span></div>' + costFlowTimelineHTML(item) + '</div>',
      (approvable ? '<label class="field"><span>审批意见</span><textarea data-app-cost-approval-remark placeholder="请输入审批意见"></textarea></label>' : ''),
      '<div class="mobile-cost-actions">' +
      (mode === 'create' ? '<button class="btn primary" data-action="app-cost-save-create">提交</button>' :
        editable ? '<button class="btn primary" data-action="app-cost-save-edit" data-id="' + escapeHtml(item.id) + '">提交</button>' :
        approvable ? '<button class="btn primary" data-action="app-cost-approve-pass" data-id="' + escapeHtml(item.id) + '">审批</button>' :
        (item.status === '草稿' || item.status === '已驳回' ? '<button class="btn primary" data-action="app-cost-submit-view" data-id="' + escapeHtml(item.id) + '">提交</button>' : '<button class="btn primary" data-action="app-cost-approve" data-id="' + escapeHtml(item.id) + '">审批</button>')) +
      '</div></section>'
    ].join('');
  }

  function syncAppCostDetailField(index, field, value) {
    var item = currentAppCostDetailItem();
    if (!item || !item.details || !item.details[index]) return;
    item.details[index][field] = value;
    if (field === 'brand' || field === 'model') {
      item.details[index].brandModel = [item.details[index].brand || '', item.details[index].model || ''].join(' ').trim();
    }
    var qty = Number(item.details[index].qty) || 0;
    var price = Number(item.details[index].price) || 0;
    item.details[index].amount = qty * price;
  }

  function syncAppCostBaseField(field, value) {
    var item = currentAppCostDetailItem();
    if (!item) return;
    item[field] = value;
    if (field === 'projectId') {
      var project = findProjectById(value);
      item.projectName = project ? project.name : '';
      item.customerName = project ? project.customerName : '';
    }
  }

  function saveAppCost(mode, id) {
    var item = JSON.parse(JSON.stringify(currentAppCostDetailItem() || {}));
    if (!item.projectId) {
      window.alert('请选择项目后再提交。');
      return;
    }
    var now = '2026-04-14 16:45';
    item.details = (item.details || []).map(function (detail) {
      var qty = Number(detail.qty) || 0;
      var price = Number(detail.price) || 0;
      return Object.assign({}, detail, { amount: qty * price });
    });
    if (mode === 'create') {
      item.id = 'ZJ-2026-' + String(getProjectCostState().nextId).padStart(3, '0');
      item.createTime = now;
      item.status = '审批中';
      item.approvalRecords = (item.approvalRecords || []).concat([{ time: now, operator: currentUserName(), action: '提交', remark: 'APP端提交新增报价单。' }]);
      getProjectCostState().list.unshift(item);
      getProjectCostState().nextId += 1;
    } else {
      getProjectCostState().list = getProjectCostState().list.map(function (row) {
        return row.id === id ? Object.assign({}, row, item, {
          status: '审批中',
          approvalRecords: (row.approvalRecords || [])
            .concat([{ time: now, operator: currentUserName(), action: '编辑', remark: 'APP端更新报价明细。' }])
            .concat([{ time: now, operator: currentUserName(), action: '提交', remark: 'APP端提交报价单编辑。' }])
        }) : row;
      });
    }
    appState.ui.currentAppCostDraft = null;
    openAppCostDetail('view', mode === 'create' ? item.id : id);
  }

  function approveAppCost(id, passed) {
    var remarkNode = root.querySelector('[data-app-cost-approval-remark]');
    var remark = remarkNode ? remarkNode.value : '';
    var now = '2026-04-14 17:00';
    getProjectCostState().list = getProjectCostState().list.map(function (row) {
      return row.id === id ? Object.assign({}, row, {
        status: passed ? '已通过' : '已驳回',
        approvalRecords: (row.approvalRecords || []).concat([{ time: now, operator: currentUserName(), action: passed ? '同意' : '驳回', remark: remark || (passed ? 'APP端审批通过。' : 'APP端审批驳回。') }])
      }) : row;
    });
    openAppCostDetail('view', id);
  }

  function revokeAppCost(id) {
    getProjectCostState().list = getProjectCostState().list.map(function (row) {
      return row.id === id ? Object.assign({}, row, { status: '已撤销', approvalRecords: (row.approvalRecords || []).concat([{ time: '2026-04-14 17:10', operator: currentUserName(), action: '撤回', remark: 'APP端撤回报价单。' }]) }) : row;
    });
    openAppCostDetail('view', id);
  }

  function appMaintenanceDraftItem() {
    return {
      id: '',
      projectId: '',
      projectName: '',
      worker: '',
      planDate: '',
      siteContactName: '',
      siteContactTitle: '',
      siteContactPhone: '',
      imageAttachmentName: '',
      remark: '',
      createTime: nowDateTimeText(),
      creator: currentUserName(),
      status: '待处理',
      overdue: false,
      priority: '一般',
      faultDesc: '',
      processInfo: { detail: '', images: [], submitted: false, submitTime: '', submitter: '' },
      logs: []
    };
  }

  function openAppMaintenanceDetail(mode, id) {
    if (mode === 'create') {
      appState.ui.currentAppMaintenanceDetailId = null;
      appState.ui.currentAppMaintenanceDetailMode = 'create';
      appState.ui.currentAppMaintenanceDraft = appMaintenanceDraftItem();
    } else {
      appState.ui.currentAppMaintenanceDetailId = id;
      appState.ui.currentAppMaintenanceDetailMode = mode || 'view';
      appState.ui.currentAppMaintenanceDraft = JSON.parse(JSON.stringify(findMaintenance(id) || {}));
    }
    setRoute('/app/maintenance-workorder/detail');
  }

  function currentAppMaintenanceDetailItem() {
    if (appState.ui.currentAppMaintenanceDetailMode === 'create') return appState.ui.currentAppMaintenanceDraft || appMaintenanceDraftItem();
    if (!appState.ui.currentAppMaintenanceDetailId) return null;
    return appState.ui.currentAppMaintenanceDraft || JSON.parse(JSON.stringify(findMaintenance(appState.ui.currentAppMaintenanceDetailId) || null));
  }

  function getFilteredAppMaintenanceWorkorders() {
    var filters = appState.ui.appMaintenanceFilters || {};
    var keyword = safeText(filters.keyword).trim();
    var status = safeText(filters.status).trim();
    return (getMaintenanceWorkorderState().list || []).filter(function (item) {
      var matchedKeyword = !keyword || [item.id, item.projectName, item.worker, item.creator, item.faultDesc].some(function (value) { return safeText(value).indexOf(keyword) >= 0; });
      var matchedStatus = !status || safeText(item.status) === status;
      return matchedKeyword && matchedStatus;
    });
  }

  function appMaintenanceWorkorderListHTML() {
    var filters = appState.ui.appMaintenanceFilters || {};
    var rows = getFilteredAppMaintenanceWorkorders();
    return [
      '<section class="mobile-section">',
      '<div class="mobile-cost-toolbar mobile-cost-toolbar-inline"><label class="field mobile-cost-toolbar-keyword"><input data-app-maintenance-filter="keyword" value="' + escapeHtml(filters.keyword || '') + '" placeholder="请输入" /></label><label class="field mobile-cost-toolbar-status"><select data-app-maintenance-filter="status">' + optionHTML(data.maintenanceWorkorderOptions.statuses, filters.status || '', '全部状态') + '</select></label><div class="mobile-cost-toolbar-actions"><button class="btn secondary mobile-icon-btn" data-action="app-maintenance-search" aria-label="检索">⌕</button></div></div>',
      '<div class="mobile-cost-list">' + ((rows.map(function (item) {
        return '<button class="mobile-cost-card" data-action="app-maintenance-view" data-id="' + item.id + '"><div class="mobile-cost-card-head"><strong>' + escapeHtml(item.id) + '</strong><span class="status ' + workorderStatusClass(item.status, item.overdue) + '">' + escapeHtml(item.status) + '</span></div><div class="mobile-cost-card-body"><div class="mobile-cost-card-row"><span>项目名称</span><strong>' + escapeHtml(item.projectName || '-') + '</strong></div><div class="mobile-cost-card-row"><span>运维人员</span><strong>' + escapeHtml(item.worker || '-') + '</strong></div><div class="mobile-cost-card-row"><span>计划日期</span><strong>' + escapeHtml(item.planDate || '-') + '</strong></div></div></button>';
      }).join('')) || '<div class="empty-state">暂无运维工单</div>') + '</div></section>' + maintenanceWorkorderModalHTML()
    ].join('');
  }

  function syncAppMaintenanceBaseField(field, value) {
    var item = currentAppMaintenanceDetailItem();
    if (!item) return;
    item[field] = value;
    if (field === 'projectId') {
      var project = findProjectById(value);
      item.projectName = project ? project.name : '';
    }
  }

  function syncAppMaintenanceProcessField(field, value) {
    var item = currentAppMaintenanceDetailItem();
    if (!item) return;
    item.processInfo = item.processInfo || { detail: '', images: [], submitted: false, submitTime: '', submitter: '' };
    if (field === 'images') {
      item.processInfo.images = inspectionParseListText(value).slice(0, 10);
      return;
    }
    item.processInfo[field] = value;
  }

  function appMaintenanceProcessMetaHTML(process) {
    return '<div class="mobile-cost-detail-card">' +
      appSurveyInlineField('提交状态', '<input disabled value="' + escapeHtml(process.submitted ? '已提交' : '待提交') + '" />') +
      appSurveyInlineField('提交时间', '<input disabled value="' + escapeHtml(process.submitTime || '-') + '" />') +
      appSurveyInlineField('提交人', '<input disabled value="' + escapeHtml(process.submitter || '-') + '" />') +
      '</div>';
  }

  function appMaintenanceWorkorderDetailHTML() {
    var item = currentAppMaintenanceDetailItem();
    if (!item) return '<section class="mobile-section"><div class="empty-state">未找到对应运维工单</div></section>';
    var mode = appState.ui.currentAppMaintenanceDetailMode || 'view';
    var editable = mode === 'edit' || mode === 'create';
    var process = item.processInfo || { detail: '', images: [], submitted: false, submitTime: '', submitter: '' };
    return [
      '<section class="mobile-section"><div class="section-title"><h4>' + (mode === 'create' ? '新建运维工单' : '运维详情') + '</h4><span>' + escapeHtml(item.id || '待生成') + '</span></div>',
      '<div class="mobile-cost-detail-card">' +
      appSurveyInlineField('所属项目', editable ? '<select data-app-maintenance-base="projectId">' + mappedOptionHTML(getAllProjectItems(getProjectArchiveState().tree).map(function (project) { return { value: project.id, label: project.name }; }), item.projectId || '', '请选择项目') + '</select>' : '<input disabled value="' + escapeHtml(item.projectName || '-') + '" />') +
      appSurveyInlineField('运维人员', editable ? '<select data-app-maintenance-base="worker">' + optionHTML(data.maintenanceWorkorderOptions.workers, item.worker || '', '请选择运维人员') + '</select>' : '<input disabled value="' + escapeHtml(item.worker || '-') + '" />') +
      appSurveyInlineField('计划运维日期', editable ? '<input type="date" data-app-maintenance-base="planDate" value="' + escapeHtml(item.planDate || '') + '" />' : '<input disabled value="' + escapeHtml(item.planDate || '-') + '" />') +
      appSurveyInlineField('紧急程度', editable ? '<select data-app-maintenance-base="priority">' + optionHTML(data.maintenanceWorkorderOptions.priorities, item.priority || '', '请选择紧急程度') + '</select>' : '<input disabled value="' + escapeHtml(item.priority || '-') + '" />') +
      appSurveyInlineField('创建时间', '<input disabled value="' + escapeHtml(item.createTime || '保存后生成') + '" />') +
      appSurveyInlineField('创建人', '<input disabled value="' + escapeHtml(item.creator || currentUserName()) + '" />') +
      appSurveyInlineField('状态', '<input disabled value="' + escapeHtml(item.status || '-') + '" />') +
      appSurveyInlineField('现场联系人', editable ? '<input data-app-maintenance-base="siteContactName" value="' + escapeHtml(item.siteContactName || '') + '" placeholder="请输入联系人姓名" />' : '<input disabled value="' + escapeHtml(item.siteContactName || '-') + '" />') +
      appSurveyInlineField('联系人职务', editable ? '<input data-app-maintenance-base="siteContactTitle" value="' + escapeHtml(item.siteContactTitle || '') + '" placeholder="请输入联系人职务" />' : '<input disabled value="' + escapeHtml(item.siteContactTitle || '-') + '" />') +
      appSurveyInlineField('联系电话', editable ? '<input data-app-maintenance-base="siteContactPhone" value="' + escapeHtml(item.siteContactPhone || '') + '" placeholder="请输入联系电话" />' : '<input disabled value="' + escapeHtml(item.siteContactPhone || '-') + '" />') +
      appSurveyInlineField('图片附件', editable ? '<input data-app-maintenance-base="imageAttachmentName" value="' + escapeHtml(item.imageAttachmentName || '') + '" placeholder="请输入图片名称" />' : '<input disabled value="' + escapeHtml(item.imageAttachmentName || '-') + '" />') +
      '<label class="field"><span>故障描述</span>' + (editable ? '<textarea data-app-maintenance-base="faultDesc" placeholder="请输入故障描述、现场现象及处置要求">' + escapeHtml(item.faultDesc || '') + '</textarea>' : '<textarea disabled>' + escapeHtml(item.faultDesc || '-') + '</textarea>') + '</label>' +
      '<label class="field"><span>备注</span>' + (editable ? '<textarea data-app-maintenance-base="remark" placeholder="请输入备注">' + escapeHtml(item.remark || '') + '</textarea>' : '<textarea disabled>' + escapeHtml(item.remark || '-') + '</textarea>') + '</label>' +
      '</div>',
      (mode === 'create' ? '' :
        '<div class="mobile-cost-approval"><div class="section-title"><h4>处置过程</h4><span></span></div><div class="mobile-cost-detail-card"><label class="field"><span>处置详情</span><textarea data-app-maintenance-process="detail" placeholder="请输入处置过程、结果说明">' + escapeHtml(process.detail || '') + '</textarea></label>' +
        appSurveyInlineField('图片附件', '<input data-app-maintenance-process="images" value="' + escapeHtml((process.images || []).join('、')) + '" placeholder="多个图片名称请用顿号分隔" />') +
        '</div>' + appMaintenanceProcessMetaHTML(process) + '</div>') +
      '<div class="mobile-cost-actions mobile-cost-actions-sticky">' +
      (mode === 'create'
        ? '<button class="btn primary" data-action="app-maintenance-save-create">提交</button>'
        : editable
          ? '<button class="btn primary" data-action="app-maintenance-save-edit" data-id="' + escapeHtml(item.id) + '">提交</button>'
          : '<button class="btn primary" data-action="app-maintenance-process-submit" data-id="' + escapeHtml(item.id) + '">提交处置过程</button>') +
      '</div></section>' + maintenanceWorkorderModalHTML()
    ].join('');
  }

  function saveAppMaintenance(mode, id) {
    var state = getMaintenanceWorkorderState();
    var modalItem = JSON.parse(JSON.stringify(currentAppMaintenanceDetailItem() || {}));
    if (!modalItem.projectId || !modalItem.worker || !modalItem.planDate) {
      window.alert('请填写必填项：项目、运维人员、计划运维日期');
      return;
    }
    var project = findProjectById(modalItem.projectId);
    var now = nowDateTimeText();
    var payload = Object.assign({}, modalItem, {
      projectName: project ? project.name : modalItem.projectId,
      createTime: modalItem.createTime || now,
      creator: modalItem.creator || currentUserName(),
      status: modalItem.status || '待处理',
      overdue: modalItem.planDate < now.slice(0, 10) && (modalItem.status || '待处理') !== '已完成',
      priority: modalItem.priority || '一般',
      processInfo: Object.assign({ detail: '', images: [], submitted: false, submitTime: '', submitter: '' }, modalItem.processInfo || {}),
      logs: (modalItem.logs || []).concat([{ time: now, operator: currentUserName(), content: mode === 'edit' ? 'APP端更新运维工单信息。' : 'APP端创建运维工单并安排现场处理。' }])
    });
    if (mode === 'edit' && id) {
      state.list = state.list.map(function (row) { return row.id === id ? Object.assign({}, row, payload, { id: id }) : row; });
      appState.ui.currentAppMaintenanceDraft = null;
      openAppMaintenanceDetail('view', id);
      return;
    }
    payload.id = 'YW-' + now.slice(0, 10).replace(/-/g, '') + '-' + String(state.nextId).padStart(3, '0');
    state.list.unshift(payload);
    state.nextId += 1;
    appState.ui.currentAppMaintenanceDraft = null;
    openAppMaintenanceDetail('view', payload.id);
  }

  function submitAppMaintenanceProcess(id) {
    var current = JSON.parse(JSON.stringify(currentAppMaintenanceDetailItem() || {}));
    var process = current.processInfo || {};
    var detail = safeText(process.detail).trim();
    if (!detail) {
      window.alert('请填写处置详情后再提交。');
      return;
    }
    var now = nowDateTimeText();
    var images = (process.images || []).slice(0, 10);
    getMaintenanceWorkorderState().list = getMaintenanceWorkorderState().list.map(function (item) {
      if (item.id !== id) return item;
      return Object.assign({}, item, {
        status: '已完成',
        overdue: false,
        processInfo: {
          detail: detail,
          images: images,
          submitted: true,
          submitTime: now,
          submitter: currentUserName()
        },
        logs: (item.logs || []).concat([{ time: now, operator: currentUserName(), content: 'APP端提交运维工单处置过程。' }])
      });
    });
    appState.ui.currentAppMaintenanceDraft = null;
    openAppMaintenanceDetail('view', id);
  }

  function revokeAppMaintenance(id) {
    if (!window.confirm('确认撤销该运维工单吗？')) return;
    getMaintenanceWorkorderState().list = getMaintenanceWorkorderState().list.map(function (item) {
      return item.id === id ? Object.assign({}, item, { status: '已撤销', overdue: false, logs: (item.logs || []).concat([{ time: nowDateTimeText(), operator: currentUserName(), content: 'APP端撤销运维工单。' }]) }) : item;
    });
    openAppMaintenanceDetail('view', id);
  }

  function deleteAppMaintenance(id) {
    if (!window.confirm('确认删除该运维工单吗？此操作仅影响演示数据。')) return;
    getMaintenanceWorkorderState().list = getMaintenanceWorkorderState().list.filter(function (item) { return item.id !== id; });
    appState.ui.currentAppMaintenanceDraft = null;
    setRoute('/app/maintenance-workorder');
  }

  function findSurvey(id) {
    return getSurveyWorkorderState().list.find(function (item) { return item.id === id; });
  }

  function openSurveyModal(mode, id) {
    var item = id ? JSON.parse(JSON.stringify(findSurvey(id))) : {
      id: '',
      projectId: '',
      projectName: '',
      surveyor: '',
      planDate: '',
      siteContactName: '',
      siteContactTitle: '',
      siteContactPhone: '',
      imageAttachmentName: '',
      remark: '',
      createTime: '',
      creator: '系统管理员',
      status: '待派工',
      overdue: false,
      logs: []
    };
    getSurveyWorkorderState().modal = { mode: mode, item: item };
    render();
  }

  function closeSurveyModal() {
    getSurveyWorkorderState().modal = null;
    render();
  }

  function saveSurvey(formData) {
    var state = getSurveyWorkorderState();
    var modal = state.modal;
    if (!modal) return;
    var projectId = safeText(formData.get('projectId')).trim();
    var surveyor = safeText(formData.get('surveyor')).trim();
    var planDate = safeText(formData.get('planDate')).trim();
    if (!projectId || !surveyor || !planDate) {
      window.alert('请填写必填项：项目、工勘人员、计划工勘日期');
      return;
    }
    var project = findProjectById(projectId);
    var payload = {
      projectId: projectId,
      projectName: project ? project.name : projectId,
      surveyor: surveyor,
      planDate: planDate,
      siteContactName: safeText(formData.get('siteContactName')).trim(),
      siteContactTitle: safeText(formData.get('siteContactTitle')).trim(),
      siteContactPhone: safeText(formData.get('siteContactPhone')).trim(),
      imageAttachmentName: modal.item.imageAttachmentName || '',
      remark: safeText(formData.get('remark')).trim(),
      createTime: modal.item.createTime || '2026-04-09 15:10',
      creator: modal.item.creator || '系统管理员',
      status: modal.item.status || '待工勘',
      overdue: planDate < '2026-04-09' && modal.item.status !== '已完成',
      logs: (modal.item.logs || []).concat([{ time: '2026-04-09 15:10', operator: '系统管理员', content: modal.mode === 'edit' ? '更新工勘工单信息。' : '创建工勘工单并分配工勘人员。' }])
    };
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      var dateCode = '20260409';
      payload.id = 'GK-' + dateCode + '-' + String(state.nextId).padStart(3, '0');
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function revokeSurvey(id) {
    if (!window.confirm('确认撤销该工勘工单吗？')) return;
    var state = getSurveyWorkorderState();
    state.list = state.list.map(function (item) {
      return item.id === id ? Object.assign({}, item, { status: '已撤销', overdue: false, logs: (item.logs || []).concat([{ time: '2026-04-09 15:20', operator: '系统管理员', content: '撤销工勘工单。' }]) }) : item;
    });
    render();
  }

  function deleteSurvey(id) {
    if (!window.confirm('确认删除该工勘工单吗？此操作仅影响演示数据。')) return;
    var state = getSurveyWorkorderState();
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function findConstruction(id) {
    return getConstructionWorkorderState().list.find(function (item) { return item.id === id; });
  }

  function openConstructionModal(mode, id) {
    var item = id ? JSON.parse(JSON.stringify(findConstruction(id))) : {
      id: '',
      projectId: '',
      projectName: '',
      worker: '',
      planDate: '',
      siteContactName: '',
      siteContactTitle: '',
      siteContactPhone: '',
      imageAttachmentName: '',
      remark: '',
      createTime: '',
      creator: '系统管理员',
      status: '待派工',
      overdue: false,
      logs: []
    };
    getConstructionWorkorderState().modal = { mode: mode, item: item };
    render();
  }

  function closeConstructionModal() {
    getConstructionWorkorderState().modal = null;
    render();
  }

  function saveConstruction(formData) {
    var state = getConstructionWorkorderState();
    var modal = state.modal;
    if (!modal) return;
    var projectId = safeText(formData.get('projectId')).trim();
    var worker = safeText(formData.get('worker')).trim();
    var planDate = safeText(formData.get('planDate')).trim();
    if (!projectId || !worker || !planDate) {
      window.alert('请填写必填项：项目、施工人员、计划施工日期');
      return;
    }
    var project = findProjectById(projectId);
    var payload = {
      projectId: projectId,
      projectName: project ? project.name : projectId,
      worker: worker,
      planDate: planDate,
      siteContactName: safeText(formData.get('siteContactName')).trim(),
      siteContactTitle: safeText(formData.get('siteContactTitle')).trim(),
      siteContactPhone: safeText(formData.get('siteContactPhone')).trim(),
      imageAttachmentName: modal.item.imageAttachmentName || '',
      remark: safeText(formData.get('remark')).trim(),
      createTime: modal.item.createTime || '2026-04-09 16:10',
      creator: modal.item.creator || '系统管理员',
      status: modal.item.status || '待施工',
      overdue: planDate < '2026-04-09' && modal.item.status !== '已完成',
      logs: (modal.item.logs || []).concat([{ time: '2026-04-09 16:10', operator: '系统管理员', content: modal.mode === 'edit' ? '更新施工工单信息。' : '创建施工工单并安排施工人员。' }])
    };
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      payload.id = 'SG-20260409-' + String(state.nextId).padStart(3, '0');
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function revokeConstruction(id) {
    if (!window.confirm('确认撤销该施工工单吗？')) return;
    var state = getConstructionWorkorderState();
    state.list = state.list.map(function (item) {
      return item.id === id ? Object.assign({}, item, { status: '已撤销', overdue: false, logs: (item.logs || []).concat([{ time: '2026-04-09 16:20', operator: '系统管理员', content: '撤销施工工单。' }]) }) : item;
    });
    render();
  }

  function deleteConstruction(id) {
    if (!window.confirm('确认删除该施工工单吗？此操作仅影响演示数据。')) return;
    var state = getConstructionWorkorderState();
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function findMaintenance(id) {
    return getMaintenanceWorkorderState().list.find(function (item) { return item.id === id; });
  }

  function openMaintenanceModal(mode, id) {
    var item = id ? JSON.parse(JSON.stringify(findMaintenance(id))) : {
      id: '',
      projectId: '',
      projectName: '',
      worker: '',
      planDate: '',
      siteContactName: '',
      siteContactTitle: '',
      siteContactPhone: '',
      imageAttachmentName: '',
      remark: '',
      createTime: '',
      creator: '系统管理员',
      status: '待派工',
      overdue: false,
      priority: '',
      faultDesc: '',
      processInfo: { detail: '', images: [], submitted: false, submitTime: '', submitter: '' },
      logs: []
    };
    getMaintenanceWorkorderState().modal = { mode: mode, item: item };
    render();
  }

  function closeMaintenanceModal() {
    getMaintenanceWorkorderState().modal = null;
    render();
  }

  function saveMaintenance(formData) {
    var state = getMaintenanceWorkorderState();
    var modal = state.modal;
    if (!modal) return;
    var projectId = safeText(formData.get('projectId')).trim();
    var worker = safeText(formData.get('worker')).trim();
    var planDate = safeText(formData.get('planDate')).trim();
    var faultDesc = safeText(formData.get('faultDesc')).trim();
    var priority = safeText(formData.get('priority')).trim();
    if (!projectId || !worker || !planDate) {
      window.alert('请填写必填项：项目、运维人员、计划运维日期');
      return;
    }
    var project = findProjectById(projectId);
    var payload = {
      projectId: projectId,
      projectName: project ? project.name : projectId,
      worker: worker,
      planDate: planDate,
      siteContactName: safeText(formData.get('siteContactName')).trim(),
      siteContactTitle: safeText(formData.get('siteContactTitle')).trim(),
      siteContactPhone: safeText(formData.get('siteContactPhone')).trim(),
      imageAttachmentName: modal.item.imageAttachmentName || '',
      remark: safeText(formData.get('remark')).trim(),
      createTime: modal.item.createTime || '2026-04-09 16:50',
      creator: modal.item.creator || '系统管理员',
      status: modal.item.status || '待处理',
      overdue: planDate < '2026-04-09' && modal.item.status !== '已完成',
      priority: priority || '一般',
      faultDesc: faultDesc,
      logs: (modal.item.logs || []).concat([{ time: '2026-04-09 16:50', operator: '系统管理员', content: modal.mode === 'edit' ? '更新运维工单信息。' : '创建运维工单并安排现场处理。' }])
    };
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      payload.id = 'YW-20260409-' + String(state.nextId).padStart(3, '0');
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function revokeMaintenance(id) {
    if (!window.confirm('确认撤销该运维工单吗？')) return;
    var state = getMaintenanceWorkorderState();
    state.list = state.list.map(function (item) {
      return item.id === id ? Object.assign({}, item, { status: '已撤销', overdue: false, logs: (item.logs || []).concat([{ time: '2026-04-09 17:00', operator: '系统管理员', content: '撤销运维工单。' }]) }) : item;
    });
    render();
  }

  function deleteMaintenance(id) {
    if (!window.confirm('确认删除该运维工单吗？此操作仅影响演示数据。')) return;
    var state = getMaintenanceWorkorderState();
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function findSales(id) {
    return getSalespersonState().list.find(function (item) { return item.id === id; });
  }

  function openSalesModal(mode, id) {
    var item = id ? Object.assign({}, findSales(id)) : {
      name: '', phone: '', team: '', status: '启用'
    };
    getSalespersonState().modal = { mode: mode, item: item };
    render();
  }

  function closeSalesModal() {
    getSalespersonState().modal = null;
    render();
  }

  function saveSales(formData) {
    var state = getSalespersonState();
    var modal = state.modal;
    if (!modal) return;
    var payload = {
      name: safeText(formData.get('name')).trim(),
      phone: safeText(formData.get('phone')).trim(),
      team: safeText(formData.get('team')).trim(),
      status: safeText(formData.get('status')).trim() || '启用'
    };
    if (!payload.name || !payload.phone || !payload.team) {
      window.alert('请填写必填项：姓名、手机号、所属团队');
      return;
    }
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id, followCount: item.followCount || 0 }) : item; });
    } else {
      payload.id = 'XS-' + String(state.nextId).padStart(3, '0');
      payload.followCount = 0;
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function deleteSales(id) {
    if (!window.confirm('确认删除该销售人员吗？此操作仅影响演示数据。')) return;
    var state = getSalespersonState();
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function toggleSales(id) {
    var state = getSalespersonState();
    state.list = state.list.map(function (item) {
      return item.id === id ? Object.assign({}, item, { status: item.status === '启用' ? '禁用' : '启用' }) : item;
    });
    render();
  }

  function findTeam(id) {
    return getSalesTeamState().list.find(function (item) { return item.id === id; });
  }

  function openTeamModal(mode, id) {
    var item = id ? JSON.parse(JSON.stringify(findTeam(id))) : {
      name: '', ownerId: '', ownerName: '', status: '启用', desc: '', createTime: '', memberIds: []
    };
    getSalesTeamState().modal = { mode: mode, item: item };
    render();
  }

  function closeTeamModal() {
    getSalesTeamState().modal = null;
    render();
  }

  function saveTeam(formData) {
    var state = getSalesTeamState();
    var modal = state.modal;
    if (!modal) return;
    var ownerId = safeText(formData.get('ownerId')).trim();
    var owner = findSales(ownerId);
    var payload = {
      name: safeText(formData.get('name')).trim(),
      ownerId: ownerId,
      ownerName: owner ? owner.name : '',
      status: safeText(formData.get('status')).trim() || '启用',
      desc: safeText(formData.get('desc')).trim(),
      createTime: modal.item.createTime || '2026-04-09 17:20',
      memberIds: modal.item.memberIds || []
    };
    if (!payload.name || !payload.ownerId) {
      window.alert('请填写必填项：团队名称、负责人');
      return;
    }
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      payload.id = 'XT-' + String(state.nextId).padStart(3, '0');
      if (payload.memberIds.indexOf(ownerId) === -1) payload.memberIds.unshift(ownerId);
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function deleteTeam(id) {
    if (!window.confirm('确认删除该销售团队吗？此操作仅影响演示数据。')) return;
    var state = getSalesTeamState();
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function addTeamMember(id) {
    var modal = getSalesTeamState().modal;
    var select = root.querySelector('select[name="memberToAdd"]');
    var memberId = select ? safeText(select.value).trim() : '';
    if (!modal || !memberId) {
      window.alert('请选择要绑定的成员');
      return;
    }
    if ((modal.item.memberIds || []).indexOf(memberId) !== -1) return;
    modal.item.memberIds.push(memberId);
    render();
  }

  function removeTeamMember(id, memberId) {
    var modal = getSalesTeamState().modal;
    if (!modal) return;
    modal.item.memberIds = (modal.item.memberIds || []).filter(function (item) { return item !== memberId; });
    render();
  }

  function findEngineer(id) {
    return getEngineerState().list.find(function (item) { return item.id === id; });
  }

  function openEngineerModal(mode, id) {
    var item = id ? Object.assign({}, findEngineer(id)) : {
      name: '', phone: '', team: '', status: '启用'
    };
    getEngineerState().modal = { mode: mode, item: item };
    render();
  }

  function closeEngineerModal() {
    getEngineerState().modal = null;
    render();
  }

  function saveEngineer(formData) {
    var state = getEngineerState();
    var modal = state.modal;
    if (!modal) return;
    var payload = {
      name: safeText(formData.get('name')).trim(),
      phone: safeText(formData.get('phone')).trim(),
      team: safeText(formData.get('team')).trim(),
      status: safeText(formData.get('status')).trim() || '启用'
    };
    if (!payload.name || !payload.phone || !payload.team) {
      window.alert('请填写必填项：姓名、手机号、所属小组');
      return;
    }
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id, workorderCount: item.workorderCount || 0 }) : item; });
    } else {
      payload.id = 'GC-' + String(state.nextId).padStart(3, '0');
      payload.workorderCount = 0;
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function deleteEngineer(id) {
    if (!window.confirm('确认删除该工程人员吗？此操作仅影响演示数据。')) return;
    var state = getEngineerState();
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function toggleEngineer(id) {
    var state = getEngineerState();
    state.list = state.list.map(function (item) {
      return item.id === id ? Object.assign({}, item, { status: item.status === '启用' ? '禁用' : '启用' }) : item;
    });
    render();
  }

  function findEngineerTeam(id) {
    return getEngineerTeamState().list.find(function (item) { return item.id === id; });
  }

  function openEngineerTeamModal(mode, id) {
    var item = id ? JSON.parse(JSON.stringify(findEngineerTeam(id))) : {
      name: '', ownerId: '', ownerName: '', status: '启用', laborCost: '', surveyLaborCost: '', desc: '', createTime: '', memberIds: []
    };
    getEngineerTeamState().modal = { mode: mode, item: item };
    render();
  }

  function closeEngineerTeamModal() {
    getEngineerTeamState().modal = null;
    render();
  }

  function saveEngineerTeam(formData) {
    var state = getEngineerTeamState();
    var modal = state.modal;
    if (!modal) return;
    var ownerId = safeText(formData.get('ownerId')).trim();
    var owner = findEngineer(ownerId);
    var payload = {
      name: safeText(formData.get('name')).trim(),
      ownerId: ownerId,
      ownerName: owner ? owner.name : '',
      status: safeText(formData.get('status')).trim() || '启用',
      laborCost: safeText(formData.get('laborCost')).trim(),
      surveyLaborCost: safeText(formData.get('surveyLaborCost')).trim(),
      desc: safeText(formData.get('desc')).trim(),
      createTime: modal.item.createTime || '2026-04-09 19:20',
      memberIds: modal.item.memberIds || []
    };
    if (!payload.name || !payload.ownerId) {
      window.alert('请填写必填项：小组名称、负责人');
      return;
    }
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      payload.id = 'GZ-' + String(state.nextId).padStart(3, '0');
      if (payload.memberIds.indexOf(ownerId) === -1) payload.memberIds.unshift(ownerId);
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function deleteEngineerTeam(id) {
    if (!window.confirm('确认删除该工程小组吗？此操作仅影响演示数据。')) return;
    var state = getEngineerTeamState();
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function addEngineerTeamMember(id) {
    var modal = getEngineerTeamState().modal;
    var select = root.querySelector('#engineer-team-form select[name="memberToAdd"]');
    var memberId = select ? safeText(select.value).trim() : '';
    if (!modal || !memberId) {
      window.alert('请选择要绑定的成员');
      return;
    }
    if ((modal.item.memberIds || []).indexOf(memberId) !== -1) return;
    modal.item.memberIds.push(memberId);
    render();
  }

  function removeEngineerTeamMember(id, memberId) {
    var modal = getEngineerTeamState().modal;
    if (!modal) return;
    modal.item.memberIds = (modal.item.memberIds || []).filter(function (item) { return item !== memberId; });
    render();
  }

  function findVehicle(id) {
    return getVehicleLogState().list.find(function (item) { return item.id === id; });
  }

  function openVehicleModal(mode, id) {
    var item = id ? Object.assign({}, findVehicle(id)) : {
      plate: '', user: '', reason: '', departTime: '', returnTime: '', mileage: '', status: '待审批', destination: '', remark: ''
    };
    getVehicleLogState().modal = { mode: mode, item: item };
    render();
  }

  function closeVehicleModal() {
    getVehicleLogState().modal = null;
    render();
  }

  function saveVehicle(formData) {
    var state = getVehicleLogState();
    var modal = state.modal;
    if (!modal) return;
    var payload = {
      plate: safeText(formData.get('plate')).trim(),
      user: safeText(formData.get('user')).trim(),
      reason: safeText(formData.get('reason')).trim(),
      departTime: safeText(formData.get('departTime')).trim().replace('T', ' '),
      returnTime: safeText(formData.get('returnTime')).trim() ? safeText(formData.get('returnTime')).trim().replace('T', ' ') : '-',
      mileage: safeText(formData.get('mileage')).trim() || '-',
      status: safeText(formData.get('status')).trim() || '待审批',
      destination: safeText(formData.get('destination')).trim(),
      remark: safeText(formData.get('remark')).trim()
    };
    if (!payload.plate || !payload.user || !payload.reason || !payload.departTime) {
      window.alert('请填写必填项：车牌号、用车人、事由、出车时间');
      return;
    }
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      payload.id = 'CL-20260409-' + String(state.nextId).padStart(2, '0');
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function deleteVehicle(id) {
    if (!window.confirm('确认删除该车辆使用记录吗？此操作仅影响演示数据。')) return;
    var state = getVehicleLogState();
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function findContract(id) {
    return getContractState().list.find(function (item) { return item.id === id; });
  }

  function openContractModal(mode, id) {
    var item = id ? JSON.parse(JSON.stringify(findContract(id))) : {
      id: '',
      customerId: '',
      customerName: '',
      projectId: '',
      projectName: '',
      status: '草稿',
      creator: '系统管理员',
      createTime: '2026-04-09 18:10',
      signDate: '',
      signPlace: '',
      employerRepName: '',
      employerRepPhone: '',
      contractorRepName: '',
      contractorRepPhone: '',
      content: '',
      startDate: '',
      duration: '',
      endDate: '',
      totalAmount: '',
      taxExclusiveAmount: '',
      taxAmount: '',
      taxRate: String(data.contractOptions.defaultTaxRate),
      prepayment: '',
      attachmentName: '',
      pricingDetails: buildDefaultContractPricingDetails()
    };
    item.pricingDetails = normalizeContractPricingDetails(item.pricingDetails);
    getContractState().modal = { mode: mode, item: item };
    render();
  }

  function closeContractModal() {
    getContractState().modal = null;
    render();
  }

  function saveContract(formData) {
    var state = getContractState();
    var modal = state.modal;
    if (!modal) return;
    var pricingDetails = [];
    for (var index = 0; index < 5; index += 1) {
      var productName = safeText(formData.get('pricing-product-' + index)).trim();
      var specModel = safeText(formData.get('pricing-spec-' + index)).trim();
      var qty = safeText(formData.get('pricing-qty-' + index)).trim();
      var unit = safeText(formData.get('pricing-unit-' + index)).trim();
      var taxPrice = safeText(formData.get('pricing-price-' + index)).trim();
      var remark = safeText(formData.get('pricing-remark-' + index)).trim();
      var hasValue = productName || specModel || qty || unit || taxPrice || remark;
      if (!hasValue) continue;
      if (!productName || !specModel || !qty || !taxPrice) {
        window.alert('请完整填写计价清单中的产品名称、规格型号、数量和含税单价');
        return;
      }
      var amount = (Number(qty) || 0) * (Number(taxPrice) || 0);
      pricingDetails.push({
        productName: productName,
        specModel: specModel,
        qty: qty,
        unit: unit,
        taxPrice: taxPrice,
        taxAmount: amount ? amount.toFixed(2) : '0.00',
        remark: remark
      });
    }
    if (!pricingDetails.length) {
      window.alert('请至少录入一条计价清单');
      return;
    }
    var summary = calcContractPricingSummary(pricingDetails, safeText(formData.get('taxRate')).trim() || data.contractOptions.defaultTaxRate);
    var payload = {
      customerId: safeText(formData.get('customerId')).trim(),
      signDate: safeText(formData.get('signDate')).trim(),
      signPlace: safeText(formData.get('signPlace')).trim(),
      id: safeText(formData.get('id')).trim() || modal.item.id,
      projectId: safeText(formData.get('projectId')).trim(),
      employerRepName: safeText(formData.get('employerRepName')).trim(),
      employerRepPhone: safeText(formData.get('employerRepPhone')).trim(),
      contractorRepName: safeText(formData.get('contractorRepName')).trim(),
      contractorRepPhone: safeText(formData.get('contractorRepPhone')).trim(),
      content: safeText(formData.get('content')).trim(),
      startDate: safeText(formData.get('startDate')).trim(),
      duration: safeText(formData.get('duration')).trim(),
      endDate: safeText(formData.get('endDate')).trim(),
      totalAmount: summary.totalAmount.toFixed(2),
      taxExclusiveAmount: summary.taxExclusiveAmount.toFixed(2),
      taxAmount: summary.taxAmount.toFixed(2),
      taxRate: safeText(formData.get('taxRate')).trim(),
      prepayment: safeText(formData.get('prepayment')).trim(),
      attachmentName: modal.item.attachmentName || '',
      pricingDetails: pricingDetails
    };
    var customer = findCustomer(payload.customerId);
    var project = findProjectById(payload.projectId);
    payload.customerName = customer ? customer.name : '';
    payload.projectName = project ? project.name : '';
    payload.status = modal.item.status || '草稿';
    payload.creator = modal.item.creator || '系统管理员';
    payload.createTime = modal.item.createTime || '2026-04-09 18:10';
    if (!payload.customerId || !payload.signDate || !payload.signPlace || !payload.id || !payload.projectId || !payload.employerRepName || !payload.employerRepPhone || !payload.contractorRepName || !payload.contractorRepPhone || !payload.content || !payload.startDate || !payload.duration || !payload.endDate || !payload.totalAmount || !payload.taxExclusiveAmount || !payload.taxAmount || !payload.taxRate || !payload.prepayment) {
      window.alert('请完整填写合同必填项');
      return;
    }
    if (modal.mode === 'edit' && modal.item.id) {
      state.list = state.list.map(function (item) { return item.id === modal.item.id ? Object.assign({}, item, payload, { id: modal.item.id }) : item; });
    } else {
      state.list.unshift(payload);
      state.nextId += 1;
    }
    state.modal = null;
    render();
  }

  function deleteContract(id) {
    if (!window.confirm('确认删除该合同吗？此操作仅影响演示数据。')) return;
    var state = getContractState();
    state.list = state.list.filter(function (item) { return item.id !== id; });
    render();
  }

  function revokeContract(id) {
    if (!window.confirm('确认撤销该合同吗？')) return;
    var state = getContractState();
    state.list = state.list.map(function (item) {
      return item.id === id ? Object.assign({}, item, { status: '已撤销' }) : item;
    });
    render();
  }

  function approveContract(id, mode) {
    var state = getContractState();
    var remarkNode = root.querySelector('textarea[name="contractApprovalRemark"]');
    var remark = remarkNode ? safeText(remarkNode.value).trim() : '';
    var actionMode = mode === 'reject' ? 'reject' : 'agree';
    if (actionMode === 'reject' && !remark) {
      window.alert('驳回时请填写审批意见');
      if (remarkNode) remarkNode.focus();
      return;
    }
    state.list = state.list.map(function (item) {
      return item.id === id ? Object.assign({}, item, {
        status: actionMode === 'reject' ? '已驳回' : '已通过',
        approvalRemark: remark,
        lastApprovalAction: actionMode === 'reject' ? '驳回' : '同意',
        approvalRecords: (item.approvalRecords || []).concat([{
          time: '2026-04-09 18:30',
          operator: '李国华',
          action: actionMode === 'reject' ? '驳回' : '同意',
          remark: remark || '审批同意。'
        }])
      }) : item;
    });
    state.modal = null;
    render();
  }

  function render() {
    var route = getRoute();
    root.innerHTML = route.indexOf('/app/') === 0 ? renderApp(route) : renderPC(route);
    bindActions();
    renderCharts(route);
    if (handlePendingCustomerView(route)) return;
  }

  if (!location.hash) location.hash = '/pc/dashboard';
  window.addEventListener('hashchange', render);
  window.addEventListener('load', render);
})();

