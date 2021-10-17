"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Footer;

var _react = _interopRequireDefault(require("react"));

var _fa = require("react-icons/fa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    deletePaths(selection).then(() => {
      setStructure({});
      reload();
    }).catch(error => error && console.error(error));
  };

  const onRename = () => {
    rename(selection[0]).then(reload).catch(error => error && console.error(error));
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