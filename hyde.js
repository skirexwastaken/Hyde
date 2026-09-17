// Hyde Version 26.9.10

import {fileIntegrityCheck} from "./source/startupScripts/fileIntegrityCheck.js"

fileIntegrityCheck()

import {} from "./source/startupScripts/consoleDebug.js"

import {systemLog} from "./source/startupScripts/systemLog.js"
import {consoleCleaner} from "./source/startupScripts/consoleCleaner.js"

import {garbageCollector} from "./source/startupScripts/garbageCollector.js"
import {Hawk} from "./source/hawk/hawk.js"

garbageCollector()

console.log(`[Hyde] Launching Hawk server using Node ${process.versions.node}`)

const hawkInstance = new Hawk()

hawkInstance.runServer(
    process.env.HAWK_HOST ? process.env.HAWK_HOST : "0.0.0.0", 
    process.env.HAWK_PORT ? process.env.HAWK_PORT : 8080

)