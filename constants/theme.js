const rgbColor = {
  primary: '255, 255, 255',
  secondary: '19, 18, 18'
}

const COLOR = {
  primary: `rgb(${rgbColor.primary})`,
  secondary: `rgb(${rgbColor.secondary})`,
  active: '#FF3B30',
  onPrimary: '#131212',
  onSecondary: '#FFFFFF',
  onActive: '',
  background: '#EFEFF4',

  warning: '#ff0000',

  primaryWithOpacity: (opacity) => `rgba(${rgbColor.primary}, ${opacity})`,
  secondaryWithOpacity: (opacity) => `rgba(${rgbColor.secondary}, ${opacity})`,

  divider: 'rgba(0, 0, 0, 0.4)',
  disable: 'rgba(77, 79, 137, 0.2)',
};

const TEXT_SIZE = {

};

export default {
  COLOR,
  TEXT_SIZE,
}
