"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SideBarTreeNode;

var _react = _interopRequireDefault(require("react"));

var _fa = require("react-icons/fa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const OFFSET = 16;

function SideBarTreeNode(_ref) {
  let {
    node,
    labels,
    structure,
    currentPath,
    setCurrentPath,
    collapsed,
    setCollapsed,
    level
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "SideBar-TreeNode"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: 'TreeNode-Name' + (currentPath === node.path ? ' TreeNode-Current' : ''),
    onClick: () => {
      if (currentPath === node.path) {
        setCollapsed(_objectSpread(_objectSpread({}, collapsed), {}, {
          [node.path]: !collapsed[node.path]
        }));
      } else {
        setCollapsed(_objectSpread(_objectSpread({}, collapsed), {}, {
          [node.path]: false
        }));
      }

      setCurrentPath(node.path);
    },
    style: {
      paddingLeft: 8 + (level || 0) * OFFSET + 'px'
    }
  }, !collapsed[node.path] && structure[node.path] ? /*#__PURE__*/_react.default.createElement(_fa.FaFolderOpen, null) : /*#__PURE__*/_react.default.createElement(_fa.FaFolder, null), " ", node.name || labels['root']), !!node.children && !!node.children.length && !collapsed[node.path] && /*#__PURE__*/_react.default.createElement("div", {
    className: "TreeNode-Children"
  }, node.children.map((item, index) => {
    return /*#__PURE__*/_react.default.createElement(SideBarTreeNode, {
      key: index,
      node: item,
      labels: labels,
      level: (level || 0) + 1,
      currentPath: currentPath,
      setCurrentPath: setCurrentPath,
      collapsed: collapsed,
      setCollapsed: setCollapsed,
      structure: structure
    });
  })));
}