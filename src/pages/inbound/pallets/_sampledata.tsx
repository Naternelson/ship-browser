import { seedPallets } from "./seed";
import type { InboundPalletType } from "./types";

let sampleData: InboundPalletType[] = [];

export const getSampleData = () => {
    if (sampleData.length === 0) sampleData = seedPallets({ size: 200 });
    return sampleData;
};
