import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useColorScheme } from '@mui/material/styles';

const userTestimonials = [
  {
    avatar: <Avatar alt="Alex Rivera" src="/static/images/avatar/1.jpg" />,
    name: 'Alex Rivera',
    occupation: 'Personal Trainer',
    testimonial:
      "GymTracker AI transformed my coaching — automated form analysis and personalized plans save me hours and help clients hit PRs safely.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: 'Travis Howard',
    occupation: 'Competitive Athlete',
    testimonial:
      "The adaptive training plans and progress predictions keep me on track. Syncing with my wearable makes recovery insights and nutrition suggestions effortless.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: 'Cindy Baker',
    occupation: 'Fitness Enthusiast',
    testimonial:
      "Logging workouts is simple, and the on-device AI feedback on form helped me fix bad habits and avoid injury.",
  },
  {
    avatar: <Avatar alt="Julia Stewart" src="/static/images/avatar/4.jpg" />,
    name: 'Julia Stewart',
    occupation: 'Strength Coach',
    testimonial:
      "I rely on GymTracker AI to generate tailored plans for clients — the nutrition and recovery guidance make it a full coaching tool.",
  },
  {
    avatar: <Avatar alt="John Smith" src="/static/images/avatar/5.jpg" />,
    name: 'John Smith',
    occupation: 'Nutritionist',
    testimonial:
      "The app's nutrition suggestions are practical and personalized, which helps clients hit macronutrient targets alongside their training.",
  },
  {
    avatar: <Avatar alt="Daniel Wolf" src="/static/images/avatar/6.jpg" />,
    name: 'Daniel Wolf',
    occupation: 'Physical Therapist',
    testimonial:
      "Form analysis and recovery insights helped one of my patients rehab faster with safer progressions.",
  },
];


export default function Testimonials() {

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Testimonials
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Hear from GymTracker AI users—trainers and athletes who boosted performance
          with AI-driven workout logging, personalized training plans, form analysis and
          nutrition guidance.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
