import moment from "moment";
import { Fragment, useEffect, useState, type FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import koperasiLogo from '../assets/images/koperasi-logo.jpg';
import Loading from "../components/Loading";
import type { GetKasirDetailResponse } from "../interfaces/kasir";
import { useGetKasirDetailMutation } from "../services/apiKasir";
import { useGetLaporanMutation } from "../services/apiLaporan";

const LaporanPenjualanDetail: FC = () => {
    const [searchParams] = useSearchParams();
    const formatDate1 = searchParams.get("date1");
    const formatDate2 = searchParams.get("date2");
    const autoPrint = searchParams.get("autoPrint");
    const kdPelanggan = searchParams.get("kdPelanggan");
    const date1 = moment(formatDate1).format("DD/MM/YYYY");
    const date2 = moment(formatDate2).format("DD/MM/YYYY");
    const navigate = useNavigate();
    const [getLaporan, {data: dataLaporan, isLoading: kasirLoading}] = useGetLaporanMutation();
    const [getKasirDetail] = useGetKasirDetailMutation();
    const [kasirDetails, setKasirDetails] = useState<Record<string, GetKasirDetailResponse[]>>({});
    const [loadingDetail, setLoadingDetail] = useState(true);

    useEffect(() => {
        getLaporan({
            date1: formatDate1,
            date2: formatDate2,
            kdPelanggan
        })
    }, [])

    useEffect(() => {
        const fileName = `laporan_penjualan_rekap_${moment(date1, "DD/MM/YYYY").format("YYYYMMDD")}_${moment(date2, "DD/MM/YYYY").format("YYYYMMDD")}`;
        const prevTitle = document.title;
        document.title = fileName;
        
        if(autoPrint === "true" && !kasirLoading && !loadingDetail) {
            const handleAfterPrint = () => {
                document.title = prevTitle;
                navigate(-1); // kembali ke halaman sebelumnya
            };

            window.addEventListener("afterprint", handleAfterPrint);

            const timeout = setTimeout(() => {
                window.print();
            }, 500);

            return () => {
                clearTimeout(timeout);
                window.removeEventListener("afterprint", handleAfterPrint);
                document.title = prevTitle;
            };
        }
    }, [autoPrint, kasirLoading, loadingDetail, date1, date2, navigate]);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!dataLaporan) return;

            setLoadingDetail(true);

            const details: Record<string, any[]> = {};
            for (const item of dataLaporan) {
                try {
                    const result = await getKasirDetail({ idTransaksi: item.idTransaksi }).unwrap();
                    details[item.idTransaksi] = result;
                } catch (error) {
                    console.error(`Gagal fetch detail untuk ${item.idTransaksi}`, error);
                }
            }
            setKasirDetails(details);
            setLoadingDetail(false);
        };

        fetchDetails();
    }, [dataLaporan, getKasirDetail]);

    return (
        <div className="text-black bg-white p-3">
            {(kasirLoading || loadingDetail) && <Loading />}
            <div className="border border-dashed border-gray-800 bg-white text-black">
                <div className="flex justify-between p-5">
                    <div className="flex gap-3">
                        <img 
                            src={koperasiLogo}
                            alt="koperasi logo"
                            className="w-25 h-25"
                        />
                        <div className="w-[250px]">
                        <p className="font-bold">LAPORAN PENJUALAN Detail</p>
                        <p className="text-sm font-semibold">KOPERASI KONSUMEN KARYAWAN SARANDI KARYA NUGRAHA</p>
                        <p className="text-xs">KOMPLEK SENTRIS BLOK E NO 8</p>
                        <p className="text-xs">0266-218444</p>
                        <p className="text-xs">0266-218555</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs">PERIODE: {date1} - {date2}</p>
                    </div>
                </div>

                <div className="p-5">
                    <table className="w-full border-collapse">
                        <thead className="border-t">
                            <tr className="text-sm text-black">
                                <th className="px-2">No Transaksi</th>
                                <th className="px-2">Tanggal</th>
                                <th className="px-2">NIK</th>
                                <th className="px-2">Nama</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={12} className="h-2">
                                <div className="border-t"></div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={12}>
                                <div className="border-t"></div>
                                </td>
                            </tr>
                            {dataLaporan?.map(item => {
                                const detail = kasirDetails[item.idTransaksi];
                                let totalJml = 0;
                                let totalAll = 0;

                                const tanggal = moment(item.tanggal).format("YYYY-MM-DD HH:mm:ss");

                                return (
                                    <Fragment key={item.idTransaksi}>
                                        <tr className="text-xs text-black">
                                            <td className="text-center px-2 py-1">{item.idTransaksi}</td>
                                            <td className="text-center px-2 py-1">{tanggal}</td>
                                            <td className="text-center px-2 py-1">{item.kdPelanggan}</td>
                                            <td className="text-start px-2 py-1">{item.namaPelanggan}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={6} className="py-3">
                                                <div className="p-2 border border-dashed bg-gray-50">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className="text-xs text-black">
                                                                <th className="px-2 text-center">No</th>
                                                                <th className="px-2 text-center">Kd Item</th>
                                                                <th className="px-2 text-center">Nama Item</th>
                                                                <th className="px-2 text-center">Jml</th>
                                                                <th className="px-2 text-center">Harga</th>
                                                                <th className="px-2 text-center">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {detail?.map((itemDetail, index) => {
                                                                const total = itemDetail.harga * itemDetail.jumlah;
                                                                totalJml += itemDetail.jumlah;
                                                                totalAll += total;

                                                                return (
                                                                    <tr className="text-xs" key={itemDetail.kodeItem}>
                                                                        <td className="text-center px-2 py-1 w-[20px]">{index + 1}</td>
                                                                        <td className="text-center px-2 py-1 w-[50px]">{itemDetail.kodeItem}</td>
                                                                        <td className="text-left px-2 py-1 w-[100px]">{itemDetail.namaItem}</td>
                                                                        <td className="text-center px-2 py-1 w-[50px]">{itemDetail.jumlah.toLocaleString("id-ID")}</td>
                                                                        <td className="text-center px-2 py-1 w-[50px]">{(itemDetail.harga ?? 0).toLocaleString("id-ID")}</td>
                                                                        <td className="text-center px-2 py-1 w-[50px]">{total.toLocaleString("id-ID")}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                        <tfoot>
                                                            <tr className="text-xs">
                                                                <th colSpan={3} className="text-right px-2 py-1">Total</th>
                                                                <th className="text-center px-2 py-1 border-t border-dashed">{totalJml.toLocaleString("id-ID")}</th>
                                                                <th className="border-t border-dashed"></th>
                                                                <th className="text-center px-2 py-1 border-t border-dashed">{totalAll.toLocaleString("id-ID")}</th>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LaporanPenjualanDetail;
