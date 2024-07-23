import React from 'react';
import './DefaultTaskBar.css';

function Today(){
    const d = new Date();
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const formattedDate = `${weekdays[d.getDay()]}, ${
      months[d.getMonth()]
    } ${d.getDate()}`;
    return(
        <div className="tbdate">
            <p id="todayDate">{formattedDate}</p>
        </div>
    );
}

function TaskbarButton({ title, iconName, name }) {
    return (
        <button type="button" className="tbBtn" title={title}>
            <span className="material-symbols-outlined">{iconName}</span>
            {name && <span>{name}</span>}
        </button>
    );
}

function DefaultTaskBar() {
    return (
        <>
            <div className="Toolbar">
                <div className="leftToolbar">
                    <div className="lefttoolbarBtn">
                        <TaskbarButton title="Menu" iconName="menu" />
                        <h2 className="myday">My Day</h2>
                        <TaskbarButton title="Lists option menu" iconName="more_horiz" />
                        <TaskbarButton title="Grid view" iconName="grid_view" name="Grid" />
                        <TaskbarButton title="List View" iconName="view_list" name="List" />
                    </div>
                </div>
                <div className="rightToolbar">
                    <TaskbarButton title="Sort" iconName="swap_vert" name="Sort" />
                    <TaskbarButton title="Group" iconName="ad_group" name="Group" />
                    <TaskbarButton title="Suggestions" iconName="emoji_objects" name="Suggestions" />
                </div>
            </div>
            <Today />
        </>
    );
}

export default DefaultTaskBar;

