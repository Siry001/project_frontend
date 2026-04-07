import * as React from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { generateAiDietPlan, generateAiWorkout } from '../api/services/aiFeaturesServices';
import DietSystemCard from '../components/dashboard/DietSystemCard';
import WorkoutSystemCard from '../components/dashboard/WorkoutSystemCard';
import AppTheme from '../shared-theme/AppTheme';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const drawerWidth = 280;
const collapsedWidth = 72;
const initialWorkout = {
  goal: '',
  daysPerWeek: '',
  sessionLength: '',
  notes: '',
};
const initialDietPlan = {
  goal: '',
  calories: '',
  meals: '',
  notes: '',
};

function hasRequiredWorkoutData(values) {
  return Boolean(values.goal.trim() && values.daysPerWeek.trim() && values.sessionLength.trim());
}

function hasRequiredDietData(values) {
  return Boolean(values.goal.trim() && values.calories.trim() && values.meals.trim());
}

function formatManualPlan(label, description, sections) {
  return {
    source: 'manual',
    headline: label,
    description,
    sections,
  };
}

function formatManualWorkout(values) {
  return formatManualPlan('Manual workout setup', 'Your current manual workout targets are ready for AI generation.', [
    {
      title: 'Targets',
      items: [
        `Goal: ${values.goal || 'Not set yet'}`,
        `Training frequency: ${values.daysPerWeek || 'Not set'} days per week`,
        `Session length: ${values.sessionLength || 'Not set'}`,
      ],
    },
    {
      title: 'Preferences',
      items: [values.notes || 'Add equipment, injury, or split preferences to guide the plan.'],
    },
  ]);
}

function formatManualDiet(values) {
  return formatManualPlan('Manual nutrition setup', 'These meal preferences are currently driving the nutrition plan preview.', [
    {
      title: 'Targets',
      items: [
        `Goal: ${values.goal || 'Not set yet'}`,
        `Calories: ${values.calories || 'Not set'} kcal`,
        `Meals per day: ${values.meals || 'Not set'}`,
      ],
    },
    {
      title: 'Preferences',
      items: [values.notes || 'Add dietary preferences, restrictions, or meal style notes.'],
    },
  ]);
}

function toSentenceCase(text) {
  return text
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function valueToItems(value) {
  if (value == null) {
    return [];
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry) => valueToItems(entry));
  }

  if (typeof value === 'object') {
    return Object.entries(value).map(([key, entry]) => `${toSentenceCase(key)}: ${String(entry)}`);
  }

  return [];
}

function formatAiPlan(data, fallbackHeadline, fallbackDescription) {
  if (typeof data === 'string') {
    return {
      source: 'ai',
      headline: fallbackHeadline,
      description: fallbackDescription,
      sections: [{ title: 'AI Plan', items: [data] }],
    };
  }

  if (Array.isArray(data)) {
    return {
      source: 'ai',
      headline: fallbackHeadline,
      description: fallbackDescription,
      sections: [{ title: 'AI Plan', items: valueToItems(data) }],
    };
  }

  if (data && typeof data === 'object') {
    const headline =
      data.title || data.name || data.summary || data.goal || data.planName || fallbackHeadline;
    const description =
      data.description || data.overview || data.message || data.intro || fallbackDescription;

    const reserved = new Set(['title', 'name', 'summary', 'goal', 'planName', 'description', 'overview', 'message', 'intro']);
    const sections = Object.entries(data)
      .filter(([key]) => !reserved.has(key))
      .map(([key, value]) => ({
        title: toSentenceCase(key),
        items: valueToItems(value),
      }))
      .filter((section) => section.items.length > 0);

    return {
      source: 'ai',
      headline,
      description,
      sections: sections.length ? sections : [{ title: 'AI Plan', items: ['Plan generated successfully.'] }],
    };
  }

  return {
    source: 'ai',
    headline: fallbackHeadline,
    description: fallbackDescription,
    sections: [{ title: 'AI Plan', items: ['Plan generated successfully.'] }],
  };
}

