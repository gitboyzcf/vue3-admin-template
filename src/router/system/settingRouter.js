// 固定路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/system/login/login.vue'),
    meta: {
      title: '登录',
      i18n: 'route.login'
    }
  },
  {
    path: '/',
    component: () => import('@/layout/Index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/system/dashboard.vue'),
        meta: {
          title: '仪表盘',
          i18n: 'route.dashboard'
        }
      },
      {
        path: 'personal/setting',
        name: 'personalSetting',
        component: () => import('@/views/personal/setting.vue'),
        meta: {
          title: '个人设置',
          i18n: 'route.personal.setting',
          cache: 'personalEditPassword',
          breadcrumbNeste: [{ title: '个人设置', path: '/personal/setting' }]
        }
      },
      {
        path: 'personal/edit/password',
        name: 'personalEditPassword',
        component: () => import('@/views/personal/edit.password.vue'),
        meta: {
          title: '修改密码',
          i18n: 'route.personal.editpassword',
          breadcrumbNeste: [{ title: '修改密码', path: '/personal/edit/password' }]
        }
      },
      // {
      //   path: 'reload',
      //   name: 'reload',
      //   component: () => import('@/views/system/reload.vue')
      // }
    ]
  }
]

// 必须最后注册
export const lastRoute = {
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/system/404/404.vue'),
  meta: {
    title: '找不到页面'
  }
}