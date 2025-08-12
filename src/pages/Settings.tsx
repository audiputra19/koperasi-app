import type { FC } from "react";
import { useGetAksesQuery, useUpdateHakAksesMutation } from "../services/apiHakAkses";
import AccessSwitch from "../components/AccessSwitch";

const Settings: FC = () => {
    const {data: dataAkses, refetch} = useGetAksesQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const [updateHakAkses] = useUpdateHakAksesMutation();

    const handleToggle = async (userId: number, feature: string, newValue: boolean) => {
        try {
            await updateHakAkses({
                userId,
                feature,
                value: newValue ? 1 : 0,
            });
            await refetch();
        } catch (err) {
            console.error('Gagal update hak akses:', err);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="flex gap-5 bg-white rounded-lg shadow-sm p-5">
                {dataAkses?.map((user) => (
                        <div key={user.id} className="border border-gray-300 rounded-md p-4 rounded w-[300px]">
                            <div className="font-bold">{user.nama}</div>
                            <div className="flex flex-col gap-2 mt-5">
                                <AccessSwitch
                                    feature="Tombol Delete"
                                    currentValue={!!user.delete}
                                    onChange={(newVal) => handleToggle(user.id, 'delete', newVal)}
                                />
                                <AccessSwitch
                                    feature="Tanggal Input"
                                    currentValue={!!user.dateCashier}
                                    onChange={(newVal) => handleToggle(user.id, 'date_cashier', newVal)}
                                />
                            </div>
                        </div>
                ))}
            </div>
        </div>
    )
}

export default Settings;