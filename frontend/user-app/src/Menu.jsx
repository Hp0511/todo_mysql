import React, { useState } from 'react';
import './Menu.css';

function MenuButton({ menuTitle, name }) {
    return (
        <button type="button" className="menubutton" title={menuTitle}>
            <span className="material-symbols-outlined">{name}</span>
        </button>
    );
}

function Menu({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className="menu">
            <div className="leftMenu">
                <MenuButton menuTitle="App Launcher" name="apps" />
                <h3 className="todo">To Do</h3>
            </div>

            <div className="searchbar" title="Search">
                <span className="material-symbols-outlined">search</span>
                <input
                    type="text"
                    placeholder="Search"
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {searchTerm && (
                    <i
                        className="fa-solid fa-xmark"
                        title="Exit Search"
                        onClick={handleClearSearch}
                        style={{ cursor: 'pointer' }}
                    ></i>
                )}
            </div>

            <div className="menuIcon">
                <MenuButton menuTitle="Settings" name="settings" />
                <MenuButton menuTitle="Help & Feedback" name="help" />
                <MenuButton menuTitle="What's New" name="campaign" />
            </div>
        </div>
    );
}

export default Menu;
