export const consoleCleaner = setInterval(() => {
    console.clear()

    console.log("[Console Cleaner] Console has been cleaned")

}, (process.env.CONSOLE_CLEANER_DELAY ? process.env.CONSOLE_CLEANER_DELAY : 300) * 1000)