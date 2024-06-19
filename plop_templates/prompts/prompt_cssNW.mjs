export default {
  description: 'create a new directory for css new world learning challenge',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'learning name:',
      validate(name) {
        if (!name) {
          return 'please input name'
        }
        return true
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'description:',
      validate(description) {
        if (!description) {
          return 'please input description'
        }
        return true
      }
    }
  ],
  actions: (data) => {
    const name = "{{name}}";
    const description = "{{description}}";
    let actions = [
      {
        type: 'add',
        path: `src/cssNW/${name}/index.html`,
        templateFile: 'plop_templates/template/cssNW/index.html.hbs'
      },
      {
        type: 'add',
        path: `src/cssNW/${name}/style.css`,
        templateFile: 'plop_templates/template/cssNW/style.css.hbs'
      },
      {
        type: 'add',
        path: `src/cssNW/${name}/index.js`,
        templateFile: 'plop_templates/template/cssNW/index.js.hbs'
      }
    ]

    return actions
  }
}