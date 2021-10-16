"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Body;

var _react = _interopRequireDefault(require("react"));

var _fa = require("react-icons/fa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Body(_ref) {
  let {
    structure,
    reload,
    currentPath,
    setCurrentPath,
    openFile,
    selection,
    setSelection
  } = _ref;
  const list = structure[currentPath] || [];
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'FileManager-Body',
    onClick: event => {
      event.stopPropagation();
      event.preventDefault();
      setSelection([]);
    }
  }, !!list && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, list.map((item, index) => {
    const path = currentPath + '/' + item.name;
    const selected = selection.indexOf(path) !== -1;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      className: 'Body-Item' + (selected ? ' Item-Selected' : ''),
      onClick: event => {
        event.stopPropagation();
        event.preventDefault();
        setSelection([path]);
      },
      onDoubleClick: event => {
        event.stopPropagation();
        event.preventDefault();
        setSelection([]);

        if (item.type === 1) {
          openFile(path);
        } else {
          setCurrentPath(path);
        }
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "Body-Item-Icon"
    }, item.type === 1 ? /*#__PURE__*/_react.default.createElement(_fa.FaRegFile, null) : /*#__PURE__*/_react.default.createElement(_fa.FaRegFolder, null)), /*#__PURE__*/_react.default.createElement("div", {
      className: "Body-Item-Name"
    }, item.name));
  })));
}