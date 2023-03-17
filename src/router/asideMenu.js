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
    name: '测试',
    icon: 'test',
    path: 'test',
    jurisdiction: 'test',
    children: [
      {
        name: '测试1',
        path: 'test1',
        fileAddress: 'test/test1/test1.vue',
        keepAlive: true
      }
    ]
  }
]
export default asideMenu
