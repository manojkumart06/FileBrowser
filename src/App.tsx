import React, { useState } from 'react';
import { fileStructure as initialFileStructure } from './assets/Data/config'
import Folder from './components/FolderItem/Folder.js';
import File from './components/FileItem/File.js';
import { FolderItem, FileItem, Item } from './components/types'; 
import './App.css';

const App: React.FC = () => {
  const [fileStructure, setFileStructure] = useState<Item[]>(initialFileStructure);

  const addItem = (parent: FolderItem, item: Item) => {
    const addRecursive = (structure: Item[]): Item[] => {
      return structure.map((node) => {
        if (node === parent) {
          return { ...node, children: [...node.children, item] };
        } else if ('children' in node) { // Check if node is a FolderItem
          return { ...node, children: addRecursive(node.children) };
        }
        return node;
      });
    };
    setFileStructure(addRecursive(fileStructure));
  };

  const deleteItem = (parent: FolderItem | null, item: Item) => {
    const deleteRecursive = (structure: Item[]): Item[] => {
      return structure.map((node) => {
        if (node === parent) {
          return { ...node, children: node.children.filter(child => child !== item) };
        } else if ('children' in node) { // Check if node is a FolderItem
          return { ...node, children: deleteRecursive(node.children) };
        }
        return node;
      });
    };
    setFileStructure(deleteRecursive(fileStructure));
  };

  return (
    <div className="top-left">
      {fileStructure.map((item) =>
        item.type === 'folder' ? 
          <Folder key={item.name} folder={item as FolderItem} onAdd={addItem} onDelete={deleteItem} /> : 
          <File key={item.name} file={item as FileItem} onDelete={() => deleteItem(null, item)} />
      )}
    </div>
  );
};

export default App;
