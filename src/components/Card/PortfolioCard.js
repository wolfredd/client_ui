import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { Folder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function PortfolioCard({ id, title, numStocks }) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/app/portfolio/${id}`)}
      orientation="horizontal"
      variant="outlined"
      sx={{ width: 260, bgcolor: 'background.body', cursor: 'pointer' }}
    >
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <Folder />
        </AspectRatio>
      </CardOverflow>
      <CardContent sx={{ pl: 2 }}>
        <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
          {title}
        </Typography>
        <Typography level="body2">{numStocks} stock</Typography>
      </CardContent>
    </Card>
  );
}