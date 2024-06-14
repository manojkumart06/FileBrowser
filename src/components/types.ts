
export interface FileItem {
    name: string;
    type: 'file';
  }
  
  export interface FolderItem {
    name: string;
    type: 'folder';
    children: (FileItem | FolderItem)[];
  }
  
  export type Item = FileItem | FolderItem;
  