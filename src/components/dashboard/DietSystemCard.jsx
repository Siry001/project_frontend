import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

function PlanSection({ title, items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Stack spacing={1}>
        {items.map((item) => (
          <Box
            key={`${title}-${item}`}
            sx={{
              px: 1.5,
              py: 1.25,
              borderRadius: 2,
              bgcolor: 'background.default',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body2">{item}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default function DietSystemCard({
  values,
  displayPlan,
  onChange,
  onShowPlan,
  onGenerate,
  loading,
  error,
  isPlanVisible,
  canShowPlan,
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        borderRadius: 7,
        overflow: 'hidden',
        borderColor: 'rgba(255, 182, 92, 0.24)',
        background:
          'linear-gradient(180deg, rgba(234, 151, 59, 0.22) 0%, rgba(24, 16, 7, 0.97) 34%, rgba(24, 16, 7, 1) 100%)',
        boxShadow: '0 24px 60px rgba(10, 6, 2, 0.34)',
      }}
    >
      {loading ? <LinearProgress color="secondary" /> : null}
      <CardContent sx={{ p: 0 }}>
        <Stack spacing={0}>
          <Box
            sx={{
              px: { xs: 2.5, md: 3.5 },
              pt: { xs: 2.25, md: 2.75 },
              pb: 2,
              borderBottom: '1px solid',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <Stack spacing={1.5}>
              <Box>
                <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 0.75 }}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 3,
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: 'rgba(255, 182, 92, 0.16)',
                      color: 'secondary.main',
                    }}
                  >
                    <RestaurantMenuRoundedIcon />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Diet System
                  </Typography>
                </Stack>
                <Typography color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.45 }}>
                  Track nutrition targets manually and generate a smarter meal plan with AI.
                </Typography>
              </Box>

              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={1.25}
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', md: 'center' }}
              >
                <Box sx={{ minHeight: 32, display: 'flex', alignItems: 'center' }}>
                  {isPlanVisible ? (
                    <Chip
                      label={displayPlan.source === 'ai' ? 'AI-generated' : 'Manual'}
                      color={displayPlan.source === 'ai' ? 'secondary' : 'default'}
                      variant={displayPlan.source === 'ai' ? 'filled' : 'outlined'}
                    />
                  ) : (
                    <Box />
                  )}
                </Box>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1}
                  alignItems={{ xs: 'stretch', sm: 'center' }}
                  sx={{ width: { xs: '100%', md: 'auto' } }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onShowPlan}
                    disabled={!canShowPlan || loading}
                    sx={{
                      borderRadius: 999,
                      px: 2.25,
                      minWidth: 156,
                      whiteSpace: 'nowrap',
                      '&.Mui-disabled': {
                        color: 'rgba(255,255,255,0.28)',
                        borderColor: 'rgba(255,255,255,0.08)',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    Show Preview
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={onGenerate}
                    disabled={!canShowPlan || loading}
                    startIcon={<AutoAwesomeRoundedIcon />}
                    sx={{
                      borderRadius: 999,
                      px: 2.25,
                      minWidth: 170,
                      whiteSpace: 'nowrap',
                      '&.Mui-disabled': {
                        color: 'rgba(255,255,255,0.38)',
                        bgcolor: 'rgba(255,255,255,0.08)',
                      },
                    }}
                  >
                    Generate AI Plan
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>

          <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: { xs: 2.5, md: 3.5 } }}>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={0.75}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
              >
                <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.5 }}>
                  Manual Input
                </Typography>
                {!canShowPlan ? (
                  <Typography variant="caption" color="text.secondary">
                    Add goal, calories, and meals to enable preview and AI generation.
                  </Typography>
                ) : null}
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2.25,
                }}
              >
                <Box sx={{ flex: '1 1 280px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Nutrition Goal"
                    value={values.goal}
                    onChange={(event) => onChange({ goal: event.target.value })}
                    placeholder="Lean bulk, fat loss, maintenance..."
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box sx={{ flex: '0 1 150px', minWidth: { xs: '100%', sm: 140 } }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Calories / Day"
                    value={values.calories}
                    onChange={(event) => onChange({ calories: event.target.value })}
                    placeholder="2200"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box sx={{ flex: '0 1 150px', minWidth: { xs: '100%', sm: 140 } }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Meals / Day"
                    value={values.meals}
                    onChange={(event) => onChange({ meals: event.target.value })}
                    placeholder="4"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              </Box>
              <Box>
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  minRows={3}
                  label="Food Preferences & Notes"
                  value={values.notes}
                  onChange={(event) => onChange({ notes: event.target.value })}
                  placeholder="Protein focus, allergies, cuisine preferences, budget..."
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiInputBase-root': {
                      alignItems: 'flex-start',
                      pt: 1,
                    },
                    '& .MuiInputBase-inputMultiline::placeholder': {
                      opacity: 0.72,
                    },
                  }}
                />
              </Box>
            </Stack>

            {error ? <Alert severity="error" sx={{ mt: 2.25 }}>{error}</Alert> : null}

            {isPlanVisible ? (
              <Box
                sx={{
                  mt: 3,
                  p: { xs: 2, md: 2.5 },
                  borderRadius: 5,
                  bgcolor: 'rgba(31, 21, 9, 0.88)',
                  border: '1px solid',
                  borderColor: 'rgba(255, 182, 92, 0.18)',
                }}
              >
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Current Plan
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {displayPlan.headline}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {displayPlan.description}
                    </Typography>
                  </Box>

                  {displayPlan.sections.map((section) => (
                    <PlanSection key={section.title} title={section.title} items={section.items} />
                  ))}
                </Stack>
              </Box>
            ) : null}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
