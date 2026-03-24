import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';

const AuthCard = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(120, 40%, 20%, 0.05) 0px 5px 15px 0px, hsla(120, 40%, 15%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(120, 40%, 15%, 0.5) 0px 5px 15px 0px, hsla(120, 35%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const AuthContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(120, 100%, 90%), transparent)',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(120, 100%, 16%), transparent)',
    }),
  },
}));

export default function AuthLayout({ children, ...appProps }) {
  return (
    <AppTheme {...appProps}>
      <CssBaseline enableColorScheme />
      <AuthContainer direction="column" justifyContent="space-between">
        <AuthCard variant="outlined">{children}</AuthCard>
      </AuthContainer>
    </AppTheme>
  );
}
