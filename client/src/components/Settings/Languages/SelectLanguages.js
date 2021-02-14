import React, { useState, useEffect, useCallback } from 'react';

import useFetch from '../../../hooks/useFetch';

import Select from 'react-select';
import { useSelector } from 'react-redux';

const SelectLanguages = ({ setSelectLanguages }) => {
    const loggedInLanguages = useSelector(
        (state) => state.loggedInUser.languages
    );

    const patchedLoggedInLanguages = loggedInLanguages ? loggedInLanguages.map(lang => ({...lang, value: lang.id, label: lang.name})) : []

    const { request } = useFetch();

    const [languages, setLanguages] = useState([]);

    const fetchLanguages = useCallback(async () => {
        const responce = await request('/api/language');
        if (responce.success) {
            const { languages } = responce;
            const patchedLanguages = languages.map(lang => ({...lang, value: lang.id, label: lang.name}))
            setLanguages(patchedLanguages);
        }
    }, [request]);

    useEffect(() => {
        fetchLanguages();
    }, [fetchLanguages]);

    if (!languages) return null;

    return (
        <div>
            <Select
                defaultValue={patchedLoggedInLanguages}
                isMulti
                name='colors'
                options={languages}
                className='basic-multi-select'
                classNamePrefix='select'
                onChange={(e) => setSelectLanguages(e)}
            />
        </div>
    );
};

export default SelectLanguages;
