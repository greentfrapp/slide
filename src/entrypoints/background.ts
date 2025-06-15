export default defineBackground(() => {
  // Open command bar
  browser.commands.onCommand.addListener(async (command, tab) => {
    if (tab.id) {
      await browser.tabs.sendMessage(tab.id, {
        type: 'COMMAND',
        command,
      })
    }
  })
  ;(browser.action ?? browser.browserAction).onClicked.addListener(
    async (tab) => {
      if (tab.id) {
        await browser.tabs.sendMessage(tab.id, { type: 'MOUNT_UI' })
      }
    },
  )
})
