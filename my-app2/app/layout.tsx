import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import type { Navigation } from '@toolpad/core/AppProvider';
import { SessionProvider, signIn, signOut } from 'next-auth/react';
import { auth } from '../auth';
import theme from '../theme';
import { CalendarMonthRounded, HomeWorkRounded, ImportContactsRounded, ManageAccountsRounded } from '@mui/icons-material';

const NAVIGATION: Navigation = [

  {
    segment: '',
    title: 'Home',
    icon: <HomeWorkRounded />,
  },
  {
    segment: 'calendar',
    title: 'Calendar',
    icon: <CalendarMonthRounded />,
  },
  {
    segment: 'worksiteinfo',
    title: 'Worksite Information',
    icon: <ImportContactsRounded />,
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: <ManageAccountsRounded />,
  },
];

const BRANDING = {
  title: 'ServiceSync',
  logo: <img src="https://i.imgur.com/Qb4GvFV.png" alt="RRP logo" />,
};


const AUTHENTICATION = {
  signIn,
  signOut,
};


export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          
            <NextAppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              session={session}
              authentication={AUTHENTICATION}
              theme={theme}
            >
              {props.children}
            </NextAppProvider>
            
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
