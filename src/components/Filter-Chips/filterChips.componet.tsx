import React from 'react';

import './scss/index.scss';
const FilterChips = ({ applicableFilters }) => {

    return (
        <div className='row-flex filter-container' >
            {
                applicableFilters.length ?
                    applicableFilters.map((item, index) => {
                        return (
                            <div className='filter-chip' >
                                {item.label}
                            </div>
                        )
                    })
                    : null

            }

        </div>
    )

}
export default FilterChips;