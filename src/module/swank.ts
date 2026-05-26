/**
 * SWANK Entrypoint
 */

import "./actionNode";
import { HTMLInsertNode } from "./actionNode/HTMLInsertNode/HTMLInsertNode";
import "./actionNodeKit";
import { SWANK } from "./actionNodeKit";
import "./styles/swank.scss";

Hooks.on("ready", () => {
    game.SWANK = {
        SWANS: { HTMLInsertNode },
        SWANK: SWANK,
    };
});

declare global {
    interface Game {
        SWANK: Record<string, any>;
    }

    interface ReadyGame {
        SWANK: Record<string, any>;
    }
}

declare module "fvtt-types/configuration" {
    interface AssumeHookRan {
        ready: never;
    }
}
