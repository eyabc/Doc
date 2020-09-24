const fs = require('fs');
const path = require('path');

const getSideBar = ({ folder, title, reverse }) => {
    const files = [];
    fs.readdirSync(path.join(`${ __dirname }/../${ folder }`))
        .forEach(item => {
            if (item.toLowerCase() !== 'readme.md' &&
                fs.statSync(path.join(`${ __dirname }/../${ folder }`, item)).isFile())
                files.push({
                    title: item.replace('.md', ''),
                    path: `${ folder }/${ item }`,
                });
        });
    if (reverse) files.reverse();
    return { title: title, children: files, sidebarDepth: 4 };
};

const makeDoc = (root) => (v, k) => {
    if (typeof v === 'string') {
        return {
            title: `${ k }. ${ v }`,
            path: `${ root }/${ v }`,
        };
    }
    return v.reduce((obj, w, i) => {
        if (i === 0) {
            obj.title = `${ k }. ${ w }`;
            obj.children = [];
            return obj;
        }
        obj.children.push({
            title: `${ w }`,
            path: `${ root }/${ w }`,
        });

        return obj
    }, {});
};

module.exports = { getSideBar, makeDoc };