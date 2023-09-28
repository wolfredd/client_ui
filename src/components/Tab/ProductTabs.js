import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import ProductList from '../ProductList';
import { Divider } from '@mui/joy';

export default function ProductTabbedCard({ productData }) {
  return (
    <Tabs
      size="md"
      aria-label="Pricing plan"
      defaultValue={0}
      sx={(theme) => ({
        maxWidth: 600,
        '--Tabs-gap': '0px',
        borderRadius: 'lg',
        boxShadow: 'sm',
        overflow: 'auto',
        border: `1px solid ${theme.vars.palette.divider}`,
      })}
    >
      <Typography level="h6" sx={{ textAlign: 'center', p: 1}}>Exchange market</Typography>
      <Divider/>
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
          productData && Object.keys(productData).map(exchangeName => (
            <Tab sx={{ py: 1.5 }}>{exchangeName}</Tab>
          ))
        }
      </TabList>
      {
        productData && Object.keys(productData).map((exchangeName, index) => (
          <TabPanel value={index} sx={{ p: 3 }}>
            {
              <ProductList data={productData[exchangeName]} exchange={exchangeName} />
            }
          </TabPanel>
        ))
      }
    </Tabs>
  );
}