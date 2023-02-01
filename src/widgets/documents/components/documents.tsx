import React from 'react';
import { useEffect, useState } from 'react';
import { read, utils } from 'xlsx';
import { Outlet } from 'react-router-dom';
import { getGoodsObject, getHeadersObject } from '../libs/modifiedExcelObjects';
import AppRibbon from '../../appRibbon/appRibbon.js';

import { orderHeaders } from './consts/tableHeaders';
import { docsNavLinks } from './consts/docsNavLinks';
import { IDocsNavLink } from './consts/types';

const Documents = () => {
    // const routes = (pathname) => [
    //     {path: 'order', element: <Order goods={goods} headers={tableHeaders} />},
    //     {path: 'ordering', element: <Ordering goods={goods} headers={tableHeaders} />},
    //     {path: 'distribution', element: <Order goods={goods} headers={tableHeaders} />},

    // ]

    return (
        <>
            <Outlet />
        </>
    );
};

export default Documents;
