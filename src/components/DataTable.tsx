import { Search } from "lucide-react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import React, { useMemo, useState, type JSX } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { RiFileExcel2Fill, RiFilePdf2Fill } from "react-icons/ri";
import * as XLSX from "xlsx";

pdfMake.vfs = pdfFonts.vfs;
export type Column<T extends Record<string, any>> = {
  key: keyof T;
  label: string;
  align: string;
  width?: number;
  sortable?: boolean;
  render?: (row: T) => JSX.Element | string | number;
};

type Props<T extends Record<string, any>> = {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  defaultSort?: {
    key: keyof T;
    asc?: boolean;
  };
  fileExportName?: string;
  footerSummary?: (data: T[]) => JSX.Element;
  exportToExcelBtn?: boolean;
  exportToPdfBtn?: boolean;
  searchFilter?: boolean;
  scrollOnly?: boolean;
};

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  defaultSort,
  fileExportName,
  footerSummary,
  exportToExcelBtn,
  exportToPdfBtn,
  searchFilter,
  scrollOnly = false,
}: Props<T>) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<keyof T | null>(
        defaultSort?.key ?? null
    );
    const [sortAsc, setSortAsc] = useState<boolean>(
        defaultSort?.asc ?? true
    );

    const filteredData = useMemo(() => {
        return data.filter((item) =>
        Object.values(item).some((val) =>
            String(val).toLowerCase().includes(search.toLowerCase())
        )
        );
    }, [search, data]);

    const sortedData = useMemo(() => {
        if (!sortBy) return filteredData;
        return [...filteredData].sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        if (typeof valA === "number" && typeof valB === "number") {
            return sortAsc ? valA - valB : valB - valA;
        }

        return sortAsc
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
        });
    }, [filteredData, sortBy, sortAsc]);

    const paginatedData = useMemo(() => {
        return scrollOnly ? sortedData : sortedData.slice((page - 1) * pageSize, page * pageSize);
    }, [sortedData, scrollOnly, page, pageSize]);

    const totalPages = scrollOnly ? 1 : Math.ceil(sortedData.length / pageSize);
    const start = scrollOnly ? 1 : (page - 1) * pageSize + 1;
    const end = scrollOnly ? sortedData.length : Math.min(start + pageSize - 1, sortedData.length);
    
    const handleSort = (key: keyof T) => {
        if (sortBy === key) {
            setSortAsc(!sortAsc);
        } else {
            setSortBy(key);
            setSortAsc(true);
        }
    };
    
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(sortedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");
        XLSX.writeFile(wb, `${fileExportName || "data"}.xlsx`);
    };

    const exportToPDF = () => {
  try {
    const columnLabels = columns.map((col) => col.label);
    const columnKeys = columns.map((col) => col.key);

    const body = [
      ["No", ...columnLabels],
      ...sortedData.map((row, i) => [
        i + 1,
        ...columnKeys.map((key) => String(row[key])),
      ]),
    ];

    const orientation = columns.length > 6 ? "landscape" : "portrait";

    const docDefinition = {
        pageOrientation: orientation,
        content: [
            { text: fileExportName, style: "header" },
            {
            table: {
                headerRows: 1,
                widths: Array(columns.length + 1).fill("auto"),
                body,
            },
            },
        ],
        styles: {
            header: {
            fontSize: 18,
            bold: true,
            marginBottom: 10,
            },
        },
        };

        pdfMake.createPdf(docDefinition).download(`${fileExportName || "data"}.pdf`);
    } catch (err) {
        console.error("PDF Export Error:", err);
    }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                {searchFilter && <div className="relative">
                    <Search 
                        className="absolute top-[10px] left-3 text-gray-400" 
                        size={18} 
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-10 border px-3 py-2 bg-gray-50 border-gray-200 rounded-lg text-sm focus:outline-none"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>}
                <div className="flex gap-2">
                    {exportToPdfBtn && <button className="btn btn-sm" onClick={exportToPDF}>
                        <RiFilePdf2Fill className="w-4 h-4 text-red-600"/>
                        Export Pdf
                    </button>}
                    {exportToExcelBtn && <button className="btn btn-sm" onClick={exportToExcel}>
                        <RiFileExcel2Fill className="w-4 h-4 text-green-600"/>
                        Export Excel
                    </button>}
                </div>
            </div>

            <div className="overflow-x-auto max-h-[375px]">
                <table className="table table-zebra w-full">
                    <thead className="sticky top-0 bg-white text-gray-500 shadow-sm shadow-gray-100">
                        <tr>
                        <th>No</th>
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                className={col.sortable ? "cursor-pointer select-none whitespace-nowrap" : ""}
                                onClick={() => col.sortable && handleSort(col.key)}
                                >
                                <div className="flex items-center justify-center gap-1" style={{ width: col.width }}>
                                    {col.label}
                                    {col.sortable &&
                                    (sortBy === col.key ? (
                                        sortAsc ? (
                                        <FaSortDown className="w-4 h-4" />
                                        ) : (
                                        <FaSortUp className="w-4 h-4" />
                                        )
                                    ) : (
                                        <FaSort className="w-4 h-4 text-gray-400" />
                                    ))}
                                </div>
                            </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center py-4 text-gray-500 bg-gray-50">
                                    No data available in table
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, i) => (
                            <tr key={i}>
                                <th>{(page - 1) * pageSize + i + 1}</th>
                                {columns.map((col) => (
                                     <td key={String(col.key)} className={`text-${col.align}`}>
                                        {col.render
                                        ? col.render(row)
                                        : React.isValidElement(row[col.key])
                                            ? row[col.key]
                                            : String(row[col.key])}
                                    </td>
                                ))}
                            </tr>
                            ))
                        )}
                    </tbody>
                    {paginatedData.length > 0 && footerSummary && (
                        <tfoot className="font-bold text-gray-500 sticky bottom-0 bg-white">
                        {footerSummary(sortedData)}
                        </tfoot>
                    )}
                </table>
            </div>

            {!scrollOnly && (
                <div className="flex justify-between items-center mt-4">
                    <div>
                    <p className="text-sm">Showing {start} to {end} of {sortedData.length} entries</p>
                    </div>
                    <div className="flex items-center gap-5">
                    <button
                        className="btn btn-sm"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span className="text-sm">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        className="btn btn-sm"
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                    </div>
                </div>
            )}
        </>
    );
}
