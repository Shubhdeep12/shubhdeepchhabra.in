import { createStitches, } from '@stitches/react';
import type { CSS } from '@stitches/react';

const systemFont =
  // eslint-disable-next-line max-len
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const {
  config,
  styled, 
  getCssText, 
  createTheme, 
  globalCss,
  keyframes,
} = createStitches({
  theme: {
    fonts: {
      system: systemFont
    },
    sizes: {
      'max-page-width': '666px',
    },
    colors: {
      text: 'black',
      background: 'white'
    },
    fontSizes: {
      1: '13px',
      2: '15px',
      3: '17px',
    },
  },
});

export const darkTheme = createTheme({
    fonts: {
      system: systemFont
    },
    colors: {
      text: 'white',
      background: 'black'
    },
    fontSizes: {
      1: '13px',
      2: '15px',
      3: '17px',
    },
})

export const globalStyles = globalCss({
  'html, body': {
    padding: '0',
    margin: '0',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    background: "$color$background", 
    color: "$colors$text"
  },
  
  'a': {
    textDecoration: 'none',
  },
  
  '*': {
    boxSizing: 'border-box',
  },
  
  '#root, #__next': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    maxWidth: 'var(--sizes-max-page-width, 960px)',
    margin: '0 auto',
    $$navbarHeight: '60px',
  }
  
})


export type StitchesCSS = CSS<typeof config>;