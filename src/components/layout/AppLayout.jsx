import Sidebar from './Sidebar'
import Header from './Header'

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Sidebar />
      <Header />
      <main className="ml-[260px] pt-16 p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}
