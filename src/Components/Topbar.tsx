const Topbar = () => {
    return (
        <header className="h-14 bg-slate-900 border-b-4 flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-2 text-white">
                <div className="h-8 w-8 rounded-lg border border-white/20 flex items-center justify-center">
                    <span className="text-xs font-semibold">bk</span>
                </div>
                <span className="text-sm font-medium opacity-90">be kind</span>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden sm:block text-white/70 text-xs"> </div>
                <div className="h-8 w-8 rounded-full bg-yellow-400 text-slate-900 font-semibold flex items-center justify-center">
                    A
                </div>
            </div>
        </header>
    )
}

export default Topbar