export default {
  description: 'create a new directory for 30 js challenge',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'challenge name:',
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
        path: `src/js30/${name}/index.html`,
        templateFile: 'plop_templates/template/js30/index.html.hbs'
      },
      {
        type: 'add',
        path: `src/js30/${name}/style.css`,
        templateFile: 'plop_templates/template/js30/style.css.hbs'
      },
      {
        type: 'add',
        path: `src/js30/${name}/index.js`,
        templateFile: 'plop_templates/template/js30/index.js.hbs'
      },
      {
        type: 'copyAssets',
        name: 'copyAssets',
        speed: 'slow'
      }
    ]

    return actions
  }
}