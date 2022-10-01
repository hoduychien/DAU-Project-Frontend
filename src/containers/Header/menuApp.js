export const adminMenu = [
    {
        name: 'menu.admin.user-manage', menus: [
            {
                name: 'menu.admin.user-manage', link: '/system/user-manage',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.redux-manage', link: '/system/user-manage-redux' },
                // ]
            },
            {
                name: 'menu.admin.redux-user-manage', link: '/system/user-manage-redux'
            },
            {
                name: 'menu.admin.lecture-manager', link: '/system/lecture-manage'
            },
            {
                name: 'menu.admin.system', link: '/system/admin-manage'
            },
        ]
    },

];