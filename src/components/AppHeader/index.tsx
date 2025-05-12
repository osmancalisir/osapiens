import {
  Grow,
  Box,
  Theme,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../api/services/User/store";
import AvatarMenu from "../AvatarMenu";

interface AppBarProps extends MuiAppBarProps {
  theme?: Theme;
}

interface AppHeaderProps {
  user: User;
  pageTitle: string;
}

const typoStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  lineHeight: 1,
};

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  height: theme.tokens.header.height,
}));

const AppHeader = React.forwardRef<HTMLDivElement, AppHeaderProps>(
  (props, ref) => {
    const { user, pageTitle } = props;
    const { t } = useTranslation("app");
    const theme = useTheme();
    const { i18n } = useTranslation();

    // const [count, setCount] = useState(0);
    const [count, setCount] = useState(() => {
      const savedCount = localStorage.getItem("countdown");
      return savedCount ? parseInt(savedCount, 10) : 0;
    });

    const hours = 1;
    const minutes = hours * 60;
    const seconds = minutes * 60;
    const countdown = seconds - count;
    const countdownMinutes = `${~~(countdown / 60)}`.padStart(2, "0");
    const countdownSeconds = (countdown % 60).toFixed(0).padStart(2, "0");

    useEffect(() => {
      localStorage.setItem("countdown", count.toString());
    });

    useEffect(() => {
      const interval = setInterval(() => {
        setCount((c) => {
          if (c >= seconds) {
            localStorage.removeItem("countdown");
            return 0;
          }
          return c + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }, [seconds]);

    const handleLanguageChange = (lang: string) => {
      i18n.changeLanguage(lang);
      localStorage.setItem("selectedLanguage", lang);
    };

    return (
      <AppBar ref={ref} position="fixed" sx={{ width: "100vw" }}>
        <Toolbar sx={{ background: "#08140C 0% 0% no-repeat padding-box" }}>
          <Box sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
            <Box>
              <Typography variant="h6" component="div" color="primary">
                {countdownMinutes}:{countdownSeconds}
              </Typography>
            </Box>
            <Box sx={{ width: 20, height: 20, flex: 1 }} />
            <Box sx={{ flex: 2 }}>
              <Typography
                sx={{
                  ...typoStyle,
                  color: theme.palette.primary.main,
                  mb: theme.spacing(0.5),
                }}
                variant="h6"
                component="div"
              >
                {t("appTitle").toLocaleUpperCase()}
              </Typography>
              <Typography
                sx={{ ...typoStyle }}
                variant="overline"
                component="div"
                noWrap
              >
                {pageTitle.toLocaleUpperCase()}
              </Typography>
            </Box>
            <Select
              value={i18n.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              sx={{ color: "white" }}
            >
              <MenuItem value="en">🇬🇧</MenuItem>
              <MenuItem value="de">🇩🇪</MenuItem>
            </Select>
            <Box sx={{ flex: 1, justifyContent: "flex-end", display: "flex" }}>
              {user && user.eMail && (
                <Grow in={Boolean(user && user.eMail)}>
                  <div>
                    <AvatarMenu user={user} />
                  </div>
                </Grow>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
);

export default AppHeader;
