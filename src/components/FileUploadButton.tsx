import React from 'react';
import { button } from '../theme';
import { MdFileUpload } from 'react-icons/md';

interface FileUploadButtonProps {
  onChange?: (files: FileList | null) => void;
  accept?: string[];
  children?: React.ReactNode;
}

const FileUploadButton = ({ onChange, accept, children }: FileUploadButtonProps) => {
  const styles = button({ color: 'primary', variant: 'solid' });

  return (
    <label className={`${styles.button} flex items-center gap-2`}>
      <MdFileUpload />
      {children}
      <input
        className="hidden"
        type="file"
        accept={accept?.join(',')}
        onChange={(x) => onChange && onChange(x.target.files)}
        onClick={(x) => ((x.target as HTMLInputElement).value = '')}
      />
    </label>
  );
};

export default FileUploadButton;
