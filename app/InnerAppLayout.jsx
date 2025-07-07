'use client';


import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppData } from './masterData/AppDataContext';
import { getLocalData, storeLoginData } from './dataStorage/DataPref';
import appKey from './utils/appKey';
import apiCall, { HttpMethod } from './api/apiServiceProvider';
import { endpoints } from './api/apiEndpoints';
import pageRoutes from './utils/pageRoutes';
import {useLoading} from "./layout";
import {LoadingComponent} from "./components/LoadingComponent";

export default function InnerAppLayout({ children }) {
    const appDataContext = useAppData();
    const {isLoading, setIsLoading} = useLoading();
    const router = useRouter();
    const hasFetchedDataRef = useRef(false);

    useEffect(() => {
        const fetchMasterData = async () => {
            try {
                const response = await apiCall({
                    method: HttpMethod.GET,
                    url: endpoints.getMasterData,
                    setIsLoading,
                    showSuccessMessage: false,
                });

                if (response?.data) {
                    appDataContext.setAllMasterData(response.data);
                    storeLoginData(response?.data?.loginUserData, false);

                    const token = getLocalData(appKey.jwtToken);
                    if (token) {
                        router.push(pageRoutes.dashboard);
                    } else {
                        router.push(pageRoutes.signupPage);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch master data:', error);
            }
        };

        const isLoggedIn = getLocalData(appKey.isLogin) === 'true';
        if (isLoggedIn && !hasFetchedDataRef.current) {
            hasFetchedDataRef.current = true;
            fetchMasterData();
        }
    }, []);

    return isLoading ? <div className="w-full h-full flex justify-center items-center">
        <LoadingComponent />
    </div> : children;
}
