import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import ProductList from '../ProductList';
import { Divider } from '@mui/joy';

export default function GenericTabbedCard({ data }) {
  return (
    <Tabs
      size="md"
      defaultValue={0}
      sx={(theme) => ({
        '--Tabs-gap': '0px',
        borderRadius: 'lg',
        boxShadow: 'sm',
        overflow: 'auto',
        border: `1px solid ${theme.vars.palette.divider}`,
      })}
    >
      <TabList
        sx={{
          '--ListItem-radius': '0px',
          borderRadius: 0,
          [`& .${tabClasses.root}`]: {
            fontWeight: 'lg',
            flex: 1,
            bgcolor: 'background.body',
            position: 'relative',
            [`&.${tabClasses.selected}`]: {
              color: 'primary.500',
            },
            [`&.${tabClasses.selected}:before`]: {
              content: '""',
              display: 'block',
              position: 'absolute',
              bottom: -1,
              width: '100%',
              height: 2,
              bgcolor: 'primary.400',
            },
            [`&.${tabClasses.focusVisible}`]: {
              outlineOffset: '-3px',
            },
          },
        }}
      >
        {
          data && data.headers?.map(header => (
            <Tab sx={{ py: 1.5 }}>{header}</Tab>
          ))
        }
      </TabList>
      {
        data && data.contentList.map((content, index) => (
          <TabPanel value={index} sx={{ p: 3 }}>
            {
              content
            }
          </TabPanel>
        ))
      }
    </Tabs>
  );
}