export const getFile =  {
    getFile(route, type) {
        switch (type) {
            case "html": {
                return this.htmlFiles[this.htmlRouteMap[route]]

            }

            case "bytecode": {
                return this.fractalBytecodes[this.htmlRouteMap[route]]

            }

            case "css": {
                return this.cssFiles[this.cssRouteMap[route]]

            }

            case "ico": {
                return this.iconFiles[this.iconRouteMap[route]]

            }

            case "image": {
                return this.imageFiles[this.imageRouteMap[route]]

            }
        }
    }
}