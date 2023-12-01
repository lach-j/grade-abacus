export const download = <T>(content: T, fileName: string) => {
  var a = document.createElement('a');
  var file = new Blob([JSON.stringify(content, null, 2)], { type: 'text/json' });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  a.remove();
};
