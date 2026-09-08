// Hyde Version 26.9.8

import {Hawk} from "./source/hawk/hawk.js"

const hawkInstance = new Hawk()

hawkInstance.initServer()
hawkInstance.runServer("localhost", 8080)