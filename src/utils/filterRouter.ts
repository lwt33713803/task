/**
 * 过滤接口 路由
 * @param firstRouter 默认静态路由(首页、404、401) 
 * @returns 
 */
const firstRouter = {
  path: '/',
  component: 'Layout',
  redirect: '',
  meta: {
    hidden: true,
    roles: ['ADMIN']
  },
  children: [{
    path: "401",
    component: () => import("@/views/error-page/401.vue"),
    meta: { hidden: true },
  },
  {
    path: "404",
    component: () => import("@/views/error-page/404.vue"),
    meta: { hidden: true },
  },]
}
export const filterData = (arr: any) => {
  let role_nodes: any[] = [];
  const result = arr.map((item: any, index: any) => {
    const routers = {
      path: '',
      component: '',
      redirect: '',
      name: '',
      meta: {
        title: '',
        icon: '',
        roles: [''],
        hidden: false
      },
      children: [{}]
    }
    let child_route: { path: any; name: any; component: any; meta: { title: any; icon: any; roles: string[]; hidden: boolean }; }[] = [];
    if (index === 0) {
      firstRouter.redirect = item.extra.redirect
    }
    routers.path = item.uniqid;
    routers.name = item.extra.icon;
    routers.component = item.extra.component;
    routers.redirect = item.extra.redirect;
    routers.meta.title = item.name;
    routers.meta.icon = item.extra.icon;
    routers.meta.roles = ['ADMIN'];
    routers.meta.hidden = item.extra.hidden;
    item.children.map((c_item: any) => {
      // 元素权限过滤
      role_nodes.push(...filterNodes(c_item));
      return child_route.push({
        path: c_item.uniqid,
        name: c_item.extra.icon,
        component: c_item.extra.component + '/index',
        meta: {
          title: c_item.name,
          icon: c_item.extra.icon,
          roles: ['ADMIN'],
          hidden: c_item.extra.hidden
        }
      })
    }
    )
    routers.children = child_route;
    return routers
  })
  
  localStorage.setItem('roleNodes', JSON.stringify(role_nodes));
  result.unshift(firstRouter)
  return result
}

const filterNodes = (data: any) => {
  let nodes: any[] = []
  if (data.role_nodes) {
    data.role_nodes.map((_item: any) => {
      nodes.push(_item.uniqid)
    })
  }
  return nodes
}