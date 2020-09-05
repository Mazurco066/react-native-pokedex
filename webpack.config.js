const path = require('path')
const createExpoWebpackConfigAsync = require('@expo/webpack-config')

const uiKittenComponents = path.resolve(__dirname, './node_modules/@ui-kitten/components')

const uiKittenComponentAlias = {
  '@ui-kitten/components': path.resolve(__dirname, uiKittenComponents),
  './bottomNavigationTab.component.tsx': path.resolve(uiKittenComponents, 'ui/bottomNavigation/bottomNavigationTab.component.js'),
  './button.component.tsx': path.resolve(uiKittenComponents, 'ui/button/button.component.js'),
  './checkbox.component.tsx': path.resolve(uiKittenComponents, 'ui/checkbox/checkbox.component.js'),
  './input.component.tsx': path.resolve(uiKittenComponents, 'ui/input/input.component.js'),
  './listItem.component.tsx': path.resolve(uiKittenComponents, 'ui/list/listItem.component.js'),
  './menuItem.component.tsx': path.resolve(uiKittenComponents, 'ui/menu/menuItem.component.js'),
  './radio.component.tsx': path.resolve(uiKittenComponents, 'ui/radio/radio.component.js'),
  './select.component.tsx': path.resolve(uiKittenComponents, 'ui/select/select.component.js'),
  './selectOption.component.tsx': path.resolve(uiKittenComponents, 'ui/select/selectOption.component.js'),
  './tab.component.tsx': path.resolve(uiKittenComponents, 'ui/tab/tab.component.js'),
  './toggle.component.tsx': path.resolve(uiKittenComponents, 'ui/toggle/toggle.component.js'),
  './topNavigationAction.component.tsx': path.resolve(uiKittenComponents, 'ui/topNavigation/topNavigationAction.component.js'),
}

const babelLoaderRules = {
  test: /\.(js|ts|tsx)$/,
  loader: 'babel-loader',
  exclude: /^((?!node_modules\/@ui-kitten).)*$/,
}

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)
  
  config.module.rules = [
    ...config.module.rules,
    babelLoaderRules,
  ]

  config.resolve.alias = {
    ...config.resolve.alias,
    ...uiKittenComponentAlias,
  }

  return config
}