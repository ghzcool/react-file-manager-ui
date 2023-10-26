"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Footer;

var _react = _interopRequireDefault(require("react"));

var _fa = require("react-icons/fa");

var _Utils = require("./Utils");

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
    enabledFeatures,
    getDownloadLink,
    getFileSizeBytes,
    getFileChangedDate
  } = _ref;
  const list = structure[currentPath] || [];
  const footerText = getFooterText();

  function getFooterText() {
    const files = list.filter(item => item.type === 1).length;
    const folders = list.filter(item => item.type === 2).length;
    const folderLabel = folders > 1 ? labels['folderMultiple'] : labels['folderSingle'];
    const fileLabel = files > 1 ? labels['fileMultiple'] : labels['fileSingle'];
    let text = "".concat(folders, " ").concat(folderLabel, " and ").concat(files, " ").concat(fileLabel);
    const selectionItem = selection[0];

    if (selectionItem) {
      let selectionBytes;

      if (enabledFeatures.indexOf('getFileSizeBytes') !== -1) {
        selectionBytes = (0, _Utils.humanReadableByteCount)(getFileSizeBytes(selectionItem));
      }

      let selectionDate;

      if (enabledFeatures.indexOf('getFileChangedDate') !== -1) {
        selectionDate = new Date(getFileChangedDate(selectionItem)).toLocaleString();
      }

      text += " - ".concat((0, _Utils.stripLeadingDirectories)(selectionItem), ": ");

      if (selectionBytes) {
        text += "".concat(selectionBytes);
      }

      if (selectionDate) {
        if (selectionBytes) {
          text += ', ';
        }

        text += " ".concat(labels['lastChangedLabel'], " ").concat(selectionDate);
      }
    }

    return text;
  }

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
  }, footerText), /*#__PURE__*/_react.default.createElement("div", {
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
  }, /*#__PURE__*/_react.default.createElement(_fa.FaTrash, null)), !!selection.length && enabledFeatures.indexOf('getDownloadLink') !== -1 && /*#__PURE__*/_react.default.createElement("a", {
    href: getDownloadLink(selection),
    download: (0, _Utils.stripLeadingDirectories)(selection[0]),
    className: "Icon-Button",
    type: "button",
    title: labels['download']
  }, /*#__PURE__*/_react.default.createElement(_fa.FaDownload, null))));
}