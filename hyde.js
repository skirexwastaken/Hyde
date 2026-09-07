// Hyde Version 26.9.7

import {Hawk} from "./source/hawk/hawk.js"

const hawkInstance = new Hawk("localhost", 8080)

hawkInstance.initServer()
hawkInstance.runServer("localhost", 8080)