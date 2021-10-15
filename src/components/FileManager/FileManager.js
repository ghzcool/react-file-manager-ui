import React, { useCallback, useEffect, useState } from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
import MiddleArea from "./MiddleArea";
import "./FileManager.css";

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

export default function FileManager({ height, getList, createDirectory, deletePaths, openFile, uploadFiles, rename, translations, features }) {

  const [collapsed, setCollapsed] = useState({});
  const [structure, setStructure] = useState({});
  const [currentPath, setCurrentPath] = useState('');
  const [lastPath, setLastPath] = useState('');
  const [selection, setSelection] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const reload = useCallback(() => {
    setLoading(true);
    getList(currentPath).then(response => {
      const list = response.map(item => ({ name: item.name, type: item.type === 1 ? 1 : 2 }));
      const updated = { ...structure };
      updated[currentPath] = list;
      setStructure(updated);
      setLastPath(currentPath);
      setLoading(false);
    }).catch(error => {
      console.error(error);
      const updated = { ...structure };
      updated[currentPath] = undefined;
      setStructure(updated);
      setLoading(false);
      setCurrentPath(lastPath);
    });
  }, [currentPath]);

  useEffect(() => {
    reload();
    setSelection([]);
  }, [currentPath]);

  return (
    <div className={'FileManager' + (loading ? ' FileManager-Loading' : '')} style={{ height: height || '100vh' }}>
      <TopBar
        currentPath={currentPath} setCurrentPath={setCurrentPath} createDirectory={createDirectory}
        uploadFiles={uploadFiles} labels={labels} loading={loading} reload={reload} enabledFeatures={enabledFeatures}
      />
      <MiddleArea
        collapsed={collapsed} setCollapsed={setCollapsed}
        structure={structure} setStructure={setStructure}
        currentPath={currentPath} setCurrentPath={setCurrentPath}
        openFile={openFile} reload={reload}
        selection={selection} setSelection={setSelection}
        uploadFiles={uploadFiles} enabledFeatures={enabledFeatures}
        labels={labels} loading={loading}
      />
      <Footer structure={structure} currentPath={currentPath} selection={selection} enabledFeatures={enabledFeatures}
              labels={labels} loading={loading} deletePaths={deletePaths} reload={reload} rename={rename}/>
    </div>
  );
}
