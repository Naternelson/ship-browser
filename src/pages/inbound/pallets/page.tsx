import { useMediaQuery } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { PageContext, type PageContextType } from "./_components/PageContext";
import { seedPallets } from "./seed";
import type { ParsedSearch, SortBy } from "./types";
import { getFilterValues, matchesSearch, parseSearch, sortPallets, stringifySearch } from "./_utils/palletSearch";
import { PalletsPageMobile } from "./page.mobile";

const sampleData = seedPallets({
    size: 200,
});

export const PalletsPage = () => {
    const [selected, setSelected] = useState(new Set<string>());
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") ?? "";
    const sortTypeParam = searchParams.get("sort");
    const sortDirectionParam = searchParams.get("direction");
    const smScreen = useMediaQuery((t) => t.breakpoints.down("md"));

    const search = useMemo(() => {
        return parseSearch(searchQuery);
    }, [searchQuery]);

    const sort = useMemo<SortBy>(() => {
        return {
            type: sortTypeParam === "date" ? "date" : "sku",
            direction: sortDirectionParam === "desc" ? "desc" : "asc",
        };
    }, [sortDirectionParam, sortTypeParam]);

    const displayRows = useMemo(() => {
        const filteredRows = sampleData.filter((pallet) => matchesSearch(pallet, search));

        return sortPallets(filteredRows, sort);
    }, [search, sort]);

    const updateSearch = useCallback(
        (nextSearch: ParsedSearch) => {
            setSearchParams(
                (currentParams) => {
                    const nextParams = new URLSearchParams(currentParams);
                    const query = stringifySearch(nextSearch);
                    if (query) {
                        nextParams.set("q", query);
                    } else {
                        nextParams.delete("q");
                    }
                    return nextParams;
                },
                {
                    replace: true,
                },
            );
        },
        [setSearchParams],
    );

    const toggleFilter = useCallback(
        (key: string, value: string) => {
            const currentValues = getFilterValues(search, key);
            const isActive = currentValues.includes(value);
            const nextValues = isActive
                ? currentValues.filter((currentValue) => currentValue !== value)
                : [...currentValues, value];
            const nextSearch: ParsedSearch = {
                ...search,
            };

            if (nextValues.length > 0) {
                nextSearch[key] = nextValues;
            } else {
                delete nextSearch[key];
            }
            updateSearch(nextSearch);
        },
        [search, updateSearch],
    );

    const setSort = useCallback(
        (nextSort: SortBy) => {
            setSearchParams(
                (currentParams) => {
                    const nextParams = new URLSearchParams(currentParams);
                    nextParams.set("sort", nextSort.type);
                    nextParams.set("direction", nextSort.direction);
                    return nextParams;
                },
                {
                    replace: true,
                },
            );
        },
        [setSearchParams],
    );

    const contextValue = useMemo<PageContextType>(
        () => ({
            rows: sampleData,
            displayRows,
            search,
            sort,
            toggleFilter,
            setSort,
            selected,
            setSelected,
        }),
        [displayRows, search, sort, toggleFilter, setSort, selected],
    );
    return <PageContext.Provider value={contextValue}>{smScreen && <PalletsPageMobile />}</PageContext.Provider>;
};
