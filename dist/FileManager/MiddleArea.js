"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MiddleArea;

var _react = _interopRequireDefault(require("react"));

var _SideBar = _interopRequireDefault(require("./SideBar"));

var _Body = _interopRequireDefault(require("./Body"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MiddleArea(_ref) {
  let {
    collapsed,
    setCollapsed,
    structure,
    currentPath,
    setCurrentPath,
    openFile,
    reload,
    selection,
    setSelection,
    labels,
    loading,
    enabledFeatures
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "FileManager-MiddleArea"
  }, /*#__PURE__*/_react.default.createElement(_SideBar.default, {
    labels: labels,
    loading: loading,
    structure: structure,
    currentPath: currentPath,
    setCurrentPath: setCurrentPath,
    collapsed: collapsed,
    setCollapsed: setCollapsed,
    enabledFeatures: enabledFeatures
  }), /*#__PURE__*/_react.default.createElement(_Body.default, {
    structure: structure,
    currentPath: currentPath,
    setCurrentPath: setCurrentPath,
    openFile: openFile,
    reload: reload,
    labels: labels,
    loading: loading,
    selection: selection,
    setSelection: setSelection,
    enabledFeatures: enabledFeatures
  }));
}