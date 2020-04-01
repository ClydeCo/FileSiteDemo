import React from 'react';

import _ from 'lodash';

const SearchList = props => (
    <div>
        <a href="#"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.onClickToggle();
            }}
            style={{ color: "#00006E" }}>
            <i className={"fa fa-" + props.icon}></i><strong> {props.title} [{!_.isEmpty(props.list) ? props.list.length : 0}]</strong><br />
        </a>
        <ul className="list-unstyled" style={{ display: props.isVisible() ? "inherit" : "none" }}>
            {
                !_.isEmpty(props.list) ?
                    (props.list.map(o =>
                        <li key={props.getKey(o)}>
                            <a href="#"
                                key={props.getKey(o)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    props.onListItemClicked(o);
                                }}
                                style={{ color: "#00006E" }}>
                                {props.getTitle(o)}
                            </a>
                        </li>
                    ))
                    : []
            }
        </ul>
    </div>
)


export default SearchList;