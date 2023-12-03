interface PackageCategorySelectProps {
    classname?: string
}
export const PackageCategorySelect = (props: PackageCategorySelectProps) => {
    const {classname}= props;
    return <div className={classname}>Компонент</div>;
};