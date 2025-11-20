import SideBar from "../../components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen"> 
      {/* Sidebar */}
      <div className="w-64 border-r h-full">
        <SideBar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-10">
        {children}
      </div>
    </div>
  );
}
