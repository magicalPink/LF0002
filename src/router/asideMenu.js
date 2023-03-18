const asideMenu = [
  {
    name: '音乐',
    icon: 'music',
    path: 'music',
    fileAddress: 'music/music.vue',
    jurisdiction: 'music',
    keepAlive: true
  },
  {
    name: '聊天',
    icon: 'chat',
    path: 'chat',
    fileAddress: 'chat/chat.vue',
    jurisdiction: 'chat',
    keepAlive: false
  },
  {
    name: '系统管理',
    icon: 'system',
    path: 'system',
    jurisdiction: 'system',
    children: [
      {
        name: '菜单管理',
        path: 'menu',
        fileAddress: 'system/menu/menu.vue',
        keepAlive: true
      },
      {
        name: '角色管理',
        path: 'role',
        fileAddress: 'system/role/role.vue',
        keepAlive: true
      },
    ]
  }
]
export default asideMenu
