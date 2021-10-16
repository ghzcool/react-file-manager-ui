"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FileManager;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _TopBar = _interopRequireDefault(require("./TopBar"));

var _Footer = _interopRequireDefault(require("./Footer"));

var _MiddleArea = _interopRequireDefault(require("./MiddleArea"));

require("./FileManager.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultLabels = {
  'fileSingle': 'file',
  'fileMultiple': 'files',
  'folderSingle': 'folder',
  'folderMultiple': 'folders',
  'root': 'Root',
  'home': 'Home',
  'up': 'Up',
  'reload': 'Reload',
  'upload': 'Upload',
  'download': 'Download',
  'delete': 'Delete',
  'rename': 'Rename',
  'createDirectory': 'Create directory'
};

function FileManager(_ref) {
  let {
    height,
    getList,
    createDirectory,
    deletePaths,
    openFile,
    uploadFiles,
    rename,
    translations,
    features
  } = _ref;
  const [collapsed, setCollapsed] = (0, _react.useState)({});
  const [structure, setStructure] = (0, _react.useState)({});
  const [currentPath, setCurrentPath] = (0, _react.useState)('');
  const [lastPath, setLastPath] = (0, _react.useState)('');
  const [selection, setSelection] = (0, _react.useState)([]);
  const [loading, setLoading] = (0, _react.useState)(false);
  const labels = translations || defaultLabels;
  const enabledFeatures = features || [];

  if (!features) {
    if (createDirectory) {
      enabledFeatures.push('createDirectory');
    }

    if (deletePaths) {
      enabledFeatures.push('deletePaths');
    }

    if (uploadFiles) {
      enabledFeatures.push('uploadFiles');
    }

    if (rename) {
      enabledFeatures.push('rename');
    }
  }

  const reload = (0, _react.useCallback)(() => {
    setLoading(true);
    getList(currentPath).then(response => {
      const list = response.map(item => ({
        name: item.name,
        type: item.type === 1 ? 1 : 2
      }));

      const updated = _objectSpread({}, structure);

      updated[currentPath] = list;
      setStructure(updated);
      setLastPath(currentPath);
      setLoading(false);
    }).catch(error => {
      console.error(error);

      const updated = _objectSpread({}, structure);

      updated[currentPath] = undefined;
      setStructure(updated);
      setLoading(false);
      setCurrentPath(lastPath);
    });
  }, [currentPath]);
  (0, _react.useEffect)(() => {
    reload();
    setSelection([]);
  }, [currentPath]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'FileManager' + (loading ? ' FileManager-Loading' : ''),
    style: {
      height: height || '100vh'
    }
  }, /*#__PURE__*/_react.default.createElement(_TopBar.default, {
    currentPath: currentPath,
    setCurrentPath: setCurrentPath,
    createDirectory: createDirectory,
    uploadFiles: uploadFiles,
    labels: labels,
    loading: loading,
    reload: reload,
    enabledFeatures: enabledFeatures
  }), /*#__PURE__*/_react.default.createElement(_MiddleArea.default, {
    collapsed: collapsed,
    setCollapsed: setCollapsed,
    structure: structure,
    setStructure: setStructure,
    currentPath: currentPath,
    setCurrentPath: setCurrentPath,
    openFile: openFile,
    reload: reload,
    selection: selection,
    setSelection: setSelection,
    uploadFiles: uploadFiles,
    enabledFeatures: enabledFeatures,
    labels: labels,
    loading: loading
  }), /*#__PURE__*/_react.default.createElement(_Footer.default, {
    structure: structure,
    setStructure: setStructure,
    currentPath: currentPath,
    selection: selection,
    enabledFeatures: enabledFeatures,
    labels: labels,
    loading: loading,
    deletePaths: deletePaths,
    reload: reload,
    rename: rename
  }));
}