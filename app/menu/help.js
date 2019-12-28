import { shell } from "electron";

const subMenu = {
  label: 'Help',
  submenu: [
    {
      label: 'Learn More',
      click() {
        shell.openExternal('http://electron.atom.io');
      }
    },
    {
      label: 'Documentation',
      click() {
        shell.openExternal(
          'https://github.com/atom/electron/tree/master/docs#readme'
        );
      }
    },
    {
      label: 'Community Discussions',
      click() {
        shell.openExternal('https://discuss.atom.io/c/electron');
      }
    },
    {
      label: 'Search Issues',
      click() {
        shell.openExternal('https://github.com/atom/electron/issues');
      }
    }
  ]
};

const help = {
  subMenu,

}
