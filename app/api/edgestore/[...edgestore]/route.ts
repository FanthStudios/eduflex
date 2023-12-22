export const dynamic = "force-dynamic";

import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { EdgeStoreProvider } from "@edgestore/server/providers/edgestore";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
    profilePictures: es.fileBucket(),
});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
    provider: EdgeStoreProvider({
        accessKey: publicRuntimeConfig.edgestoreAccessKey,
        secretKey: publicRuntimeConfig.edgestoreSecretKey,
    }),
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
