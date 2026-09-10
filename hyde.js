// Hyde Version 26.9.10

import {Hawk} from "./source/hawk/hawk.js"

const hawkInstance = new Hawk()

hawkInstance.initServer()
hawkInstance.runServer("localhost", 8080)