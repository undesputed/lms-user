import React from 'react';
import { styled } from '@mui/material/styles';
import { Tabs } from '@mui/material';

export const TabsWrapper = styled(Tabs)(
  () => `
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }
  `
);
