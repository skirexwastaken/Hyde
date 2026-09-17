let lastCpuUsageData = process.cpuUsage()

export const systemLog = setInterval(() => {
    const memoryUsageData = process.memoryUsage()
    const cpuUsageData = process.cpuUsage()
    const upTimeData = process.uptime()

    const systemLogMessage = 
        `[System Log] ` +
        `CPU: ${Math.ceil(((cpuUsageData.user + cpuUsageData.system) - (lastCpuUsageData.user + lastCpuUsageData.system)) / 1000)} ms | ` +
        `Memory: ${Math.ceil(memoryUsageData.rss / 1024 / 1024)} MB | ` +
        `Uptime: ${Math.ceil(upTimeData)} s`

    lastCpuUsageData = cpuUsageData

    console.log(systemLogMessage)

}, (process.env.SYSTEM_LOG_DELAY ? process.env.SYSTEM_LOG_DELAY : 60) * 1000)