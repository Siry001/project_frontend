import * as React from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Stack from "@mui/material/Stack";

import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

import AppTheme from "../shared-theme/AppTheme";

import { useAuth } from "../Contexts/customHooks";

import SideBar from "../components/dashboard/SideBar";

import { Outlet, useOutlet } from "react-router";

const initialWorkout = {
  goal: "",
  daysPerWeek: "",
  sessionLength: "",
  notes: "",
};

function toSentenceCase(text) {
  return text
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function valueToItems(value) {
  if (value == null) {
    return [];
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry) => valueToItems(entry));
  }

  if (typeof value === "object") {
    return Object.entries(value).map(
      ([key, entry]) => `${toSentenceCase(key)}: ${String(entry)}`,
    );
  }

  return [];
}



export default function Dashboard(props) {
  const isOutlet = useOutlet();
  const content = props.content;
  const drawerWidth = 280;
  const collapsedWidth = 72;
  const [open, setOpen] = React.useState(true);

  const theme = useTheme();

  const { user } = useAuth();


  // const overviewCards = [
  //   {
  //     title: "Workout cadence",
  //     value: workout.daysPerWeek ? `${workout.daysPerWeek} days` : "Not set",
  //     detail:
  //       workoutSource === "ai" ? "AI plan active" : "Manual setup in progress",
  //     icon: <FitnessCenterRoundedIcon color="primary" />,
  //   },
  //   {
  //     title: "Daily nutrition",
  //     value: dietPlan.calories ? `${dietPlan.calories} kcal` : "Not set",
  //     detail:
  //       dietSource === "ai"
  //         ? "AI meal plan active"
  //         : "Manual setup in progress",
  //     icon: <RestaurantMenuRoundedIcon color="secondary" />,
  //   },
  //   {
  //     title: "Visibility",
  //     value: `${(isWorkoutPlanVisible ? 1 : 0) + (isDietPlanVisible ? 1 : 0)}`,
  //     detail: "Plans revealed in the workspace",
  //     icon: <AutoAwesomeRoundedIcon color="action" />,
  //   },
  //   {
  //     title: "Live Status",
  //     value:
  //       workoutPlan.source === "ai" && dietSource === "ai"
  //         ? "AI-driven"
  //         : "Manual",
  //     detail:
  //       workoutPlan.source === "ai" && dietSource === "ai"
  //         ? "Both plans AI-generated"
  //         : "Manual content still active",
  //     icon: <PersonIcon color="disabled" />,
  //   },
  // ];

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <SideBar />
        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            pt: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            width: {
              lg: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`,
            },
            background:
              "radial-gradient(circle at top left, rgba(30, 119, 126, 0.16), transparent 22%), radial-gradient(circle at top right, rgba(234, 151, 59, 0.12), transparent 24%), #070b11",
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          {isOutlet ? (
            <Outlet />
          ) : (
            <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
              <Stack spacing={3.5}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2.5,
                    alignItems: "stretch",
                  }}
                >
                  <Box sx={{ flex: "2 1 560px", minWidth: 0 }}>
                    <Card
                      variant="outlined"
                      sx={{
                        height: "100%",
                        borderRadius: 8,
                        borderColor: "rgba(111, 219, 215, 0.16)",
                        background:
                          "radial-gradient(circle at top left, rgba(26, 150, 158, 0.25), transparent 26%), linear-gradient(135deg, rgba(8, 14, 20, 0.98) 0%, rgba(12, 24, 30, 0.98) 100%)",
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Stack spacing={2.5}>
                          <Chip
                            label="AI Health Console"
                            sx={{
                              width: "fit-content",
                              color: "common.white",
                              borderColor: "rgba(255,255,255,0.16)",
                              bgcolor: "rgba(255,255,255,0.05)",
                            }}
                            variant="outlined"
                          />
                          <Typography
                            component="h1"
                            variant="h3"
                            sx={{ fontWeight: 900, maxWidth: 760 }}
                          >
                            Build plans manually. Reveal them when ready.
                            Upgrade them with AI when useful.
                          </Typography>
                          <Typography
                            sx={{
                              maxWidth: 700,
                              color: "rgba(255,255,255,0.68)",
                              fontSize: "1.05rem",
                            }}
                          >
                            The dashboard is now centered on two focused
                            systems: training and nutrition. Enter the
                            essentials, preview the structure, then generate
                            smarter plans only when you want them.
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box
                    sx={{
                      flex: "1 1 320px",
                      minWidth: { xs: "100%", lg: 320 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 2.5,
                    }}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 7,
                        bgcolor: "rgba(255,255,255,0.04)",
                        borderColor: "rgba(255,255,255,0.08)",
                      }}
                    >
                      <CardContent>
                        <Stack spacing={1}>
                          <Typography variant="overline" color="text.secondary">
                            Active Profile
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 800 }}>
                            {user.name || "User"}
                          </Typography>
                          <Typography color="text.secondary">
                            Manual-first planning with reveal-on-demand
                            previews.
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 7,
                        bgcolor: "rgba(255,255,255,0.04)",
                        borderColor: "rgba(255,255,255,0.08)",
                      }}
                    ></Card>
                  </Box>
                </Box>

                {/* <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2.5,
                }}
              >
                {overviewCards.map((card) => (
                  <Box
                    key={card.title}
                    sx={{
                      flex: "1 1 220px",
                      minWidth: { xs: "100%", sm: 220 },
                    }}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        height: "100%",
                        borderRadius: 6,
                        bgcolor: "rgba(255,255,255,0.035)",
                        borderColor: "rgba(255,255,255,0.08)",
                      }}
                    >
                      <CardContent>
                        <Stack spacing={1.5}>
                          <Box
                            sx={{
                              width: 44,
                              height: 44,
                              display: "grid",
                              placeItems: "center",
                              borderRadius: 3,
                              bgcolor: "rgba(255,255,255,0.05)",
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
                          <Typography color="text.secondary">
                            {card.detail}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box> */}

                {/* {(workoutError || dietError) && (
                  <Alert severity="info" sx={{ borderRadius: 4 }}>
                    Existing manual content stays visible whenever AI generation
                    fails.
                  </Alert>
                )} */}
              </Stack>
            </Container>
          )}
          <Divider />
        </Box>
      </Box>
    </AppTheme>
  );
}
