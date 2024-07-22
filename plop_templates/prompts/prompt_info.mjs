export default {
  description: 'create a js training info(zh.javascript.info)',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'info name:',
      validate(name) {
        if (!name) {
          return 'please input name'
        }
        return true
      }
    }
  ],
  actions: (data) => {
    const name = "{{name}}";

    let actions = [
      {
        type: 'add',
        path: `src/info/${name}/index.html`,
        templateFile: 'plop_templates/template/info/index.html.hbs'
      },
      {
        type: 'add',
        path: `src/info/${name}/style.css`,
        templateFile: 'plop_templates/template/info/style.css.hbs'
      },
      {
        type: 'add',
        path: `src/info/${name}/index.js`,
        templateFile: 'plop_templates/template/info/index.js.hbs'
      },
    ]

    return actions
  }
}