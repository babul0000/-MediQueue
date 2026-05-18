"use client";

import { useMemo, useState } from "react";

const TutorFilter = ({ onChange }) => {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleChange = (next) => {
        const nextFilters = {
            search,
            startDate,
            endDate,
            ...next,
        };

        if (next.search !== undefined) {
            nextFilters.search = next.search;
        }
        if (next.startDate !== undefined) {
            nextFilters.startDate = next.startDate;
        }
        if (next.endDate !== undefined) {
            nextFilters.endDate = next.endDate;
        }

        setSearch(nextFilters.search);
        setStartDate(nextFilters.startDate);
        setEndDate(nextFilters.endDate);

        onChange?.(nextFilters);
    };

    const resetFilters = () => {
        setSearch("");
        setStartDate("");
        setEndDate("");
        onChange?.({ search: "", startDate: "", endDate: "" });
    };

    const hasAnyFilter = useMemo(
        () => search !== "" || startDate !== "" || endDate !== "",
        [search, startDate, endDate]
    );

    return (
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_1fr] items-end mb-8">
            <label className="block">
                <span className="text-sm font-medium text-slate-700">Search Tutor</span>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleChange({ search: e.target.value })}
                    placeholder="Search tutor by name..."
                    className="mt-2 w-full rounded-[28px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-1 ring-transparent transition focus:border-slate-300 focus:ring-slate-300"
                />
            </label>

            <label className="block">
                <span className="text-sm font-medium text-slate-700">Start Date</span>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => handleChange({ startDate: e.target.value })}
                    className="mt-2 w-full rounded-[28px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-1 ring-transparent transition focus:border-slate-300 focus:ring-slate-300"
                />
            </label>

            <label className="block">
                <span className="text-sm font-medium text-slate-700">End Date</span>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => handleChange({ endDate: e.target.value })}
                    className="mt-2 w-full rounded-[28px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-1 ring-transparent transition focus:border-slate-300 focus:ring-slate-300"
                />
            </label>

            <button
                type="button"
                onClick={resetFilters}
                disabled={!hasAnyFilter}
                className="h-12 w-full rounded-[28px] border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default TutorFilter;
