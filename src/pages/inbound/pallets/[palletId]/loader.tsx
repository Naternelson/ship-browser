import type { LoaderFunctionArgs } from "react-router";
import { getSampleData } from "../_sampledata";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const palletId = params["palletId"];
    console.log(palletId);
    if (!palletId) throw new Response("iLPN is required", { status: 400 });

    const pallet = getSampleData().find((p) => p.lpn === `${palletId}`);

    console.log(pallet);
    if (!pallet) throw new Response("iLPN not found", { status: 404 });
    console.log("Yay");
    return { pallet };
};

export type LoaderData = Awaited<ReturnType<typeof loader>>;
