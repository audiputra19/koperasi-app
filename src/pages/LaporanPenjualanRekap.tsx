import moment from "moment";
import { useEffect, useState, type FC } from "react";
import { FaStore } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetKasirDetailMutation, useGetKasirQuery } from "../services/apiKasir";

const LaporanPenjualanRekap: FC = () => {
    const [searchParams] = useSearchParams();
    const formatDate1 = searchParams.get("date1");
    const formatDate2 = searchParams.get("date2");
    const autoPrint = searchParams.get("autoPrint");
    const date1 = moment(formatDate1).format("DD/MM/YYYY");
    const date2 = moment(formatDate2).format("DD/MM/YYYY");
    const navigate = useNavigate();
    const {data: dataKasir} = useGetKasirQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const [getKasirDetail] = useGetKasirDetailMutation();
    const [kasirDetails, setKasirDetails] = useState<Record<string, any[]>>({});

    useEffect(() => {
        const fileName = `laporan_penjualan_rekap_${moment(date1, "DD/MM/YYYY").format("YYYYMMDD")}_${moment(date2, "DD/MM/YYYY").format("YYYYMMDD")}`;
        const prevTitle = document.title;
        document.title = fileName;

        if(autoPrint === "true") {
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
    }, [date1, date2, autoPrint, navigate]);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!dataKasir) return;

            const details: Record<string, any[]> = {};
            for (const item of dataKasir) {
                try {
                    const result = await getKasirDetail({ idTransaksi: item.idTransaksi }).unwrap();
                    details[item.idTransaksi] = result;
                } catch (error) {
                    console.error(`Gagal fetch detail untuk ${item.idTransaksi}`, error);
                }
            }
            setKasirDetails(details);
        };

        fetchDetails();
    }, [dataKasir, getKasirDetail]);

    return (
        <div className="text-black bg-white p-3">
            <div className="border border-dashed bg-white text-black">
                <div className="flex justify-between p-5">
                    <div className="flex gap-3">
                        <FaStore size={56} className="text-black" />
                        <div className="w-[250px]">
                        <p className="font-bold">LAPORAN PENJUALAN REKAP</p>
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
                                <th className="px-2">Jml Item</th>
                                <th className="px-2">Total Akhir</th>
                                <th className="px-2">Tunai</th>
                                <th className="px-2">Kredit</th>
                                <th className="px-2">QRIS</th>
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
                            {dataKasir?.map(item => {
                                const detail = kasirDetails[item.idTransaksi];
                                const jumlahItem = detail?.length;
                                let tunai = 0;
                                let kredit = 0;
                                let qris = 0;
                                if(item.metode === 1) {
                                    tunai = item.total;
                                } else if(item.metode === 2) {
                                    kredit = item.total;
                                } else if(item.metode === 3) {
                                    qris = item.total;
                                }

                                const tanggal = moment(item.tanggal).format("YYYY-MM-DD HH:mm:ss");

                                return (
                                    <tr 
                                        className="text-xs text-black"
                                        key={item.idTransaksi}
                                    >
                                        <td className="text-center px-2 py-1">{item.idTransaksi}</td>
                                        <td className="text-center px-2 py-1">{tanggal}</td>
                                        <td className="text-center px-2 py-1">{item.kdPelanggan}</td>
                                        <td className="text-start px-2 py-1">{item.namaPelanggan}</td>
                                        <td className="text-center px-2 py-1">{jumlahItem}</td>
                                        <td className="text-right px-2 py-1">{item.total.toLocaleString("id-ID")}</td>
                                        <td className="text-right px-2 py-1">{tunai.toLocaleString("id-ID")}</td>
                                        <td className="text-right px-2 py-1">{kredit.toLocaleString("id-ID")}</td>
                                        <td className="text-right px-2 py-1">{qris.toLocaleString("id-ID")}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LaporanPenjualanRekap;
