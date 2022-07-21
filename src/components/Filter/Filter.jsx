import PropTypes from 'prop-types';
import React from "react";
import { nanoid } from "nanoid";
import s from './Filter.module.css'

const Filter = ({filter, onChangeFilter}) => {
    const filterInputId = nanoid(4);
    
    return (
        <div>
            <label htmlFor={filterInputId}>
            Find contacts by name
            </label>
            <input
                className={s.formInput}
                id={filterInputId}
                type="text"
                name="filter"
                value={filter}
                onChange={onChangeFilter}
            />
        </div>
    );
}
Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChangeFilter: PropTypes.func.isRequired,
}

export default Filter;
