import React, { useState, useEffect } from 'react';
import style from './PersonalInformation.module.css';
import { Table, Input, Pagination, Space, Dropdown, Checkbox, } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { CiMenuKebab, CiFilter, CiSearch } from 'react-icons/ci';
import Button from '../Basic/button';
import FormModal from '../Modal/FormModal';
import Form from '../../Forms/PersonalInfoForm'


interface DataSource {
    key: string;
    Name: string;
    Contact: string;
}

const MultiViewTable: React.FC = ({ }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(9);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['Name', 'Contact']);
    const [loadingText, setLoadingText] = useState<boolean>(true)
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [showForm, setShowForm] = useState<boolean>(false);


    const onSearch = (value: string) => setSearchText(value.toLowerCase());

    const handleCheckboxChange = (checked: boolean, column: string) => {
        setSelectedColumns((prevSelected) =>
            checked ? [...prevSelected, column] : prevSelected.filter((col) => col !== column)
        );
    };

    const dataSource: DataSource[] = [
        { key: '1', Name: 'EXG4545FR01', Contact: 'I-Link' },
        { key: '2', Name: 'EXG4545FR02', Contact: 'IHC' },
        { key: '3', Name: 'EXG4545FR01', Contact: 'I-Link' },
        { key: '4', Name: 'EXG4545FR02', Contact: 'IHC' },
        { key: '5', Name: 'EXG4545FR01', Contact: 'I-Link' },
        { key: '6', Name: 'EXG4545FR02', Contact: 'IHC' },
        { key: '7', Name: 'EXG4545FR01', Contact: 'I-Link' },
        { key: '8', Name: 'EXG4545FR02', Contact: 'IHC' },
        { key: '9', Name: 'EXG4545FR01', Contact: 'I-Link' },
        { key: '10', Name: 'EXG4545FR02', Contact: 'IHC' },
        { key: '11', Name: 'EXG4545FR01', Contact: 'I-Link' },
        { key: '12', Name: 'EXG4545FR02', Contact: 'IHC' },
        { key: '13', Name: 'EXG4545FR01', Contact: 'I-Link' },
        { key: '14', Name: 'EXG4545FR02', Contact: 'IHC' },
    ];

    const Addhandle = () => {
        setShowForm(true);
    };

    const Backhandle = () => {
        setShowForm(false); // Show the table and hide the form
    };

    const actionMenu = (
        <Space direction="vertical" className={style.actions}>
            <div className={style.dropdownItem}>Edit</div>
            <div className={style.dropdownItem} onClick={() => setOpen(true)}>Delete</div>
        </Space>
    );
    const allColumns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
            width: 100,
        },
        {
            title: 'Contact',
            dataIndex: 'Contact',
            key: 'Contact',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right' as const,
            width: 50,
            render: () => (
                <Dropdown
                    overlay={actionMenu}
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <CiMenuKebab className={style.actionIcon} />
                </Dropdown>
            ),
        },
    ];

    const filteredColumns = allColumns.filter((col) => selectedColumns.includes(col.key) || col.key === 'action');

    const filteredData = dataSource.filter((item) =>
        item.Contact.toLowerCase().includes(searchText) ||
        item.Name.toLowerCase().includes(searchText)
    );

    const items = [
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('Name')}
                    value={'Name'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Name')}
                >
                    Switch ID
                </Checkbox>
            ),
            key: '1',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('Contact')}
                    value={'Contact'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Contact')}
                >
                    Internal Switch Tag
                </Checkbox>
            ),
            key: '2',
        },
    ];

    useEffect(() => {
        setLoadingText(true)
        setTimeout(() => {
            setLoadingText(false)
        }, 2000)
    }, [])


    return (
        <>
            <FormModal modalTitle="Form Modal" open={open} setOpen={setOpen} onOk={() => console.log('Form submitted!')} onCancel={() => console.log('Modal cancelled')} />
            {showForm ? (
                <Form Back={Backhandle} />
            ) : (
                // Render the table when not showing the form
                <>
                    <div className={style.Route}>
                        <h5>Personal Information</h5>
                        <Button
                            Text={'Add New'}
                            buttonClass={style.buttonAdd}
                            onClick={Addhandle}
                            Disable={loadingText}
                        />
                    </div>
                    <div className={style.container}>
                        <Space className={style.SearchTable}>
                            <div className={style.SearchBar}>
                                <Input
                                    placeholder="Search..."
                                    prefix={<CiSearch size={20} />}
                                    suffix={<CiFilter size={20} className={style.filterIcon} />}
                                    onChange={(e) => onSearch(e.target.value)}
                                    style={{ width: 200 }}
                                    className={style.inputSearch}
                                />
                                <Dropdown
                                    menu={{items}}
                                    trigger={['click']}
                                >
                                    <SettingOutlined className={style.tableSettings} />
                                </Dropdown>
                            </div>
                        </Space>
                        <Table
                            loading={loadingText}
                            columns={filteredColumns}
                            dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                            pagination={false}
                            rowSelection={{
                                type: 'checkbox',
                            }}
                            size="small"
                        />
                        <Pagination
                            align="end"
                            showTotal={(total) => `Total ${total} items`}
                            current={currentPage}
                            total={filteredData.length}
                            pageSize={pageSize}
                            onChange={(page, newSize) => {
                                setCurrentPage(page);
                                setPageSize(newSize);
                            }}
                            style={{ marginTop: 16 }}
                        />
                    </div>
                </>
            )}
        </>
    );
};


export default MultiViewTable