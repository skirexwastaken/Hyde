export const getCss = {
    getCss(route) {
        return this.cssFiles[this.cssRouteMap[route]]
    }
}