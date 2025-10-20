import SearchInput from "./SearchInput";
import MobileOptions from "../buttons/MobileOptions";

export default function MobileHeader() {
    return (
        <header className="md:hidden flex flex-1 gap-2.5 items-center mx-4 my-4">
            <div className="flex-1 min-w-0">
                <SearchInput />
            </div>
            <MobileOptions />
        </header>
    );
}