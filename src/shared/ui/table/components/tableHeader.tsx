import styles from './table.module.scss'
interface TableHeaderProps {
    headers: ObjectRecord
}

export const TableHeader = ({ headers }: TableHeaderProps) => {
    return (
        <>
            <div className={styles.headers}>
                {Object.entries(headers).map(([key, value]) => (
                    <div className={styles.header} key={key}>
                        <span>{value}</span>
                    </div>
                ))}
            </div>
        </>
    );
};
