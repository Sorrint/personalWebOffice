import { useSelector } from "react-redux";
import { type IPackageCategoryResponse, 
    useGetPackageCategories,  
    selectAllPackageCategories 
} from "@entities/packages";
import { type IOrderingChapter } from "@entities/orderings";
import { useGetOrderByIdQuery } from "../api/documentsOrderApi";


export const useCreateOrderingData = ( id: string ) => {
    useGetPackageCategories();
    
    const { data: order } = useGetOrderByIdQuery(id);

    const packagesFromData:Record<string, IPackageCategoryResponse>  = {};
    
    const packagesArray = useSelector(selectAllPackageCategories);

    if (packagesArray) {
        packagesArray.forEach(item => {
            packagesFromData[item.package._id] = item;
        });
    }

    const records = (order?.orderRecords || []).reduce((result: Record<string, IOrderingChapter>, record)  => {
        const { product, count } = record;

        const productPackage = product?.extraData?.package;
        if (!productPackage) return result;
        
        const currentPackage = packagesFromData?.[productPackage];
        if (!currentPackage) return result;
        
        if (!result[productPackage]) { 
            
            result[productPackage] = {
                records: [], 
                summary: {categoryName: currentPackage.name, countOfPackages: currentPackage.countOfPackages, totalCount: 0}};
        }

        result[productPackage].records.push(
            {...record, 
                product: product._id, 
                productName: product.name || record.productName, 
                unit: record.unit?.description || '',
            });

        result[productPackage].summary.totalCount += count;

        return result;
    }, {});

    return { records };
};