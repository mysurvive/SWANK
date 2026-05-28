import { DeepPartial } from "fvtt-types/utils";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { AbstractSidebarTab } = foundry.applications.sidebar;

export declare namespace SWANKSidebar {
    interface RenderContext extends foundry.applications.sidebar.AbstractSidebarTab.RenderContext {}
    interface RenderOptions extends foundry.applications.sidebar.AbstractSidebarTab.RenderOptions {}
    interface Configuration extends foundry.applications.sidebar.AbstractSidebarTab.Configuration {}
    interface Tab extends foundry.applications.sidebar.AbstractSidebarTab {}
}

class SWANKSidebar<
    RenderContext extends SWANKSidebar.RenderContext,
    Configuration extends SWANKSidebar.Configuration,
    RenderOptions extends SWANKSidebar.RenderOptions,
> extends HandlebarsApplicationMixin(AbstractSidebarTab)<RenderContext, Configuration, RenderOptions> {
    constructor() {
        super();
    }
    static override tabName = "SWANK";
    static override DEFAULT_OPTIONS = {};

    static override PARTS = {
        swanPalette: {
            template: "/modules/SWANK/templates/sidebar/swanPalette/swan-palette.hbs",
            templates: [
                "/modules/SWANK/templates/sidebar/swanPalette/swan-palette.hbs",
                "/modules/SWANK/templates/sidebar/swanPalette/partials/swan-group.hbs",
            ],
        },
        swankGraph: { template: "/modules/SWANK/templates/sidebar/swankGraph/swank-graph.hbs" },
    };

    protected override async _prepareContext(
        options: DeepPartial<RenderOptions> & { isFirstRender: boolean },
    ): Promise<RenderContext> {
        const context = super._prepareContext(options);

        return context;
    }

    protected override async _preparePartContext(partId: string, context: SWANKSidebar.RenderContext): Promise<any> {
        context = foundry.utils.deepClone(context);

        switch (partId) {
            case "swanPalette": {
                context = foundry.utils.mergeObject(context, {
                    swanGroup: { insert: { html: "html" } },
                });
                break;
            }
            case "swankGraph": {
                break;
            }
            default:
                break;
        }
        return context;
    }
}

export { SWANKSidebar };
