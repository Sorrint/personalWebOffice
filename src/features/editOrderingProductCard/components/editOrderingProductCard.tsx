// import { type Path, useForm } from 'react-hook-form';
// import { useEffect } from 'react';


// import './editOrderingProductCard.scss';
// import { EditProductProperty } from '@entities/products/components/editProductProperty/editProductProperty';
// import { TextField } from '@shared/ui/textField';
// import { type IOrderingProduct } from '@entities/orderings';
// import { type IOrderRecord,  } from '@entities/orders/model/types/IOrder';
// import { transformProductName } from '@features/loadOrderFromFile/lib/helpers/transformProductName/transformProductName';

// interface EditOrderingProductCardProps {
//     product:  IOrderRecord
// }

// export const EditOrderingProductCard = ({ product }: EditOrderingProductCardProps) => {
//     const { count, productName: name, unit } = product;
//     const productName = transformProductName(name);
//     const methods = useForm({
//         mode: 'onChange',
//         defaultValues: {
//             count,
//             productName,
//             unit
//         }
//     });

//     const { watch, register } = methods;

//     useEffect(() => {
//         const subscription = watch((value, { name, type }) => { console.log(value, name, type); });
//         return () => { subscription.unsubscribe(); };
//     }, [watch]);

//     const renderFieldProps = (fieldName: Path<IOrderingProduct>) => {
//         const textFieldType = typeof product[fieldName] === 'number' ? 'number' : 'text';
//         return <TextField {...register(fieldName) } className= {`editCard__cell editItem__${fieldName}`} type={textFieldType}/>;
//     };

//     return (
//         <>
//             <div className="editCard">
//                 <h2 className='editCard__title'>{productName}</h2>
//                 <div className='editCard__properties'>
//                     <EditProductProperty propertyName='№ в документе' renderEditField={() => renderFieldProps('number')}/>
//                     <EditProductProperty propertyName='Наименование' renderEditField={() => renderFieldProps('productName')}/>
//                     <EditProductProperty propertyName='Количество' renderEditField={() => renderFieldProps('count')}/>
//                     <EditProductProperty propertyName='Ед.' renderEditField={() => renderFieldProps('unit')}/>
//                 </div>
//             </div>
//         </>
//     );
// };
