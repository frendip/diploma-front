import React from 'react';
import {ReactComponent as SearchIcon} from '../../assets/search-icon.svg';

function Search() {
    return (
        <div>
            <label className="relative block">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <SearchIcon className="h-5 w-5" />
                </span>
                <input
                    className="block w-full rounded-lg border border-slate-300 bg-white py-1 pl-9 pr-3 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    placeholder="Поиск..."
                    type="text"
                    name="search"
                />
            </label>
        </div>
    );
}

export default Search;
