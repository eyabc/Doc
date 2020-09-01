const devSidebar = require('./devSidebar');
const util = require('./util.js');

module.exports = {
    title: '삽질하는 개발자',
    description: '',
    themeConfig: {
        nav: [
            { text: 'Todo', link: '/todo' },
            { text: 'Dev', link: '/dev' },
            { text: 'Reads', link: '/reads' },
        ],
        sidebar: {
            '/dev': devSidebar,
            '/todo': [util.getSideBar(
                {
                    folder: '/todo', title: 'todo',
                    reverse: true,
                },
            )],
            '/reads': [util.getSideBar(
                {
                    folder: '/reads', title: '읽을거리',
                },
            )],
        },
    },
    base: '/Doc/',
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'assets/images',
            },
        },
    },
};


