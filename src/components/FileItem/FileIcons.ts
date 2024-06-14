// src/fileIcons.ts

import defaultIcon from '../../assets/images/icons/code.png';
import jsIcon from '../../assets/images/icons/js.png';
import tsIcon from '../../assets/images/icons/typescript.png';
import tsxIcon from '../../assets/images/icons/react.svg';
import cssIcon from '../../assets/images/icons/css.svg';
import svgIcon from '../../assets/images/icons/svg-icon.png';
import htmlIcon from '../../assets/images/icons/html5.png';
import jsonIcon from '../../assets/images/icons/n-64.png';
import gitIcon from '../../assets/images/icons/git.svg';

const fileIcons: { [key: string]: string } = {
  'js': jsIcon,
  'ts': tsIcon,
  'tsx':tsxIcon,
  'css': cssIcon,
  'svg': svgIcon,
  'html': htmlIcon,
  'json': jsonIcon,
  'cjs' : jsIcon,
  '.gitignore': gitIcon,

};

export const getFileIcon = (fileName: string): string => {
  // Checking for dotfiles
  if (fileIcons[fileName]) {
    return fileIcons[fileName];
  }

 // Checking for extensions
  const extension = fileName.split('.').pop();
  return extension && fileIcons[extension] ? fileIcons[extension] : defaultIcon;
};
