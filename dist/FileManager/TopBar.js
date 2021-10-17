"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TopBar;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireWildcard(require("react"));

var _fa = require("react-icons/fa");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TopBar(_ref) {
  let {
    currentPath,
    setCurrentPath,
    uploadFiles,
    createDirectory,
    reload,
    labels,
    enabledFeatures
  } = _ref;
  const uploadInputRef = (0, _react.useRef)(null);

  const onFileSelect = event => uploadFiles(currentPath, [...event.target.files]).then(reload).catch(error => error && console.error(error));

  const onPathChange = path => {
    const newPath = path === '/' ? '' : path;

    if (newPath !== currentPath) {
      setCurrentPath(newPath);
    }
  };

  const onCreateDirectory = () => {
    createDirectory(currentPath).then(reload).catch(error => error && console.error(error));
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "FileManager-TopBar"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "TopBar-Left"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "TopBar-Button Icon-Button",
    type: "button",
    disabled: !currentPath,
    onClick: () => setCurrentPath(''),
    title: labels['home']
  }, /*#__PURE__*/_react.default.createElement(_fa.FaHome, null)), /*#__PURE__*/_react.default.createElement("button", {
    className: "TopBar-Button Icon-Button",
    type: "button",
    disabled: !currentPath,
    title: labels['up'],
    onClick: () => {
      const parts = currentPath.split('/');
      parts.splice(parts.length - 1, 1);
      setCurrentPath(parts.join('/'));
    }
  }, /*#__PURE__*/_react.default.createElement(_fa.FaLevelUpAlt, null)), /*#__PURE__*/_react.default.createElement("button", {
    className: "TopBar-Button Icon-Button",
    type: "button",
    title: labels['reload'],
    onClick: () => reload()
  }, /*#__PURE__*/_react.default.createElement(_fa.FaSyncAlt, null)), /*#__PURE__*/_react.default.createElement("input", {
    key: currentPath,
    type: "text",
    defaultValue: currentPath || '/',
    onBlur: event => onPathChange(event.target.value),
    onKeyDown: event => {
      if (event.keyCode === 13) {
        onPathChange(event.target.value);
      }
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "TopBar-Right"
  }, /*#__PURE__*/_react.default.createElement("input", {
    ref: uploadInputRef,
    type: "file",
    onChange: onFileSelect,
    hidden: true
  }), enabledFeatures.indexOf('createDirectory') !== -1 && /*#__PURE__*/_react.default.createElement("button", {
    className: "TopBar-Button",
    type: "button",
    onClick: () => onCreateDirectory()
  }, /*#__PURE__*/_react.default.createElement(_fa.FaFolderPlus, null), " ", labels['createDirectory']), enabledFeatures.indexOf('uploadFiles') !== -1 && /*#__PURE__*/_react.default.createElement("button", {
    className: "TopBar-Button",
    type: "button",
    onClick: () => uploadInputRef.current && uploadInputRef.current.click()
  }, /*#__PURE__*/_react.default.createElement(_fa.FaUpload, null), " ", labels['upload'])));
}