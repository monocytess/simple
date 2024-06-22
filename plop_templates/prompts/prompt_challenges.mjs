export default {
  description: 'create a js learning challenge',
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
        path: `src/challenges/${name}/index.html`,
        templateFile: 'plop_templates/template/challenges/index.html.hbs'
      },
      {
        type: 'add',
        path: `src/challenges/${name}/index.js`,
        templateFile: 'plop_templates/template/challenges/index.js.hbs'
      },
    ]

    return actions
  }
}