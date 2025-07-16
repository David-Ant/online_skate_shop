import ProtectedRoute from "~/app/_components/ProtectedRoute";
import OrdersTable from "~/app/_components/OrdersTable";

function AdminPanelContent() {
    return (
        <div className="m-4">
            <h1 className="text-2xl font-bold mb-4 ml-[10%]">Active orders:</h1>
            <OrdersTable/>
        </div>
    );
}

export default function AdminPanel() {
    return (
        <ProtectedRoute>
            <AdminPanelContent />
        </ProtectedRoute>
    );
}