import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import SendIcon from '@mui/icons-material/Send';
import AppTheme from '../shared-theme/AppTheme';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 280;
const collapsedWidth = 72;

export default function Dashboard(props) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
        
        {/* Fixed Side Dock */}
        <Drawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : collapsedWidth,
            flexShrink: 0,
            display: { xs: 'none', lg: 'block' },
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            [`& .MuiDrawer-paper`]: { 
              width: open ? drawerWidth : collapsedWidth, 
              boxSizing: 'border-box',
              pt: 10,
              px: open ? 3 : 1,
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {/* Toggle Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'flex-end' : 'center', mb: 2 }}>
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>

          {/* User Info Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar 
              sx={{ 
                width: open ? 80 : 40, 
                height: open ? 80 : 40, 
                mb: open ? 2 : 0, 
                bgcolor: 'primary.main', 
                boxShadow: 2,
                transition: theme.transitions.create(['width', 'height', 'margin'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              }}
            >
              <PersonIcon sx={{ fontSize: open ? 40 : 20 }} />
            </Avatar>
            {open && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {props.user?.name || 'User'}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Intermediate • 5 Day Streak
                </Typography>
              </>
            )}
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Settings Section */}
          {open && (
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 'bold', mb: 1, display: 'block' }}>
              Quick Settings
            </Typography>
          )}
          <List dense disablePadding>
            <ListItem disablePadding secondaryAction={<Switch edge="end" size="small" defaultChecked />}>
              <ListItemButton sx={{ px: open ? 2 : 1.5 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <NotificationsIcon fontSize="small" />
                </ListItemIcon>
                {open && <ListItemText primary="Notifications" />}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ px: open ? 2 : 1.5 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                {open && <ListItemText primary="Account" />}
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pt: 4,
            display: 'flex',
            flexDirection: 'column',
            width: { lg: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)` },
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
            <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
              Your Fitness Journey
            </Typography>
            
            <Grid container spacing={3}>
            {/* Health Summary Widgets */}
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="overline" color="text.secondary">
                    Calories Burned
                  </Typography>
                  <Typography variant="h5">1,240 kcal</Typography>
                  <Typography variant="caption" color="success.main">
                    80% of daily goal
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="overline" color="text.secondary">
                    Active Minutes
                  </Typography>
                  <Typography variant="h5">45 min</Typography>
                  <Typography variant="caption" color="success.main">
                    +5 min from yesterday
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="overline" color="text.secondary">
                    Calorie Intake
                  </Typography>
                  <Typography variant="h5">1,850 kcal</Typography>
                  <Typography variant="caption" color="warning.main">
                    650 kcal remaining
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="overline" color="text.secondary">
                    Protein Goal
                  </Typography>
                  <Typography variant="h5">120g / 150g</Typography>
                  <Typography variant="caption" color="text.secondary">
                    30g to go
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Workout & Diet Trends */}
            <Grid item xs={12} md={8} sx={{ display: 'flex' }}>
              <Card variant="outlined" sx={{ flexGrow: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Activity & Nutrition Trends
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'action.hover',
                      borderRadius: 1,
                    }}
                  >
                    <Typography color="text.secondary">Workout vs Diet Progress Chart</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* AI Health Coach Chat */}
            <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
              <Card variant="outlined" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    AI Health Coach
                  </Typography>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      flexGrow: 1, 
                      mb: 2, 
                      p: 1, 
                      bgcolor: 'action.hover', 
                      overflowY: 'auto',
                      maxHeight: '220px'
                    }}
                  >
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Coach: Hello! Ready to log your lunch or check your workout plan?" 
                          slotProps={{ primary: { variant: 'body2' } }}
                        />
                      </ListItem>
                    </List>
                  </Paper>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Ask your coach..."
                    />
                    <IconButton color="primary">
                      <SendIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Divider />
      </Box>
      </Box>
    </AppTheme>
  );
}