export default function Dashboard(props) {
  const [open, setOpen] = React.useState(true);
  const [workout, updateWorkout] = React.useState(initialWorkout);
  const [dietPlan, updateDietPlan] = React.useState(initialDietPlan);
  const [workoutSource, setWorkoutSource] = React.useState('manual');
  const [dietSource, setDietSource] = React.useState('manual');
  const [aiWorkoutContent, setAiWorkoutContent] = React.useState(null);
  const [aiDietContent, setAiDietContent] = React.useState(null);
  const [workoutLoading, setWorkoutLoading] = React.useState(false);
  const [dietLoading, setDietLoading] = React.useState(false);
  const [workoutError, setWorkoutError] = React.useState('');
  const [dietError, setDietError] = React.useState('');
  const [isWorkoutPlanVisible, setIsWorkoutPlanVisible] = React.useState(false);
  const [isDietPlanVisible, setIsDietPlanVisible] = React.useState(false);
  const theme = useTheme();

  function setWorkout(data) {
    updateWorkout((current) => ({ ...current, ...data }));
    setWorkoutSource('manual');
    setWorkoutError('');
  }

  function setDietPlan(data) {
    updateDietPlan((current) => ({ ...current, ...data }));
    setDietSource('manual');
    setDietError('');
  }

  function showWorkoutPlan() {
    if (hasRequiredWorkoutData(workout)) {
      setIsWorkoutPlanVisible(true);
    }
  }

  function showDietPlan() {
    if (hasRequiredDietData(dietPlan)) {
      setIsDietPlanVisible(true);
    }
  }

  function getWorkout() {
    if (workoutSource === 'ai' && aiWorkoutContent) {
      return formatAiPlan(
        aiWorkoutContent,
        'AI workout plan',
        'Generated from your latest workout preferences.',
      );
    }

    return formatManualWorkout(workout);
  }

  function getDietPlan() {
    if (dietSource === 'ai' && aiDietContent) {
      return formatAiPlan(
        aiDietContent,
        'AI diet plan',
        'Generated from your latest nutrition preferences.',
      );
    }

    return formatManualDiet(dietPlan);
  }

  async function handleGenerateWorkout() {
    try {
      setWorkoutLoading(true);
      setWorkoutError('');
      const response = await generateAiWorkout(workout);
      setAiWorkoutContent(response);
      setWorkoutSource('ai');
      setIsWorkoutPlanVisible(true);
    } catch (error) {
      setWorkoutError(error?.response?.data?.message || 'Unable to generate workout plan right now.');
    } finally {
      setWorkoutLoading(false);
    }
  }

  async function handleGenerateDietPlan() {
    try {
      setDietLoading(true);
      setDietError('');
      const response = await generateAiDietPlan(dietPlan);
      setAiDietContent(response);
      setDietSource('ai');
      setIsDietPlanVisible(true);
    } catch (error) {
      setDietError(error?.response?.data?.message || 'Unable to generate diet plan right now.');
    } finally {
      setDietLoading(false);
    }
  }

  const workoutPlan = getWorkout();
  const currentDietPlan = getDietPlan();
  const canShowWorkoutPlan = hasRequiredWorkoutData(workout);
  const canShowDietPlan = hasRequiredDietData(dietPlan);
  const overviewCards = [
    {
      title: 'Workout cadence',
      value: workout.daysPerWeek ? `${workout.daysPerWeek} days` : 'Not set',
      detail: workoutSource === 'ai' ? 'AI plan active' : 'Manual setup in progress',
      icon: <FitnessCenterRoundedIcon color="primary" />,
    },
    {
      title: 'Daily nutrition',
      value: dietPlan.calories ? `${dietPlan.calories} kcal` : 'Not set',
      detail: dietSource === 'ai' ? 'AI meal plan active' : 'Manual setup in progress',
      icon: <RestaurantMenuRoundedIcon color="secondary" />,
    },
    {
      title: 'Visibility',
      value: `${(isWorkoutPlanVisible ? 1 : 0) + (isDietPlanVisible ? 1 : 0)}`,
      detail: 'Plans revealed in the workspace',
      icon: <AutoAwesomeRoundedIcon color="action" />,
    },
    {
      title: 'Live Status',
      value: workoutPlan.source === 'ai' && dietSource === 'ai' ? 'AI-driven' : 'Manual',
      detail: workoutPlan.source === 'ai' && dietSource === 'ai' ? 'Both plans AI-generated' : 'Manual content still active',
      icon: <PersonIcon color="disabled" />,
    },
  ];
  const sideDockItems = [
    {
      label: 'Dashboard',
      caption: 'Overview',
      icon: <SpaceDashboardRoundedIcon fontSize="small" />,
      active: true,
      href: '/dashboard',
    },
    {
      label: 'Workout',
      caption: isWorkoutPlanVisible ? 'Preview ready' : 'Drafting',
      icon: <FitnessCenterRoundedIcon fontSize="small" />,
      active: false,
      href: '/dashboard',
    },
    {
      label: 'Nutrition',
      caption: isDietPlanVisible ? 'Preview ready' : 'Drafting',
      icon: <RestaurantMenuRoundedIcon fontSize="small" />,
      active: false,
      href: '/dashboard',
    },
    {
      label: 'Landing Page',
      caption: 'Back to home',
      icon: <HomeRoundedIcon fontSize="small" />,
      active: false,
      href: '/',
    },
    {
      label: 'Account',
      caption: 'Preferences',
      icon: <SettingsIcon fontSize="small" />,
      active: false,
      href: '/dashboard',
    },
  ];

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          background:
            'radial-gradient(circle at top left, rgba(30, 119, 126, 0.16), transparent 22%), radial-gradient(circle at top right, rgba(234, 151, 59, 0.12), transparent 24%), #070b11',
        }}
      >
        
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
              pt: 2,
              px: open ? 2 : 0.75,
              bgcolor: 'rgba(10, 15, 22, 0.94)',
              backdropFilter: 'blur(24px)',
              borderRight: '1px solid',
              borderColor: 'rgba(255,255,255,0.08)',
              overflowX: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {/* Toggle Button */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: open ? 'space-between' : 'center',
              mb: 2.5,
              px: open ? 0.5 : 0,
            }}
          >
            {open ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  px: 1.25,
                  py: 1,
                  borderRadius: 4,
                  bgcolor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary', display: 'block', lineHeight: 1.1 }}>
                  Gymtracker AI
                </Typography>
              </Box>
            ) : (
              null
            )}
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{
                border: '1px solid rgba(255,255,255,0.08)',
                bgcolor: 'rgba(255,255,255,0.03)',
                borderRadius: 3,
              }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>

          {/* User Info Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: open ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2.5,
              px: open ? 1.5 : 0.5,
              py: open ? 3 : 1.25,
              borderRadius: 6,
              bgcolor: open ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Avatar 
              sx={{ 
                width: open ? 80 : 42, 
                height: open ? 80 : 42, 
                mb: open ? 2 : 0, 
                bgcolor: 'primary.main',
                color: '#061014',
                boxShadow: '0 16px 40px rgba(76, 201, 194, 0.3)',
                transition: theme.transitions.create(['width', 'height', 'margin'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              }}
            >
              <PersonIcon sx={{ fontSize: open ? 40 : 22 }} />
            </Avatar>
            {open && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {props.user?.name || 'User'}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Intermediate athlete
                </Typography>
                <Chip
                  size="small"
                  label= {props.user?.isFilled ? 'Ready to Track' : "Ready to plan"} // this needs to be dynamic based on whether the user has filled in their details or not
                  sx={{
                    mt: 1.5,
                    bgcolor: 'rgba(69, 192, 199, 0.12)',
                    color: 'primary.main',
                    border: '1px solid rgba(69, 192, 199, 0.18)',
                  }}
                />
              </>
            )}
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {open ? (
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 'bold', mb: 1, display: 'block', px: 1 }}>
              Workspace
            </Typography>
          ) : null}
          <List dense disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {sideDockItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={item.href}
                  sx={{
                    px: open ? 1.5 : 0,
                    py: open ? 1.25 : 1.1,
                    borderRadius: 3.5,
                    justifyContent: open ? 'flex-start' : 'center',
                    bgcolor: item.active ? 'rgba(69, 192, 199, 0.12)' : 'transparent',
                    border: '1px solid',
                    borderColor: item.active ? 'rgba(69, 192, 199, 0.18)' : 'transparent',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: open ? 40 : 'auto',
                      mr: open ? 0.5 : 0,
                      color: item.active ? 'primary.main' : 'text.secondary',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open ? (
                    <ListItemText
                      primary={item.label}
                      secondary={item.caption}
                      primaryTypographyProps={{ fontWeight: item.active ? 700 : 500 }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  ) : null}
                  {open ? (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: item.active ? 'primary.main' : 'rgba(255,255,255,0.18)',
                      }}
                    />
                  ) : null}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ flexGrow: 1 }} />

          <Divider sx={{ my: 1.5 }} />

        
        </Drawer>

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            pt: { xs: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            width: { lg: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)` },
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
            <Stack spacing={3.5}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2.5,
                  alignItems: 'stretch',
                }}
              >
                <Box sx={{ flex: '2 1 560px', minWidth: 0 }}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      borderRadius: 8,
                      borderColor: 'rgba(111, 219, 215, 0.16)',
                      background:
                        'radial-gradient(circle at top left, rgba(26, 150, 158, 0.25), transparent 26%), linear-gradient(135deg, rgba(8, 14, 20, 0.98) 0%, rgba(12, 24, 30, 0.98) 100%)',
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Stack spacing={2.5}>
                        <Chip
                          label="AI Health Console"
                          sx={{
                            width: 'fit-content',
                            color: 'common.white',
                            borderColor: 'rgba(255,255,255,0.16)',
                            bgcolor: 'rgba(255,255,255,0.05)',
                          }}
                          variant="outlined"
                        />
                        <Typography component="h1" variant="h3" sx={{ fontWeight: 900, maxWidth: 760 }}>
                          Build plans manually. Reveal them when ready. Upgrade them with AI when useful.
                        </Typography>
                        <Typography sx={{ maxWidth: 700, color: 'rgba(255,255,255,0.68)', fontSize: '1.05rem' }}>
                          The dashboard is now centered on two focused systems: training and nutrition. Enter the essentials, preview the structure, then generate smarter plans only when you want them.
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
                <Box
                  sx={{
                    flex: '1 1 320px',
                    minWidth: { xs: '100%', lg: 320 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2.5,
                  }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 7,
                      bgcolor: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.08)',
                    }}
                  >
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="overline" color="text.secondary">
                          Active Profile
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>
                          {props.user?.name || 'User'}
                        </Typography>
                        <Typography color="text.secondary">
                          Manual-first planning with reveal-on-demand previews.
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 7,
                      bgcolor: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.08)',
                    }}
                  >
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="overline" color="text.secondary">
                          Live Status
                        </Typography>
                        <Typography>
                          Workout: {isWorkoutPlanVisible ? (workoutPlan.source === 'ai' ? 'AI-generated' : 'Manual') : 'Hidden'}
                        </Typography>
                        <Typography>
                          Diet: {isDietPlanVisible ? (currentDietPlan.source === 'ai' ? 'AI-generated' : 'Manual') : 'Hidden'}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2.5,
                }}
              >
                {overviewCards.map((card) => (
                  <Box key={card.title} sx={{ flex: '1 1 220px', minWidth: { xs: '100%', sm: 220 } }}>
                    <Card
                      variant="outlined"
                      sx={{
                        height: '100%',
                        borderRadius: 6,
                        bgcolor: 'rgba(255,255,255,0.035)',
                        borderColor: 'rgba(255,255,255,0.08)',
                      }}
                    >
                      <CardContent>
                        <Stack spacing={1.5}>
                          <Box
                            sx={{
                              width: 44,
                              height: 44,
                              display: 'grid',
                              placeItems: 'center',
                              borderRadius: 3,
                              bgcolor: 'rgba(255,255,255,0.05)',
                            }}
                          >
                            {card.icon}
                          </Box>
                          <Typography variant="overline" color="text.secondary">
                            {card.title}
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 800 }}>
                            {card.value}
                          </Typography>
                          <Typography color="text.secondary">{card.detail}</Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>

              {(workoutError || dietError) && (
                <Alert severity="info" sx={{ borderRadius: 4 }}>
                  Existing manual content stays visible whenever AI generation fails.
                </Alert>
              )}

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 3,
                  alignItems: 'stretch',
                }}
              >
                <Box sx={{ flex: '1 1 520px', minWidth: 0 }}>
                  <WorkoutSystemCard
                    values={workout}
                    displayPlan={workoutPlan}
                    onChange={setWorkout}
                    onShowPlan={showWorkoutPlan}
                    onGenerate={handleGenerateWorkout}
                    loading={workoutLoading}
                    error={workoutError}
                    isPlanVisible={isWorkoutPlanVisible}
                    canShowPlan={canShowWorkoutPlan}
                  />
                </Box>
                <Box sx={{ flex: '1 1 520px', minWidth: 0 }}>
                  <DietSystemCard
                    values={dietPlan}
                    displayPlan={currentDietPlan}
                    onChange={setDietPlan}
                    onShowPlan={showDietPlan}
                    onGenerate={handleGenerateDietPlan}
                    loading={dietLoading}
                    error={dietError}
                    isPlanVisible={isDietPlanVisible}
                    canShowPlan={canShowDietPlan}
                  />
                </Box>
              </Box>
            </Stack>
          </Container>
        <Divider />
      </Box>
      </Box>
    </AppTheme>
  );
}
