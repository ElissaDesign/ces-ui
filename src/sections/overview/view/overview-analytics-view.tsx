import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useAnaytics } from 'src/hooks/useAnalytics';

import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsResponseRate } from '../analytics-current-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const { data, isLoading, isError } = useAnaytics();
  const analytics: any = data;

  console.log('data', data, isLoading, isError);


  if (isLoading) {
    return (
      <DashboardContent maxWidth="xl">
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Loading analytics...
        </Typography>
      </DashboardContent>
    );
  }

  if (isError) {
    return (
      <DashboardContent maxWidth="xl">
        <Typography variant="h4" color="error" sx={{ mb: { xs: 3, md: 5 } }}>
          Error loading analytics data
        </Typography>
      </DashboardContent>
    );
  }

  if (!analytics) {
    return (
      <DashboardContent maxWidth="xl">
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          No analytics data available
        </Typography>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Tickets"
            total={analytics?.data?.totalTickets}
            icon={<img alt="Total tickets" src="/assets/icons/glass/noun-ticket-15205.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Complaint Tickets"
            total={analytics?.data?.totalComplaintTickets}
            color="warning"
            icon={<img alt="Purchase orders" src="/assets/icons/glass/noun-ticket-7839308.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Feedback Tickets"
            total={analytics?.data?.totalFeedbackTickets}
            color="error"
            icon={<img alt="Messages" src="/assets/icons/glass/noun-movie-ticket-1714068.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Addressed Tickets"
            total={analytics?.data?.totalAddressedTickets}
            color="secondary"
            icon={<img alt="Total Users" src="/assets/icons/glass/noun-movie-ticket-1807395.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <AnalyticsResponseRate
            title="Response rates"
            chart={{
              series: [
                { label: 'Addressed Tickets', value: analytics?.data?.totalAddressedTickets },
                { label: 'Complaint Tickets', value: analytics?.data?.totalComplaintTickets },
              ],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
