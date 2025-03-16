
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { auth } from '../../auth';
import Box from '@mui/material/Box';
import { Avatar, Card, CardActionArea, CardContent, Grid } from '@mui/material';
import { AdminPanelSettingsRounded, EditCalendarRounded, InfoOutlined, InfoRounded, ReceiptLongRounded, VerifiedUserRounded, WorkHistoryOutlined } from '@mui/icons-material';
import theme from '@/theme';
import Link from 'next/link';

export default async function HomePage() {
  const session = await auth();

  const user = {
    name: session?.user?.name,
    role: session?.user?.id, // Example role/status
    avatar: session?.user?.image, // Placeholder image URL for avatar (replace with actual image or dynamic URL)
  };
  const cards = [
    { title: "Calendar", route: "/calendar", icon: <EditCalendarRounded /> },
    { title: "Work Site Info", route: "/worksiteinfo", icon: <InfoRounded /> },
    { title: "Profile", route: "/profile", icon: <VerifiedUserRounded /> },
  ];
  
  return (
    <Box sx={{ flexGrow: 1, p: 4, bgcolor: "background.default" }}>
        {/* Enhanced Welcome Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mb: 2,
            p: 2,
            bgcolor: "background.paper", // Light background for contrast
            borderRadius: 2,
            boxShadow: 1, // Subtle shadow for depth
          }}
        >
          <Avatar
            src={user.avatar || "Hey"}
            alt={user.name || "Hey"}
            sx={{ width: 60, height: 60 }}
          />
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "text.primary", fontWeight: "bold" }}
            >
              Welcome, {user.name}!
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", mt: 0.5 }}
            >
              {user.role} | Roroman Plumbing {/* Example status/details */}
            </Typography>
          </Box>
        </Box>

      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} key={card.title}>
            <Card
              sx={{
                height: 140,
                borderRadius: 3, // Rounded corners
                boxShadow: 3, // Soft shadow for depth
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth transition
                "&:hover": {
                  transform: "translateY(-5px)", // Slight lift on hover
                  boxShadow: 6, // Stronger shadow on hover
                },
              }}
            >
              <Link href={card.route} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardActionArea
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    {React.cloneElement(card.icon, {
                      sx: {
                        fontSize: 60,
                        mb: 2,
                        
                      },
                    })}
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontWeight: "medium",
                    
                      }}
                    >
                      {card.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

