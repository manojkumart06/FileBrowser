// src/components/Folder.tsx

import React, { useState } from 'react';
import { FolderItem, Item } from './types';
import File from './File';

interface FolderProps {
  folder: FolderItem;
  onAdd: (parent: FolderItem, item: Item) => void;
  onDelete: (parent: FolderItem | null, item: Item) => void;
}

const Folder: React.FC<FolderProps> = ({ folder, onAdd, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleAdd = (type: 'file' | 'folder') => {
    const name = prompt(`Enter ${type} name`);
    if (name) {
      const newItem: Item = type === 'folder' 
        ? { name, type, children: [] }
        : { name, type };
      onAdd(folder, newItem);
    }
  };

  const handleDelete = (item: Item) => {
    onDelete(folder, item);
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <div onClick={toggleOpen} style={{ cursor: 'pointer' }}>
        {isOpen ? '📂' : '📁'} {folder.name}
      </div>
      {isOpen && (
        <div>
          {folder.children.map((item) =>
            item.type === 'folder' ? 
              <Folder key={item.name} folder={item} onAdd={onAdd} onDelete={onDelete} /> : 
              <File key={item.name} file={item} onDelete={() => handleDelete(item)} />
          )}
          <div>
            <button onClick={() => handleAdd('folder')}>Add Folder</button>
            <button onClick={() => handleAdd('file')}>Add File</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
