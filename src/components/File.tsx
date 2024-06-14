
import React from 'react';
import { FileItem } from './types';

interface FileProps {
  file: FileItem;
  onDelete: () => void;
}

const File: React.FC<FileProps> = ({ file, onDelete }) => {
  return (
    <div style={{ marginLeft: 20 }}>
      📄 {file.name}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default File;
