import { createApp } from 'vue'
import '@/assets/tailwind.css'
import App from '@/components/Main.vue'

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'command-bar',
      position: 'inline',
      anchor: 'body',
      append: 'first',
      onMount: (container) => {
        // Don't mount app directly on <body>
        const wrapper = document.createElement('div')
        container.append(wrapper)
        const app = createApp(App)
        app.mount(wrapper)
        return { app, wrapper }
      },
      onRemove: (elements) => {
        elements?.app.unmount()
        elements?.wrapper.remove()
      },
    })

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && ui.mounted) {
        ui.remove()
      }
    }
    function handleClickOutside(event: MouseEvent) {
      if (!ui.mounted) return
      if (event.target != ui.shadowHost) {
        ui.remove()
      }
    }

    browser.runtime.onMessage.addListener((event) => {
      if (event.type === 'COMMAND') {
        switch (event.command) {
          case 'openUp':
            if (ui.mounted) {
              ui.remove()
              document.removeEventListener('keydown', handleEscape)
              document.removeEventListener('click', handleClickOutside, true)
            } else {
              ui.mount()
              document.addEventListener('keydown', handleEscape)
              document.addEventListener('click', handleClickOutside, true)
            }
            break
          case 'openDown':
            if (ui.mounted) {
              ui.remove()
              document.removeEventListener('keydown', handleEscape)
              document.removeEventListener('click', handleClickOutside, true)
            } else {
              ui.mount()
              document.addEventListener('keydown', handleEscape)
              document.addEventListener('click', handleClickOutside, true)
            }
            break
          case 'close':
            if (ui.mounted) {
              ui.remove()
              document.removeEventListener('keydown', handleEscape)
              document.removeEventListener('click', handleClickOutside, true)
            }
        }
      }
    })
  },
})
