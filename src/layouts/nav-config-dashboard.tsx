import { GetCurrentUser } from 'src/utils/utls';

import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

const role = GetCurrentUser()?.role;

export const n_avData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Agency',
    path: '/agencies',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
    {
    title: 'Tags',
    path: '/tags',
    icon: icon('ic-user'),
  },
  {
    title: 'Tickets',
    path: '/tickets',
    icon: icon('ic-blog'),
  },
  // {
  //   title: 'Sign in',
  //   path: '/sign-in',
  //   icon: icon('ic-lock'),
  // },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];


const allNavData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    path: '/dashboard/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Agency',
    path: '/dashboard/agencies',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Tags',
    path: '/dashboard/tags',
    icon: icon('ic-user'),
  },
  {
    title: 'Tickets',
    path: '/dashboard/tickets',
    icon: icon('ic-blog'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];

// Filter nav items based on role
export const navData = role === 'ADMIN'
  ? allNavData
  : allNavData.filter(item =>
      ['Dashboard', 'Tickets'].includes(item.title)
    );
