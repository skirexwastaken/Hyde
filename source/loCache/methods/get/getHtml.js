export const getHtml = {
    getHtml(route) {
        return this.htmlFiles[this.htmlRouteMap[route]]
        
    }
}