"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Footer;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireDefault(require("react"));

var _fa = require("react-icons/fa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Footer(_ref) {
  let {
    structure,
    setStructure,
    currentPath,
    selection,
    deletePaths,
    reload,
    rename,
    labels,
    enabledFeatures
  } = _ref;
  const list = structure[currentPath] || [];
  const files = list.filter(item => item.type === 1).length;
  const folders = list.filter(item => item.type === 2).length;
  const folderLabel = folders > 1 ? labels['folderMultiple'] : labels['folderSingle'];
  const fileLabel = files > 1 ? labels['fileMultiple'] : labels['fileSingle'];

  const onDeletePath = () => {
    deletePaths(selection).then(reload).catch(console.error);

    const updated = _objectSpread({}, structure);

    Object.keys(updated).forEach(path => {
      selection.forEach(item => {
        const parts = item.split('/');
        parts.splice(parts.length - 1, 1);
        const parent = parts.join('/');

        if (path.indexOf(parent) !== -1) {
          updated[path] = undefined;
        }
      });
    });
    setStructure(updated);
  };

  const onRename = () => {
    rename(selection[0]).then(reload).catch(console.error);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "FileManager-Footer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "Footer-Left"
  }, folders, " ", folderLabel, " and ", files, " ", fileLabel), /*#__PURE__*/_react.default.createElement("div", {
    className: "Footer-Right"
  }, selection.length === 1 && enabledFeatures.indexOf('rename') !== -1 && /*#__PURE__*/_react.default.createElement("button", {
    className: "Icon-Button",
    type: "button",
    onClick: () => onRename(),
    title: labels['rename']
  }, /*#__PURE__*/_react.default.createElement(_fa.FaEdit, null)), !!selection.length && enabledFeatures.indexOf('deletePaths') !== -1 && /*#__PURE__*/_react.default.createElement("button", {
    className: "Icon-Button",
    type: "button",
    onClick: () => onDeletePath(),
    title: labels['delete']
  }, /*#__PURE__*/_react.default.createElement(_fa.FaTrash, null))));
}