export const getHtml = {
    getHtml(route) {
        return this.htmlFiles[this.routeMap[route]]
        
    }
}