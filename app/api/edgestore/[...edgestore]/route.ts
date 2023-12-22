export const dynamic = "force-dynamic";

import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { EdgeStoreProvider } from "@edgestore/server/providers/edgestore";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
    profilePictures: es
        .fileBucket()
        .beforeUpload(({ ctx, input, fileInfo }) => {
            return true; // allow upload
        })
        .beforeDelete(({ ctx, fileInfo }) => {
            return true; // allow delete
        }),
});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
    provider: EdgeStoreProvider({
        accessKey: serverRuntimeConfig.edgestoreAccessKey,
        secretKey: serverRuntimeConfig.edgestoreSecretKey,
    }),
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
