import path from 'path'
import { fileURLToPath } from 'url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: ['@storybook/addon-links', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },

  staticDirs: ['../public'],

  viteFinal: async (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve || {}
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias || {}),
      components: path.resolve(projectRoot, 'components'),
      styles: path.resolve(projectRoot, 'styles'),
      hooks: path.resolve(projectRoot, 'hooks'),
      util: path.resolve(projectRoot, 'util'),
      app: path.resolve(projectRoot, 'app'),
    }
    return viteConfig
  },
}
export default config
