const tableData = [
  {
    id: 1,
    parentId: null,
    name: '系统管理',
    checked: false,
    indeterminate: false,
    children: [
      {
        id: 2,
        parentId: 1,
        name: '员工管理',
        checked: false,
        indeterminate: false,
        children: [
          {
            id: 5,
            parentId: 2,
            name: '创建账号',
            checked: false,
          },
          {
            id: 6,
            parentId: 2,
            name: '删除账号',
            checked: false,
          },
          {
            id: 7,
            parentId: 2,
            name: '启用/停用账号',
            checked: false,
          },
        ]
      },
      {
        id: 3,
        parentId: 1,
        name: '权限管理',
        checked: false,
        indeterminate: false,
        children: [
          {
            id: 8,
            parentId: 3,
            name: '创建角色权限',
            checked: false,
          },
          {
            id: 9,
            parentId: 3,
            name: '关闭角色',
            checked: false,
          },
          {
            id: 10,
            parentId: 3,
            name: '配置权限',
            checked: false,
          },
        ]
      },
      {
        id: 4,
        parentId: 1,
        name: '操作日志',
        checked: false,
        indeterminate: false,
        children: [
          {
            id: 11,
            parentId: 4,
            name: '查看操作日志',
            checked: false,
          },
        ]
      }
    ]
  },
  {
    id: 12,
    parentId: null,
    name: '操作平台',
    checked: false,
    indeterminate: false,
    children: [
      {
        id: 13,
        parentId: 12,
        name: '个人案例处理详情',
        checked: false,
        indeterminate: false,
        children: [
          {
            id: 14,
            parentId: 13,
            name: '查看',
            checked: false,
          },
        ]
      },
      {
        id: 15,
        parentId: 12,
        name: '今日待处理案例',
        checked: false,
        indeterminate: false,
        children: [
          {
            id: 16,
            parentId: 15,
            name: '归入PCRS',
            checked: false,
          },
          {
            id: 17,
            parentId: 15,
            name: '新建PCRS',
            checked: false,
          },
          {
            id: 18,
            parentId: 15,
            name: '跟踪处理',
            checked: false,
          },
        ]
      },
    ]
  },
]
export default tableData
