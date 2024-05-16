module.exports = {
  // 单行字符长度
  printWidth: 120,
  useTabs: false, // 是否使用制表符进行缩进
  // 是否添加分号
  semi: false,
  trailingComma: 'none',
  endOfLine: 'auto', //解决window和linux下换行报错问题
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'always', // Markdown文件中自动换行
        trailingComma: 'none', // Markdown文件中不加逗号
        parser: 'markdown',
      },
    },
  ],
};
