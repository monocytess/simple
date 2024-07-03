// js-to-ts-transform.js
module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // 将文件名后缀改为 .ts
  const filePath = fileInfo.path.replace(/\.js$/, '.ts');
  fileInfo.path = filePath;

  // 示例转换：为函数添加类型注释
  root.find(j.FunctionDeclaration)
    .forEach(path => {
      const func = path.value;
      func.returnType = j.tsTypeAnnotation(j.tsVoidKeyword());
      func.params.forEach(param => {
        param.typeAnnotation = j.tsTypeAnnotation(j.tsAnyKeyword());
      });
    });

  return root.toSource();
};
