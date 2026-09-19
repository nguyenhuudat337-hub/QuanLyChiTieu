import { NavLink } from "react-router-dom";

export default function Sidebar(){
    const menuItems = [
        {path: '/',label:'Dashboard',icon:'📊'},
        { path: '/transactions', label: 'Giao dịch', icon: '💰' },
        { path: '/categories', label: 'Danh mục', icon: '📁' },
    ]

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-xl font-bold text-blue-600">Expense Tracker</h1>
                <p className="text-xs text-gray-500 mt-1">Quản lý chi tiêu</p>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                                isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`
                        }
                    >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* Footer sidebar */}
            <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-gray-400 text-center">© 2026 Expense Tracker</p>
            </div>
        </aside>
    )
}