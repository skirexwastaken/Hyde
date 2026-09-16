import fs from "node:fs"

export const getStats = (file) => fs.statSync(file, { throwIfNoEntry: false }) || false