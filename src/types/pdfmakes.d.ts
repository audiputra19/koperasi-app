declare module 'pdfmake/build/pdfmake' {
  import pdfMake from 'pdfmake';
  export = pdfMake;
}

declare module 'pdfmake/build/vfs_fonts' {
  const vfsFonts: any;
  export default vfsFonts;
}

