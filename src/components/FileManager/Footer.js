import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Footer({ structure, setStructure, currentPath, selection, deletePaths, reload, rename, labels, enabledFeatures }) {
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

  return (
    <div className="FileManager-Footer">
      <div className='Footer-Left'>
        {folders} {folderLabel} and {files} {fileLabel}
      </div>
      <div className='Footer-Right'>
        {selection.length === 1 && enabledFeatures.indexOf('rename') !== -1 &&
        <button className="Icon-Button" type="button" onClick={() => onRename()} title={labels['rename']}>
          <FaEdit/>
        </button>
        }
        {!!selection.length && enabledFeatures.indexOf('deletePaths') !== -1 &&
        <button className="Icon-Button" type="button" onClick={() => onDeletePath()} title={labels['delete']}>
          <FaTrash/>
        </button>
        }
      </div>
    </div>
  );
}
