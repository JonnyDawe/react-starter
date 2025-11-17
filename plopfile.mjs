export default function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new React component following Atomic Design principles',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: [
          {
            name: 'atom - Basic building blocks (buttons, inputs, labels)',
            value: 'atom',
          },
          {
            name: 'molecule - Simple groups of UI elements working together',
            value: 'molecule',
          },
          {
            name: 'organism - Complex UI components with multiple parts (maps, data tables, complex forms)',
            value: 'organism',
          },
          {
            name: 'template - Page-level objects that place components into a layout',
            value: 'template',
          },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
        validate: (input) => {
          if (!input) {
            return 'Component name is required';
          }
          if (!/^[A-Z][a-zA-Z]*$/.test(input)) {
            return 'Component name must start with a capital letter and contain only letters';
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{type}}/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{type}}/{{name}}/index.ts',
        templateFile: 'plop-templates/index.hbs',
      },
    ],
  });
}
