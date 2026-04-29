import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import PersonIcon from "@mui/icons-material/Person";

import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

import { useAuth } from "../../Contexts/customHooks";

// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";

export default function SideBar() {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const drawerWidth = 250;
  const collapsedWidth = 72;
  const sideDockItems = [
    {
      label: "Dashboard",
      caption: "Overview",
      icon: <SpaceDashboardRoundedIcon fontSize="small" />,
      active: true,
      href: "/dashboard",
    },
    {
      label: "Workout",
      icon: <FitnessCenterRoundedIcon fontSize="small" />,
      active: false,
      href: "/dashboard",
    },
    {
      label: "Nutrition",
      icon: <RestaurantMenuRoundedIcon fontSize="small" />,
      active: false,
      href: "/dashboard",
    },
    {
      label: "Landing Page",
      caption: "Back to home",
      icon: <HomeRoundedIcon fontSize="small" />,
      active: false,
      href: "/",
    },
    {
      label: "Account",
      caption: "Preferences",
      icon: <SettingsIcon fontSize="small" />,
      active: false,
      href: "/dashboard",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        display: { xs: "none", lg: "block" },
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: "border-box",
          pt: 2,
          px: open ? 2 : 0.75,
          bgcolor: "rgba(10, 15, 22, 0.94)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid",
          borderColor: "rgba(255,255,255,0.08)",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {/* Toggle Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          mb: 2.5,
          px: open ? 0.5 : 0,
        }}
      >
        {open ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              px: 1.25,
              py: 1,
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                letterSpacing: 2,
                color: "text.secondary",
                display: "block",
                lineHeight: 1.1,
              }}
            >
              Gymtracker AI
            </Typography>
          </Box>
        ) : null}
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            border: "1px solid rgba(255,255,255,0.08)",
            bgcolor: "rgba(255,255,255,0.03)",
            borderRadius: 3,
          }}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* User Info Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: open ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          mb: 2.5,
          px: open ? 1.5 : 0.5,
          py: open ? 3 : 1.25,
          borderRadius: 6,
          bgcolor: open ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Avatar
          sx={{
            width: open ? 80 : 42,
            height: open ? 80 : 42,
            mb: open ? 2 : 0,
            bgcolor: "primary.main",
            color: "#061014",
            boxShadow: "0 16px 40px rgba(76, 201, 194, 0.3)",
            transition: theme.transitions.create(
              ["width", "height", "margin"],
              {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              },
            ),
          }}
        >
          <PersonIcon sx={{ fontSize: open ? 40 : 22 }} />
        </Avatar>
        {open && (
          <>
            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
              {user.name || "User"}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Intermediate athlete
            </Typography>
            <Chip
              size="small"
              label={user.name.isFilled ? "Ready to Track" : "Ready to plan"} // this needs to be dynamic based on whether the user has filled in their details or not
              sx={{
                mt: 1.5,
                bgcolor: "rgba(69, 192, 199, 0.12)",
                color: "primary.main",
                border: "1px solid rgba(69, 192, 199, 0.18)",
              }}
            />
          </>
        )}
      </Box>

      <Divider sx={{ my: 1.5 }} />

      {open ? (
        <Typography
          variant="overline"
          sx={{
            color: "text.secondary",
            fontWeight: "bold",
            mb: 1,
            display: "block",
            px: 1,
          }}
        >
          Workspace
        </Typography>
      ) : null}
      <List
        dense
        disablePadding
        sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}
      >
        {sideDockItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.href}
              sx={{
                px: open ? 1.5 : 0,
                py: open ? 1.25 : 1.1,
                borderRadius: 3.5,
                justifyContent: open ? "flex-start" : "center",
                bgcolor: item.active
                  ? "rgba(69, 192, 199, 0.12)"
                  : "transparent",
                border: "1px solid",
                borderColor: item.active
                  ? "rgba(69, 192, 199, 0.18)"
                  : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: open ? 40 : "auto",
                  mr: open ? 0.5 : 0,
                  color: item.active ? "primary.main" : "text.secondary",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open ? (
                <ListItemText
                  primary={item.label}
                  secondary={item.caption}
                  primaryTypographyProps={{
                    fontWeight: item.active ? 700 : 500,
                  }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />
              ) : null}
              {open ? (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: item.active
                      ? "primary.main"
                      : "rgba(255,255,255,0.18)",
                  }}
                />
              ) : null}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ my: 1.5 }} />

      <Button
        variant="contained"
        color="secondary"
        onClick={logout}
        sx={{
          borderRadius: 999,
          px: 2.25,
          minWidth: 170,
          whiteSpace: "nowrap",
          "&.Mui-disabled": {
            color: "rgba(255,255,255,0.38)",
            bgcolor: "rgba(255,255,255,0.08)",
          },
        }}
      >
        Log Out
      </Button>
    </Drawer>
  );
}
