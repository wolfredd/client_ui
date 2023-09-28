import { Box, Sheet, Stack, Typography } from "@mui/joy";

const Logo = () => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    spacing={1}
  >
    <Sheet sx={{
      fontSize: '2em',
      fontWeight: 'bold',
      px: 1,
      py: 0.5,
      color: '#fff',
      background: 'rgba(0,0,0,0.0)'
    }}>

      <Typography
        fontWeight="lg"
        startDecorator={
          <Box
            component="span"
            sx={{
              width: 24,
              height: 24,
              background: (theme) =>
                `linear-gradient(45deg, ${theme.vars.palette.primary.solidBg}, ${theme.vars.palette.primary.solidBg} 30%, ${theme.vars.palette.primary.softBg})`,
              borderRadius: '50%',
              boxShadow: (theme) => theme.shadow.md,
              '--joy-shadowChannel': (theme) =>
                theme.vars.palette.primary.mainChannel,
            }}
          />
        }
      >
      </Typography>
    </Sheet>
    <Sheet
      sx={{
        fontSize: '1.2em',
        background: 'none',
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}
    >
      Saga Trading
    </Sheet>
  </Stack>
);

export default Logo;