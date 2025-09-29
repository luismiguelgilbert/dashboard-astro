import {Building2, CircleUserRound, Home, Inbox, UsersRound} from "lucide-vue-next";

export const sidebarMenuList = [
  {
    title: 'Application',
    items: [
      { id: null, title: 'Inicio', url: '/', icon: Home },
      { id: null, title: 'Notificaciones', url: '/notifications', icon: Inbox },
    ]
  },
  {
    title: 'Sistema',
    items: [
      { id: '010100', title: 'Usuarios', url: '/system/users', icon: UsersRound },
      { id: '010200', title: 'Roles', url: '/system/roles', icon: CircleUserRound },
      { id: '010300', title: 'Organizaciones', url: '/system/organizations', icon: Building2 },
    ]
  }
];