import { ModeToggle } from "./theme/mode-toggle";

export default function Header() {
    return (
        <div className="mb-6 relative">
            <h1 className="text-2xl md:text-4xl font-bold text-center">Talk to Page</h1>
            <ModeToggle className="absolute top-0 right-0" />
        </div>
    )
}