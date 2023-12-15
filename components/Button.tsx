interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    label: string;
}

export const Button = ({ onClick, label }: ButtonProps) => {
    return (
        <div className="items-center p-6 flex flex-col space-y-2">
            <button
                onClick={onClick}
                className="inline-flex items-center justify-center text-sm font-medium ring-offset-background focus-visible:ring-offset-2 px-4 py-2 h-10 w-full rounded-md bg-gray-900 text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
                {label}
            </button>
        </div>
    );
};
