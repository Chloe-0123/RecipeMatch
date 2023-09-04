import { createTheme  } from '@mui/material/styles';


const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const colortheme = createTheme({
  palette: {
    black: createColor('#000000'),
    green: createColor('#C4C1A4'),
    orange: createColor('#FFC6AC'),
    yellow: createColor('#FFF6DC'),
    grey: createColor('#9E9FA5'),
    white: createColor('#FFFFFF')
  },

});

export default colortheme