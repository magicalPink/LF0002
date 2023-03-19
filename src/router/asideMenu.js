const asideMenu = [
  {
    id: 1,
    name: '音乐',
    icon: 'music',
    path: 'music',
    fileAddress: 'music/music.vue',
    jurisdiction: 'music',
    keepAlive: true
  },
  {
    id: 2,
    name: '聊天',
    icon: 'chat',
    path: 'chat',
    fileAddress: 'chat/chat.vue',
    jurisdiction: 'chat',
    keepAlive: false
  },
  {
    id: 3,
    name: '系统管理',
    icon: 'system',
    path: 'system',
    jurisdiction: 'system',
    children: [
      {
        id: 301,
        name: '菜单管理',
        path: 'menu',
        fileAddress: 'system/menu/menu.vue',
        keepAlive: true
      },
      {
        id: 302,
        name: '角色管理',
        path: 'role',
        fileAddress: 'system/role/role.vue',
        keepAlive: true
      }
    ]
  }
]
export default asideMenu
