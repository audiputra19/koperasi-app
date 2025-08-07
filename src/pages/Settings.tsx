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
        <div>
            {dataAkses?.map((user) => (
                <div key={user.id} className="border p-4 rounded">
                <div>User ID: {user.id}</div>
                <AccessSwitch
                    userId={user.id}
                    feature="delete"
                    currentValue={!!user.delete}
                    onChange={(newVal) => handleToggle(user.id, 'delete', newVal)}
                />
                <AccessSwitch
                    userId={user.id}
                    feature="date_cashier"
                    currentValue={!!user.dateCashier}
                    onChange={(newVal) => handleToggle(user.id, 'date_cashier', newVal)}
                />
                </div>
            ))}
        </div>
    )
}

export default Settings;