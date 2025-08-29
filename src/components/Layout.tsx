import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  background: {
    backgroundColor: 'lightblue',
    height: '100%',
  },
  '& >': {
    height: '100%',
  },
});

type LayoutProps = { children: React.ReactNode };

function Layout({ children }: LayoutProps) {
  const classes = useStyles();
  return (
    <Container className={classes.background} maxWidth="lg">
      {children}
    </Container>
  );
}

export default Layout;
