"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SideBar;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireDefault(require("react"));

var _SideBarTreeNode = _interopRequireDefault(require("./SideBarTreeNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SideBar(_ref) {
  let {
    structure,
    currentPath,
    setCurrentPath,
    collapsed,
    setCollapsed,
    labels
  } = _ref;
  const tree = [];
  const nodesByPath = {};
  Object.keys(structure || {}).forEach(path => {
    const parts = path.split('/');
    let tmpPath = '';
    let childNodes = tree;
    parts.forEach((part, index) => {
      tmpPath += (index > 0 ? '/' : '') + part;

      if (!nodesByPath[tmpPath]) {
        const node = {
          name: part,
          path: tmpPath,
          children: []
        };
        childNodes.push(node);
        nodesByPath[tmpPath] = node;
      }

      childNodes = nodesByPath[tmpPath].children;

      if (index === parts.length - 1) {
        const children = (structure[tmpPath] || []).filter(item => item.type === 2).map(item => ({
          name: item.name,
          path: tmpPath + '/' + item.name,
          children: []
        }));
        children.forEach(item => {
          if (!childNodes.find(node => node.name === item.name)) {
            childNodes.push(item);
            nodesByPath[tmpPath + '/' + item.name] = item;
          }
        });
      }
    });
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "FileManager-SideBar"
  }, /*#__PURE__*/_react.default.createElement(_SideBarTreeNode.default, {
    node: tree[0] || {},
    labels: labels,
    structure: structure,
    currentPath: currentPath,
    setCurrentPath: setCurrentPath,
    collapsed: collapsed,
    setCollapsed: setCollapsed
  }));
}