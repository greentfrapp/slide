import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-vue'],
  webExt: {
    // disabled: true,
    startUrls: [
      'https://www.webtoons.com/en/action/return-of-the-blossoming-blade/spin-off-5/viewer?title_no=2849&episode_no=158',
    ],
  },
  manifest: {
    name: 'Slide',
    description: 'Smooth auto scrolling',
    // Required, don't open popup, only action
    action: {},
    commands: {
      openUp: {
        suggested_key: {
          default: 'Ctrl+Up',
          mac: 'Command+Up',
        },
        description: 'Open or close command bar',
      },
      openDown: {
        suggested_key: {
          default: 'Ctrl+Down',
          mac: 'Command+Down',
        },
        description: 'Open or close command bar',
      },
    },
    host_permissions: ['<all_urls>'],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
})
