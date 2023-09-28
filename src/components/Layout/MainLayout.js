import { Grid } from "@mui/joy"

const MainLayout = ({ children }) => {
    return (
        <div>
            <Grid container>
                <Grid md={3} xs={12}>Sidebar</Grid>
                <Grid md={6} xs={12}>{children}</Grid>ß
                <Grid md={3} xs={12}>Side</Grid>
            </Grid>

        </div>
    )
}

export default MainLayout;