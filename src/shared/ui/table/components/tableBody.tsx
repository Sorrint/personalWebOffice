interface TableBodyProps {
    headers: ObjectRecord
    records: ObjectRecord[]
}
import styles from './table.module.scss'
export const TableBody = ({ records, headers }: TableBodyProps) => {
    const alignColumnName = (text: string) => {
        return text.length > 8 ? 'table-from-excel__column_left' : 'table-from-excel__column';
    };
    return (
        <>
            <div className={styles.body}>
                {records.map((item, index) => (
                    <div key={index} className={styles.item}>
                        {Object.keys(headers).map((headline: string) =>
                            <div className={alignColumnName(String(item[headline] ?? ''))} key={headline}>
                                {item[headline] ?? ''}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};
