
import React, { useState, useEffect, useRef } from 'react';
import { FileItem } from '../types';
import { getFileIcon } from './FileIcons';
import './File.css';

interface FileProps {
  file: FileItem;
  onDelete: () => void;
}

const File: React.FC<FileProps> = ({ file, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const fileIcon = getFileIcon(file.name);
  const menuRef = useRef<HTMLUListElement>(null);

  // Function to handle right-click context menu event
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuPosition({ x: event.pageX, y: event.pageY });
    setShowMenu(true);
  };

  // Function to handle click outside of the context menu to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
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
    <div onContextMenu={handleContextMenu} className="file-item" style={{ marginLeft: 20, display: 'flex', alignItems: 'center' }}>
      <img src={fileIcon} alt={`${file.name} icon`} className="file-icon" />
      <span className='text-print'>{file.name}</span>
      {showMenu && (
        <ul
          className="dropdown-menu"
          style={{ top: menuPosition.y, left: menuPosition.x }}
          ref={menuRef}
        >
          <li onClick={onDelete}>Delete</li>
          <li>Cut</li>
          <li>Copy</li>
        </ul>
      )}
    </div>
  );
};

export default File;
