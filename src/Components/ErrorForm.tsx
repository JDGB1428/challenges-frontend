
const ErrorForm = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-2 mt-2 text-sm font-bold text-white uppercase bg-red-600 rounded-md">
            {children}
        </div>
    )
}

export default ErrorForm