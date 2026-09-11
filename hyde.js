// Hyde Version 26.9.10

import {garbageCollector} from "./source/startupScripts/garbageCollector.js"
import {Hawk} from "./source/hawk/hawk.js"

garbageCollector()

const hawkInstance = new Hawk()

hawkInstance.initServer()
hawkInstance.runServer("127.0.0.1", 8080)