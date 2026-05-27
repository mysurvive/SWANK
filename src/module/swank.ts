/**
 * SWANK Entrypoint
 */

import "./actionNode";
import { HTMLInsertNode } from "./actionNode/HTMLInsertNode/HTMLInsertNode";
import "./actionNodeKit";
import { SWANK } from "./actionNodeKit";
import "./styles/swank.scss";
import { SWANKSidebar } from "./ui/SWANKSidebar";

CONFIG.debug.hooks = true;

Hooks.on("init", () => {
    game.SWANK = {
        SWANS: { HTMLInsertNode },
        SWANK: SWANK,
    };

    CONFIG.ui.sidebar.TABS.SWANK = {
        documentName: "SWANK",
        gmOnly: true,
        icon: "fa-solid fa-face-smile",
        tooltip: "SWANK",
    };
    CONFIG.ui.SWANK = SWANKSidebar;
});

declare global {
    interface Game {
        SWANK: Record<string, any>;
    }

    interface ReadyGame {
        SWANK: Record<string, any>;
    }

    namespace CONFIG {
        interface UI {
            SWANK: SWANKSidebar;
        }
    }
}

declare module "fvtt-types/configuration" {
    namespace Hooks {
        interface HookConfig {
            getSceneControlButtons: (controls: Record<string, SceneControls.Control>) => void;
        }
    }
    interface AssumeHookRan {
        ready: never;
    }
}
