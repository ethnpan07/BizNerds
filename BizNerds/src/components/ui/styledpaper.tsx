import { Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '16px',
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
    position: 'relative',
    zIndex: 2,
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.25)',
    },
  }));

export { StyledPaper };