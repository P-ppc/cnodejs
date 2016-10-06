"use strict";

window.nodeRequire = require;

const electron = nodeRequire('electron');
const remote = electron.remote;
const Menu = remote.Menu;

var template = [
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            },
            {
                label: '重做',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: '剪切',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            },
            {
                label: '复制',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: '粘贴',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            },
            {
                label: '全选',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall'
            }
        ]
    },
    {
        label: '窗口',
        role: 'window',
        submenu: [
            {
                label: '最小化',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: '关闭窗口',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
            {
                label: '调试模式',
                accelerator: 'Option+CmdOrCtrl+I',
                click: function () {
                    remote.getCurrentWindow().webContents.toggleDevTools();
                }
            }
        ]
    },
    {
        label: '帮助',
        role: 'help',
        submenu: [
            {
                label: '建议 或 反馈…',
                click: function () {
                    electron.shell.openExternal('https://github.com/P-ppc/cnodejs/issues');
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    var name = remote.app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                label: '隐藏 ' + name,
                accelerator: 'Command+H',
                role: 'hide'
            },
            {
                label: '隐藏其他应用',
                accelerator: 'Command+Alt+H',
                role: 'hideothers'
            },
            {
                label: '显示全部',
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                label: '退出',
                accelerator: 'Command+Q',
                click: function () {
                    remote.app.quit();
                }
            }
        ]
    });
} else if(process.platform === 'win32'){
    let helpItem = template[template.length-1];
}

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);