import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  background: {
    backgroundColor: 'lightblue',
    height: '100%',
  },
  '& >': {
    height: '100%',
  },
});

type LayoutProps = { children: React.ReactChild };

function Layout({ children }: LayoutProps) {
  const classes = useStyles();
  return (
    <Container className={classes.background} maxWidth="lg">
      {children}
    </Container>
  );
}

export default Layout;
