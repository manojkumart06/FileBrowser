// src/components/Folder.tsx

import React, { useState,useRef,useEffect } from 'react';
import { FolderItem, Item } from '../types';
import File from '../FileItem/File';
import openIcon from '../../assets/images/folder-open.svg';
import closedIcon from '../../assets/images/folder-default.svg';
import arrowIcon from '../../assets/images/arrow-icon.png';
import './Folder.css';

interface FolderProps {
  folder: FolderItem;
  onAdd: (parent: FolderItem, item: Item) => void;
  onDelete: (parent: FolderItem | null, item: Item) => void;
}

const Folder: React.FC<FolderProps> = ({ folder, onAdd, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLUListElement>(null);

  // Function to toggle folder open/close state
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Event handler for right-click context menu
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuPosition({ x: event.pageX, y: event.pageY });
  };

  // Function to handle adding a new item (file or folder)
  const handleAdd = (type: 'file' | 'folder') => {
    const name = prompt(`Enter ${type} name`);
    if (name) {
      const newItem: Item = type === 'folder' 
        ? { name, type, children: [] }
        : { name, type };
      onAdd(folder, newItem);
    }
  };

  // Function to handle deleting an item
  const handleDelete = (item: Item) => {
    onDelete(folder, item);
  };

  // Function to handle click outside the context menu to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuPosition({ x: 0, y: 0 });
    }
  };

  // Effect to add/remove event listener for click outside the context menu
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="folder" style={{ marginLeft: 20 }}>
      <div onClick={toggleOpen} onContextMenu={handleContextMenu} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img
          src={arrowIcon}
          alt="Arrow icon"
          className={`arrow-icon ${isOpen ? 'open' : 'closed'}`}
        />
        <img
          src={isOpen ? openIcon : closedIcon}
          alt={isOpen ? 'Open folder' : 'Closed folder'}
          className="folder-icon"
        />
        <span className='text-print'>{folder.name}</span>
      </div>
      {menuPosition.x !== 0 && (
        <ul
          className="dropdown-folder-menu"
          style={{ top: menuPosition.y, left: menuPosition.x }}
          ref={menuRef}
        >
          <li onClick={() => handleAdd('folder')}>Add Folder</li>
          <li onClick={() => handleAdd('file')}>Add File</li>
        </ul>
      )}
      {isOpen && (
        <div>
          {folder.children.map((item) =>
            item.type === 'folder' ?
              <Folder key={item.name} folder={item} onAdd={onAdd} onDelete={onDelete} /> :
              <File key={item.name} file={item} onDelete={() => handleDelete(item)} />
          )}
        </div>
      )}
    </div>
  );
};

export default Folder;
