const MetroConfig = require('@ui-kitten/metro-config')
const { getDefaultConfig } = require('@expo/metro-config')

const {
  resolver: { assetExts, sourceExts }
} = getDefaultConfig(__dirname)

const evaConfig = {
  evaPackage: '@eva-design/eva',
  customMappingPath: './mapping.json'
}

module.exports = MetroConfig.create(evaConfig, {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer')
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg']
  }
})