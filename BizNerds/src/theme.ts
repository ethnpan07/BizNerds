export const theme = {
  colors: {
    primary: {
      main: '#98D8AA', // Pastel Green
      light: '#B5E6B5',
      dark: '#7BC77B',
      transparent: 'rgba(152, 216, 170, 0.6)',
    },
    secondary: {
      main: '#F5E6E8', // Pastel Beige
      light: '#F8F0F2',
      dark: '#E8D8DA',
    },
    white: '#FFFFFF',
    black: '#2C3E50',
    text: {
      primary: '#2C3E50',
      secondary: '#4A4A4A',
      light: '#FFFFFF',
    },
    background: {
      gradient: 'radial-gradient(circle_at_center,_rgba(245,230,232,1)_0%,_rgba(152,216,170,0.2)_100%)',
      beige: '#F5E6E8',
    },
  },
  spacing: {
    container: 'px-[5vw] py-[3vh]',
    section: 'gap-[2vw]',
  },
  typography: {
    fontFamily: 'font-sans',
    heading: {
      large: 'text-[4vh]',
      medium: 'text-[3vh]',
      small: 'text-[2vh]',
    },
  },
  borderRadius: {
    large: 'rounded-3xl',
    medium: 'rounded-2xl',
    small: 'rounded-xl',
  },
  shadows: {
    card: 'shadow-[0_10px_30px_rgba(0,0,0,0.1)]',
  },
  transitions: {
    default: 'transition-all duration-300',
  },
} 