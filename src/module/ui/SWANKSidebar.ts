const { HandlebarsApplicationMixin } = foundry.applications.api;
const { AbstractSidebarTab } = foundry.applications.sidebar;

export declare namespace SWANKSidebar {
    interface RenderContext extends foundry.applications.sidebar.AbstractSidebarTab.RenderContext {}
    interface RenderOptions extends foundry.applications.sidebar.AbstractSidebarTab.RenderOptions {}
}

class SWANKSidebar<
    RenderContext extends SWANKSidebar.RenderContext,
    RenderOptions extends SWANKSidebar.RenderOptions,
> extends HandlebarsApplicationMixin(AbstractSidebarTab)<
    RenderContext,
    foundry.applications.sidebar.AbstractSidebarTab.Configuration,
    RenderOptions
> {
    constructor() {
        super();
    }
    static override tabName = "SWANK";
    static override DEFAULT_OPTIONS = {};

    static override PARTS = { main: { template: "templates/sidebar/tabs/placeable/tab.hbs" } };
}

export { SWANKSidebar };
